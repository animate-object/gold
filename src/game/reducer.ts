import { getCard } from "../cards/store";
import { CardId } from "../types";
import type {
  ApplyEndTurnRules,
  Draft,
  GameAction,
  IncrementTurn,
  Select,
  TradeResources,
} from "../types/action.types";
import type { QueueAugmentedState } from "../types/engine.types";
import { canPurchaseCard, payForCard } from "./cost";
import { drawCards } from "./deck";
import { rollFateDice } from "./fate";
import { buildNarrativeStatement } from "./narrative";
import { applyAllTurnEndRulesOnTableau } from "./ruleEngine";
import {
  currentCardIsEndOfSeason,
  getCurrentSeason,
  currentCardSeasonIndex,
  getCurrentDeck,
  getCurrentFortuneDeck,
  nextCardIsEndOfSeason,
} from "./selectors";

// steps in a turn:
//
// TURN
//  - DRAFT
//    - DRAW Face Cards
//    - PLAYER SELECTS CARD to play immediately into the next spot in the tableau
//    - PLAYER PAYS Costs from their resource pool
//    - OTHER CAFDS discarded
//  - PLACE drafted card
//    - APPLY immediate effects
//        - Replacement rules and Resource Rules
//  - TRACK TURN END rules
//  - IF END OF SEASON,
//    - TRACK SEASON END rules
//  - INCREMENT TURN
//
// One thing that's nice is there is only one place in this flow for user input, the selection of the card
//

const draftCards = (
  state: QueueAugmentedState,
  _action: Draft
): QueueAugmentedState => {
  const deck = getCurrentDeck(state);
  const seasonDeck = state.decks[deck];
  const drawCount =
    state.cardsPlayed === 0
      ? state.gameConfiguration.cardsDrawnOnFirstTurn
      : state.gameConfiguration.cardsDrawnPerTurn;
  const { drawn: faceCardIds, deck: updatedDeck } = drawCards(
    seasonDeck,
    drawCount
  );
  const faceCardsToDiscard = state.faceCardIds.filter(
    (slot) => slot !== "empty"
  );
  return {
    ...state,
    decks: {
      ...state.decks,
      [deck]: updatedDeck,
    },
    faceCardIds,
    discard: [...state.discard, ...faceCardsToDiscard],
  };
};

const playFromFortuneDeck = (
  state: QueueAugmentedState
): QueueAugmentedState => {
  // draw first card from fortune deck

  // then queue up selectCard with that card

  const deckName = getCurrentFortuneDeck(state);
  const deck = state.decks[deckName];

  const { drawn: fortuneCardIds, deck: updatedDeck } = drawCards(deck, 1);

  const cardId = fortuneCardIds[0];
  const card = getCard(cardId);
  console.info("playing fortune card", card);

  return {
    ...state,
    decks: {
      ...state.decks,
      [deckName]: updatedDeck,
    },
    queue: [
      ...state.queue,
      {
        type: "select",
        cardId,
      },
    ],
  };
};

const selectCard = (
  state: QueueAugmentedState,
  { cardId }: Select
): QueueAugmentedState => {
  const canPurchase =
    canPurchaseCard(cardId, state) ||
    state.gameConfiguration.allowNegativeResources;
  if (!canPurchase) {
    console.warn("You can't afford that card", cardId);
    return state;
  }
  if (state.state !== "playing") {
    console.warn(`Playing cards isn't allowed in state ${state.state}`);
    return state;
  }

  const currentSeason = getCurrentSeason(state);
  const currentSeasonIndex = currentCardSeasonIndex(state);
  const updated = { ...state };

  const toDiscard: CardId[] = state.faceCardIds
    .filter((id) => id !== cardId)
    .filter((id) => id !== "empty");

  const updatedSeason = [
    ...state.tableau[currentSeason].slice(0, currentSeasonIndex),
    cardId,
    ...state.tableau[currentSeason].slice(currentSeasonIndex + 1),
  ];

  const updatedQueue: GameAction[] = [
    ...state.queue,
    {
      type: "applyEndTurnRules",
    },
    {
      type: "incrementTurn",
    },
    {
      type: "draft",
    },
  ];

  const withUpdatedTableau = {
    ...updated,
    cardsPlayed: state.cardsPlayed + 1,
    faceCardIds: Array(state.gameConfiguration.cardsDrawnPerTurn).fill("empty"),
    tableau: {
      ...state.tableau,
      [currentSeason]: updatedSeason,
    },
    discard: [...state.discard, ...toDiscard],
  };

  return {
    ...payForCard(cardId, withUpdatedTableau),
    narrativeState: {
      ...state.narrativeState,
      narrativeRecord: [
        ...state.narrativeState.narrativeRecord,
        buildNarrativeStatement(getCard(cardId), state),
      ],
    },
    queue: updatedQueue,
  };
};

const applyEndTurnRules = (
  state: QueueAugmentedState,
  _: ApplyEndTurnRules
): QueueAugmentedState => {
  const afterRules = applyAllTurnEndRulesOnTableau(
    state
  ) as QueueAugmentedState;

  if (currentCardIsEndOfSeason(afterRules)) {
    console.debug("end of season, applying time bonus");
    return {
      ...afterRules,
      resources: {
        ...afterRules.resources,
        time:
          afterRules.resources.time +
          afterRules.gameConfiguration.timeAtStartOfSeason,
      },
    };
  } else {
    return afterRules;
  }
};

const incrementTurn = (
  state: QueueAugmentedState,
  _action: IncrementTurn
): QueueAugmentedState => {
  if (state.cardsPlayed >= 16) {
    return {
      ...state,
      state: "finished.standard" as const,
    };
  }

  if (state.gameConfiguration.rollFateAtSeasonChange) {
    if (nextCardIsEndOfSeason(state)) {
      return { ...state, state: "playing.waitingForFateDice" as const };
    }
  }

  return {
    ...state,
    turn: state.turn + 1,
  };
};

const tradeResources = (
  state: QueueAugmentedState,
  action: TradeResources
): QueueAugmentedState => {
  if (state.resources.money < 2) {
    console.warn("Not enough money to trade");
    return state;
  }

  // you can buy time at 2:1 or influence at 2:1
  const { resources } = state;

  return {
    ...state,
    resources: {
      money: resources.money - 2,
      time:
        action.tradeType === "buyTime" ? resources.time + 1 : resources.time,
      influence:
        action.tradeType === "buyInfluence"
          ? resources.influence + 1
          : resources.influence,
    },
  };
};

export const gameEngineReducer = (
  state: QueueAugmentedState,
  action: GameAction
): QueueAugmentedState => {
  if (state.state.startsWith("finished")) {
    return state;
  }

  const popCurrentActionFromQueue =
    state.queue.length > 0
      ? state.queue[0].type === action.type
        ? state.queue.slice(1)
        : state.queue
      : state.queue;

  let updated = { ...state, queue: popCurrentActionFromQueue };

  switch (action.type) {
    case "draft":
      updated = draftCards(updated, action);
      break;
    case "playFromFortuneDeck":
      updated = playFromFortuneDeck(updated);
      break;
    case "select":
      updated = selectCard(updated, action);
      break;
    case "applyEndTurnRules":
      updated = applyEndTurnRules(updated, action);
      break;
    case "incrementTurn":
      updated = incrementTurn(updated, action);
      break;
    case "tradeResources":
      updated = tradeResources(updated, action);
      break;
    case "rollFateDice":
      updated = rollFateDice(updated, action.roll);
      break;
    case "selectNarrativeState":
      updated = {
        ...updated,
        narrativeState: {
          ...updated.narrativeState,
          ...action,
        },
        state: "playing" as const,
      };
      break;
    default:
      console.warn("Unhandled action", action);
  }

  return updated;
};

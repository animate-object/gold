import { CardId } from "../types";
import type {
  ApplyEndTurnRules,
  Draft,
  GameAction,
  IncrementTurn,
  Select,
} from "../types/action.types";
import type { QueueAugmentedState } from "../types/engine.types";
import { drawCards } from "./deck";
import { applyAllTurnEndRulesOnTableau } from "./ruleEngine";
import {
  currentCardSeason,
  currentCardSeasonIndex,
  getCurrentDeck,
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

const selectCard = (
  state: QueueAugmentedState,
  { cardId }: Select
): QueueAugmentedState => {
  const updated = { ...state };

  const currentSeason = currentCardSeason(state);
  const currentSeasonIndex = currentCardSeasonIndex(state);

  const toDiscard: CardId[] = state.faceCardIds
    .filter((id) => id !== cardId)
    .filter((id) => id !== "empty");

  const updatedSeason = [
    ...state.tableau[currentSeason].slice(0, currentSeasonIndex),
    cardId,
    ...state.tableau[currentSeason].slice(currentSeasonIndex + 1),
  ];

  return {
    ...updated,
    cardsPlayed: state.cardsPlayed + 1,
    faceCardIds: Array(state.gameConfiguration.cardsDrawnPerTurn).fill("empty"),
    tableau: {
      ...state.tableau,
      [currentSeason]: updatedSeason,
    },
    discard: [...state.discard, ...toDiscard],
    queue: [
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
    ],
  };
};

const applyEndTurnRules = (
  state: QueueAugmentedState,
  _: ApplyEndTurnRules
): QueueAugmentedState => {
  return applyAllTurnEndRulesOnTableau(state) as QueueAugmentedState;
};

const incrementTurn = (
  state: QueueAugmentedState,
  action: IncrementTurn
): QueueAugmentedState => {
  if (state.cardsPlayed >= 16) {
    return {
      ...state,
      state: "finished",
    };
  }

  return {
    ...state,
    turn: state.turn + 1,
  };
};

export const gameEngineReducer = (
  state: QueueAugmentedState,
  action: GameAction
): QueueAugmentedState => {
  if (state.state === "finished") {
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
    case "select":
      updated = selectCard(updated, action);
      break;
    case "applyEndTurnRules":
      updated = applyEndTurnRules(updated, action);
      break;
    case "incrementTurn":
      updated = incrementTurn(updated, action);
      break;
    default:
      console.warn("Unhandled action", action);
  }

  return updated;
};

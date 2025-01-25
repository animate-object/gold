import { CardId } from "../types";
import type {
  ApplyEndTurnRules,
  Draft,
  GameAction,
  IncrementTurn,
  Place,
  Select,
} from "../types/action.types";
import type { QueueAugmentedState } from "../types/engine.types";
import { drawCards } from "./deck";
import { currentTurnIndex, currentTurnSeason } from "./utils";

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
  const currentSeason = currentTurnSeason(state.turn);
  const seasonDeck = state.decks[currentSeason];
  const drawCount = state.gameConfiguration.cardsDrawnPerTurn;
  const { drawn: faceCardIds, deck: updatedSeasonDeck } = drawCards(
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
      [currentSeason]: updatedSeasonDeck,
    },
    faceCardIds,
    discard: [...state.discard, ...faceCardsToDiscard],
  };
};

const selectCard = (
  state: QueueAugmentedState,
  { cardId }: Select
): QueueAugmentedState => {
  // TODO card needs to be paid for

  const updated = { ...state };

  const currentSeason = currentTurnSeason(state.turn);
  const currentTurnIndx = currentTurnIndex(state.turn);

  const toDiscard: CardId[] = state.faceCardIds
    .filter((id) => id !== cardId)
    .filter((id) => id !== "empty");

  return {
    ...updated,
    faceCardIds: Array(state.gameConfiguration.cardsDrawnPerTurn).fill("empty"),
    tableau: {
      ...state.tableau,
      [currentSeason]: [
        ...state.tableau[currentSeason].slice(0, currentTurnIndx),
        cardId,
        ...state.tableau[currentSeason].slice(currentTurnIndx + 1),
      ],
    },
    discard: [...state.discard, ...toDiscard],
  };
};

const applyEndTurnRules = (
  state: QueueAugmentedState,
  action: ApplyEndTurnRules
): QueueAugmentedState => {
  return state;
};

const incrementTurn = (
  state: QueueAugmentedState,
  action: IncrementTurn
): QueueAugmentedState => {
  return state;
};

export const gameEngineReducer = (
  state: QueueAugmentedState,
  action: GameAction
): QueueAugmentedState => {
  switch (action.type) {
    case "draft":
      return draftCards(state, action);
    case "select":
      return selectCard(state, action);
    case "applyEndTurnRules":
      return applyEndTurnRules(state, action);
    case "incrementTurn":
      return incrementTurn(state, action);
    default:
      console.warn("Unhandled action", action);
      return state;
  }
};

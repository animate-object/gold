import type {
  ApplyEndTurnRules,
  Draft,
  GameAction,
  IncrementTurn,
  Place,
  Select,
} from "../types/action.types";
import type { QueueAugmentedState } from "../types/engine.types";
import { currentTurnSeason } from "./utils";

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
  action: Draft
): QueueAugmentedState => {
  const updated = { ...state };

  const currentSeason = currentTurnSeason(state.turn);

  const seasonDeck = state.decks[currentSeason];

  // const update

  return state;
};

const selectCard = (
  state: QueueAugmentedState,
  action: Select
): QueueAugmentedState => {
  return state;
};

const placeCard = (
  state: QueueAugmentedState,
  action: Place
): QueueAugmentedState => {
  return state;
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
    case "place":
      return placeCard(state, action);
    case "applyEndTurnRules":
      return applyEndTurnRules(state, action);
    case "incrementTurn":
      return incrementTurn(state, action);
    default:
      console.warn("Unhandled action", action);
      return state;
  }
};

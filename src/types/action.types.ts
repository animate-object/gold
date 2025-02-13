import { CardId } from "./card.types";

export type GameActionType =
  | "draft"
  | "playFromFortuneDeck"
  | "select"
  | "applyEndTurnRules"
  | "incrementTurn"
  | "tradeResources"
  | "rollFateDice";

export type GameActionBase = {
  type: GameActionType;
};

export interface Draft extends GameActionBase {
  type: "draft";
}

export interface Select extends GameActionBase {
  type: "select";
  cardId: CardId;
}

export interface ApplyEndTurnRules extends GameActionBase {
  type: "applyEndTurnRules";
}

export interface IncrementTurn extends GameActionBase {
  type: "incrementTurn";
}

export interface TradeResources extends GameActionBase {
  type: "tradeResources";
  tradeType: "buyTime" | "buyInfluence";
}

export interface PlayFromFortuneDeck extends GameActionBase {
  type: "playFromFortuneDeck";
}

export interface RollFateDice extends GameActionBase {
  type: "rollFateDice";
  roll: number;
}

export type GameAction =
  | Draft
  | PlayFromFortuneDeck
  | Select
  | TradeResources
  | ApplyEndTurnRules
  | IncrementTurn
  | RollFateDice;

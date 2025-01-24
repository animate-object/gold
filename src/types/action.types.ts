export type GameActionType =
  | "draft"
  | "select"
  | "place"
  | "applyEndTurnRules"
  | "incrementTurn";

export type GameActionBase = {
  type: GameActionType;
};

export interface Draft extends GameActionBase {
  type: "draft";
}

export interface Select extends GameActionBase {
  type: "select";
  cardId: string;
}

export interface Place extends GameActionBase {
  type: "place";
}

export interface ApplyEndTurnRules extends GameActionBase {
  type: "applyEndTurnRules";
}

export interface IncrementTurn extends GameActionBase {
  type: "incrementTurn";
}

export type GameAction =
  | Draft
  | Select
  | Place
  | ApplyEndTurnRules
  | IncrementTurn;

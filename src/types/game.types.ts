import type { Season } from "./season.types";
import type { CardId } from "./card.types";

export interface ResourcePool {
  money: number;
  time: number;
  influence: number;
}

export interface Deck {
  cards: CardId[];
  drawn: CardId[];
}

export interface GameState {
  turn: number;
  tableau: Record<Season, CardId[]>;
  resources: ResourcePool;
  decks: Record<Season, Deck>;
  discard: CardId[];
  faceCardIds: number[];
}

// score is always derived, not stateful,
// but is collocated here for convenience
export interface Score {
  treasures: number;
  regrets: number;
}

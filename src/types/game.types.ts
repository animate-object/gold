import type { Decks, Season } from "./season.types";
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

type EmptySlot = "empty";
type CardSlot = CardId | EmptySlot;

interface ConfigOptions {
  cardsDrawnPerTurn: number;
  cardsDrawnOnFirstTurn: number;
  // should be false for real games
  // but useful in development
  allowNegativeResources: boolean;
  // time alotted at the start of each
  // season (not including spring)
  timeAtStartOfSeason: number;
}

export interface GameState {
  cardsPlayed: number;
  turn: number;
  tableau: Record<Season, CardSlot[]>;
  resources: ResourcePool;
  decks: Record<Decks, Deck>;
  discard: CardId[];
  faceCardIds: CardSlot[];
  gameConfiguration: ConfigOptions;
  state: "playing" | "finished";
}

// score is always derived, not stateful,
// but is collocated here for convenience
export interface Score {
  treasures: number;
  regrets: number;
}

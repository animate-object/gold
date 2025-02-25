import type { Decks, Season } from "./season.types";
import type { CardId } from "./card.types";
import { FateDieFace } from "./fate.types";

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
export type CardSlot = CardId | EmptySlot;

interface ConfigOptions {
  cardsDrawnPerTurn: number;
  cardsDrawnOnFirstTurn: number;
  // should be false for real games
  // but useful in development
  allowNegativeResources: boolean;
  // time alotted at the start of each
  // season (not including spring)
  timeAtStartOfSeason: number;
  // fate die face count
  fateDieFaces: number;
  // whether to roll the fate die when the
  // season changes
  rollFateAtSeasonChange: boolean;
  // whether to display cost rules on cards
  displayCostRules: boolean;
}

interface NarrativeState {
  nameOptions: string[];
  chosenName: string;
  chosenGender: "M" | "F" | "N";
  narrativeRecord: string[];
  config: {
    showNarrative: boolean;
    presentTense?: boolean;
  };
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
  lastFateRoll?: {
    roll: number;
    result: FateDieFace;
  };
  narrativeState: NarrativeState;
  state:
    | "narrative.init"
    | "playing"
    | "playing.waitingForFateDice"
    | "finished.standard"
    | "finished.early";
}

// score is always derived, not stateful,
// but is collocated here for convenience
export interface Score {
  treasures: number;
  regrets: number;
}

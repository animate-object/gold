export enum Season {
  Spring = "spring",
  Summer = "summer",
  Fall = "fall",
  Winter = "winter",
}

type SpecialDecks = "beginnings" | "misfortune";

type DiscardPile = "discard";

export type Decks = Season | SpecialDecks;

export type DisplayableDecks = Decks | DiscardPile;

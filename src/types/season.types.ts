export enum Season {
  Spring = "spring",
  Summer = "summer",
  Fall = "fall",
  Winter = "winter",
}

export type FortuneDecks = `fortunes${Capitalize<Season>}`;

type SpecialDecks = "beginnings" | FortuneDecks;

type DiscardPile = "discard";

export type Decks = Season | SpecialDecks;

export type DisplayableDecks = Decks | DiscardPile;

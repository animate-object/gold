import { allCards } from "./cards/definitions";
import { Season } from "./types";
import { _capitalize } from "./util";

const addToWindow = (key: string, value: any) => {
  (window as unknown as any)[key] = value;
};

interface PrintArgs {
  filter?: string;
  season?: string;
}

const printAllCards = ({ filter, season }: PrintArgs = {}) => {
  let cards = !!filter
    ? allCards.filter((card) => card.name.includes(filter))
    : allCards;

  const seasonFilter = !!season
    ? Season[_capitalize(season.toLowerCase()) as keyof typeof Season]
    : null;

  cards = !!seasonFilter
    ? cards.filter((card) => card.season === seasonFilter)
    : cards;

  cards.forEach((card) => {
    console.debug(`Card #${card.id}: ${card.name} (${card.season})`);
  });
};

interface DebugArgs {
  playCard: (cardId: number) => void;
}

export const initDebugTools = ({ playCard }: DebugArgs) => {
  addToWindow("playCard", playCard);
  addToWindow("printAllCards", printAllCards);
};

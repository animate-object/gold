// The card store is computed from definitions and static.
// Gamestate never deals in cards directly, only ids
// Basically this just needs to be a lookup table

import type { Card } from "../types";
import { allCards } from "./definitions";

export const cardMap = allCards.reduce((acc, card) => {
  acc[card.id] = card;
  return acc;
}, {} as Record<number, Card>);

export const getCard = (id: number): Card => {
  return cardMap[id];
};

import { Season } from "../types";
import type { GameState } from "../types";

export const currentTurnSeason = (turn: number): Season => {
  if (turn <= 4) return Season.Spring;
  if (turn <= 8) return Season.Summer;
  if (turn <= 12) return Season.Fall;
  return Season.Winter;
};

export const cardAtTurn = (turn: number, gameState: GameState) => {
  return gameState.tableau[currentTurnSeason(turn)][(turn % 4) - 1];
};

export const turnForCard = (cardId: number, gameState: GameState) => {
  // iterate over all cards in tableau
  // return the turn number of the card

  const cards = Object.values(gameState.tableau).flat();

  return cards.findIndex((card) => card.id === cardId) + 1;
};

import { Season } from "../types";
import type { CardId, GameState } from "../types";

export const currentTurnSeason = (turn: number): Season => {
  if (turn <= 3) return Season.Spring;
  if (turn <= 7) return Season.Summer;
  if (turn <= 11) return Season.Fall;
  return Season.Winter;
};

export const currentTurnIndex = (turn: number): number => {
  return turn % 4;
};

export const cardAtTurn = (turn: number, gameState: GameState) => {
  return gameState.tableau[currentTurnSeason(turn)][currentTurnIndex(turn)];
};

export const turnForCard = (cardId: CardId, gameState: GameState) => {
  const cards = Object.values(gameState.tableau).flat();
  return cards.findIndex((card) => card === cardId) + 1;
};

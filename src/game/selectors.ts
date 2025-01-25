import { Season } from "../types";
import type { CardId, Decks, GameState } from "../types";

export const currentTurnSeason = (gameState: GameState): Season => {
  const turn = gameState.turn;
  if (turn <= 3) return Season.Spring;
  if (turn <= 7) return Season.Summer;
  if (turn <= 11) return Season.Fall;
  return Season.Winter;
};

export const currentTurnIsEndOfSeason = (gameState: GameState): boolean => {
  return gameState.turn % 4 === 3;
};

export const getCurrentDeck = (gameState: GameState): Decks => {
  if (gameState.turn === 0) return "beginnings";

  // if all resources are depleted, return misfortune
  const resources = Object.values(gameState.resources);
  if (resources.every((resource) => resource === 0)) return "misfortune";

  return currentTurnSeason(gameState);
};

export const currentTurnIndex = (gameState: GameState): number => {
  return gameState.turn % 4;
};

export const cardAtTurn = (gameState: GameState): CardId | undefined => {
  const slot =
    gameState.tableau[currentTurnSeason(gameState)][
      currentTurnIndex(gameState)
    ];

  return slot === "empty" ? undefined : slot;
};

export const turnForCard = (cardId: CardId, gameState: GameState) => {
  const cards = Object.values(gameState.tableau).flat();
  return cards.findIndex((card) => card === cardId);
};

export const getAllCardsInOrderOfPlay = (gameState: GameState): CardId[] => {
  const cards = Object.values(gameState.tableau).flat();
  return cards.filter((card) => card !== "empty");
};

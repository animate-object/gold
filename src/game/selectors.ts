import { Season } from "../types";
import type { CardId, Decks, GameState } from "../types";

type Location = {
  // Spring, Summer, Fall, Winter
  season: Season;
  // 0-3
  slot: number;
};

export const currentCardSeason = (gameState: GameState): Season => {
  const turn = gameState.cardsPlayed;
  if (turn <= 3) return Season.Spring;
  if (turn <= 7) return Season.Summer;
  if (turn <= 11) return Season.Fall;
  return Season.Winter;
};

export const currentCardIsEndOfSeason = (gameState: GameState): boolean => {
  return gameState.cardsPlayed % 4 === 3;
};

export const getCurrentDeck = (gameState: GameState): Decks => {
  if (gameState.cardsPlayed === 0) return "beginnings";

  // if all resources are depleted, return misfortune
  const resources = Object.values(gameState.resources);
  if (resources.every((resource) => resource === 0)) return "misfortune";

  return currentCardSeason(gameState);
};

export const currentCardSeasonIndex = (gameState: GameState): number => {
  return gameState.cardsPlayed % 4;
};

export const cardAtCurrentSlot = (gameState: GameState): CardId | undefined => {
  const slot =
    gameState.tableau[currentCardSeason(gameState)][
      currentCardSeasonIndex(gameState)
    ];

  return slot === "empty" ? undefined : slot;
};

// which 1 indexed slot is the card currently in?
export const slotForCard = (
  cardId: CardId,
  gameState: GameState
): number | undefined => {
  const cards = Object.values(gameState.tableau).flat();
  const idx = cards.findIndex((card) => card === cardId);

  if (idx === -1) {
    return undefined;
  }

  return idx + 1;
};

export const turnForCard = (cardId: CardId, gameState: GameState) => {
  const cards = Object.values(gameState.tableau).flat();
  return cards.findIndex((card) => card === cardId);
};

export const locationForCard = (
  cardId: CardId,
  gameState: GameState
): Location | undefined => {
  for (const season of Object.values(Season)) {
    const tableau = gameState.tableau[season];
    const slot = tableau.findIndex((card) => card === cardId);
    if (slot !== -1) {
      return { season, slot };
    }
  }
};

export const faceCardSlotForCard = (
  cardId: CardId,
  gameState: GameState
): number | undefined => {
  const idx = gameState.faceCardIds.findIndex((id) => id === cardId);

  if (idx === -1) {
    return undefined;
  }

  return idx;
};

export const getAllCardsInOrderOfPlay = (gameState: GameState): CardId[] => {
  const cards = Object.values(gameState.tableau).flat();
  return cards.filter((card) => card !== "empty");
};

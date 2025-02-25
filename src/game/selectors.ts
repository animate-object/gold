import { memoize } from "lodash";
import { getCard } from "../cards/store";
import { Season } from "../types";
import type {
  CardId,
  Decks,
  FortuneDecks,
  GameState,
  Rule,
  Score,
} from "../types";
import { applyAllScoringRules } from "./ruleEngine";

type Location = {
  // Spring, Summer, Fall, Winter
  season: Season;
  // 0-3
  slot: number;
};

export const getCurrentSeason = (gameState: GameState): Season => {
  const turn = gameState.cardsPlayed;
  if (turn <= 3) return Season.Spring;
  if (turn <= 7) return Season.Summer;
  if (turn <= 11) return Season.Fall;
  return Season.Winter;
};

export const currentCardIsEndOfSeason = (gameState: GameState): boolean => {
  return gameState.cardsPlayed % 4 === 0;
};

export const getCurrentCardIsBeginningOfSeason = (gameState: GameState) => {
  return gameState.cardsPlayed % 4 === 0;
};

export const nextCardIsEndOfSeason = (gameState: GameState): boolean => {
  if (getCurrentSeason(gameState) === Season.Winter) return false;

  return (gameState.cardsPlayed + 1) % 4 === 0;
};

export const getCurrentDeck = (gameState: GameState): Decks => {
  if (gameState.cardsPlayed === 0) return "beginnings";
  return getCurrentSeason(gameState);
};

export const getCurrentFortuneDeck = (gameState: GameState): FortuneDecks => {
  const season = getCurrentSeason(gameState);
  if (season === Season.Spring) return "fortunesSpring";
  if (season === Season.Summer) return "fortunesSummer";
  if (season === Season.Fall) return "fortunesFall";
  return "fortunesWinter";
};

export const currentCardSeasonIndex = (gameState: GameState): number => {
  return gameState.cardsPlayed % 4;
};

export const cardAtCurrentSlot = (gameState: GameState): CardId | undefined => {
  const slot =
    gameState.tableau[getCurrentSeason(gameState)][
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

const _getAllCardsInOrderOfPlay = (gameState: GameState): CardId[] => {
  const cards = Object.values(gameState.tableau).flat();
  return cards.filter((card) => card !== "empty");
};

export const getAllCardsInOrderOfPlay = memoize(_getAllCardsInOrderOfPlay);

export const getAllRulesOnTableau = (gameState: GameState): Rule[] => {
  const cards = getAllCardsInOrderOfPlay(gameState);
  return cards
    .map((card) => {
      const cardData = getCard(card);
      return cardData.rules;
    })
    .flat();
};

const _computeScore = (gameState: GameState): Score => {
  return applyAllScoringRules(
    getAllRulesOnTableau(gameState).filter((rule) => rule.type === "scoring"),
    gameState
  );
};

export const computeScore = memoize(_computeScore);

export const _deckForCard = (cardId: CardId): Decks => {
  const card = getCard(cardId);
  if (card.beginningCard) return "beginnings";
  return card.season;
};

export const deckForCard = memoize(_deckForCard);

import {
  BEGINNINGS_CARDS,
  SPRING_CARDS,
  SUMMER_CARDS,
  FALL_CARDS,
  WINTER_CARDS,
} from "../data/cardData";
import { Card, CardId, Deck, Season } from "../types";
import { shuffle } from "../utils/array";

export const allCards: Card[] = [
  ...BEGINNINGS_CARDS.map((c) => ({ ...c, beginningCard: true })),
  ...SPRING_CARDS,
  ...SUMMER_CARDS,
  ...FALL_CARDS,
  ...WINTER_CARDS,
].map((card, idx) => {
  return {
    ...card,
    id: idx + 1,
  };
});

const springCards = allCards.filter(
  (card) => card.season === "spring" && !card.beginningCard
);
const summerCards = allCards.filter((card) => card.season === "summer");
const fallCards = allCards.filter((card) => card.season === "fall");
const winterCards = allCards.filter((card) => card.season === "winter");

const shuffledIds = (cards: Card[]): CardId[] =>
  shuffle(cards.map((card) => card.id));

export const getShuffledDeckCards = (): Record<Season, CardId[]> => {
  const shuffledSpring = shuffledIds(springCards);
  const shuffledSummer = shuffledIds(summerCards);
  const shuffledFall = shuffledIds(fallCards);
  const shuffledWinter = shuffledIds(winterCards);

  return {
    spring: shuffledSpring,
    summer: shuffledSummer,
    fall: shuffledFall,
    winter: shuffledWinter,
  };
};

export const getShuffledDecks = (): Record<Season, Deck> => {
  const { spring, summer, fall, winter } = getShuffledDeckCards();

  return {
    spring: {
      cards: spring,
      drawn: [],
    },
    summer: {
      cards: summer,
      drawn: [],
    },
    fall: {
      cards: fall,
      drawn: [],
    },
    winter: {
      cards: winter,
      drawn: [],
    },
  };
};

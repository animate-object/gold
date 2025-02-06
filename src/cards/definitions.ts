import {
  BEGINNINGS_CARDS,
  SPRING_CARDS,
  SUMMER_CARDS,
  FALL_CARDS,
  WINTER_CARDS,
} from "../data/cardData";
import { Card, CardId, Deck, Decks } from "../types";
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
const beginningCards = allCards.filter((card) => card.beginningCard);
const springFortuneCards = [] as Card[];
const summerFortuneCards = [] as Card[];
const fallFortuneCards = [] as Card[];
const winterFortuneCards = [] as Card[];

const shuffledIds = (cards: Card[]): CardId[] =>
  shuffle(cards.map((card) => card.id));

export const getShuffledDeckCards = (): Record<Decks, CardId[]> => {
  const shuffledSpring = shuffledIds(springCards);
  const shuffledSummer = shuffledIds(summerCards);
  const shuffledFall = shuffledIds(fallCards);
  const shuffledWinter = shuffledIds(winterCards);
  const shuffledBeginnings = shuffledIds(beginningCards);
  const shuffledFortuneSpring = shuffledIds(springFortuneCards);
  const shuffledFortuneSummer = shuffledIds(summerFortuneCards);
  const shuffledFortuneFall = shuffledIds(fallFortuneCards);
  const shuffledFortuneWinter = shuffledIds(winterFortuneCards);

  return {
    spring: shuffledSpring,
    summer: shuffledSummer,
    fall: shuffledFall,
    winter: shuffledWinter,
    beginnings: shuffledBeginnings,
    fortunesSpring: shuffledFortuneSpring,
    fortunesSummer: shuffledFortuneSummer,
    fortunesFall: shuffledFortuneFall,
    fortunesWinter: shuffledFortuneWinter,
  };
};

export const getShuffledDecks = (): Record<Decks, Deck> => {
  const {
    spring,
    summer,
    fall,
    winter,
    beginnings,
    fortunesSpring,
    fortunesSummer,
    fortunesFall,
    fortunesWinter,
  } = getShuffledDeckCards();

  return {
    spring: { cards: spring, drawn: [] },
    summer: { cards: summer, drawn: [] },
    fall: { cards: fall, drawn: [] },
    winter: { cards: winter, drawn: [] },
    beginnings: { cards: beginnings, drawn: [] },
    fortunesSpring: { cards: fortunesSpring, drawn: [] },
    fortunesSummer: { cards: fortunesSummer, drawn: [] },
    fortunesFall: { cards: fortunesFall, drawn: [] },
    fortunesWinter: { cards: fortunesWinter, drawn: [] },
  };
};

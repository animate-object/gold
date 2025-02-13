import {
  BEGINNINGS_CARDS,
  SPRING_CARDS,
  SUMMER_CARDS,
  FALL_CARDS,
  WINTER_CARDS,
  SPRING_FORTUNE_CARDS,
  SUMMER_FORTUNE_CARDS,
  FALL_FORTUNE_CARDS,
  WINTER_FORTUNE_CARDS,
} from "../data/cardData";
import { Card, CardId, Deck, Decks, Season } from "../types";
import { shuffle } from "../utils/array";

export const allCards: Card[] = [
  ...BEGINNINGS_CARDS.map((c) => ({ ...c, beginningCard: true })),
  ...SPRING_CARDS,
  ...SUMMER_CARDS,
  ...FALL_CARDS,
  ...WINTER_CARDS,
  ...SPRING_FORTUNE_CARDS,
  ...SUMMER_FORTUNE_CARDS,
  ...FALL_FORTUNE_CARDS,
  ...WINTER_FORTUNE_CARDS,
].map((card, idx) => {
  return {
    ...card,
    id: idx + 1,
  };
});

interface Filters {
  beginning?: boolean;
  fortune?: boolean;
}
const seasonFilter = (
  season: Season,
  filters: Filters = { beginning: false, fortune: false }
): ((card: Card) => boolean) => {
  return (card: Card) => {
    if (!!card.beginningCard != filters.beginning) {
      return false;
    }
    if (!!card.fortune != filters.fortune) {
      return false;
    }
    return card.season === season;
  };
};

const springCards = allCards.filter(seasonFilter(Season.Spring));
const summerCards = allCards.filter(seasonFilter(Season.Summer));
const fallCards = allCards.filter(seasonFilter(Season.Fall));
const winterCards = allCards.filter(seasonFilter(Season.Winter));
const beginningCards = allCards.filter((card) => card.beginningCard);
const springFortuneCards = allCards.filter(
  seasonFilter(Season.Spring, { fortune: true, beginning: false })
);
const summerFortuneCards = allCards.filter(
  seasonFilter(Season.Summer, { fortune: true, beginning: false })
);
const fallFortuneCards = allCards.filter(
  seasonFilter(Season.Fall, { fortune: true, beginning: false })
);
const winterFortuneCards = allCards.filter(
  seasonFilter(Season.Winter, { fortune: true, beginning: false })
);

console.log({
  springFortuneCards,
});

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

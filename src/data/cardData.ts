import { BEGINNINGS_CARDS } from "./basic/beginnings";
import { FALL_CARDS } from "./basic/fall";
import { SPRING_CARDS } from "./basic/spring";
import { SUMMER_CARDS } from "./basic/summer";
import { WINTER_CARDS } from "./basic/winter";
import { CardDef, FortuneCardDef } from "./cardUtils";
import { FALL_FORTUNES } from "./fortunes/fall";
import { SPRING_FORTUNES } from "./fortunes/spring";
import { SUMMER_FORTUNES } from "./fortunes/summer";
import { WINTER_FORTUNES } from "./fortunes/winter";

const addFortuneFlag = (cardDefs: CardDef[]): FortuneCardDef[] => {
  return cardDefs.map((card) => {
    return {
      ...card,
      fortune: true,
    };
  });
};

const SPRING_FORTUNE_CARDS = addFortuneFlag(SPRING_FORTUNES);
const SUMMER_FORTUNE_CARDS = addFortuneFlag(SUMMER_FORTUNES);
const FALL_FORTUNE_CARDS = addFortuneFlag(FALL_FORTUNES);
const WINTER_FORTUNE_CARDS = addFortuneFlag(WINTER_FORTUNES);

export {
  BEGINNINGS_CARDS,
  SPRING_CARDS,
  SUMMER_CARDS,
  FALL_CARDS,
  WINTER_CARDS,
  SPRING_FORTUNE_CARDS,
  SUMMER_FORTUNE_CARDS,
  FALL_FORTUNE_CARDS,
  WINTER_FORTUNE_CARDS,
};

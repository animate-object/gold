import { Season, Tags } from "../../types";
import {
  baseRegret,
  CardDef,
  draftMarkup,
  recurringResourceRule,
} from "../cardUtils";

export const SPRING_FORTUNES: CardDef[] = [
  {
    name: "Childhood Illness",
    season: Season.Spring,
    tags: [Tags.health, Tags.tragedy],
    rules: [
      recurringResourceRule(-1, 0, 0, {
        trigger: "end-of-season",
        seasons: [Season.Spring, Season.Summer],
      }),
    ],
  },
  {
    name: "Slacker",
    season: Season.Spring,
    tags: [Tags.education, Tags.mistake],
    rules: [
      draftMarkup(
        1,
        0,
        0,
        [Tags.education, Tags.career, Tags.discipline],
        [Season.Spring, Season.Summer]
      ),
      baseRegret(1),
    ],
  },
];

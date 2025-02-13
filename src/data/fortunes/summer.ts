import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
  draftMarkup,
  ratio2to1,
  ratio3to1,
  ratio4to1,
  recurringResourceRule,
} from "../cardUtils";

export const SUMMER_FORTUNES: CardDef[] = [
  {
    name: "Down job market",
    season: Season.Summer,
    tags: [Tags.career, Tags.tragedy],
    rules: [draftMarkup(1, 0, 0, [Tags.career], [Season.Summer, Season.Fall])],
  },
  {
    name: "College dropout",
    season: Season.Summer,
    tags: [Tags.education, Tags.mistake],
    rules: [
      // get some time and money back if you have
      // education in summer
      recurringResourceRule(1, 1, 0, "once", {
        tags: [Tags.education],
        match: "any",
        seasons: [Season.Summer],
      }),
      draftMarkup(
        1,
        0,
        0,
        [Tags.education, Tags.career],
        [Season.Summer, Season.Fall]
      ),
      baseRegret(1),
    ],
  },
];

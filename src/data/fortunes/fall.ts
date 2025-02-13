import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
  ratio2to1,
  ratio3to1,
  ratio4to1,
  recurringResourceRule,
} from "../cardUtils";

export const FALL_FORTUNES: CardDef[] = [
  {
    name: "Affair",
    season: Season.Fall,
    tags: [Tags.love, Tags.mistake],
    rules: [
      baseRegret(1, {
        tags: [Tags.love],
        match: "any",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
      }),
      {
        type: "replacement",
        index: "last",
        match: {
          tags: [Tags.love],
          match: "any",
          seasons: [Season.Spring, Season.Summer, Season.Fall],
        },
      },
    ],
  },
  {
    name: "Bad Investing",
    season: Season.Fall,
    tags: [Tags.finance, Tags.mistake],
    rules: [
      baseResourceRule(0, -2, 0),
      recurringResourceRule(0, -2, 0, {
        trigger: "end-of-season",
        seasons: [Season.Fall],
      }),
    ],
  },
];

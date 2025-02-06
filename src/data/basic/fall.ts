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

export const FALL_CARDS: CardDef[] = [
  {
    name: "Mentee",
    season: Season.Fall,
    tags: [Tags.education, Tags.friend],
    rules: [
      // TODO
    ],
  },
  {
    name: "World Travel",
    season: Season.Fall,
    tags: [Tags.travel],
    rules: [costRule(1, 2, 0), baseTreasure(2)],
  },
  {
    name: "Executive",
    season: Season.Fall,
    tags: [Tags.career, Tags.finance],
    rules: [costRule(2, 0, 1), baseResourceRule(0, 6, 2)],
  },
  {
    name: "Empty Nesters",
    season: Season.Fall,
    tags: [Tags.family],
    rules: [
      draftDiscount(1, 1, 1, [Tags.travel, Tags.sunshine, Tags.finance]),
      baseRegret(1, {
        seasons: [Season.Winter],
        tags: [Tags.family],
        match: "none",
        ratio: ratio4to1,
      }),
    ],
  },
  {
    name: "Hobbyist",
    season: Season.Fall,
    tags: [Tags.creative, Tags.intellect],
    rules: [
      costRule(1, 1, 0),
      baseTreasure(1, {
        tags: [Tags.creative],
        match: "any",
        ratio: ratio2to1,
      }),
      baseTreasure(1, {
        tags: [Tags.sunshine, Tags.intellect],
        match: "any",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Marathon",
    season: Season.Fall,
    tags: [Tags.health, Tags.discipline],
    rules: [
      // discount on health
      // one treasure?
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.health, Tags.discipline]),
      baseTreasure(1),
    ],
  },
  {
    name: "Doctor's Orders",
    season: Season.Fall,
    tags: [Tags.health],
    rules: [
      // TODO -- this should do something with fate dice
    ],
  },
  {
    name: "National Parks",
    season: Season.Fall,
    tags: [Tags.sunshine, Tags.travel],
    rules: [costRule(0, 1, 0), baseTreasure(1)],
  },
  {
    name: "Deacon",
    season: Season.Fall,
    tags: [Tags.faith, Tags.community],
    rules: [
      baseTreasure(1, {
        tags: [Tags.faith, Tags.community],
        match: "any",
        ratio: ratio2to1,
        seasons: [Season.Fall, Season.Winter],
      }),
    ],
  },
  {
    name: "Down Sizing",
    season: Season.Fall,
    tags: [Tags.family, Tags.finance],
    rules: [
      // get some money back
      baseResourceRule(0, 2, 0),
      recurringResourceRule(0, 2, 0, {
        trigger: "end-of-season",
        seasons: [Season.Fall],
      }),
    ],
  },
  {
    name: "Old Friends",
    season: Season.Fall,
    tags: [Tags.friend],
    rules: [
      baseTreasure(1, {
        tags: [Tags.friend],
        match: "any",
        seasons: [Season.Spring, Season.Summer],
      }),
    ],
  },
  {
    name: "Jam Band",
    season: Season.Fall,
    tags: [Tags.creative, Tags.community],
    rules: [baseTreasure(1)],
  },
  {
    name: "Councilperson",
    season: Season.Fall,
    tags: [Tags.community, Tags.influence],
    rules: [
      costRule(1, 0, 2),
      recurringResourceRule(0, 0, 1, {
        trigger: "turn-start",
        seasons: [Season.Fall],
      }),
      draftDiscount(1, 1, 0, [Tags.community, Tags.influence]),
    ],
  },
  {
    name: "Good Investing",
    season: Season.Fall,
    tags: [Tags.finance],
    rules: [
      recurringResourceRule(
        0,
        2,
        0,
        {
          trigger: "end-of-season",
          seasons: [Season.Fall],
        },
        {
          tags: [Tags.finance, Tags.career],
          match: "any",
        }
      ),
    ],
  },
  {
    name: "15 Minutes",
    season: Season.Fall,
    tags: [Tags.influence],
    rules: [baseResourceRule(0, 0, 1)],
  },
  {
    name: "League (e.g. bowling)",
    season: Season.Fall,
    tags: [Tags.community, Tags.friend],
    rules: [baseTreasure(1)],
  },
  {
    name: "Family Reunions",
    season: Season.Fall,
    tags: [Tags.family],
    rules: [
      baseTreasure(1, {
        tags: [Tags.family],
        match: "any",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Expansion (franchising)",
    season: Season.Fall,
    tags: [Tags.career, Tags.finance],
    rules: [
      costRule(1, 1, 0),
      recurringResourceRule(
        0,
        1,
        0,
        {
          trigger: "end-of-season",
          seasons: [Season.Fall],
        },
        {
          tags: [Tags.finance, Tags.career],
          match: "any",
          ratio: {
            matches: 2,
            value: 3,
          },
        }
      ),
    ],
  },
  {
    name: "Competence",
    season: Season.Fall,
    tags: [Tags.confidence, Tags.education],
    rules: [
      costRule(1, 0, 0),
      baseResourceRule(0, 0, 1),
      baseTreasure(1, {
        tags: [Tags.education, Tags.career],
        match: "any",
        ratio: ratio3to1,
      }),
    ],
  },
  {
    name: "Cornerstone",
    season: Season.Fall,
    tags: [Tags.community, Tags.influence],
    rules: [
      costRule(1, 0, 1),
      baseTreasure(1, {
        tags: [Tags.community, Tags.influence],
        match: "any",
        ratio: ratio3to1,
      }),
    ],
  },
];

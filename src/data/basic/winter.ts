import { Season, Tags } from "../../types";
import {
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  ratio2to1,
  ratio3to1,
  ratio4to1,
} from "../cardUtils";

export const WINTER_CARDS: CardDef[] = [
  {
    name: "Grand Children",
    season: Season.Winter,
    tags: [Tags.family],
    rules: [
      baseTreasure(1, {
        tags: [Tags.family],
        match: "any",
        ratio: ratio2to1,
        seasons: [Season.Summer, Season.Fall],
      }),
    ],
  },
  {
    name: "Old Fools",
    season: Season.Winter,
    tags: [Tags.love],
    rules: [baseTreasure(1)],
  },
  {
    name: "Charitable Donations",
    season: Season.Winter,
    tags: [Tags.influence, Tags.community],
    rules: [
      // costs 4 money, get 2 treasures
      costRule(0, 6, 0),
      baseTreasure(2),
    ],
  },
  {
    name: "Constitutional",
    season: Season.Winter,
    tags: [Tags.health, Tags.friend],
    rules: [baseResourceRule(2, 0, 0)],
  },
  {
    name: "50 Years (Anniversary)",
    season: Season.Winter,
    tags: [Tags.love],
    rules: [
      baseTreasure(1, {
        tags: [Tags.love],
        match: "any",
        seasons: [Season.Summer, Season.Fall, Season.Winter],
      }),
    ],
  },
  {
    name: "Lifetime Achievement Award",
    season: Season.Winter,
    tags: [Tags.career],
    rules: [
      costRule(1, 0, 1),
      baseTreasure(1, {
        tags: [Tags.career],
        match: "any",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Sunshine Acres",
    season: Season.Winter,
    tags: [Tags.community, Tags.health],
    rules: [costRule(2, 2, 0)],
  },
  {
    name: "Memoirist",
    season: Season.Winter,
    tags: [Tags.creative, Tags.intellect],
    rules: [
      costRule(1, 0, 0),
      baseTreasure(1, {
        tags: [
          Tags.friend,
          Tags.love,
          Tags.faith,
          Tags.creative,
          Tags.sunshine,
          Tags.travel,
          Tags.career,
          Tags.education,
          Tags.discipline,
        ],
        match: "any",
        ratio: ratio4to1,
      }),
    ],
  },
  {
    name: "Matriarch/Patriarch",
    season: Season.Winter,
    tags: [Tags.family, Tags.influence],
    rules: [
      baseTreasure(1, {
        tags: [Tags.family],
        match: "any",
        seasons: [Season.Fall, Season.Winter],
      }),
    ],
  },
  {
    name: "Bridge Club",
    season: Season.Winter,
    tags: [Tags.friend, Tags.community],
    rules: [baseResourceRule(0, 0, 1)],
  },
  {
    name: "Beautiful Garden",
    season: Season.Winter,
    tags: [Tags.sunshine],
    rules: [
      costRule(1, 0, 0),
      baseTreasure(1, {
        tags: [Tags.sunshine],
        match: "any",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Golf Buddies",
    season: Season.Winter,
    tags: [Tags.friend, Tags.finance],
    rules: [baseTreasure(1)],
  },
  {
    name: "Fishing Buddies",
    season: Season.Winter,
    tags: [Tags.friend, Tags.sunshine],
    rules: [baseTreasure(1)],
  },
  {
    name: "Memories",
    season: Season.Winter,
    tags: [Tags.friend, Tags.love],
    rules: [
      baseTreasure(1, {
        tags: [Tags.friend, Tags.love],
        match: "any",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Solace",
    season: Season.Winter,
    tags: [Tags.faith],
    rules: [
      baseTreasure(1, {
        tags: [Tags.faith],
        match: "any",
        ratio: ratio3to1,
      }),
    ],
  },
  {
    name: "Snowbirds",
    season: Season.Winter,
    tags: [Tags.travel],
    rules: [
      costRule(1, 1, 0),
      baseTreasure(1, {
        tags: [Tags.travel, Tags.sunshine],
        match: "any",
        ratio: ratio4to1,
      }),
    ],
  },
  {
    name: "Four Generations",
    season: Season.Winter,
    tags: [Tags.family],
    rules: [
      baseTreasure(1, {
        tags: [Tags.family],
        match: "any",
        ratio: {
          matches: 5,
          value: 1,
        },
      }),
    ],
  },
  {
    name: "A Life's Work (e.g. art)",
    season: Season.Winter,
    tags: [Tags.creative],
    rules: [
      baseTreasure(1, {
        tags: [Tags.creative],
        match: "any",
        ratio: ratio3to1,
      }),
    ],
  },
  {
    name: "Back to Work",
    season: Season.Winter,
    tags: [Tags.career],
    rules: [costRule(1, 0, 0), baseResourceRule(0, 3, 0)],
  },
  {
    name: "Visitors",
    season: Season.Winter,
    tags: [Tags.friend],
    rules: [
      baseTreasure(1, {
        tags: [Tags.friend],
        match: "any",
        ratio: ratio2to1,
        seasons: [Season.Spring, Season.Summer],
      }),
    ],
  },
];

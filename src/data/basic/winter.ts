import { Season, Tags } from "../../types";
import {
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
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
    narrativeStatement: "{{name.p}} children had children.",
  },
  {
    name: "Old Fools",
    season: Season.Winter,
    tags: [Tags.love],
    rules: [baseTreasure(1)],
    narrativeStatement: "{{name}} found love in their twilight years.",
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
    narrativeStatement: "{{name}} gave back to the community.",
  },
  {
    name: "Constitutional",
    season: Season.Winter,
    tags: [Tags.health, Tags.friend],
    rules: [baseResourceRule(2, 0, 0)],
    narrativeStatement: "{{name}} took daily walks for sun and vigor.",
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
    narrativeStatement: "{{name}} celebrated 50 years of marriage.",
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
    narrativeStatement: "{{name.p}} employer recognized many years of service.",
  },
  {
    name: "Sunshine Acres",
    season: Season.Winter,
    tags: [Tags.community, Tags.health],
    rules: [
      costRule(2, 2, 0),
      draftDiscount(1, 0, 0, [Tags.community, Tags.health]),
    ],
    narrativeStatement: "{{name}} moved to a nice retirement community.",
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
          Tags.mistake,
          Tags.tragedy,
        ],
        match: "any",
        ratio: ratio4to1,
      }),
    ],
    narrativeStatement:
      '{{name}} penned {{pronoun.p}} memoirs - "it all began..."',
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
    narrativeStatement:
      "{{name}} was the head of a large, multigenerational family.",
  },
  {
    name: "Bridge Club",
    season: Season.Winter,
    tags: [Tags.friend, Tags.community],
    rules: [baseResourceRule(0, 0, 1)],
    narrativeStatement: "{{name}} made new friends playing cards.",
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
    narrativeStatement: "{{name}} spent hours tending to {{pronoun.p}} garden.",
  },
  {
    name: "Golf Buddies",
    season: Season.Winter,
    tags: [Tags.friend, Tags.finance],
    rules: [baseTreasure(1)],
    narrativeStatement:
      "{{name}} enjoyed many a round of golf with {{pronoun.p}} friends.",
  },
  {
    name: "Fishing Buddies",
    season: Season.Winter,
    tags: [Tags.friend, Tags.sunshine],
    rules: [baseTreasure(1)],
    narrativeStatement:
      "{{name}} enjoyed many a day fishing with {{pronoun.p}} friends.",
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
    narrativeStatement: "{{name}} reflected on fond memories.",
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
    narrativeStatement: "{{name}} found peace in {{pronoun.p}} faith.",
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
    narrativeStatement: "{{name}} spent winters in a warmer clime.",
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
    narrativeStatement:
      "<Snap> {{name}} was featured in a family photo of four generations.",
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
    narrativeStatement: "{{name}} looked back on a life's work of fine art.",
  },
  {
    name: "Back to Work",
    season: Season.Winter,
    tags: [Tags.career],
    rules: [costRule(1, 0, 0), baseResourceRule(0, 3, 0)],
    narrativeStatement: "{{name}} returned to work after retirement.",
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
    narrativeStatement: "{{name}} had many visitors.",
  },
  {
    name: "One last trip",
    season: Season.Winter,
    tags: [Tags.travel, Tags.sunshine],
    rules: [baseTreasure(2)],
    narrativeStatement: "{{name}} took one last big trip.",
  },
];

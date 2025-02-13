import { Season, Tags } from "../../types";
import {
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
  ignoreRegrets,
  ratio2to1,
  ratio3to1,
  recurringResourceRule,
} from "../cardUtils";

export const SUMMER_CARDS: CardDef[] = [
  {
    name: "College",
    season: Season.Summer,
    tags: [Tags.education, Tags.community],
    rules: [
      costRule(1, 2, 0),
      baseResourceRule(0, 0, 1),
      draftDiscount(1, 0, 0, [Tags.education, Tags.career]),
    ],
  },
  {
    name: "Grad School",
    season: Season.Summer,
    tags: [Tags.education, Tags.career],
    rules: [
      costRule(2, 2, 0),
      baseResourceRule(0, 0, 2),
      draftDiscount(2, 0, 0, [Tags.education, Tags.career]),
      baseTreasure(1, {
        tags: [Tags.education, Tags.intellect],
        match: "all",
        ratio: ratio3to1,
      }),
    ],
  },
  {
    name: "Starving Artist",
    season: Season.Summer,
    tags: [Tags.creative],
    rules: [baseResourceRule(0, 1, 1), draftDiscount(1, 0, 0, [Tags.creative])],
  },
  {
    name: "Used Car",
    season: Season.Summer,
    tags: [Tags.career],
    rules: [baseResourceRule(0, 2, -1)],
  },
  {
    name: "Luxury Vehicle",
    season: Season.Summer,
    tags: [Tags.influence, Tags.career],
    rules: [
      costRule(0, 2, 0),
      baseResourceRule(0, 0, 2),
      draftDiscount(1, 0, 0, [Tags.influence, Tags.confidence]),
    ],
  },
  {
    name: "Apartment Living",
    season: Season.Summer,
    tags: [Tags.finance, Tags.community],
    rules: [
      costRule(0, 1, 0),
      recurringResourceRule(0, 1, 0, {
        trigger: "end-of-season",
        seasons: [Season.Summer],
      }),
    ],
  },
  {
    name: "Blue Collar",
    season: Season.Summer,
    tags: [Tags.career, Tags.confidence],
    rules: [
      costRule(1, 0, 0),
      recurringResourceRule(0, 2, 0, {
        trigger: "end-of-season",
      }),
      draftDiscount(1, 0, 0, [Tags.discipline, Tags.community, Tags.sunshine]),
    ],
  },
  {
    name: "Cubical Farm",
    season: Season.Summer,
    tags: [Tags.career, Tags.finance],
    rules: [
      costRule(2, 0, 0),
      recurringResourceRule(0, 3, 0, {
        trigger: "end-of-season",
      }),
      draftDiscount(1, 0, 0, [Tags.career, Tags.influence, Tags.finance]),
    ],
  },
  {
    name: "Fraternity",
    season: Season.Summer,
    tags: [Tags.community, Tags.influence],
    rules: [
      // costs influence for recurring influence
      // career, influence, wealth discount
      costRule(0, 1, 1),
      recurringResourceRule(0, 0, 1, {
        trigger: "end-of-season",
        seasons: [Season.Spring, Season.Summer],
      }),
      draftDiscount(1, 0, 1, [Tags.career, Tags.influence, Tags.finance]),
    ],
  },
  {
    name: "Drinking Buddies",
    season: Season.Summer,
    tags: [Tags.friend],
    rules: [
      // TODO: need fate dice
    ],
  },
  {
    name: "Gap Year",
    season: Season.Summer,
    tags: [Tags.travel],
    rules: [
      costRule(0, 2, 0),
      baseTreasure(1, {
        tags: [Tags.travel, Tags.sunshine],
        match: "any",
        seasons: [Season.Summer, Season.Fall],
      }),
    ],
  },
  {
    name: "Childfree",
    season: Season.Summer,
    tags: [Tags.finance, Tags.travel],
    rules: [
      baseResourceRule(2, 3, 0),
      {
        type: "draft-cost",
        tags: [Tags.family],
        resources: {
          time: 1,
        },
      },
    ],
  },
  {
    name: "The One",
    season: Season.Summer,
    tags: [Tags.love],
    rules: [
      baseTreasure(2),
      baseTreasure(1, {
        tags: [Tags.love],
        match: "all",
        seasons: [Season.Fall, Season.Winter],
      }),
    ],
  },
  {
    name: "Prodigal",
    season: Season.Summer,
    tags: [Tags.faith, Tags.community],
    rules: [ignoreRegrets(1, { seasons: [] })],
  },
  {
    name: "Sharp",
    season: Season.Summer,
    tags: [Tags.career, Tags.intellect],
    rules: [draftDiscount(1, 0, 0, [Tags.career, Tags.intellect])],
  },
  {
    name: "Hustle",
    season: Season.Summer,
    tags: [Tags.career, Tags.discipline],
    rules: [
      costRule(2, 0, 0),
      recurringResourceRule(0, 2, 0, {
        trigger: "end-of-season",
        seasons: [Season.Summer, Season.Fall],
      }),
      draftDiscount(1, 1, 1, [Tags.career, Tags.finance]),
    ],
  },
  {
    name: "Service (military)",
    season: Season.Summer,
    tags: [Tags.discipline, Tags.community],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.discipline, Tags.career, Tags.confidence]),
      recurringResourceRule(0, 1, 0, {
        trigger: "end-of-season",
        seasons: [Season.Summer, Season.Fall],
      }),
      baseTreasure(1, {
        tags: [Tags.community, Tags.friend],
        match: "all",
        ratio: ratio2to1,
        seasons: [Season.Fall, Season.Winter],
      }),
    ],
  },
  {
    name: "Homeownership",
    season: Season.Summer,
    tags: [Tags.finance, Tags.family],
    rules: [
      costRule(0, 3, 0),
      recurringResourceRule(0, 3, 0, {
        trigger: "end-of-season",
        seasons: [Season.Summer, Season.Fall],
      }),
      draftDiscount(1, 1, 1, [Tags.finance], [Season.Fall, Season.Winter]),
    ],
  },
  {
    name: "Devout",
    season: Season.Summer,
    tags: [Tags.faith],
    rules: [
      baseTreasure(1, {
        tags: [Tags.faith],
        match: "all",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Matrimony",
    season: Season.Summer,
    tags: [Tags.love, Tags.faith],
    rules: [
      costRule(1, 1, 1),
      baseTreasure(1),
      baseTreasure(1, {
        tags: [Tags.love],
        match: "all",
        ratio: ratio2to1,
      }),
    ],
  },
  {
    name: "Found Family",
    season: Season.Summer,
    tags: [Tags.family, Tags.community],
    rules: [
      baseTreasure(1),
      baseTreasure(1, {
        tags: [Tags.family],
        match: "all",
        ratio: ratio2to1,
        seasons: [Season.Summer, Season.Fall, Season.Winter],
      }),
    ],
  },
  {
    name: "Kids",
    season: Season.Summer,
    tags: [Tags.family],
    rules: [
      costRule(1, 1, 0),
      recurringResourceRule(-1, -1, 0, {
        trigger: "end-of-season",
        seasons: [Season.Summer, Season.Fall, Season.Winter],
      }),
      {
        type: "draft-cost",
        tags: [Tags.family],
        resources: {
          time: -1,
        },
      },
      baseTreasure(1),
      baseTreasure(1, {
        tags: [Tags.family],
        match: "all",
        ratio: ratio3to1,
        seasons: [Season.Summer, Season.Fall, Season.Winter],
      }),
    ],
  },
];

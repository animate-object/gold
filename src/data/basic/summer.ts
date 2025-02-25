import { Season, Tags } from "../../types";
import {
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
  forceRollFateDice,
  ignoreRegrets,
  ratio2to1,
  ratio3to1,
  recurringResourceRule,
} from "../cardUtils";

export const SUMMER_CARDS: CardDef[] = [
  {
    name: "State School",
    season: Season.Summer,
    tags: [Tags.education, Tags.community],
    rules: [
      costRule(1, 2, 0),
      baseResourceRule(0, 0, 1),
      draftDiscount(1, 0, 1, [Tags.education, Tags.career]),
    ],
    narrativeStatement: "{{name}} went to State.",
  },
  {
    name: "Community College",
    season: Season.Summer,
    tags: [Tags.education, Tags.community],
    rules: [costRule(1, 0, 0), draftDiscount(1, 0, 0, [Tags.career])],
    narrativeStatement: "{{name}} went to Community College.",
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
    narrativeStatement: "{{name}} received a graduate degree.",
  },
  {
    name: "Starving Artist",
    season: Season.Summer,
    tags: [Tags.creative],
    rules: [baseResourceRule(0, 1, 1), draftDiscount(1, 0, 0, [Tags.creative])],
    narrativeStatement: "{{name}} sacrificed for their art.",
  },
  {
    name: "Used Car",
    season: Season.Summer,
    tags: [Tags.career],
    rules: [baseResourceRule(0, 2, -1)],
    narrativeStatement: "{{name}} drove a used car.",
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
    narrativeStatement: "{{name}} bought an expensive new car.",
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
    narrativeStatement: "{{name}} rented a modest apartment to save money.",
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
    narrativeStatement: "{{name}} worked a blue collar job.",
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
    narrativeStatement: "{{name}} worked in a corporate office.",
  },
  {
    name: "Fraternity/Sorority",
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
    narrativeStatement: "In school, {{name}} lived the Greek life.",
  },
  {
    name: "Drinking Buddies",
    season: Season.Summer,
    tags: [Tags.friend],
    rules: [forceRollFateDice()],
    narrativeStatement:
      "{{name}} liked to drink at the bar with a few close friends.",
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
    narrativeStatement: "{{name}} took a year off to go backpacking.",
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
    narrativeStatement: "{{name}} decided not to have kids, for now at least.",
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
    narrativeStatement: "{{name}} met {{pronoun.p}} soulmate.",
  },
  {
    name: "Prodigal",
    season: Season.Summer,
    tags: [Tags.faith, Tags.community],
    rules: [ignoreRegrets(1)],
    narrativeStatement:
      "{{name}} returned to the faith, and was welcomed with open arms.",
  },
  {
    name: "Sharp",
    season: Season.Summer,
    tags: [Tags.career, Tags.intellect],
    rules: [draftDiscount(1, 0, 0, [Tags.career, Tags.intellect])],
    narrativeStatement: "At work, seniors noticed {{name}} was sharp.",
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
    narrativeStatement: "{{name}} worked hard to get ahead.",
  },
  {
    name: "Service",
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
    narrativeStatement: "{{name}} served in the armed forces.",
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
    narrativeStatement:
      "{{name}} saved up and bought {{pronoun.p}} first home.",
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
    narrativeStatement:
      "{{name}} was a devoted believer and practioner of {{pronoun.p}} faith.",
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
    narrativeStatement: "{{name}} got hitched.",
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
    narrativeStatement: "{{name}} found family in unexpected places.",
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
    narrativeStatement: "{{name}} had kids.",
  },
];

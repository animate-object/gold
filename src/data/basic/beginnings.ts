import { Season, Tags } from "../../types";
import {
  baseResourceRule,
  baseTreasure,
  CardDef,
  ignoreRegrets,
  ratio2to1,
  ratio3to1,
  ratio4to1,
  recurringResourceRule,
} from "../cardUtils";

export const BEGINNINGS_CARDS: CardDef[] = [
  {
    name: "Silver Spoon",
    season: Season.Spring,
    tags: [Tags.finance, Tags.family],
    rules: [
      baseResourceRule(1, 3, 2),
      {
        type: "resources",
        resources: {
          money: 2,
          influence: 1,
        },
        recurrence: {
          seasons: [Season.Spring, Season.Summer],
          trigger: "end-of-season",
        },
      },
    ],
    narrativeStatement: "{{name}} was born to wealth and privilege.",
  },
  {
    name: "Overbearing Mother",
    season: Season.Spring,
    tags: [Tags.family, Tags.health],
    rules: [
      baseResourceRule(2, 1, 0),
      {
        type: "draft-cost",
        tags: [Tags.love],
        resources: {
          time: 1,
        },
      },
      {
        type: "draft-cost",
        tags: [Tags.family],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement:
      "{{name}} was raised by a mother who wanted the best for {{pronoun.o}}.",
  },
  {
    name: "Strict Father",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.career],
    rules: [
      baseResourceRule(1, 2, 1),
      {
        type: "draft-cost",
        tags: [Tags.friend, Tags.creative],
        resources: {
          time: 1,
        },
      },
      {
        type: "draft-cost",
        tags: [Tags.career, Tags.discipline],
        seasons: [Season.Spring, Season.Summer],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement: "{{name.p}} father was a strict disciplinarian.",
  },
  {
    name: "Military Brat",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.travel],
    rules: [
      baseResourceRule(1, 1, 2),
      {
        type: "draft-cost",
        tags: [Tags.friend, Tags.community],
        seasons: [Season.Spring, Season.Summer],
        resources: {
          time: 1,
        },
      },
      {
        type: "draft-cost",
        tags: [Tags.travel, Tags.career, Tags.discipline],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement: "{{name}} was raised on base, by a military family.",
  },
  {
    name: "Religious Upbringing",
    season: Season.Spring,
    tags: [Tags.faith, Tags.community],
    rules: [
      baseResourceRule(1, 1, 2),
      {
        type: "draft-cost",
        tags: [Tags.faith, Tags.community],
        resources: {
          time: -1,
          money: -1,
        },
      },
      baseTreasure(1, {
        match: "any",
        tags: [Tags.faith, Tags.community],
        ratio: ratio2to1,
      }),
    ],
    narrativeStatement: "{{name}} grew up in the church.",
  },
  {
    name: "Struggling Family",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      baseResourceRule(-1, 0, 0),
      baseTreasure(1, {
        match: "any",
        tags: [Tags.education, Tags.finance],
        ratio: ratio2to1,
      }),
    ],
    narrativeStatement:
      "{{name.p}} family sometimes struggled to make ends meet.",
  },
  {
    name: "Single Parent",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      baseResourceRule(0, -1, 0),
      {
        type: "draft-cost",
        tags: [Tags.confidence],
        resources: {
          time: -1,
        },
      },
      ignoreRegrets(2),
    ],
    narrativeStatement: "{{name}} was raised by a single parent.",
  },
  {
    name: "Older Siblings",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      baseResourceRule(1, 1, 0),
      baseTreasure(1, {
        tags: [Tags.creative, Tags.sunshine, Tags.confidence, Tags.intellect],
        match: "any",
        ratio: ratio4to1,
      }),
    ],
    narrativeStatement: "{{name}} was the youngest of several siblings.",
  },
  {
    name: "Small Town Life",
    season: Season.Spring,
    tags: [Tags.community, Tags.sunshine],
    rules: [
      baseResourceRule(1, 0, 0),
      {
        type: "draft-cost",
        tags: [Tags.community, Tags.sunshine],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement: "{{name}} grew up in a small country town.",
  },
  {
    name: "Farm Kid",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.discipline],
    rules: [
      baseResourceRule(1, 1, 0),
      {
        type: "draft-cost",
        tags: [Tags.sunshine, Tags.discipline],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement: "{{name}} grew up on the family farm.",
  },
  {
    name: "Urban Elite",
    season: Season.Spring,
    tags: [Tags.family, Tags.education],
    rules: [
      baseResourceRule(1, 2, 1),
      recurringResourceRule(0, 0, 1, {
        trigger: "end-of-season",
        seasons: [Season.Spring, Season.Summer],
      }),
      {
        type: "draft-cost",
        tags: [Tags.finance, Tags.education],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement: "{{name}} was born to well-educated urbanites.",
  },
  {
    name: "Eldest Child",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      baseResourceRule(1, 0, 1),
      recurringResourceRule(0, 0, 1, {
        seasons: [Season.Spring, Season.Summer, Season.Fall],
        trigger: "end-of-season",
      }),
      baseTreasure(1, {
        tags: [Tags.family],
        match: "all",
        ratio: ratio2to1,
        seasons: [Season.Spring, Season.Winter],
      }),
    ],
    narrativeStatement: "{{name}} was the eldest of several siblings.",
  },
  {
    name: "Child of Immigrants",
    season: Season.Spring,
    tags: [Tags.family, Tags.community],
    rules: [
      baseResourceRule(1, 1, 1),
      {
        type: "draft-cost",
        tags: [Tags.community, Tags.faith],
        resources: {
          time: -1,
        },
      },
      baseTreasure(1, {
        match: "any",
        tags: [Tags.community],
        ratio: ratio2to1,
      }),
    ],
    narrativeStatement: "{{name}} was born to first generation immigrants.",
  },
  {
    name: "Orphan",
    season: Season.Spring,
    tags: [Tags.tragedy],
    rules: [
      baseResourceRule(-1, 0, 0),
      {
        type: "draft-cost",
        tags: [Tags.family],
        resources: {
          time: 1,
        },
      },
      ignoreRegrets(3),
      baseTreasure(1, {
        tags: [Tags.family, Tags.community, Tags.finance],
        match: "any",
        ratio: ratio3to1,
      }),
    ],
    narrativeStatement: "{{name}} was raised in an orphanage.",
  },
  {
    name: "Only Child",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      baseResourceRule(2, 1, 0),
      {
        type: "draft-cost",
        tags: [Tags.friend, Tags.love],
        resources: {
          time: 1,
        },
      },
      {
        type: "draft-cost",
        tags: [Tags.confidence, Tags.creative],
        resources: {
          time: -1,
        },
      },
    ],
    narrativeStatement: "{{name}} grew up an only child.",
  },
  {
    name: "Twin",
    season: Season.Spring,
    tags: [Tags.family, Tags.friend],
    rules: [
      baseResourceRule(1, 1, 0),
      baseTreasure(1),
      {
        type: "draft-cost",
        tags: [Tags.friend],
        resources: {
          time: 1,
        },
      },
    ],
    narrativeStatement: "{{name}} had a twin!",
  },
];

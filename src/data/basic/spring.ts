import { Season, Tags } from "../../types";
import {
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
  draftMarkup,
  ratio2to1,
  recurringResourceRule,
} from "../cardUtils";

export const SPRING_CARDS: CardDef[] = [
  {
    name: "Family Dog",
    season: Season.Spring,
    tags: [Tags.friend, Tags.sunshine],
    rules: [baseTreasure(1), costRule(1, 1, 0)],
    narrativeStatement: "{{name}} loved their family dog.",
  },
  {
    name: "Talented Athlete",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.health],
    rules: [
      costRule(1, 0, 0),
      baseResourceRule(0, 0, 1),
      draftDiscount(1, 0, 0, [Tags.health, Tags.confidence]),
    ],
    narrativeStatement: "{{name}} exceled in several sports.",
  },
  {
    name: "First Love",
    season: Season.Spring,
    tags: [Tags.love],
    rules: [baseTreasure(1)],
    narrativeStatement: "{{name}} fell in love for the first time.",
  },
  {
    name: "Mathlete",
    season: Season.Spring,
    tags: [Tags.intellect, Tags.career],
    rules: [
      draftDiscount(1, 0, 0, [Tags.career, Tags.intellect, Tags.education]),
    ],
    narrativeStatement: "{{name}} competed with the Math club.",
  },
  {
    name: "Class Clown",
    season: Season.Spring,
    tags: [Tags.confidence, Tags.friend],
    rules: [
      costRule(0, 0, 1),
      recurringResourceRule(0, 0, 3, {
        trigger: "end-of-season",
        seasons: [Season.Spring],
      }),
    ],
    narrativeStatement: "{{name}} had a reputation as a bit of a joker.",
  },
  {
    name: "Scout",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.sunshine],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.confidence, Tags.discipline, Tags.sunshine]),
    ],
    narrativeStatement:
      "{{name}} learned all kinds of skills as a member of the scouts",
  },
  {
    name: "State Champs",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.confidence],
    rules: [
      costRule(1, 0, 0),
      baseTreasure(1),
      draftDiscount(1, 0, 0, [Tags.discipline]),
    ],
    narrativeStatement: "{{name}} played for the state championship team.",
  },
  {
    name: "Baby Brother/Sister",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      baseTreasure(1, {
        tags: [Tags.family],
        match: "all",
        ratio: ratio2to1,
        seasons: [Season.Spring],
      }),
    ],
    narrativeStatement: "{{name}} had a younger sibling.",
  },
  {
    name: "Beloved Grandparent",
    season: Season.Spring,
    tags: [Tags.family, Tags.friend],
    rules: [
      baseTreasure(1),
      recurringResourceRule(0, 2, 0, {
        trigger: "end-of-season",
        seasons: [Season.Spring],
      }),
    ],
    narrativeStatement:
      "{{name}} was particularly close with one of {{pronoun.p}} grandparents.",
  },
  {
    name: "First Job",
    season: Season.Spring,
    tags: [Tags.career, Tags.finance],
    rules: [
      costRule(1, 0, 0),
      baseResourceRule(0, 3, 0),
      draftDiscount(1, 0, 0, [Tags.career], [Season.Summer]),
    ],
    narrativeStatement: "{{name}} started {{pronoun.p}} work career early",
  },
  {
    name: "It Takes a Village",
    season: Season.Spring,
    tags: [Tags.community, Tags.influence],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.community, Tags.influence]),
    ],
    narrativeStatement:
      "{{name}} was raised in part by neighbors and community members.",
  },
  {
    name: "We Moved a Lot",
    season: Season.Spring,
    tags: [Tags.travel],
    rules: [
      costRule(0, 0, 0),
      draftMarkup(0, 0, 1, [Tags.friend], [Season.Spring]),
      draftDiscount(1, 0, 0, [Tags.travel]),
    ],
    narrativeStatement:
      "{{name.p}} family moved to several different  towns in {{pronoun.p}} youth.",
  },
  {
    name: "Summer Camp",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.creative],
    rules: [draftDiscount(1, 0, 0, [Tags.love, Tags.creative, Tags.sunshine])],
    narrativeStatement: "{{name}} made many fond memories at summer camp.",
  },
  {
    name: "Troublemaker",
    season: Season.Spring,
    tags: [Tags.confidence, Tags.creative],
    rules: [baseResourceRule(0, 0, 1), { type: "fate-roll" }],
    narrativeStatement: "{{name}} was a bit of a trouble maker.",
  },
  {
    name: "First Chair",
    season: Season.Spring,
    tags: [Tags.creative],
    rules: [
      costRule(1, 0, 0),
      baseTreasure(1),
      draftDiscount(1, 0, 0, [Tags.creative]),
    ],
    narrativeStatement:
      "With lots of hard work, {{name}} made first chair in the orchestra.",
  },
  {
    name: "Church Choir",
    season: Season.Spring,
    tags: [Tags.faith, Tags.creative],
    rules: [draftDiscount(1, 0, 0, [Tags.faith, Tags.creative])],
    narrativeStatement: "{{name}} sang in the church choir.",
  },
  {
    name: "Gifted",
    season: Season.Spring,
    tags: [Tags.intellect, Tags.creative],
    rules: [
      draftDiscount(1, 0, 0, [Tags.intellect, Tags.creative, Tags.career]),
    ],
    narrativeStatement:
      "{{name}} had outstanding marks on several tests of intelligence.",
  },
  {
    name: "Popular",
    season: Season.Spring,
    tags: [Tags.friend, Tags.community],
    rules: [
      costRule(0, 0, 1),
      draftDiscount(1, 1, 1, [Tags.friend, Tags.community]),
    ],
    narrativeStatement: "{{name}} was widely admired and had many friends.",
  },
  {
    name: "Studious",
    season: Season.Spring,
    tags: [Tags.education, Tags.intellect],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.education, Tags.career]),
    ],
    narrativeStatement: "{{name}} studied hard to earn good grades.",
  },
];

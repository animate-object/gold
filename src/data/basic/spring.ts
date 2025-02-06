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
  },
  {
    name: "First Love",
    season: Season.Spring,
    tags: [Tags.love],
    rules: [baseTreasure(1)],
  },
  {
    name: "Mathlete",
    season: Season.Spring,
    tags: [Tags.intellect, Tags.career],
    rules: [
      draftDiscount(1, 0, 0, [Tags.career, Tags.intellect, Tags.education]),
    ],
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
  },
  {
    name: "Scout",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.sunshine],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.confidence, Tags.discipline, Tags.sunshine]),
    ],
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
  },
  {
    name: "It Takes a Village",
    season: Season.Spring,
    tags: [Tags.community, Tags.influence],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.community, Tags.influence]),
    ],
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
  },
  {
    name: "Summer Camp",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.creative],
    rules: [draftDiscount(1, 0, 0, [Tags.love, Tags.creative, Tags.sunshine])],
  },
  {
    name: "Childhood Illness",
    season: Season.Spring,
    tags: [Tags.health],
    rules: [
      // TODO this belongs in fate deck
    ],
  },
  {
    name: "Troublemaker",
    season: Season.Spring,
    tags: [Tags.confidence, Tags.creative],
    rules: [
      // TODO fate dice
    ],
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
  },
  {
    name: "Sacred Choral",
    season: Season.Spring,
    tags: [Tags.faith, Tags.creative],
    rules: [draftDiscount(1, 0, 0, [Tags.faith, Tags.creative])],
  },
  {
    name: "Gifted",
    season: Season.Spring,
    tags: [Tags.intellect, Tags.creative],
    rules: [
      draftDiscount(1, 0, 0, [Tags.intellect, Tags.creative, Tags.career]),
    ],
  },
  {
    name: "Popular",
    season: Season.Spring,
    tags: [Tags.friend, Tags.community],
    rules: [
      costRule(0, 0, 1),
      draftDiscount(1, 1, 1, [Tags.friend, Tags.community]),
    ],
  },
  {
    name: "Studious",
    season: Season.Spring,
    tags: [Tags.education, Tags.intellect],
    rules: [
      costRule(1, 0, 0),
      draftDiscount(1, 0, 0, [Tags.education, Tags.career]),
    ],
  },
];

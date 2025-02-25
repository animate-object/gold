import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseResourceRule,
  baseTreasure,
  CardDef,
  costRule,
  draftDiscount,
  ignoreRegrets,
  ratio2to1,
  ratio3to1,
  ratio4to1,
  recurringResourceRule,
} from "../cardUtils";

export const FALL_CARDS: CardDef[] = [
  {
    name: "Therapy",
    season: Season.Fall,
    tags: [Tags.health],
    rules: [costRule(0, 1, 0), ignoreRegrets(1)],
    narrativeStatement: "{{name}} unpacked it all in therapy.",
  },

  {
    name: "World Travel",
    season: Season.Fall,
    tags: [Tags.travel],
    rules: [costRule(1, 2, 0), baseTreasure(2)],
    narrativeStatement: "{{name}} saw the world.",
  },
  {
    name: "Executive",
    season: Season.Fall,
    tags: [Tags.career, Tags.finance],
    rules: [
      costRule(4, 0, 2),
      baseResourceRule(0, 6, 2),
      recurringResourceRule(0, 4, 1, {
        trigger: "end-of-season",
        seasons: [Season.Fall],
      }),
    ],
    narrativeStatement:
      "{{name}} climbed the corporate ladder, all the way to the top.",
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
    narrativeStatement: "{{name.p}} children moved out. Sure is quiet now.",
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
    narrativeStatement: "{{name}} kept several hobbies.",
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
    narrativeStatement: "{{name}} trained hard for the long run.",
  },
  {
    name: "Doctor's Orders",
    season: Season.Fall,
    tags: [Tags.health],
    rules: [
      recurringResourceRule(2, 0, 0, {
        trigger: "end-of-season",
      }),
      draftDiscount(1, 1, 0, [Tags.health]),
    ],
    narrativeStatement:
      "{{name}} got some tough advice from {{pronoun.p}} doctor, and took it seriously.",
  },
  {
    name: "National Parks",
    season: Season.Fall,
    tags: [Tags.sunshine, Tags.travel],
    rules: [costRule(0, 1, 0), baseTreasure(1)],
    narrativeStatement:
      "{{name}} fell in love with nature, and visited many national parks.",
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
    narrativeStatement: "{{name}} was a deacon in {{pronoun.p}} church.",
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
    narrativeStatement:
      "{{name}} sold {{pronoun.p}} house and moved to a condo.",
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
    narrativeStatement:
      "{{name}} stayed in touch with many of {{pronoun.p}} old friends.",
  },
  {
    name: "Jam Band",
    season: Season.Fall,
    tags: [Tags.creative, Tags.community],
    rules: [baseTreasure(1)],
    narrativeStatement: "{{name}} played in a jam band. Aw yeah.",
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
    narrativeStatement: "{{name}} was elected to the local city council.",
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
    narrativeStatement: "{{name}} made some good investments.",
  },
  {
    name: "15 Minutes",
    season: Season.Fall,
    tags: [Tags.influence],
    rules: [baseResourceRule(0, 0, 1)],
    narrativeStatement: "{{name}} had a brief moment of fame.",
  },
  {
    name: "League (e.g. bowling)",
    season: Season.Fall,
    tags: [Tags.community, Tags.friend],
    rules: [baseTreasure(1)],
    narrativeStatement: "{{name}} played on a league team.",
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
    narrativeStatement: "{{name}} organized several family reunions.",
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
    narrativeStatement:
      "{{name}} expanded {{pronoun.p}} business to a second location. The sky's the limit!",
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
    narrativeStatement: "{{name}} entered an era of great competence.",
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
    narrativeStatement: "{{name}} was a pillar of {{pronoun.p}} community.",
  },
];

import {
  Card,
  CostRule,
  DraftCostRule,
  Recurrence,
  ResourceRule,
  ScoringRule,
  Season,
  TagMatchRules,
  Tags,
} from "../types";

// beginnings cards are special spring cards

const baseResourceRule = (
  time: number,
  money: number,
  influence: number
): ResourceRule => ({
  type: "resources",
  resources: { money, influence, time },
  recurrence: "once",
});

const recurringResourceRule = (
  time: number,
  money: number,
  influence: number,
  recurrence: Recurrence,
  match: TagMatchRules | undefined = undefined
): ResourceRule => ({
  type: "resources",
  resources: { money, influence, time },
  recurrence,
  match,
});

const baseTreasure = (
  amount: number,
  match: TagMatchRules | undefined = undefined
): ScoringRule => ({
  type: "scoring",
  variant: "treasures",
  amount,
  match,
});

const baseRegret = (
  amount: number,
  match: TagMatchRules | undefined = undefined
): ScoringRule => ({
  type: "scoring",
  variant: "regrets",
  amount,
  match,
});

const costRule = (
  time: number,
  money: number,
  influence: number
): CostRule => ({
  type: "cost",
  resources: { money, influence, time },
});

const draftMarkup = (
  time: number,
  money: number,
  influence: number,
  tags: Tags[],
  seasons: Season[] | undefined = undefined
): DraftCostRule => ({
  type: "draft-cost",
  resources: { money, influence, time },
  tags,
  seasons,
});

const draftDiscount = (
  time: number,
  money: number,
  influence: number,
  tags: Tags[],
  seasons: Season[] | undefined = undefined
): DraftCostRule => ({
  type: "draft-cost",
  resources: { money: -money, influence: -influence, time: -time },
  tags,
  seasons,
});

const ignoreRegrets = (n: number) => baseRegret(-n);

const ratio2to1 = { matches: 2, value: 1 };
const ratio3to1 = { matches: 3, value: 1 };
const ratio4to1 = { matches: 4, value: 1 };

const BEGINNINGS_CARDS: Omit<Card, "id">[] = [
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
  },
];

const SPRING_CARDS: Omit<Card, "id">[] = [
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

const SUMMER_CARDS: Omit<Card, "id">[] = [
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
    rules: [ignoreRegrets(1)],
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

const FALL_CARDS: Omit<Card, "id">[] = [
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

const WINTER_CARDS: Omit<Card, "id">[] = [
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
      costRule(4, 0, 0),
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

export {
  BEGINNINGS_CARDS,
  SPRING_CARDS,
  SUMMER_CARDS,
  FALL_CARDS,
  WINTER_CARDS,
};

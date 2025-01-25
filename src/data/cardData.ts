import { Card, Season, Tags } from "../types";

// beginnings cards are special spring cards

const BEGINNINGS_CARDS: Omit<Card, "id">[] = [
  {
    name: "Silver Spoon",
    season: Season.Spring,
    tags: [Tags.wealth, Tags.family],
    rules: [
      {
        type: "resources",
        resources: {
          money: 2,
          influence: 1,
        },
        recurrence: "once",
      },

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
      {
        type: "resources",
        resources: {
          money: 1,
        },
        recurrence: "once",
      },
    ],
  },
  {
    name: "Strict Father",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.career],
    rules: [
      {
        type: "resources",
        resources: {
          money: 1,
        },
        recurrence: "once",
      },
    ],
  },
  {
    name: "Military Brat",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.travel],
    rules: [],
  },
  {
    name: "Religious Upbringing",
    season: Season.Spring,
    tags: [Tags.faith, Tags.community],
    rules: [],
  },
  {
    name: "Struggling Family",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Single Parent",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Older Siblings",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [
      {
        type: "resources",
        resources: {
          influence: 1,
        },
        recurrence: {
          seasons: [Season.Spring, Season.Summer],
          trigger: "end-of-season",
        },
        match: {
          match: "any",
          tags: [Tags.family, Tags.friend],
          ratio: {
            matches: 2,
            value: 1,
          },
        },
      },
    ],
  },
  {
    name: "Small Town Life",
    season: Season.Spring,
    tags: [Tags.community, Tags.sunshine],
    rules: [],
  },
  {
    name: "Farm Kid",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.discipline],
    rules: [],
  },
  {
    name: "Urban Elite",
    season: Season.Spring,
    tags: [Tags.family, Tags.education],
    rules: [],
  },
  {
    name: "Eldest Child",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Child of Immigrants",
    season: Season.Spring,
    tags: [Tags.family, Tags.community],
    rules: [],
  },
  {
    name: "Orphan",
    season: Season.Spring,
    tags: [Tags.tragedy],
    rules: [],
  },
  {
    name: "Only Child",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Twin",
    season: Season.Spring,
    tags: [Tags.family, Tags.friend],
    rules: [],
  },
];

const SPRING_CARDS: Omit<Card, "id">[] = [
  {
    name: "Family Dog",
    season: Season.Spring,
    tags: [Tags.friend, Tags.sunshine],
    rules: [],
  },
  {
    name: "Talented Athlete",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.health],
    rules: [],
  },
  {
    name: "First Love",
    season: Season.Spring,
    tags: [Tags.love],
    rules: [],
  },
  {
    name: "Mathlete",
    season: Season.Spring,
    tags: [Tags.intellect, Tags.career],
    rules: [
      {
        type: "replacement",
        match: {
          tags: [Tags.family],
          match: "all",
        },
        index: "first",
      },
    ],
  },
  {
    name: "Class Clown",
    season: Season.Spring,
    tags: [Tags.confidence, Tags.friend],
    rules: [],
  },
  {
    name: "Scout",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.sunshine],
    rules: [],
  },
  {
    name: "State Champs",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.confidence],
    rules: [],
  },
  {
    name: "Baby Brother/Sister",
    season: Season.Spring,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Beloved Grandparent",
    season: Season.Spring,
    tags: [Tags.family, Tags.friend],
    rules: [],
  },
  {
    name: "First Job",
    season: Season.Spring,
    tags: [Tags.career, Tags.wealth],
    rules: [],
  },
  {
    name: "It Takes a Village",
    season: Season.Spring,
    tags: [Tags.community, Tags.influence],
    rules: [],
  },
  {
    name: "We Moved a Lot",
    season: Season.Spring,
    tags: [Tags.travel],
    rules: [],
  },
  {
    name: "Summer Camp",
    season: Season.Spring,
    tags: [Tags.sunshine, Tags.creative],
    rules: [],
  },
  {
    name: "Childhood Illness",
    season: Season.Spring,
    tags: [Tags.health],
    rules: [],
  },
  {
    name: "Troublemaker",
    season: Season.Spring,
    tags: [Tags.confidence, Tags.creative],
    rules: [],
  },
  {
    name: "First Chair",
    season: Season.Spring,
    tags: [Tags.creative],
    rules: [],
  },
  {
    name: "Sacred Choral",
    season: Season.Spring,
    tags: [Tags.faith, Tags.creative],
    rules: [],
  },
  {
    name: "Gifted",
    season: Season.Spring,
    tags: [Tags.intellect, Tags.creative],
    rules: [],
  },
  {
    name: "Popular",
    season: Season.Spring,
    tags: [Tags.friend, Tags.community],
    rules: [],
  },
  {
    name: "Studious",
    season: Season.Spring,
    tags: [Tags.education, Tags.intellect],
    rules: [],
  },
];

const SUMMER_CARDS: Omit<Card, "id">[] = [
  {
    name: "College",
    season: Season.Summer,
    tags: [Tags.education, Tags.community],
    rules: [],
  },
  {
    name: "Grad School",
    season: Season.Summer,
    tags: [Tags.education, Tags.career],
    rules: [],
  },
  {
    name: "Starving Artist",
    season: Season.Summer,
    tags: [Tags.creative],
    rules: [],
  },
  {
    name: "Used Car",
    season: Season.Summer,
    tags: [Tags.career],
    rules: [],
  },
  {
    name: "Luxury Vehicle",
    season: Season.Summer,
    tags: [Tags.influence, Tags.career],
    rules: [],
  },
  {
    name: "Apartment Living",
    season: Season.Summer,
    tags: [],
    rules: [],
  },
  {
    name: "Blue Collar",
    season: Season.Summer,
    tags: [Tags.career, Tags.confidence],
    rules: [],
  },
  {
    name: "Cubical Farm",
    season: Season.Summer,
    tags: [Tags.career, Tags.wealth],
    rules: [],
  },
  {
    name: "Fraternity",
    season: Season.Summer,
    tags: [Tags.community, Tags.influence],
    rules: [],
  },
  {
    name: "Drinking Buddies",
    season: Season.Summer,
    tags: [Tags.friend],
    rules: [],
  },
  {
    name: "Gap Year",
    season: Season.Summer,
    tags: [Tags.travel],
    rules: [],
  },
  {
    name: "Childfree",
    season: Season.Summer,
    tags: [Tags.wealth, Tags.travel],
    rules: [],
  },
  {
    name: "The One",
    season: Season.Summer,
    tags: [Tags.love],
    rules: [],
  },
  {
    name: "Prodigal",
    season: Season.Summer,
    tags: [Tags.faith, Tags.community],
    rules: [],
  },
  {
    name: "Sharp",
    season: Season.Summer,
    tags: [Tags.career, Tags.intellect],
    rules: [],
  },
  {
    name: "Hustle",
    season: Season.Summer,
    tags: [Tags.career, Tags.discipline],
    rules: [],
  },
  {
    name: "Service (military)",
    season: Season.Summer,
    tags: [Tags.discipline, Tags.community],
    rules: [],
  },
  {
    name: "Homeownership",
    season: Season.Summer,
    tags: [Tags.wealth, Tags.family],
    rules: [],
  },
  {
    name: "Devout",
    season: Season.Summer,
    tags: [Tags.faith],
    rules: [],
  },
  {
    name: "Matrimony",
    season: Season.Summer,
    tags: [Tags.love, Tags.faith],
    rules: [],
  },
  {
    name: "Found Family",
    season: Season.Summer,
    tags: [Tags.family, Tags.community],
    rules: [],
  },
];

const FALL_CARDS: Omit<Card, "id">[] = [
  {
    name: "Mentee",
    season: Season.Fall,
    tags: [Tags.education, Tags.friend],
    rules: [],
  },
  {
    name: "World Travel",
    season: Season.Fall,
    tags: [Tags.travel],
    rules: [],
  },
  {
    name: "Executive",
    season: Season.Fall,
    tags: [Tags.career, Tags.wealth],
    rules: [],
  },
  {
    name: "Empty Nesters",
    season: Season.Fall,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Hobbyist",
    season: Season.Fall,
    tags: [Tags.creative, Tags.intellect],
    rules: [],
  },
  {
    name: "Marathon",
    season: Season.Fall,
    tags: [Tags.health, Tags.discipline],
    rules: [],
  },
  {
    name: "Doctor's Orders",
    season: Season.Fall,
    tags: [Tags.health],
    rules: [],
  },
  {
    name: "National Parks",
    season: Season.Fall,
    tags: [Tags.sunshine, Tags.travel],
    rules: [],
  },
  {
    name: "Deacon",
    season: Season.Fall,
    tags: [Tags.faith, Tags.community],
    rules: [],
  },
  {
    name: "Down Sizing",
    season: Season.Fall,
    tags: [Tags.family, Tags.wealth],
    rules: [],
  },
  {
    name: "Old Friends",
    season: Season.Fall,
    tags: [Tags.friend],
    rules: [],
  },
  {
    name: "Jam Band",
    season: Season.Fall,
    tags: [Tags.creative, Tags.community],
    rules: [],
  },
  {
    name: "Councilperson",
    season: Season.Fall,
    tags: [Tags.community, Tags.influence],
    rules: [],
  },
  {
    name: "Good Investing",
    season: Season.Fall,
    tags: [Tags.wealth],
    rules: [],
  },
  {
    name: "15 Minutes",
    season: Season.Fall,
    tags: [Tags.influence],
    rules: [],
  },
  {
    name: "League (e.g. bowling)",
    season: Season.Fall,
    tags: [Tags.community, Tags.friend],
    rules: [],
  },
  {
    name: "Family Reunions",
    season: Season.Fall,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Expansion (franchising)",
    season: Season.Fall,
    tags: [Tags.career, Tags.wealth],
    rules: [],
  },
  {
    name: "Competence",
    season: Season.Fall,
    tags: [Tags.confidence, Tags.education],
    rules: [],
  },
  {
    name: "Cornerstone",
    season: Season.Fall,
    tags: [Tags.community, Tags.influence],
    rules: [],
  },
];

const WINTER_CARDS: Omit<Card, "id">[] = [
  {
    name: "Grand Children",
    season: Season.Winter,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "Old Fools",
    season: Season.Winter,
    tags: [Tags.love],
    rules: [],
  },
  {
    name: "Charitable Donations",
    season: Season.Winter,
    tags: [Tags.influence, Tags.community],
    rules: [],
  },
  {
    name: "Constitutional",
    season: Season.Winter,
    tags: [Tags.health, Tags.friend],
    rules: [],
  },
  {
    name: "50 Years (Anniversary)",
    season: Season.Winter,
    tags: [Tags.love],
    rules: [],
  },
  {
    name: "Lifetime Achievement Award",
    season: Season.Winter,
    tags: [Tags.career],
    rules: [],
  },
  {
    name: "Sunshine Acres",
    season: Season.Winter,
    tags: [Tags.community, Tags.health],
    rules: [],
  },
  {
    name: "Memoirist",
    season: Season.Winter,
    tags: [Tags.creative, Tags.intellect],
    rules: [],
  },
  {
    name: "Matriarch/Patriarch",
    season: Season.Winter,
    tags: [Tags.family, Tags.influence],
    rules: [],
  },
  {
    name: "Bridge Club",
    season: Season.Winter,
    tags: [Tags.friend, Tags.community],
    rules: [],
  },
  {
    name: "Beautiful Garden",
    season: Season.Winter,
    tags: [Tags.sunshine],
    rules: [],
  },
  {
    name: "Golf Buddies",
    season: Season.Winter,
    tags: [Tags.friend, Tags.wealth],
    rules: [],
  },
  {
    name: "Fishing Buddies",
    season: Season.Winter,
    tags: [Tags.friend, Tags.sunshine],
    rules: [],
  },
  {
    name: "Memories",
    season: Season.Winter,
    tags: [Tags.friend, Tags.love],
    rules: [],
  },
  {
    name: "Solace",
    season: Season.Winter,
    tags: [Tags.faith],
    rules: [],
  },
  {
    name: "Snowbirds",
    season: Season.Winter,
    tags: [Tags.travel],
    rules: [],
  },
  {
    name: "Four Generations",
    season: Season.Winter,
    tags: [Tags.family],
    rules: [],
  },
  {
    name: "A Life's Work (e.g. art)",
    season: Season.Winter,
    tags: [Tags.creative],
    rules: [],
  },
  {
    name: "Back to Work",
    season: Season.Winter,
    tags: [Tags.career],
    rules: [],
  },
  {
    name: "Visitors",
    season: Season.Winter,
    tags: [Tags.friend],
    rules: [],
  },
];

export {
  BEGINNINGS_CARDS,
  SPRING_CARDS,
  SUMMER_CARDS,
  FALL_CARDS,
  WINTER_CARDS,
};

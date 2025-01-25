// Silver spoon	0 Beginnings	wealth	family
// Overbearing mother	0 Beginnings	family	health
// Strict father	0 Beginnings	discipline	career
// Military brat	0 Beginnings	discipline	travel
// Religious upbringing	0 Beginnings	faith	community
// Struggling family	0 Beginnings	family
// Single parent	0 Beginnings	family
// Older siblings	0 Beginnings	family
// Small town life	0 Beginnings	community	sunshine
// Farm kid	0 Beginnings	sunshine	discipline
// Urban elite	0 Beginnings	family	education
// Eldest child	0 Beginnings	family
// Child of immigrants	0 Beginnings	family	community
// Orphan	0 Beginnings	tragedy
// Only child	0 Beginnings	family
// Twin	0 Beginnings	family	friend
// Family dog	1 Spring	friend	sunshine
// Talented athlete	1 Spring	sunshine	health
// First love	1 Spring	love
// Mathlete	1 Spring	intellect	career
// Class clown	1 Spring	confidence	friend
// Scout	1 Spring	discipline	sunshine
// State champs	1 Spring	discipline	confidence
// Baby brother/sister	1 Spring	family
// Beloved grandparent	1 Spring	family	friend
// First job	1 Spring	career	wealth
// It takes a village	1 Spring	community	influence
// "We moved a lot"	1 Spring	travel
// Summer camp	1 Spring	sunshine	creative
// Childhood illness	1 Spring	health
// troublemaker	1 Spring	confidence	creative
// First chair	1 Spring	creative
// Sacred choral	1 Spring	faith	creative
// Gifted	1 Spring	intellect	creative
// Popular	1 Spring	friend	community
// Studious	1 Spring	education	intellect
// College	2 Summer	education	community
// Grad school	2 Summer	education	career
// Starving artist	2 Summer	creative
// Used car	2 Summer	career
// Luxury vehicle	2 Summer	influence	career
// Apartment living	2 Summer
// Blue collar	2 Summer	career	confidence
// Cubical farm	2 Summer	career	wealth
// Fraternity	2 Summer	community	influence
// Drinking buddies	2 Summer	friend
// Gap year	2 Summer	travel
// Childfree	2 Summer	wealth	travel
// The one	2 Summer	love
// Prodigal	2 Summer	faith	community
// Sharp	2 Summer	career	intellect
// Hustle	2 Summer	career	discipline
// Service (military)	2 Summer	discipline	community
// Homeownership	2 Summer	wealth	family
// Devout	2 Summer	faith
// Matrimony	2 Summer	love	faith
// Mentee	3 Fall	education	friend
// World Travel	3 Fall	travel
// Executive	3 Fall	career	wealth
// Empty Nesters	3 Fall	family
// Hobbyist	3 Fall	creative	intellect
// Marathon	3 Fall	health	discipline
// Doctor's Orders	3 Fall	health
// National Parks	3 Fall	sunshine	travel
// Deacon	3 Fall	faith	community
// Down sizing	3 Fall	family	wealth
// Old friends	3 Fall	friend
// Jam band	3 Fall	creative	community
// Councilperson	3 Fall	community	influence
// Good Investing	3 Fall	wealth
// 15 Minutes	3 Fall	influence
// League (e.g. bowling)	3 Fall	community	friend
// Family Reunions	3 Fall	family
// Expansion (franchising)	3 Fall	career	wealth
// Competence	3 Fall	confidence	education
// Cornerstone	3 Fall	community	influence
// Grand Children	4 Winter	family
// Old Fools	4 Winter	love
// Charitable Donations	4 Winter	influence	community
// Constitutional	4 Winter	health	friend
// 50 years (anniversary)	4 Winter	love
// Lifetime Achievement Award	4 Winter	career
// Sunshine Acres	4 Winter	community	health
// Memoirist	4 Winter	creative	intellect
// Matriarch/Patriarch	4 Winter	family	influence
// Bridge club	4 Winter	friend	community
// Beautiful Garden	4 Winter	sunshine
// Golf Buddies	4 Winter	friend	wealth
// Fishing Buddies	4 Winter	friend	sunshine
// Memories	4 Winter	friend	love
// Solace	4 Winter	faith
// snowbirds	4 Winter	travel
// Four Generations	4 Winter	family
// A life's work (e.g. art)	4 Winter	creative
// Back to work	4 Winter	career
// Visitors	4 Winter	friend
// Found Family	2 Summer	family	community
// Mentor

import { Card, Season, Tags } from "../types";

// beginnings cards are special spring cards

const BEGINNINGS_CARDS: Omit<Card, "id">[] = [
  {
    name: "Silver Spoon",
    season: Season.Spring,
    tags: [Tags.wealth, Tags.family],
    rules: [],
  },
  {
    name: "Overbearing Mother",
    season: Season.Spring,
    tags: [Tags.family, Tags.health],
    rules: [],
  },
  {
    name: "Strict Father",
    season: Season.Spring,
    tags: [Tags.discipline, Tags.career],
    rules: [],
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
    rules: [],
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
    rules: [],
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

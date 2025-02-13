import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseTreasure,
  CardDef,
  ratio3to1,
  ratio4to1,
} from "../cardUtils";

export const WINTER_FORTUNES: CardDef[] = [
  {
    name: "Loneliness",
    season: Season.Winter,
    tags: [Tags.mistake],
    rules: [
      baseRegret(1, {
        tags: [Tags.friend, Tags.family, Tags.love],
        match: "none",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
        ratio: ratio4to1,
      }),
    ],
  },
  {
    name: "All work, no play",
    season: Season.Winter,
    tags: [Tags.mistake],
    rules: [
      baseRegret(1, {
        tags: [Tags.career, Tags.discipline, Tags.education],
        match: "any",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
        ratio: ratio3to1,
      }),
      baseTreasure(1, {
        tags: [Tags.sunshine, Tags.travel, Tags.friend, Tags.creative],
        match: "any",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
        ratio: ratio3to1,
      }),
    ],
  },
];

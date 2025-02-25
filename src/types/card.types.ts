import type { Rule } from "./rule.types";
import type { Season } from "./season.types";

enum Tags {
  // people tags
  family = "family",
  friend = "friend",
  love = "love",
  community = "community",
  // disposition tags
  discipline = "discipline",
  faith = "faith",
  intellect = "intellect",
  creative = "creative",
  // activity tags
  sunshine = "sunshine", // fitness, sport & nature
  travel = "travel",
  career = "career",
  education = "education",
  // life tags
  finance = "finance",
  health = "health",
  influence = "influence",
  confidence = "confidence",
  // fortune
  boon = "boon",
  growth = "growth",
  // misfortunes
  tragedy = "tragedy",
  mistake = "mistake",
}

type CardId = number;

interface Card {
  id: CardId;
  rules: Rule[];
  name: string;
  season: Season;
  tags: Tags[];
  beginningCard?: boolean;
  fortune?: boolean;
  narrativeStatement?: string;
}

export type { Card, CardId };
export { Tags };

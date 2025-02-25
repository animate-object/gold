import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseResourceRule,
  baseTreasure,
  CardDef,
  draftDiscount,
  draftMarkup,
  forceRollFateDice,
  ratio2to1,
  recurringResourceRule,
  replacement,
} from "../cardUtils";

const fallFortune = (
  name: string,
  tags: Tags[],
  rules: CardDef["rules"],
  narrativeStatement: string | undefined = undefined
) => ({
  name,
  season: Season.Fall,
  tags,
  rules,
  narrativeStatement,
});

export const FALL_FORTUNES: CardDef[] = [
  fallFortune(
    "Affair",
    [Tags.love, Tags.mistake],
    [
      baseRegret(1, {
        tags: [Tags.love],
        match: "any",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
      }),
      {
        type: "replacement",
        index: "last",
        match: {
          tags: [Tags.love],
          match: "any",
          seasons: [Season.Spring, Season.Summer, Season.Fall],
        },
      },
    ],
    "{{name}} risked it all for forbidden love."
  ),
  fallFortune(
    "Bad investing",
    [Tags.mistake],
    [
      baseResourceRule(0, -2, 0),
      recurringResourceRule(0, -2, 0, {
        trigger: "end-of-season",
        seasons: [Season.Fall],
      }),
    ],
    "{{name}} made some bad investments and lost money."
  ),
  fallFortune(
    "Excommunicated",
    [Tags.mistake],
    [baseRegret(1), draftMarkup(5, 0, 0, [Tags.faith])],
    "Sinner! Heretic! {{name}} was excommunicated from the church."
  ),
  fallFortune(
    "Laid off (fall)",
    [Tags.tragedy],
    [
      baseResourceRule(1, -1, -1),
      draftMarkup(
        1,
        0,
        0,
        [Tags.career, Tags.confidence],
        [Season.Summer, Season.Fall]
      ),
    ],
    "{{name}} was laid off from {{pronoun.p}} job."
  ),
  fallFortune(
    "Fired for cause",
    [Tags.mistake],
    [
      baseResourceRule(1, -1, -2),
      draftMarkup(1, 0, 1, [Tags.career, Tags.confidence], [Season.Fall]),
      baseRegret(1),
      replacement("last", {
        tags: [Tags.career],
        match: "all",
        seasons: [Season.Summer, Season.Fall],
      }),
    ],
    "{{name}} was fired, and deserved it."
  ),
  fallFortune(
    "Convicted white collar criminal",
    [Tags.mistake],
    [
      baseResourceRule(-1, -2, -1),
      baseRegret(2),
      draftMarkup(2, 0, 0, [Tags.career, Tags.family, Tags.community]),
    ],
    "{{name}} embezzled money from {{pronoun.p}} company and got caught."
  ),
  fallFortune(
    "Crime of passion",
    [Tags.mistake, Tags.love],
    [
      baseRegret(1),
      draftMarkup(3, 0, 0, [
        Tags.career,
        Tags.love,
        Tags.family,
        Tags.community,
      ]),
      forceRollFateDice(),
    ],
    "In a fit of rage, {{name}} killed {{pronoun.p}} lover."
  ),
  fallFortune(
    "Aged out",
    [Tags.tragedy],
    [
      draftMarkup(1, 0, 2, [Tags.career, Tags.education]),
      replacement("last", {
        tags: [Tags.career],
        match: "all",
        seasons: [Season.Summer, Season.Fall],
      }),
    ],
    "Getting older, and out of touch, {{name}} was replaced with a younger worker."
  ),
  fallFortune(
    "Early mental decline",
    [Tags.tragedy],
    [
      baseResourceRule(-1, 0, 0),
      draftMarkup(2, 0, 0, [
        Tags.education,
        Tags.discipline,
        Tags.career,
        Tags.intellect,
      ]),
    ],
    "Things just don't click for {{name}} like they used to."
  ),
  fallFortune(
    "Arthritis",
    [Tags.tragedy],
    [
      baseResourceRule(-1, 0, 0),
      draftMarkup(2, 0, 0, [Tags.health, Tags.sunshine, Tags.travel]),
    ],
    "Creaking joints and aching muscles plague {{name}}."
  ),
  fallFortune(
    "Falling out of love",
    [Tags.tragedy],
    [draftDiscount(2, 0, 0, [Tags.love]), baseRegret(1)],
    "After all these years, {{name}} has to admint - the spark is gone."
  ),
  fallFortune(
    "Uninspired",
    [Tags.tragedy],
    [draftMarkup(2, 0, 0, [Tags.creative])],
    "{{name}} lost {{pronoun.p}} muse."
  ),
  fallFortune(
    "Lush",
    [Tags.mistake],
    [
      recurringResourceRule(-1, -1, -1, {
        trigger: "end-of-season",
        seasons: [Season.Fall],
      }),
      baseResourceRule(-1, -1, -2),
      draftMarkup(1, 0, 0, [
        Tags.career,
        Tags.community,
        Tags.family,
        Tags.health,
      ]),
      baseRegret(1),
    ],
    "{{name}} is always drunk, or working on it."
  ),
  fallFortune(
    "Letch",
    [Tags.mistake],
    [
      draftMarkup(3, 0, 0, [Tags.family, Tags.faith, Tags.love, Tags.friend]),
      draftMarkup(0, 0, 2, [Tags.career, Tags.finance]),
    ],
    "{{name}} is a disgusting letch."
  ),
  fallFortune(
    "Market crash",
    [Tags.tragedy],
    [
      recurringResourceRule(0, -2, 0, "once", {
        tags: [Tags.finance],
        match: "any",
        ratio: ratio2to1,
      }),
    ],
    "{{name}} lost {{pronoun.p}} savings in the market crash."
  ),
  fallFortune(
    "Bear market",
    [Tags.tragedy],
    [
      recurringResourceRule(0, -1, 0, "once", {
        tags: [Tags.finance],
        match: "any",
      }),
      draftMarkup(0, 2, 0, [Tags.finance], [Season.Fall]),
    ],
    "{{name.p}} investments are not doing well."
  ),
  fallFortune("Bankruptcy", [Tags.tragedy], [baseResourceRule(0, -20, 0)]),
  fallFortune(
    "Uptight",
    [Tags.mistake],
    [
      baseRegret(1),
      draftMarkup(1, 0, 0, [
        Tags.creative,
        Tags.sunshine,
        Tags.tragedy,
        Tags.love,
        Tags.friend,
      ]),
    ],
    "{{name}} is a real square."
  ),
  fallFortune(
    "Scandalized",
    [Tags.mistake, Tags.tragedy],
    [baseResourceRule(0, 0, -5), baseRegret(1)],
    "{{name.p}} name was dragged through the mud after a big scandal."
  ),
  fallFortune(
    "Chronic Illness",
    [Tags.tragedy],
    [baseResourceRule(-2, 0, 0), draftMarkup(1, 0, 0, [Tags.health])],
    "{{name}} developed a troubling chronic illness."
  ),
  fallFortune("Long lost sibling", [Tags.boon, Tags.family], [baseTreasure(1)]),
  fallFortune(
    "Born again",
    [Tags.boon, Tags.faith],
    [baseTreasure(1), draftDiscount(1, 1, 1, [Tags.faith])],
    "{{name}} found new faith."
  ),
  fallFortune(
    "Infarction",
    [Tags.tragedy],
    [
      draftMarkup(1, 0, 0, [Tags.health]),
      draftDiscount(1, 0, 0, [Tags.family, Tags.friend, Tags.love]),
      forceRollFateDice(),
    ],
    "{{name}} had a heart attack."
  ),
  fallFortune(
    "Cynical",
    [Tags.tragedy, Tags.intellect],
    [
      baseRegret(1),
      draftMarkup(1, 0, 0, [
        Tags.faith,
        Tags.community,
        Tags.love,
        Tags.friend,
      ]),
    ],
    "{{name}} is a cynical old grouch."
  ),
  fallFortune(
    "NDE",
    [Tags.boon, Tags.faith],
    [
      draftDiscount(1, 0, 0, [Tags.family, Tags.friend, Tags.love]),
      draftDiscount(2, 0, 0, [Tags.faith]),
    ],
    "{{name}} got a second chance, and a new perspective after a near-death experience."
  ),
  fallFortune(
    "Moment of clarity",
    [Tags.boon],
    [
      baseTreasure(1),
      draftDiscount(1, 0, 0, [Tags.family, Tags.friend, Tags.love]),
    ],
    "{{name}} had a moment of clarity, and made some changes."
  ),
  fallFortune(
    "Estranged from children",
    [Tags.tragedy],
    [baseRegret(2), draftMarkup(1, 0, 0, [Tags.family])],
    "{{name.p}} kids don't call {{pronoun.o}} anymore."
  ),
];

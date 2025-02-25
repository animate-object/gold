import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseResourceRule,
  baseTreasure,
  CardDef,
  draftDiscount,
  draftMarkup,
  forceRollFateDice,
  ignoreRegrets,
  ratio3to1,
  ratio4to1,
  recurringResourceRule,
  replacement,
} from "../cardUtils";

const winterFortune = (
  name: string,
  tags: Tags[],
  rules: CardDef["rules"],
  narrativeStatement: string | undefined = undefined
) => ({
  name,
  season: Season.Winter,
  tags,
  rules,
  narrativeStatement,
});

export const WINTER_FORTUNES: CardDef[] = [
  winterFortune(
    "Loneliness",
    [Tags.mistake],
    [
      baseRegret(1, {
        tags: [Tags.friend, Tags.family, Tags.love],
        match: "none",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
        ratio: ratio4to1,
      }),
    ],
    "{{name}} felt truly alone."
  ),
  winterFortune(
    "Underachiever",
    [Tags.mistake],
    [
      baseRegret(1, {
        tags: [Tags.education, Tags.discipline, Tags.career],
        match: "none",
        seasons: [Season.Spring, Season.Summer, Season.Fall],
        ratio: ratio4to1,
      }),
    ],
    "{{name}} never lived up to their potential."
  ),
  winterFortune(
    "Ignored",
    [Tags.tragedy],
    [
      baseRegret(3, {
        tags: [Tags.friend, Tags.family, Tags.love, Tags.community],
        match: "none",
        seasons: [Season.Winter],
        ratio: ratio4to1,
      }),
    ],
    "In old age, {{name}} learned what it mean to be irrelevant."
  ),
  winterFortune(
    "Homebound",
    [Tags.tragedy],
    [
      draftMarkup(5, 0, 0, [Tags.travel, Tags.sunshine]),

      baseRegret(2, {
        tags: [Tags.travel, Tags.sunshine],
        match: "none",
        seasons: [Season.Summer, Season.Fall],
        ratio: ratio4to1,
      }),
    ],
    "{{name}} was too weak to leave the house alone."
  ),
  winterFortune(
    "Bedridden",
    [Tags.tragedy],
    [
      draftMarkup(2, 0, 0, [Tags.health, Tags.travel, Tags.sunshine]),
      recurringResourceRule(-1, 0, 0, {
        trigger: "turn-start",
      }),
    ],
    "In later years, {{name}} was confined to {{pronoun.p}} bed."
  ),
  winterFortune(
    "Debtridden",
    [Tags.tragedy, Tags.mistake],
    [
      recurringResourceRule(0, -2, 0, {
        trigger: "turn-start",
      }),
      baseRegret(2),
    ],
    "{{name}} was stricken with debt, and never recovered."
  ),

  winterFortune(
    "Isolated",
    [Tags.tragedy],
    [
      draftMarkup(1, 0, 0, [
        Tags.friend,
        Tags.family,
        Tags.community,
        Tags.love,
      ]),
    ],
    "{{name}} spent many days alone."
  ),
  winterFortune(
    "Hateful",
    [Tags.tragedy, Tags.mistake],
    [
      draftMarkup(1, 0, 1, [
        Tags.friend,
        Tags.family,
        Tags.community,
        Tags.love,
      ]),
      baseRegret(2),
    ],
    "{{name}} became bitter, and hated the world."
  ),
  winterFortune(
    "Miserly",
    [Tags.tragedy],
    [
      draftMarkup(1, 0, 0, [
        Tags.friend,
        Tags.family,
        Tags.love,
        Tags.community,
      ]),
      baseRegret(1, {
        match: "any",
        tags: [Tags.finance],
      }),
    ],
    "{{name}} valued money over people."
  ),
  winterFortune(
    "Widow/Widower",
    [Tags.tragedy],
    [
      baseRegret(1, {
        tags: [Tags.love],
        match: "none",
        seasons: [Season.Summer, Season.Fall, Season.Winter],
        ratio: ratio4to1,
      }),
      replacement("last", {
        tags: [Tags.love],
        match: "all",
      }),
    ],
    "{{name}} lost {{pronoun.p}} spouse."
  ),
  winterFortune(
    "Forgotten",
    [Tags.tragedy],
    [
      baseRegret(3, {
        tags: [Tags.family],
        match: "none",
        seasons: [Season.Winter],
        ratio: ratio4to1,
      }),
    ],
    "{{name}} was forgotten by {{pronoun.p}} family."
  ),
  winterFortune(
    "Senility",
    [Tags.tragedy],
    [draftMarkup(2, 0, 0, [Tags.intellect, Tags.education, Tags.career])],
    "{{name.p}} stories became more and more confused."
  ),
  winterFortune(
    "Mental decline",
    [Tags.tragedy],
    [
      baseResourceRule(-2, 0, -2),
      draftMarkup(2, 0, 0, [
        Tags.education,
        Tags.discipline,
        Tags.career,
        Tags.intellect,
      ]),
    ],
    "Slowly at first, then all at once, {{name}} lost {{pronoun.p}} mind."
  ),
  winterFortune(
    "Cancer",
    [Tags.tragedy],
    [
      recurringResourceRule(-1, 0, 0, {
        trigger: "turn-start",
      }),
      draftMarkup(2, 0, 0, [Tags.health]),
      forceRollFateDice(),
    ],
    "{{name}} developed a pervasive, incurable cancer."
  ),
  winterFortune(
    "Inspired",
    [Tags.boon],
    [draftDiscount(2, 2, 2, [Tags.creative])],
    "In the twilight of {{name.p}} life, {{pronoun.p}} found new inspiration."
  ),
  winterFortune("Retirement", [Tags.boon], [baseResourceRule(4, 0, 0)]),
  winterFortune(
    "Outlived savings",
    [Tags.tragedy, Tags.mistake],
    [baseResourceRule(0, -5, 0), baseRegret(1)],
    "{{name.p}} meager savings ran out."
  ),
  winterFortune(
    "Scammed",
    [Tags.tragedy, Tags.mistake],
    [baseResourceRule(0, -4, 0)],
    "{{name}} was scammed out of {{pronoun.p}} savings."
  ),
  winterFortune(
    "Renowned",
    [Tags.boon],
    [
      baseResourceRule(0, 0, 4),
      baseTreasure(1, {
        tags: [Tags.creative, Tags.education, Tags.intellect],
        match: "any",
      }),
    ],
    "In old age, {{name}} became a renowned expert in {{pronoun.p}} field."
  ),
  winterFortune(
    "Beloved grandchild",
    [Tags.boon],
    [
      baseResourceRule(0, 0, 2),
      baseTreasure(1, {
        tags: [Tags.family],
        match: "any",
        seasons: [Season.Winter, Season.Fall],
      }),
    ],
    "One grandchild stood out for {{name}}, who saw {{pronoun.r}} in the child's eyes."
  ),
  winterFortune(
    "Reconciliation",
    [Tags.boon, Tags.friend],
    [
      ignoreRegrets(1),
      baseTreasure(1, {
        tags: [Tags.family, Tags.friend],
        match: "any",
        ratio: ratio3to1,
      }),
    ],
    "Before it was finally too late, {{name}} and {{pronoun.r}} friend made amends."
  ),
  winterFortune(
    "Windfall",
    [Tags.boon, Tags.finance],
    [baseResourceRule(0, 5, 0)],
    "{{name}} received a large windfall from an unexpected source."
  ),
  winterFortune(
    "Spry",
    [Tags.boon, Tags.health],
    [
      baseResourceRule(3, 0, 0),
      draftDiscount(1, 1, 1, [Tags.health, Tags.intellect]),
    ],
    "Even to {{pronoun.p}}'s final days, {{name}} was unusually mobile and healthy."
  ),
  winterFortune(
    "Young friends",
    [Tags.boon, Tags.friend],
    [
      baseTreasure(1),
      baseTreasure(1, {
        match: "any",
        tags: [Tags.friend, Tags.community],
        seasons: [Season.Winter, Season.Fall],
      }),
    ],
    "{{name}} found that young friends helped {{pronoun.o}} feel young {{pronoun.r}}"
  ),
  winterFortune(
    "Prejudiced",
    [Tags.mistake],
    [
      baseResourceRule(0, 0, -1),
      draftMarkup(1, 0, 1, [Tags.community, Tags.friend]),
      baseRegret(1),
    ],
    "{{name.p}} bitter prejudice aliented {{pronoun.p}} from {{pronoun.p}} community."
  ),
  winterFortune(
    "Helpless",
    [Tags.tragedy],
    [
      baseResourceRule(-2, -2, 0),
      draftMarkup(5, 0, 0, [Tags.health, Tags.travel, Tags.sunshine]),
    ],
    "In the end, {{name}} left the world as {{pronoun.s}} entered - weak and helpless."
  ),
];

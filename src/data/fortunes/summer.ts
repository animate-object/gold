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
  ratio2to1,
  ratio4to1,
  recurringResourceRule,
  replacement,
} from "../cardUtils";

const summerFortune = (
  name: string,
  tags: Tags[],
  rules: CardDef["rules"],
  narrativeStatement: string | undefined = undefined
) => ({
  name,
  season: Season.Summer,
  tags,
  rules,
  narrativeStatement,
});

export const SUMMER_FORTUNES: CardDef[] = [
  {
    name: "Down job market",
    season: Season.Summer,
    tags: [Tags.career, Tags.tragedy],
    rules: [draftMarkup(1, 0, 0, [Tags.career], [Season.Summer, Season.Fall])],
    narrativeStatement: "{{name}} struggled to find a job in a down market.",
  },
  {
    name: "College dropout",
    season: Season.Summer,
    tags: [Tags.education, Tags.mistake],
    rules: [
      recurringResourceRule(1, 1, 0, "once", {
        tags: [Tags.education],
        match: "any",
        seasons: [Season.Summer],
      }),
      draftMarkup(
        1,
        0,
        0,
        [Tags.education, Tags.career],
        [Season.Summer, Season.Fall]
      ),
      baseRegret(1),
    ],
    narrativeStatement:
      "{{name}} couldn't stick it out in college, and dropped out.",
  },
  summerFortune(
    "Crippling depression (summer)",
    [Tags.tragedy],
    [
      baseTreasure(-1),
      draftMarkup(
        1,
        0,
        0,
        [Tags.creative, Tags.sunshine, Tags.friend],
        [Season.Summer, Season.Fall]
      ),
    ],
    "{{name}} suffered from crippling depression."
  ),
  summerFortune(
    "Paralyzing anxiety (summer)",
    [Tags.tragedy],
    [draftMarkup(1, 0, 0, [Tags.confidence], [Season.Summer, Season.Fall])],
    "{{name}} suffered from paralyzing anxiety."
  ),
  summerFortune(
    "Problem drinker (summer)",
    [Tags.mistake],
    [
      recurringResourceRule(0, -1, 0, {
        trigger: "turn-start",
        seasons: [Season.Summer, Season.Fall],
      }),
      draftMarkup(
        1,
        0,
        0,
        [Tags.career, Tags.education, Tags.finance],
        [Season.Summer, Season.Fall]
      ),
    ],
    "{{name}} had developed a real problem with drinking."
  ),
  summerFortune(
    "Anger issues (summer)",
    [Tags.tragedy],
    [
      draftMarkup(
        1,
        0,
        1,
        [Tags.friend, Tags.community],
        [Season.Summer, Season.Fall]
      ),
    ],
    "{{name.p}} uncontrolled angers were starting to cause real problems."
  ),
  summerFortune(
    "Trouble with drugs (summer)",
    [Tags.mistake],
    [
      recurringResourceRule(
        -1,
        -1,
        0,

        {
          trigger: "turn-start",
          seasons: [Season.Summer, Season.Fall],
        }
      ),
      forceRollFateDice(),
    ],
    "{{name}} was addicted to hard drugs."
  ),
  summerFortune(
    "Doom scroller (summer)",
    [Tags.mistake],
    [
      recurringResourceRule(-1, 0, 0, {
        trigger: "turn-start",
        seasons: [Season.Summer, Season.Fall],
      }),
      draftMarkup(1, 0, 0, [Tags.community], [Season.Spring, Season.Summer]),
      baseRegret(1),
    ],
    "{{name.p}} phone addiction got out of hand."
  ),
  summerFortune(
    "Infertile",
    [Tags.tragedy],
    [draftMarkup(1, 1, 0, [Tags.family])],
    "The doctor told {{name}} {{pronoun.s}} would never have children of {{pronoun.p}} own."
  ),
  summerFortune(
    "Bad trip",
    [Tags.tragedy, Tags.mistake],
    [draftMarkup(1, 0, 0, [Tags.intellect], [Season.Summer]), baseRegret(1)],
    "{{name}} had a bad trip that scarred {{pronoun.p}} mind."
  ),
  summerFortune("Stolen vehicle", [Tags.tragedy], [baseResourceRule(0, -3, 0)]),
  summerFortune(
    "Convicted",
    [Tags.mistake],
    [
      draftMarkup(1, 1, 0, [
        Tags.career,
        Tags.family,
        Tags.finance,
        Tags.love,
        Tags.community,
      ]),
      baseRegret(2),
    ],
    "{{name}} was convicted of a serious felony."
  ),
  summerFortune(
    "Committment-phobe",
    [Tags.mistake],
    [
      draftMarkup(2, 0, 0, [Tags.love]),
      baseRegret(1, {
        match: "none",
        tags: [Tags.love],
        ratio: ratio4to1,
        seasons: [Season.Summer, Season.Fall],
      }),
    ],
    "{{name}} struggled to commit, even with the good ones."
  ),
  summerFortune(
    "Ghosted",
    [Tags.tragedy],
    [draftMarkup(1, 0, 0, [Tags.love, Tags.confidence], [Season.Summer])],
    "{{name}} was ghosted by a love interest."
  ),
  summerFortune(
    "Bad break up",
    [Tags.tragedy, Tags.mistake],
    [
      draftMarkup(
        2,
        0,
        0,
        [Tags.love, Tags.confidence],
        [Season.Summer, Season.Fall]
      ),
      draftMarkup(1, 0, 0, [Tags.love], [Season.Fall]),
    ],
    "A bad breakup left {{name.o}} vulnerable and heartbroken. Could {{pronoun.s}} ever love again?"
  ),
  summerFortune(
    "Falling out",
    [Tags.tragedy],
    [
      draftMarkup(1, 0, 0, [Tags.friend], [Season.Summer]),
      replacement("last", {
        tags: [Tags.friend],
        match: "any",
      }),
      baseRegret(2, {
        tags: [Tags.friend],
        match: "none",
        ratio: ratio4to1,
        seasons: [Season.Summer, Season.Fall, Season.Winter],
      }),
    ],
    "{{name}} had a falling out with {{pronoun.p}} best friend."
  ),
  summerFortune(
    "Arrogance",
    [Tags.mistake],
    [
      draftMarkup(
        1,
        0,
        0,
        [Tags.community, Tags.career, Tags.friend],
        [Season.Summer, Season.Fall]
      ),
      baseRegret(1),
    ],
    "{{name.p}} arrogance cause personal and professional difficulties."
  ),
  summerFortune(
    "Stolen Identity",
    [Tags.tragedy],
    [
      draftMarkup(1, 0, 0, [Tags.finance, Tags.influence]),
      baseResourceRule(0, -3, -1),
    ],
    "{{name.p}} identity was stolen. What a nightmare!"
  ),
  summerFortune(
    "Toxic Friendship",
    [Tags.tragedy],
    [
      draftDiscount(1, 0, 0, [Tags.friend], [Season.Summer, Season.Fall]),
      draftMarkup(
        1,
        0,
        0,
        [Tags.family, Tags.confidence, Tags.career],
        [Season.Summer, Season.Fall]
      ),
      baseRegret(1),
    ],
    "{{name}} was tied up in a toxic friendship."
  ),
  summerFortune(
    "Really let go",
    [Tags.mistake],
    [
      baseResourceRule(-1, 0, 0),
      baseRegret(1),
      draftMarkup(
        1,
        1,
        0,
        [Tags.health, Tags.confidence],
        [Season.Summer, Season.Fall]
      ),
    ],
    "{{name}} stopped taking care of {{pronoun.r}}."
  ),
  summerFortune(
    "Compulsive spender",
    [Tags.mistake],
    [
      recurringResourceRule(0, -2, 0, {
        trigger: "turn-start",
        seasons: [Season.Summer, Season.Fall],
      }),
    ],
    "{{name}} couldn't stop spending money."
  ),
  summerFortune(
    "Conflict averse",
    [Tags.mistake],
    [baseResourceRule(-1, -1, -1)],
    "{{name}} avoided conflict to a fault."
  ),
  summerFortune(
    "Doormat",
    [Tags.mistake],
    [
      baseResourceRule(-1, -1, -1),
      baseRegret(1),
      draftMarkup(1, 0, 0, [Tags.confidence], [Season.Summer, Season.Fall]),
    ],
    "{{name}} let people walk all over {{pronoun.o}}."
  ),
  summerFortune(
    "Death in the family (summer)",
    [Tags.tragedy, Tags.family],
    [
      replacement("last", {
        tags: [Tags.family],
        match: "all",
      }),
    ],
    "{{name}} lost a close family member."
  ),
  summerFortune(
    "Neglected hobbies",
    [Tags.mistake],
    [
      draftMarkup(
        1,
        0,
        0,
        [Tags.creative, Tags.intellect],
        [Season.Summer, Season.Fall]
      ),
    ],
    "{{name}} neglected {{pronoun.p}} hobbies."
  ),
  summerFortune(
    "Workaholic",
    [Tags.mistake, Tags.career],
    [
      draftMarkup(
        2,
        0,
        0,
        [
          Tags.community,
          Tags.creative,
          Tags.family,
          Tags.friend,
          Tags.health,
          Tags.love,
          Tags.sunshine,
          Tags.travel,
        ],
        [Season.Summer, Season.Fall]
      ),
      baseRegret(1, {
        match: "any",
        tags: [Tags.career, Tags.discipline, Tags.finance],
        seasons: [Season.Summer, Season.Fall],
        ratio: ratio2to1,
      }),
    ],
    "{{name}} was true blue a workaholic."
  ),
  summerFortune(
    "Inheritance",
    [Tags.finance, Tags.boon],
    [
      baseResourceRule(0, 2, 0),
      recurringResourceRule(0, 2, 0, "once", {
        tags: [Tags.family],
        match: "any",
      }),
    ],
    "{{name}} received a small but meaningful inheritance."
  ),
  summerFortune(
    "Second Chance",
    [Tags.boon],
    [baseResourceRule(1, 1, 1), ignoreRegrets(2)],
    "{{name}} got a second chance."
  ),
  summerFortune(
    "Promotion",
    [Tags.boon, Tags.career],
    [
      draftDiscount(1, 0, 0, [Tags.career], [Season.Summer, Season.Fall]),
      recurringResourceRule(0, 1, 0, {
        trigger: "turn-start",
        seasons: [Season.Summer],
      }),
      baseResourceRule(0, 2, 1),
    ],
    "{{name}} impressed management, and earned a big promotion."
  ),
  summerFortune(
    "Peter principled",
    [Tags.career, Tags.tragedy],
    [
      baseResourceRule(0, 2, 1),
      recurringResourceRule(0, 0, -1, {
        trigger: "turn-start",
        seasons: [Season.Summer, Season.Fall],
      }),
      draftMarkup(1, 0, 1, [Tags.career], [Season.Spring, Season.Fall]),
    ],
    "{{name}} struggled after a big promotion."
  ),
  summerFortune(
    "Laid off (summer)",
    [Tags.career, Tags.tragedy],
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
  summerFortune(
    "Bar Fight",
    [Tags.mistake],
    [baseResourceRule(0, 0, -1), forceRollFateDice()],
    "{{name}} lost {{pronoun.p}} cool at the bar, and got into a physical altercation."
  ),
  summerFortune(
    "Inspired",
    [Tags.boon],
    [draftDiscount(1, 1, 1, [Tags.creative, Tags.intellect], [Season.Summer])],
    "{{name}} was inspired to create something new."
  ),
  summerFortune(
    "Estranged from parents",
    [Tags.tragedy],
    [
      baseRegret(1),
      draftMarkup(1, 0, 0, [Tags.faith], [Season.Summer, Season.Fall]),
    ],
    "{{name}} was estranged from {{pronoun.p}} parents."
  ),
];

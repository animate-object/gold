import { Season, Tags } from "../../types";
import {
  baseRegret,
  baseResourceRule,
  baseTreasure,
  CardDef,
  draftDiscount,
  draftMarkup,
  forceRollFateDice,
  ratio4to1,
  recurringResourceRule,
  replacement,
} from "../cardUtils";

const springFortune = (
  name: string,
  tags: Tags[],
  rules: CardDef["rules"],
  narrativeStatement: string | undefined = undefined
) => ({
  name,
  season: Season.Spring,
  tags,
  rules,
  narrativeStatement,
});

export const SPRING_FORTUNES: CardDef[] = [
  {
    name: "Childhood Illness",
    season: Season.Spring,
    tags: [Tags.health, Tags.tragedy],
    rules: [
      recurringResourceRule(-1, 0, 0, {
        trigger: "end-of-season",
        seasons: [Season.Spring, Season.Summer],
      }),
    ],
    narrativeStatement: "{{name}} suffered from a diffcult childhood illness.",
  },
  {
    name: "Slacker",
    season: Season.Spring,
    tags: [Tags.education, Tags.mistake],
    rules: [
      draftMarkup(
        1,
        0,
        0,
        [Tags.education, Tags.career, Tags.discipline],
        [Season.Spring, Season.Summer]
      ),
      baseRegret(1),
    ],
    narrativeStatement: "{{name}} was a slacker in school.",
  },
  springFortune(
    "Caught Cheating",
    [Tags.education, Tags.mistake],
    [
      draftMarkup(
        1,
        0,
        0,
        [Tags.education, Tags.discipline],
        [Season.Spring, Season.Summer]
      ),
      baseRegret(1),
    ],
    "{{name}} received academic probation for cheating."
  ),
  springFortune(
    "Caught Shoplifting",
    [Tags.mistake],
    [
      baseResourceRule(0, -1, -1),
      draftMarkup(1, 0, 0, [Tags.community], [Season.Spring, Season.Summer]),
      baseRegret(1),
    ],
    "{{name}} got in serious trouble for shoplifting."
  ),
  springFortune(
    "Unintended Pregnancy",
    [Tags.mistake, Tags.love],
    [
      baseResourceRule(-1, -1, -1),
      draftMarkup(1, 0, 0, [Tags.education], [Season.Spring, Season.Summer]),
      baseRegret(1),
      baseTreasure(1, {
        tags: [Tags.family, Tags.education, Tags.finance],
        match: "any",
        seasons: [Season.Summer, Season.Fall, Season.Winter],
      }),
    ],
    "{{name}} had an unintended pregnancy."
  ),
  springFortune(
    "Car wreck",
    [Tags.mistake],
    [forceRollFateDice(), baseRegret(1), baseResourceRule(0, -2, 0)],
    "{{name}} was in a serious car wreck."
  ),
  springFortune(
    "Sports concussions",
    [Tags.tragedy, Tags.sunshine],
    [
      draftMarkup(1, 0, 0, [Tags.intellect]),
      draftMarkup(1, 0, 0, [Tags.health], [Season.Fall, Season.Winter]),
    ],
    "{{name}} was banged up in contact sports."
  ),
  springFortune(
    "Gang initiate",
    [Tags.mistake, Tags.community],
    [
      baseResourceRule(0, 3, 1),
      draftMarkup(2, 0, 1, [Tags.education, Tags.career]),
    ],
    "{{name}} got mixed up with a local street gang."
  ),
  springFortune(
    "Death in the family (spring)",
    [Tags.tragedy, Tags.family],
    [
      replacement("last", {
        tags: [Tags.family],
        match: "all",
      }),
    ]
  ),
  springFortune(
    "Crippling depression (spring)",
    [Tags.tragedy],
    [
      baseTreasure(-1),
      draftMarkup(
        1,
        0,
        0,
        [Tags.creative, Tags.sunshine, Tags.friend],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} struggled with crippling depression. Some days, it just didn’t seem worth it."
  ),
  springFortune(
    "Paralyzing anxiety (spring)",
    [Tags.tragedy],
    [draftMarkup(1, 0, 0, [Tags.confidence], [Season.Spring, Season.Summer])],
    "{{name}} suffered from paralyzing anxiety."
  ),
  springFortune(
    "Outcast",
    [Tags.tragedy, Tags.friend],
    [
      draftMarkup(
        1,
        0,
        1,
        [Tags.friend, Tags.community],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} had a lot of trouble making friends."
  ),
  springFortune(
    "Bad acne",
    [Tags.tragedy],
    [draftMarkup(1, 0, 0, [Tags.confidence, Tags.friend], [Season.Spring])],
    "{{name}} had terrible acne."
  ),
  springFortune(
    "Wrong crowd",
    [Tags.mistake],
    [
      draftMarkup(
        1,
        0,
        0,
        [Tags.family, Tags.education],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} fell into the wrong crowd."
  ),
  springFortune(
    "Bullied",
    [Tags.tragedy],
    [
      draftMarkup(
        1,
        0,
        0,
        [Tags.love, Tags.friend, Tags.confidence],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} was bullied in school."
  ),
  springFortune(
    "Bully",
    [Tags.mistake],
    [baseRegret(2)],
    "{{name}} bullied other kids."
  ),
  springFortune(
    "Smoking Habit",
    [Tags.mistake],
    [baseRegret(1), draftMarkup(1, 0, 0, [Tags.health])],
    "{{name}} developed a smoking habit."
  ),
  springFortune(
    "Problem drinker (spring)",
    [Tags.mistake],
    [
      recurringResourceRule(0, -1, 0, {
        trigger: "turn-start",
        seasons: [Season.Spring, Season.Summer],
      }),
      draftMarkup(
        1,
        0,
        0,
        [Tags.career, Tags.education, Tags.finance],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} found alcohol early, and found it hard to put down."
  ),
  springFortune(
    "Trouble with drugs (spring)",
    [Tags.mistake],
    [
      recurringResourceRule(
        -1,
        -1,
        0,

        {
          trigger: "turn-start",
          seasons: [Season.Spring, Season.Summer],
        }
      ),
      forceRollFateDice(),
    ],
    "{{name}} got mixed up with drugs."
  ),
  springFortune(
    "Juvenile detention",
    [Tags.mistake],
    [
      baseResourceRule(-2, 0, -1),
      draftMarkup(
        1,
        0,
        0,
        [Tags.career, Tags.education],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} spent time in juvenile detention."
  ),
  springFortune(
    "Struggling student",
    [Tags.tragedy],
    [
      replacement("last", {
        tags: [Tags.education, Tags.intellect],
        match: "any",
      }),
      draftMarkup(1, 0, 0, [Tags.education], [Season.Spring, Season.Summer]),
    ],
    "{{name}} struggled in school."
  ),
  springFortune(
    "Science Fair Winner",
    [Tags.boon],
    [
      draftDiscount(
        1,
        1,
        1,
        [Tags.education, Tags.intellect],
        [Season.Spring, Season.Summer]
      ),
      baseTreasure(1),
    ],
    "{{name}} won first place at the school science fair."
  ),
  springFortune(
    "Hard lesson",
    [Tags.boon, Tags.mistake],
    [
      baseTreasure(1, {
        tags: [Tags.mistake],
        match: "none",
        ratio: ratio4to1,
      }),
    ],
    "{{name}} learned a hard lesson."
  ),
  springFortune(
    "Scouted Athlete",
    [Tags.boon, Tags.discipline],
    [
      draftDiscount(0, 2, 0, [Tags.education], [Season.Spring, Season.Summer]),
      draftDiscount(1, 0, 0, [Tags.sunshine, Tags.discipline]),
    ],
    "{{name}} was scouted by several colleges."
  ),
  springFortune(
    "Childhood Sweetheart",
    [Tags.boon, Tags.love],
    [draftDiscount(1, 1, 1, [Tags.love]), baseTreasure(1)],
    "{{name}} built a long term relationship with {{pronoun.p}} childhood sweetheart."
  ),
  springFortune(
    "Scholarship",
    [Tags.boon, Tags.education],
    [draftDiscount(0, 5, 0, [Tags.education], [Season.Spring, Season.Summer])],
    "{{name}} received a scholarship for college."
  ),
  springFortune(
    "Sweepstakes Winner",
    [Tags.boon, Tags.finance],
    [baseResourceRule(0, 4, 0)],
    "{{name}} won a lot of money in a contest."
  ),
  springFortune(
    "Teenage angst",
    [Tags.tragedy],
    [
      draftMarkup(2, 0, 0, [
        Tags.creative,
        Tags.intellect,
        Tags.confidence,
        Tags.education,
        Tags.career,
      ]),
      baseRegret(1),
    ],
    "{{name}} was a bundle of teenage angst."
  ),
  springFortune(
    "Video game addict",
    [Tags.tragedy, Tags.mistake],
    [
      recurringResourceRule(-1, -1, 0, {
        trigger: "turn-start",
        seasons: [Season.Spring, Season.Summer],
      }),
      baseRegret(1),
    ],
    "{{name}} was addicted to video games."
  ),
  springFortune(
    "Doom scroller (spring)",
    [Tags.mistake],
    [
      recurringResourceRule(-1, 0, 0, {
        trigger: "turn-start",
        seasons: [Season.Spring, Season.Summer],
      }),
      draftMarkup(1, 0, 0, [Tags.community], [Season.Spring, Season.Summer]),
      baseRegret(1),
    ],
    "{{name}} couldn't put their phone down."
  ),
  springFortune(
    "Anger issues (spring)",
    [Tags.tragedy],
    [
      draftMarkup(
        1,
        0,
        1,
        [Tags.friend, Tags.community],
        [Season.Spring, Season.Summer]
      ),
    ],
    "{{name}} had serious anger issues."
  ),
];

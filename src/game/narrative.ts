import { capitalize, isNil } from "lodash";
import { Card, GameState } from "../types";
import nlp from "compromise";
import { getCurrentCardIsBeginningOfSeason } from "./selectors";

interface Pronouns {
  subject: string;
  object: string;
  possessive: string;
  reflexive: string;
}

const PronounsForGender: Record<"M" | "F" | "N", Pronouns> = {
  M: {
    subject: "he",
    object: "him",
    possessive: "his",
    reflexive: "himself",
  },
  F: {
    subject: "she",
    object: "her",
    possessive: "her",
    reflexive: "herself",
  },
  N: {
    subject: "they",
    object: "them",
    possessive: "their",
    reflexive: "themself",
  },
};

export const conjugateVerb = (
  verb: string,
  plural: boolean,
  presentTense: boolean
): string => {
  const verbNlp = nlp(verb).verbs();

  const conjugations = verbNlp.conjugate() as {
    Infinitive: string;
    PresentTense: string;
    PastTense: string;
  }[];

  console.log(conjugations);

  if (presentTense) {
    return conjugations[0][plural ? "Infinitive" : "PresentTense"];
  }

  return conjugations[0].PastTense;
};

interface Opts {
  usePronounForName?: boolean;
}

export const replaceTemplateVariables = (
  narrativeStatement: string,
  narrativeState: GameState["narrativeState"],
  opts: Opts
): string => {
  const { usePronounForName = false } = opts ?? {};

  const { chosenName: name, chosenGender: gender } = narrativeState;

  const pronouns = PronounsForGender[gender];

  const base = narrativeStatement
    .replace(
      /{{name.p}}/g,
      usePronounForName ? pronouns.possessive : `${capitalize(name)}'s`
    )
    .replace(
      /{{name.o}}/g,
      usePronounForName ? pronouns.object : capitalize(name)
    )
    .replace(
      /{{name}}/g,
      usePronounForName ? pronouns.subject : capitalize(name)
    )
    .replace(/{{pronoun.s}}/g, pronouns.subject)
    .replace(/{{pronoun.o}}/g, pronouns.object)
    .replace(/{{pronoun.p}}/g, pronouns.possessive)
    .replace(/{{pronoun.r}}/g, pronouns.reflexive);

  const tenseTransformed = narrativeState.config.presentTense
    ? nlp(base).verbs().toPresentTense().all().text()
    : nlp(base).verbs().toPastTense().all().text();

  // turn it all to sentence case
  return capitalize(tenseTransformed);
};

export const buildNarrativeStatement = (
  card: Card,
  gameState: GameState
): string => {
  const { narrativeState } = gameState;
  if (isNil(card.narrativeStatement)) {
    return replaceTemplateVariables(
      `{{pronoun.s}} played the card [${card.name}]`,
      narrativeState,
      {}
    );
  }

  const { narrativeStatement } = card;

  return replaceTemplateVariables(narrativeStatement, narrativeState, {
    usePronounForName: !getCurrentCardIsBeginningOfSeason(gameState),
  });
};

import { getCard } from "../cards/store";
import {
  currentCardIsEndOfSeason,
  getCurrentSeason,
  getAllCardsInOrderOfPlay,
  slotForCard,
} from "./selectors";
import {
  GameState,
  ResourceRule,
  Season,
  Card as CardT,
  CardId,
  Tags,
  ReplacementRule,
  Rule,
  ScoringRule,
  Score,
  TagMatchRules,
  ResourcePool,
} from "../types";
import { neverLessThanZero } from "../util";

const countMatchingCards = (
  tagMatchRules: TagMatchRules,
  gameState: GameState
): [number[], number] => {
  const seasons = tagMatchRules.seasons ?? [
    Season.Spring,
    Season.Summer,
    Season.Fall,
    Season.Winter,
  ];

  const cardIds = seasons.map((season) => gameState.tableau[season]).flat();

  const matchingCardIds: number[] = cardIds.filter((cardId) => {
    if (cardId === "empty") {
      return false;
    }
    const card = getCard(cardId);
    return matchesTags(card.tags, tagMatchRules);
  }) as number[];

  if (tagMatchRules.ratio) {
    const { matches, value } = tagMatchRules.ratio;
    const matchesCount = Math.floor(matchingCardIds.length / matches);
    const valueCount = matchesCount * value;
    return [matchingCardIds, valueCount];
  }

  return [matchingCardIds, matchingCardIds.length];
};

const scanTableauForCard = (
  cardId: CardId,
  gameState: GameState
): [Season, number] | undefined => {
  const seasons = [Season.Spring, Season.Summer, Season.Fall, Season.Winter];

  for (const season of seasons) {
    const index = gameState.tableau[season].indexOf(cardId);
    if (index !== -1) {
      return [season, index];
    }
  }
};

const doesResourceCardApplyOnCurrentTurn = (
  cardId: CardId,
  recurrence: ResourceRule["recurrence"],
  gameState: GameState
) => {
  if (recurrence === "once") {
    return slotForCard(cardId, gameState) === gameState.cardsPlayed;
  }

  const currentSeason = getCurrentSeason(gameState);

  if (recurrence.seasons && !recurrence.seasons?.includes(currentSeason)) {
    console.debug("resource rule does not apply in current season");
    return false;
  }

  if (recurrence.trigger === "turn-start") {
    return true;
  }
  if (recurrence.trigger === "end-of-season") {
    return currentCardIsEndOfSeason(gameState);
  }

  console.warn("unknown recurrence trigger");

  return false;
};

const applyResourceRule = (
  cardId: CardId,
  rule: ResourceRule,
  gameState: GameState
) => {
  console.log(`applying resource rule for ${cardId}`);
  const resources = { ...gameState.resources };

  if (!doesResourceCardApplyOnCurrentTurn(cardId, rule.recurrence, gameState)) {
    console.log("resource card does not apply on current turn");
    return gameState;
  }

  let resourcesToApply = rule.resources;
  if (rule.match) {
    console.log("applying match for resource rule");
    const [count, transformFactor] = countMatchingCards(rule.match, gameState);
    console.debug(`matches: ${count}, transformFactor: ${transformFactor}`);

    resourcesToApply = Object.keys(resourcesToApply).reduce(
      (acc: Partial<ResourcePool>, key: string) => {
        const resourceKey = key as keyof ResourcePool;
        const orig = resourcesToApply[resourceKey];
        const transformed = (orig ?? 0) * transformFactor;
        acc[resourceKey] = transformed;
        return acc;
      },
      {} as Partial<ResourcePool>
    );
  }

  Object.entries(resourcesToApply).forEach(([key, value]) => {
    const resourceKey = key as keyof GameState["resources"];
    const oldValue = resources[resourceKey] ?? 0;

    resources[resourceKey] = oldValue + value;
  });

  console.debug("applying resources", resourcesToApply);
  console.debug("new resources", resources);

  return {
    ...gameState,
    resources,
  };
};

const matchesTags = (tags: Tags[], rule: TagMatchRules) => {
  if (rule.match === "all") {
    return rule.tags.every((tag) => tags.includes(tag));
  }
  if (rule.match === "any") {
    return rule.tags.some((tag) => tags.includes(tag));
  }
  if (rule.match === "none") {
    return !rule.tags.some((tag) => tags.includes(tag));
  }
  return false;
};

const applyReplacementRule = (
  card: CardT,
  rule: ReplacementRule,
  gameState: GameState
) => {
  console.log(`applying replacement rule for ${card.id}`);
  let newGameState = { ...gameState };
  const cardTurn = slotForCard(card.id, gameState);
  const initialPlacement = scanTableauForCard(card.id, gameState);

  if (cardTurn !== gameState.cardsPlayed) {
    console.debug(
      `replacement rule does not apply on turn ${cardTurn}, ${gameState.cardsPlayed}`
    );
    return gameState;
  }

  if (!rule.match) {
    console.warn("replacement rule must have a tag match");
    return gameState;
  }

  const [matchingCards, _count] = countMatchingCards(rule.match, gameState);

  if (matchingCards.length === 0) {
    console.warn("no matching cards");
    return gameState;
  }

  const cardIdToReplace =
    rule.index === "first"
      ? matchingCards[0]
      : matchingCards[matchingCards.length - 1];

  const location = scanTableauForCard(cardIdToReplace, gameState);
  if (!location) {
    console.warn("Could not find card to replace");
    return gameState;
  }

  const [repaceSeason, replaceIndex] = location;
  const [removeSeason, removeIndex] = initialPlacement!;

  const removeFromTableau = {
    ...newGameState.tableau,
    [removeSeason]: [
      ...newGameState.tableau[removeSeason].slice(0, removeIndex),
      "empty",
      ...newGameState.tableau[removeSeason].slice(removeIndex + 1),
    ],
  };

  const replaceInTableau = {
    ...removeFromTableau,
    [repaceSeason]: [
      ...removeFromTableau[repaceSeason].slice(0, replaceIndex),
      card.id,
      ...removeFromTableau[repaceSeason].slice(replaceIndex + 1),
    ],
  };

  return {
    ...newGameState,
    // this leaves you with one less card in the tableau
    // so we need another turn to fill it
    cardsPlayed: newGameState.cardsPlayed - 1,
    tableau: replaceInTableau,
  };
};

export const applyAllTurnEndRules = (
  card: CardT,
  rule: Rule,
  gameState: GameState
): GameState => {
  if (rule.type === "resources") {
    return applyResourceRule(card.id, rule, gameState);
  }
  if (rule.type === "replacement") {
    return applyReplacementRule(card, rule, gameState);
  }
  return gameState;
};

const isTurnEndRule = (rule: Rule): rule is ResourceRule | ReplacementRule => {
  return rule.type === "resources" || rule.type === "replacement";
};

export const applyAllTurnEndRulesOnTableau = (
  gameState: GameState
): GameState => {
  const allCards = getAllCardsInOrderOfPlay(gameState);
  const rulesAndCards = allCards
    .map((cardId) => {
      const card = getCard(cardId);
      return card.rules.filter(isTurnEndRule).map((rule) => ({ rule, card }));
    })
    .flat();

  return rulesAndCards.reduce(
    (state, { rule, card }) => applyAllTurnEndRules(card, rule, state),
    gameState
  );
};

// TODO: scoring

/**
 * Scoring rules, by comparison with regular rules,
 * do not mutate the game state merely take it as input
 */
export const applyScoringRule = (
  rule: ScoringRule,
  gameState: GameState,
  score: Score
): Score => {
  if (!rule.match) {
    return {
      ...score,
      [rule.variant]: score[rule.variant] + rule.amount,
    };
  }

  const [_, matchCount] = countMatchingCards(rule.match, gameState);

  return {
    ...score,
    [rule.variant]: score[rule.variant] + matchCount * rule.amount,
  };
};

export const applyAllScoringRules = (
  rules: ScoringRule[],
  gameState: GameState,
  score: Score = {
    treasures: 0,
    regrets: 0,
  }
): Score => {
  const computed = rules.reduce(
    (score, rule) => applyScoringRule(rule, gameState, score),
    score
  );

  return {
    treasures: neverLessThanZero(computed.treasures),
    regrets: neverLessThanZero(computed.regrets),
  };
};

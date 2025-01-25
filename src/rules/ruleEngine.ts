import { getCard } from "../cards/store";
import { currentTurnSeason, turnForCard } from "../game/utils";
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
    return turnForCard(cardId, gameState) === gameState.turn;
  }

  const currentSeason = currentTurnSeason(gameState.turn);

  if (recurrence.seasons && !recurrence.seasons?.includes(currentSeason)) {
    return false;
  }

  if (recurrence.trigger === "turn-start") {
    return true;
  }
  if (recurrence.trigger === "end-of-season") {
    return gameState.turn % 4 === 0;
  }

  return false;
};

const applyResourceRule = (
  cardId: CardId,
  rule: ResourceRule,
  gameState: GameState
) => {
  const resources = { ...gameState.resources };

  if (!doesResourceCardApplyOnCurrentTurn(cardId, rule.recurrence, gameState)) {
    return gameState;
  }

  let resourcesToApply = rule.resources;
  if (rule.hasTagMatch) {
    const [_, transformResources] = countMatchingCards(rule, gameState);
    resourcesToApply = Object.keys(resourcesToApply).reduce(
      (acc: Partial<ResourcePool>, key: string) => {
        const cast = key as keyof ResourcePool;
        acc[cast] = transformResources * (acc[cast] ?? 0);
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

  return {
    ...gameState,
    resources,
  };
};

const matchesTags = (tags: Tags[], rule: TagMatchRules) => {
  let matches = false;

  if (rule.matchingAll) {
    matches = rule.matchingAll.every((tag) => tags.includes(tag));
  }
  if (rule.matchingAny) {
    matches = rule.matchingAny.some((tag) => tags.includes(tag));
  }
  if (rule.matchingNone) {
    matches = !rule.matchingNone.some((tag) => tags.includes(tag));
  }
  return matches;
};

const applyReplacementRule = (
  card: CardT,
  rule: ReplacementRule,
  gameState: GameState
) => {
  let newGameState = { ...gameState };
  const cardTurn = turnForCard(card.id, gameState);

  if (cardTurn !== gameState.turn) {
    return gameState;
  }

  if (!rule.hasTagMatch) {
    console.warn("replacement rule must have a tag match");
    return gameState;
  }

  const [matchingCards, _count] = countMatchingCards(rule, gameState);

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

  const [season, index] = location;

  return {
    ...newGameState,
    tableau: {
      ...newGameState.tableau,
      [season]: [
        ...newGameState.tableau[season].slice(0, index),
        card.id,
        ...newGameState.tableau[season].slice(index + 1),
      ],
    },
  };
};

export const applyGameStateRules = (
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

// TODO: scoring

/**
 * Scoring rules, by comparison with regular rules,
 * do not mutate the game state merely take it as input
 */
export const applyScoringRule = (
  rule: Rule,
  gameState: GameState,
  score: Score
): Score => {
  return score;
};

const applyAllScoringRules = (
  rules: ScoringRule[],
  gameState: GameState,
  score: Score
): Score => {
  return rules.reduce(
    (score, rule) => applyScoringRule(rule, gameState, score),
    score
  );
};

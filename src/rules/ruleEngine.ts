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
} from "../types";

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

  Object.entries(rule.resources).forEach(([key, value]) => {
    const resourceKey = key as keyof GameState["resources"];
    const oldValue = resources[resourceKey] ?? 0;

    resources[resourceKey] = oldValue + value;
  });

  return {
    ...gameState,
    resources,
  };
};

const matchesTags = (tags: Tags[], rule: ReplacementRule) => {
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

  let targetSeasons = rule.seasons ?? [
    Season.Spring,
    Season.Summer,
    Season.Fall,
    Season.Winter,
  ];

  targetSeasons =
    rule.index ?? "first" === "first" ? targetSeasons : targetSeasons.reverse();

  // scan over the cards in the tableau and find the first match

  targetSeasons.forEach((season) => {
    gameState.tableau[season].forEach((cardId, index) => {
      const card = getCard(cardId);
      if (matchesTags(card.tags, rule)) {
        newGameState = {
          ...newGameState,
          tableau: {
            ...newGameState.tableau,
            [season]: [
              ...newGameState.tableau[season].slice(0, index),
              card,
              ...newGameState.tableau[season].slice(index + 1),
            ],
          },
        };
      }
    });
  });

  return gameState;
};

const applyGameStateRules = (
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

/**
 * Scoring rules, by comparison with regular rules,
 * do not mutate the game state merely take it as input
 */
const applyScoringRule = (
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

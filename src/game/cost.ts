import { getCard } from "../cards/store";
import { CardId, GameState, ResourcePool } from "../types";
import { faceCardSlotForCard } from "./selectors";
import { memoize } from "lodash";

const computeSlotBaseCost = (
  cardId: CardId,
  gameState: GameState
): ResourcePool | undefined => {
  const faceCardSlot = faceCardSlotForCard(cardId, gameState);
  if (faceCardSlot === undefined) {
    return undefined;
  }

  const timeCost = faceCardSlot + 1;

  return {
    time: timeCost,
    money: 0,
    influence: 0,
  };
};

const _computeCardBaseCost = (cardId: CardId): ResourcePool => {
  const card = getCard(cardId);
  const costRules = card.rules.filter((rule) => rule.type === "cost");

  return costRules.reduce(
    (acc, rule) => {
      acc.time += rule.resources.time ?? 0;
      acc.money += rule.resources.money ?? 0;
      acc.influence += rule.resources.influence ?? 0;
      return acc;
    },
    { time: 0, money: 0, influence: 0 }
  );
};

const computeCardBaseCost = memoize(_computeCardBaseCost);

const _getAllDraftCostRules = (gameState: GameState) => {
  return Object.values(gameState.tableau)
    .flat()
    .map((cardId) => {
      if (cardId === "empty") {
        return [];
      }
      return getCard(cardId).rules.filter((rule) => rule.type === "draft-cost");
    })
    .flat();
};

const getAllDraftCostRules = memoize(_getAllDraftCostRules);

const computeApplicableDraftCosts = (
  cardId: CardId,
  gameState: GameState
): ResourcePool => {
  const card = getCard(cardId);

  const draftCostRules = getAllDraftCostRules(gameState);

  // if the rule has tags, at least one must match card
  // if the rule has seasons, must include card.season

  const cardTags = new Set(card.tags);
  const cardSeason = card.season;

  const applicableRules = draftCostRules.filter((rule) => {
    if (rule.tags.length > 0) {
      if (!rule.tags.some((tag) => cardTags.has(tag))) {
        return false;
      }
    }

    if (rule.seasons !== undefined) {
      if (!rule.seasons.includes(cardSeason)) {
        return false;
      }
    }

    return true;
  });

  return applicableRules.reduce(
    (acc, rule) => {
      acc.time += rule.resources.time ?? 0;
      acc.money += rule.resources.money ?? 0;
      acc.influence += rule.resources.influence ?? 0;
      return acc;
    },
    { time: 0, money: 0, influence: 0 }
  );
};

export const neverLessThanZero = (number: number) => Math.max(0, number);

export const resourceCostMinimums = (cost: ResourcePool): ResourcePool => {
  return {
    time: neverLessThanZero(cost.time),
    money: neverLessThanZero(cost.money),
    influence: neverLessThanZero(cost.influence),
  };
};

export const _computeCost = (
  cardId: CardId,
  gameState: GameState
): ResourcePool | undefined => {
  if (getCard(cardId).beginningCard) {
    return { time: 0, money: 0, influence: 0 };
  }

  const slotBaseCost = computeSlotBaseCost(cardId, gameState);
  if (slotBaseCost === undefined) {
    return undefined;
  }

  const cardBaseCost = computeCardBaseCost(cardId);
  if (cardBaseCost === undefined) {
    return undefined;
  }

  const draftCost = computeApplicableDraftCosts(cardId, gameState);

  const computedCost = [slotBaseCost, cardBaseCost, draftCost].reduce(
    (acc, cost) => {
      acc.time += cost.time;
      acc.money += cost.money;
      acc.influence += cost.influence;

      return acc;
    },
    { time: 0, money: 0, influence: 0 }
  );

  return resourceCostMinimums(computedCost);
};

export const computeCost = memoize(_computeCost);

export const canPurchaseCard = (
  cardId: CardId,
  gameState: GameState
): boolean => {
  const cost = computeCost(cardId, gameState);
  if (cost === undefined) {
    return false;
  }

  return (
    gameState.resources.time >= cost.time &&
    gameState.resources.money >= cost.money &&
    gameState.resources.influence >= cost.influence
  );
};

export const payForCard = (cardId: CardId, gameState: GameState): GameState => {
  const cost = computeCost(cardId, gameState);
  if (cost === undefined) {
    return gameState;
  }

  return {
    ...gameState,
    resources: {
      time: gameState.resources.time - cost.time,
      money: gameState.resources.money - cost.money,
      influence: gameState.resources.influence - cost.influence,
    },
  };
};

import {
  Card,
  CostRule,
  DraftCostRule,
  Recurrence,
  ResourceRule,
  ScoringRule,
  Season,
  TagMatchRules,
  Tags,
} from "../types";

export type CardDef = Omit<Card, "id">;
export type FortuneCardDef = Omit<Card, "id"> & { fortune: true };

export const baseResourceRule = (
  time: number,
  money: number,
  influence: number
): ResourceRule => ({
  type: "resources",
  resources: { money, influence, time },
  recurrence: "once",
});

export const recurringResourceRule = (
  time: number,
  money: number,
  influence: number,
  recurrence: Recurrence,
  match: TagMatchRules | undefined = undefined
): ResourceRule => ({
  type: "resources",
  resources: { money, influence, time },
  recurrence,
  match,
});

export const baseTreasure = (
  amount: number,
  match: TagMatchRules | undefined = undefined
): ScoringRule => ({
  type: "scoring",
  variant: "treasures",
  amount,
  match,
});

export const baseRegret = (
  amount: number,
  match: TagMatchRules | undefined = undefined
): ScoringRule => ({
  type: "scoring",
  variant: "regrets",
  amount,
  match,
});

export const costRule = (
  time: number,
  money: number,
  influence: number
): CostRule => ({
  type: "cost",
  resources: { money, influence, time },
});

export const draftMarkup = (
  time: number,
  money: number,
  influence: number,
  tags: Tags[],
  seasons: Season[] | undefined = undefined
): DraftCostRule => ({
  type: "draft-cost",
  resources: { money, influence, time },
  tags,
  seasons,
});

export const draftDiscount = (
  time: number,
  money: number,
  influence: number,
  tags: Tags[],
  seasons: Season[] | undefined = undefined
): DraftCostRule => ({
  type: "draft-cost",
  resources: { money: -money, influence: -influence, time: -time },
  tags,
  seasons,
});

export const ignoreRegrets = (n: number) => baseRegret(-n);

export const ratio2to1 = { matches: 2, value: 1 };
export const ratio3to1 = { matches: 3, value: 1 };
export const ratio4to1 = { matches: 4, value: 1 };

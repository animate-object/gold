import type { Tags } from "./card.types";
import type { ResourcePool } from "./game.types";
import type { Season } from "./season.types";

type Rule =
  | CostRule
  | DraftCostRule
  | ResourceRule
  | ScoringRule
  | ReplacementRule;

interface Recurring {
  trigger: "turn-start" | "end-of-season";
  // if specified, only recurrs during the specified seasons
  // if not specified, recurrs every season or turn
  seasons?: Season[];
}

type Recurrence = "once" | Recurring;

export interface TagMatchRules {
  tags: Tags[];
  match: "all" | "any" | "none";
  seasons?: Season[];
  // this construction allows us to model rules like '+1 X per N matches'
  // in its absence the implied ratio is 1:1
  ratio?: {
    matches: number;
    value: number;
  };
}

/**
 * Describes the one time cost of this card. Absence of a cost rule
 * means the card has only the default base cost for its draft order
 */
export interface CostRule {
  type: "cost";
  resources: Partial<ResourcePool>;
}

/**
 * Applies discount or markup to drafting a card based on tags
 *
 * Resources in `resources` are added or discounted from the cost of the card
 */
export interface DraftCostRule {
  type: "draft-cost";
  resources: Partial<ResourcePool>;
  tags: Tags[];
  // if present, the rule only applies to the specified season(s)
  seasons?: Season[];
}

/**
 * Changes the players resource pool either immediately or
 * on a recurring basis
 *
 * When a tag match rule is present, the resource change occurs if
 * the tag match rule is satisfied. The resources are applied according
 * to the `ratio` property.
 */
export interface ResourceRule {
  type: "resources";
  resources: Partial<ResourcePool>;
  recurrence: Recurrence;
  match?: TagMatchRules;
}

interface ScoreCondition {
  negate: boolean;
  seasons: Season[];
  match: TagMatchRules;
}

interface ScoreDescriptor {
  operation: "add" | "subtract";
  conditions?: ScoreCondition[];
  amount: number;
}

/**
 * Changes to `treasures` or `regrets`.
 * Score is computed each turn, but not finalized until the end of the game
 */
export interface ScoringRule {
  type: "scoring";
  treasure: ScoreDescriptor[];
  regret: ScoreDescriptor[];
}

/**
 * Some cards replace an existing card in the tableau.
 * Resources and game state are not recomputed, but can
 * impact final scoring
 */
export interface ReplacementRule {
  type: "replacement";
  index: "first" | "last";
  match: TagMatchRules;
}

export type { Rule };

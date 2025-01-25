import type {
  Rule,
  CostRule,
  DraftCostRule,
  ResourceRule,
  ReplacementRule,
  ScoringRule,
  ResourcePool,
  TagMatchRules,
} from "../types";

type ResourceAmtDescriptor = (n: number) => string;

const describeResource: Record<keyof ResourcePool, ResourceAmtDescriptor> = {
  time: (n) => `${n} 🕐`,
  money: (n) => `${n} 💰`,
  influence: (n) => `${n} 🗣️`,
};

const signedNumber = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

const describeResourceChange: Record<
  keyof ResourcePool,
  ResourceAmtDescriptor
> = {
  time: (n) => `🕐 ${signedNumber(n)}`,
  money: (n) => `💰 ${signedNumber(n)}`,
  influence: (n) => `🗣️ ${signedNumber(n)}`,
};

const resourceDescriptors = (
  resources: Partial<ResourcePool>,
  variant: "base" | "change" = "base"
): string[] => {
  return Object.entries(resources).map(([resource, amt]) =>
    variant === "base"
      ? describeResource[resource as keyof ResourcePool](amt)
      : describeResourceChange[resource as keyof ResourcePool](amt)
  );
};

export const describeCostRule = ({ resources }: CostRule): string => {
  return resourceDescriptors(resources).join(" ・ ");
};

export const describeRecurrence = ({
  trigger,
  seasons,
}: Exclude<ResourceRule["recurrence"], "once">): string => {
  if (trigger === "turn-start") {
    if (seasons) {
      return `every turn in ${seasons.join(", ")}`;
    }
    return "every turn";
  }

  if (trigger === "end-of-season") {
    if (seasons) {
      return `end of ${seasons.join(", ")}`;
    }
    return "end of every season";
  }

  return "unknown recurrence";
};

const englishJoin = (
  items: string[],
  conjunction: string,
  delimiter: string = ","
): string => {
  if (items.length === 0) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1]}`;
  }
  const last = items.pop();
  return `${items.join(delimiter)}${delimiter} ${conjunction} ${last}`;
};

export const describeTagMatch = (
  tagMatch: TagMatchRules,
  prefix: string = "for every"
): string => {
  const base = `${prefix} card`;
  const withPart = tagMatch.match === "none" ? "without" : "with";
  const joinOperator = tagMatch.match === "all" ? "and" : "or";
  const joined = englishJoin(tagMatch.tags, joinOperator);

  const ratio = tagMatch.ratio
    ? `at ratio ${tagMatch.ratio.matches}:${tagMatch.ratio.value}`
    : "";

  const seasons = tagMatch.seasons;
  const seasonPart = seasons ? `in ${seasons.join(", ")}` : "";

  return `${base} ${withPart} [${joined}] ${seasonPart} ${ratio}`;
};

export const describeResourceRule = (rule: ResourceRule): string => {
  // components of the phrase:
  // [when] [resource changes] [for [ratio] [matching [tags]]]
  // e.g.
  // every turn, +1 🕐, +1 💰, +1 🗣️
  // +1 💰 for every career tag
  // end of spring, summer, -1 💰

  const when =
    rule.recurrence === "once" ? "" : `${describeRecurrence(rule.recurrence)} `;

  const resourceChange = resourceDescriptors(rule.resources, "change").join(
    ","
  );

  const match = rule.match ? ` ${describeTagMatch(rule.match)}` : "";

  return `${when}${resourceChange}${match}`;
};

export const describeReplacementRule = (rule: ReplacementRule): string => {
  return `Replaces ${describeTagMatch(rule.match, `${rule.index} card`)}`;
};

export const describeScoringRule = (rule: ScoringRule): string => {
  return "scoring rule";
};

export const describeDraftCostRule = (rule: DraftCostRule): string => {
  return "draft cost rule";
};

export const describeRule = (rule: Rule): string => {
  switch (rule.type) {
    case "cost":
      return describeCostRule(rule);
    case "draft-cost":
      return describeDraftCostRule(rule);
    case "resources":
      return describeResourceRule(rule);
    case "replacement":
      return describeReplacementRule(rule);
    case "scoring":
      return describeScoringRule(rule);
  }
};

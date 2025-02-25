import React, { ReactNode } from "preact/compat";
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
import { GameIcon } from "../components/GameIcon";

type ResourceAmtDescriptor = (n: number) => string;

const describeResource: Record<keyof ResourcePool, ResourceAmtDescriptor> = {
  time: (n) => `${n} [time]`,
  money: (n) => `${n} [money]`,
  influence: (n) => `${n} [influence]`,
};

const signedNumber = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

const describeResourceChange: Record<
  keyof ResourcePool,
  ResourceAmtDescriptor
> = {
  time: (n) => `${signedNumber(n)} [time] `,
  money: (n) => `${signedNumber(n)} [money] `,
  influence: (n) => `${signedNumber(n)} [influence] `,
};

const resourceDescriptors = (
  resources: Partial<ResourcePool>,
  variant: "base" | "change" = "base",
  includeZeros: boolean = false
): string[] => {
  const entries = Object.entries(resources);
  const filteredEntries = !includeZeros
    ? entries.filter(([, amt]) => amt !== 0)
    : entries;
  return filteredEntries.map(([resource, amt]) =>
    variant === "base"
      ? describeResource[resource as keyof ResourcePool](amt)
      : describeResourceChange[resource as keyof ResourcePool](amt)
  );
};

export const describeCostRule = ({ resources }: CostRule): string => {
  return `Cost:${resourceDescriptors(resources, "change").join("・")}`;
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
  const joined = englishJoin(
    tagMatch.tags.map((tag) => `[${tag}]`),
    joinOperator
  );

  const ratio = tagMatch.ratio ? `${describeRatio(tagMatch.ratio)}` : "";

  const seasons = tagMatch.seasons;
  const seasonPart = seasons ? `in ${seasons.join(", ")}` : "";

  return `${base} ${withPart} ${joined} ${seasonPart} ${ratio}`;
};

export const describeResourceChanges = (
  resources: Partial<ResourcePool>
): string => {
  return resourceDescriptors(resources, "change").join(",");
};

export const describeResourceRule = (rule: ResourceRule): string => {
  // components of the phrase:
  // [when] [resource changes] [for [ratio] [matching [tags]]]
  // e.g.
  // every turn, +1 [time], +1 [money], +1 [influence]
  // +1 [money] for every career tag
  // end of spring, summer, -1 [money]

  const when =
    rule.recurrence === "once" ? "" : `${describeRecurrence(rule.recurrence)} `;

  const resourceChange = describeResourceChanges(rule.resources);

  const match = rule.match ? ` ${describeTagMatch(rule.match)}` : "";

  return `Resources:${when}${resourceChange}${match}`;
};

export const describeReplacementRule = (rule: ReplacementRule): string => {
  return `Swap:${describeTagMatch(rule.match, `${rule.index} card`)}`;
};

export const describeRatio = ({
  matches,
  value,
}: {
  matches: number;
  value: number;
}): string => {
  return `${matches}:${value}`;
};

export const describeScoringRule = (rule: ScoringRule): string => {
  const matchPart = rule.match ? ` ${describeTagMatch(rule.match)}` : "";
  return `Score:${rule.amount} ${rule.variant}${matchPart}`;
};

export const describeDraftCostRule = (rule: DraftCostRule): string => {
  // [resource descriptor] [for [tags]] in [seasons]

  const resource = resourceDescriptors(rule.resources, "change").join(",");

  const tags =
    rule.tags.length > 0
      ? `for ${englishJoin(
          rule.tags.map((tag) => `[${tag}]`),
          "and",
          ","
        )}`
      : "";

  const seasons = rule.seasons ? `in ${rule.seasons.join(", ")}` : "";

  return `Pay:${resource} ${tags} ${seasons}`;
};

const ruleDescriptorString = (rule: Rule): string => {
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
    case "fate-roll":
      return "Roll fate dice";
  }
  return "";
};

function parseRuleDescriptor(ruleDescriptor: string): string[] {
  const regex = /(\[[^\]]+\])/g;
  let result = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(ruleDescriptor)) !== null) {
    if (match.index > lastIndex) {
      result.push(ruleDescriptor.slice(lastIndex, match.index));
    }
    result.push(match[0]);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < ruleDescriptor.length) {
    result.push(ruleDescriptor.slice(lastIndex));
  }

  return result;
}

export const substituteSymbolsForIcons = (
  stringDescriptor: string
): React.ReactNode => {
  const components = parseRuleDescriptor(stringDescriptor);
  return (
    <div className="inline-flex flex-wrap gap-0.5">
      {components.map((component) => {
        if (component.startsWith("[")) {
          return <GameIcon size="sm" tag={component.slice(1, -1) as any} />;
        }
        return component;
      })}
    </div>
  );
};

export const describeRule = (rules: Rule): ReactNode => {
  const stringDescriptor = ruleDescriptorString(rules);
  return substituteSymbolsForIcons(stringDescriptor);
};

// Sometimes used outside rule descriptions...
export const describeResourceChangesWithSubstitution = (
  resources: Partial<ResourcePool>
): ReactNode => {
  const string = describeResourceChanges(resources);

  return substituteSymbolsForIcons(string);
};

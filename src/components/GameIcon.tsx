import classNames from "classnames";
import { Decks, Tags } from "../types";
import React from "preact/compat";
import {
  Banknote,
  BicepsFlexed,
  BookCheck,
  Brain,
  Briefcase,
  Carrot,
  Church,
  Clock,
  Contact,
  Flower,
  Grab,
  GraduationCap,
  HandCoins,
  HandHeart,
  Heart,
  HeartCrack,
  Leaf,
  Meh,
  MessageCircleMore,
  MicVocal,
  Palette,
  Plane,
  Snowflake,
  Sparkles,
  Sun,
  TentTree,
  Users,
} from "lucide-react";
import { Tooltip } from "./Tooltip";

type ResourceIconNames = "time" | "money" | "influence_";

type IconNames = Tags | Decks | ResourceIconNames;

const iconStyles: Record<IconNames, string> = {
  // people tags
  family: "bg-blue-400 text-white shadow-md shadow-blue-500/50",
  friend: "bg-green-400 text-white shadow-md shadow-green-500/50",
  love: "bg-pink-400 text-white shadow-md shadow-pink-500/50",
  community: "bg-purple-600 text-white shadow-md shadow-purple-500/50",
  // disposition tags
  discipline: "bg-slate-400 text-black shadow-md shadow-slate-500/50",
  faith: "bg-violet-400 text-white shadow-md shadow-violet-500/50",
  intellect: "bg-emerald-400 text-white shadow-md shadow-emerald-500/50",
  creative: "bg-yellow-200 text-black shadow-md shadow-yellow-500/50",
  // activity tags
  sunshine: "bg-orange-500 text-white shadow-md shadow-orange-500/50", // fitness, sport & nature
  travel: "bg-amber-700 text-white shadow-md shadow-amber-500/50",
  career: "bg-sky-300 text-black shadow-md shadow-sky-500/50",
  education: "bg-violet-800 text-white shadow-md shadow-violet-500/50",
  // life tags
  finance: "bg-amber-500 text-white shadow-md shadow-amber-500/50",
  health: "bg-lime-400 text-black shadow-md shadow-lime-500/50",
  influence: "bg-indigo-700 text-white shadow-md shadow-indigo-500/50",
  confidence: "bg-cyan-800 text-white shadow-md shadow-cyan-500/50",
  // fortune
  boon: "bg-green-900 text-white shadow-md shadow-green-500/50",
  // misfortunes
  tragedy: "bg-red-700 text-white shadow-md shadow-red-500/50",
  mistake: "bg-red-400 text-white shadow-md shadow-red-500/50",

  // TODO: icon styles for seasons & decks
  spring: "text-green-400",
  fortunesSpring: "text-green-400",
  summer: "text-yellow-400",
  fortunesSummer: "text-yellow-400",
  fall: "text-orange-400",
  fortunesFall: "text-orange-400",
  winter: "text-blue-400",
  fortunesWinter: "text-blue-400",
  // decks
  beginnings: "text-purple-400",

  // resources
  time: "bg-slate-200 text-black shadow-md shadow-slate-500/50",
  money: "bg-slate-200 text-black shadow-md shadow-slate-500/50",
  influence_: "bg-slate-200 text-black shadow-md shadow-slate-500/50",
};

const iconForName: Record<IconNames, React.ComponentType> = {
  // people tags
  family: Users,
  friend: Contact,
  love: Heart,
  community: HandHeart,
  // disposition tags
  discipline: BicepsFlexed,
  faith: Church,
  intellect: Brain,
  creative: Palette,
  // activity tags
  sunshine: TentTree,
  travel: Plane,
  career: Briefcase,
  education: GraduationCap,
  // life tags
  finance: HandCoins,
  health: Carrot,
  influence: MicVocal,
  confidence: Grab,
  // fortune
  boon: BookCheck,
  // misfortunes
  tragedy: HeartCrack,
  mistake: Meh,

  // TODO: icon styles for seasons & decks
  spring: Flower,
  fortunesSpring: Flower,
  summer: Sun,
  fortunesSummer: Sun,
  fall: Leaf,
  fortunesFall: Leaf,
  winter: Snowflake,
  fortunesWinter: Snowflake,
  // decks
  beginnings: Sparkles,

  // resources
  time: Clock,
  money: Banknote,
  influence_: MessageCircleMore,
};

type IconSize = "sm" | "standard";

interface Props {
  text?: string;
  tag: IconNames;
  size?: IconSize;
}

const styleForSize = {
  sm: "h-3 w-3",
  standard: "h-4 w-4",
};

export const GameIcon = ({ text, tag, size }: Props) => {
  const Icon = iconForName[tag];
  const sizeClasses = styleForSize[size ?? "standard"];

  return (
    <Tooltip classNames={classNames(sizeClasses)} content={text ?? tag}>
      <div
        className={classNames(
          "flex p-0.5 items-center justify-center border-1 border-white rounded-md",
          iconStyles[tag],
          sizeClasses
        )}
      >
        <Icon />
      </div>
    </Tooltip>
  );
};

const Money = () => <GameIcon tag="money" />;
const Time = () => <GameIcon tag="time" />;
const Influence = () => <GameIcon tag="influence_" />;

export const Resource = {
  Money,
  Time,
  Influence,
};

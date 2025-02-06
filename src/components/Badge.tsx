import classNames from "classnames";
import { Tags } from "../types";

interface Props {
  text: string;
  tag: Tags;
}

const tagStyles: Record<Tags, string> = {
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
  growth: "bg-emerald-700 text-white shadow-md shadow-emerald-500/50",
  // misfortunes
  tragedy: "bg-red-700 text-white shadow-md shadow-red-500/50",
  mistake: "bg-red-400 text-white shadow-md shadow-red-500/50",
};

export const Badge = ({ text, tag }: Props) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-1 py-0.5 text-tiny font-medium";
  return <span class={classNames(baseStyles, tagStyles[tag])}>{text}</span>;
};

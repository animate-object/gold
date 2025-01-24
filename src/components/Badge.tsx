import classNames from "classnames";
import { Tags } from "../types";

interface Props {
  text: string;
  tag: Tags;
}

const tagStyles: Record<Tags, string> = {
  // people tags
  family: "bg-blue-400 text-white",
  friend: "bg-green-400 text-white",
  love: "bg-pink-400 text-white",
  community: "bg-purple-600 text-white",
  // disposition tags
  discipline: "bg-slate-400 text-black",
  faith: "bg-violet-400 text-white",
  intellect: "bg-emerald-400 text-white",
  creative: "bg-yellow-200 text-black",
  // activity tags
  sunshine: "bg-orange-500 text-white", // fitness, sport & nature
  travel: "bg-amber-700 text-white",
  career: "bg-sky-300 text-black",
  education: "bg-violet-800 text-white",
  // life tags
  wealth: "bg-amber-500 text-white",
  health: "bg-lime-400 text-black",
  influence: "bg-indigo-700 text-white",
  confidence: "bg-cyan-800 text-white",
  // fortune
  boon: "bg-green-900 text-white",
  growth: "bg-emerald-700 text-white",
  // misfortunes
  tragedy: "bg-red-700 text-white",
  mistake: "bg-red-400 text-white",
};

export const Badge = ({ text, tag }: Props) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-1 py-0.5 text-tiny font-medium";
  return <span class={classNames(baseStyles, tagStyles[tag])}>{text}</span>;
};

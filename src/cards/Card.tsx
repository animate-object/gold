import classNames from "classnames";
import { Badge } from "../components/Badge";
import { Card as CardT } from "../types";

interface Props {
  card: CardT;
}

function seasonStyles(season: CardT["season"]): string {
  switch (season) {
    case "spring":
      return "bg-green-50 border-green-800";
    case "summer":
      return "bg-yellow-50 border-yellow-500";
    case "fall":
      return "bg-orange-50 border-orange-600";
    case "winter":
      return "bg-blue-50 border-blue-800";
    default:
      return "bg-slate-50 border-slate-700";
  }
}

export function CardTags({ card: { tags } }: Props) {
  return (
    <div class="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge text={tag} tag={tag} />
      ))}
    </div>
  );
}

export const CardRules = ({ card }: Props) => {
  return (
    <div className="flex flex-shrink h-full text-sm">Rules placeholder</div>
  );
};

export function Card({ card }: Props) {
  const seasonStyle = seasonStyles(card.season);

  const cardClasses =
    "flex flex-col h-64 w-40 p-2 m-4 rounded overflow-hidden shadow-md border-2";

  return (
    <div className={classNames("border", seasonStyle, cardClasses)}>
      <h1 className="text-lg">{card.name}</h1>
      <CardRules card={card} />
      <CardTags card={card} />
    </div>
  );
}

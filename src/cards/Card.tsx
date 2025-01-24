import classNames from "classnames";
import { Badge } from "../components/Badge";
import { Card as CardT } from "../types";

interface Props {
  card: CardT;
}

function seasonStyles(season: CardT["season"]): string {
  let color;
  switch (season) {
    case "spring":
      //   color = "green";
      return "bg-green-100 border-green-500";
    case "summer":
      return "bg-yellow-100 border-yellow-500";
    case "fall":
      return "bg-orange-100 border-orange-500";
    case "winter":
      color = "blue";
      return "bg-blue-100 border-blue-500";
    default:
      return "bg-slate-100 border-slate-500";
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
  return <div className="flex flex-shrink h-full">Rules placeholder</div>;
};

export function Card({ card }: Props) {
  const seasonStyle = seasonStyles(card.season);

  const cardClasses =
    "flex flex-col h-64 w-40 p-2 m-4 rounded overflow-hidden shadow-md border-2";

  return (
    <div className={classNames("border", seasonStyle, cardClasses)}>
      <h1 className="text-xl">{card.name}</h1>
      <CardRules card={card} />
      <CardTags card={card} />
    </div>
  );
}

import classNames from "classnames";
import { Badge } from "../components/Badge";
import { CardId, Card as CardT, Season } from "../types";
import { useMemo } from "preact/hooks";
import { getCard } from "./store";
import {
  seasonBgLightStyles,
  seasonShadowStyles,
  cardSeasonStyles,
  seasonBgBoldStyles,
  seasonBgDeckStyles,
  seasonBgCardFaceStyles,
} from "../utils/seasonStyles";

interface CardDisplayProps {
  card: CardT;
}

export function CardTags({ card: { tags } }: CardDisplayProps) {
  return (
    <div class="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge text={tag} tag={tag} />
      ))}
    </div>
  );
}

export const CardRules = ({ card }: CardDisplayProps) => {
  return (
    <div className="flex flex-shrink h-full text-sm">Rules placeholder</div>
  );
};

interface Props {
  cardId: CardId;
  onClick?: () => void;
}

const CARD_CLASSES =
  "flex flex-col h-48 w-32 p-2 rounded overflow-hidden shadow-md";

export function Card({ cardId, onClick }: Props) {
  const card = useMemo(() => getCard(cardId), [cardId]);

  const seasonStyle = classNames(
    seasonShadowStyles(card.season),
    seasonBgCardFaceStyles(card.season)
  );

  return (
    <div className={classNames(seasonStyle, CARD_CLASSES)} onClick={onClick}>
      <h1 className="text-lg">{card.name}</h1>
      <CardRules card={card} />
      <CardTags card={card} />
    </div>
  );
}

export function EmptyCard() {
  return (
    <div className={classNames(CARD_CLASSES, cardSeasonStyles("empty"))} />
  );
}

export function Deck({
  variant,
  label,
}: {
  variant: Season | "discard";
  label: string;
}) {
  const seasonStyle =
    variant === "discard"
      ? "bg-slate-300 shadow-md shadow-slate-700/50"
      : classNames(seasonShadowStyles(variant), seasonBgDeckStyles(variant));
  return (
    <div className={classNames(CARD_CLASSES, seasonStyle)}>
      <h1 className="text-lg">{label}</h1>
    </div>
  );
}

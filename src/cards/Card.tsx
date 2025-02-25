import classNames from "classnames";
import { CardId, Card as CardT, DisplayableDecks } from "../types";
import { useMemo } from "preact/hooks";
import { getCard } from "./store";
import {
  seasonShadowStyles,
  cardSeasonStyles,
  seasonBgDeckStyles,
  seasonBgCardFaceStyles,
} from "../utils/seasonStyles";
import { describeRule } from "./ruleDescriptors";
import { GameIcon } from "../components/GameIcon";
import { deckForCard } from "../game/selectors";

interface CardDisplayProps {
  card: CardT;
}

export function CardTags({ card: { tags, id } }: CardDisplayProps) {
  return (
    <div class="flex justify-between">
      <div>
        <GameIcon tag={deckForCard(id)} />
      </div>
      <div class="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <GameIcon text={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}

export const CardRules = ({
  card,
  includeCostRules,
}: CardDisplayProps & {
  includeCostRules?: boolean;
}) => {
  const rules = useMemo(() => {
    if (includeCostRules) {
      console.log("Expect to see card cost rules");
      return card.rules;
    }
    return card.rules.filter((rule) => rule.type !== "cost");
  }, [card, includeCostRules]);
  return (
    <div className="flex flex-shrink h-full text-xt">
      <div className="flex flex-col gap-1">
        {rules.map((rule, index) => (
          <span className="hover:bg-slate-200 rounded select-none" key={index}>
            {describeRule(rule)}
          </span>
        ))}
      </div>
    </div>
  );
};

interface Props {
  cardId: CardId;
  onClick?: () => void;
  displayCostRules?: boolean;
}

const CARD_CLASSES =
  "flex flex-col h-48 w-32 p-2 rounded overflow-hidden shadow-md";

export function Card({ cardId, onClick, displayCostRules }: Props) {
  const card = useMemo(() => getCard(cardId), [cardId]);

  const seasonStyle = classNames(
    seasonShadowStyles(card.season),
    seasonBgCardFaceStyles(card.season, card.beginningCard)
  );

  return (
    <div className={classNames(seasonStyle, CARD_CLASSES)} onClick={onClick}>
      <h1 className="text-sm mb-1">{card.name}</h1>
      {/* cost rules are described on the tableau */}
      <CardRules card={card} includeCostRules={displayCostRules} />
      <CardTags card={card} />
    </div>
  );
}

interface EmptyCardProps {
  children?: React.ReactNode;
}

export function EmptyCard({ children }: EmptyCardProps): React.ReactNode {
  return (
    <div
      className={classNames(
        CARD_CLASSES,
        cardSeasonStyles("empty"),
        "flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
}

export function Deck({
  variant,
  label,
  onClick,
}: {
  variant: DisplayableDecks;
  label: string;
  onClick?: () => void;
}) {
  const seasonStyle =
    variant === "discard"
      ? "bg-slate-300 shadow-md shadow-slate-700/50"
      : classNames(seasonShadowStyles(variant), seasonBgDeckStyles(variant));
  return (
    <div onClick={onClick} className={classNames(CARD_CLASSES, seasonStyle)}>
      <h1 className="text-lg">{label}</h1>
    </div>
  );
}

export const DraftCard = ({
  cardId,
  onClick,
  displayCostRules,
}: {
  cardId: CardId | "empty";
  onClick: () => void;
  displayCostRules?: boolean;
}) => {
  return cardId === "empty" ? (
    <EmptyCard />
  ) : (
    <Card
      cardId={cardId}
      onClick={onClick}
      displayCostRules={displayCostRules}
    />
  );
};

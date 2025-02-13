import { useMemo } from "preact/hooks";
import { canPurchaseCard, computeCost } from "../../game/cost";
import { Resource } from "../GameIcon";
import classNames from "classnames";
import { CardId, GameState, ResourcePool } from "../../types";

export const CostDisplay = ({
  time,
  money,
  influence,
  classNames: extraClasses,
}: ResourcePool & { classNames?: string }) => {
  return (
    <div className={classNames("flex text-sm w-100 gap-3", extraClasses)}>
      <div className="inline-flex items-center gap-1">
        <Resource.Time /> {time}
      </div>
      <div className="inline-flex items-center gap-1">
        <Resource.Money /> {money}
      </div>
      <div className="inline-flex items-center gap-1">
        <Resource.Influence /> {influence}
      </div>
    </div>
  );
};

export const CardCost = ({
  gameState,
  cardId,
}: {
  gameState: GameState;
  cardId: CardId;
}) => {
  const { time, money, influence } = useMemo(
    () => computeCost(cardId, gameState) ?? { time: 0, money: 0, influence: 0 },
    [cardId, gameState]
  );
  const canPayForCard = useMemo(
    () => canPurchaseCard(cardId, gameState),
    [cardId, gameState]
  );

  return (
    <CostDisplay
      classNames={!canPayForCard ? "text-red-500" : undefined}
      time={time}
      money={money}
      influence={influence}
    />
  );
};

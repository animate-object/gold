import classNames from "classnames";
import {
  seasonBgLightStyles,
  seasonShadowSubtleStyles,
  seasonTextStyles,
} from "../../utils/seasonStyles";
import { _capitalize } from "../../util";
import { GameIcon } from "../GameIcon";
import { GameState, Season } from "../../types";
import { Card, EmptyCard } from "../../cards/Card";
import { Dice3, Skull } from "lucide-react";

export const EmptyTableauCard = ({
  season,
  idx,
}: {
  season: Season;
  idx: number;
}) => {
  return (
    <EmptyCard>
      {idx === 3 && season !== "winter" && <Dice3 className="text-gray-400" />}
      {idx === 3 && season === "winter" && <Skull className="text-gray-400" />}
    </EmptyCard>
  );
};

export const Tableau = ({
  tableau,
  gameConfiguration: { displayCostRules },
}: GameState) => {
  console.log({ displayCostRules });
  return (
    <div className="flex flex-wrap gap-3 flex-shrink">
      {Object.entries(tableau).map(([season, cards]) => (
        <div
          className={classNames(
            "flex flex-col gap-2 rounded-md p-2",
            seasonBgLightStyles(season as Season),
            seasonShadowSubtleStyles(season as Season)
          )}
        >
          <h2
            className={classNames(
              seasonTextStyles(season as Season),
              "flex gap-1 items-center"
            )}
          >
            <div> {_capitalize(season)}</div>
            <GameIcon tag={season as Season} />
          </h2>
          <div className="flex flex-wrap gap-3">
            {cards.map((cardId, idx) =>
              cardId === "empty" ? (
                <EmptyTableauCard idx={idx} season={season as Season} />
              ) : (
                <Card cardId={cardId} displayCostRules={displayCostRules} />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

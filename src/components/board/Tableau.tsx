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

export const Tableau = ({ tableau }: GameState) => {
  return (
    <div className="flex flex-wrap gap-3">
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
            {cards.map((cardId) =>
              cardId === "empty" ? <EmptyCard /> : <Card cardId={cardId} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

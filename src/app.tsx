import classNames from "classnames";
import "./app.css";
import { Card, Deck, EmptyCard } from "./cards/Card";
import { useGameQueue } from "./game/engine";
import { Season, GameState } from "./types";
import {
  seasonBgLightStyles,
  seasonShadowSubtleStyles,
  seasonTextStyles,
} from "./utils/seasonStyles";
import { getShuffledDecks } from "./cards/definitions";
import { useEffect } from "preact/hooks";
import { getCurrentDeck } from "./game/selectors";

const _capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const EMPTY_GAME_STATE: GameState = {
  turn: 0,
  tableau: {
    [Season.Spring]: ["empty", "empty", "empty", "empty"],
    [Season.Summer]: ["empty", "empty", "empty", "empty"],
    [Season.Fall]: ["empty", "empty", "empty", "empty"],
    [Season.Winter]: ["empty", "empty", "empty", "empty"],
  },
  resources: {
    money: 0,
    time: 4,
    influence: 0,
  },
  decks: getShuffledDecks(),
  discard: [],
  faceCardIds: ["empty", "empty", "empty"],
  gameConfiguration: {
    cardsDrawnPerTurn: 3,
  },
};

export const SimpleTableau = ({ tableau }: GameState) => {
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
          <h2 className={seasonTextStyles(season as Season)}>
            {_capitalize(season)}
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

export function App() {
  const { state, dispatch } = useGameQueue(EMPTY_GAME_STATE, { delayMs: 0 });
  const displayTurn = state.turn + 1;
  const resourcesAndScore = {
    Time: state.resources.time,
    Money: state.resources.money,
    Influence: state.resources.influence,
    Treasures: 0,
    Regrets: 0,
    Turn: displayTurn,
  };

  useEffect(() => {
    dispatch({ type: "draft" });
  }, []);

  const currentDeck = getCurrentDeck(state);

  return (
    <div className="bg-slate-50 h-screen w-full m-0 absolute top-0">
      <div className="p-2 flex flex-wrap">
        <SimpleTableau {...state} />

        <div className="flex gap-3 bg-gray-200 p-2 rounded-md mt-2">
          <Deck variant={"discard"} label="Discard" />
          <Deck
            variant={currentDeck}
            label={`Deck of ${_capitalize(currentDeck)}`}
          />
          {state.faceCardIds.map((cardId) =>
            cardId === "empty" ? (
              <EmptyCard />
            ) : (
              <Card
                cardId={cardId}
                onClick={() => dispatch({ type: "select", cardId })}
              />
            )
          )}

          <div className="flex flex-col gap-2 px-4">
            {Object.entries(resourcesAndScore).map(([key, value]) => (
              <div>
                <span className="font-semibold me-1">{key}:</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

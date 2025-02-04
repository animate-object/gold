import classNames from "classnames";
import "./app.css";
import { Card, Deck, EmptyCard } from "./cards/Card";
import { useGameQueue } from "./game/engine";
import { Season, GameState, CardId } from "./types";
import {
  seasonBgLightStyles,
  seasonShadowSubtleStyles,
  seasonTextStyles,
} from "./utils/seasonStyles";
import { getShuffledDecks } from "./cards/definitions";
import { useCallback, useEffect, useMemo } from "preact/hooks";
import { getCurrentDeck } from "./game/selectors";
import { initDebugTools } from "./debug";
import { _capitalize } from "./util";
import { canPurchaseCard, computeCost } from "./game/cost";

const EMPTY_GAME_STATE: GameState = {
  cardsPlayed: 0,
  turn: 0,
  tableau: {
    [Season.Spring]: ["empty", "empty", "empty", "empty"],
    [Season.Summer]: ["empty", "empty", "empty", "empty"],
    [Season.Fall]: ["empty", "empty", "empty", "empty"],
    [Season.Winter]: ["empty", "empty", "empty", "empty"],
  },
  resources: {
    time: 2,
    money: 1,
    influence: 1,
  },
  decks: getShuffledDecks(),
  discard: [],
  faceCardIds: ["empty", "empty", "empty"],
  gameConfiguration: {
    cardsDrawnPerTurn: 3,
    cardsDrawnOnFirstTurn: 2,
    allowNegativeResources: true,
    timeAtStartOfSeason: 3,
  },
  state: "playing",
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

const DraftCard = ({
  cardId,
  onClick,
}: {
  cardId: CardId | "empty";
  onClick: () => void;
}) => {
  return cardId === "empty" ? (
    <EmptyCard />
  ) : (
    <Card cardId={cardId} onClick={onClick} />
  );
};

const CardCost = ({
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

  return (
    <div className="flex text-sm w-100 gap-3">
      <span>🕐 {time}</span>
      <span>💰 {money}</span>
      <span>🗣️ {influence}</span>
    </div>
  );
};

export function App() {
  const { state, dispatch } = useGameQueue(EMPTY_GAME_STATE, { delayMs: 0 });
  const displayTurn = state.turn + 1;

  const { treasures, regrets } = useMemo(() => {
    return { treasures: 0, regrets: 0 };
  }, [state]);

  const readout = {
    "🕐": state.resources.time,
    "💰": state.resources.money,
    "🗣️": state.resources.influence,
    Treasures: treasures,
    Regrets: regrets,
    Turn: displayTurn,
    "Cards Played": state.cardsPlayed,
    State: state.state === "playing" ? "▶️" : "⏹️",
  };

  useEffect(() => {
    dispatch({ type: "draft" });
  }, []);

  useEffect(() => {
    initDebugTools({
      playCard: (cardId: number) => {
        dispatch({ type: "select", cardId });
      },
    });
  }, []);

  useEffect(() => {
    if (state.state === "finished") {
      const summary = `In your final hours, you evaluated your life as follows:
      Treasures: ${treasures}
      Regrets: ${regrets}
      Score: ${treasures - regrets}
      `;

      alert("You're Dead!\n" + summary);
    }
  }, [state.state]);

  const currentDeck = getCurrentDeck(state);

  const handleSelectCardToDraft = useCallback(
    (cardId: CardId | "empty") => {
      if (cardId === "empty") {
        console.warn("Empty card slot selected");
        return;
      }
      if (state.gameConfiguration.allowNegativeResources) {
        console.info("Playing card", cardId);
        dispatch({ type: "select", cardId });
      } else {
        if (canPurchaseCard(cardId, state)) {
          dispatch({ type: "select", cardId });
        } else {
          alert("You can't afford that card!");
        }
      }
    },
    [state]
  );

  return (
    <div className="bg-slate-50 h-screen w-full m-0 absolute top-0">
      <div className="p-2 flex flex-wrap">
        <SimpleTableau {...state} />

        <div className="flex gap-3 bg-gray-200 p-2 rounded-md mt-2">
          <Deck
            variant={"discard"}
            label={`Discard (${state.discard.length})`}
          />
          <Deck
            variant={currentDeck}
            label={`Deck of ${_capitalize(currentDeck)}`}
          />
          {state.faceCardIds.map((cardId) => (
            <div className="flex flex-col gap-2 justify-center items-center">
              <DraftCard
                cardId={cardId}
                onClick={() => handleSelectCardToDraft(cardId)}
              />
              {cardId !== "empty" && (
                <CardCost gameState={state} cardId={cardId} />
              )}
            </div>
          ))}
          <div className="flex flex-wrap gap-2 px-4 text-sm w-44">
            {Object.entries(readout).map(([key, value]) => (
              <div>
                <span className="font-semibold me-1">{key}:</span>
                {value}
              </div>
            ))}
            <div class="flex text-xs">
              <button
                onClick={() =>
                  dispatch({ type: "tradeResources", tradeType: "buyTime" })
                }
                disabled={state.resources.money < 2}
                class="bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-75 text-gray-800 font-bold py-1 px-1 rounded-l"
              >
                Buy 🕑 2:1
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "tradeResources",
                    tradeType: "buyInfluence",
                  })
                }
                disabled={state.resources.money < 2}
                class="bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-75 text-gray-800 font-bold py-1 px-2 rounded-r"
              >
                Buy 🗣️ 2:1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

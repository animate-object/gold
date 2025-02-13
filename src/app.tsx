import "./app.css";
import { useGameQueue } from "./game/engine";
import { Season, GameState, CardId } from "./types";
import { getShuffledDecks } from "./cards/definitions";
import { useCallback, useEffect } from "preact/hooks";
import { initDebugTools } from "./debug";
import { _capitalize } from "./util";
import { canPurchaseCard } from "./game/cost";
import { Tableau } from "./components/board/Tableau";
import { DraftPanel } from "./components/board/DraftPanel";
import { GameTracker } from "./components/board/GameTracker";
import { FateDicePanel } from "./components/board/FateDice";

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
    time: 4,
    money: 1,
    influence: 1,
  },
  decks: getShuffledDecks(),
  discard: [],
  faceCardIds: ["empty", "empty", "empty"],
  gameConfiguration: {
    cardsDrawnPerTurn: 3,
    cardsDrawnOnFirstTurn: 2,
    allowNegativeResources: false,
    timeAtStartOfSeason: 3,
    fateDieFaces: 20,
    rollFateAtSeasonChange: true,
  },
  state: "playing",
};

export function App() {
  const { state, dispatch } = useGameQueue(EMPTY_GAME_STATE, { delayMs: 0 });

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

  const handleSelectCardToDraft = useCallback(
    (cardId: CardId | "empty") => {
      if (cardId === "empty") {
        console.warn("Empty card slot selected");
        return;
      }
      if (state.gameConfiguration.allowNegativeResources) {
        console.debug("Playing card", cardId);
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

  const handlePlayFortuneCard = useCallback(() => {
    dispatch({ type: "playFromFortuneDeck" });
  }, [state]);

  const handleBuyTime = useCallback(() => {
    dispatch({ type: "tradeResources", tradeType: "buyTime" });
  }, [state]);

  const handleBuyInfluence = useCallback(() => {
    dispatch({ type: "tradeResources", tradeType: "buyInfluence" });
  }, [state]);

  return (
    <div className="bg-slate-50 h-screen w-full m-0 absolute top-0">
      <div className="p-2 flex flex-wrap">
        <Tableau {...state} />
        <DraftPanel
          state={state}
          onDraftCard={handleSelectCardToDraft}
          onPlayFortuneCard={handlePlayFortuneCard}
        >
          <FateDicePanel
            onRoll={() =>
              dispatch({ type: "rollFateDice", roll: Math.random() })
            }
            state={state}
          />

          <GameTracker
            state={state}
            onBuyTime={handleBuyTime}
            onBuyInfluence={handleBuyInfluence}
          />
        </DraftPanel>
      </div>
    </div>
  );
}

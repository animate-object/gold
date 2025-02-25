import "./app.css";
import { useGameQueue } from "./game/engine";
import { Season, GameState, CardId } from "./types";
import { getShuffledDecks } from "./cards/definitions";
import { useCallback, useEffect } from "preact/hooks";
import { flagIsPresent, initDebugTools } from "./debug/debug";
import { _capitalize } from "./util";
import { canPurchaseCard } from "./game/cost";
import { Tableau } from "./components/board/Tableau";
import { DraftPanel } from "./components/board/DraftPanel";
import { GameTrackerWrapper } from "./components/board/GameTracker";
import { FateDicePanelWrapper } from "./components/board/FateDice";
import { chooseN } from "./utils/array";
import { NAMES } from "./data/names";
import { NarrativeTracker } from "./components/board/NarrativeTracker";

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
    displayCostRules: true,
  },
  state: "narrative.init",
  narrativeState: {
    nameOptions: chooseN(NAMES, 5),
    chosenName: "",
    chosenGender: "N",
    narrativeRecord: [],
    config: {
      presentTense: flagIsPresent("ivan-mode"),
    },
  },
};

export function Game() {
  const { state, dispatch } = useGameQueue(EMPTY_GAME_STATE, { delayMs: 0 });

  useEffect(() => {
    dispatch({ type: "draft" });
  }, []);

  useEffect(() => {
    initDebugTools({
      playCard: (cardId: number) => {
        dispatch({ type: "select", cardId });
      },
      gameState: state,
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
      <div className="flex">
        <NarrativeTracker
          state={state}
          onSelectNarrativeState={(name: string, gender: "M" | "F" | "N") => {
            dispatch({
              type: "selectNarrativeState",
              chosenName: name,
              chosenGender: gender,
            });
          }}
        />
        <div className="py-2 pe-2 flex flex-wrap flex-shrink">
          <Tableau {...state} />
          <DraftPanel
            state={state}
            onDraftCard={handleSelectCardToDraft}
            onPlayFortuneCard={handlePlayFortuneCard}
            slot2={
              <>
                <FateDicePanelWrapper
                  onRoll={() =>
                    dispatch({ type: "rollFateDice", roll: Math.random() })
                  }
                  state={state}
                />
                <GameTrackerWrapper
                  state={state}
                  onBuyTime={handleBuyTime}
                  onBuyInfluence={handleBuyInfluence}
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export function App() {
  if (flagIsPresent("icons")) {
    return <div>Icons map</div>;
  }

  return <Game />;
}

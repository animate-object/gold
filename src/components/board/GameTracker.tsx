import { useEffect, useMemo } from "preact/hooks";
import { Resource } from "../GameIcon";
import { GameState } from "../../types";
import { computeScore } from "../../game/selectors";
import { Tooltip } from "../Tooltip";

const READOUT_ICON_MAP = {
  time: Resource.Time,
  money: Resource.Money,
  influence: Resource.Influence,
};

const getReadoutLabelForKey = (key: string): React.ReactNode => {
  if (key in READOUT_ICON_MAP) {
    const El = READOUT_ICON_MAP[key as keyof typeof READOUT_ICON_MAP];
    return <El />;
  }
  return key;
};

interface Props {
  state: GameState;
  onBuyTime: () => void;
  onBuyInfluence: () => void;
}

export const GameTracker = ({ state, onBuyTime, onBuyInfluence }: Props) => {
  const displayTurn = state.turn + 1;

  const { treasures, regrets } = useMemo(() => {
    return computeScore(state);
  }, [state]);

  useEffect(() => {
    if (state.state.startsWith("finished")) {
      const summary = `In your final hours, you evaluated your life as follows:
          Treasures: ${treasures}
          Regrets: ${regrets}
          Score: ${treasures - regrets}
          `;

      alert("You're Dead!\n" + summary);
    }
  }, [state.state]);

  const readout = {
    time: state.resources.time,
    money: state.resources.money,
    influence: state.resources.influence,
    Treasures: treasures,
    Regrets: regrets,
    Turn: displayTurn,
    "Cards Played": state.cardsPlayed,
    State: state.state === "playing" ? "▶️" : "⏹️",
  };

  return (
    <div className="flex flex-col justify-between w-36 bg-slate-100 rounded-md p-1">
      <div>
        <h3 className="text-center text-sm mb-2">Game</h3>
        <div className="flex flex-wrap gap-2 text-sm  w-36">
          {Object.entries(readout).map(([key, value]) => (
            <div className="inline-flex items-center gap-1">
              <span className="font-semibold me-1">
                {getReadoutLabelForKey(key)}
              </span>
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="w-100 flex flex-col gap-2">
        <div className="inline-flex justify-center gap-2 text-sm w-100">
          Trade <Resource.Money /> 2:1
        </div>
        <div class="flex text-xs justify-center">
          <Tooltip content="Buy Time">
            <button
              onClick={onBuyTime}
              disabled={state.resources.money < 2}
              class="inline-flex gap-1 items-center bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-75 text-gray-800 font-bold py-1 px-1 rounded-l"
            >
              Buy <Resource.Time />
            </button>
          </Tooltip>
          <Tooltip content="Buy Influence">
            <button
              onClick={onBuyInfluence}
              disabled={state.resources.money < 2}
              class="inline-flex gap-1 items-center bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-75 text-gray-800 font-bold py-1 px-2 rounded-r"
            >
              Buy <Resource.Influence />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export const GameTrackerWrapper = ({ state, ...rest }: Props) => {
  const isSettingNarrative = state.state === "narrative.init";

  if (!isSettingNarrative) {
    return <GameTracker state={state} {...rest} />;
  }

  return <div className="w-36 bg-slate-100 rounded-md p-1" />;
};

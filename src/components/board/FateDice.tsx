import { useMemo } from "preact/hooks";
import { GameState } from "../../types";
import { describeActiveFateDie, isResourceChange } from "../../game/fate";
import { describeResourceChangesWithSubstitution } from "../../cards/ruleDescriptors";

interface Props {
  state: GameState;
  onRoll: () => void;
}

const Labels: Record<string, string> = {
  death: "Death",
  fortune: "Fortune card",
  resourceChange: "Resource ±",
  empty: "No effect",
};

const order = ["death", "fortune", "resourceChange", "empty"];

export const LastFateRoll = ({ state }: Pick<Props, "state">) => {
  let label: React.ReactNode;

  if (state.state === "playing.waitingForFateDice") {
    label = "It's time to roll the fate die";
  } else if (state.lastFateRoll === undefined) {
    label = "What does fate have in store?";
  } else if (isResourceChange(state.lastFateRoll.result)) {
    label = describeResourceChangesWithSubstitution(state.lastFateRoll.result);
  } else {
    label = Labels[state.lastFateRoll.result];
  }

  return (
    <div className="text-sm flex flex-col items-center justify-center text-center italic text-purple-400 px-2">
      <div>Last roll: </div>
      {label}
    </div>
  );
};

export const FateDicePanel = ({ state, onRoll }: Props) => {
  const { name, counts, sides } = useMemo(
    () => describeActiveFateDie(state),
    [state]
  );

  const waitingForFateRoll = state.state === "playing.waitingForFateDice";

  return (
    <div className="w-32 flex flex-col justify-between items-center bg-slate-600 rounded-md p-1">
      <div className="text-slate-100">
        <h3 className="text-center text-sm mb-2 text-purple-400">
          Fate Dice ({name})
        </h3>
        <div className="text-xs">
          <div className="flex flex-col gap-1 my-2  text-xs">
            {order.map((key) => (
              <div key={key} className="flex gap-1 justify-between">
                <span>{Labels[key]}</span>
                <span className="">
                  {counts[key]}/{sides}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LastFateRoll state={state} />

      <div className="flex flex-col items-center text-xs italic gap-2">
        <button
          onClick={onRoll}
          disabled={!waitingForFateRoll}
          class="w-fit text-xs inline-flex gap-1 items-center bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-75 text-gray-800 font-bold py-1 px-1 rounded"
        >
          Roll Fate {waitingForFateRoll}
        </button>
      </div>
    </div>
  );
};

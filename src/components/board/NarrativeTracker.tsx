import { useState } from "preact/hooks";
import { GameState } from "../../types";
import { capitalize } from "lodash";
import { Info } from "lucide-react";
import { Tooltip } from "../Tooltip";

interface Props {
  state: GameState;
  onSelectNarrativeState: (name: string, gender: "M" | "F" | "N") => void;
}

const GENDER_OPTIONS = ["F", "M", "N"] as const;

export const StateSelection = ({
  state: {
    narrativeState: { nameOptions },
  },
  onSelectNarrativeState,
}: Props) => {
  const [chosenName, setChosenName] = useState<string | undefined>();
  const [chosenGender, setChosenGender] = useState<
    "M" | "F" | "N" | undefined
  >();

  return (
    <div>
      <div className="text-sm flex flex-wrap gap-4 justify-evenly mt-8 mb-4 p-2">
        <div className="border-2 p-2 rounded-md">
          <div className="mb-2">Choose your name:</div>
          {/* Radio buttons */}
          <div className="flex flex-col gap-1">
            {nameOptions.map((name) => (
              <div key={name}>
                <input
                  className="mx-2"
                  type="radio"
                  name="name"
                  value={name}
                  onChange={() => setChosenName(name)}
                />
                {capitalize(name)}
              </div>
            ))}
          </div>
        </div>
        <div className="border-2 p-2 rounded-md">
          <div className="inline-flex gap-1 mb-2">
            Choose gender
            <Tooltip content="Used to determine pronouns in narrative text">
              <Info size="12" />
            </Tooltip>
          </div>

          <div className="flex flex-col gap-1">
            {GENDER_OPTIONS.map((g) => (
              <div key={g}>
                <input
                  className="mx-2"
                  type="radio"
                  value={chosenGender}
                  onChange={() => setChosenGender(g)}
                ></input>
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mt-4"
        onClick={() => {
          if (chosenName && chosenGender) {
            onSelectNarrativeState(capitalize(chosenName), chosenGender);
          }
        }}
        disabled={!chosenName || !chosenGender}
      >
        Begin
      </button>
    </div>
  );
};

export const Narrative = ({ state }: Pick<Props, "state">) => {
  return (
    <div>
      {state.narrativeState.narrativeRecord.map((record, index) => (
        <div key={index} className="text-sm">
          {record}
        </div>
      ))}
    </div>
  );
};

export const NarrativeTracker = ({ state, onSelectNarrativeState }: Props) => {
  const hasSelectedNarrativeState = state.narrativeState.chosenName !== "";

  return (
    <div className="w-full p-2 flex-grow flex-col">
      <div className="w-full flex gap-3 justify-center mb-2">
        <h2 className="text-sm inline-flex gap-2">Game of Life & Death</h2>
      </div>
      {!hasSelectedNarrativeState && (
        <StateSelection
          state={state}
          onSelectNarrativeState={onSelectNarrativeState}
        />
      )}

      {hasSelectedNarrativeState && (
        <div className="text-xl text-center">
          The life of {state.narrativeState.chosenName}
        </div>
      )}

      <Narrative state={state} />
    </div>
  );
};

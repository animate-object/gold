// Functionally this is just another branch of the reducer
// albeit a reasonably complex one

import {
  D20Faces,
  FateDieFace,
  ResourcePool,
  FateDieDefinition,
  GameState,
} from "../types";
import { QueueAugmentedState } from "../types/engine.types";
import { neverLessThanZero } from "../util";
import { replaceTemplateVariables } from "./narrative";
import { getCurrentSeason } from "./selectors";

const SPRING_FATE_DICE: FateDieDefinition = {
  1: "death",
  2: "fortune",
  3: "fortune",
  4: "fortune",
  5: "fortune",
  6: {
    money: -1,
    influence: -1,
    time: -1,
  },
  7: { time: -1 },
  8: { money: -2 },
  9: { influence: -1 },
  17: { time: 1 },
  18: { money: 2 },
  19: { influence: 1 },
  20: { time: 1, money: 1, influence: 1 },
};

const SUMMER_FATE_DICE: FateDieDefinition = {
  1: "death",
  2: "death",
  3: "fortune",
  4: "fortune",
  5: "fortune",
  6: {
    money: -1,
    influence: -1,
    time: -1,
  },
  7: { time: -1 },
  8: { money: -2 },
  9: { influence: -1 },
  17: { time: 1 },
  18: { money: 2 },
  19: { influence: 1 },
  20: { time: 1, money: 1, influence: 1 },
};

const FALL_FATE_DICE: FateDieDefinition = {
  1: "death",
  2: "death",
  3: "death",
  4: "fortune",
  5: "fortune",
  6: {
    money: -1,
    influence: -1,
    time: -1,
  },
  7: { time: -1 },
  8: { money: -2 },
  9: { influence: -1 },
  17: { time: 1 },
  18: { money: 2 },
  19: { influence: 1 },
  20: { time: 1, money: 1, influence: 1 },
};

const WINTER_FATE_DICE: FateDieDefinition = {
  1: "death",
  2: "death",
  3: "death",
  4: "death",
  5: "death",
  6: "death",
  7: "fortune",
  8: {
    money: -1,
    influence: -1,
    time: -1,
  },
  9: { time: -2 },
  10: { money: -3 },
  17: { time: 1 },
  18: { money: 2 },
  19: { influence: 1 },
  20: { time: 1, money: 1, influence: 1 },
};

export const getDieForCurrentSeason = (state: GameState): FateDieDefinition => {
  const currentSeason = getCurrentSeason(state);
  if (currentSeason === "spring") {
    return SPRING_FATE_DICE;
  }
  if (currentSeason === "summer") {
    return SUMMER_FATE_DICE;
  }
  if (currentSeason === "fall") {
    return FALL_FATE_DICE;
  }
  return WINTER_FATE_DICE;
};

export const fateForceDrawFromFortuneDeck = (
  state: QueueAugmentedState
): QueueAugmentedState => {
  return {
    ...state,
    queue: [
      ...state.queue,
      {
        type: "playFromFortuneDeck",
      },
    ],
  };
};

export const fateDeath = (state: QueueAugmentedState) => {
  return {
    ...state,
    state: "finished.early" as const,

    narrativeState: {
      ...state.narrativeState,
      narrativeRecord: [
        ...state.narrativeState.narrativeRecord,
        replaceTemplateVariables(
          "In a sad twist of fate, {{name}} met an untimely end.",
          state.narrativeState,
          {}
        ),
      ],
    },
  };
};

export const fateResourceChage = (
  state: QueueAugmentedState,
  resourceChange: Partial<ResourcePool>
) => {
  const currentResources = state.resources;

  const newResources = {
    money: neverLessThanZero(
      currentResources.money + (resourceChange.money ?? 0)
    ),
    influence: neverLessThanZero(
      currentResources.influence + (resourceChange.influence ?? 0)
    ),
    time: neverLessThanZero(currentResources.time + (resourceChange.time ?? 0)),
  };

  return {
    ...state,
    resources: newResources,
  };
};

export const isResourceChange = (
  fateResult: FateDieFace
): fateResult is Partial<ResourcePool> => {
  return typeof fateResult === "object";
};

export const rollFateDice = (
  state: QueueAugmentedState,
  // randomness has to come from outside the reducer
  // to preserve determinism
  roll: number
): QueueAugmentedState => {
  const dieFace = Math.ceil(roll * 20) as D20Faces;
  const fateDie = getDieForCurrentSeason(state);
  const fateResult = fateDie[dieFace] ?? "empty";

  console.info(`You rolled a ${dieFace} on the fate die`);

  let updatedState: QueueAugmentedState;

  if (fateResult === "death") {
    updatedState = fateDeath(state);
  } else if (fateResult === "fortune") {
    updatedState = fateForceDrawFromFortuneDeck({ ...state, state: "playing" });
  } else if (isResourceChange(fateResult)) {
    updatedState = fateResourceChage(state, fateResult);
  } else {
    updatedState = { ...state };
  }

  return {
    ...updatedState,
    lastFateRoll: {
      roll: dieFace,
      result: fateResult,
    },
    state:
      updatedState.state === "playing.waitingForFateDice"
        ? "playing"
        : updatedState.state,
  };
};

interface DiceDescriptor {
  name: string;
  counts: Record<string, number>;
  sides: number;
}

export const describeDice = (
  name: string,
  sides: number,
  dice: FateDieDefinition
) => {
  const nonEmptyFaces: number = Object.keys(dice).length;
  const emptyFaces: number = sides - nonEmptyFaces;

  const counts: Record<string, number> = {
    empty: emptyFaces,
  };
  Object.entries(dice).forEach(([_key, value]) => {
    if (isResourceChange(value)) {
      counts["resourceChange"] = (counts["resourceChange"] ?? 0) + 1;
    }
    if (value === "death") {
      counts["death"] = (counts["death"] ?? 0) + 1;
    }
    if (value === "fortune") {
      counts["fortune"] = (counts["fortune"] ?? 0) + 1;
    }
  });

  return {
    name,
    counts,
    sides,
  };
};

export const describeActiveFateDie = (state: GameState): DiceDescriptor => {
  const currentSeason = getCurrentSeason(state);
  const fateDie = getDieForCurrentSeason(state);
  return describeDice(currentSeason, 20, fateDie);
};

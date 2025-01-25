// might be best to think of the engine as, essentially, a reducer

import { useCallback, useEffect, useReducer } from "preact/hooks";
import { GameState } from "../types";
import { QueueAugmentedState } from "../types/engine.types";
import { GameAction } from "../types/action.types";
import { gameEngineReducer } from "./reducer";

interface HookOpts {
  delayMs?: number;
}

export const useGameQueue = (
  initialState: GameState,
  opts: HookOpts
): {
  state: GameState;
  dispatch: (action: GameAction) => void;
} => {
  const stateWithQueue = { ...initialState, queue: [] };

  const [state, dispatch] = useReducer<QueueAugmentedState, GameAction>(
    gameEngineReducer,
    stateWithQueue
  );

  const processNextAction = useCallback(() => {
    if (state.queue.length > 0) {
      const nextAction = state.queue[0];
      setTimeout(() => {
        console.log("Processing next action", nextAction);
        dispatch(nextAction);
      }, opts.delayMs ?? 0);
    }
  }, [state.queue]);

  useEffect(() => {
    processNextAction();
  }, [state.queue, processNextAction]);

  return { state, dispatch };
};

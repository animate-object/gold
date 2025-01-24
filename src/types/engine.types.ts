import type { GameAction } from "./action.types";
import type { GameState } from "./game.types";

export type QueueAugmentedState = GameState & {
  queue: GameAction[];
};

import { Deck, DraftCard } from "../../cards/Card";
import { getCurrentDeck, getCurrentSeason } from "../../game/selectors";
import { CardSlot, GameState } from "../../types";
import { _capitalize } from "../../util";
import { CardCost } from "./CardCost";

interface Props {
  state: GameState;
  onDraftCard: (cardId: CardSlot) => void;
  children: React.ReactNode;
}

export const DraftPanel = ({ state, onDraftCard, children }: Props) => {
  const currentDeck = getCurrentDeck(state);
  const currentSeason = getCurrentSeason(state);

  return (
    <div className="flex gap-3 bg-gray-200 p-2 rounded-md mt-2">
      <Deck variant={"discard"} label={`Discard (${state.discard.length})`} />
      <Deck
        variant={currentDeck}
        label={`Deck of ${_capitalize(currentDeck)}`}
      />
      {state.faceCardIds.map((cardId) => (
        <div className="flex flex-col gap-2 justify-center items-center">
          <DraftCard cardId={cardId} onClick={() => onDraftCard(cardId)} />
          {cardId !== "empty" && <CardCost gameState={state} cardId={cardId} />}
        </div>
      ))}
      <Deck variant="fortunes" label={`Fortunes of ${currentSeason}`} />

      {children}
    </div>
  );
};

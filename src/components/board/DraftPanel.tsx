import { Deck, DraftCard } from "../../cards/Card";
import { getCurrentDeck, getCurrentSeason } from "../../game/selectors";
import { CardSlot, GameState } from "../../types";
import { _capitalize } from "../../util";
import { CardCost, CostDisplay } from "./CardCost";

interface Props {
  state: GameState;
  children: React.ReactNode;
  onDraftCard: (cardId: CardSlot) => void;
  onPlayFortuneCard: () => void;
}

const FortuneDeck = ({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) => {
  return (
    <>
      {active ? (
        <Deck variant="fortunesSpring" label={label} onClick={onClick} />
      ) : (
        <Deck variant="discard" label="" />
      )}
    </>
  );
};

interface LabeledCardsProps {
  label: string;
  children: React.ReactNode;
  bottomContent?: React.ReactNode;
}
export const LabeledCards = ({
  label,
  children,
  bottomContent,
}: LabeledCardsProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="italic text-sm">{label}</div>
      {children}
      {bottomContent ?? <div className="h-4" />}
    </div>
  );
};

export const DraftPanel = ({
  state,
  children,
  onDraftCard,
  onPlayFortuneCard,
}: Props) => {
  const currentDeck = getCurrentDeck(state);
  const currentSeason = getCurrentSeason(state);
  const { cardsDrawnPerTurn } = state.gameConfiguration;

  return (
    <div className="flex gap-3 bg-gray-200 p-2 rounded-md mt-2">
      <LabeledCards label="Discard">
        <Deck variant="discard" label={`Discard (${state.discard.length})`} />
      </LabeledCards>
      <LabeledCards label="Active">
        <Deck
          variant={currentDeck}
          label={`Deck of ${_capitalize(currentDeck)}`}
        />
      </LabeledCards>
      {Array.from({ length: cardsDrawnPerTurn }).map((_, idx) => {
        const cardId = state.faceCardIds[idx] ?? "empty";
        return (
          <LabeledCards
            key={idx}
            label={`${idx + 1}`}
            bottomContent={
              cardId !== "empty" ? (
                <CardCost gameState={state} cardId={cardId} />
              ) : undefined
            }
          >
            <DraftCard cardId={cardId} onClick={() => onDraftCard(cardId)} />
          </LabeledCards>
        );
      })}
      <LabeledCards
        label="Fortunes"
        bottomContent={<CostDisplay time={0} money={0} influence={0} />}
      >
        <FortuneDeck
          active={currentDeck !== "beginnings"}
          onClick={onPlayFortuneCard}
          label={`Fortunes of ${_capitalize(currentSeason)}`}
        />
      </LabeledCards>
      {children}
    </div>
  );
};

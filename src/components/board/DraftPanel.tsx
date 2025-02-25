import { Deck, DraftCard, EmptyCard } from "../../cards/Card";
import { getCurrentDeck, getCurrentSeason } from "../../game/selectors";
import { CardSlot, DisplayableDecks, GameState } from "../../types";
import { _capitalize } from "../../util";
import { CardCost, CostDisplay } from "./CardCost";

interface Props {
  state: GameState;
  slot1?: React.ReactNode;
  slot2?: React.ReactNode;
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
      <div className="italic text-sm h-4">{label}</div>
      {children}
      {bottomContent ?? <div className="h-4" />}
    </div>
  );
};

export const InPlayDraftPanel = ({
  state,
  onDraftCard,
  onPlayFortuneCard,
}: Omit<Props, "slot1" | "slot2">) => {
  const currentDeck = getCurrentDeck(state);
  const currentSeason = getCurrentSeason(state);
  const { cardsDrawnPerTurn } = state.gameConfiguration;

  return (
    <>
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
            <DraftCard
              cardId={cardId}
              onClick={() => onDraftCard(cardId)}
              displayCostRules={state.gameConfiguration.displayCostRules}
            />
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
    </>
  );
};

export const PreAndPostGameDraftPanel = ({ state }: Pick<Props, "state">) => {
  const cardsDrawnPerTurn = state.gameConfiguration.cardsDrawnPerTurn;

  return (
    <>
      {Array.from({ length: cardsDrawnPerTurn + 3 }).map((_, idx) => {
        return (
          <LabeledCards label="">
            <EmptyCard />
          </LabeledCards>
        );
      })}
    </>
  );
};

export const DraftPanel = ({
  state,
  slot1,
  slot2,
  onDraftCard,
  onPlayFortuneCard,
}: Props) => {
  const playState = state.state;
  return (
    <div className="flex gap-3 bg-gray-200 p-2 rounded-md mt-2">
      {slot1}
      {playState.startsWith("playing") && (
        <InPlayDraftPanel
          state={state}
          onDraftCard={onDraftCard}
          onPlayFortuneCard={onPlayFortuneCard}
        />
      )}
      {!playState.startsWith("playing") && (
        <PreAndPostGameDraftPanel state={state} />
      )}
      {slot2}
    </div>
  );
};

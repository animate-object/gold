import type { CardId, Deck } from "../types";

interface Draw {
  drawn: CardId[];
  deck: Deck;
}

/**
 * We assume the deck is pre-shuffled at game init. Any other option
 * will compromise determinism in the game reducer.
 * @param preShuffledDeck
 * @param count
 * @returns
 */
export const drawCards = (preShuffledDeck: Deck, count: number): Draw => {
  const amountToDraw = Math.min(count, preShuffledDeck.cards.length);
  if (amountToDraw < count) {
    console.warn("Not enough cards in deck");
    throw new Error("Not enough cards in deck");
  }

  const drawn = preShuffledDeck.cards.slice(-amountToDraw);
  const deck = {
    ...preShuffledDeck,
    cards: preShuffledDeck.cards.slice(0, -amountToDraw),
    drawn: [...preShuffledDeck.drawn, ...drawn],
  };

  return { drawn, deck };
};

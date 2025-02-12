# Game of Life and Death

> I have the nature grow old<br>
> I have the nature get sick<br>
> I have the nature die<br>
> I have the nature to be separated from the ones I love<br>
> I own only my actions<br>
> So how then should I live?

A simple card drafting RPG. One is faced, in every season of life, with finite choices and limited resources. Along the way one gathers treasures: grand accomplishments, memories, and deep relationships. When the bell tolls (no one knows when), one hopes to find more treasures than regrets.

## Development notes

### To Do

- foundation: design rules for all basic cards
  - in spring
  - in summer
  - in fall
  - in winter
  - fortune deck
- mechanic: wildcard resource costs(?)
- ui: polish
- ui: card art
- ui: make game end more 'fun'
- gamedev: play testing and refinement

### In progress

- mechanic: mistakes/fortunes
- mechanic: fate dice

### Done

- foundation: game end
- ui: basic WIP display
- ui: start rule description system
- foundation: design and implement recurring rules
- foundation: enter basic card information for initial deck
- bug: fix replacement rule mechanic
- foundation: wire in rule engine
- mechanic: beginnings deck
- bug: fix recurring resource rules 
  - (repro steps: older sibling, two matches in spring)
- foundation: decouple current turn from next spot in tableau
  - e.g., replacement card should increment turn but not break placement rules
- foundation: base cost, card cost rules, and draft cost rules
- foundation: resources and card costs
  - done when:
    - playing card draws resources from pool
    - we can detect when you can't buy a card
- foundation: resource exchange
- mechanic: cards that change draft cost
- ui: rule description for cost
- ui: rule description for draft-cost
- foundation: scoring
- ui: rule description for scoring
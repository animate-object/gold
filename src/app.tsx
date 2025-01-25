import "./app.css";
import { Card } from "./cards/Card";
import { Card as CardT, Tags, Season } from "./types";

const DemoCard: CardT[] = [
  {
    id: 1,
    name: "Family Dog",
    season: Season.Spring,
    tags: [Tags.friend, Tags.sunshine],
    rules: [],
  },
  {
    id: 2,
    name: "Drinking Buddies",
    season: Season.Summer,
    tags: [Tags.friend],
    rules: [],
  },
  {
    id: 3,
    name: "Jam Band",
    season: Season.Fall,
    tags: [Tags.creative, Tags.community],
    rules: [],
  },
  {
    id: 4,
    name: "Solace",
    season: Season.Winter,
    tags: [Tags.faith],
    rules: [],
  },
];

export function App() {
  return (
    <div className="bg-slate-50 h-screen w-full m-0 absolute top-0">
      <div className="flex flex-wrap gap-1">
        {DemoCard.map((card) => (
          <Card card={card} />
        ))}
      </div>
    </div>
  );
}

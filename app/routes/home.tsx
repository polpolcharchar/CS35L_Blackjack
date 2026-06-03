import type { Route } from "./+types/home";
import BlackjackGame from "../BlackjackGame.jsx";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Blackjack" },
    { name: "description", content: "Play Blackjack!" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="gamePage">
        <BlackjackGame />
      </div>
    </>
  );
}

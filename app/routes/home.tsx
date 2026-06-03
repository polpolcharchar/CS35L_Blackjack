import type { Route } from "./+types/home";
import NavigationBar from "../NavigationBar.jsx";
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
      <NavigationBar />
      <div className="gamePage">
        <BlackjackGame />
      </div>
    </>
  );
}

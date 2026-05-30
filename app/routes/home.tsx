import type { Route } from "./+types/home";
import BlackjackGame from "../BlackjackGame.jsx";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CS35L Blackjack" },
    {
      name: "description",
      content: "A competitive web version of Blackjack with shared levels.",
    },
  ];
}

export default function Home() {
  return <BlackjackGame />;
}

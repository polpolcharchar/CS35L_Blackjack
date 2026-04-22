import type { Route } from "./+types/home";
import PlayingCard from "../PlayingCard.jsx";
import BlackjackInterface from "../BlackjackInterface.jsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  
  <>
  
  <PlayingCard rank="1" suit="h" faceup="true"/>
  <BlackjackInterface/>
  </>
  );
}

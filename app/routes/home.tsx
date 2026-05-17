import { useEffect } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CS35L Blackjack" },
    {
      name: "description",
      content: "A competitive web version of Blackjack with shared levels.",
    },
  ];
}

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => console.log("API DATA:", data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <main className="min-h-screen bg-green-950 text-white">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
            CS35L Team Project
          </p>
          <h1 className="mt-3 text-4xl font-bold">Blackjack</h1>
          <p className="mt-4 max-w-2xl text-lg text-green-100">
            Play the same deck order as other players, save your money after a
            set number of rounds, and compare scores on the leaderboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded border border-green-700 bg-green-900 p-4">
            <h2 className="text-sm font-semibold text-green-200">
              Current Money
            </h2>
            <p className="mt-2 text-2xl font-bold">$1000</p>
          </div>
          <div className="rounded border border-green-700 bg-green-900 p-4">
            <h2 className="text-sm font-semibold text-green-200">
              Rounds Left
            </h2>
            <p className="mt-2 text-2xl font-bold">10</p>
          </div>
          <div className="rounded border border-green-700 bg-green-900 p-4">
            <h2 className="text-sm font-semibold text-green-200">
              Leaderboard
            </h2>
            <p className="mt-2 text-sm text-green-100">Coming soon</p>
          </div>
        </div>

        <button
          className="w-fit rounded bg-white px-5 py-3 font-semibold text-green-950"
          type="button"
        >
          Start Level 1
        </button>
      </section>
    </main>
  );
}
import { useEffect, useState } from "react";

type ScoreRecord = {
  _id: string;
  username: string;
  score: number;
  level: number;
};

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [level, setLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setErrorMessage("");

    fetch(`http://localhost:5000/scores/top?level=${level}&limit=10`, {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load leaderboard");
        }

        return res.json();
      })
      .then((data) => {
        setScores(data.scores ?? []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setErrorMessage(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [level]);

  return (
    <main className="min-h-screen bg-green-950 text-white">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
            CS35L Team Project
          </p>
          <h1 className="mt-3 text-4xl font-bold">Leaderboard</h1>
        </div>

        <label className="flex w-fit flex-col gap-2 text-sm font-semibold text-green-100">
          Level
          <select
            className="rounded border border-green-700 bg-green-900 px-3 py-2 text-white"
            value={level}
            onChange={(event) => setLevel(Number(event.target.value))}
          >
            <option value={0}>Random</option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Level {index + 1}
              </option>
            ))}
          </select>
        </label>

        <div>
          <p className="text-lg text-green-100">Top 10 Players</p>
          <div className="mt-2 flex flex-col gap-3">
            {isLoading && (
              <p className="rounded border border-green-700 bg-green-900 p-3 text-green-100">
                Loading scores...
              </p>
            )}

            {!isLoading && errorMessage && (
              <p className="rounded border border-red-400 bg-red-950 p-3 text-red-100">
                {errorMessage}
              </p>
            )}

            {!isLoading && !errorMessage && scores.length === 0 && (
              <p className="rounded border border-green-700 bg-green-900 p-3 text-green-100">
                No scores have been submitted for this level yet.
              </p>
            )}

            {!isLoading && !errorMessage && scores.map((player, index) => (
              <div
                key={player._id}
                className="flex items-center justify-between rounded border border-green-700 bg-green-900 p-3"
              >
                <p className="font-semibold text-green-200">
                  <span className="inline-block w-12">#{index + 1}</span>
                  {player.username}
                </p>
                <p className="text-green-100">${player.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

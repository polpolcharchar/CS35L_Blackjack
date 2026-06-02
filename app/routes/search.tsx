import { useEffect, useState } from "react";

type ScoreRecord = {
  _id: string;
  username: string;
  score: number;
  level: number;
};

export default function Search() {
  const [search, setSearch] = useState("");
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const query = search.trim();

    if (query.length === 0) {
      setScores([]);
      setErrorMessage("");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      setIsLoading(true);
      setErrorMessage("");

      fetch(`http://localhost:5000/scores/search?username=${encodeURIComponent(query)}&limit=20`, {
        signal: controller.signal
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error ?? "Unable to search players");
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
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  return (
    <main className="min-h-screen bg-green-950 text-white">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
            CS35L Team Project
          </p>
          <h1 className="mt-3 text-4xl font-bold">Search Players</h1>
        </div>

        <input
          type="text"
          placeholder="Enter username here to search."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded border border-green-700 bg-green-900 px-4 py-2 text-white placeholder-green-400"
        />

        <div className="flex flex-col gap-3">
          {search.trim().length === 0 && (
            <p className="rounded border border-green-700 bg-green-900 p-3 text-green-100">
              Enter a username to search submitted scores.
            </p>
          )}

          {isLoading && (
            <p className="rounded border border-green-700 bg-green-900 p-3 text-green-100">
              Searching players...
            </p>
          )}

          {!isLoading && errorMessage && (
            <p className="rounded border border-red-400 bg-red-950 p-3 text-red-100">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && search.trim().length > 0 && scores.length === 0 && (
            <p className="rounded border border-green-700 bg-green-900 p-3 text-green-100">
              No submitted scores match that username.
            </p>
          )}

          {!isLoading && !errorMessage && scores.map((player) => (
            <div
              key={player._id}
              className="flex items-center justify-between rounded border border-green-700 bg-green-900 p-3"
            >
              <div>
                <p className="font-semibold text-green-200">{player.username}</p>
                <p className="text-sm text-green-100">
                  {player.level === 0 ? "Random" : `Level ${player.level}`}
                </p>
              </div>
              <p className="font-semibold text-green-100">${player.score}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

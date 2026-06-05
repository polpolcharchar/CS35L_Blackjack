import { useEffect, useState } from "react";

type ScoreRecord = {
  _id: string;
  username: string;
  score: number;
  level: number;
};

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [level, setLevel] = useState(0); // 0 = Random
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setErrorMessage("");

    fetch(`http://localhost:5000/scores/top?level=${level}&limit=10`, {
      signal: controller.signal
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Unable to load leaderboard");
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
    <div className="tableLayout">
      <div className="uiCard">
        <div className="tableTitle">Leaderboard</div>

        <hr className="feltDivider" />

        <div className="inputSection">
          <span className="sectionLabel">Level</span>
          <select
            className="uiInput"
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
        </div>

        <hr className="feltDivider" />

        <p className="sectionLabel">Top 10 Players</p>

        <div className="flex flex-col gap-3 mt-2">
          {isLoading && (
            <p className="statChip">Loading scores...</p>
          )}

          {!isLoading && errorMessage && (
            <p className="rounded border border-red-400 bg-red-950 p-3 text-red-100">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && scores.length === 0 && (
            <p className="statChip">No scores submitted for this level yet.</p>
          )}

          {!isLoading && !errorMessage && scores.map((player, index) => (
            <div key={player._id} className="statChip" style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <p className="statLabel">
                <span className="inline-block w-12">#{index + 1}</span>
                {player.username}
              </p>
              <p className="statValue">${player.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
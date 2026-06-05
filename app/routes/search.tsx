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
    <div className="tableLayout">
      <div className="uiCard">
        <div className="tableTitle">Search Players</div>

        <hr className="feltDivider" />

        <div className="inputSection">
          <span className="sectionLabel">Username</span>
          <input
            type="text"
            placeholder="Enter username to search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="uiInput"
            id="playerSearchInput"
          />
        </div>

        <hr className="feltDivider" />

        <div className="flex flex-col gap-3">
          {search.trim().length === 0 && (
            <p className="statChip">Enter a username to search submitted scores.</p>
          )}

          {isLoading && (
            <p className="statChip">Searching players...</p>
          )}

          {!isLoading && errorMessage && (
            <p className="rounded border border-red-400 bg-red-950 p-3 text-red-100">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && search.trim().length > 0 && scores.length === 0 && (
            <p className="statChip">No submitted scores match that username.</p>
          )}

          {!isLoading && !errorMessage && scores.map((player) => (
            <div key={player._id} className="statChip" style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <div>
                <p className="statLabel">{player.username}</p>
                <p className="statValue" style={{ fontSize: "12px" }}>
                  {player.level === 0 ? "Random" : `Level ${player.level}`}
                </p>
              </div>
              <p className="statValue">${player.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
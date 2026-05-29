{/*import { useState, useEffect } from "react";<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

const examplePlayers = [
  { id: 1, username: "Player1", score: 1000 },
  { id: 2, username: "Player2", score: 1200 },
  { id: 3, username: "P3", score: 1600 },
  { id: 4, username: "4", score: 2000 },
  { id: 5, username: "5Player", score: 4000 },
];

const myRank = { rank: 52, username: "Me", score: 700 }; {/* change this later <<<<<<<<<<<<<<<<<<<<<<<<< */}

export default function Leaderboard() {
{/*
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    fetch("link from db") <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      .then(res => res.json())
      .then(data => setPlayerList(data));
  }, []);
*/}

  return (
    <main className="min-h-screen bg-green-950 text-white">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
            CS35L Team Project
          </p>
          <h1 className="mt-3 text-4xl font-bold">Leaderboard</h1>
        </div>

        <div>
          <p className="text-lg text-green-100">My Rank</p>
          <div className="mt-2 flex items-center justify-between rounded border border-green-400 bg-green-800 p-3">
            <p className="font-semibold text-white">
              <span className="inline-block w-12">#{myRank.rank}</span>
              {myRank.username}
            </p>
            <p className="text-green-100">${myRank.score}</p>
          </div>
        </div>

        <div>
          <p className="text-lg text-green-100">Top 10 Players</p>
          <div className="mt-2 flex flex-col gap-3">
            {/* TODO: replace rank numbers with poker card images once blackjack-card-images branch is merged */}
            {examplePlayers.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between rounded border border-green-700 bg-green-900 p-3">
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
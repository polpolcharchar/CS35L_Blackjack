import { useState, useEffect } from "react";

const examplePlayers = [
  { id: 1, username: "Player1", score: 1000 },
  { id: 2, username: "Player2", score: 1200 },
  { id: 3, username: "P3", score: 1600 },
  { id: 4, username: "4", score: 2000 },
  { id: 5, username: "5Player", score: 4000 },
];

export default function Search() {
  const [search, setSearch] = useState("");


  
  {/*
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
      fetch("link from db") <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
          <h1 className="mt-3 text-4xl font-bold">Search Players</h1>
        </div>

        <input
          type="text"
          placeholder="Enter username here to search."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded border border-green-700 bg-green-900 px-4 py-2 text-white placeholder-green-400"
        />

        <div className="flex flex-col gap-3">
          {examplePlayers.filter(player => player.username.includes(search)).map(player => (
            <div key={player.id} className="flex items-center justify-between rounded border border-green-700 bg-green-900 p-3">
              <button className="font-semibold text-green-200">
                {player.username}
              </button>
              <button className="rounded bg-white px-4 py-2 font-semibold text-green-950">
                Follow
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
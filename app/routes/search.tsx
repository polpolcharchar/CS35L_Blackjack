{/*import { useState, useEffect } from "react";<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

export default function Search() {
  return (
    <main className="min-h-screen bg-green-950 text-white">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-200">
            CS35L Team Project
          </p>
          <h1 className="mt-3 text-4xl font-bold">Search Players</h1>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by username..."
            className="rounded border border-green-700 bg-green-900 px-4 py-2 text-white placeholder-green-400"
          />
          <button className="rounded bg-white px-4 py-2 font-semibold text-green-950">
            Search
          </button>
        </div>

      </section>
    </main>
  );
}
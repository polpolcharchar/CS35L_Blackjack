# CS35L Blackjack

A full-stack Blackjack web app for our CS35L group project. Users can play Blackjack with betting, level-based deck orders, local best-run tracking, authenticated score submission, leaderboard browsing, and server-backed score search.

## Tech Stack

- React Router, React, TypeScript, Vite, and Tailwind CSS for the frontend
- Express for the backend API
- MongoDB with Mongoose for score storage
- Token-based in-memory sessions for basic authentication

## Features

- Play Blackjack with Deal, Hit, Stand, Reset, Add Bet, and Clear Bet actions.
- Choose Random mode or Levels 1-10 with fixed deck orders.
- Log in with a player name and PIN before submitting scores.
- Automatically submit a completed 10-hand run to the backend.
- View top scores by level on the leaderboard.
- Search submitted scores by username.
- See local best-run progress for the selected mode/level.

## Prerequisites

- Node.js and npm
- MongoDB, either local MongoDB or a MongoDB Atlas connection string

## Environment Variables

Create a file named `server/.env`. Do not commit this file.

For local MongoDB:
https://www.mongodb.com/try/download/community
```env
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB_NAME=blackjack
```

For MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net
MONGO_DB_NAME=blackjack
```

The repository includes `server/.env.example` as a template.

If `MONGO_URI` is missing, the backend will still start and login will work, but score submission, leaderboard, and search will return `Database is not connected`.

## Install

From the repository root:
```bash
npm install
```

## Run Locally

Recommended during development: run the backend and frontend in separate terminals so server errors are easy to see.

Backend:

```bash
cd server
npm run dev
```

Expected successful database startup:

```text
MongoDB connected
Created models
Server running on port 5000
```

Frontend, from the repository root:

```bash
npm.cmd run dev
```

Open:

```text
http://localhost:5173
```

The backend API runs on:

```text
http://localhost:5000
```

## App Startup

1. Open `http://localhost:5173`.
2. Enter a player name.
3. Enter a PIN with at least 4 characters.
4. Click Log In.
5. Play 10 Blackjack hands.
6. After the 10th hand, the app submits the score to the backend.
7. Use the navigation bar to visit Leaderboard or Search.

## API Routes

- `GET /api/test`: backend health check.
- `POST /auth/login`: logs in with `{ "username": "...", "pin": "...." }` and returns a token.
- `POST /auth/logout`: logs out the current token.
- `POST /postScore`: protected route that saves the authenticated user's score.
- `GET /scores/top?level=0&limit=10`: returns top scores for a level.
- `GET /scores/search?username=ryan&limit=20`: searches submitted scores by username.

## Notes

- `server/.env` is ignored by git because it may contain secrets.
- `server/*.log` files are ignored because they are local debugging output.
- Sessions are stored in memory, so logging in again is required after the backend restarts.
- Scores only appear on Leaderboard and Search after MongoDB is connected and a completed 10-hand run has been submitted.

## Architecture Diagrams

### System Architecture

This diagram shows the main frontend, backend, and database pieces. The React Router app renders the game, leaderboard, and search pages. The Blackjack game page owns the card, betting, score, authentication, and level state, while `BlackjackInterface.jsx` renders the controls and card areas. Backend requests go to the Express server, which stores login sessions in memory and persists submitted scores in MongoDB through the database module.

```mermaid
flowchart LR
  Browser[Browser]

  subgraph Frontend[React Router Frontend]
    Routes[app/routes.ts]
    Home[Home Route]
    BlackjackGame[BlackjackGame.jsx]
    BlackjackInterface[BlackjackInterface.jsx]
    PlayingCards[PlayingCardHand.jsx and PlayingCard.jsx]
    Leaderboard[Leaderboard Route]
    Search[Search Route]
  end

  subgraph Backend[Express Backend]
    Server[server/index.js]
    Sessions[In-memory sessions]
    DatabaseModule[server/db.js]
  end

  MongoDB[(MongoDB Scores Collection)]

  Browser --> Routes
  Routes --> Home
  Routes --> Leaderboard
  Routes --> Search
  Home --> BlackjackGame
  BlackjackGame --> BlackjackInterface
  BlackjackInterface --> PlayingCards

  BlackjackGame -->|POST /auth/login, /auth/logout, /postScore| Server
  Leaderboard -->|GET /scores/top| Server
  Search -->|GET /scores/search| Server

  Server --> Sessions
  Server --> DatabaseModule
  DatabaseModule --> MongoDB
```

### Blackjack Game Flow

This diagram shows the main state transitions for one run of the game. A player logs in, selects Random mode or a fixed level deck, places a bet, deals, and then chooses Hit or Stand. `BlackjackGame.jsx` evaluates the hand, updates score and best-run state, and submits the score after 10 hands.

```mermaid
stateDiagram-v2
  [*] --> Login
  Login --> SelectMode: successful login
  SelectMode --> ReadyToDeal: Random or Level 1-10 selected
  ReadyToDeal --> ReadyToDeal: Add Bet or Clear Bet
  ReadyToDeal --> PlayerTurn: Deal
  PlayerTurn --> PlayerTurn: Hit and player total <= 21
  PlayerTurn --> RoundOver: Hit and player busts
  PlayerTurn --> DealerTurn: Stand
  DealerTurn --> DealerTurn: dealer draws below 17
  DealerTurn --> RoundOver: dealer stands, busts, wins, loses, or draws
  RoundOver --> ReadyToDeal: fewer than 10 hands played
  RoundOver --> SubmitScore: 10 hands completed
  SubmitScore --> RunFinished: POST /postScore
  RunFinished --> ReadyToDeal: Reset
  ReadyToDeal --> SelectMode: Random or Levels button
```

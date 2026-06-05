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

```text
Browser
  |
  v
React Router frontend
  |
  +-- Home page
  |     |
  |     v
  |   BlackjackGame.jsx
  |     |
  |     v
  |   BlackjackInterface.jsx
  |     |
  |     v
  |   PlayingCardHand.jsx / PlayingCard.jsx
  |
  +-- Leaderboard page
  |
  +-- Search page

Frontend API requests
  |
  v
Express server: server/index.js
  |
  +-- In-memory login sessions
  |
  v
Database module: server/db.js
  |
  v
MongoDB scores collection
```

### Blackjack Game Flow

```text
Log in
  |
  v
Choose Random mode or Level 1-10
  |
  v
Place or clear bet
  |
  v
Deal cards
  |
  v
Player turn
  |
  +-- Hit
  |     |
  |     +-- Safe total --> Player turn
  |     |
  |     +-- Bust -------> Round over
  |
  +-- Stand
        |
        v
Dealer turn
        |
        v
Round over
        |
        v
Update score and hands played
        |
        +-- Fewer than 10 hands --> Deal next hand
        |
        +-- 10 hands completed --> Submit score to backend
                                      |
                                      v
                                    Reset to play again
```

# CS35L Blackjack

A full-stack Blackjack web app for the CS35L group project. Users can play Blackjack with betting, level-based deck orders, local best-run tracking, authenticated score submission, leaderboard browsing, and server-backed score search.

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
npm.cmd install
```

On macOS/Linux, use `npm` instead of `npm.cmd`.

## Run Locally

Recommended during development: run the backend and frontend in separate terminals so server errors are easy to see.

Backend:

```bash
cd server
npm.cmd run dev
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

## App Flow

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

## Tests And Checks

Typecheck:

```bash
npm.cmd run typecheck
```

Production build:

```bash
npm.cmd run build
```

Automated end-to-end tests are still TODO. The project requirement is 2+ E2E tests, so the next planned test work is to add Playwright tests for:

- Blackjack login/play interaction.
- Leaderboard/search data flow after score submission.

## Architecture Diagram

```mermaid
flowchart LR
  User[User Browser] --> Frontend[React Router Frontend<br/>localhost:5173]
  Frontend --> API[Express API<br/>localhost:5000]
  API --> Sessions[In-memory auth sessions]
  API --> Mongo[(MongoDB<br/>scores collection)]
```

The browser renders the Blackjack game, leaderboard, and search pages. The frontend sends login and score requests to Express. Express keeps short-lived auth tokens in memory and stores score records in MongoDB.

## Score Submission Flow

```mermaid
sequenceDiagram
  participant U as User
  participant F as Frontend
  participant A as Express API
  participant D as MongoDB

  U->>F: Enter player name and PIN
  F->>A: POST /auth/login
  A-->>F: token and username
  U->>F: Finish 10 hands
  F->>A: POST /postScore with Bearer token
  A->>A: Validate token, score, and level
  A->>D: Save score
  D-->>A: Saved score record
  A-->>F: 201 Created
  F-->>U: Score submitted
```

Scores only appear on Leaderboard and Search after MongoDB is connected and a completed 10-hand run has been submitted.

## Notes

- `server/.env` is ignored by git because it may contain secrets.
- `server/*.log` files are ignored because they are local debugging output.
- Sessions are stored in memory, so logging in again is required after the backend restarts.

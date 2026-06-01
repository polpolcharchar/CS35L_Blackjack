import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import crypto from "crypto";
import * as DatabaseModule from "./db.js";

dotenv.config();

const app = express();
const sessions = new Map();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

const start = async () => {
  await DatabaseModule.connectDB();

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

// test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected" });
});

const authenticate = (req, res, next) => {
  const authHeader = req.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const session = sessions.get(token);

  if (!session) {
    return res.status(401).json({ error: "Authentication required" });
  }

  req.user = session;
  return next();
};

app.post("/auth/login", (req, res) => {
  const { username, pin } = req.body;

  if (typeof username !== "string" || username.trim().length === 0) {
    return res.status(400).json({ error: "username is required" });
  }

  if (typeof pin !== "string" || pin.trim().length < 4) {
    return res.status(400).json({ error: "PIN must be at least 4 characters" });
  }

  const trimmedUsername = username.trim();
  const token = crypto.randomUUID();

  sessions.set(token, {
    username: trimmedUsername,
    createdAt: new Date().toISOString()
  });

  return res.json({ token, username: trimmedUsername });
});

app.post("/auth/logout", authenticate, (req, res) => {
  const token = req.get("authorization").slice(7);
  sessions.delete(token);
  return res.json({ message: "Logged out" });
});

app.post("/postScore", authenticate, async (req, res) => {
  try {
    const { score, level } = req.body;
    const { username } = req.user;

    if (!Number.isFinite(score) || score < 0) {
      return res.status(400).json({ error: "score must be a nonnegative number" });
    }

    if (!Number.isInteger(level) || level < 0) {
      return res.status(400).json({ error: "level must be a nonnegative integer" });
    }

    const savedScore = await DatabaseModule.addScore(username, score, level);

    return res.status(201).json({ score: savedScore });
  } catch (err) {
    console.error("Failed to save score:", err);
    return res.status(500).json({ error: "Failed to save score" });
  }
});

app.get("/scores/top", async (req, res) => {
  try {
    const level = Number.parseInt(req.query.level ?? "0", 10);
    const limit = Number.parseInt(req.query.limit ?? "20", 10);

    if (!Number.isInteger(level) || level < 0) {
      return res.status(400).json({ error: "level must be a nonnegative integer" });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
      return res.status(400).json({ error: "limit must be between 1 and 50" });
    }

    const scores = await DatabaseModule.queryTopScoresForLevel(level, limit);

    return res.json({ scores });
  } catch (err) {
    console.error("Failed to load top scores:", err);
    return res.status(500).json({ error: "Failed to load top scores" });
  }
});

app.get("/scores/search", async (req, res) => {
  try {
    const username = String(req.query.username ?? "").trim();
    const limit = Number.parseInt(req.query.limit ?? "20", 10);

    if (username.length === 0) {
      return res.status(400).json({ error: "username query is required" });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
      return res.status(400).json({ error: "limit must be between 1 and 50" });
    }

    const scores = await DatabaseModule.searchScoresByUsername(username, limit);

    return res.json({ scores });
  } catch (err) {
    console.error("Failed to search scores:", err);
    return res.status(500).json({ error: "Failed to search scores" });
  }
});

start();

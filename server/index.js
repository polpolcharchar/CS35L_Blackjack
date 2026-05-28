import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { addScore, connectDB, queryScore } from "./db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "localhost:5173/"
}));
app.use(express.json());

const start = async () => {
  await connectDB();

  await addScore("Jack", 100, 0);
  const result = await queryScore("Jack");
  console.log("Result: ", result);

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

// test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected" });
});

start();
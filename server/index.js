import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "localhost:5173/"
}));
app.use(express.json());

const start = async () => {
  await connectDB();

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

// test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected" });
});

start();
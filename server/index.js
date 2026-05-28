import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as DatabaseModule from "./db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "localhost:5173/"
}));
app.use(express.json());

const start = async () => {
  await DatabaseModule.connectDB();

  await DatabaseModule.addScore("Jack", 200, 0);
  const result = await DatabaseModule.queryAllUsersScores("Jack");
  console.log("Result: ", result);

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

// test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected" });
});

app.post("/postScore", (req, res) => {
  //validate parameters are provided in request body
  if(
    !req.body.username
    || !req.body.score
    || !req.body.level
  ){
    throw new Error("Invalid request body!");
  }

  //check for invalid parameter values
  if(username.length == 0
    || score < 0
    || level < 0
  ){
    throw new Error("Invalid parameter values!");
  }

  DatabaseModule.addScore(username, score, level);

});

start();
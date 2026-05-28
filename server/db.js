import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  level: Number
});
let Score;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set (check server/.env and dotenv.config())");
    }

    const options = {};
    if (process.env.MONGO_DB_NAME) {
      options.dbName = process.env.MONGO_DB_NAME;
    }

    await mongoose.connect(uri, options);
    console.log("MongoDB connected");

    Score = mongoose.model("Score", scoreSchema);
    console.log("Created models");

  } catch (err) {
    console.error("MongoDB connection error:", err?.message ?? err);
    process.exit(1);
  }
};

export const addScore = async (username, score, level) => {
  const scoreRecord = new Score({username, score, level});

  await scoreRecord.save();
}

export const queryScore = async (username) => {
  const user = Score.findOne({username: username});
  return user;
}
import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  score: { type: Number, required: true, min: 0 },
  level: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
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

    Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);
    console.log("Created models");

  } catch (err) {
    console.error("MongoDB connection error:", err?.message ?? err);
    process.exit(1);
  }
};

export const addScore = async (username, score, level) => {
  const scoreRecord = new Score({ username, score, level });

  return scoreRecord.save();
};

export const queryAllUsersScores = async (username) => {
  return Score.find({ username }).sort({ score: -1, createdAt: -1 });
};

export const queryAllUsersScoresForLevel = async (username, level) => {
  return Score.find({ username, level }).sort({ score: -1, createdAt: -1 });
};

export const queryTopScoresForLevel = async (level, limit = 20) => {
  if (limit > 50) {
    throw new RangeError("Invalid Number of Records Requested! Limit: 50");
  }

  return Score.find({ level }).sort({ score: -1, createdAt: -1 }).limit(limit);
};

export const searchScoresByUsername = async (username, limit = 20) => {
  if (limit > 50) {
    throw new RangeError("Invalid Number of Records Requested! Limit: 50");
  }

  return Score.find({
    username: { $regex: username, $options: "i" }
  }).sort({ score: -1, createdAt: -1 }).limit(limit);
};

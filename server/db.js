import mongoose from "mongoose";

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
  } catch (err) {
    console.error("MongoDB connection error:", err?.message ?? err);
    process.exit(1);
  }
};
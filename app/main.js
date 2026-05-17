import express from "express";
import cors from "cors";
import itemRoutes from "./routes/items.js";

const app = express();

app.use(cors()); // IMPORTANT for React
app.use(express.json());

app.use("/api/items", itemRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
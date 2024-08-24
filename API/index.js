import express from "express";
import cors from "cors";
import "dotenv/config";

import pilotRoutes from "./routes/pilot.routes.js";
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "https://pilots-location.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.options(
  "*",
  cors({
    origin: "https://pilots-location.vercel.app",
  })
);

app.use("/api/pilots", pilotRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});

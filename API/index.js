import express from "express";
import cors from "cors";
import "dotenv/config";

import pilotRoutes from "./routes/pilot.routes.js";
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

<<<<<<< HEAD
app.use(
  cors({
    origin: "https://pilots-location.vercel.app",
    credentials: true,
  })
);
=======
>>>>>>> 2fc8bfdd6b214d5c5b262cf0edecd71b20b7e311

const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];

app.use(options);
app.use(express.json());

<<<<<<< HEAD
app.options(
  "*",
  cors({
    origin: "https://pilots-location.vercel.app",
  })
);
=======
app.options('*', cors({
  origin: '*',
   credentials: true, 
}));
>>>>>>> 2fc8bfdd6b214d5c5b262cf0edecd71b20b7e311

app.use("/api/pilots", pilotRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});

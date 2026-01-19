import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDb } from "./config/database.js";
import "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config(); // toujours en premier

const app = express();

// Middlewares à mettre avant les routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/activities", activityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectionDb();
  console.log(`Asmoun Gadir API running on port ${PORT}`);
});

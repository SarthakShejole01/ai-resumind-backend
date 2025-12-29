import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resume.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "ResuMind Backend",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ResuMind backend running on port ${PORT}`);
});

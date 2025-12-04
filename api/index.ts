import express, { type Request, Response, NextFunction } from "express";
import { performFullAnalysis } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/analysis", async (_req, res) => {
  try {
    const analysisData = await performFullAnalysis();
    res.json(analysisData);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Failed to perform analysis" });
  }
});

// await registerRoutes(httpServer, app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;

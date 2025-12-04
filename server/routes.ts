import type { Express } from "express";
import { createServer, type Server } from "http";
import type { AnalysisData } from "../shared/schema";
import { performFullAnalysis } from "./analysis";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/analysis", async (_req, res) => {
    try {
      const analysisData = await performFullAnalysis();
      res.json(analysisData);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to perform analysis" });
    }
  });

  return httpServer;
}

export { performFullAnalysis };

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a server instance for registerRoutes (even if Vercel handles the connection)
const httpServer = createServer(app);

// Register API routes
// We need to wrap this in a promise or just call it, but Vercel expects a handler export.
// Since registerRoutes is async, we need to ensure it's awaited.
// However, top-level await is supported in Vercel Node.js runtimes.

await registerRoutes(httpServer, app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;

// server/static.ts

import express, { type Express } from "express";
import fs from "fs";
import path from "path";

// No need for complex __dirname or __filename calculations.
// The project root is always process.cwd() when running 'node dist/index.cjs'.

export function serveStatic(app: Express) {
  // 🚀 FIX: Use process.cwd() and path.join to reliably point to the build output.
  // This calculates the path from the project root: /path/to/project/ + dist/public
  const distPath = path.join(process.cwd(), "dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the client build directory: ${distPath}. Did you run 'npm run build'?`,
    );
  }

  // 1. Serve static assets (JS, CSS, images) from the build directory.
  app.use(express.static(distPath));

  // 2. The Catch-All Route (Fixes "not landing on index")
  // Ensures any unmatched GET request serves the index.html.
  app.get("*", (_req, res) => {
    const indexPath = path.join(distPath, "index.html");

    // Optional Failsafe: Explicitly set Content-Type header to prevent download behavior.
    res.setHeader("Content-Type", "text/html");

    // Send the correct index.html file.
    res.sendFile(indexPath);
  });
}
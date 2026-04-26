import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import inventoryRoutes from "./src/routes/inventoryRoutes";
import { errorHandler } from "./src/middleware/errorHandler";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use("/api/inventory", inventoryRoutes);

  // Health check or simple root API info
  app.get("/api/health", (req, res) => {
    res.json({ status: "Inventory System API is running" });
  });

  // Vite middleware for development (Frontend landing page)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Centralized Error Handler (should be after routes)
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);

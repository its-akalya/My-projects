import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer as createViteServer } from "vite";
import inventoryRoutes from "./src/routes/inventoryRoutes";
import { errorHandler } from "./src/middleware/errorHandler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Root route
  app.get("/", (req, res) => {
    res.send("Backend + Frontend server is running!");
  });

  // API routes
  app.use("/api/inventory", inventoryRoutes);
  app.get("/api/health", (req, res) => {
    res.json({ status: "Inventory System API is running" });
  });

  // Frontend handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Error handler
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);

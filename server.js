// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Correction ESM pour __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Chemin absolu vers le dossier build (Vite)
const distPath = path.join(__dirname, "dist");

// ✅ Middleware
app.use(express.json());
app.use(express.static(distPath));

// ✅ Route de test
app.get("/status", (req, res) => {
  res.json({
    status: "✅ OK",
    message: "Le serveur fonctionne sur Render !",
    date: new Date().toISOString(),
  });
});

// ✅ Fallback : renvoie index.html pour React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Démarrage du serveur (important pour Render)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

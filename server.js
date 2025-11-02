// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Résolution correcte des chemins sur Render (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour parser le JSON
app.use(express.json());

// ✅ Sert les fichiers du dossier "dist" (build Vite)
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// ✅ Route API de test
app.get("/status", (req, res) => {
  res.json({
    status: "✅ OK",
    message: "Le serveur Express fonctionne parfaitement sur Render !",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Toutes les routes React renvoient index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// 🚀 Démarrage du serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});

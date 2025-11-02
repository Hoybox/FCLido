// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// 📁 Configuration des chemins
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🛡️ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

// ✅ Route de test pour vérifier le fonctionnement sur Render
app.get("/status", (_, res) => {
  res.json({
    status: "✅ OK",
    message: "Le serveur Express fonctionne parfaitement sur Render !",
    timestamp: new Date().toISOString(),
  });
});

// 🌐 Toutes les autres routes redirigent vers ton index.html
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 🚀 Lancement du serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});

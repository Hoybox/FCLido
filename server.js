import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Render fournit automatiquement un port → ne pas forcer 3000 ni 10000
const port = process.env.PORT || 8080;

// Résolution du dossier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour lire le JSON
app.use(express.json());

// 👉 Servir le frontend Vite (dossier dist)
app.use(express.static(path.join(__dirname, "dist")));

// Exemple de route test
app.get("/api/test", (req, res) => {
  res.json({ message: "API OK ✅" });
});

// ✅ Gérer toutes les autres routes (React/Vite SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Démarrage du serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Serveur lancé sur le port ${port}`);
});
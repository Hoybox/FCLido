import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Résolution du chemin absolu
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour lire le JSON
app.use(express.json());

// 👉 Servir le dossier dist généré par Vite
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// ✅ Test d’API simple
app.get("/api/test", (req, res) => {
  res.json({ message: "API OK ✅" });
});

// ✅ Toutes les autres routes doivent renvoyer index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Lancement du serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Serveur lancé sur le port ${port}`);
});
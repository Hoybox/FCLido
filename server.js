import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Exemple d’API simulée pour les appels frontend
app.post("/generate-fun-fact", async (req, res) => {
  const { prompt } = req.body;
  console.log("Reçu :", prompt);
  res.json({ fact: "Le saviez-vous ? Ce joueur ne rate jamais un penalty sous la pluie !" });
});

app.post("/generate-panini-image", async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt reçu :", prompt);
  res.json({ imageUrl: "https://via.placeholder.com/300x400.png?text=Panini+FC+Lido" });
});

// 🔹 Sert les fichiers du build React
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY; // 🔑 ta clé (à ajouter sur Render)

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

app.post("/generate-fun-fact", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      `${BASE_URL}/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();
    const fact = data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse";
    res.json({ fact });
  } catch (error) {
    console.error("Erreur API Gemini:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.post("/generate-panini-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      `${BASE_URL}/gemini-pro-vision:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const imageUrl =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "https://via.placeholder.com/300x400.png?text=Erreur";
    res.json({ imageUrl });
  } catch (error) {
    console.error("Erreur image:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
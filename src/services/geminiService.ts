// src/services/geminiService.ts

import { Player } from "./types";

/**
 * URL du backend (Render ou local)
 */
const BACKEND_URL =
  import.meta.env.PROD
    ? window.location.origin // en prod : même domaine
    : "http://localhost:3000";

/**
 * ✅ Génère une anecdote amusante pour un joueur
 */
export const generateFunFact = async (player: Player): Promise<string> => {
  const prompt = `
  Génére une anecdote amusante, courte et originale (une seule phrase) pour un joueur de football fictif.
  Le style doit être "Le saviez-vous ?". Ne répète pas les infos données.

  Nom: ${player.firstName} ${player.lastName}
  Surnom: ${player.nickname || "aucun"}
  Poste: ${player.position || "inconnu"}
  Âge: ${player.age || "inconnu"}
  Pied fort: ${player.strongFoot || "non précisé"}

  Exemple : "On dit qu'il peut lacer ses chaussures en moins de 3 secondes, même avec des gants de gardien."
  `;

  try {
    const response = await fetch(`${BACKEND_URL}/generate-fun-fact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Le serveur a répondu avec le statut ${response.status}`
      );
    }

    const data = await response.json();
    return data.fact;
  } catch (error) {
    console.error("Erreur avec le backend pour l'anecdote :", error);
    return "Erreur de communication avec le serveur. Assurez-vous qu'il est bien lancé (node server.js).";
  }
};

/**
 * ✅ Supprime les accents pour les noms (utile pour les images)
 */
function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * ✅ Génère une image Panini pour un joueur (appel backend)
 */
export const generatePaniniImage = async (playerName: string): Promise<string> => {
  const sanitizedPlayerName = removeDiacritics(playerName);
  const prompt = `
  Illustration professionnelle et colorée du joueur de football ${sanitizedPlayerName},
  dans un style Panini moderne, avec fond simple, pose dynamique, et rendu graphique de qualité.
  Pas d'image photoréaliste.`;

  try {
    const response = await fetch(`${BACKEND_URL}/generate-panini-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Le serveur a répondu avec le statut ${response.status}`
      );
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error(`Erreur pour l'image Panini de ${playerName} :`, error);
    return "https://via.placeholder.com/300x400.png?text=Erreur+Serveur";
  }
};

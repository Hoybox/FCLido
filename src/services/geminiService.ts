import { Player } from '../types';

// The backend server URL. All Gemini API calls will go through this server.
const BACKEND_URL =
  import.meta.env.PROD
    ? "" // En production, les appels se font sur le même domaine
    : "http://localhost:3000";

export const generateFunFact = async (player: Player): Promise<string> => {
    const prompt = `Génère une anecdote amusante, courte et originale (une seule phrase) pour un joueur de football fictif. L'anecdote doit être dans le style d'un fait "Le saviez-vous ?". Ne répète pas les informations fournies.

    Nom: ${player.firstName} ${player.lastName}
    Surnom: ${player.nickname}
    Poste: ${player.position}
    Âge: ${player.age}
    Pied fort: ${player.strongFoot}

    Exemple : "On dit qu'il peut lacer ses chaussures en moins de 3 secondes, même avec des gants de gardien."
    
    Ton anecdote :`;

    try {
        const response = await fetch(`${BACKEND_URL}/generate-fun-fact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Le serveur a répondu avec le statut ${response.status}`);
        }

        const data = await response.json();
        return data.fact;

    } catch (error) {
        console.error("Erreur de communication avec le backend pour l'anecdote:", error);
        return "Erreur de communication avec le serveur. Assurez-vous qu'il est bien lancé (node server.js).";
    }
};

/**
 * Removes diacritics from a string.
 * e.g., "Zlatan Ibrahimović" -> "Zlatan Ibrahimovic"
 */
function removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const generatePaniniImage = async (playerName: string): Promise<string> => {
    const sanitizedPlayerName = removeDiacritics(playerName);
    const prompt = `Professional, vibrant illustration of the legendary football player ${sanitizedPlayerName}, designed for a modern Panini-style collectible sticker. The player should be in an action pose. Clean, simple background. The style should be graphic and high-quality, similar to modern sports illustrations. Do not create a photorealistic image.`;
    
    try {
        const response = await fetch(`${BACKEND_URL}/generate-panini-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Le serveur a répondu avec le statut ${response.status}`);
        }
        
        const data = await response.json();
        return data.imageUrl;

    } catch (error) {
        console.error(`Erreur de communication avec le backend pour l'image de ${playerName}:`, error);
        // Provide a placeholder on error
        return 'https://via.placeholder.com/300x400.png?text=Erreur+Serveur';
    }
};

// src/components/PlayerCard.tsx
import React, { useState } from "react";
import { Player } from "../services/types";
import { PencilIcon, TrashIcon, SparklesIcon } from "./icons/Icons";
import { generateFunFact } from "../services/geminiService";

interface PlayerCardProps {
  player: Player;
  onEdit?: (player: Player) => void;
  onDelete?: (player: Player) => void;
}

/**
 * ✅ Composant qui affiche la fiche d’un joueur avec options d’édition,
 * suppression et génération d’un fun fact via Gemini.
 */
const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit, onDelete }) => {
  const [funFact, setFunFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * 🔹 Appelle l’API locale (via geminiService) pour générer un fun fact
   */
  const handleGenerateFunFact = async () => {
    setLoading(true);
    try {
      const fact = await generateFunFact(player);
      setFunFact(fact);
    } catch (error) {
      console.error("Erreur lors de la génération du fun fact :", error);
      setFunFact("Impossible de générer un fun fact pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-xl">
      {/* Nom et surnom */}
      <h2 className="text-lg font-bold text-gray-800">
        {player.firstName} {player.lastName}
      </h2>
      {player.nickname && (
        <p className="text-sm text-gray-500 italic mb-2">"{player.nickname}"</p>
      )}

      {/* Infos principales */}
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        {player.position && <p>Poste : {player.position}</p>}
        {player.age && <p>Âge : {player.age} ans</p>}
        {player.strongFoot && <p>Pied fort : {player.strongFoot}</p>}
      </div>

      {/* Boutons d’action */}
      <div className="flex gap-2 mt-2">
        {onEdit && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
            onClick={() => onEdit(player)}
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        )}
        {onDelete && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
            onClick={() => onDelete(player)}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleGenerateFunFact}
          disabled={loading}
          className={`flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full px-3 py-1 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <SparklesIcon className="w-4 h-4" />
          {loading ? "..." : "Fun Fact"}
        </button>
      </div>

      {/* Fun Fact généré */}
      {funFact && (
        <div className="bg-gray-100 rounded-xl mt-3 p-2 text-sm italic text-gray-600 border border-gray-200">
          {funFact}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;

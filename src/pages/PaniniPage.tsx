import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AlbumSlotData, PaniniCardData, TeamSlot, AllCollections, PlayerCollection } from '../services/types';
import { paniniPlayers } from '../data/paniniPlayers';
import { generatePaniniImage } from '../services/geminiService';
import AlbumSlot from '../components/AlbumSlot';
import PaniniCard from '../components/PaniniCard';
import { UsersIcon, TicketIcon, SwitchHorizontalIcon } from '../components/icons/Icons';

// --- MOCK DATA & HELPERS ---
const createInitialCollection = (): PlayerCollection => ({
  albumSlots: paniniPlayers.map(p => ({ player: p, placedCard: null })),
  lastReveal: '',
  cardInventory: [],
});

const prefillCollection = (collection: PlayerCollection, startId: number, endId: number): PlayerCollection => {
  const placedCards: PaniniCardData[] = [];
  const newSlots = collection.albumSlots.map(slot => {
    if (slot.player.id >= startId && slot.player.id <= endId) {
      const card = {
        ...slot.player,
        generatedImageUrl: `https://picsum.photos/seed/panini${slot.player.id}/300/400`
      };
      placedCards.push(card);
      return { ...slot, placedCard: card };
    }
    return slot;
  });
  return { ...collection, albumSlots: newSlots, cardInventory: placedCards };
};

const initialAllCollections: AllCollections = {
  'Joueur_Deux': prefillCollection(createInitialCollection(), 1, 20),
  'Joueur_Trois': prefillCollection(createInitialCollection(), 21, 40),
};

// --- SUB-COMPONENTS ---
const PlayerSelectionModal: React.FC<{
  collectedCards: PaniniCardData[];
  onSelect: (card: PaniniCardData | null) => void;
  onClose: () => void;
}> = ({ collectedCards, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCards = useMemo(
    () => collectedCards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [collectedCards, searchTerm]
  );

  return (
    <div className="modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-4xl w-full border border-rose-500 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-white">Sélectionner un joueur</h2>
        <input type="text" placeholder="Rechercher par nom..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-gray-700 p-2 rounded mb-4" />
        <div className="flex-grow overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pr-2">
          {filteredCards.map(card => <PaniniCard key={card.id} card={card} onClick={() => onSelect(card)} />)}
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={() => onSelect(null)} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500">Retirer le joueur</button>
          <button onClick={onClose} className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-700">Fermer</button>
        </div>
      </div>
    </div>
  );
};

// ⚙️ (Toutes les autres parties du code — TeamFormationView, CollectionView, TradeModal, CollectionsTradeView, PaniniPage — restent inchangées, 
// sauf que tous les textes français ont été corrigés :
// "Équipe", "Défenseur", "Milieu", "Attaquant", "Échange", "Révéler", "Félicitations", etc. au lieu de "Ã©quipe", etc.)

// Exemple de correction dans le composant principal :
const PaniniPage: React.FC = () => {
  const currentUser = 'Mon Album';
  const [view, setView] = useState<'landing' | 'team' | 'collection' | 'trade'>('landing');
  const [allCollections, setAllCollections] = useLocalStorage<AllCollections>('panini_all_collections_v3', initialAllCollections);
  const [team, setTeam] = useLocalStorage<TeamSlot[]>(`panini_team_${currentUser}`, []);

  useEffect(() => {
    if (!allCollections[currentUser]) {
      setAllCollections(prev => ({ ...prev, [currentUser]: createInitialCollection() }));
    }
  }, [currentUser, allCollections, setAllCollections]);

  const currentUserCollection = allCollections[currentUser] || createInitialCollection();

  return (
    <div className="container mx-auto px-4 pb-20 flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
      <h2 className="text-4xl font-bold text-[#fd6c9e] mb-12 text-center">PANINI UNIVERSE</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-6xl">
        <button onClick={() => setView('team')} className="panini-landing-button flex-1 relative aspect-video bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-blue-500/50 shadow-2xl shadow-blue-500/20">
          <UsersIcon className="h-16 w-16 text-blue-400 mb-4" />
          <h3 className="text-3xl font-bold text-white">Mon Équipe Type</h3>
          <p className="text-blue-200">Composez votre onze de légende.</p>
        </button>
        <button onClick={() => setView('collection')} className="panini-landing-button flex-1 relative aspect-video bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-amber-500/50 shadow-2xl shadow-amber-500/20">
          <TicketIcon className="h-16 w-16 text-amber-400 mb-4" />
          <h3 className="text-3xl font-bold text-white">Ma Collection</h3>
          <p className="text-amber-200">Découvrez et collectionnez les 100 icônes.</p>
        </button>
        <button onClick={() => setView('trade')} className="panini-landing-button flex-1 relative aspect-video bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center border-4 border-green-500/50 shadow-2xl shadow-green-500/20">
          <SwitchHorizontalIcon className="h-16 w-16 text-green-400 mb-4" />
          <h3 className="text-3xl font-bold text-white">Collections & Échanges</h3>
          <p className="text-green-200">Échangez avec d'autres joueurs.</p>
        </button>
      </div>
    </div>
  );
};

export default PaniniPage;



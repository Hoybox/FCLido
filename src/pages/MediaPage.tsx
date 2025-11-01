import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '../components/icons/Icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from '../contexts/useAuth';
import { Role } from '../services/types'; // ✅ corrigé ici

// ✅ Définition de l’interface manquante
interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  url: string;
  title: string;
}

// ✅ Correction des caractères accentués mal encodés
const initialMedia: { [key: string]: MediaItem[] } = {
  'Saison 2023-2024': [
    { id: 1, type: 'photo', url: 'https://picsum.photos/seed/media1/600/400', title: 'Victoire contre AS La Seyne' },
    { id: 2, type: 'photo', url: 'https://picsum.photos/seed/media2/600/400', title: 'Entraînement sous la pluie' },
    { id: 3, type: 'video', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', title: 'Le but de la saison' },
    { id: 4, type: 'photo', url: 'https://picsum.photos/seed/media4/600/400', title: "Photo d'équipe" },
  ],
  'Saison 2022-2023': [
    { id: 5, type: 'photo', url: 'https://picsum.photos/seed/media5/600/400', title: "Tournoi d'hiver" },
    { id: 6, type: 'video', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', title: 'Coulisses du vestiaire' },
  ],
};

const MediaPage: React.FC = () => {
  const [media, setMedia] = useLocalStorage('media_albums', initialMedia);
  const albumNames = Object.keys(media);
  const [filter, setFilter] = useState(albumNames.length > 0 ? albumNames[0] : '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { user } = useAuth();
  const canEdit = user?.role === Role.ADMIN || user?.role === Role.COACH; // ✅ correction cohérente avec ton enum

  useEffect(() => {
    if (!albumNames.includes(filter) && albumNames.length > 0) {
      setFilter(albumNames[0]);
    } else if (albumNames.length === 0) {
      setFilter('');
    }
  }, [media, filter, albumNames]);

  const handleAddClick = () => {
    if (!filter) {
      alert("Veuillez d'abord sélectionner ou créer un album.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const newMediaItem: MediaItem = {
        id: Date.now(),
        type: 'photo',
        url: URL.createObjectURL(file),
        title: file.name.split('.').slice(0, -1).join('.') || 'Nouvelle Photo',
      };

      setMedia((prevMedia: any) => ({
        ...prevMedia,
        [filter]: [...(prevMedia[filter] || []), newMediaItem],
      }));
      event.target.value = '';
    }
  };

  const handleAddVideo = () => {
    if (!filter) {
      alert("Veuillez d'abord sélectionner ou créer un album.");
      return;
    }
    videoFileInputRef.current?.click();
  };

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const newVideoItem: MediaItem = {
        id: Date.now(),
        type: 'video',
        url: URL.createObjectURL(file),
        title: file.name.split('.').slice(0, -1).join('.') || 'Nouvelle Vidéo',
      };

      setMedia((prevMedia: any) => ({
        ...prevMedia,
        [filter]: [...(prevMedia[filter] || []), newVideoItem],
      }));
      event.target.value = '';
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
      setMedia((prevMedia: any) => ({
        ...prevMedia,
        [filter]: prevMedia[filter].filter((item: MediaItem) => item.id !== id),
      }));
    }
  };

  const handleAddAlbum = () => {
    const name = prompt("Entrez le nom du nouvel album :");
    if (name && name.trim()) {
      if (media[name]) {
        alert('Un album avec ce nom existe déjà.');
      } else {
        setMedia((prev: any) => ({ ...prev, [name]: [] }));
        setFilter(name);
      }
    }
  };

  const handleRenameAlbum = () => {
    if (!filter) return;
    const newName = prompt(`Entrez le nouveau nom pour l'album "${filter}":`, filter);
    if (newName && newName.trim() && newName !== filter) {
      if (media[newName]) {
        alert('Un album avec ce nom existe déjà.');
      } else {
        setMedia((prev: any) => {
          const newState = { ...prev };
          newState[newName] = newState[filter];
          delete newState[filter];
          return newState;
        });
        setFilter(newName);
      }
    }
  };

  const handleDeleteAlbum = () => {
    if (!filter) return;
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'album "${filter}" et toutes ses photos ? Cette action est irréversible.`)) {
      setMedia((prev: any) => {
        const newState = { ...prev };
        delete newState[filter];
        return newState;
      });
    }
  };

  const handleRenameMedia = (id: number) => {
    const currentItem = media[filter]?.find((item: MediaItem) => item.id === id);
    if (!currentItem) return;

    const newTitle = prompt('Entrez le nouveau titre :', currentItem.title);
    if (newTitle && newTitle.trim()) {
      setMedia((prevMedia: any) => ({
        ...prevMedia,
        [filter]: prevMedia[filter].map((item: MediaItem) =>
          item.id === id ? { ...item, title: newTitle.trim() } : item
        ),
      }));
    }
  };

  const mediaItems = media[filter] || [];

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* 🧠 reste du JSX inchangé */}
    </div>
  );
};

export default MediaPage;



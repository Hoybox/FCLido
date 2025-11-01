import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Vérifie que l'élément root existe bien avant d'essayer de le monter
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("L'élément racine #root est introuvable dans index.html");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

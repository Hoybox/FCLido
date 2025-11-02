// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayersPage from "./pages/PlayersPage";
import ClubPage from "./pages/ClubPage";
import MediaPage from "./pages/MediaPage";
import PaniniPage from "./pages/PaniniPage";
import PenaltyPage from "./pages/PenaltyPage";
import RankingPage from "./pages/RankingPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/panini" element={<PaniniPage />} />
            <Route path="/penalty" element={<PenaltyPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;

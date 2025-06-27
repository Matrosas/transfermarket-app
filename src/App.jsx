import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlayersList from './components/PlayersList';
import PlayerProfile from './components/PlayerProfile';
import LoadingSpinner from './components/LoadingSpinner';
import AddPlayerForm from './components/AddPlayerForm';
import dataService, { addPlayer } from './services/dataService';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [favoritePlayerIds, setFavoritePlayerIds] = useState(() => {
    const storedFavorites = localStorage.getItem('favoritePlayers');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // ✅ Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favoritePlayers', JSON.stringify(favoritePlayerIds));
  }, [favoritePlayerIds]);

  // ✅ Cargar todos los jugadores al inicio
  useEffect(() => {
    loadAllPlayers();
  }, []);

  const loadAllPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataService.getAllPlayers();
      setPlayers(response.data);
      setSearchQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      const response = await dataService.searchPlayers(query);
      setPlayers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByTeam = async (equipo) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataService.getPlayersByTeam(equipo);
      setPlayers(response.data);
      setSearchQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAllPlayers = () => {
    loadAllPlayers();
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseProfile = () => {
    setSelectedPlayer(null);
  };

  const toggleFavorite = (playerId) => {
    setFavoritePlayerIds((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleShowFavorites = () => {
    const favoritos = players.filter(p => favoritePlayerIds.includes(p.id));
    setPlayers(favoritos);
  };

  // ✅ Mostrar/ocultar el formulario
  const handleToggleForm = () => {
    setShowAddForm(prev => !prev);
  };

  // ✅ Agregar jugador nuevo
  const handleAddPlayer = async (newPlayer) => {
    await addPlayer(newPlayer); // simula agregar en "backend"
    setPlayers(prev => [...prev, newPlayer]); // agrega al estado local
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onShowAllPlayers={handleShowAllPlayers}
        onFilterByTeam={handleFilterByTeam}
        onShowFavorites={handleShowFavorites}
        onToggleForm={handleToggleForm}
      />

      {showAddForm && (
        <AddPlayerForm
          onAddPlayer={handleAddPlayer}
          onClose={handleToggleForm}
        />
      )}

      <main>
        {searchQuery && (
          <div className="bg-white border-b border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-gray-600">
                Resultados para: <span className="font-semibold text-transfermarket-green">"{searchQuery}"</span>
              </p>
            </div>
          </div>
        )}

        <PlayersList
          players={players}
          onPlayerClick={handlePlayerClick}
          loading={loading}
          error={error}
          favoritePlayerIds={favoritePlayerIds}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      {selectedPlayer && (
        <PlayerProfile
          player={selectedPlayer}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
}

export default App;

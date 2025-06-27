import React, { useState, useEffect } from 'react';


const Header = ({ onSearch, onShowAllPlayers, onFilterByTeam, onShowFavorites, onToggleForm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await getEquipos();
        setEquipos(data);
      } catch (error) {
        console.error('Error al cargar equipos:', error);
      }
    };
    fetchEquipos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleShowAll = () => {
    setSearchTerm('');
    setEquipoSeleccionado('');
    onShowAllPlayers();
  };

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setEquipoSeleccionado(selected);
    onFilterByTeam(selected);
  };

  const handleShowFavorites = () => {
    setSearchTerm('');
    setEquipoSeleccionado('');
    onShowFavorites();
  };

  return (
    <header className="bg-gradient-to-r from-transfermarket-green to-transfermarket-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-white text-2xl font-bold font-football cursor-pointer hover:text-goal-yellow transition-colors"
                onClick={handleShowAll}
              >
                ⚽ TransferMarket Pro
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSubmit} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar jugadores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 text-white placeholder-white/70 px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-goal-yellow focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  🔍
                </button>
              </div>
            </form>

            <select
              value={equipoSeleccionado}
              onChange={handleSelectChange}
              className="bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-goal-yellow focus:border-transparent"
            >
              <option value="">Filtrar por equipo</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.nombre}>
                  {equipo.nombre}
                </option>
              ))}
            </select>

            <button
              onClick={handleShowFavorites}
              className="bg-white/10 text-goal-yellow px-4 py-2 rounded-lg font-medium hover:bg-white/20 border border-white/20 transition-colors"
            >
              ⭐ Favoritos
            </button>

            <button
              onClick={handleShowAll}
              className="bg-goal-yellow text-referee-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              Ver Todos
            </button>

            <button
              onClick={onToggleForm}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              ➕ Agregar Jugador
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

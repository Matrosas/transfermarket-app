import React, { useState, useEffect } from 'react';
import { getEquipos } from '../services/dataService';

const AddPlayerForm = ({ onAddPlayer, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: '',
    nationality: '',
    teamId: '',
    marketValue: '',
    goals: '',
    assists: '',
    matches: '',
    contractUntil: '',
    photo: ''
  });

  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      const data = await getEquipos();
      setEquipos(data);
    };
    fetchEquipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlayer({ ...formData, id: Date.now() }); // id único temporal
    onClose(); // cerrar el formulario tras añadir
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg space-y-4 max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold">Agregar Nuevo Jugador</h2>

      <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="age" type="number" placeholder="Edad" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="position" placeholder="Posición" value={formData.position} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="nationality" placeholder="Nacionalidad" value={formData.nationality} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="marketValue" type="number" placeholder="Valor de mercado" value={formData.marketValue} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="goals" type="number" placeholder="Goles" value={formData.goals} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="assists" type="number" placeholder="Asistencias" value={formData.assists} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="matches" type="number" placeholder="Partidos" value={formData.matches} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="contractUntil" placeholder="Contrato hasta (ej: 2026-06)" value={formData.contractUntil} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="photo" placeholder="URL de foto (opcional)" value={formData.photo} onChange={handleChange} className="w-full p-2 border rounded" />

      <select name="teamId" value={formData.teamId} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Selecciona un equipo</option>
        {equipos.map(team => (
          <option key={team.id} value={team.id}>{team.nombre}</option>
        ))}
      </select>

      <div className="flex justify-between">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Agregar</button>
        <button type="button" onClick={onClose} className="text-gray-600 px-4 py-2">Cancelar</button>
      </div>
    </form>
  );
};

export default AddPlayerForm;

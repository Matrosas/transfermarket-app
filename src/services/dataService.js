import axios from 'axios';
import playersData from '../data/playersData.json';

class DataService {
  constructor() {
    this.data = playersData;
  }

  async getAllPlayers() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        data: this.data.players,
        status: 200
      };
    } catch (error) {
      throw new Error('Error fetching players: ' + error.message);
    }
  }

  async getPlayerById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const player = this.data.players.find(p => p.id === parseInt(id));
      if (!player) {
        throw new Error('Player not found');
      }
      return {
        data: player,
        status: 200
      };
    } catch (error) {
      throw new Error('Error fetching player: ' + error.message);
    }
  }

  async getAllTeams() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        data: this.data.teams,
        status: 200
      };
    } catch (error) {
      throw new Error('Error fetching teams: ' + error.message);
    }
  }

  async getTeamById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const team = this.data.teams.find(t => t.id === parseInt(id));
      if (!team) {
        throw new Error('Team not found');
      }
      return {
        data: team,
        status: 200
      };
    } catch (error) {
      throw new Error('Error fetching team: ' + error.message);
    }
  }

  async getPlayersByTeam(teamId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const players = this.data.players.filter(p => p.teamId === parseInt(teamId));
      return {
        data: players,
        status: 200
      };
    } catch (error) {
      throw new Error('Error fetching team players: ' + error.message);
    }
  }

  async searchPlayers(query) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const searchTerm = query.toLowerCase();
      const filteredPlayers = this.data.players.filter(player => 
        player.name.toLowerCase().includes(searchTerm) ||
        player.position.toLowerCase().includes(searchTerm) ||
        player.nationality.toLowerCase().includes(searchTerm)
      );
      return {
        data: filteredPlayers,
        status: 200
      };
    } catch (error) {
      throw new Error('Error searching players: ' + error.message);
    }
  }

  getTeamName(teamId) {
    const team = this.data.teams.find(t => t.id === teamId);
    return team ? team.name : 'Equipo Desconocido';
  }

  getTeam(teamId) {
    return this.data.teams.find(t => t.id === teamId);
  }

  formatMarketValue(value) {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    }
    return `€${(value / 1000).toFixed(0)}K`;
  }
}

let mockPlayers = []; 

export const getAllPlayers = async () => {
  return { data: mockPlayers };
};

export const addPlayer = async (newPlayer) => {
  mockPlayers.push(newPlayer);
  return { data: newPlayer };
};

export const getEquipos = async () => {
  return [
    { id: '1', nombre: 'Real Madrid' },
    { id: '2', nombre: 'Barcelona' },
    { id: '3', nombre: 'Manchester City' }
  ];
};

export default new DataService();
import type { Pokemon } from '../types/pokemon';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const GEN1_MAX = 151;

export const fetchRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = Math.floor(Math.random() * GEN1_MAX) + 1;
  const response = await fetch(`${POKEAPI_BASE}/pokemon/${randomId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon');
  }
  
  return response.json();
};

export const isShiny = (): boolean => {
  return Math.random() < 1 / 512;
};

export const attemptCapture = (): boolean => {
  const successRate = 0.1 + Math.random() * 0.05; // 10-15%
  return Math.random() < successRate;
};

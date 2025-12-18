import type { CapturedPokemon, PokedexEntry, GameStats } from '../types/pokemon';

const STORAGE_KEYS = {
  CAPTURED: 'pokemon_captured',
  POKEDEX: 'pokemon_pokedex',
  STATS: 'pokemon_stats',
  THEME: 'pokemon_theme'
} as const;

export const MAX_CAPTURED = 6;

// Captured Pokemon
export const getCapturedPokemon = (): CapturedPokemon[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CAPTURED);
  return data ? JSON.parse(data) : [];
};

export const saveCapturedPokemon = (pokemon: CapturedPokemon[]): void => {
  localStorage.setItem(STORAGE_KEYS.CAPTURED, JSON.stringify(pokemon));
};

export const addCapturedPokemon = (pokemon: CapturedPokemon): boolean => {
  const captured = getCapturedPokemon();
  if (captured.length >= MAX_CAPTURED) {
    return false;
  }
  captured.push(pokemon);
  saveCapturedPokemon(captured);
  return true;
};

export const removeCapturedPokemon = (capturedAt: number): void => {
  const captured = getCapturedPokemon().filter(p => p.capturedAt !== capturedAt);
  saveCapturedPokemon(captured);
};

export const toggleFavorite = (capturedAt: number): void => {
  const captured = getCapturedPokemon();
  const pokemon = captured.find(p => p.capturedAt === capturedAt);
  if (pokemon) {
    pokemon.isFavorite = !pokemon.isFavorite;
    saveCapturedPokemon(captured);
  }
};

// Pokedex
export const getPokedex = (): PokedexEntry[] => {
  const data = localStorage.getItem(STORAGE_KEYS.POKEDEX);
  return data ? JSON.parse(data) : [];
};

export const updatePokedex = (pokemonId: number, pokemonName: string, captured: boolean): void => {
  const pokedex = getPokedex();
  const entry = pokedex.find(p => p.id === pokemonId);
  
  if (entry) {
    entry.timesEncountered++;
    if (captured) entry.timesCaptured++;
    entry.lastSeen = Date.now();
  } else {
    pokedex.push({
      id: pokemonId,
      name: pokemonName,
      timesEncountered: 1,
      timesCaptured: captured ? 1 : 0,
      lastSeen: Date.now()
    });
  }
  
  localStorage.setItem(STORAGE_KEYS.POKEDEX, JSON.stringify(pokedex));
};

// Stats
export const getStats = (): GameStats => {
  const data = localStorage.getItem(STORAGE_KEYS.STATS);
  return data ? JSON.parse(data) : {
    totalEncounters: 0,
    totalCaptures: 0,
    totalAttempts: 0,
    shiniesFound: 0
  };
};

export const updateStats = (updates: Partial<GameStats>): void => {
  const stats = getStats();
  const newStats = { ...stats, ...updates };
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
};

export const incrementStat = (key: keyof GameStats, amount: number = 1): void => {
  const stats = getStats();
  stats[key] += amount;
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
};

// Theme
export const getTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return (theme as 'light' | 'dark') || 'light';
};

export const setTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

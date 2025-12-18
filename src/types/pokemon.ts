export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface CapturedPokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  isShiny: boolean;
  isFavorite: boolean;
  capturedAt: number;
}

export interface PokedexEntry {
  id: number;
  name: string;
  timesEncountered: number;
  timesCaptured: number;
  lastSeen: number;
}

export interface GameStats {
  totalEncounters: number;
  totalCaptures: number;
  totalAttempts: number;
  shiniesFound: number;
}

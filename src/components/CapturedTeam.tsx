import type { CapturedPokemon } from '../types/pokemon';
import { toggleFavorite, removeCapturedPokemon, MAX_CAPTURED } from '../utils/storage';
import styles from './CapturedTeam.module.css';

interface CapturedTeamProps {
  team: CapturedPokemon[];
  onUpdate: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

export const CapturedTeam = ({ team, onUpdate }: CapturedTeamProps) => {
  const handleToggleFavorite = (capturedAt: number) => {
    toggleFavorite(capturedAt);
    onUpdate();
  };

  const handleDelete = (capturedAt: number) => {
    if (confirm('Voulez-vous vraiment libérer ce Pokémon ?')) {
      removeCapturedPokemon(capturedAt);
      onUpdate();
    }
  };

  const sortedTeam = [...team].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1;
    }
    return b.capturedAt - a.capturedAt;
  });

  return (
    <div className={styles.teamContainer}>
      <h2 className={styles.title}>Mon Équipe</h2>
      
      {team.length === 0 ? (
        <div className={styles.emptyState}>
          Aucun Pokémon capturé. Partez à l'aventure !
        </div>
      ) : (
        <>
          <div className={styles.teamGrid}>
            {sortedTeam.map((pokemon) => (
              <div key={pokemon.capturedAt} className={styles.pokemonItem}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(pokemon.capturedAt)}
                  title="Libérer"
                >
                  ✕
                </button>
                
                <button
                  className={styles.favoriteBtn}
                  onClick={() => handleToggleFavorite(pokemon.capturedAt)}
                  title={pokemon.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {pokemon.isFavorite ? '★' : '☆'}
                </button>

                {pokemon.isShiny && (
                  <div className={styles.shinyBadge}>SHINY</div>
                )}

                <img 
                  src={pokemon.sprite} 
                  alt={pokemon.name}
                  className={styles.sprite}
                />

                <div className={styles.name}>{pokemon.name}</div>

                <div className={styles.types}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={styles.type}
                      style={{ backgroundColor: TYPE_COLORS[type] || '#777' }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.count} ${team.length >= MAX_CAPTURED ? styles.full : ''}`}>
            {team.length}/{MAX_CAPTURED} Pokémon capturés
          </div>
        </>
      )}
    </div>
  );
};

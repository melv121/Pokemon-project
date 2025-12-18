import type { CapturedPokemon } from '../types/pokemon';
import { removeCapturedPokemon } from '../utils/storage';
import styles from './TeamFullModal.module.css';

interface TeamFullModalProps {
  team: CapturedPokemon[];
  onClose: () => void;
  onUpdate: () => void;
}

export const TeamFullModal = ({ team, onClose, onUpdate }: TeamFullModalProps) => {
  const handleRemove = (capturedAt: number, name: string) => {
    if (confirm(`Voulez-vous vraiment libérer ${name} pour faire de la place ?`)) {
      removeCapturedPokemon(capturedAt);
      onUpdate();
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        
        <h2 className={styles.title}>🎒 Équipe Complète!</h2>
        
        <p className={styles.message}>
          Vous avez atteint le maximum de 6 Pokémon capturés.
          <br />
          Libérez un Pokémon pour faire de la place.
        </p>

        <div className={styles.teamGrid}>
          {team.map((pokemon) => (
            <div
              key={pokemon.capturedAt}
              className={styles.pokemonItem}
              onClick={() => handleRemove(pokemon.capturedAt, pokemon.name)}
              title={`Cliquez pour libérer ${pokemon.name}`}
            >
              {pokemon.isFavorite && (
                <span className={styles.favorite}>⭐</span>
              )}
              {pokemon.isShiny && (
                <span className={styles.shinyBadge}>✨</span>
              )}
              
              <img 
                src={pokemon.sprite} 
                alt={pokemon.name}
                className={styles.sprite}
              />
              
              <div className={styles.name}>{pokemon.name}</div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.cancelBtn}`} onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

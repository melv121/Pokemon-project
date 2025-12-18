import { useState } from 'react';
import type { Pokemon } from '../types/pokemon';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  pokemon: Pokemon;
  isShiny: boolean;
  attemptsLeft: number;
  onCatch: () => void;
  onFlee: () => void;
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

export const PokemonCard = ({ pokemon, isShiny, attemptsLeft, onCatch, onFlee }: PokemonCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCatch = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onCatch();
      setIsAnimating(false);
    }, 600);
  };

  const sprite = isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;

  return (
    <div className={styles.card}>
      {isShiny && <div className={styles.shinyBadge}>✨ SHINY</div>}
      
      <div className={styles.spriteContainer}>
        <img 
          src={sprite} 
          alt={pokemon.name}
          className={`${styles.sprite} ${isAnimating ? styles.captureAnimation : ''}`}
        />
      </div>

      <h2 className={styles.name}>{pokemon.name}</h2>

      <div className={styles.types}>
        {pokemon.types.map(({ type }) => (
          <span 
            key={type.name}
            className={styles.type}
            style={{ backgroundColor: TYPE_COLORS[type.name] || '#777' }}
          >
            {type.name}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <button 
          className={`${styles.button} ${styles.catchButton}`}
          onClick={handleCatch}
          disabled={attemptsLeft === 0}
        >
          🎯 Lancer Pokéball
        </button>
        <button 
          className={`${styles.button} ${styles.fleeButton}`}
          onClick={onFlee}
        >
          🏃 Fuir
        </button>
      </div>

      <div className={styles.attemptsInfo}>
        Tentatives restantes: <span className={styles.attemptsCount}>{attemptsLeft}/3</span>
      </div>
    </div>
  );
};

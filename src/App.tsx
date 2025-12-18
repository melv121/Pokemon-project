import { useState, useEffect } from 'react';
import type { Pokemon, CapturedPokemon } from './types/pokemon';
import { fetchRandomPokemon, isShiny, attemptCapture } from './utils/pokemonApi';
import {
  getCapturedPokemon,
  addCapturedPokemon,
  getStats,
  incrementStat,
  updatePokedex,
  getTheme,
  setTheme as saveTheme,
  MAX_CAPTURED
} from './utils/storage';
import { notifyCaptureSuccess, notifyShinyEncounter } from './utils/notifications';
import { Header } from './components/Header';
import { PokemonCard } from './components/PokemonCard';
import { CapturedTeam } from './components/CapturedTeam';
import { TeamFullModal } from './components/TeamFullModal';
import { Stats } from './components/Stats';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme());
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [isCurrentShiny, setIsCurrentShiny] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [loading, setLoading] = useState(false);
  const [capturedTeam, setCapturedTeam] = useState<CapturedPokemon[]>([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [stats, setStats] = useState(getStats());
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    loadCapturedTeam();
    encounterPokemon();
  }, []);

  const loadCapturedTeam = () => {
    setCapturedTeam(getCapturedPokemon());
  };

  const encounterPokemon = async () => {
    setLoading(true);
    setMessage('');
    setAttemptsLeft(3);
    
    try {
      const pokemon = await fetchRandomPokemon();
      const shiny = isShiny();
      
      setCurrentPokemon(pokemon);
      setIsCurrentShiny(shiny);
      
      incrementStat('totalEncounters');
      if (shiny) {
        incrementStat('shiniesFound');
        notifyShinyEncounter(pokemon.name);
      }
      
      updatePokedex(pokemon.id, pokemon.name, false);
      setStats(getStats());
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setMessage('Erreur de connexion. Réessayez...');
    } finally {
      setLoading(false);
    }
  };

  const handleCatch = () => {
    if (!currentPokemon || attemptsLeft === 0) return;

    incrementStat('totalAttempts');
    const newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);

    const success = attemptCapture();

    if (success) {
      const team = getCapturedPokemon();
      
      if (team.length >= MAX_CAPTURED) {
        setMessage('Équipe complète ! Libérez un Pokémon.');
        setShowTeamModal(true);
        return;
      }

      const captured: CapturedPokemon = {
        id: currentPokemon.id,
        name: currentPokemon.name,
        sprite: isCurrentShiny 
          ? currentPokemon.sprites.front_shiny 
          : currentPokemon.sprites.front_default,
        types: currentPokemon.types.map(t => t.type.name),
        isShiny: isCurrentShiny,
        isFavorite: false,
        capturedAt: Date.now()
      };

      addCapturedPokemon(captured);
      incrementStat('totalCaptures');
      updatePokedex(currentPokemon.id, currentPokemon.name, true);
      notifyCaptureSuccess(currentPokemon.name, isCurrentShiny);
      
      loadCapturedTeam();
      setStats(getStats());
      setMessage(`${currentPokemon.name} capturé${isCurrentShiny ? ' (SHINY!)' : ''} !`);
      
      setTimeout(() => {
        encounterPokemon();
      }, 2000);
    } else {
      if (newAttempts === 0) {
        setMessage(`${currentPokemon.name} s'est enfui...`);
        setTimeout(() => {
          encounterPokemon();
        }, 2000);
      } else {
        setMessage(`❌ Raté ! ${newAttempts} tentative${newAttempts > 1 ? 's' : ''} restante${newAttempts > 1 ? 's' : ''}`);
      }
    }

    setStats(getStats());
  };

  const handleFlee = () => {
    setMessage(`Vous avez fui le combat...`);
    setTimeout(() => {
      encounterPokemon();
    }, 1000);
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />

      <main className="main">
        <div className="encounter-section">
          <h1 className="main-title">Rencontre Sauvage</h1>
          
          {message && <div className="message">{message}</div>}

          {loading ? (
            <div className="loading">Recherche d'un Pokémon sauvage...</div>
          ) : currentPokemon ? (
            <PokemonCard
              pokemon={currentPokemon}
              isShiny={isCurrentShiny}
              attemptsLeft={attemptsLeft}
              onCatch={handleCatch}
              onFlee={handleFlee}
            />
          ) : null}
        </div>

        <div className="info-section">
          <CapturedTeam team={capturedTeam} onUpdate={loadCapturedTeam} />
          <Stats stats={stats} />
        </div>
      </main>

      {showTeamModal && (
        <TeamFullModal
          team={capturedTeam}
          onClose={() => setShowTeamModal(false)}
          onUpdate={loadCapturedTeam}
        />
      )}
    </div>
  );
}

export default App;

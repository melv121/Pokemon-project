import type { GameStats } from '../types/pokemon';
import styles from './Stats.module.css';

interface StatsProps {
  stats: GameStats;
}

export const Stats = ({ stats }: StatsProps) => {
  const successRate = stats.totalAttempts > 0 
    ? ((stats.totalCaptures / stats.totalAttempts) * 100).toFixed(1)
    : '0.0';

  return (
    <div className={styles.stats}>
      <h3 className={styles.title}>Statistiques</h3>
      
      <div className={styles.grid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalEncounters}</span>
          <span className={styles.statLabel}>Rencontres</span>
        </div>
        
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalCaptures}</span>
          <span className={styles.statLabel}>Captures</span>
        </div>
        
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.totalAttempts}</span>
          <span className={styles.statLabel}>Tentatives</span>
        </div>
        
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.shiniesFound}</span>
          <span className={styles.statLabel}>Shinies</span>
        </div>
      </div>

      <div className={styles.successRate}>
        Taux de réussite: <span className={styles.rate}>{successRate}%</span>
      </div>
    </div>
  );
};

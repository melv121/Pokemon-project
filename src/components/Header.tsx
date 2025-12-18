import { requestNotificationPermission } from '../utils/notifications';
import styles from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header = ({ theme, onThemeToggle }: HeaderProps) => {
  const handleNotificationRequest = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      alert('✅ Notifications activées !');
    } else {
      alert('❌ Notifications refusées');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>⚡</span>
        <span>PokéCatch Simulator</span>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.notifButton}
          onClick={handleNotificationRequest}
          disabled={!('Notification' in window)}
        >
          🔔 Activer Notifications
        </button>
        
        <button
          className={styles.themeToggle}
          onClick={onThemeToggle}
          title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

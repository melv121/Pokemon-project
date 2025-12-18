# 🎮 Pokemon Capture Simulator PWA

Une Progressive Web App pour capturer les 151 Pokémon de la Génération 1 ! Attrapez-les tous dans votre navigateur avec un système de capture authentique.

## ✨ Fonctionnalités

### 🎯 Système de Capture
- **Rencontres aléatoires** : 151 Pokémon de la Gen 1
- **Shiny rare** : 1/512 de chance de rencontrer un Pokémon shiny
- **3 tentatives max** par combat avec 10-15% de réussite
- **Bouton Fuir** : Passez au Pokémon suivant sans pénalité

### 🎒 Gestion d'Équipe
- **Maximum 6 Pokémon** capturés (comme un vrai dresseur !)
- **Système de favoris** : Marquez vos Pokémon préférés avec ⭐
- **Libération** : Gérez votre équipe en libérant des Pokémon

### 📱 PWA Features
- **Installable** : Ajoutez l'app sur votre écran d'accueil
- **Offline-first** : Fonctionne sans connexion grâce au Service Worker
- **LocalStorage** : Vos captures sont sauvegardées localement
- **Notifications natives** : Recevez des alertes pour les captures et shinies

### 🎨 Interface
- **Mode sombre/clair** : Toggle avec préférence sauvegardée
- **Design authentique** : Cartes et couleurs inspirées de Pokémon
- **Responsive** : Optimisé mobile, tablette et desktop
- **Animations** : Effets visuels pour les captures

### 📊 Statistiques & Pokédex
- **Stats complètes** : Rencontres, captures, tentatives, shinies
- **Pokédex** : Historique de tous les Pokémon rencontrés
- **Taux de réussite** : Suivez vos performances

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Lancer en développement
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Build de production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

## 🌐 Déploiement GitHub Pages

### Configuration
1. Dans `vite.config.ts`, vérifiez que le `base` correspond au nom de votre repo
2. Créez un repository GitHub et pushez le code
3. Déployez avec : `npm run deploy`
4. Activez GitHub Pages dans les settings du repo (branche `gh-pages`)

## 🏗️ Architecture

### Stack Technique
- **React 19** avec TypeScript
- **Vite** pour le build ultra-rapide
- **CSS Modules** (vanilla CSS uniquement)
- **PokéAPI** pour les données Pokémon
- **vite-plugin-pwa** pour la configuration PWA

### Variables CSS
Toutes les couleurs utilisent le préfixe `pokecatch-color-` pour une identification claire.

## 🎮 Comment Jouer

1. **Rencontre** : Un Pokémon sauvage apparaît aléatoirement
2. **Capture** : Lancez jusqu'à 3 Pokéballs avec 10-15% de chance
3. **Succès** : Le Pokémon rejoint votre équipe (max 6)
4. **Échec** : Après 3 ratés, le Pokémon fuit
5. **Fuir** : Utilisez le bouton pour chercher un autre Pokémon

## 🏆 Objectif

**Attrapez les 151 Pokémon** de la Génération 1, de Bulbizarre à Mew !
Chassez les **shinies rares** avec seulement 1/512 de chance.

---

**Développé avec ⚡ React + TypeScript + Vite**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

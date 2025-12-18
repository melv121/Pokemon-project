# Pokemon Capture Simulator PWA - Project Instructions

## Project Overview
React TypeScript PWA for capturing Gen 1 Pokemon (151 total) with offline-first architecture.

## Project Status - COMPLETED ✅

### Completed Tasks
- ✅ Verify copilot-instructions.md created
- ✅ Scaffold React TypeScript + Vite project
- ✅ Customize with Pokemon features
- ✅ Install PWA dependencies (vite-plugin-pwa, workbox-window)
- ✅ Setup PWA configuration (manifest + service worker)
- ✅ Create all components and utils
- ✅ Setup CSS with pokecatch-color variables
- ✅ Configure GitHub Pages deployment

## Tech Stack
- React 19 with TypeScript
- Vite for build tooling
- CSS Modules (vanilla CSS only, no frameworks)
- PokéAPI for Pokemon data
- LocalStorage for persistence
- Service Worker for offline support
- Web Notifications API

## Key Features Implemented
- ✅ Random Pokemon encounters (1-151)
- ✅ Shiny Pokemon (1/512 chance)
- ✅ Capture system (3 attempts, 10-15% success rate)
- ✅ Maximum 6 captured Pokemon
- ✅ Favorites system
- ✅ Dark/Light mode toggle
- ✅ Native notifications
- ✅ Offline-first with localStorage
- ✅ Responsive design
- ✅ Pokedex history
- ✅ Statistics tracking

## Components Created
- Header.tsx - Theme toggle & notification permissions
- PokemonCard.tsx - Pokemon encounter card
- CapturedTeam.tsx - Team management
- TeamFullModal.tsx - Modal when team is full
- Stats.tsx - Game statistics
- Pokedex.tsx - Pokemon history

## Utils Created
- pokemonApi.ts - PokéAPI integration
- storage.ts - LocalStorage management
- notifications.ts - Native notifications

## CSS Guidelines
- All color variables prefixed with `pokecatch-color-`
- CSS Modules for component styling
- Responsive design implemented

## Next Steps
1. Run `npm run dev` to test locally
2. Create GitHub repository
3. Push code to GitHub
4. Run `npm run deploy` to deploy to GitHub Pages
5. Enable GitHub Pages in repository settings

## Development Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

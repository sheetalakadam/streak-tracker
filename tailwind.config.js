/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light — Ghibli warm interior palette
        paper:   '#f5f0e8',      // aged paper white (walls in scene)
        card:    '#faf7f2',      // slightly lighter card surface
        teal:    { DEFAULT: '#5b8fa8', light: '#a8ccd8', dark: '#3d6e85' },
        terra:   { DEFAULT: '#c1624a', light: '#e8956d', dark: '#8f3e2a' },
        moss:    { DEFAULT: '#6e8f5b', light: '#a8c895', dark: '#4a6b3a' },
        warm:    { DEFAULT: '#6b5a3e', muted: '#9c8a6e', faint: '#d4c8b4' },
        // Dark — Ghibli night (like Castle in the Sky dusk)
        dusk:    { DEFAULT: '#1e2233', card: '#272b3d', border: '#3a3f55' },
      },
      boxShadow: {
        paper: '0 2px 12px rgba(107,90,62,0.12), 0 1px 3px rgba(107,90,62,0.08)',
        'paper-lg': '2px 4px 24px rgba(107,90,62,0.16), 0 1px 6px rgba(107,90,62,0.10)',
        'night': '0 4px 20px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        // Ghibli sky-to-meadow gradient (light mode)
        'ghibli-sky': 'linear-gradient(180deg, #c8dff0 0%, #dceef7 25%, #edf5f0 55%, #f0ebe0 80%, #f5f0e8 100%)',
        // Night sky gradient (dark mode)
        'ghibli-night': 'linear-gradient(180deg, #0f1525 0%, #1a1f35 40%, #1e2233 100%)',
      },
    },
  },
  plugins: [],
}

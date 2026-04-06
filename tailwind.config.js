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
        // Ghibli light palette
        cream:    '#fef6e4',
        parchment:'#f5e6c8',
        sage:     { DEFAULT: '#7a9e6e', light: '#b5d4a8', dark: '#4e7244' },
        dust:     '#e8956d',
        sky:      '#a8c8da',
        ink:      { DEFAULT: '#2d2416', light: '#6b5a3e', muted: '#9c8a70' },
        // Ghibli dark palette
        night:    { DEFAULT: '#1c1a2e', card: '#252340', border: '#3d3a60' },
      },
      boxShadow: {
        ghibli: '0 4px 20px rgba(45, 36, 22, 0.10), 0 1px 4px rgba(45, 36, 22, 0.06)',
        'ghibli-lg': '0 8px 32px rgba(45, 36, 22, 0.13), 0 2px 8px rgba(45, 36, 22, 0.07)',
        'night': '0 4px 20px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}

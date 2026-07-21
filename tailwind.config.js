/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // High-contrast monochrome brand palette
        brand: {
          DEFAULT: '#09090b', // Pitch Black in light mode
          light: '#71717a',   // Neutral zinc
          dark: '#ffffff',    // Pure White in dark mode
        },
        // Semantic colors (refined neutrals/accents)
        success: {
          DEFAULT: '#10b981',
          light: '#34d399',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
        },
        danger: {
          DEFAULT: '#ef4444',
          light: '#f87171',
        },
        // Surfaces — true pitch dark mode and crisp light mode
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#f4f4f5', // zinc-100
        },
        'surface-dark': {
          DEFAULT: '#000000', // Pitch Black (true dark mode like GitHub/Vercel/Linear)
          elevated: '#18181b', // Zinc-900
        },
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
};

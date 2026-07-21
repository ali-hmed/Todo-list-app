/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all app and src files for class names
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  // "media" automatically respects the device system color scheme (light/dark)
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Brand palette
        brand: {
          DEFAULT: '#7c3aed', // violet-700 — primary actions
          light: '#a78bfa',   // violet-400 — pressed/hover states
          dark: '#5b21b6',    // violet-800 — deep accent
        },
        // Semantic colors
        success: {
          DEFAULT: '#10b981', // emerald-500
          light: '#34d399',   // emerald-400 (dark mode)
        },
        warning: {
          DEFAULT: '#f59e0b', // amber-500
          light: '#fbbf24',   // amber-400 (dark mode)
        },
        danger: {
          DEFAULT: '#ef4444', // rose-500
          light: '#f87171',   // rose-400 (dark mode)
        },
        // App surfaces — light mode
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#f8fafc', // slate-50
        },
        // App surfaces — dark mode (used with dark: prefix)
        'surface-dark': {
          DEFAULT: '#1e293b', // slate-800
          elevated: '#334155', // slate-700
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
        touch: '44px', // minimum accessible touch target
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
};

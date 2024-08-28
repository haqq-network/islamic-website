const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const typographyPlugin = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,js,jsx,html,mdx}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'islamic-primary-green': '#01B26E',
        'islamic-primary-green-hover': '#0BD286',
        'islamic-primary-graphite': '#181E25A8',
        'islamic-classic-green': '#18FFAC',
        'islamic-classic-green-hover': '#99FFDA',
        'islamic-bg-black': '#010304',
      },
      fontFamily: {
        alexandria: ['var(--font-alexandria)'],
        handjet: ['var(--font-handjet)'],
        vcr: ['var(--font-vcr)'],
      },
      keyframes: {
        'scroll-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'scroll-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        reveal: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'scroll-left': 'scroll-left 60s linear infinite',
        'scroll-right': 'scroll-right 60s linear infinite',
        reveal: 'reveal 0.15s',
      },
      screens: {},
    },
  },
  plugins: [typographyPlugin],
};

module.exports = config;

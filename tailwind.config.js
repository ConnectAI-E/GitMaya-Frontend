import { nextui } from '@nextui-org/react';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.rainbow': {
          backgroundImage: 'linear-gradient(to right, #eab308, #ef4444, #ec4899)',
        },
        '.rainbow-text': {
          backgroundImage: 'linear-gradient(to right, #eab308, #ef4444, #ec4899)',
          color: 'transparent',
          'background-clip': 'text',
        },
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.bg-black-light-light': {
          'background-color': 'rgb(243,244,246)',
        },
      });
    }),
  ],
};

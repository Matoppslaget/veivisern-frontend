/* eslint-disable @typescript-eslint/no-require-imports */
const withMT = require('@material-tailwind/react/utils/withMT');
import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

type AddUtilitiesFn = (utilities: object) => void;

const config: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      amber: colors.amber,
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      transparent: 'transparent',
      yellow: colors.yellow,
      red: colors.red,
      stone: colors.stone,
      green: colors.green,
      lime: colors.lime,
    },
    extend: {
      screens: {
        sm: '680px',
        md: '880px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: AddUtilitiesFn }) {
      addUtilities({
        '.hide-cancel-button': {
          '&::-webkit-search-cancel-button': {
            '-webkit-appearance': 'none',
            appearance: 'none',
          },
        },
      });
    },
  ],
});

export default config;

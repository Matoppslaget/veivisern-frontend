const withMT = require("@material-tailwind/react/utils/withMT");
import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});

export default config;
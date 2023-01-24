/** @type {import('tailwindcss').Config} */

//TODO: Substituir por import.
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      slate: colors.slate,
    }
  },
  plugins: [],
}

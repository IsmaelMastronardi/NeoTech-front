/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'proxima-nova': ['Proxima Nova', 'Arial', 'sans-serif'],
      },
      colors: {
        'custom-orange': '#FF9900',
        'custom-orange-light': '#fca828',
        'custom-orange-dark': '#d48002',
        'black-1': '#151515',
        'light-black': '#1c1c1c',
        'ligther-verdigris': '#79fcf9',
        'light-gray': '#CDCDCD',
        'light-red': '#e03645',
        'custom-red': '#C72525',
        'dark-red': '#a12530',
        'semi-transparent-light-gray': 'rgba(211, 220, 230, 0.4)',
        'transparent-white': 'rgba(255, 255, 255, 0.5)',
      },
      border: {
        3: '3px',
      },
    },
  },
  plugins: [],
};

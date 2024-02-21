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
        'black-1': '#151515',
        'light-black': '#1c1c1c',
        'oxford-blue': '#0b132b',
        'space-cadet': '#1c2541',
        'ym-blue': '#3a506b',
        'light-blue': '#5b9bc0',
        'fluorescent-cyan': '#6fffe9',
        verdigris: '#5bc0be',
        'ligther-verdigris': '#79fcf9',
        'light-gray': '#CDCDCD',
        'light-red': '#e03645',
        'custom-red': '#D02E3C',
        'dark-red': '#a12530',
        'semi-transparent-light-gray': 'rgba(211, 220, 230, 0.4)',
        'transparent-white': 'rgba(255, 255, 255, 0.5)',
        'extra-transparent-indigo': 'rgba(54, 5, 104, 0.9)',
        'semi-transparent-indigo': 'rgba(54, 5, 104, 0.7)',
        'extra-transparent-tekheltet': 'rgba(91, 42, 134, 0.4)',
        'semi-transparent-tekheltet': 'rgba(91, 42, 134, 0.5)',
      },
    },
  },
  plugins: [],
};

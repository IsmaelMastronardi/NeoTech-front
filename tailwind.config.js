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
        'oxford-blue': '#0b132b',
        'space-cadet': '#1c2541',
        'ym-blue': '#3a506b',
        verdigris: '#5bc0be',
        'fluorescent-cyan': '#6fffe9',
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

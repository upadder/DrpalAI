/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-white': '#ffffff2b',
        'dark-grey': '#202123',
        'light-grey': '#353740',
        'dark-mode-bg': '#1E1E1E',
        'chat-area-bg': '#121212',
        'charcoal': '#1E1E1E',
        'greyish-black': '#121212',
      },
    },
  },
  plugins: [require('daisyui')],
};

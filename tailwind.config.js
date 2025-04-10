/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#FFDE02',
        secondary: '#1F3D99',
        neutral: '#474D66',
        'gray-lighter': '#F5F4F2',
        'gray-light': '#595957',
        'gray-dark': '#0D0D0C',
        'gray-darker': '#0C110D',
        border: '#C8CBD9',
        card: '#F9F9F7',
        beam: {
          300: '#D9D8D5',
          500: '#8C8C89',
          700: '#595957',
          800: '#3B3A39',
        },
      },
    },
  },
  plugins: [],
};

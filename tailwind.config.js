/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nyg: {
          blue: '#002A50',
          red: '#D31224',
          gold: '#F4B214',
          white: '#FFFEFA',
          black: '#102A43'
        },
        surface: {
          light: '#F8F9FF',
          dark: '#E9F1FF'
        }
      },
      fontFamily: {
        display: ['"Archivo Narrow"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'soft': '0px 4px 20px rgba(16, 42, 67, 0.05)'
      }
    },
  },
  plugins: [],
}

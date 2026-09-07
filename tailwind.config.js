/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        senac: {
          blue: '#004587',
          navy: '#002D59',
          orange: '#F37021',
          'orange-hover': '#E05D0D',
          light: '#F8FAFC',
          soft: '#EBF3FA',
          border: '#CBD5E1'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

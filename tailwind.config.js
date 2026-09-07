/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d6e0fd',
          300: '#b3c7fc',
          400: '#8aa6f9',
          500: '#6382f6',
          600: '#4361ee',
          700: '#324bcf',
          800: '#2a3ea7',
          900: '#273884',
        },
        slate: {
          850: '#151d2e',
          925: '#0b111e',
          950: '#060a12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Syne', 'Clash Display', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

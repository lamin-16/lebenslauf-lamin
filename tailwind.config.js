/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f8fc',
          100: '#edf1f9',
          200: '#d4ddf0',
          300: '#b3c3e5',
          400: '#8ea3d8',
          500: '#6b83cc',
          600: '#4a64b8',
          700: '#3b4fa3',
          800: '#2f3d86',
          900: '#1e2a5e',
        },
        royal: {
          navy: '#0f1b3d',
          gold: '#d4af37',
          goldLight: '#f0d98c',
          silver: '#c0c8d8',
          purple: '#5b4b8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(15, 27, 61, 0.3)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #0f1b3d 0%, #1e2a5e 50%, #2f3d86 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f0d98c 50%, #d4af37 100%)',
      },
    },
  },
  plugins: [],
}

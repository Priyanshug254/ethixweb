/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffe1e2',
          200: '#ffc8c9',
          300: '#ffa1a3',
          400: '#ff696c',
          500: '#e51d25',
          600: '#d1151d',
          700: '#b00e15',
          800: '#8a181c',
          900: '#760e13',
          DEFAULT: '#e51d25',
          accent: '#ff2d37',
        },
        surface: {
          950: '#060709',
          900: '#090a0d',
          850: '#0d0f14',
          800: '#12151d',
          750: '#171a24',
          700: '#1f2430',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(229, 29, 37, 0.35)',
        'glow': '0 0 35px -5px rgba(229, 29, 37, 0.45)',
        'glow-lg': '0 0 50px -5px rgba(229, 29, 37, 0.55)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

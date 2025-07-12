/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        accent: '#F59E0B',
        background: '#F3F4F6',
        dark: '#1F2937'
      },
       animation: {
      'fade-in': 'fadeIn 3s ease-out forwards',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(15px)' },
        '50%': { opacity: 0.5, transform: 'translateY(8px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
    }
  },
  plugins: []
}

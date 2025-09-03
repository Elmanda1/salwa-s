// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-background': '#FFFBFB', // Putih dengan sentuhan pink
        'brand-text': '#4B4242',       // Abu-abu hangat
        'brand-primary': '#E11D48',   // Pink (Rose 700)
        'brand-primary-light': '#F472B6', // Pink muda (Pink 400)
        'brand-secondary': '#E5E7EB', // Abu-abu muda untuk border
        'brand-correct': '#10B981',   // Hijau
        'brand-incorrect': '#EF4444', // Merah
      },
    },
  },
  plugins: [],
}
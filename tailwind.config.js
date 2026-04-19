/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Charter', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#1a1a2e',
        paper: '#faf8f3',
      },
    },
  },
  plugins: [],
}
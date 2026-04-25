/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1a1a2e',
        paper: '#faf8f3',
        muted: '#6b6358',
        border: '#e8e2d5',
        original: '#f3efe8',
        text_border: '#c9bfa8',
        text_blue: '#2b4c7e',
        back_blue: '#ecf0f6',
        box_white: '#ffffff',
        button_blue: '#223e68',
      },
    },
  },
  plugins: [],
  
}


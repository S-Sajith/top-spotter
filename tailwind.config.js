/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        customBg: '#282c34',
        spotifyGreen: '#1db954',
        whiteColor: '#fdfdfd',
        greyBg: '#212327'
      },
    },
  },
  plugins: [],
}


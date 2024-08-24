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
        brandPurple: '#7F00FF',
        whiteColor: '#fdfdfd',
        greyBg: '#212327'
      },
    },
  },
  plugins: [],
}


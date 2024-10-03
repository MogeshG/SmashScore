/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        electricBlue: '#00C9FF',
        neonGreen: '#92FE9D',
        darkNavyBlue: '#003366',
        white: '#FFFFFF',
        charcoalGray: '#333333',
        vibrantGreen: '#39FF14',
        lightCyan: '#E0FFFF',
        mintGreen: '#A8E6CF',
        darkTeal: '#008080',
        lightGreenHover: '#9EFE2D',
        lightBlueHover: '#7ADFF2',
        primary: '#9B00FF'
      },
    },
  },
  plugins: [],
}

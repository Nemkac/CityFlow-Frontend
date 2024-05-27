/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, ts}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      manrope: ["Manrope", "sans-serif"]
    },
    colors:{
      darkGrey: "#2F3640",
      grey: "#353B48",
      lightGrey: "#DCDDE1",
      white: "#F5F6FA",
      yellow: "#FBC531",
      deepGreen: "#44BD32",
      lightGreen: "#4CD137",
      deepRed: "#C23616",
      lightRed: "#E84118",
      deepBlue: "#192A56",
      lightBlue: "#273C75",
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    }
  },
  plugins: [],
}


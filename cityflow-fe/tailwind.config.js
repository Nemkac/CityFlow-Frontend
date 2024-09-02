/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {},
    fontFamily:{
      manrope: ["Poppins", "sans-serif"]
    },
    colors:{
      darkGrey: "#2F3640",
      grey: "#353B48",
      lightGrey: "#DCDDE1",
      white: "#FFFFFF",
      deepGreen: "#44BD32",
      lightGreen: "#4CD137",
      deepRed: "#C23616",
      lightRed: "#E84118",
      deepBlue: "#192A56",
      lightBlue: "#273C75",
      cityRoutes: "#E6C79C",
      suburbanRoutes : "#7389AE",

      primaryDarkGreen : "#025864",
      primaryLightGreen: "#00D47E",
      primaryWhite : "#FFFFFF",
      primaryGrey : "#a6a9ac",
      primaryYellow: "#FB9600",
      sideMenuBg : "#f6f7f9",

      primaryBlue : "#247BA0",
      primaryGreen : "#39b36a",
      primaryBlack: "#032123",
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
  plugins: [
    require('flowbite/plugin')
  ],
}


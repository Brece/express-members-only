/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {},
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    colors: {
      "primary": "#d3a55f",
      "bg": "#c5c5c5",
      "dark": "#3c4856",
      "danger": "#e6575c",
      "white": "#ffffff",
      "black": "#000000",
    }
  },
  plugins: [],
}

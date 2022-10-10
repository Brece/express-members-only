/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {},
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    colors: {
      "primary": "#00e5af",
      "secondary": "#db61ce",
      "secondary-dark": "#3e003a",
      "bg": "#c5c5c5",
      "dark": "#474555",
      "light": "#efefdc",
      "danger": "#e6575c",
      "white": "#ffffff",
      "black": "#000000",
    }
  },
  plugins: [],
}

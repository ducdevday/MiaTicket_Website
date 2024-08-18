/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      colors: {
        "primary-dark": "#B27600",
        primary: "#F7A911",
        "primary-light": "#F6B027",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
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
        background: "#27272a",
        "background-blue": "#393f4e",
        "gray-C9": "#C9C9C9",
        "gray-9": "#999999",
      },
    },
  },
  plugins: [],
};

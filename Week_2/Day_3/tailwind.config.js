/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        "3xl": "1728px",
      },
      colors: {
        "orange-yellow": "#FC8A06",
      },
    },
  },

  plugins: [],
};

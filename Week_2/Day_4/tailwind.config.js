/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "light-green": "#26C2AE",
        "light-green-dark": "#1D9E8E",
        "light-green-deep": "#167A6E",

        "sea-green": "#00474B",
        "sea-green-dark": "#003B3E",
        "sea-green-deep": "#002F31",

        "gray-1": "#5E7A7D",
        "gray-2": "#7F9D9F",
        "gray-3": "#C5E4E7",
        "gray-4": "#F4FAFA",
      },
      fontFamily: {
        space: ['"Space Mono"', "monospace"],
      },
      boxShadow: {
        "shadow-black": "0 6px 12px rgba(0, 0, 0, 0.5)",
        "shadow-teal": "0 0 18px #167A6E",
      },
    },
  },
  plugins: [],
};

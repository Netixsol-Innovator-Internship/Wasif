/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],

  darkMode: "class", // Enables dark mode using the class strategy

  theme: {
    extend: {
      //theme extensions here
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        imperial: ['"Imperial Script"', 'cursive'],
      },
      backgroundImage: {
        "landing-bg": "url('../public/assets/images/Landing.png')",
         "destination-1": "url('../public/assets/images/D1.png')",
         "destination-2": "url('../public/assets/images/D2.png')",
         "destination-3": "url('../public/assets/images/D3.png')",
         "destination-4": "url('../public/assets/images/D4.png')",
         "destination-5": "url('../public/assets/images/D5.png')",
         "destination-6": "url('../public/assets/images/D6.png')",
         "destination-bg": "url('../public/assets/images/DestinationBg.png')",
         "desert-bg": "url('../public/assets/images/Desert.png')",
         "explore-bg": "url('../public/assets/images/ExploreBg.png')",
         "neom-bg": "url('../public/assets/images/neom.png')",
         "about-bg": "url('../public/assets/images/aboutbg.png')",
         "ksa-bg": "url('../public/assets/images/KSA.png')",




      },
      
    },
  },

  plugins: [],
};

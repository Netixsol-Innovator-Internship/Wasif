/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],


  theme: {
    extend: {
      //theme extensions here
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        imperial: ['"Imperial Script"', "cursive"],
        spacemono: ['"Space Mono"', "monospace"],
        worksans: ['"Work Sans"', "sans-serif"],
        clash: ['"Clash Display"', "sans-serif"],
      },
      backgroundImage: {
        "landing-bg": "url('./public/assets/images/LandingBg.png')",
        "footer-bg": "url('./public/assets/images/FooterBg.png')",
        "collectors-bg": "url('./public/assets/images/CollectorsBg.png')",
        "roadmap-bg": "url('./public/assets/images/RoadMapbg.png')",
      },
      screens: {
        "3xl": "1728px",
      },
    },
  },

  plugins: [],
};

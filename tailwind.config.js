/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "./sections/**/*.{html,js,jsx}",
    "./styles/**/*.{js,jsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-black": "#1A232E",
        "secondary-white": "#c7c7c7",
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
      keyframes: {
        line: {
          "from": { flex: 0 },
          "to": { flex: 1 },
        },
        hider: { "100%": { width: 0 } },
        logo: {
          "0%": { opacity: ".2" },
          "20%": { opacity: "1"},
          "50%": { opacity: ".5"},
          "75%": { opacity: ".2"},
          "100%": { opacity: "1"},
      }
      },
    },
    animation: {
      line: "line 2s ease-out forwards",
      hider: "hider 2s ease-out forwards",
      logo: "logo .5s ease-out forwards"
    },
  },
  plugins: [],
}

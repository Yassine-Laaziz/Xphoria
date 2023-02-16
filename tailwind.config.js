/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,ts,tsx}",
    "./components/**/*.{html,ts,tsx}",
    "./sections/**/*.{html,ts,tsx}",
    "./styles/**/*.{ts,tsx}",
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
          from: { flex: 0 },
          to: { flex: 1 },
        },
        hider: { "100%": { width: 0 } },
        logo: {
          "0%": { opacity: 0.2 },
          "10%": { opacity: 1 },
          "30%": { opacity: 0 },
          "50%": { opacity: 0 },
          "60%": { opacity: 1 },
          "70%": { opacity: 0.5 },
          "80%": { opacity: 0.2 },
          "100%": { opacity: 1 },
        },
        bigger: { to: { width: "125%", height: "125%" } },
        rotate: {
          from: { rotate: "0deg" },
          to: { rotate: "360deg" },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: "100%" } },
        fadeOut: { from: { opacity: "100%" }, to: { opacity: 0 } },
      },
    },
    animation: {
      line: "line 2s ease-out forwards",
      hider: "hider 2s ease-out forwards",
      logo: "logo 1s ease-out forwards",
      bigger: "bigger .25s ease-out forwards",
      rotate: "rotate 10s linear infinite",
      fadeIn: "fadeIn .3s ease forwards",
      fadeOut: "fadeOut .3s ease forwards",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("c", "& > *") //stands for child
    },
  ],
}

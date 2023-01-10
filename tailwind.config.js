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
        bigger: {
          from: {
            width: "100%",
            height: "100%",
          },
          to: {
            width: "125%",
            height: "125%",
          },
        },
        rotate: {
          from: {rotate: "0deg"},
          to: {rotate: "360deg"}
        }
      },
      slideToLeft: {to: {left: '5%'}},
      slideToMiddle: {to: {left: '50%', translate: '-50%'}},
      slideToLeft: {to: {right: '5%'}},
    },
    animation: {
      line: "line 2s ease-out forwards",
      hider: "hider 2s ease-out forwards",
      logo: "logo 1s ease-out forwards",
      bigger: "bigger .25s ease-out forwards",
      rotate: "rotate 10s linear infinite",
      slideToLeft: "slideToLeft 2s linear forwards",
      slideToMiddle: "slideToMiddle 2s linear forwards",
      slideToRight: "slideToRight 2s linear forwards",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("c", "& > *") //stands for child
    },
  ],
}

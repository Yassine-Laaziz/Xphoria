/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{html,ts,tsx}',
    './components/**/*.{html,ts,tsx}',
    './sections/**/*.{html,ts,tsx}',
    './styles/**/*.{ts,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
        silkscreen: ['var(--font-silkscreen)'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      keyframes: {
        rotate: {
          from: { rotate: '0deg' },
          to: { rotate: '360deg' },
        },
      },
      animation: {
        rotate: 'rotate 10s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('c', '& > *') //stands for child
    },
  ],
}

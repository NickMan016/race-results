/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'none': 1
      },
      animation: {
        'skeleton': 'pulse 2.5s linear infinite'
      },
      dropShadow: {
        'image': '0px 0px 1px #fff',
        'flag': '0px 0px 2px #000',
        'flag-dark': '0px 0px 2px #fff'
      }
    },
  },
  plugins: [],
}


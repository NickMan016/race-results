/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'skeleton': 'pulse 2.5s linear infinite'
      },

    },
  },
  plugins: [],
}

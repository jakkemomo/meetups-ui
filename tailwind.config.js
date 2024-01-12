/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '860': '860px',
        '610': '610px',
        '358': '358px',
        '52': '52px',
        '390': '390px',
      },
      fontSize: {
        '22': '22px',
        '17': '17px',
        '51': '51px'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '860': '860px',
        '600': '600px',
      },
      fontSize: {
        '40': '40px',
        '34': '34px',
        '50': '50px'
      },
      height: {
        '50': '50px',
        '700': '700px',
      },
      colors: {
        'main-purple': 'rgb(87, 84, 198)',
        'custom-gray': 'rgb(237, 237, 237)',
        'main-dark-blue': 'rgb(49, 46, 112)',
        'light-gray': 'rgb(255, 250, 250)'
      },
      padding: {
        '60': '60px',
        '90': '90px',
        '102': '102px'
      },
      margin: {
        '18': '18px'
      },
      boxShadow: {
        'custom': '0 14px 30px 0px rgba(71, 32, 89, 0.3)',
      }
    },
  },
  plugins: [],
}

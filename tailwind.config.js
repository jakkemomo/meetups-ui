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
        '500': '500px'
      },
      maxWidth: {
        'screen-max': '1440px',
      },
      fontSize: {
        '40': '40px',
        '34': '34px',
        '50': '50px',
        'lg': ['18px', '23px'],
        '18': '18px'
      },
      height: {
        '48px': '48px',
        '50': '50px',
        '700': '700px',
        '600': '600px'
      },
      colors: {
        'main-purple': 'rgb(87, 84, 198)',
        'custom-gray': 'rgb(237, 237, 237)',
        'main-dark-blue': 'rgb(49, 46, 112)',
        'light-gray': 'rgb(255, 250, 250)',
        'hover-pink': 'rgb(188, 115, 206)',
        'input-error': 'rgb(202, 106, 106)'
        'light-gray': 'rgb(240, 240, 238)',
        'transparent-gray': 'rgb(255, 250, 250)',
        'text-gray': 'rgb(84, 84, 84)',
        'text-black': 'rgb(46, 46, 46)',
        'text-red': 'rgb(187, 16, 16)',
      },
      padding: {
        '60': '60px',
        '90': '90px',
        '102': '102px',
        '30': '30px',
      },
      margin: {
        '18': '18px',
        '50': '50px',
        '107': '107px'
      },
      boxShadow: {
        'custom': '0 14px 30px 0px rgba(71, 32, 89, 0.3)',
      },
      backgroundImage: {
        'logo': "url('images/logo.svg')",
        'filter-icon': "url('images/filter-icon.svg')",
        'map-marker-icon': "url('images/map-marker-icon.svg')",
        'burger-menu-icon': "url('images/burger-menu-icon.svg')",
        'right-arrow': "url('images/right-arrow.png')",
      }
    },
  },
  plugins: [],
}

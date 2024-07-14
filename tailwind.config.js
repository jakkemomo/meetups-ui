/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('tailwind-scrollbar')
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'hoverscreen': {'raw': '(hover: hover)'}
    },
    extend: {
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
      },
      width: {
        "860": "860px",
        "600": "600px",
        "500": "500px",
      },
      maxWidth: {
        "screen-max": "1440px",
      },
      fontSize: {
        "40": "40px",
        "34": "34px",
        "38": "38px",
        "50": "50px",
        "lg": ["18px", "23px"],
        "18": "18px",
      },
      height: {
        "48px": "48px",
        "50": "50px",
        "700": "700px",
        "600": "600px",
      },
      colors: {
        'main-purple': 'rgb(87, 84, 198)',
        'main-violet': 'rgba(73, 70, 185, 1)',
        'custom-gray': 'rgb(243, 243, 245)',
        'main-dark-blue': 'rgb(49, 46, 112)',
        'hover-pink': 'rgb(188, 115, 206)',
        'input-error': 'rgb(202, 106, 106)',
        'light-gray': 'rgb(240, 240, 238)',
        'gray': 'rgb(229, 229, 227)',
        'transparent-gray': 'rgb(255, 250, 250)',
        'text-gray': 'rgb(84, 84, 84)',
        'text-light-gray': 'rgb(153, 153, 153);',
        'text-black': 'rgb(46, 46, 46)',
        'text-red': 'rgb(187, 16, 16)',
        'popup-bg': 'rgba(26, 26, 26, .4)',
        'toggle-color': 'rgb(185, 185, 186, 1)',
        'select-disable': 'rgba(191, 189, 189, 1)',
        'but-disable': 'rgb(177, 177, 187)',
        'but-primary': 'rgb(94, 92, 206)',
        'but-primary-hover': 'rgb(87, 85, 189)',
        'but-primary-active': 'rgb(77, 75, 169)',
        'but-second': 'rgb(230, 229, 255)',
        'but-second-hover': 'rgb(216, 215, 241)',
        'but-second-active': 'rgb(194, 193, 228)',
        'but-orange': 'rgb(246, 125, 125)',
        'edit-profile-shadow': 'rgba(38, 38, 38, .42)',
        'text-disable': 'rgb(172, 172, 173)'
      },
      padding: {
        "60": "60px",
        "90": "90px",
        "102": "102px",
        "30": "30px",
      },
      margin: {
        "18": "18px",
        "101": "101px",
        "50": "50px",
        "107": "107px",
      },
      boxShadow: {
        custom: "0 14px 30px 0px rgba(71, 32, 89, 0.3)",
        'shadow-bm': [
          '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
          '0 4px 32px 0 rgba(0, 0, 0, 0.14)'
      ]
      },
      backgroundImage: {
        'logo': "url('/images/logo.svg')",
        'filter-icon': "url('/images/filter-icon.svg')",
        'map-marker-icon': "url('images/map-marker-icon.svg')",
        'burger-menu-icon': "url('images/burger-menu-icon.svg')",
        'right-arrow': "url('images/right-arrow.png')",
        'black-right-arrow': "url('/images/black-right-arrow.png')",
        'heart-icon': "url('images/heart-icon.png')",
        'rating-star': "url('images/rating-star.png')",
        'text-fade-out': "linear-gradient(to right, transparent, #E5E5E3 50%)",
        'slider-fade-out': "linear-gradient(to right, transparent, #FFFEFC 60%)",
        'close-cross': "url('images/close-cross.svg')",
        'close-cross-purple': "url('/images/close-cross-purple.svg')",
        'check': "url('/images/check.svg')",
        'event-card-people': "url('images/event-card-people.png')",
        'selector-triangle': "url('images/selector-triangle.png')",
        'chevron-down-white': "url('/images/chevron-down-white.svg')",
        'chevron-down-black': "url('/images/chevron-down-black.svg')",
        'edit-pen-icon': "url('/images/edit-pen-icon.svg')",
        'link-icon': "url('/images/link-icon.svg')",
        'chevron-left-purple': "url('/images/chevron-left-purple.svg')",
        'gallery-icon': "url('/images/gallery-icon.svg')",
        'plus-icon': "url('/images/plus-icon.svg')",
        'edit-photo': "url('/images/edit-photo.svg')",
        'review-text-fade-out': "linear-gradient(90deg, rgba(243,243,245,0) 6%, rgba(243,243,245,1) 75%, rgba(243,243,245,1) 100%)",
        'slider-fade-out-xl': "linear-gradient(to right, transparent, #FFFEFC 60%)",
      },
      borderRadius: {
        "12": "12px",
        "circle": "50%",
        'def': '10px'
      },
      lineHeight: {
        'def': '22.59px'
      }
    },
  },
}

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
        // Here you can find any colors you need for your design.
        // Please use colors from here for any parts of the project
        // and do not add new ones without the approval of the designer
        'main-violet-50': '#f0f4fd',
        'main-violet-100': '#e4eafb',
        'main-violet-200': '#cfd9f6',
        'main-violet-300': '#b1bef0',
        'main-violet-400': '#929de7',
        'main-violet-500': '#777ddd',
        // Primary violet color
        'main-violet-600': '#5e5cce',
        'main-violet-700': '#514db5',
        'main-violet-800': '#424093',
        'main-violet-900': '#3a3a75',
        'main-violet-950': '#232244',
        'main-lavender-50': '#f7f8fb',
        'main-lavender-100': '#F4F4FB',
        'main-lavender-200': '#e2e2f2',
        'main-lavender-300': '#c2c1e4',
        'main-lavender-400': '#afabda',
        'main-lavender-500': '#9189c9',
        'main-lavender-600': '#7d6eb9',
        'main-lavender-700': '#6b5ca5',
        'main-lavender-800': '#5a4d8a',
        'main-lavender-900': '#4b4072',
        'main-lavender-950': '#2f294c',
        'secondary-50': '#f6f6f7',
        // Primary gray background color.
        // User for shared/Input, shared/SelectInput and so on
        'secondary-100': '#eeeff1',
        'secondary-200': '#e0e1e5',
        'secondary-300': '#cdcdd4',
        'secondary-400': '#b1b1bb',
        'secondary-500': '#a6a5af',
        // Primary gray text color
        'secondary-600': '#918f9c',
        'secondary-700': '#7d7b87',
        'secondary-800': '#67656e',
        'secondary-900': '#56545b',
        'secondary-950': '#313135',
        'system-50': '#fbf5f5',
        'system-100': '#f8e8e8',
        'system-200': '#f3d5d5',
        'system-400': '#db8e8e',
        // Primary error text color
        'system-500': '#ca6a6a',
        'system-800': '#7e3636',
        // TODO: change when design is ready
        'text-black': 'rgb(46, 46, 46)',
        'edit-profile-shadow': 'rgba(38, 38, 38, .42)'
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
        ],
        select: "0px 1.33px 3.15px 0px #25253F07, 0px 5.87px 6.52px 0px #25253F0B, 0px 14.4px 13px 0px #25253F0E, 0px 27.73px 25.48px 0px #25253F11, 0px 46.67px 46.85px 0px #25253F15, 0px 72px 80px 0px #25253F1C"
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

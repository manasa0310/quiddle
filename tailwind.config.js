/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        zoomout: 'zoomout 3s  infinite',
      },
      keyframes: {
        zoomout: {
          '0%': {
            transform: 'scale(0.7)',
            rotate: '0deg',
          },

          '50%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(0.7)',
            rotate: '360deg',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

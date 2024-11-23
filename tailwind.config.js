/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#FDC1C5",
        pink2: "#F0AABB",
        gray2: "#E8E9F1",
        yellow: "#FFFBDF",
      },
      fontSize: {
        'xxs': '10px',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
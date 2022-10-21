/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      backgroundImage: {
        'about-cover': "url('./public/assets/logo.jpg')"
      }
    }
  },
  plugins: []
};

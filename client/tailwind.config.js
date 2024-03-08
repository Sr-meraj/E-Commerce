/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#088178",
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [
    require("daisyui"), 
  ],

}


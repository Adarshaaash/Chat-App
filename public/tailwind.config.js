/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#282c34", // Dark background color
        "custom-blue": "#61dafb", // Light blue color
      },
    },
  },
  plugins: [],
};

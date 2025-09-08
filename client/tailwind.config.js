/** @type {import('tailwindcss').Config} */
module.exports = 
{
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  safelist: [
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  ],
  theme: 
  {
    extend: {}
  },
  plugins: []
};
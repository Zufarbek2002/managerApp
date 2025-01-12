/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primaryColor: "#2C3030",
      secondaryColor: '#9A9C9C',
      darkGreen: "#14B890",
      darkRed: "#F44336",
      lightGreen: "#52C41A",
      lightRed: "#FF8A00",
      textDarkGrey: "#4E4E4E",
      paginationGreen: "#14B890",
      sidebarBgColor: '#F3F3F3'
    }
  },
  plugins: [],
}
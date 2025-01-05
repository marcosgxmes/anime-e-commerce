/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorTotal: "#004280",
        color: "#333",
        border: "#4e4e4e",
        dark: "#212429",
        footer: "#102341",
        header: "#333",
        price: "#28C76F",
        verdeLima: "#90ff00",
        backgroundButton: "#f2f2f2",
        azul: "#3259eb",
        text: "#353531",
        red: "#DA291C",
        orange: "#FA8900",
        yellow: "#fff200",
        purple: "#3E31FA",
        background: "#f1f5f9",
        bgDark: "#2d3137",        
        grayText: "#e2e2e2",
        bgInput: "#EDEFF2",
        iconColor: "#607D8B"
      },
      fontFamily: {
        Rototo: ["Roboto"]         
            
       }, 
    },
  },
  plugins: [],
}



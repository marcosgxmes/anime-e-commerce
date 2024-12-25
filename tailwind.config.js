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
        footer: "#212429",
        //footer: "#3259eb",
        header: "#333",
        verde: "#28c76f",
        verdeLima: "#90ff00",
        backgroundButton: "#f2f2f2",
        azul: "#3259eb",
        text: "#353531",
        red: "#DA291C",
        //background: "#f1f5f9",
        background: "#2d3137",
        fontFamily: { Rototo: ["Roboto"]},   
        
        
        texts: "#e2e2e2"
      }
    },
  },
  plugins: [],
}



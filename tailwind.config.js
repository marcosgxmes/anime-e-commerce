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
        border: "#cdcdcd",
        background: "#f2f2f2;",
        footer: "#3259eb",
        header: "#333",
        verde: "#28c76f",
        backgroundButton: "#f2f2f2",
        text: "#343d55",
        red: "#DA291C",
        fontFamily: { Rototo: ["Roboto"]}
        
      }
    },
  },
  plugins: [],
}



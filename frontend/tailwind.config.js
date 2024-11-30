/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#0c1c10",
        background: "#f3faf5",
        primary: "#5eba70",
        secondary: "#9dc7d5",
        accent: "#718dc1",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
};

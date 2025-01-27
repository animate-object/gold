/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.625rem",
        tiny: "0.5rem",
      },
    },
  },
  plugins: [],
};

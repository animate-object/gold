/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.625em",
        tiny: "0.5em",
        xt: "0.475em",
      },
    },
  },
  plugins: [],
};

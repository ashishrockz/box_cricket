import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {colors: {
      cricket: {
        green: "#3aa655",
        blue: "#2563eb",
      },
    },}
  },
  plugins: []
};

export default config;

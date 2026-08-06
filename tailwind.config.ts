import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        band: "#F1EFEA",
        ink: "#17140F",
        inkdim: "#5B564A",
        line: "#DAD5C8",
        dark: "#262421",
        darkdim: "#C9C4B6",
        darkline: "#4A463C",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      borderRadius: {
        card: "10px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;

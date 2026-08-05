import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15130F",
        inkline: "#2A2620",
        parchment: "#EAE3D3",
        parchmentdim: "#C9BFA8",
        brass: "#B08D4F",
        brassdim: "#8A6E3C",
        oxblood: "#6E2A2A",
        oxbloodbright: "#9C3B3B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-space-mono)"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;

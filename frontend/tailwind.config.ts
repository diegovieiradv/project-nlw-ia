import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#1e293b",
        "surface-light": "#334155",
        accent: "#8b5cf6",
        "accent-hover": "#7c3aed",
        user: "#3b82f6",
        "user-hover": "#2563eb",
        assistant: "#8b5cf6",
        border: "#475569",
        muted: "#94a3b8",
      },
    },
  },
  plugins: [],
};

export default config;

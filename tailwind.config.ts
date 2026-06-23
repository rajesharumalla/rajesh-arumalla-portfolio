import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        void: "#030507",
        panel: "rgba(9, 18, 22, 0.62)",
        cyan: "#55f7e7",
        magenta: "#ff4ed8",
        amber: "#ffc857",
        lime: "#b7ff5f",
      },
      boxShadow: {
        glow: "0 0 32px rgba(85, 247, 231, 0.18)",
        magenta: "0 0 34px rgba(255, 78, 216, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;

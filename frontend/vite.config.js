import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base : "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    brand: ["Space Grotesk", "sans-serif"],
    serif: ["Playfair Display", "serif"],
    sans: ["Inter", "sans-serif"],
  },

  theme: {
    extend: {
      colors: {
        bg: "#06141B",
        panel: "#11212D",
        surface: "#253745",
        muted: "#4A5C6A",
        textMuted: "#9BA8AB",
        textLight: "#CCD0CF",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
    },
  },
});
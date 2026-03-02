import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EZLY Brand Colors
        "ezly-navy": "#0F3A7D",
        "ezly-teal": "#06B6D4",
        "ezly-orange": "#F97316",
        // Legacy fallbacks
        primary: "#0F3A7D",      // Navy
        secondary: "#06B6D4",    // Teal
      },
    },
  },
  plugins: [],
}

export default config

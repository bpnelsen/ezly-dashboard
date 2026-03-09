import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EZLY Brand Colors - Primary Palette
        navy: {
          50: "#F0F4F9",
          100: "#E1E9F3",
          200: "#C3D3E7",
          300: "#A5BDDB",
          400: "#5E8EC7",
          500: "#0F3A7D",
          600: "#0D3166",
          700: "#0B2852",
          800: "#091E3E",
          900: "#06152A",
        },
        teal: {
          50: "#F0FDFD",
          100: "#E0FBFB",
          200: "#C0F7F7",
          300: "#A0F3F3",
          400: "#60EDED",
          500: "#06B6D4",
          600: "#059AB8",
          700: "#047A99",
          800: "#036B87",
          900: "#025060",
        },
        orange: {
          50: "#FFF7ED",
          100: "#FFEDDB",
          200: "#FFDBB7",
          300: "#FFC993",
          400: "#FFA54D",
          500: "#F97316",
          600: "#E8620D",
          700: "#C44536",
          800: "#9E3410",
          900: "#78240D",
        },
        // Brand Aliases
        primary: {
          50: "#F0F4F9",
          100: "#E1E9F3",
          200: "#C3D3E7",
          300: "#A5BDDB",
          400: "#5E8EC7",
          500: "#0F3A7D",
          600: "#0D3166",
          700: "#0B2852",
          800: "#091E3E",
          900: "#06152A",
        },
        secondary: {
          50: "#F0FDFD",
          100: "#E0FBFB",
          200: "#C0F7F7",
          300: "#A0F3F3",
          400: "#60EDED",
          500: "#06B6D4",
          600: "#059AB8",
          700: "#047A99",
          800: "#036B87",
          900: "#025060",
        },
        accent: {
          50: "#FFF7ED",
          100: "#FFEDDB",
          200: "#FFDBB7",
          300: "#FFC993",
          400: "#FFA54D",
          500: "#F97316",
          600: "#E8620D",
          700: "#C44536",
          800: "#9E3410",
          900: "#78240D",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config

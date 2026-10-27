// Tokens from the Figma file "Ambler design - Venta - 2026", page
// "Styleguide and Spacing" (variables collection "Token Set").
// Names follow the Figma variables so they can move into the Hyvä theme's
// tailwind.config.js unchanged.
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{njk,html,md,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#269fed",
          200: "#0b86d5",
          300: "#005d99",
          400: "#005085",
          500: "#004776", // brand primary, buttons, links
          600: "#003b61",
          700: "#003152", // dark text, button hover
          800: "#00253d",
          900: "#001c2e", // button loading/pressed
          DEFAULT: "#004776",
        },
        secondary: {
          100: "#f1f5f8", // light section / card-title background
          200: "#dee7ed", // borders
          300: "#97a2b4",
          400: "#4e6284", // body text
          500: "#3d556f",
          600: "#2b3746",
          700: "#0c2a4b", // headings
          800: "#19222e",
          900: "#0f141c",
        },
        grayscale: {
          50: "#f7f7f7",
          200: "#f0f0f0",
          300: "#dedede",
          400: "#d1d1d1",
          500: "#b8b8b8",
          600: "#9e9e9e",
          700: "#858585",
          800: "#6b6b6b",
          900: "#525252",
        },
        accent: { DEFAULT: "#f58220", dark: "#dd6f12" }, // orange CTAs (search, cart, hero)
        outline: "#dde7ee", // colors/elements/backgrounds/gray-outline
        card: "#3a526d", // product / brand card border
        menu: "#f5f8fa", // mega menu panel
        sale: "#c41800",
        success: { DEFAULT: "#00700b", light: "#b8e5bc" },
        info: { DEFAULT: "#1d4ed8", light: "#b8c4e5" },
        warning: { DEFAULT: "#c69b00", light: "#e5dbb8" },
        error: { DEFAULT: "#8e0000", light: "#e5b8b8" },
        heading: "#0c2a4b",
        body: "#4e6284",
        ink: "#003152",
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // text/*
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        // web/heading/*
        h6: ["14px", "20px"],
        h5: ["16px", "24px"],
        h4: ["20px", "28px"],
        h3: ["24px", "32px"],
        h2: ["32px", "40px"],
        h1: ["40px", "48px"],
        hero: ["56px", "64px"],
      },
      letterSpacing: { title: "-0.02em" },
      borderRadius: { DEFAULT: "4px" },
      boxShadow: {
        100: "0 5px 10px 0 rgba(31, 41, 55, 0.10)",
        200: "0 10px 20px 0 rgba(31, 41, 55, 0.10)",
        300: "0 15px 30px 0 rgba(31, 41, 55, 0.10)",
        400: "0 20px 40px 0 rgba(31, 41, 55, 0.15)",
        top: "0 10px 40px 0 rgba(0, 0, 0, 0.20)",
        bar: "0 -5px 10px 0 rgba(31, 41, 55, 0.10)",
      },
      maxWidth: { content: "1536px" },
    },
  },
  plugins: [],
};

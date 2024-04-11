/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Instagram-like color scheme
        accent: {
          1: "var(--color-accent1)", // Alpha value removed (no transparency)
          2: "var(--color-accent2)", // Alpha value removed (no transparency)
        },
        primary: "var(--color-accent1)",
        secondary: "var(--color-accent2)",
        background: "var(--color-bkg)", // Alpha value removed (no transparency)
        backgroundSecondary: "var(--color-bkg2)", // Alpha value removed (no transparency)
        content: "var(--color-content)", // Alpha value removed (no transparency)
        gradient: "var(--color-gradient)", // Alpha value removed (no transparency)
      },
      animation: {
        // Instagram-like animation durations
        "spin-slower": "spin 35s ease infinite",
        "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
}


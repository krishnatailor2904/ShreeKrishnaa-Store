/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0E5B54",
          50: "#EAF3F1",
          100: "#CFE4E0",
          200: "#9FC9C1",
          300: "#6FAEA2",
          400: "#3F9383",
          500: "#0E5B54",
          600: "#0C4E48",
          700: "#0A403B",
          800: "#07322E",
          900: "#052421",
        },
        ink: "#12201E",
        ivory: "#FAF7F0",
        brass: {
          DEFAULT: "#B8892E",
          light: "#D9AE5C",
          dark: "#8F6A21",
        },
        peacock: "#1B4B6B",
        sage: "#DCE6E1",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Work Sans'", "sans-serif"],
        badge: ["'Oswald'", "sans-serif"],
      },
      boxShadow: {
        plate: "0 20px 45px -15px rgba(14, 91, 84, 0.35)",
      },
      backgroundImage: {
        "brushed-metal": "linear-gradient(135deg, #e8e8e8 0%, #cfcfcf 20%, #f5f5f5 40%, #bdbdbd 60%, #e8e8e8 80%, #d4d4d4 100%)",
      },
    },
  },
  plugins: [],
}

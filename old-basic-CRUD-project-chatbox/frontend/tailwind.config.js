/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Scans your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Essential: Scans all JS/TS/JSX/TSX files in src/
  ],
  theme: {
    extend: {
      // While you can still use this for JS-based theme extension (backward compatibility),
      // the CSS-first approach using `@theme` in `src/index.css` is preferred for v4.
      // colors: {
      //   blush: "#efd9ce",
      //   lavender: "#dec0f1",
      //   orchid: "#b79ced",
      //   violet: "#957fef",
      //   indigoRich: "#7161ef",
      //   ink: "#2E2E3A",
      //   fog: "#A3A3B8",
      // },
    },
  },
  plugins: [],
};

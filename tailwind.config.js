import { nextui } from "@nextui-org/react";

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textColor: theme => ({
        secondary: theme("colors.zinc.500"),
        "accent-primary": theme("colors.blue.500"),
      }),
      boxShadow: {
        "glow-red": "0 0 5px 1px #b91c1c",
        "glow-green": "0 0 5px 1px #16a34a",
        "glow-blue": "0 0 5px 1px #2563eb",
        "glow-yellow": "0 0 5px 1px #eab308",
      },
    },
  },
  plugins: [nextui()],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "glow-red": "0 0 5px 1px #b91c1c",
        "glow-green": "0 0 5px 1px #16a34a",
        "glow-blue": "0 0 5px 1px #2563eb",
        "glow-yellow": "0 0 5px 1px #eab308",
      },
    },
  },
  plugins: [],
};

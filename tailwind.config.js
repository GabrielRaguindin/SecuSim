/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      backdropBlur: {
        'md': '12px',
      },
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};

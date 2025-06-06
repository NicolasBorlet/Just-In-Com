import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-baloo)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#772D44",
        secondary: "#431927",
      },
      borderRadius: {
        '4xl': '277px',
      },
    },
  },
  plugins: [],
} satisfies Config;

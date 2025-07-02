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
        sans: ['var(--font-baloo)', 'system-ui', 'arial'],
        special: ['var(--font-italiana)', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#772D44",
        secondary: "#431927",
        tertiary: "#FEC7C8",
        quaternary: "#7E3A3D",
      },
      borderRadius: {
        '4xl': '277px',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;

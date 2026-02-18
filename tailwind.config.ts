import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma Design System Colors
        primary: {
          DEFAULT: '#273125',
          text: '#272635',
        },
        background: '#f9faf7',
        surface: '#ffffff',
        border: 'rgba(39, 38, 53, 0.1)',
        'border-dark': '#2c2c2c',
        accent: '#d1ef7c',
        placeholder: '#93939a',
        muted: 'rgba(39, 38, 53, 0.5)',
      },
      fontFamily: {
        'neue-montreal': ['Neue Montreal', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '60px',
        '6xl': '140px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

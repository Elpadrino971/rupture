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
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfe',
          300: '#7cc4fd',
          400: '#36a9fa',
          500: '#0c8ce9',
          600: '#006ec7',
          700: '#0158a1',
          800: '#064b85',
          900: '#0b3f6e',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        calm: {
          50: '#f5f7fa',
          100: '#e4e9f2',
          200: '#cfd9e9',
          300: '#a8bbd7',
          400: '#7a96c1',
          500: '#5a78ab',
          600: '#465f8f',
          700: '#394d74',
          800: '#324161',
          900: '#2d3951',
        }
      },
    },
  },
  plugins: [],
};
export default config;

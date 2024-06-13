import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'azul':'#0C0446',
        'negro':'#111111',
        'text1':'#F2F2F2',
        'text2':'#848484',
        'gris':'#1B1B1B',
        'gris1':'#404040',
        'gris2':'#7D7D7D',
        'celeste':'#3E6AE1',
      }
    },
  },
  plugins: [],
};
export default config;

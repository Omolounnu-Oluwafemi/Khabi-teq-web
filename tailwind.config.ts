import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
      },
       width: {
        'custom': '1200px', 
      },
      // maxWidth: {
      //   'custom': '1200px',
      // },
    },
  },
  plugins: [],
} satisfies Config;

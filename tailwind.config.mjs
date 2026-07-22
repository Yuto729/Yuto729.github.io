/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"HackGen Console NF"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"HackGen Console NF"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: '#0d1117',
        fg: '#e6edf3',
        muted: '#8b949e',
        accent: '#58a6ff',
        border: '#30363d',
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './electron/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0F0F13',
          2: '#17171C',
          3: '#1E1E26',
          4: '#252530',
        },
        border: {
          DEFAULT: '#2A2A38',
          2: '#333344',
        },
        accent: {
          DEFAULT: '#7B6EF6',
          2: '#A99EFA',
          bg: '#7B6EF620',
        },
        success: {
          DEFAULT: '#34D399',
          bg: '#34D39920',
        },
        warn: {
          DEFAULT: '#FBBF24',
          bg: '#FBBF2420',
        },
        danger: {
          DEFAULT: '#F87171',
          bg: '#F8717120',
        },
        info: {
          DEFAULT: '#60A5FA',
          bg: '#60A5FA20',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

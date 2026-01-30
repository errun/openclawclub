import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-heading)', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#E8EBF2',
        primary: '#0B0B0C',
        muted: '#98A2B3',
        accent: '#C8A562',
        background: '#0B0B0C',
        line: '#1E2633',
        panel: '#121722'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;

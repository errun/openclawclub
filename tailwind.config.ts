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
        ink: '#0B0F16',
        primary: '#0B0F16',
        muted: '#3B4151',
        accent: '#0EA5E9',
        background: '#E6ECF6',
        line: '#E5E7EB',
        panel: '#FFFFFF'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;

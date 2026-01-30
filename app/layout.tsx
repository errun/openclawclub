import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';

const bodyFont = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-body'
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading'
});

export const metadata: Metadata = {
  title: {
    default: 'Clawbot - 个人 AI 助手生态',
    template: '%s | Clawbot'
  },
  description:
    'Clawbot 个人 AI 助手生态网站：统一接入、Skills 生态、自动化与安全最佳实践。'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-Hans"
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

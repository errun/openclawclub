import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'OpenClawClub - 安装与 Skills 指南',
    template: '%s | OpenClawClub'
  },
  description: 'OpenClawClub 安装与 Skills 资料库，聚合安装指南、技能实践与避坑清单。'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hans">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}

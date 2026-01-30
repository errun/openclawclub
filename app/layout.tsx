import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import { BRAND_KEYWORDS } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Openclaw / Moltbot / Clawdbot - 个人 AI 助手生态',
    template: '%s | Openclaw'
  },
  description:
    'Openclaw（Moltbot / Clawdbot）个人 AI 助手生态网站：统一接入、Skills 生态、自动化与安全最佳实践。',
  keywords: BRAND_KEYWORDS,
  openGraph: {
    title: 'Openclaw / Moltbot / Clawdbot - 个人 AI 助手生态',
    description:
      'Openclaw（Moltbot / Clawdbot）个人 AI 助手生态网站：统一接入、Skills 生态、自动化与安全最佳实践。',
    url: SITE_URL,
    siteName: 'Openclaw',
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Openclaw / Moltbot / Clawdbot - 个人 AI 助手生态',
    description:
      'Openclaw（Moltbot / Clawdbot）个人 AI 助手生态网站：统一接入、Skills 生态、自动化与安全最佳实践。'
  }
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
      <body className="font-body antialiased">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E6JFEP5KN5"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E6JFEP5KN5');`}
        </Script>
        {children}
      </body>
    </html>
  );
}

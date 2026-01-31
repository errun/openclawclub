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
    default: 'Openclaw / Moltbot / Clawdbot - Personal AI Assistant Ecosystem',
    template: '%s | Openclaw'
  },
  description:
    'Openclaw (Moltbot / Clawdbot) personal AI assistant ecosystem: unified access, Skills ecosystem, automation, and security best practices.',
  keywords: BRAND_KEYWORDS,
  openGraph: {
    title: 'Openclaw / Moltbot / Clawdbot - Personal AI Assistant Ecosystem',
    description:
      'Openclaw (Moltbot / Clawdbot) personal AI assistant ecosystem: unified access, Skills ecosystem, automation, and security best practices.',
    url: SITE_URL,
    siteName: 'Openclaw',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Openclaw / Moltbot / Clawdbot - Personal AI Assistant Ecosystem',
    description:
      'Openclaw (Moltbot / Clawdbot) personal AI assistant ecosystem: unified access, Skills ecosystem, automation, and security best practices.'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
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

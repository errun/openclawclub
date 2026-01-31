import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import { BRAND_KEYWORDS } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { cookies } from 'next/headers';
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  LOCALE_OG,
  getStrings,
  normalizeLocale
} from '@/lib/i18n';

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

const defaultStrings = getStrings(DEFAULT_LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultStrings.siteTitle,
    template: '%s | Openclaw'
  },
  description: defaultStrings.siteDescription,
  keywords: BRAND_KEYWORDS,
  openGraph: {
    title: defaultStrings.siteTitle,
    description: defaultStrings.siteDescription,
    url: SITE_URL,
    siteName: 'Openclaw',
    locale: LOCALE_OG[DEFAULT_LOCALE],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultStrings.siteTitle,
    description: defaultStrings.siteDescription
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = normalizeLocale(cookies().get('locale')?.value);
  const htmlLang = LOCALE_HTML_LANG[locale];
  return (
    <html
      lang={htmlLang}
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

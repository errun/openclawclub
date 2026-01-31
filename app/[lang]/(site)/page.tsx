import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePage from '../../(site)/_components/HomePage';
import {
  LOCALE_OG,
  ROUTED_LOCALES,
  getStrings,
  isLocale,
  normalizeLocale,
  withLocale
} from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return ROUTED_LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({
  params
}: {
  params: { lang: string };
}): Metadata {
  if (!isLocale(params.lang)) return {};
  const locale = normalizeLocale(params.lang);
  const t = getStrings(locale);
  const url = `${SITE_URL}${withLocale(locale, '/')}`;
  return {
    title: t.siteTitle,
    description: t.siteDescription,
    openGraph: {
      title: t.siteTitle,
      description: t.siteDescription,
      url,
      locale: LOCALE_OG[locale],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t.siteTitle,
      description: t.siteDescription
    }
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  return <HomePage locale={params.lang} />;
}

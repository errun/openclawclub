import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HubPage from '@/app/(site)/_components/HubPage';
import { getHubMeta } from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import {
  LOCALE_OG,
  ROUTED_LOCALES,
  isLocale,
  normalizeLocale,
  withLocale
} from '@/lib/i18n';

const HUB = 'install' as const;

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
  const meta = getHubMeta(HUB, locale);
  const url = `${SITE_URL}${withLocale(locale, `/${HUB}`)}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: mergeKeywords([meta.title, meta.description, HUB]),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      locale: LOCALE_OG[locale],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description
    }
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  return <HubPage hub={HUB} locale={params.lang} />;
}

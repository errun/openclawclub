import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HubPage from '../../../(site)/_components/HubPage';
import { getHubMeta, HUBS, type Hub } from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import {
  LOCALE_OG,
  ROUTED_LOCALES,
  isLocale,
  normalizeLocale,
  withLocale
} from '@/lib/i18n';

export function generateStaticParams() {
  return ROUTED_LOCALES.flatMap((lang) =>
    HUBS.map((hub) => ({ lang, hub }))
  );
}

export function generateMetadata({
  params
}: {
  params: { lang: string; hub: Hub };
}): Metadata {
  if (!isLocale(params.lang)) return {};
  if (!HUBS.includes(params.hub)) return {};
  const locale = normalizeLocale(params.lang);
  const meta = getHubMeta(params.hub, locale);
  const url = `${SITE_URL}${withLocale(locale, `/${params.hub}`)}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: mergeKeywords([meta.title, meta.description, params.hub]),
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

export default function Page({
  params
}: {
  params: { lang: string; hub: Hub };
}) {
  if (!isLocale(params.lang)) notFound();
  if (!HUBS.includes(params.hub)) notFound();
  return <HubPage hub={params.hub} locale={params.lang} />;
}

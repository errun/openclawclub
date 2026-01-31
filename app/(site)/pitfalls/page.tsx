import type { Metadata } from 'next';
import HubPage from '../_components/HubPage';
import { getHubMeta } from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { DEFAULT_LOCALE, LOCALE_OG } from '@/lib/i18n';

const HUB = 'pitfalls' as const;

export function generateMetadata(): Metadata {
  const meta = getHubMeta(HUB, DEFAULT_LOCALE);
  const url = `${SITE_URL}/${HUB}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: mergeKeywords([meta.title, meta.description, HUB]),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      locale: LOCALE_OG[DEFAULT_LOCALE],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description
    }
  };
}

export default function Page() {
  return <HubPage hub={HUB} locale={DEFAULT_LOCALE} />;
}

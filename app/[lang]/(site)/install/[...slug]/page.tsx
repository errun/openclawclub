import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostPage from '@/app/(site)/_components/PostPage';
import {
  getAvailablePostLocales,
  getPostBySlug,
  getPostsByHub
} from '@/lib/content';
import { buildLocaleAlternates, getNoIndexRobots } from '@/lib/metadata';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { DEFAULT_LOCALE, LOCALE_OG, ROUTED_LOCALES, isLocale, normalizeLocale, withLocale } from '@/lib/i18n';

const HUB = 'install' as const;

export function generateStaticParams() {
  return ROUTED_LOCALES.flatMap((lang) =>
    getPostsByHub(HUB, lang, { includeFallback: false }).map((post) => ({
      lang,
      slug: post.slug
    }))
  );
}

export function generateMetadata({
  params
}: {
  params: { lang: string; slug: string[] };
}): Metadata {
  if (!isLocale(params.lang)) return {};
  const locale = normalizeLocale(params.lang);
  const post = getPostBySlug(HUB, params.slug, locale);
  if (!post) return {};
  const isLocalized = post.resolvedLocale === locale;
  const canonicalLocale = isLocalized ? locale : DEFAULT_LOCALE;
  const url = `${SITE_URL}${withLocale(canonicalLocale, post.url)}`;
  return {
    title: post.title,
    description: post.description,
    keywords: mergeKeywords([post.title, ...post.tags, HUB]),
    alternates: buildLocaleAlternates(
      post.url,
      canonicalLocale,
      getAvailablePostLocales(HUB, params.slug)
    ),
    robots: getNoIndexRobots(!isLocalized),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      locale: LOCALE_OG[canonicalLocale],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  };
}

export default function Page({
  params
}: {
  params: { lang: string; slug: string[] };
}) {
  if (!isLocale(params.lang)) notFound();
  return <PostPage hub={HUB} slug={params.slug} locale={params.lang} />;
}

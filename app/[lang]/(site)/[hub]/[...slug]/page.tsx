import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostPage from '../../../../(site)/_components/PostPage';
import { getAllPostSlugs, getPostBySlug, HUBS, type Hub } from '@/lib/content';
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
    getAllPostSlugs(lang).map((entry) => ({
      lang,
      hub: entry.hub,
      slug: entry.slug
    }))
  );
}

export function generateMetadata({
  params
}: {
  params: { lang: string; hub: Hub; slug: string[] };
}): Metadata {
  if (!isLocale(params.lang)) return {};
  if (!HUBS.includes(params.hub)) return {};
  const locale = normalizeLocale(params.lang);
  const post = getPostBySlug(params.hub, params.slug, locale);
  if (!post) return {};
  const url = `${SITE_URL}${withLocale(locale, post.url)}`;
  return {
    title: post.title,
    description: post.description,
    keywords: mergeKeywords([post.title, ...post.tags, params.hub]),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      locale: LOCALE_OG[locale],
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
  params: { lang: string; hub: Hub; slug: string[] };
}) {
  if (!isLocale(params.lang)) notFound();
  if (!HUBS.includes(params.hub)) notFound();
  return <PostPage hub={params.hub} slug={params.slug} locale={params.lang} />;
}

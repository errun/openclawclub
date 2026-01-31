import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostPage from '../../../(site)/_components/PostPage';
import { getPostBySlug, getPostsByHub } from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import {
  LOCALE_OG,
  ROUTED_LOCALES,
  isLocale,
  normalizeLocale,
  withLocale
} from '@/lib/i18n';

const HUB = 'skills' as const;

export function generateStaticParams() {
  return ROUTED_LOCALES.flatMap((lang) =>
    getPostsByHub(HUB, lang).map((post) => ({
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
  const url = `${SITE_URL}${withLocale(locale, post.url)}`;
  return {
    title: post.title,
    description: post.description,
    keywords: mergeKeywords([post.title, ...post.tags, HUB]),
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
  params: { lang: string; slug: string[] };
}) {
  if (!isLocale(params.lang)) notFound();
  return <PostPage hub={HUB} slug={params.slug} locale={params.lang} />;
}

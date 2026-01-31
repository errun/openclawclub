import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostPageView from '../../_components/PostPage';
import {
  getAllPostSlugs,
  getPostBySlug,
  HUBS,
  type Hub
} from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { DEFAULT_LOCALE, LOCALE_OG } from '@/lib/i18n';

export function generateStaticParams() {
  return getAllPostSlugs(DEFAULT_LOCALE).map((entry) => ({
    hub: entry.hub,
    slug: entry.slug
  }));
}

export function generateMetadata({
  params
}: {
  params: { hub: Hub; slug: string[] };
}): Metadata {
  if (!HUBS.includes(params.hub)) return {};
  const post = getPostBySlug(params.hub, params.slug, DEFAULT_LOCALE);
  if (!post) return {};
  const url = `${SITE_URL}${post.url}`;
  return {
    title: post.title,
    description: post.description,
    keywords: mergeKeywords([post.title, ...post.tags, params.hub]),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      locale: LOCALE_OG[DEFAULT_LOCALE],
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
  params: { hub: Hub; slug: string[] };
}) {
  if (!HUBS.includes(params.hub)) notFound();
  return (
    <PostPageView
      hub={params.hub}
      slug={params.slug}
      locale={DEFAULT_LOCALE}
    />
  );
}

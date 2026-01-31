import type { Metadata } from 'next';
import PostPage from '../../_components/PostPage';
import { getPostBySlug, getPostsByHub } from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { DEFAULT_LOCALE, LOCALE_OG } from '@/lib/i18n';

const HUB = 'pitfalls' as const;

export function generateStaticParams() {
  return getPostsByHub(HUB, DEFAULT_LOCALE).map((post) => ({
    slug: post.slug
  }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string[] };
}): Metadata {
  const post = getPostBySlug(HUB, params.slug, DEFAULT_LOCALE);
  if (!post) return {};
  const url = `${SITE_URL}${post.url}`;
  return {
    title: post.title,
    description: post.description,
    keywords: mergeKeywords([post.title, ...post.tags, HUB]),
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

export default function Page({ params }: { params: { slug: string[] } }) {
  return <PostPage hub={HUB} slug={params.slug} locale={DEFAULT_LOCALE} />;
}

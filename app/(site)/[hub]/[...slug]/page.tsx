import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Breadcrumbs from '../../_components/Breadcrumbs';
import { getHubLabel, getRelatedLinksForPost } from '@/lib/links';
import {
  getAllPostSlugs,
  getPostBySlug,
  HUBS,
  type Hub
} from '@/lib/content';
import { mergeKeywords } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return getAllPostSlugs().map((entry) => ({
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
  const post = getPostBySlug(params.hub, params.slug);
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
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  };
}

export default function PostPage({
  params
}: {
  params: { hub: Hub; slug: string[] };
}) {
  if (!HUBS.includes(params.hub)) notFound();
  const post = getPostBySlug(params.hub, params.slug);
  if (!post) notFound();
  const relatedLinks = getRelatedLinksForPost(params.hub, params.slug);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: getHubLabel(params.hub), href: `/${params.hub}` },
          { label: post.title }
        ]}
      />

      <section className="reveal rounded-3xl border border-line/70 bg-white/70 p-8 backdrop-blur">
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-base text-muted">{post.description}</p>
        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted/70">
          {post.date}
        </div>
      </section>

      <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
        <MDXRemote source={post.content} />
      </article>

      <section className="rounded-3xl border border-line/70 bg-white/70 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-ink">相关链接</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer rounded-full border border-line/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:border-ink/20 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

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
  return {
    title: post.title,
    description: post.description
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

      <section className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          {post.title}
        </h1>
        <p className="text-base text-slate-600">{post.description}</p>
        <div className="text-xs uppercase tracking-wide text-slate-400">
          {post.date}
        </div>
      </section>

      <article className="prose prose-slate max-w-none">
        <MDXRemote source={post.content} />
      </article>

      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">相关链接</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 hover:border-slate-300 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

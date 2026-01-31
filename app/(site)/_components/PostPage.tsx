import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Breadcrumbs from './Breadcrumbs';
import { getHubLabel, getRelatedLinksForPost } from '@/lib/links';
import {
  getPostBySlug,
  HUBS,
  type Hub
} from '@/lib/content';
import { getStrings, type Locale, withLocale } from '@/lib/i18n';

export default function PostPage({
  hub,
  slug,
  locale
}: {
  hub: Hub;
  slug: string[];
  locale: Locale;
}) {
  if (!HUBS.includes(hub)) notFound();
  const post = getPostBySlug(hub, slug, locale);
  if (!post) notFound();
  const t = getStrings(locale);
  const relatedLinks = getRelatedLinksForPost(hub, slug, locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 py-16">
      <Breadcrumbs
        items={[
          { label: t.nav.home, href: withLocale(locale, '/') },
          { label: getHubLabel(hub, locale), href: withLocale(locale, `/${hub}`) },
          { label: post.title }
        ]}
      />

      <section className="reveal rounded-3xl border border-line/70 bg-panel/70 p-8 backdrop-blur">
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-base text-muted">{post.description}</p>
        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted/70">
          {post.date}
        </div>
      </section>

      <article className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
        <MDXRemote source={post.content} />
      </article>

      <section className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-ink">{t.hub.relatedTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer rounded-full border border-line/70 bg-panel/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:border-ink/20 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from './Breadcrumbs';
import PostCard from './PostCard';
import { getHubLabel } from '@/lib/links';
import { getHubMeta, getPostsByHub, HUBS, type Hub } from '@/lib/content';
import { getStrings, type Locale, withLocale } from '@/lib/i18n';

export default function HubPage({
  hub,
  locale
}: {
  hub: Hub;
  locale: Locale;
}) {
  if (!HUBS.includes(hub)) notFound();
  const t = getStrings(locale);
  const meta = getHubMeta(hub, locale);
  const posts = getPostsByHub(hub, locale);
  const relatedLinks = posts.slice(0, 8).map((post) => ({
    href: withLocale(locale, post.url),
    label: post.title
  }));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <Breadcrumbs
        items={[
          { label: t.nav.home, href: withLocale(locale, '/') },
          { label: getHubLabel(hub, locale) }
        ]}
      />
      <section className="reveal rounded-3xl border border-line/70 bg-panel/70 p-8 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
          {t.hub.heroLabel}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">{meta.description}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.url}
            href={withLocale(locale, post.url)}
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
          />
        ))}
      </section>

      <section className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-ink">{t.hub.relatedTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedLinks.length === 0 ? (
            <span className="text-sm text-muted">{t.hub.relatedEmpty}</span>
          ) : (
            relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer rounded-full border border-line/70 bg-panel/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:border-ink/20 hover:text-ink"
              >
                {link.label}
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

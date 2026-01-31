import Link from 'next/link';
import NavCard from './NavCard';
import PostCard from './PostCard';
import { getAllPosts } from '@/lib/content';
import { getStrings, type Locale, withLocale } from '@/lib/i18n';

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const latestPosts = getAllPosts(locale).slice(0, 5);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="reveal relative overflow-hidden rounded-[32px] border border-line/70 bg-panel/70 p-10 backdrop-blur md:p-14">
        <div className="orb absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-40 w-40 rounded-full bg-ink/10 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted/70">
          Openclaw / Moltbot / Clawdbot
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          {t.hero.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={withLocale(locale, '/install')}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(200,165,98,0.28)] transition-shadow hover:shadow-[0_18px_40px_rgba(200,165,98,0.4)]"
          >
            {t.hero.primaryCta}
          </Link>
          <Link
            href={withLocale(locale, '/skills')}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-panel/70 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-panel/90"
          >
            {t.hero.secondaryCta}
          </Link>
        </div>
        <div className="mt-10 grid gap-4 text-sm sm:grid-cols-3">
          {t.features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line/70 bg-panel/70 p-4 text-sm backdrop-blur"
            >
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-1 rounded-3xl border border-line/70 bg-panel/70 p-8 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
          {t.brand.label}
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-ink">
          {t.brand.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          {t.brand.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {['openclaw', 'moltbot', 'clawdbot'].map((label) => (
            <span
              key={label}
              className="rounded-full border border-line/70 bg-panel/80 px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-1 grid gap-6 md:grid-cols-3">
        <NavCard
          href={withLocale(locale, '/install')}
          title={t.navCards.install.title}
          description={t.navCards.install.description}
          ctaLabel={t.navCards.cta}
        />
        <NavCard
          href={withLocale(locale, '/skills')}
          title={t.navCards.skills.title}
          description={t.navCards.skills.description}
          ctaLabel={t.navCards.cta}
        />
        <NavCard
          href={withLocale(locale, '/pitfalls')}
          title={t.navCards.pitfalls.title}
          description={t.navCards.pitfalls.description}
          ctaLabel={t.navCards.cta}
        />
      </section>

      <section className="reveal reveal-delay-2 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            {t.ecosystem.methodLabel}
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-ink">
            {t.ecosystem.methodTitle}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {t.ecosystem.methodDescription}
          </p>
        </div>
        <div className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            {t.ecosystem.collaborationLabel}
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">
            {t.ecosystem.collaborationTitle}
          </h3>
          <p className="mt-3 text-sm text-muted">
            {t.ecosystem.collaborationDescription}
          </p>
        </div>
        <div className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            {t.ecosystem.growthLabel}
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">
            {t.ecosystem.growthTitle}
          </h3>
          <p className="mt-3 text-sm text-muted">
            {t.ecosystem.growthDescription}
          </p>
        </div>
      </section>

      <section className="reveal reveal-delay-3 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-ink">{t.latest.title}</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-muted/70">
            {t.latest.subtitle}
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard
              key={post.url}
              href={withLocale(locale, post.url)}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-3 rounded-[32px] border border-line/70 bg-panel px-8 py-10 text-ink">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t.join.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              {t.join.description}
            </p>
          </div>
          <Link
            href={withLocale(locale, '/install')}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(200,165,98,0.28)] transition-shadow hover:shadow-[0_18px_40px_rgba(200,165,98,0.4)]"
          >
            {t.join.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}

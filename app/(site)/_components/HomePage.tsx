import Link from 'next/link';
import NavCard from './NavCard';
import PostCard from './PostCard';
import { getAllPosts } from '@/lib/content';
import {
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  getStrings,
  type Locale,
  withLocale
} from '@/lib/i18n';

const LANGUAGE_SWITCHER_LABEL: Record<Locale, string> = {
  en: 'Languages',
  zh: '语言',
  ja: '言語',
  ko: '언어',
  de: 'Sprachen'
};

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const latestPosts = getAllPosts(locale, { includeFallback: false }).slice(0, 5);
  const languageLabel = LANGUAGE_SWITCHER_LABEL[locale];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <nav className="reveal flex flex-col gap-4 rounded-[28px] border border-line/70 bg-panel/70 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
        <Link
          href={withLocale(locale, '/')}
          className="inline-flex items-center gap-3 self-start rounded-full border border-line/70 bg-background/45 px-4 py-2 transition-colors hover:border-accent/45 hover:bg-panel/85"
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(200,165,98,0.85)]" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-ink">
            Openclaw
          </span>
        </Link>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted/70">
            {languageLabel}
          </span>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {SUPPORTED_LOCALES.map((targetLocale) => {
              const isCurrent = locale === targetLocale;

              return (
                <Link
                  key={targetLocale}
                  href={withLocale(targetLocale, '/')}
                  className={[
                    'inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                    isCurrent
                      ? 'border-accent/75 bg-accent text-black shadow-[0_12px_28px_rgba(200,165,98,0.28)]'
                      : 'border-line/70 bg-background/45 text-muted hover:border-accent/45 hover:bg-panel/90 hover:text-ink'
                  ].join(' ')}
                >
                  {LOCALE_LABELS[targetLocale]}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <section className="reveal relative overflow-hidden rounded-[32px] border border-line/70 bg-panel/70 p-10 backdrop-blur md:p-14">
        <div className="orb absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-40 w-40 rounded-full bg-ink/10 blur-3xl" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted/70">
            Openclaw / Moltbot / Clawdbot
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted">
            {t.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={withLocale(locale, '/install')}
              className="inline-flex min-h-16 w-full cursor-pointer items-center justify-center rounded-2xl border border-ink/15 bg-panel/75 px-8 py-4 text-lg font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-panel/90 sm:w-auto"
            >
              {t.hero.primaryCta}
            </Link>
            <Link
              href={withLocale(locale, '/skills/best-skills')}
              className="inline-flex min-h-16 w-full cursor-pointer items-center justify-center rounded-2xl bg-accent px-8 py-4 text-lg font-semibold text-black shadow-[0_20px_48px_rgba(200,165,98,0.34)] transition-shadow hover:shadow-[0_24px_56px_rgba(200,165,98,0.46)] sm:w-auto"
            >
              Open Best Skills
            </Link>
            <Link
              href={withLocale(locale, '/skills/free-token')}
              className="relative inline-flex min-h-16 w-full cursor-pointer items-center justify-center rounded-2xl border border-accent/45 bg-[linear-gradient(180deg,rgba(200,165,98,0.16),rgba(30,38,51,0.8))] px-8 py-4 text-lg font-semibold text-ink shadow-[0_20px_46px_rgba(200,165,98,0.16)] transition-colors hover:border-accent/75 hover:bg-[linear-gradient(180deg,rgba(200,165,98,0.22),rgba(30,38,51,0.9))] sm:w-auto"
            >
              <span className="pointer-events-none absolute -right-2 -top-2 rounded-full border border-[#ffd5a6]/60 bg-[linear-gradient(135deg,#ff7a3d,#ff4d4d)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white shadow-[0_12px_28px_rgba(255,94,58,0.35)]">
                HOT
              </span>
              Free Token
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

import Link from 'next/link';
import NavCard from './NavCard';
import PostCard from './PostCard';
import { getAllPosts } from '@/lib/content';
import {
  LOCALE_LABELS,
  ROUTED_LOCALES,
  getStrings,
  type Locale,
  withLocale
} from '@/lib/i18n';

type RoutedLocale = Exclude<Locale, 'en'>;

const LANGUAGE_GATEWAY_COPY: Record<
  Locale,
  { eyebrow: string; title: string; description: string }
> = {
  en: {
    eyebrow: 'Language Gateway',
    title: 'Choose your homepage language',
    description:
      'Open Chinese, Japanese, Korean, or German versions directly from the homepage. When a localized article is missing, the site falls back to English content.'
  },
  zh: {
    eyebrow: '多语言入口',
    title: '选择你的首页语言版本',
    description:
      '可直接进入中文、日文、韩文、德文首页；如果某篇文章暂未翻译，站点会自动回退到英文内容。'
  },
  ja: {
    eyebrow: '多言語入口',
    title: 'ホームの言語版を選択',
    description:
      '中国語、日本語、韓国語、ドイツ語のホームへ直接移動できます。未翻訳の記事は英語版へ自動フォールバックします。'
  },
  ko: {
    eyebrow: '다국어 입구',
    title: '홈페이지 언어 버전 선택',
    description:
      '중국어, 일본어, 한국어, 독일어 홈으로 바로 이동할 수 있습니다. 번역이 없는 글은 영어 콘텐츠로 자동 대체됩니다.'
  },
  de: {
    eyebrow: 'Sprachzugang',
    title: 'Wähle deine Sprachversion der Startseite',
    description:
      'Öffne die chinesische, japanische, koreanische oder deutsche Startseite direkt. Falls ein lokalisierter Artikel fehlt, verwendet die Website automatisch die englische Version.'
  }
};

const LANGUAGE_MARKS: Record<RoutedLocale, string> = {
  zh: 'CN',
  ja: 'JP',
  ko: 'KR',
  de: 'DE'
};

const LANGUAGE_DESCRIPTIONS: Record<RoutedLocale, string> = {
  zh: '简体中文导览',
  ja: '日本語ホーム',
  ko: '한국어 홈',
  de: 'Deutsche Startseite'
};

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const latestPosts = getAllPosts(locale).slice(0, 5);
  const languageGateway = LANGUAGE_GATEWAY_COPY[locale];
  const languageLocales = ROUTED_LOCALES as RoutedLocale[];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16">
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
          <div className="mt-8 rounded-[28px] border border-line/70 bg-[radial-gradient(circle_at_top_left,rgba(200,165,98,0.16),transparent_34%),linear-gradient(180deg,rgba(16,20,30,0.88),rgba(9,12,18,0.96))] p-5 shadow-[0_18px_48px_rgba(5,8,14,0.34)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 border-b border-line/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent/80">
                  {languageGateway.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {languageGateway.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                {languageGateway.description}
              </p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {languageLocales.map((targetLocale) => {
                const isCurrent = locale === targetLocale;

                return (
                  <Link
                    key={targetLocale}
                    href={withLocale(targetLocale, '/')}
                    className={[
                      'group relative overflow-hidden rounded-[24px] border p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1',
                      isCurrent
                        ? 'border-accent/70 bg-[linear-gradient(180deg,rgba(200,165,98,0.18),rgba(20,27,38,0.92))] shadow-[0_18px_44px_rgba(200,165,98,0.16)]'
                        : 'border-line/70 bg-[linear-gradient(180deg,rgba(18,24,35,0.84),rgba(10,13,20,0.94))] hover:border-accent/55 hover:shadow-[0_18px_42px_rgba(5,8,14,0.38)]'
                    ].join(' ')}
                  >
                    <div className="absolute -right-6 top-0 h-20 w-20 rounded-full bg-accent/14 blur-2xl transition-transform duration-300 group-hover:scale-110" />
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/35 bg-accent/12 text-sm font-bold uppercase tracking-[0.22em] text-accent">
                        {LANGUAGE_MARKS[targetLocale]}
                      </span>
                      <span className="rounded-full border border-line/70 bg-background/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
                        /{targetLocale}
                      </span>
                    </div>
                    <p className="relative mt-5 text-xl font-semibold text-ink">
                      {LOCALE_LABELS[targetLocale]}
                    </p>
                    <p className="relative mt-2 text-sm text-muted">
                      {LANGUAGE_DESCRIPTIONS[targetLocale]}
                    </p>
                  </Link>
                );
              })}
            </div>
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

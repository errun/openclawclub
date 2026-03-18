import Link from 'next/link';
import NavCard from './NavCard';
import PostCard from './PostCard';
import { getAllPosts } from '@/lib/content';
import { getStrings, type Locale, withLocale } from '@/lib/i18n';

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getStrings(locale);
  const latestPosts = getAllPosts(locale).slice(0, 5);
  const bestSkillsSpotlight = {
    en: {
      eyebrow: 'Featured guide',
      title: 'Best Skills: Top picks, momentum, and new arrivals',
      description:
        'Jump straight into the curated Best Skills page with tabbed sections for monthly standouts, weekly momentum, and long-term top picks.',
      primaryCta: 'Open Best Skills',
      secondaryCta: 'View Skills hub',
      highlights: ['March 2026 update', 'Tabbed layout', 'Direct install commands']
    },
    zh: {
      eyebrow: '精选页面',
      title: 'Best Skills：总榜、热度上升、新上榜一页看完',
      description:
        '直接进入整理后的 Best Skills 页面，按 Tab 分成最近一个月新技能、本周热度上升和总榜推荐三部分。',
      primaryCta: '打开 Best Skills',
      secondaryCta: '查看 Skills 栏目',
      highlights: ['2026 年 3 月更新', 'Tab 切换浏览', '附安装命令']
    },
    ja: {
      eyebrow: '注目ページ',
      title: 'Best Skills: 総合ランキング・急上昇・新着を一度に確認',
      description:
        '整理済みの Best Skills ページへ直接移動できます。月間新着、今週の急上昇、総合おすすめをタブで切り替えて確認できます。',
      primaryCta: 'Best Skills を開く',
      secondaryCta: 'Skills ハブを見る',
      highlights: ['2026年3月更新', 'タブ切り替え', 'インストールコマンド付き']
    },
    ko: {
      eyebrow: '추천 페이지',
      title: 'Best Skills: 종합 추천, 급상승, 신규 스킬을 한 번에',
      description:
        '정리된 Best Skills 페이지로 바로 이동할 수 있습니다. 최근 신규 스킬, 이번 주 급상승, 종합 추천을 탭으로 나눠 볼 수 있습니다.',
      primaryCta: 'Best Skills 열기',
      secondaryCta: 'Skills 허브 보기',
      highlights: ['2026년 3월 업데이트', '탭 전환형 레이아웃', '설치 명령 포함']
    }
  }[locale];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="reveal relative overflow-hidden rounded-[32px] border border-line/70 bg-panel/70 p-10 backdrop-blur md:p-14">
        <div className="orb absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-40 w-40 rounded-full bg-ink/10 blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
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
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={withLocale(locale, '/install')}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(200,165,98,0.28)] transition-shadow hover:shadow-[0_18px_40px_rgba(200,165,98,0.4)]"
              >
                {t.hero.primaryCta}
              </Link>
              <Link
                href={withLocale(locale, '/skills/best-skills')}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-accent/60 bg-accent/12 px-6 py-3 text-sm font-semibold text-ink shadow-[0_18px_42px_rgba(200,165,98,0.16)] transition-colors hover:border-accent hover:bg-accent/18"
              >
                {bestSkillsSpotlight.primaryCta}
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
          </div>

          <aside className="rounded-[28px] border border-accent/35 bg-[linear-gradient(180deg,rgba(200,165,98,0.18),rgba(11,11,12,0.86))] p-6 shadow-[0_24px_60px_rgba(8,8,10,0.34)]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent/85">
              {bestSkillsSpotlight.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">
              {bestSkillsSpotlight.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {bestSkillsSpotlight.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {bestSkillsSpotlight.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-accent/30 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/90"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3">
              <Link
                href={withLocale(locale, '/skills/best-skills')}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(200,165,98,0.28)] transition-shadow hover:shadow-[0_22px_50px_rgba(200,165,98,0.42)]"
              >
                {bestSkillsSpotlight.primaryCta}
              </Link>
              <Link
                href={withLocale(locale, '/skills')}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border border-ink/15 bg-panel/70 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-panel/90"
              >
                {bestSkillsSpotlight.secondaryCta}
              </Link>
            </div>
          </aside>
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

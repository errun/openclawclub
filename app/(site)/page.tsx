import Link from 'next/link';
import NavCard from './_components/NavCard';
import PostCard from './_components/PostCard';
import { getAllPosts } from '@/lib/content';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="reveal relative overflow-hidden rounded-[32px] border border-line/70 bg-white/70 p-10 backdrop-blur md:p-14">
        <div className="orb absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-40 w-40 rounded-full bg-ink/10 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted/70">
          Clawbot / Personal AI Ecosystem
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
          为个人 AI 助手构建可扩展生态
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          统一安装接入、Skills 能力、自动化流程与安全治理。让每个助手拥有可控边界，
          在真实场景中持续进化。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/install"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(14,165,233,0.25)] transition-shadow hover:shadow-[0_18px_40px_rgba(14,165,233,0.35)]"
          >
            快速接入
          </Link>
          <Link
            href="/skills"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-white/70 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-white"
          >
            浏览 Skills
          </Link>
        </div>
        <div className="mt-10 grid gap-4 text-sm sm:grid-cols-3">
          {[
            {
              title: '多端接入',
              desc: '桌面、移动与容器环境统一接入与管理。'
            },
            {
              title: '模块化能力',
              desc: 'Skills 组合式扩展，能力可追踪、可替换。'
            },
            {
              title: '安全与可观测',
              desc: '权限、日志、版本回滚与合规策略内置。'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line/70 bg-white/70 p-4 text-sm backdrop-blur"
            >
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-1 grid gap-6 md:grid-cols-3">
        <NavCard
          href="/install"
          title="安装接入"
          description="覆盖 Windows、macOS、Linux、Docker、WSL。"
        />
        <NavCard
          href="/skills"
          title="Skills 生态"
          description="从能力模板到应用场景，快速复用。"
        />
        <NavCard
          href="/pitfalls"
          title="安全与治理"
          description="权限、版本、性能与安全策略清单。"
        />
      </section>

      <section className="reveal reveal-delay-2 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-line/70 bg-white/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            生态方法
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-ink">从接入到演进</h2>
          <p className="mt-3 text-sm text-muted">
            统一接入后，以可配置 Skills 构建能力链路，再用可观测体系闭环优化。
          </p>
        </div>
        <div className="rounded-3xl border border-line/70 bg-white/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            协作方式
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">清晰边界</h3>
          <p className="mt-3 text-sm text-muted">
            通过权限域、日志与版本控制保证个人助手在安全边界内执行。
          </p>
        </div>
        <div className="rounded-3xl border border-line/70 bg-white/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            成长路线
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">持续进化</h3>
          <p className="mt-3 text-sm text-muted">
            从基础安装到复杂自动化，逐步解锁更高阶的生态能力。
          </p>
        </div>
      </section>

      <section className="reveal reveal-delay-3 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-ink">最新内容</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-muted/70">
            最近 5 篇
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard
              key={post.url}
              href={post.url}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-3 rounded-[32px] border border-line/70 bg-ink px-8 py-10 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">加入 Clawbot 生态</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              从接入、能力、治理到最佳实践，快速完成你的个人 AI 助手搭建。
            </p>
          </div>
          <Link
            href="/install"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
          >
            开始接入
          </Link>
        </div>
      </section>
    </main>
  );
}

import NavCard from './_components/NavCard';
import PostCard from './_components/PostCard';
import Breadcrumbs from './_components/Breadcrumbs';
import { getAllPosts } from '@/lib/content';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16">
      <Breadcrumbs items={[{ label: 'Home' }]} />
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          OpenClawClub / SEO 内容站
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          安装与 Skills 的长尾入口
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          聚合安装视频、Skills 使用与避坑指南。新增 MDX 内容即可自动生成页面，
          用最小成本覆盖长尾流量。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <NavCard
          href="/install"
          title="安装视频 / Install"
          description="Windows、macOS、Linux、Docker、WSL 全覆盖。"
        />
        <NavCard
          href="/skills"
          title="Skills 使用"
          description="从入门到模板、最佳实践与应用场景。"
        />
        <NavCard
          href="/pitfalls"
          title="避坑指南"
          description="权限、版本、性能与安全策略。"
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">最近更新</h2>
          <span className="text-sm text-slate-400">最新 5 篇</span>
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
    </main>
  );
}

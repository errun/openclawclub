import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
        Clawbot
      </p>
      <h1 className="text-3xl font-semibold text-ink">页面不存在</h1>
      <p className="text-muted">你访问的地址不存在，返回首页继续浏览。</p>
      <Link
        href="/"
        className="cursor-pointer rounded-full border border-line/70 bg-panel/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink/20"
      >
        返回首页
      </Link>
    </main>
  );
}

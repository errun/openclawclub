import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">页面不存在</h1>
      <p className="text-slate-600">你访问的地址不存在，返回首页继续浏览。</p>
      <Link
        href="/"
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:border-slate-300 hover:text-slate-900"
      >
        返回首页
      </Link>
    </main>
  );
}

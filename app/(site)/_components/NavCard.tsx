import Link from 'next/link';

export default function NavCard({
  href,
  title,
  description
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-line/70 bg-white/70 p-6 shadow-[0_12px_40px_rgba(11,15,22,0.06)] backdrop-blur transition-colors transition-shadow hover:border-ink/15 hover:bg-white hover:shadow-[0_18px_50px_rgba(11,15,22,0.08)]"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <span className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        进入
      </span>
    </Link>
  );
}

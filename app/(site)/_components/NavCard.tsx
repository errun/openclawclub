import Link from 'next/link';

export default function NavCard({
  href,
  title,
  description,
  ctaLabel = 'Explore'
}: {
  href: string;
  title: string;
  description: string;
  ctaLabel?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-line/70 bg-panel/70 p-6 shadow-[0_12px_40px_rgba(2,6,23,0.5)] backdrop-blur transition-colors transition-shadow hover:border-ink/15 hover:bg-panel/90 hover:shadow-[0_18px_50px_rgba(2,6,23,0.6)]"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <span className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        {ctaLabel}
      </span>
    </Link>
  );
}

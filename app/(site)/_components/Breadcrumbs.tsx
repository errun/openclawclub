import Link from 'next/link';

export type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-muted/70">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link className="hover:text-ink" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className="text-ink/80">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="text-muted/60">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

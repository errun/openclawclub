import Link from 'next/link';
import TagList from './TagList';

export default function PostCard({
  href,
  title,
  description,
  date,
  tags
}: {
  href: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}) {
  return (
    <Link
      href={href}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-line/70 bg-white/70 p-6 shadow-[0_10px_32px_rgba(11,15,22,0.05)] backdrop-blur transition-colors transition-shadow hover:border-ink/15 hover:bg-white hover:shadow-[0_16px_44px_rgba(11,15,22,0.08)]"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-ink group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <div className="mt-5 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted/70">
          {date}
        </p>
        <TagList tags={tags} />
      </div>
    </Link>
  );
}

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
      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-950">
          {title}
        </h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="mt-5 space-y-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">{date}</p>
        <TagList tags={tags} />
      </div>
    </Link>
  );
}

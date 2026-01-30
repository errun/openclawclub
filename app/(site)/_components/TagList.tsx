export default function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5 text-xs text-slate-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

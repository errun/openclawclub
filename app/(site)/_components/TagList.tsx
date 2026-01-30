export default function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-line/70 bg-panel/70 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

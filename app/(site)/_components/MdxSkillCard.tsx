'use client';

import { useState } from 'react';

type SkillCardDetail = {
  label: string;
  value: string;
};

type SkillCardProps = {
  title: string;
  summary: string;
  installCommand: string;
  badges?: string[];
  details?: SkillCardDetail[];
};

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M5 12.5L9.5 17L19 7.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
        width="11"
        x="9"
        y="9"
      />
      <path
        d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function SkillCard({
  title,
  summary,
  installCommand,
  badges = [],
  details = []
}: SkillCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="not-prose relative overflow-hidden rounded-[28px] border border-line/70 bg-[linear-gradient(180deg,rgba(30,38,51,0.34),rgba(11,11,12,0.88))] p-5 shadow-[0_18px_40px_rgba(5,8,14,0.24)] sm:p-6">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative">
        {badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent/90"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
                {title}
              </h3>
              <button
                aria-label="复制安装命令"
                className={[
                  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
                  copied
                    ? 'border-accent/70 bg-accent text-black'
                    : 'border-line/70 bg-background/50 text-muted hover:border-accent/60 hover:text-ink'
                ].join(' ')}
                onClick={handleCopy}
                title={copied ? '已复制' : '复制安装命令'}
                type="button"
              >
                <CopyIcon copied={copied} />
              </button>
            </div>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted sm:text-base">
              {summary}
            </p>
          </div>
        </div>

        {details.length > 0 ? (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {details.map((detail) => (
              <div
                key={`${title}-${detail.label}`}
                className="rounded-2xl border border-line/70 bg-black/20 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted/70">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink/92">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl border border-accent/20 bg-black/25 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent/85">
            Install Command
          </p>
          <code className="mt-2 block break-all rounded-xl bg-black/25 px-3 py-3 font-mono text-sm text-ink">
            {installCommand}
          </code>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

type SkillCardProps = {
  title: string;
  summary: string;
  installCommand: string;
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
  installCommand
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
    <section className="not-prose relative overflow-hidden rounded-[28px] border border-line/70 bg-[linear-gradient(180deg,rgba(18,24,35,0.82),rgba(11,11,12,0.92))] p-5 shadow-[0_18px_40px_rgba(5,8,14,0.24)] sm:p-6">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/12 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-[1.9rem]">
                {title}
              </h3>
              <button
                aria-label="Copy install command"
                className={[
                  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
                  copied
                    ? 'border-accent/70 bg-accent text-black'
                    : 'border-line/70 bg-background/50 text-muted hover:border-accent/60 hover:text-ink'
                ].join(' ')}
                onClick={handleCopy}
                title={copied ? 'Copied' : 'Copy install command'}
                type="button"
              >
                <CopyIcon copied={copied} />
              </button>
            </div>
            <p className="mt-4 max-w-3xl text-[15px] leading-8 text-muted sm:text-base">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import NavCard from './_components/NavCard';
import PostCard from './_components/PostCard';
import { getAllPosts } from '@/lib/content';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="reveal relative overflow-hidden rounded-[32px] border border-line/70 bg-panel/70 p-10 backdrop-blur md:p-14">
        <div className="orb absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-40 w-40 rounded-full bg-ink/10 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted/70">
          Openclaw / Moltbot / Clawdbot
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl lg:text-6xl">
          Openclaw Personal AI Assistant Ecosystem
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          Openclaw (also known as Moltbot / Clawdbot) provides unified install
          access, Skills capabilities, automation workflows, and security
          governance. Give every assistant clear boundaries and continuous
          evolution in real-world scenarios.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/install"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(200,165,98,0.28)] transition-shadow hover:shadow-[0_18px_40px_rgba(200,165,98,0.4)]"
          >
            Get started
          </Link>
          <Link
            href="/skills"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-panel/70 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-panel/90"
          >
            Browse Skills
          </Link>
        </div>
        <div className="mt-10 grid gap-4 text-sm sm:grid-cols-3">
          {[
            {
              title: 'Multi-platform access',
              desc: 'Unified access and management across desktop, mobile, and container environments.'
            },
            {
              title: 'Modular capabilities',
              desc: 'Composable Skills with traceable, replaceable capabilities.'
            },
            {
              title: 'Security & observability',
              desc: 'Built-in permissions, logging, rollbacks, and compliance policies.'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line/70 bg-panel/70 p-4 text-sm backdrop-blur"
            >
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-1 rounded-3xl border border-line/70 bg-panel/70 p-8 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
          Brand overview
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-ink">
          Openclaw (Moltbot / Clawdbot)
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Openclaw, Moltbot, and Clawdbot are different names for the same
          personal AI assistant ecosystem. We provide unified access, Skills
          capabilities, automation, and security governance so assistants stay
          extensible and controlled.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {['openclaw', 'moltbot', 'clawdbot'].map((label) => (
            <span
              key={label}
              className="rounded-full border border-line/70 bg-panel/80 px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-1 grid gap-6 md:grid-cols-3">
        <NavCard
          href="/install"
          title="Install & access"
          description="Covers Windows, macOS, Linux, Docker, and WSL."
        />
        <NavCard
          href="/skills"
          title="Skills ecosystem"
          description="From templates to real-world use cases, reuse fast."
        />
        <NavCard
          href="/pitfalls"
          title="Security & governance"
          description="Checklists for permissions, versions, performance, and safety."
        />
      </section>

      <section className="reveal reveal-delay-2 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            Ecosystem method
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-ink">
            From access to evolution
          </h2>
          <p className="mt-3 text-sm text-muted">
            After unified access, build capability chains with configurable
            Skills, then close the loop with observability.
          </p>
        </div>
        <div className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            Collaboration model
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">
            Clear boundaries
          </h3>
          <p className="mt-3 text-sm text-muted">
            Use permission scopes, logs, and version control to keep assistants
            operating within safe boundaries.
          </p>
        </div>
        <div className="rounded-3xl border border-line/70 bg-panel/70 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted/70">
            Growth path
          </p>
          <h3 className="mt-4 text-xl font-semibold text-ink">
            Continuous evolution
          </h3>
          <p className="mt-3 text-sm text-muted">
            Move from basic installs to advanced automation, unlocking
            higher-order ecosystem capabilities.
          </p>
        </div>
      </section>

      <section className="reveal reveal-delay-3 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-ink">Latest content</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-muted/70">
            Last 5 posts
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <PostCard
              key={post.url}
              href={post.url}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      <section className="reveal reveal-delay-3 rounded-[32px] border border-line/70 bg-panel px-8 py-10 text-ink">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Join the Clawbot ecosystem
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              From access to capabilities to governance and best practices,
              quickly launch your personal AI assistant.
            </p>
          </div>
          <Link
            href="/install"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_32px_rgba(200,165,98,0.28)] transition-shadow hover:shadow-[0_18px_40px_rgba(200,165,98,0.4)]"
          >
            Start now
          </Link>
        </div>
      </section>
    </main>
  );
}

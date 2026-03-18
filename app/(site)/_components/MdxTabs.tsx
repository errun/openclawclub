'use client';

import {
  Children,
  isValidElement,
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode
} from 'react';

type TabProps = {
  label: string;
  value?: string;
  children: ReactNode;
};

type TabsProps = {
  children: ReactNode;
  defaultValue?: string;
};

type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const baseId = useId();
  const tabs = useMemo<TabItem[]>(() => {
    return Children.toArray(children)
      .filter(
        (child): child is ReactElement<TabProps> => isValidElement<TabProps>(child)
      )
      .map((child, index) => ({
        label: child.props.label,
        value: child.props.value ?? `tab-${index}`,
        content: child.props.children
      }));
  }, [children]);

  const initialValue = defaultValue ?? tabs[0]?.value ?? '';
  const [activeValue, setActiveValue] = useState(initialValue);
  const activeTab =
    tabs.find((tab) => tab.value === activeValue) ?? tabs[0] ?? null;

  if (!activeTab) return null;

  return (
    <section className="not-prose reveal rounded-[30px] border border-line/70 bg-panel/60 p-4 backdrop-blur sm:p-6">
      <div
        aria-label="Best Skills sections"
        className="grid gap-3 md:grid-cols-3"
        role="tablist"
      >
        {tabs.map((tab) => {
          const selected = tab.value === activeTab.value;
          const panelId = `${baseId}-${tab.value}-panel`;
          const tabId = `${baseId}-${tab.value}-tab`;
          return (
            <button
              key={tab.value}
              aria-controls={panelId}
              aria-selected={selected}
              className={[
                'flex min-h-[4.75rem] items-center justify-center rounded-2xl border px-4 py-4 text-center transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80',
                selected
                  ? 'border-accent/70 bg-accent/12 text-ink shadow-[0_20px_45px_rgba(200,165,98,0.12)]'
                  : 'border-line/70 bg-background/35 text-muted hover:border-ink/20 hover:text-ink'
              ].join(' ')}
              id={tabId}
              onClick={() => setActiveValue(tab.value)}
              role="tab"
              type="button"
            >
              <span className="block text-base font-semibold leading-6 sm:text-[1.05rem]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`${baseId}-${activeTab.value}-tab`}
        className="mt-5 rounded-[26px] border border-line/70 bg-background/45 p-5 sm:p-7"
        id={`${baseId}-${activeTab.value}-panel`}
        role="tabpanel"
      >
        <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
          {activeTab.content}
        </div>
      </div>
    </section>
  );
}

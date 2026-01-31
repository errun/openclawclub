import type { Hub } from './content';

export type RelatedLink = {
  href: string;
  label: string;
};

const hubLabels: Record<Hub, string> = {
  install: 'Install',
  skills: 'Skills',
  pitfalls: 'Pitfalls'
};

export function getHubLabel(hub: Hub) {
  return hubLabels[hub];
}

export function getRelatedLinksForPost(
  hub: Hub,
  slugParts: string[]
): RelatedLink[] {
  const links: RelatedLink[] = [
    {
      href: `/${hub}`,
      label: `${hubLabels[hub]} hub home`
    }
  ];

  if (hub === 'install' && slugParts[0] === 'errors') {
    links.push(
      { href: '/install/windows', label: 'Windows install guide' },
      { href: '/install/macos', label: 'macOS install guide' },
      { href: '/install/linux', label: 'Linux install guide' },
      { href: '/pitfalls/version-mismatch', label: 'Pitfall: version mismatch' },
      { href: '/pitfalls/over-permissions', label: 'Pitfall: over-permissions' }
    );
  } else if (hub === 'skills') {
    links.push(
      { href: '/skills/getting-started', label: 'Skills quickstart' },
      { href: '/skills/best-practices', label: 'Skills best practices' }
    );
  } else if (hub === 'pitfalls') {
    links.push(
      { href: '/pitfalls/api-key-safety', label: 'API key safety' },
      { href: '/pitfalls/performance', label: 'Performance pitfalls' }
    );
  }

  return links;
}

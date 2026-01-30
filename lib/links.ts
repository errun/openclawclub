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
      label: `${hubLabels[hub]} 栏目首页`
    }
  ];

  if (hub === 'install' && slugParts[0] === 'errors') {
    links.push(
      { href: '/install/windows', label: 'Windows 安装指南' },
      { href: '/install/macos', label: 'macOS 安装指南' },
      { href: '/install/linux', label: 'Linux 安装指南' },
      { href: '/pitfalls/version-mismatch', label: '避坑：版本不匹配' },
      { href: '/pitfalls/over-permissions', label: '避坑：权限过大' }
    );
  } else if (hub === 'skills') {
    links.push(
      { href: '/skills/getting-started', label: 'Skills 快速上手' },
      { href: '/skills/best-practices', label: 'Skills 最佳实践' }
    );
  } else if (hub === 'pitfalls') {
    links.push(
      { href: '/pitfalls/api-key-safety', label: 'API Key 安全' },
      { href: '/pitfalls/performance', label: '性能避坑' }
    );
  }

  return links;
}

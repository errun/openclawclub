import type { Hub } from './content';
import { getStrings, type Locale, withLocale } from './i18n';

export type RelatedLink = {
  href: string;
  label: string;
};

export function getHubLabel(hub: Hub, locale: Locale) {
  const t = getStrings(locale);
  return t.hubs[hub];
}

export function getRelatedLinksForPost(
  hub: Hub,
  slugParts: string[],
  locale: Locale
): RelatedLink[] {
  const t = getStrings(locale);
  const hubLabel = getHubLabel(hub, locale);
  const links: RelatedLink[] = [
    {
      href: withLocale(locale, `/${hub}`),
      label: t.links.hubHome.replace('{hub}', hubLabel)
    }
  ];

  if (hub === 'install' && slugParts[0] === 'errors') {
    links.push(
      {
        href: withLocale(locale, '/install/windows'),
        label: t.links.windowsInstall
      },
      {
        href: withLocale(locale, '/install/macos'),
        label: t.links.macosInstall
      },
      {
        href: withLocale(locale, '/install/linux'),
        label: t.links.linuxInstall
      },
      {
        href: withLocale(locale, '/pitfalls/version-mismatch'),
        label: t.links.pitfallVersion
      },
      {
        href: withLocale(locale, '/pitfalls/over-permissions'),
        label: t.links.pitfallPermissions
      }
    );
  } else if (hub === 'skills') {
    links.push(
      {
        href: withLocale(locale, '/skills/getting-started'),
        label: t.links.skillsQuickstart
      },
      {
        href: withLocale(locale, '/skills/best-practices'),
        label: t.links.skillsBestPractices
      }
    );
  } else if (hub === 'pitfalls') {
    links.push(
      {
        href: withLocale(locale, '/pitfalls/api-key-safety'),
        label: t.links.apiKeySafety
      },
      {
        href: withLocale(locale, '/pitfalls/performance'),
        label: t.links.performancePitfalls
      }
    );
  }

  return links;
}

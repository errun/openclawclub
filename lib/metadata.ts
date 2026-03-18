import type { Metadata } from 'next';
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  type Locale,
  withLocale
} from './i18n';
import { SITE_URL } from './site';

export function buildLocaleAlternates(
  path: string,
  canonicalLocale: Locale,
  availableLocales: readonly Locale[]
): Metadata['alternates'] {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const languages: Record<string, string> = {};

  for (const locale of new Set(availableLocales)) {
    languages[LOCALE_HTML_LANG[locale]] = `${SITE_URL}${withLocale(
      locale,
      normalizedPath
    )}`;
  }

  languages['x-default'] = `${SITE_URL}${withLocale(
    DEFAULT_LOCALE,
    normalizedPath
  )}`;

  return {
    canonical: `${SITE_URL}${withLocale(canonicalLocale, normalizedPath)}`,
    languages
  };
}

export function getNoIndexRobots(noIndex: boolean): Metadata['robots'] | undefined {
  if (!noIndex) return undefined;
  return {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  };
}

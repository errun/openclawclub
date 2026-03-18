import type { PostMeta } from './content';
import {
  LOCALE_HTML_LANG,
  getStrings,
  type Locale,
  withLocale
} from './i18n';
import { SITE_URL } from './site';

type SchemaNode = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  url: string;
};

function toCanonicalUrl(locale: Locale, path: string) {
  return `${SITE_URL}${withLocale(locale, path)}`;
}

function toIsoDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

export function buildWebsiteSchema(locale: Locale): SchemaNode {
  const t = getStrings(locale);
  const url = toCanonicalUrl(locale, '/');

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: 'Openclaw',
    alternateName: ['Moltbot', 'Clawdbot'],
    description: t.siteDescription,
    inLanguage: LOCALE_HTML_LANG[locale]
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function buildArticleSchema({
  post,
  canonicalLocale
}: {
  post: PostMeta;
  canonicalLocale: Locale;
}): SchemaNode {
  const canonicalUrl = toCanonicalUrl(canonicalLocale, post.url);
  const t = getStrings(canonicalLocale);
  const publishedAt = toIsoDate(post.date);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: post.title,
    description: post.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: LOCALE_HTML_LANG[canonicalLocale],
    articleSection: t.hubs[post.hub],
    keywords: post.tags,
    isPartOf: {
      '@id': `${toCanonicalUrl(canonicalLocale, '/')}#website`
    },
    author: {
      '@type': 'Organization',
      name: 'Openclaw',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'Openclaw',
      url: SITE_URL
    }
  };
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DEFAULT_LOCALE, ROUTED_LOCALES, type Locale } from './i18n';

export const HUBS = ['install', 'skills', 'pitfalls'] as const;
export type Hub = (typeof HUBS)[number];

export type Post = {
  hub: Hub;
  slug: string[];
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  resolvedLocale: Locale;
  content: string;
};

export type PostMeta = Omit<Post, 'content'>;

type PostQueryOptions = {
  includeFallback?: boolean;
};

const BASE_CONTENT_DIR = path.join(process.cwd(), 'content');

function getHubDirs(rootDir: string): Record<Hub, string> {
  return {
    install: path.join(rootDir, 'install'),
    skills: path.join(rootDir, 'skills'),
    pitfalls: path.join(rootDir, 'pitfalls')
  };
}

function getContentRoots(locale?: Locale) {
  if (locale && locale !== DEFAULT_LOCALE) {
    const localizedRoot = path.join(BASE_CONTENT_DIR, locale);
    if (fs.existsSync(localizedRoot)) {
      return { primary: localizedRoot, fallback: BASE_CONTENT_DIR };
    }
  }
  return { primary: BASE_CONTENT_DIR, fallback: BASE_CONTENT_DIR };
}

function getLocaleRoot(locale: Locale) {
  return path.join(BASE_CONTENT_DIR, locale);
}

function getLocalizedHubIndexPath(hub: Hub, locale: Locale) {
  return path.join(getLocaleRoot(locale), hub, 'index.mdx');
}

function getLocalizedPostPath(hub: Hub, slugParts: string[], locale: Locale) {
  return path.join(getLocaleRoot(locale), hub, `${slugParts.join(path.sep)}.mdx`);
}

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readMdxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFrontmatter(
  filePath: string,
  hub: Hub,
  hubDir: string,
  resolvedLocale: Locale
): Post {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const relative = path.relative(hubDir, filePath);
  const slug = relative.replace(/\.mdx$/, '').split(path.sep);
  const url = `/${hub}/${slug.join('/')}`.replace(/\/index$/, '');
  return {
    hub,
    slug,
    url,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    resolvedLocale,
    content
  };
}

export function getHubMeta(hub: Hub, locale: Locale = DEFAULT_LOCALE): PostMeta {
  const { primary, fallback } = getContentRoots(locale);
  const primaryDirs = getHubDirs(primary);
  const fallbackDirs = getHubDirs(fallback);
  const primaryPath = path.join(primaryDirs[hub], 'index.mdx');
  const fallbackPath = path.join(fallbackDirs[hub], 'index.mdx');
  const filePath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;
  const hubDir = fs.existsSync(primaryPath) ? primaryDirs[hub] : fallbackDirs[hub];
  const resolvedLocale = fs.existsSync(primaryPath) ? locale : DEFAULT_LOCALE;
  const post = parseFrontmatter(filePath, hub, hubDir, resolvedLocale);
  return omitContent(post);
}

export function getPostsByHub(
  hub: Hub,
  locale: Locale = DEFAULT_LOCALE,
  options: PostQueryOptions = {}
): PostMeta[] {
  const includeFallback = options.includeFallback ?? true;
  const { primary, fallback } = getContentRoots(locale);
  const primaryDirs = getHubDirs(primary);
  const fallbackDirs = getHubDirs(fallback);

  const fallbackFiles = readMdxFiles(fallbackDirs[hub]);
  const fallbackPosts = fallbackFiles
    .map((filePath) =>
      parseFrontmatter(filePath, hub, fallbackDirs[hub], DEFAULT_LOCALE)
    )
    .filter((post) => !(post.slug.length === 1 && post.slug[0] === 'index'))
    .map(omitContent);

  if (primary === fallback) {
    return fallbackPosts.sort(sortByDateDesc);
  }

  const primaryFiles = readMdxFiles(primaryDirs[hub]);
  const primaryPosts = primaryFiles
    .map((filePath) => parseFrontmatter(filePath, hub, primaryDirs[hub], locale))
    .filter((post) => !(post.slug.length === 1 && post.slug[0] === 'index'))
    .map(omitContent);

  if (!includeFallback) {
    return primaryPosts.sort(sortByDateDesc);
  }

  const merged = new Map<string, PostMeta>();
  for (const post of fallbackPosts) merged.set(post.url, post);
  for (const post of primaryPosts) merged.set(post.url, post);

  return Array.from(merged.values()).sort(sortByDateDesc);
}

export function getAllPosts(
  locale: Locale = DEFAULT_LOCALE,
  options: PostQueryOptions = {}
): PostMeta[] {
  const all = HUBS.flatMap((hub) => getPostsByHub(hub, locale, options));
  return all.sort(sortByDateDesc);
}

export function getPostBySlug(
  hub: Hub,
  slugParts: string[],
  locale: Locale = DEFAULT_LOCALE
): Post | null {
  const safeParts = slugParts.filter(Boolean);
  if (safeParts.length === 0) return null;
  if (safeParts.some((part) => part.includes('..'))) return null;
  const { primary, fallback } = getContentRoots(locale);
  const primaryDirs = getHubDirs(primary);
  const fallbackDirs = getHubDirs(fallback);
  const primaryPath = path.join(
    primaryDirs[hub],
    `${safeParts.join(path.sep)}.mdx`
  );
  const fallbackPath = path.join(
    fallbackDirs[hub],
    `${safeParts.join(path.sep)}.mdx`
  );

  if (fs.existsSync(primaryPath)) {
    return parseFrontmatter(primaryPath, hub, primaryDirs[hub], locale);
  }
  if (!fs.existsSync(fallbackPath)) return null;
  return parseFrontmatter(fallbackPath, hub, fallbackDirs[hub], DEFAULT_LOCALE);
}

export function getAllPostSlugs(
  locale: Locale = DEFAULT_LOCALE,
  options: PostQueryOptions = {}
): { hub: Hub; slug: string[] }[] {
  return HUBS.flatMap((hub) =>
    getPostsByHub(hub, locale, options).map((post) => ({ hub, slug: post.slug }))
  );
}

export function hasLocalizedHubContent(
  hub: Hub,
  locale: Locale = DEFAULT_LOCALE
): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  return fs.existsSync(getLocalizedHubIndexPath(hub, locale));
}

export function hasLocalizedPostContent(
  hub: Hub,
  slugParts: string[],
  locale: Locale = DEFAULT_LOCALE
): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  const safeParts = slugParts.filter(Boolean);
  if (safeParts.length === 0) return false;
  if (safeParts.some((part) => part.includes('..'))) return false;
  return fs.existsSync(getLocalizedPostPath(hub, safeParts, locale));
}

export function getAvailableHubLocales(hub: Hub): Locale[] {
  return [
    DEFAULT_LOCALE,
    ...ROUTED_LOCALES.filter((locale) => hasLocalizedHubContent(hub, locale))
  ];
}

export function getAvailablePostLocales(hub: Hub, slugParts: string[]): Locale[] {
  return [
    DEFAULT_LOCALE,
    ...ROUTED_LOCALES.filter((locale) =>
      hasLocalizedPostContent(hub, slugParts, locale)
    )
  ];
}

function sortByDateDesc(a: PostMeta, b: PostMeta) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function omitContent(post: Post): PostMeta {
  const { content, ...rest } = post;
  return rest;
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DEFAULT_LOCALE, type Locale } from './i18n';

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
  content: string;
};

export type PostMeta = Omit<Post, 'content'>;

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

function parseFrontmatter(filePath: string, hub: Hub, hubDir: string): Post {
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
  const post = parseFrontmatter(filePath, hub, hubDir);
  return omitContent(post);
}

export function getPostsByHub(
  hub: Hub,
  locale: Locale = DEFAULT_LOCALE
): PostMeta[] {
  const { primary, fallback } = getContentRoots(locale);
  const primaryDirs = getHubDirs(primary);
  const fallbackDirs = getHubDirs(fallback);

  const fallbackFiles = readMdxFiles(fallbackDirs[hub]);
  const fallbackPosts = fallbackFiles
    .map((filePath) => parseFrontmatter(filePath, hub, fallbackDirs[hub]))
    .filter((post) => !(post.slug.length === 1 && post.slug[0] === 'index'))
    .map(omitContent);

  if (primary === fallback) {
    return fallbackPosts.sort(sortByDateDesc);
  }

  const primaryFiles = readMdxFiles(primaryDirs[hub]);
  const primaryPosts = primaryFiles
    .map((filePath) => parseFrontmatter(filePath, hub, primaryDirs[hub]))
    .filter((post) => !(post.slug.length === 1 && post.slug[0] === 'index'))
    .map(omitContent);

  const merged = new Map<string, PostMeta>();
  for (const post of fallbackPosts) merged.set(post.url, post);
  for (const post of primaryPosts) merged.set(post.url, post);

  return Array.from(merged.values()).sort(sortByDateDesc);
}

export function getAllPosts(locale: Locale = DEFAULT_LOCALE): PostMeta[] {
  const all = HUBS.flatMap((hub) => getPostsByHub(hub, locale));
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
    return parseFrontmatter(primaryPath, hub, primaryDirs[hub]);
  }
  if (!fs.existsSync(fallbackPath)) return null;
  return parseFrontmatter(fallbackPath, hub, fallbackDirs[hub]);
}

export function getAllPostSlugs(
  locale: Locale = DEFAULT_LOCALE
): { hub: Hub; slug: string[] }[] {
  return HUBS.flatMap((hub) =>
    getPostsByHub(hub, locale).map((post) => ({ hub, slug: post.slug }))
  );
}

function sortByDateDesc(a: PostMeta, b: PostMeta) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function omitContent(post: Post): PostMeta {
  const { content, ...rest } = post;
  return rest;
}

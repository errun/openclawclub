import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

const CONTENT_DIR = path.join(process.cwd(), 'content');

const hubDirs: Record<Hub, string> = {
  install: path.join(CONTENT_DIR, 'install'),
  skills: path.join(CONTENT_DIR, 'skills'),
  pitfalls: path.join(CONTENT_DIR, 'pitfalls')
};

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

function parseFrontmatter(filePath: string, hub: Hub): Post {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const relative = path.relative(hubDirs[hub], filePath);
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

export function getHubMeta(hub: Hub): PostMeta {
  const filePath = path.join(hubDirs[hub], 'index.mdx');
  const post = parseFrontmatter(filePath, hub);
  return omitContent(post);
}

export function getPostsByHub(hub: Hub): PostMeta[] {
  const files = readMdxFiles(hubDirs[hub]);
  const posts = files
    .map((filePath) => parseFrontmatter(filePath, hub))
    .filter((post) => !(post.slug.length === 1 && post.slug[0] === 'index'))
    .map(omitContent);
  return posts.sort(sortByDateDesc);
}

export function getAllPosts(): PostMeta[] {
  const all = HUBS.flatMap((hub) => getPostsByHub(hub));
  return all.sort(sortByDateDesc);
}

export function getPostBySlug(hub: Hub, slugParts: string[]): Post | null {
  const safeParts = slugParts.filter(Boolean);
  if (safeParts.length === 0) return null;
  if (safeParts.some((part) => part.includes('..'))) return null;
  const filePath = path.join(hubDirs[hub], `${safeParts.join(path.sep)}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseFrontmatter(filePath, hub);
}

export function getAllPostSlugs(): { hub: Hub; slug: string[] }[] {
  return HUBS.flatMap((hub) =>
    getPostsByHub(hub).map((post) => ({ hub, slug: post.slug }))
  );
}

function sortByDateDesc(a: PostMeta, b: PostMeta) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function omitContent(post: Post): PostMeta {
  const { content, ...rest } = post;
  return rest;
}

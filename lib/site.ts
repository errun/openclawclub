const DEFAULT_SITE_URL = 'https://openclawclue.net';

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    DEFAULT_SITE_URL
);

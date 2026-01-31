import type { MetadataRoute } from 'next';
import { getAllPosts, getHubMeta, HUBS } from '@/lib/content';
import { DEFAULT_LOCALE, ROUTED_LOCALES, withLocale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ROUTED_LOCALES;
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...HUBS.map<MetadataRoute.Sitemap[number]>((hub) => {
      const meta = getHubMeta(hub, DEFAULT_LOCALE);
      return {
        url: `${SITE_URL}/${hub}`,
        lastModified: meta.date ? new Date(meta.date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
      };
    })
  ];

  const localizedStaticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${SITE_URL}${withLocale(locale, '/')}`,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    ...HUBS.map<MetadataRoute.Sitemap[number]>((hub) => {
      const meta = getHubMeta(hub, locale);
      return {
        url: `${SITE_URL}${withLocale(locale, `/${hub}`)}`,
        lastModified: meta.date ? new Date(meta.date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.6
      };
    })
  ]);

  const postRoutes: MetadataRoute.Sitemap = getAllPosts(DEFAULT_LOCALE).map<MetadataRoute.Sitemap[number]>((post) => ({
    url: `${SITE_URL}${post.url}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  const localizedPostRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map<MetadataRoute.Sitemap[number]>((post) => ({
      url: `${SITE_URL}${withLocale(locale, post.url)}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: 'monthly',
      priority: 0.5
    }))
  );

  return [
    ...staticRoutes,
    ...localizedStaticRoutes,
    ...postRoutes,
    ...localizedPostRoutes
  ];
}

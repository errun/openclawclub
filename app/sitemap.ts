import type { MetadataRoute } from 'next';
import { getAllPosts, getHubMeta, HUBS } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...HUBS.map((hub) => {
      const meta = getHubMeta(hub);
      return {
        url: `${SITE_URL}/${hub}`,
        lastModified: meta.date ? new Date(meta.date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
      };
    })
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}${post.url}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticRoutes, ...postRoutes];
}

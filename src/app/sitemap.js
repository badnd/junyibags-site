import { siteData } from '@/data/site-data';
import { blogPosts } from '@/data/blog-posts';
import { landingPages } from '@/data/landing-pages';
import { productPath, siteUrl } from '@/lib/paths';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['/', '/products', '/custom-service', '/factory', '/about', '/contact', '/privacy-policy', '/blog'];
  const ruRoutes = ['/ru', '/ru/products', '/ru/custom-service', '/ru/factory', '/ru/about', '/ru/contact'];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route === '/' ? '' : route}`, lastModified: now })),
    ...ruRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: now })),
    ...landingPages.map((page) => ({ url: `${siteUrl}/${page.slug}`, lastModified: now })),
    ...Object.entries(siteData.products).map(([slug, product]) => ({ url: `${siteUrl}${productPath(slug, product)}`, lastModified: now })),
    ...blogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date }))
  ];
}

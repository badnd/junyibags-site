import { siteData } from '@/data/site-data';
import { blogPosts } from '@/data/blog-posts';
import { landingPages } from '@/data/landing-pages';
import { resourcePages } from '@/data/resources';
import { productPath, siteUrl } from '@/lib/paths';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['/', '/products', '/custom-service', '/factory', '/about', '/contact', '/privacy-policy', '/blog', '/resources'];
  const ruRoutes = ['/ru', '/ru/products', '/ru/custom-service', '/ru/factory', '/ru/about', '/ru/contact', '/ru/resources'];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route === '/' ? '' : route}`, lastModified: now })),
    ...ruRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: now })),
    ...landingPages.map((page) => ({ url: `${siteUrl}/${page.slug}`, lastModified: now })),
    ...resourcePages.flatMap((page) => [{ url: `${siteUrl}/resources/${page.slug}`, lastModified: now }, { url: `${siteUrl}/ru/resources/${page.slug}`, lastModified: now }]),
    ...Object.entries(siteData.products).map(([slug, product]) => ({ url: `${siteUrl}${productPath(slug, product)}`, lastModified: now })),
    ...Object.entries(siteData.products).filter(([, product]) => product.ru).map(([slug]) => ({ url: `${siteUrl}/ru/products/${slug}`, lastModified: now })),
    ...blogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date }))
  ];
}

import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';
import { ProductDetailPage } from '@/components/ProductDetailPage';
import { landingPages } from '@/data/landing-pages';
import { siteData } from '@/data/site-data';
import { assetUrl, productPath, siteUrl } from '@/lib/paths';

function pageFromParams(params) {
  const slug = (params?.slug || []).join('/');
  return landingPages.find((page) => page.slug === slug);
}

function productFromParams(params) {
  const path = `/${(params?.slug || []).join('/')}`;
  const entry = Object.entries(siteData.products).find(([, product]) => product.path === path);
  return entry ? { slug: entry[0], product: entry[1] } : null;
}

export function generateStaticParams() {
  const productParams = Object.values(siteData.products)
    .filter((product) => product.path)
    .map((product) => ({ slug: product.path.replace(/^\/+/, '').split('/') }));
  return [...landingPages.map((page) => ({ slug: page.slug.split('/') })), ...productParams];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = pageFromParams(resolvedParams);
  if (page) {
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `/${page.slug}` },
      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: `/${page.slug}`,
      },
    };
  }

  const matched = productFromParams(resolvedParams);
  if (!matched) return {};
  const { slug, product } = matched;
  return {
    title: product.metaTitle ?? `${product.title} | ${product.model}`,
    description: product.metaDescription ?? product.intro,
    alternates: { canonical: productPath(slug, product) },
    openGraph: {
      title: product.metaTitle ?? product.title,
      description: product.metaDescription ?? product.intro,
      url: `${siteUrl}${productPath(slug, product)}`,
      images: [{ url: assetUrl(product.gallery[0] || product.hero), width: 1200, height: 630 }],
    },
  };
}

export default async function DynamicLandingPage({ params }) {
  const resolvedParams = await params;
  const page = pageFromParams(resolvedParams);
  if (page) return <LandingPage page={page} />;

  const matched = productFromParams(resolvedParams);
  if (!matched) notFound();

  return <ProductDetailPage slug={matched.slug} product={matched.product} />;
}

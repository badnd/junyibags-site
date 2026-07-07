import { notFound, redirect } from 'next/navigation';
import { siteData } from '@/data/site-data';
import { ProductDetailPage } from '@/components/ProductDetailPage';
import { assetUrl, productPath, siteUrl } from '@/lib/paths';

export function generateStaticParams() {
  return Object.entries(siteData.products)
    .filter(([, product]) => !product.path)
    .map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = siteData.products[slug];
  if (!product) return {};

  return {
    title: `${product.title} | ${product.model}`,
    description: product.metaDescription ?? `${product.intro} OEM/ODM custom bag manufacturer with low MOQ, logo options and factory quotation support.`,
    alternates: { canonical: productPath(slug, product) },
    openGraph: {
      title: product.title,
      description: product.intro,
      url: `${siteUrl}${productPath(slug, product)}`,
      images: [{ url: assetUrl(product.gallery[0] || product.hero), width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.intro,
      images: [assetUrl(product.gallery[0] || product.hero)]
    }
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = siteData.products[slug];
  if (!product) notFound();
  if (product.path) redirect(product.path);

  return <ProductDetailPage slug={slug} product={product} />;
}

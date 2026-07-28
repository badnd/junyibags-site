import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { JsonLd } from '@/components/JsonLd';
import { assetPath, assetUrl, siteUrl } from '@/lib/paths';

export function generateStaticParams() { return blogPosts.filter((post) => post.ru).map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.ru);
  if (!post) return {};
  const en = `${siteUrl}/blog/${post.slug}`;
  const ru = `${siteUrl}/ru/blog/${post.slug}`;
  return { title: { absolute: `${post.ru.title} | Junyi Bags` }, description: post.ru.description, alternates: { canonical: ru, languages: { en, ru, 'x-default': en } }, openGraph: { title: post.ru.title, description: post.ru.description, url: ru, images: [{ url: assetUrl(post.hero), width: 430, height: 120 }] } };
}

export default async function RussianBlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug && item.ru);
  if (!post) notFound();
  const ru = `${siteUrl}/ru/blog/${post.slug}`;
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: post.ru.title, description: post.ru.description, image: assetUrl(post.hero), datePublished: post.date, dateModified: post.date, author: { '@type': 'Organization', name: 'Junyi Bags' }, publisher: { '@type': 'Organization', name: 'Junyi Bags', logo: { '@type': 'ImageObject', url: assetUrl('/assets/images/junyi/brand/junyi-logo.svg') } }, mainEntityOfPage: ru, inLanguage: 'ru' };
  return <><JsonLd data={schema} /><article className="section article-page"><div className="container article-container"><Link className="badge" href="/ru/blog">Ресурсы для покупателей</Link><h1>{post.ru.title}</h1><p className="article-lead">{post.ru.description}</p><div className="blog-meta article-meta"><span>{post.ru.category}</span><span>{post.date}</span></div><figure className="article-hero-figure blog-brand-cover"><img className="article-hero" src={assetPath(post.hero)} alt={post.ru.heroAlt || post.ru.title} /></figure><div className="article-content">{post.ru.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}</div><div className="cta-banner article-cta"><div><h2>{post.ru.cta.title}</h2><p>{post.ru.cta.text}</p></div><Link className="btn btn-light" href={post.ru.cta.href}>{post.ru.cta.label}</Link></div></div></article></>;
}

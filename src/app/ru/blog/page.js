import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Статьи для покупателей сумок на заказ',
  description: 'Практические материалы для B2B-покупателей сумок на заказ.',
  alternates: { canonical: '/ru/blog', languages: { en: 'https://www.junyibags.com/blog', ru: 'https://www.junyibags.com/ru/blog', 'x-default': 'https://www.junyibags.com/blog' } }
};

export default function RussianBlogPage() {
  const posts = blogPosts.filter((post) => post.ru);
  return <section className="section bg-soft"><div className="container"><div className="section-head"><div><span className="badge">Ресурсы для покупателей</span><h1>Блог Junyi Bags</h1><p>Практические материалы для B2B-покупателей сумок на заказ.</p></div></div><div className="grid grid-3">{posts.map((post) => <article className="card blog-card" key={post.slug}><Link className={`card-media${post.brandCover ? ' blog-brand-cover' : ''}`} href={`/ru/blog/${post.slug}`}><img src={assetPath(post.hero)} alt={post.ru.heroAlt || post.ru.title} /></Link><div className="card-body"><div className="blog-meta"><span>{post.ru.category}</span><span>{post.date}</span></div><h2 className="card-title">{post.ru.title}</h2><p className="muted">{post.ru.description}</p></div><div className="card-actions"><Link className="btn btn-primary" href={`/ru/blog/${post.slug}`}>Читать статью</Link></div></article>)}</div></div></section>;
}

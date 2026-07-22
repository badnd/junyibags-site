import Link from 'next/link';
import { ProductGallery } from '@/components/ProductGallery';
import { JsonLd } from '@/components/JsonLd';
import { assetUrl, siteUrl } from '@/lib/paths';

export function RuProductPage({ slug, product }) {
  const ru = product.ru;
  const url = `${siteUrl}/ru/products/${slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'Product', name: ru.title, description: ru.metaDescription,
    image: product.gallery.map(assetUrl), sku: product.model, brand: { '@type': 'Brand', name: 'Junyi Bags' },
    offers: { '@type': 'Offer', url, priceCurrency: 'USD', price: '0.00', availability: 'https://schema.org/InStock', description: 'Индивидуальный расчёт по запросу. MOQ от 50 шт.*' },
  };
  return <>
    <JsonLd data={schema} />
    <section className="section bg-soft"><div className="container detail-grid">
      <ProductGallery product={{ ...product, title: ru.title }} />
      <article className="detail-main"><span className="badge">Сумки через плечо с полной запечаткой</span><h1>{ru.title}</h1><p><strong>{ru.tagline}</strong></p><p className="muted">{ru.intro}</p><div className="chip-list">{ru.badges.map((badge) => <span className="badge" key={badge}>{badge}</span>)}</div><div className="contact-big"><strong>Свяжитесь с нами для лучшего расчёта</strong><div>Модель: {product.model}</div></div><table className="spec-table"><tbody>{ru.specs.map(([name, value]) => <tr key={name}><td>{name}</td><td>{value}</td></tr>)}</tbody></table><div className="hero-cta"><Link className="btn btn-primary" href={`/ru/contact?product=${encodeURIComponent(product.model)}`}>Запросить расчёт</Link><Link className="btn btn-secondary" href="/ru/products">Все товары</Link></div></article>
      <aside className="quote-card"><h3>Условия заказа</h3><p><strong>MOQ:</strong> от 50 шт.*</p><p><strong>Образец:</strong> 7–15 дней</p><p><strong>Партия:</strong> 15–30 дней</p><p><strong>Оплата образца:</strong> для 1 000+ шт. возвращается · для 500–1 000 шт. обсуждается</p><p className="muted">* Итоговый MOQ зависит от модели, ткани и метода печати. Анна подтвердит его в предложении.</p><a className="btn btn-primary" href="mailto:annawei@nameerbag.com">Email Анне Вэй</a></aside>
    </div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="badge">Преимущества модели</span><h2>Почему покупатели выбирают эту модель</h2></div></div><div className="spec-grid">{ru.features.map((feature) => <div className="spec-card" key={feature}><strong>{feature}</strong><p className="muted">Для OEM/ODM, private label и оптовых заказов.</p></div>)}</div></div></section>
  </>;
}

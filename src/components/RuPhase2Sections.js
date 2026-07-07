import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { assetPath, productPath } from '@/lib/paths';
import { ruPhase2, ruShared } from '@/data/ru-phase1';

function categoryName(category) {
  return ruPhase2.categoryNames[category.slug] || category.name;
}

function productType(slug, product) {
  const text = `${slug} ${product.title || ''} ${product.categorySlug || ''}`.toLowerCase();
  if (text.includes('waist')) return 'waist';
  if (text.includes('backpack')) return 'backpack';
  if (text.includes('drawstring')) return 'drawstring';
  return 'crossbody';
}

const productTypeLabels = {
  waist: 'поясная сумка',
  backpack: 'рюкзак с полной запечаткой',
  drawstring: 'сумка с кулиской',
  crossbody: 'сумка через плечо с полной запечаткой',
};

const productTypeIntro = {
  waist: 'Компактная модель для промо-мерча, фестивалей и повседневных коллекций с печатью по всей поверхности.',
  backpack: 'Рюкзак для розницы, школ и брендированных кампаний: можно адаптировать artwork, материал, молнии и упаковку.',
  drawstring: 'Легкая сумка для мероприятий и промо-заказов, где важны быстрая подготовка макета и гибкий MOQ.',
  crossbody: 'Модель через плечо для городских коллекций и сувенирных программ с полной запечаткой и private label.',
  default: 'Модель подходит для OEM/ODM заказа: логотип, материал, цвет, упаковка и образец согласуются перед производством.',
};

const badgeTranslations = {
  '360° All-Over Print': 'печать 360°',
  'All-Over Logo Printing': 'печать логотипа по всей поверхности',
  'All-Over Print': 'полная запечатка',
  Backpack: 'рюкзак',
  'Custom Pattern': 'индивидуальный паттерн',
  'Double Zipper': 'двойная молния',
  'Envelope Crossbody': 'сумка-конверт через плечо',
  'Front Bungee Detail': 'эластичный шнур спереди',
  'Full Print': 'полная печать',
  'Full-Print': 'полная печать',
  'Full-Print Customization': 'кастомизация полной печати',
  'Full-Surface Branding': 'брендинг по всей поверхности',
  'Large Capacity': 'большая вместимость',
  'Lightweight Nylon': 'легкий нейлон',
  'Low MOQ': 'низкий MOQ',
  'Multiple Compartments': 'несколько отделений',
  'Print Variations': 'варианты печати',
  'Private Label': 'private label',
  'Reflective Nylon': 'светоотражающий нейлон',
  'Sling Bag': 'сумка-слинг',
  'Travel Ready': 'для поездок',
  'Urban Daily Style': 'городской стиль',
  'Waist Bag': 'поясная сумка',
  'Water-Resistant Nylon': 'водоотталкивающий нейлон',
};

function translatedBadges(product) {
  return (product.badges || []).slice(0, 3).map((badge) => badgeTranslations[badge] || ruPhase2.badges[badge] || badge);
}

export function RuProductCard({ slug, product }) {
  const model = product.model || slug.toUpperCase();
  const typeKey = productType(slug, product);
  const type = productTypeLabels[typeKey] || productTypeLabels.crossbody;
  const intro = productTypeIntro[typeKey] || productTypeIntro.default;
  const title = `${model} ${type}`;

  return (
    <article className="card product-card">
      <Link className="card-media" href={productPath(slug)}>
        <img src={assetPath(product.cardImage || product.hero)} alt={title} loading="lazy" decoding="async" />
        <span className="logo-location-pill">Зона логотипа</span>
      </Link>
      <div className="card-body">
        <div className="chip-list">{translatedBadges(product).map((badge) => <span className="badge" key={badge}>{badge}</span>)}</div>
        <h3 className="card-title">{title}</h3>
        <p className="muted">{intro}</p>
        <div className="card-price">{ruPhase2.priceText}</div>
      </div>
      <div className="card-actions">
        <Link className="btn btn-primary" href={productPath(slug)}>Смотреть детали</Link>
        <Link className="btn btn-secondary" href={`/ru/contact?product=${encodeURIComponent(slug)}`}>Получить расчёт</Link>
      </div>
    </article>
  );
}

export function RuProductsPage({ activeCategory = '' }) {
  const activeCategoryName = siteData.categories.find((category) => category.slug === activeCategory);
  const products = Object.entries(siteData.products).filter(([, product]) => (activeCategory ? product.categorySlug === activeCategory : true));

  return (
    <>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div><span className="badge">Каталог продукции</span><h1>{activeCategoryName ? categoryName(activeCategoryName) : 'Каталог сумок с полной запечаткой'}</h1><p>Фильтруйте модели по категории, смотрите фото и отправляйте запрос на расчёт. Детальные страницы пока открываются на английском языке.</p></div>
            <Link className="btn btn-primary" href="/ru/contact">Получить расчёт</Link>
          </div>
          <div className="filter-row">
            <Link className={`filter-pill ${!activeCategory ? 'is-active' : ''}`} href="/ru/products">Все товары</Link>
            {siteData.categories.map((category) => <Link className={`filter-pill ${activeCategory === category.slug ? 'is-active' : ''}`} href={`/ru/products?category=${category.slug}`} key={category.slug}>{categoryName(category)}</Link>)}
          </div>
          <div className="grid grid-4">
            {siteData.categories.map((category) => (
              <Link className="card category-mini" href={`/ru/products?category=${category.slug}`} key={category.slug}>
                <img src={assetPath(category.image)} alt={categoryName(category)} />
                <strong>{categoryName(category)}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Все модели</span><h2>{activeCategoryName ? `${categoryName(activeCategoryName)}: модели` : 'Доступные модели сумок'}</h2><p>Для импортёров, промо-заказов, маркетплейсов и private label брендов.</p></div></div>
          <div className="grid grid-3">{products.map(([slug, product]) => <RuProductCard key={slug} slug={slug} product={product} />)}</div>
        </div>
      </section>
    </>
  );
}

export function RuHomePhase2() {
  const hero = siteData.heroSlides?.[0];
  const featured = siteData.homeFeaturedProducts.map((slug) => [slug, siteData.products[slug]]).filter(([, product]) => product);

  return (
    <>
      <section className="hero">
        {hero?.video ? <video className="hero-bg-video" src={assetPath(hero.video)} autoPlay muted loop playsInline preload="metadata" poster={assetPath(hero.image)} /> : null}
        {hero?.image ? <img className="hero-bg-slide active" src={assetPath(hero.image)} alt="" loading="eager" decoding="async" /> : null}
        <div className="hero-scrim" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="badge">All-over print OEM/ODM</span>
            <h2>{ruPhase2.homeHeroTitle}</h2>
            <p>{ruPhase2.homeHeroText}</p>
            <div className="hero-metrics">
              <div><strong>Полная запечатка</strong><span>Artwork и лекала</span></div>
              <div><strong>MOQ от 50 шт</strong><span>Гибкие уровни заказа</span></div>
              <div><strong>7-15 дней</strong><span>Образец после подтверждения</span></div>
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/ru/products">Смотреть товары</Link><Link className="btn btn-secondary" href="/ru/custom-service">Услуги кастомизации</Link></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Что мы производим</span><h2>Категории all-over print сумок</h2><p>Изображения и модели взяты из действующего английского каталога.</p></div><Link className="btn btn-secondary" href="/ru/products">Все товары</Link></div>
          <div className="grid grid-3">
            {siteData.categories.map((category) => (
              <article className="card category-card" key={category.slug}>
                <Link className="card-media" href={`/ru/products?category=${category.slug}`}><img src={assetPath(category.image)} alt={categoryName(category)} /></Link>
                <div className="card-body"><h3 className="card-title">{categoryName(category)}</h3><p className="muted">{ruPhase2.categoryDesc[category.slug]}</p><div className="card-price">{ruPhase2.priceText}</div></div>
                <div className="card-actions"><Link className="btn btn-primary" href={`/ru/products?category=${category.slug}`}>Смотреть модели</Link><Link className="btn btn-secondary" href={`/ru/contact?product=${category.slug}`}>Получить расчёт</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="section-head"><div><span className="badge">Рекомендуемые модели</span><h2>Популярные сумки с полной запечаткой</h2><p>Карточки используют те же фото и продуктовые данные, что и английская версия.</p></div></div>
          <div className="grid grid-3">{featured.map(([slug, product]) => <RuProductCard key={slug} slug={slug} product={product} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container process-grid">
          <div>
            <span className="badge">Почему выбирают нас</span>
            <h2>Печать, производство и экспорт в одном процессе</h2>
            <div className="feature-list">
              <div className="feature-item"><div className="icon-bubble">1</div><div><strong>MOQ</strong><div className="muted">{ruShared.moq}</div></div></div>
              <div className="feature-item"><div className="icon-bubble">2</div><div><strong>Образец</strong><div className="muted">{ruShared.sample}</div></div></div>
              <div className="feature-item"><div className="icon-bubble">3</div><div><strong>Сроки</strong><div className="muted">{ruShared.leadTime}</div></div></div>
            </div>
          </div>
          <div className="media-stack">
            <img src={assetPath('/assets/images/junyi/company/trade-show-collage.png')} alt="Junyi Bags выставка и сервис" />
            <img src={assetPath('/assets/images/junyi/company/factory-building.png')} alt="фабрика Junyi Bags" />
          </div>
        </div>
      </section>
    </>
  );
}

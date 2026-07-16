import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { assetPath } from '@/lib/paths';
import { i18nAlternates } from '@/lib/i18n';

export const metadata = {
  title: 'About Junyi Bags | All-Over Print Bag Manufacturer',
  description: 'Meet Junyi Bags, an all-over print manufacturer turning buyer artwork into sublimation panels, sewn samples and scalable custom bag production.',
  alternates: i18nAlternates('/about')
};

export default function AboutPage() {
  return (
    <>
      <section className="section bg-soft">
        <div className="container about-grid">
          <div>
            <span className="badge">About Junyi Bags</span>
            <h1>{siteData.company.name}</h1>
            <p className="muted">{siteData.company.tagline}. Junyi focuses on the path from artwork to finished bag: templates, color review, sublimation panels, cutting and sewing are coordinated as one all-over print workflow.</p>
            <div className="stats">
              <div><strong>20+</strong><span>Years in bag manufacturing</span></div>
              <div><strong>3,000</strong><span>sqm sewing workshop</span></div>
              <div><strong>50</strong><span>Team members</span></div>
              <div><strong>200,000+</strong><span>Units produced annually</span></div>
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Contact Sales</Link><Link className="btn btn-secondary" href="/products">View Products</Link></div>
          </div>
          <figure className="media-panel trust-figure">
            <img src={assetPath('/assets/images/junyi/company/factory-building.png')} alt="Junyi-signed production block at the shared Baigou factory site" />
            <figcaption>The Junyi-signed production block, one of the buildings within the shared Baigou factory site.</figcaption>
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Our Focus</span><h2>From print file to sewn all-over pattern</h2><p>Artwork is checked against bag templates before sublimation, then printed panels move through cutting and sewing in the Baigou workshop. The Tianjin team coordinates files, approvals and export details.</p><p>Junyi's artwork-to-bag workflow runs inside one Baigou factory site made up of production and office buildings; the sewing workshop measures 3,000 sqm. The site and its production crew are shared by Tianjin Nameer International Trade Co., Ltd. and Tianjin Junyi Premium Trading Co., Ltd., accounting for both names being visible there. In Tianjin, the trade team checks specifications, prepares shipping documents and coordinates logistics.</p></div></div>
          <div className="grid grid-3">
            {[
              ['Artwork Preparation', 'Check resolution, repeat placement and printable panel boundaries before a sample is produced.'],
              ['Sublimation Workflow', 'Transfer approved artwork across cut panels for edge-to-edge color and pattern coverage.'],
              ['Sample-to-Bulk Control', 'Confirm color, seams, trims and packaging before scaling the approved print design.']
            ].map(([title, text]) => <article className="card info-card" key={title}><div className="card-body"><h3>{title}</h3><p className="muted">{text}</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Export Markets</span>
              <h2>Artwork-led programs for repeat export markets</h2>
              <p>All-over print bags ship to buyers in the USA, Canada, Mexico, UK, Russia, Japan, Singapore, Malaysia, Bangladesh, Peru and Djibouti, with artwork and production approvals managed in one workflow.</p>
            </div>
          </div>
          <div className="trust-showcase">
            <figure className="media-panel trust-figure">
              <img src={assetPath('/assets/images/junyi/company/factory-building.png')} alt="Junyi sewing factory exterior in Baigou Hebei" />
              <figcaption>Baigou workshop where printed panels are cut, aligned and sewn into finished bags.</figcaption>
            </figure>
            <figure className="media-panel trust-figure">
              <img src={assetPath('/assets/images/junyi/factory/fullprint-artwork-prepress.jpg')} alt="Bag panel dimensions reviewed at Junyi's artwork workstation" />
              <figcaption>Prepress review of bag dimensions and panel layout before material preparation.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section about-story">
        <div className="container story-layout">
          <div><span className="badge">A Junyi Partnership</span><h2>The Russian buyer who simply kept ordering</h2></div>
          <div className="story-copy">
            <p>A Russian buyer found us through a B2B platform in 2019. The first order was 200-300 bags. Today, the program has grown to around 10,000 bags per year.</p>
            <p>The recurring range includes shoulder bags and waist bags with full customization across artwork, print placement, colors, labels, zipper details, lining and packaging.</p>
            <p><strong>Seven years. No dramatic story to tell. He just kept ordering.</strong></p>
            <div className="story-actions"><Link className="btn btn-primary" href="/contact">Start an All-Over Print Project</Link><a className="btn btn-secondary" href="https://wa.me/8615102249548">WhatsApp Anna</a></div>
          </div>
        </div>
      </section>
    </>
  );
}

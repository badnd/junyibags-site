import Link from 'next/link';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Factory Strength | Custom Bag OEM/ODM',
  description: 'Factory workflow for custom bag sampling, logo confirmation, bulk production and quality control for B2B orders.',
  alternates: { canonical: '/factory' }
};

export default function FactoryPage() {
  const productionVideos = [
    ['Full-Print Cutting', '/assets/videos/factory/factory-fullprint-cutting-machine-18s.mp4', 'Automated cutting support for full-print bag panels before sewing.'],
    ['Pattern Cutting', '/assets/videos/factory/factory-pattern-cutting-15s.mp4', 'Pattern and panel preparation helps keep artwork placement consistent across custom orders.'],
    ['Detail Sewing', '/assets/videos/factory/factory-camo-bag-detail-13s.mp4', 'Skilled sewing teams handle zipper, strap and edge details for printed bag styles.'],
    ['Production Line', '/assets/videos/factory/factory-production-line-21s.mp4', 'Live production workflow from panel preparation to assembly and order packing.']
  ];

  return (
    <>
      <section className="section bg-soft">
        <div className="container process-grid">
          <div>
            <span className="badge">Factory Workflow</span>
            <h1>Clear custom bag production process</h1>
            <p className="muted">From product idea to sampling and bulk order, we keep the workflow practical for overseas buyers. Sewing production is handled by our Baigou factory, while our Tianjin export team supports international communication, documentation and logistics.</p>
            <div className="feature-list">
              {['Requirement review', 'Material and logo confirmation', 'Sample development', 'Bulk production and packing'].map((item, index) => (
                <div className="feature-item" key={item}><div className="icon-bubble">{index + 1}</div><div><strong>{item}</strong><div className="muted">Step {index + 1} for transparent production communication.</div></div></div>
              ))}
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Discuss Your Order</Link></div>
          </div>
          <div className="media-stack">
            <img src={assetPath('/assets/images/junyi/company/production-process.png')} alt="custom bag factory process" />
            <img src={assetPath('/assets/images/junyi/company/factory-building.png')} alt="custom bag factory exterior" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Quality Points</span><h2>What we confirm before shipment</h2></div></div>
          <div className="grid grid-4">
            {['Material and color', 'Logo placement', 'Stitching and zipper', 'Packing and labels'].map((item) => <article className="card info-card" key={item}><div className="card-body"><h3>{item}</h3><p className="muted">Checked according to order details and approved sample direction.</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Live Production</span>
              <h2>Full-print bag production in our workshop</h2>
              <p>These factory videos show real cutting, sewing and production-line work for all-over print bags, helping buyers understand how custom artwork moves from panels to finished products. Our bags ship to clients across North America, Europe, Asia, Latin America and Africa.</p>
            </div>
          </div>
          <div className="video-grid">
            {productionVideos.map(([title, src, text]) => (
              <article className="video-card" key={title}>
                <video src={assetPath(src)} controls preload="metadata" playsInline />
                <div>
                  <h3>{title}</h3>
                  <p className="muted">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

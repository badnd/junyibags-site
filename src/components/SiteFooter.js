import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { whatsappUrl } from '@/lib/paths';
import { FloatingContactBall } from '@/components/FloatingContactBall';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer id="site-footer" className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="footer-logo-panel footer-text-logo">
                <span className="brand-icon" aria-hidden="true">JY</span>
                <span className="brand-wordmark">Junyi Bags</span>
              </span>
              <small>{siteData.company.tagline}</small>
            </div>
            <p>{siteData.company.name} supplies custom bag solutions for global B2B buyers, including full-print crossbody bags, waist bags, sling bags and backpacks.</p>
            <p className="muted">Own factory in Baigou, Hebei · Export office in Tianjin</p>
          </div>
          <div>
            <h4>Products</h4>
            <ul>{siteData.categories.slice(0, 7).map((category) => <li key={category.slug}><Link href={category.link || `/products?category=${category.slug}`}>{category.name}</Link></li>)}</ul>
            <h4 className="footer-subhead">Custom Solutions</h4>
            <ul>
              <li><Link href="/all-over-print-backpacks">All-Over Print Backpacks</Link></li>
              <li><Link href="/all-over-print-tote-bags">All-Over Print Tote Bags</Link></li>
              <li><Link href="/all-over-print-drawstring-bags">All-Over Print Drawstring Bags</Link></li>
              <li><Link href="/printing/sublimation-printing">Sublimation Printing</Link></li>
            </ul>
          </div>
          <div>
            <h4>Buyer Service</h4>
            <ul>
              <li><Link href="/custom-service">OEM / ODM Service</Link></li>
              <li><Link href="/factory">Factory Strength</Link></li>
              <li><Link href="/products">Product Catalog</Link></li>
              <li><Link href="/blog">Buying Guides</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Email: <a href={`mailto:${siteData.company.email}`}>{siteData.company.email}</a></li>
              <li>WhatsApp: <a href={whatsappUrl(siteData)} target="_blank" rel="noopener">{siteData.company.whatsapp}</a></li>
              <li>WeChat: {siteData.company.wechat}</li>
              <li>{siteData.company.priceText}</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom"><span>&copy; {year} {siteData.company.name}. All rights reserved.</span></div>
      </footer>
      <FloatingContactBall siteName="junyibags.com" />
    </>
  );
}

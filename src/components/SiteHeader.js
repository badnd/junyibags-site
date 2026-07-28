'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteData } from '@/data/site-data';
import { whatsappUrl } from '@/lib/paths';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isRu = pathname === '/ru' || pathname?.startsWith('/ru/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', open);
    return () => document.body.classList.remove('mobile-nav-open');
  }, [open]);

  const links = [
    ['Home', '/'],
    ['Products', isRu ? '/ru/products' : '/products'],
    ['Customization', '/custom-service'],
    ['Factory', '/factory'],
    ['About Us', '/about'],
    [isRu ? 'Ресурсы' : 'Resources', isRu ? '/ru/resources' : '/resources'],
    ['Blog', isRu ? '/ru/blog' : '/blog'],
    ['Contact', '/contact']
  ];

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-items">
            <span>Email: {siteData.company.email}</span>
            <span>WhatsApp: {siteData.company.whatsapp}</span>
            <span>WeChat: {siteData.company.wechat}</span>
          </div>
          <div className="topbar-actions">
            <span>OEM / ODM Custom Bag Manufacturer</span>
            <span>Low MOQ - Fast Response</span>
          </div>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <Link href="/" className="brand brand-text-logo" aria-label="Junyi Bags home">
            <span className="brand-icon" aria-hidden="true">JY</span>
            <span className="brand-wordmark">Junyi Bags</span>
          </Link>
          <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">Menu</button>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map(([label, href]) => (
              <li key={href}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>
            ))}
          </ul>
          <div className="nav-actions">
            <LanguageSwitcher />
            <div className="inquiry-cta-pair">
              <Link className="btn btn-primary" href="/contact">Send Request</Link>
              <a className="btn btn-secondary" href={`mailto:${siteData.company.email}?subject=${encodeURIComponent('Inquiry from junyibags.com')}`}>Email Us</a>
            </div>
            <a className="btn btn-primary" href={whatsappUrl(siteData)} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </header>
    </>
  );
}

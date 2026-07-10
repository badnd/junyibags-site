import { siteData } from '@/data/site-data';
import { InquiryForm } from '@/components/InquiryForm';
import { whatsappUrl } from '@/lib/paths';
import { i18nAlternates } from '@/lib/i18n';

export const metadata = {
  title: 'Contact Junyi Bags | Custom Bag Factory Quote',
  description: 'Contact Junyi Bags for custom crossbody bag, waist bag, sling bag and backpack OEM/ODM quotation within 24 hours.',
  alternates: i18nAlternates('/contact')
};

export default function ContactPage() {
  return (
    <section className="section bg-soft">
      <div className="container contact-grid">
        <div>
          <span className="badge">Contact Sales</span>
          <h1>Get a custom bag factory quote</h1>
          <p className="muted">Send product type, quantity, logo method and target market. We will reply with MOQ, sample options and production suggestions.</p>
          <div className="contact-mini">
            <div><strong>Email:</strong> <a href={`mailto:${siteData.company.email}`}>{siteData.company.email}</a></div>
            <div><strong>WhatsApp:</strong> <a href={whatsappUrl(siteData)} target="_blank" rel="noopener">{siteData.company.whatsapp}</a></div>
            <div><strong>WeChat:</strong> {siteData.company.wechat}</div>
          </div>
        </div>
        <div className="quote-card">
          <h2>Send Inquiry</h2>
          <InquiryForm productTitle="Contact Page Inquiry" productOptions={siteData.categories.map((category) => category.name)} />
        </div>
      </div>
    </section>
  );
}

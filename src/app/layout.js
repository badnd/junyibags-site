import './globals.css';
import Script from 'next/script';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { siteData } from '@/data/site-data';
import { JsonLd } from '@/components/JsonLd';
import { assetPath, organizationSchema } from '@/lib/paths';

export const metadata = {
  metadataBase: new URL('https://www.junyibags.com'),
  title: {
    default: 'Junyi Bags | OEM ODM Custom Bag Manufacturer',
    template: '%s | Junyi Bags'
  },
  description: 'Tianjin Junyi Premium Trading Co.,Ltd. supplies OEM/ODM custom bags for B2B buyers, including full-print crossbody bags, waist bags, sling bags and backpacks.',
  openGraph: {
    type: 'website',
    siteName: 'Junyi Bags',
    images: [assetPath('/assets/images/junyi/company/custom-bag-manufacturer-poster.png')]
  },
  twitter: {
    card: 'summary_large_image',
    images: [assetPath('/assets/images/junyi/company/custom-bag-manufacturer-poster.png')]
  },
  icons: {
    icon: assetPath('/assets/images/junyi/brand/favicon-32.png'),
    apple: assetPath('/assets/images/junyi/brand/favicon-180.png')
  },
  verification: {
    google: 'IQUna8ebvLl8rqUvAXXzcLbKYeVNrGoXA8WudQcb0W4'
  }
};

export default function RootLayout({ children }) {
  const ga4 = siteData.analytics?.ga4;

  return (
    <html lang="en">
      <body>
        {ga4 ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4}');
        `}</Script>
          </>
        ) : null}
        <JsonLd data={organizationSchema(siteData)} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

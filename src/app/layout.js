import './globals.css';
import Script from 'next/script';
import { headers } from 'next/headers';
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
    google: 'IQUna8ebvLl8rqUvAXXzcLbKYeVNrGoXA8WudQcb0W4',
    other: {
      'msvalidate.01': 'AD12B57AA450C181C4A8D6F90403CA06',
      'yandex-verification': 'a5ac24013a819bd5'
    }
  }
};

export default async function RootLayout({ children }) {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID || siteData.analytics?.ga4;
  const requestHeaders = await headers();
  const pathname = requestHeaders.get('x-pathname') || '';
  const lang = pathname.startsWith('/ru') ? 'ru' : 'en';

  return (
    <html lang={lang}>
      <body>
        {ga4 ? <Script id="ga4-delayed" strategy="afterInteractive">{`
          window.setTimeout(function () {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${ga4}');
            var ga = document.createElement('script');
            ga.async = true;
            ga.src = 'https://www.googletagmanager.com/gtag/js?id=${ga4}';
            document.head.appendChild(ga);
          }, 1200);
        `}</Script> : null}
        <JsonLd data={organizationSchema(siteData)} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

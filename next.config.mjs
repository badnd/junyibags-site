const productRedirects = [
  'ytljy8083',
  'ytljy6858',
  'ytljy6825',
  'ytljy6830',
  'ytljy5634',
  'ytljy944',
  'ytljy6835',
  'ytljy6824',
  'yqjy0014'
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  trailingSlash: false,
  experimental: { cpus: 1 },
  async redirects() {
    const baseRedirects = [
      { source: '/pages/products.html', destination: '/products', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/pages/about.html', destination: '/about', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/pages/factory.html', destination: '/factory', permanent: true },
      { source: '/factory.html', destination: '/factory', permanent: true },
      { source: '/pages/contact.html', destination: '/contact', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/pages/custom-service.html', destination: '/custom-service', permanent: true },
      { source: '/custom-service.html', destination: '/custom-service', permanent: true },
      { source: '/customization', destination: '/custom-service', permanent: true },
      { source: '/customization.html', destination: '/custom-service', permanent: true },
      { source: '/pages/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/pages/blog.html', destination: '/blog', permanent: true },
      { source: '/blog.html', destination: '/blog', permanent: true }
    ];

    return [
      ...baseRedirects,
      ...productRedirects.flatMap((slug) => [
        { source: `/pages/product-${slug}.html`, destination: `/products/${slug}`, permanent: true },
        { source: `/product-${slug}.html`, destination: `/products/${slug}`, permanent: true },
        { source: `/product-${slug}`, destination: `/products/${slug}`, permanent: true }
      ])
    ];
  }
};

export default nextConfig;

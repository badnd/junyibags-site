const cardProductSlugs = ['ytljy8083','ytljy6858','ytljy6825','ytljy6830','ytljy5634','ytljy944','ytljy6835','ytljy6824','all-over-print-crossbody-bag-ytljy956','all-over-print-vertical-crossbody-ytljy6840','yqjy0014','full-print-custom-crossbody-bag-ytljy5633','full-print-compact-crossbody-bag-ytljy5642'];
const categoryProducts = {'crossbody-sling-bags':'ytljy8083','waist-bags':'ytljy6858',backpacks:'yqjy0014'};
export const productCardImage = (slug) => `assets/images/junyi/products/${slug}/thumb-card.webp`;
const categoryImageOverrides = {
  // The original poster thumbnail includes a strip of miniature views at its base.
  // This is an existing clean backpack lifestyle image from the same product gallery.
  backpacks: 'assets/images/junyi/products/yqjy0014/yqjy0014-02.png'
};
export const categoryCardImage = (slug) => categoryImageOverrides[slug] ?? productCardImage(categoryProducts[slug]);
export const blogCardImage = (index) => productCardImage(cardProductSlugs[index % cardProductSlugs.length]);

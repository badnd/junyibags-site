const cardProductSlugs = ['ytljy8083','ytljy6858','ytljy6825','ytljy6830','ytljy5634','ytljy944','ytljy6835','ytljy6824','all-over-print-crossbody-bag-ytljy956','all-over-print-vertical-crossbody-ytljy6840','yqjy0014','full-print-custom-crossbody-bag-ytljy5633','full-print-compact-crossbody-bag-ytljy5642'];
const categoryProducts = {'crossbody-sling-bags':'ytljy8083','waist-bags':'ytljy6824',backpacks:'yqjy0014'};
export const productCardImage = (slug) => `assets/images/junyi/products/${slug}/thumb-card.webp`;
export const categoryCardImage = (slug) => productCardImage(categoryProducts[slug]);
export const blogCardImage = (index) => productCardImage(cardProductSlugs[index % cardProductSlugs.length]);

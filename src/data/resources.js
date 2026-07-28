export const resourcePages = [
  {
    slug: 'artwork-preparation-guide',
    files: { en: 'artwork-preparation-guide.en.md', ru: 'artwork-preparation-guide.ru.md' },
    meta: {
      en: { title: 'Artwork Preparation Guide for All-Over Print Bags', description: 'Prepare artwork files, resolution, colors, seams and repeating patterns for all-over print bag production.' },
      ru: { title: 'Подготовка макета для сумок с полноцветной печатью', description: 'Подготовьте файлы, разрешение, цвета, швы и повторяющиеся узоры для производства сумок с полной запечаткой.' },
    },
    related: {
      en: [['Choose fabric and print method', '/resources/all-over-print-fabric-method'], ['Browse all-over print bags', '/products'], ['All-over print service', '/full-print']],
      ru: [['Выбрать ткань и метод печати', '/ru/resources/all-over-print-fabric-method'], ['Каталог сумок с полной запечаткой', '/ru/products'], ['Услуга полной запечатки', '/ru/full-print']],
    },
  },
  {
    slug: 'all-over-print-fabric-method',
    files: { en: 'all-over-print-fabric-method.en.md', ru: 'all-over-print-fabric-method.ru.md' },
    meta: {
      en: { title: 'All-Over Print Fabric and Method Guide', description: 'Compare printable fabrics, sublimation behavior, color results and the limits of all-over print bag production.' },
      ru: { title: 'Ткани и методы для полной запечатки сумок', description: 'Сравните ткани для печати, особенности сублимации, передачу цвета и ограничения полной запечатки.' },
    },
    related: {
      en: [['All-over print service', '/full-print'], ['Browse printed bags', '/products'], ['Prepare your artwork', '/resources/artwork-preparation-guide']],
      ru: [['Услуга полной запечатки', '/ru/full-print'], ['Каталог принтованных сумок', '/ru/products'], ['Подготовить макет', '/ru/resources/artwork-preparation-guide']],
    },
  },
];

export const resourceHub = {
  en: { title: 'All-Over Print Resources', intro: 'Production guides for artwork, printable fabrics, color control and all-over print bag planning.', badge: 'Print production tools', open: 'Open guide' },
  ru: { title: 'Ресурсы по полной запечатке', intro: 'Руководства по макетам, тканям для печати, контролю цвета и планированию производства.', badge: 'Инструменты печати', open: 'Открыть руководство' },
};

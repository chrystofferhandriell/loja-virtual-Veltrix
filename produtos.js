(function (window) {
  'use strict';

  const PRODUCTS = [
    {
      id: 'tenis-fila-racer',
      name: 'Tênis Fila Racer Neon',
      category: 'tenis',
      price: 69990,
      description: 'Tecnologia de amortecimento responsivo e cabedal respirável com acabamento neon.',
      image: 'tenis-fila-racer-fastpace-masculino-vrdl-681b6d52af67e.jpg',
      gallery: ['tenis-fila-racer-fastpace-masculino-vrdl-681b6d52af67e.jpg',],
      sizes: ['37', '38', '39', '40', '41', '42', '43'],
      highlight: true
    },
    {
      id: 'tenis-air-jordan',
      name: 'Tênis Air Jordan',
      price: 54990,
      category: 'tenis',
      description: 'Leveza extrema com entressola em espuma reativa e suporte anatômico.',
      image: 'dz5485-106_1.jpg',
      gallery: ['dz5485-106_1.jpg'],
      sizes: ['36', '37', '38', '39', '40', '41'],
      highlight: true
    },
    {
      id: 'tenis-adidas-ultraboost',
      name: 'Tênis Adidas Ultraboost',
      category: 'tenis',
      price: 48990,
      description: 'Design urbano com solado em borracha vulcanizada e palmilha memory foam.',
      image: 'tenis_adidas_ultraboost_22_masculino_gx5917_773_1_baf32025745117ab6b5a7feee7150cb8.webp',
      gallery: ['tenis_adidas_ultraboost_22_masculino_gx5917_773_1_baf32025745117ab6b5a7feee7150cb8.webp'],
      sizes: ['38', '39', '40', '41', '42', '43', '44']
    },
    {
      id: 'Ray-ban-Aviator',
      name: 'Óculos Rayban Aviator',
      category: 'oculos',
      price: 39990,
      description: 'Lentes com proteção total UV e armação leve em policarbonato com acabamento rosé.',
      image: 'oculos-de-sol-rayban-rb3025l-polarizado-original-tamanho-58-original.jpg',
      gallery: ['oculos-de-sol-rayban-rb3025l-polarizado-original-tamanho-58-original.jpg'],
      sizes: ['Único'],
      highlight: true
    },
    {
      id: ' Celine-Bold-3-Dots',
      name: ' Óculos Celine Bold 3 Dots',
      category: 'oculos',
      price: 45990,
      description: 'Estilo futurista com lentes espelhadas e proteção anti-reflexo premium.',
      image: 'Oculos-de-Sol-Fendi-Diamonds-FE40161I-01B-COR-NAO-DEFINIDA-70E7844E-1-360x360.jpg.webp',
      gallery: ['Oculos-de-Sol-Fendi-Diamonds-FE40161I-01B-COR-NAO-DEFINIDA-70E7844E-1-360x360.jpg.webp'],
      sizes: ['Único']
    },
    {
      id: ' Round-Fleck-Lemtosh',
      name: 'Óculos Round Fleck Lemtosh',
      category: 'oculos',
      price: 34990,
      description: 'Design transparente, leve e versátil para compor qualquer look.',
      image: 'oculos_de_sol_persol_3166_s_18793_2_d787b83ba8e8622a02846c9d9b2524ce.webp',
      gallery: ['oculos_de_sol_persol_3166_s_18793_2_d787b83ba8e8622a02846c9d9b2524ce.webp'],
      sizes: ['Único']
    },
    {
      id: 'Citizen-Eco-Drive',
      name: 'Citizen Eco-Drive',
      category: 'relogios',
      price: 62990,
      description: 'Tela AMOLED, monitoramento 24h, NFC e bateria para até 10 dias.',
      image: 'AT8020-03L_Lifestyle_PDP_Alt_2.webp',
      gallery: ['AT8020-03L_Lifestyle_PDP_Alt_2.webp'],
      sizes: ['40mm', '44mm'],
      highlight: true
    },
    {
      id: 'Locle_lifestyle',
      name: 'Relógio Le Locle Lifestyle',
      category: 'relogios',
      price: 57990,
      description: 'Pulseira em aço inox, resistência à água 5ATM e cronógrafo preciso.',
      image: 'LeLocle_Lifestyle_Product_Woman_Wrist_720x720.webp',
      gallery: ['LeLocle_Lifestyle_Product_Woman_Wrist_720x720.webp'],
      sizes: ['42mm']
    },
    {
      id: 'Apple-Watch',
      name: 'Apple Watch Series 9',
      category: 'relogios',
      price: 48990,
      description: 'Caixa slim em alumínio anodizado, GPS integrado e 60 modos esportivos.',
      image: 'Apple-Watch-Series-9-06.webp',
      gallery: ['Apple-Watch-Series-9-06.webp'],
      sizes: ['41mm', '45mm']
    }
  ];

  function formatCurrency(valueInCents) {
    return (valueInCents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  const catalog = {
    all() {
      return PRODUCTS.slice();
    },
    getById(id) {
      return PRODUCTS.find((product) => product.id === id) || null;
    },
    getByCategory(category) {
      return PRODUCTS.filter((product) => product.category === category);
    },
    search(query) {
      const text = query.trim().toLowerCase();
      if (!text) return PRODUCTS.slice();
      return PRODUCTS.filter((product) => {
        return (
          product.name.toLowerCase().includes(text) ||
          product.description.toLowerCase().includes(text) ||
          product.category.toLowerCase().includes(text)
        );
      });
    },
    featured(limit = 6) {
      const highlights = PRODUCTS.filter((product) => product.highlight);
      if (highlights.length >= limit) return highlights.slice(0, limit);
      const remaining = PRODUCTS.filter((product) => !product.highlight);
      return highlights.concat(remaining.slice(0, Math.max(0, limit - highlights.length)));
    },
    related(productId, limit = 3) {
      const current = this.getById(productId);
      if (!current) return this.featured(limit);
      const sameCategory = PRODUCTS.filter(
        (product) => product.category === current.category && product.id !== current.id
      );
      if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
      const extras = PRODUCTS.filter((product) => product.id !== current.id && !sameCategory.includes(product));
      return sameCategory.concat(extras.slice(0, Math.max(0, limit - sameCategory.length)));
    },
    formatCurrency
  };

  window.StepZoneCatalog = catalog;
})(window);
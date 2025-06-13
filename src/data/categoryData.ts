
export interface CategoryChannel {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  viewerCount: number;
  category: string;
  title: string;
  thumbnail: string;
  isLive: boolean;
}

export interface CategoryData {
  title: string;
  description: string;
  channels: CategoryChannel[];
}

export const categoryData: Record<string, CategoryData> = {
  cartas: {
    title: "Cartas",
    description: "Descubre las mejores subastas de cartas coleccionables",
    channels: [
      {
        id: '1',
        sellerName: 'cardmaster',
        sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 156,
        category: 'Cartas Pokemon',
        title: 'APERTURA DE SOBRES POKEMON - CARTAS RARAS',
        thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '2',
        sellerName: 'yugiohking',
        sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        viewerCount: 89,
        category: 'Yu-Gi-Oh!',
        title: 'Cartas Yu-Gi-Oh Vintage y Ediciones Especiales',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '3',
        sellerName: 'magicdealer',
        sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
        viewerCount: 203,
        category: 'Magic: The Gathering',
        title: 'Magic The Gathering - Cartas Black Lotus',
        thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
        isLive: true
      }
    ]
  },
  sneakers: {
    title: "Sneakers",
    description: "Encuentra los sneakers más exclusivos y ediciones limitadas",
    channels: [
      {
        id: '1',
        sellerName: 'sneakerhead',
        sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 267,
        category: 'Jordan',
        title: 'AIR JORDAN RETRO COLLECTION - EDICIONES LIMITADAS',
        thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '2',
        sellerName: 'nikecollector',
        sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 134,
        category: 'Nike',
        title: 'Nike Dunk SB Exclusivos y Colaboraciones',
        thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '3',
        sellerName: 'yeezystore',
        sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 189,
        category: 'Yeezy',
        title: 'Adidas Yeezy Boost - Modelos Raros',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
        isLive: true
      }
    ]
  },
  moda: {
    title: "Moda",
    description: "Descubre moda exclusiva y piezas de diseñador únicas",
    channels: [
      {
        id: '1',
        sellerName: 'fashionista',
        sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
        viewerCount: 145,
        category: 'Ropa Vintage',
        title: 'MODA VINTAGE Y PIEZAS ÚNICAS DE DISEÑADOR',
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '2',
        sellerName: 'luxurystyle',
        sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        viewerCount: 98,
        category: 'Bolsos',
        title: 'Bolsos de Lujo - Hermès, Chanel, Louis Vuitton',
        thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop',
        isLive: true
      }
    ]
  },
  juguetes: {
    title: "Juguetes",
    description: "Encuentra juguetes únicos y coleccionables",
    channels: [
      {
        id: '1',
        sellerName: 'toycollector',
        sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        viewerCount: 112,
        category: 'Figuras de Acción',
        title: 'FIGURAS DE ACCIÓN VINTAGE Y EDICIONES ESPECIALES',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '2',
        sellerName: 'legomaster',
        sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 87,
        category: 'LEGO',
        title: 'Sets LEGO Exclusivos y Descontinuados',
        thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
        isLive: true
      }
    ]
  },
  electronicos: {
    title: "Electrónicos",
    description: "Tecnología de última generación y gadgets exclusivos",
    channels: [
      {
        id: '1',
        sellerName: 'techdeals',
        sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 234,
        category: 'Smartphones',
        title: 'IPHONES Y SMARTPHONES ÚLTIMA GENERACIÓN',
        thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '2',
        sellerName: 'gamerstore',
        sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
        viewerCount: 178,
        category: 'Gaming',
        title: 'Consolas y Accesorios Gaming - PS5, Xbox',
        thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
        isLive: true
      }
    ]
  },
  coleccionables: {
    title: "Coleccionables",
    description: "Tesoros únicos y piezas de colección exclusivas",
    channels: [
      {
        id: '1',
        sellerName: 'vintagehunter',
        sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        viewerCount: 156,
        category: 'Antigüedades',
        title: 'ANTIGÜEDADES RARAS Y OBJETOS HISTÓRICOS',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
        isLive: true
      },
      {
        id: '2',
        sellerName: 'coinmaster',
        sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
        viewerCount: 93,
        category: 'Monedas',
        title: 'Monedas Antiguas y Billetes Coleccionables',
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
        isLive: true
      }
    ]
  }
};

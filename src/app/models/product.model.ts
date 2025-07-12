
interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge: string
  isLiked: boolean;
  rating: number;
  reviewCount: number;
  originalPrice: number,
  colors: Color[],
  sizes: string[],
  features: any,
}

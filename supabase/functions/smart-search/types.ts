
export type Category = "electronics" | "clothing" | "home-decor" | "accessories";

export interface Seller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  seller: Seller;
}

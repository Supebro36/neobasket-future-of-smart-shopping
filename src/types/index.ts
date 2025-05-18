
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

export interface Seller {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
}

export type Category = 
  | "electronics" 
  | "clothing" 
  | "home-decor" 
  | "accessories" 
  | "beauty" 
  | "books";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
  cart: CartItem[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}


import { DatabaseProduct, DatabaseSeller } from './database';

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

// Helper functions to convert between database and frontend types
export function convertDatabaseProductToProduct(dbProduct: DatabaseProduct & { sellers?: DatabaseSeller }): Product {
  console.log('Converting database product:', dbProduct);
  
  if (!dbProduct) {
    console.error('No product data to convert');
    throw new Error('No product data provided');
  }

  const converted = {
    id: dbProduct.product_id,
    name: dbProduct.name,
    price: dbProduct.price,
    description: dbProduct.description || '',
    category: dbProduct.category as Category,
    image: dbProduct.image_url || '/placeholder.svg',
    rating: 4.5, // Default rating - you can calculate this from reviews later
    reviews: 0, // Default reviews count
    inStock: dbProduct.stock_quantity > 0,
    tags: [dbProduct.category], // Default tags
    seller: {
      id: dbProduct.sellers?.seller_id || '',
      name: dbProduct.sellers?.business_name || dbProduct.sellers?.name || 'Unknown Seller',
      rating: 4.5, // Default seller rating
      verified: dbProduct.sellers?.verification_status === 'Verified'
    }
  };
  
  console.log('Converted product:', converted);
  return converted;
}

// Re-export database types for convenience
export * from './database';

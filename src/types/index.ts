
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
  stockQuantity: number;
  tags: string[];
  seller: Seller;
  specifications: any;
  createdAt: string;
  updatedAt: string;
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
export function convertDatabaseProductToProduct(dbProduct: any): Product {
  console.log('Converting database product:', dbProduct);
  
  // Handle seller data - it might be nested or null
  const seller = dbProduct.sellers || {};
  
  const converted: Product = {
    id: dbProduct.product_id || dbProduct.id,
    name: dbProduct.name || 'Unknown Product',
    price: parseFloat(dbProduct.price) || 0,
    discountPrice: dbProduct.discount_price ? parseFloat(dbProduct.discount_price) : undefined,
    image: dbProduct.image_url && dbProduct.image_url !== 'Null' ? dbProduct.image_url : '/placeholder.svg',
    description: dbProduct.description || '',
    category: (dbProduct.category || 'electronics') as Category,
    rating: dbProduct.rating || 4.5,
    reviews: dbProduct.review_count || Math.floor(Math.random() * 100) + 10,
    inStock: (dbProduct.stock_quantity || 0) > 0,
    stockQuantity: dbProduct.stock_quantity || 0,
    seller: {
      id: seller.seller_id || 'unknown',
      name: seller.name || seller.business_name || 'Unknown Seller',
      verified: seller.verification_status === 'Verified' || false,
      rating: seller.rating || 4.5
    },
    specifications: dbProduct.specifications || {},
    tags: Array.isArray(dbProduct.tags) ? dbProduct.tags : [],
    createdAt: dbProduct.created_at || new Date().toISOString(),
    updatedAt: dbProduct.updated_at || new Date().toISOString()
  };
  
  console.log('Converted product:', converted);
  return converted;
}

// Re-export database types for convenience
export * from './database';


import { Product, Seller, Category } from "../types";

const sellers: Seller[] = [
  {
    id: "seller1",
    name: "TechWonders",
    rating: 4.8,
    verified: true
  },
  {
    id: "seller2",
    name: "HomeDecorElite",
    rating: 4.7,
    verified: true
  },
  {
    id: "seller3",
    name: "FashionForward",
    rating: 4.5,
    verified: false
  },
  {
    id: "seller4",
    name: "ElectroHub",
    rating: 4.9,
    verified: true
  }
];

const products: Product[] = [
  {
    id: "prod1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    discountPrice: 249.99,
    description: "Premium noise-cancelling headphones with 30-hour battery life and crystal clear sound quality. Perfect for commuting, travel, and focused work.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 342,
    inStock: true,
    tags: ["headphones", "wireless", "audio", "bluetooth"],
    seller: sellers[0]
  },
  {
    id: "prod2",
    name: "Smart Home Speaker with Assistant",
    price: 129.99,
    discountPrice: 99.99,
    description: "Voice-controlled smart speaker with built-in virtual assistant. Control your smart home, play music, get answers, and more with simple voice commands.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    reviews: 218,
    inStock: true,
    tags: ["smart home", "speaker", "voice assistant", "bluetooth"],
    seller: sellers[0]
  },
  {
    id: "prod3",
    name: "Minimalist Table Lamp",
    price: 79.99,
    description: "Modern minimalist table lamp with adjustable brightness. Sleek design complements any room decor while providing perfect task or ambient lighting.",
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ["lamp", "home decor", "lighting", "minimalist"],
    seller: sellers[1]
  },
  {
    id: "prod4",
    name: "Premium Cotton T-Shirt",
    price: 34.99,
    discountPrice: 24.99,
    description: "Ultra-soft premium cotton t-shirt with modern fit. Breathable, comfortable, and durable for everyday wear in multiple colors.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 276,
    inStock: true,
    tags: ["t-shirt", "clothing", "cotton", "apparel"],
    seller: sellers[2]
  },
  {
    id: "prod5",
    name: "Wireless Earbuds",
    price: 159.99,
    discountPrice: 139.99,
    description: "True wireless earbuds with passive noise isolation, touch controls, and 24-hour battery life with charging case. Crystal clear audio for music and calls.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    tags: ["earbuds", "wireless", "audio", "bluetooth"],
    seller: sellers[3]
  },
  {
    id: "prod6",
    name: "Geometric Wall Art",
    price: 149.99,
    description: "Modern geometric wall art on canvas. Bold, contemporary design adds a striking focal point to any room with vibrant colors and clean lines.",
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviews: 87,
    inStock: true,
    tags: ["wall art", "home decor", "art", "modern"],
    seller: sellers[1]
  },
  {
    id: "prod7",
    name: "Smart Fitness Watch",
    price: 199.99,
    discountPrice: 179.99,
    description: "Advanced fitness tracker with heart rate monitor, sleep tracking, GPS, and 7-day battery life. Water-resistant design for all your activities.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 245,
    inStock: true,
    tags: ["smartwatch", "fitness", "health", "wearable"],
    seller: sellers[0]
  },
  {
    id: "prod8",
    name: "Designer Leather Bag",
    price: 249.99,
    description: "Handcrafted leather handbag with premium hardware and signature design details. Spacious interior with multiple compartments for organization.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 103,
    inStock: true,
    tags: ["bag", "leather", "handbag", "accessories"],
    seller: sellers[2]
  }
];

export default products;

export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getTopRatedProducts = (limit = 4): Product[] => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

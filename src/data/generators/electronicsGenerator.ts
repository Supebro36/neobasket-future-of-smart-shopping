
import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

// Generate electronics products with proper images
export const generateElectronicsProducts = (): Product[] => {
  const electronicsProducts: Product[] = [];
  
  const electronicsData = [
    {
      name: "Wireless Headphones",
      description: "High-quality audio with noise cancellation technology for immersive listening experience.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["audio", "wireless", "headphones", "bluetooth"]
    },
    {
      name: "Bluetooth Speaker",
      description: "Powerful sound with deep bass and long-lasting battery life for portable entertainment.",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["speaker", "audio", "bluetooth", "portable"]
    },
    {
      name: "Smart Watch",
      description: "Track fitness, manage notifications, and stay connected with this versatile wearable.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["wearable", "fitness", "smart", "watch"]
    },
    {
      name: "Laptop",
      description: "Powerful performance for work, gaming, and entertainment with stunning display.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["computer", "portable", "work", "gaming"]
    },
    {
      name: "Tablet",
      description: "Lightweight and portable device perfect for browsing, reading, and media consumption.",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["portable", "touch screen", "entertainment", "browsing"]
    },
    {
      name: "Smartphone",
      description: "Latest technology with high-resolution camera and all-day battery life.",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["mobile", "phone", "camera", "apps"]
    },
    {
      name: "Digital Camera",
      description: "Capture stunning photos and videos with professional quality results.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["photography", "video", "digital", "memory"]
    },
    {
      name: "Gaming Console",
      description: "Immersive gaming experience with high-definition graphics and exclusive titles.",
      image: "https://images.unsplash.com/photo-1605300473919-0c87fa937c1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["gaming", "entertainment", "video games", "multiplayer"]
    },
    {
      name: "Wireless Earbuds",
      description: "True wireless design with premium sound quality and convenient charging case.",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["audio", "wireless", "bluetooth", "portable"]
    },
    {
      name: "Smart TV",
      description: "Crystal clear 4K resolution with smart features and streaming capabilities.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["entertainment", "streaming", "4K", "smart"]
    },
    {
      name: "Drone",
      description: "Aerial photography and videography with stable flight and high-resolution camera.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["photography", "aerial", "flying", "camera"]
    },
    {
      name: "VR Headset",
      description: "Immersive virtual reality experience with comfortable fit and interactive controllers.",
      image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["gaming", "virtual reality", "immersive", "entertainment"]
    },
    {
      name: "Fitness Tracker",
      description: "Monitor health metrics and activity with this sleek and waterproof device.",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["fitness", "health", "wearable", "waterproof"]
    },
    {
      name: "External Hard Drive",
      description: "Reliable storage solution for backing up important files and data.",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["storage", "backup", "data", "portable"]
    },
    {
      name: "Wireless Mouse",
      description: "Ergonomic design with precise tracking and customizable buttons.",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["computer", "wireless", "ergonomic", "peripheral"]
    }
  ];
  
  for (let i = 0; i < 150; i++) {
    const dataIndex = i % electronicsData.length;
    const sellerIndex = i % sellers.length;
    const productData = electronicsData[dataIndex];
    
    const modelNumber = Math.floor(Math.random() * 1000) + 1000;
    const basePrice = randomPrice(49.99, 999.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    electronicsProducts.push({
      id: `electronics${i + 1}`,
      name: `${productData.name} ${modelNumber}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: productData.description,
      category: "electronics",
      image: productData.image,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: productData.tags,
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('electronics'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return electronicsProducts;
};

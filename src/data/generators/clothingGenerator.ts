
import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

export const generateClothingProducts = (): Product[] => {
  const clothingProducts: Product[] = [];
  
  const clothingData = [
    {
      name: "Cotton T-Shirt",
      description: "Comfortable and breathable cotton t-shirt perfect for everyday wear.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["cotton", "casual", "comfortable", "everyday"]
    },
    {
      name: "Denim Jeans",
      description: "Classic denim jeans with a modern fit and comfortable stretch fabric.",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["denim", "casual", "stretch", "classic"]
    },
    {
      name: "Wool Sweater",
      description: "Cozy wool sweater to keep you warm during cold weather.",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["wool", "warm", "winter", "cozy"]
    },
    {
      name: "Summer Dress",
      description: "Light and airy summer dress perfect for warm weather occasions.",
      image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["summer", "light", "dress", "feminine"]
    },
    {
      name: "Athletic Shorts",
      description: "Performance athletic shorts with moisture-wicking technology.",
      image: "https://images.unsplash.com/photo-1506629905607-49e2044e4c13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["athletic", "sports", "performance", "moisture-wicking"]
    },
    {
      name: "Formal Blazer",
      description: "Professional blazer perfect for business meetings and formal events.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["formal", "business", "professional", "elegant"]
    },
    {
      name: "Casual Hoodie",
      description: "Comfortable hoodie with soft fleece lining for ultimate comfort.",
      image: "https://images.unsplash.com/photo-1556821840-3a9c6dcb8c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["casual", "comfortable", "fleece", "relaxed"]
    },
    {
      name: "Running Shoes",
      description: "High-performance running shoes with advanced cushioning and support.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["running", "athletic", "comfortable", "performance"]
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket that adds edge to any outfit.",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["leather", "stylish", "jacket", "fashion"]
    },
    {
      name: "Silk Blouse",
      description: "Elegant silk blouse perfect for professional and formal occasions.",
      image: "https://images.unsplash.com/photo-1564257577633-c6d0ba7e3ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["silk", "elegant", "professional", "formal"]
    }
  ];
  
  for (let i = 0; i < 100; i++) {
    const dataIndex = i % clothingData.length;
    const sellerIndex = i % sellers.length;
    const productData = clothingData[dataIndex];
    
    const modelNumber = Math.floor(Math.random() * 1000) + 1000;
    const basePrice = randomPrice(19.99, 299.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    clothingProducts.push({
      id: `clothing${i + 1}`,
      name: `${productData.name} ${modelNumber}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: productData.description,
      category: "clothing",
      image: productData.image,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: productData.tags,
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('clothing'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return clothingProducts;
};

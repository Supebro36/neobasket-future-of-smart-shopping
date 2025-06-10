
import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

export const generateAccessoriesProducts = (): Product[] => {
  const accessoriesProducts: Product[] = [];
  
  const accessoriesData = [
    {
      name: "Leather Wallet",
      description: "Premium leather wallet with multiple card slots and bill compartments.",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["leather", "wallet", "premium", "cards"]
    },
    {
      name: "Sunglasses",
      description: "Stylish sunglasses with UV protection and polarized lenses.",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["sunglasses", "UV protection", "style", "polarized"]
    },
    {
      name: "Watch",
      description: "Elegant timepiece with precision movement and classic design.",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["watch", "timepiece", "elegant", "classic"]
    },
    {
      name: "Handbag",
      description: "Fashionable handbag with spacious compartments and quality materials.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["handbag", "fashion", "spacious", "quality"]
    },
    {
      name: "Jewelry Set",
      description: "Beautiful jewelry set including necklace, earrings, and bracelet.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["jewelry", "set", "necklace", "elegant"]
    },
    {
      name: "Belt",
      description: "High-quality leather belt with durable buckle and classic design.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["belt", "leather", "buckle", "classic"]
    },
    {
      name: "Scarf",
      description: "Soft and warm scarf perfect for cold weather and fashion statements.",
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["scarf", "warm", "fashion", "soft"]
    },
    {
      name: "Hat",
      description: "Stylish hat that complements any outfit while providing sun protection.",
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["hat", "style", "protection", "fashion"]
    }
  ];
  
  for (let i = 0; i < 60; i++) {
    const dataIndex = i % accessoriesData.length;
    const sellerIndex = i % sellers.length;
    const productData = accessoriesData[dataIndex];
    
    const modelNumber = Math.floor(Math.random() * 1000) + 1000;
    const basePrice = randomPrice(9.99, 199.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    accessoriesProducts.push({
      id: `accessories${i + 1}`,
      name: `${productData.name} ${modelNumber}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: productData.description,
      category: "accessories",
      image: productData.image,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: productData.tags,
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('accessories'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return accessoriesProducts;
};

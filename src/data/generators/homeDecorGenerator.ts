
import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

export const generateHomeDecorProducts = (): Product[] => {
  const homeDecorProducts: Product[] = [];
  
  const homeDecorData = [
    {
      name: "Modern Table Lamp",
      description: "Sleek and contemporary table lamp with adjustable brightness settings.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["lighting", "modern", "table", "adjustable"]
    },
    {
      name: "Decorative Throw Pillow",
      description: "Soft and stylish throw pillow to add comfort and color to your space.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["pillow", "comfort", "decorative", "soft"]
    },
    {
      name: "Wall Art Canvas",
      description: "Beautiful canvas wall art to enhance your room's aesthetic appeal.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["art", "canvas", "wall", "decorative"]
    },
    {
      name: "Ceramic Vase",
      description: "Elegant ceramic vase perfect for fresh flowers or as standalone decor.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["ceramic", "vase", "flowers", "elegant"]
    },
    {
      name: "Area Rug",
      description: "Soft and durable area rug to define your living space with style.",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["rug", "floor", "comfort", "style"]
    },
    {
      name: "Wall Mirror",
      description: "Stylish wall mirror to add light and depth to your room.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["mirror", "wall", "light", "decorative"]
    },
    {
      name: "Plant Pot",
      description: "Modern plant pot perfect for indoor plants and greenery.",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["plant", "pot", "indoor", "greenery"]
    },
    {
      name: "Candle Holder",
      description: "Beautiful candle holder to create ambient lighting in your home.",
      image: "https://images.unsplash.com/photo-1541113107947-3ddb4d2d8448?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["candle", "holder", "ambient", "lighting"]
    },
    {
      name: "Wall Clock",
      description: "Stylish wall clock that combines functionality with modern design.",
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["clock", "wall", "time", "modern"]
    },
    {
      name: "Picture Frame",
      description: "Elegant picture frame to display your favorite memories.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["frame", "picture", "memory", "display"]
    }
  ];
  
  for (let i = 0; i < 80; i++) {
    const dataIndex = i % homeDecorData.length;
    const sellerIndex = i % sellers.length;
    const productData = homeDecorData[dataIndex];
    
    const modelNumber = Math.floor(Math.random() * 1000) + 1000;
    const basePrice = randomPrice(15.99, 199.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    homeDecorProducts.push({
      id: `homedecor${i + 1}`,
      name: `${productData.name} ${modelNumber}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: productData.description,
      category: "home-decor",
      image: productData.image,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: productData.tags,
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('home-decor'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return homeDecorProducts;
};

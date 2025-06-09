
import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

// Generate clothing products
export const generateClothingProducts = (): Product[] => {
  const clothingProducts: Product[] = [];
  const clothingNames = [
    "Cotton T-Shirt", "Denim Jeans", "Hooded Sweatshirt", "Leather Jacket", "Summer Dress",
    "Casual Polo", "Athletic Shorts", "Knitted Sweater", "Slim Fit Shirt", "Yoga Pants",
    "Winter Coat", "Fashion Skirt", "Business Suit", "Graphic Tee", "Cargo Pants",
    "Silk Blouse", "Formal Dress", "Raincoat", "Swimsuit", "Running Shoes",
    "Wool Blazer", "Sleeveless Top", "Linen Pants", "Cashmere Scarf", "Denim Jacket",
    "Formal Shirt", "Lounge Pants", "Designer Vest", "Thermal Underwear", "Beach Cover-up"
  ];
  
  const clothingDescriptions = [
    "Premium cotton fabric for comfort and durability in any casual setting.",
    "Classic denim with perfect fit and subtle wash for versatile styling options.",
    "Cozy and warm with adjustable hood and kangaroo pocket for everyday wear.",
    "Genuine leather with detailed stitching and stylish cut for timeless appeal.",
    "Lightweight and flowy design perfect for warm weather and special occasions.",
    "Breathable fabric with classic collar and comfortable fit for casual elegance.",
    "Moisture-wicking material with flexible waistband for maximum performance.",
    "Soft, warm knit with contemporary design for seasonal style and comfort.",
    "Tailored fit with wrinkle-resistant fabric for a polished professional look.",
    "Stretchy, supportive fabric with high waistband for fitness and leisure.",
    "Insulated, weather-resistant outer shell with plush lining for extreme weather.",
    "Flattering silhouette with unique pattern for fashionable versatility.",
    "Precision tailoring with premium fabric for professional business attire.",
    "Soft cotton blend with artistic print for expressing personal style.",
    "Durable construction with multiple pockets for functionality and comfort.",
    "Lustrous, smooth fabric with elegant drape for sophisticated occasions.",
    "Structured design with premium fabric for special events and celebrations.",
    "Waterproof material with practical hood and pockets for wet weather protection.",
    "Quick-drying fabric with supportive design for water activities and sun exposure.",
    "Responsive cushioning with breathable upper for athletic performance.",
    "Premium wool blend with structured shoulders for sophisticated layering.",
    "Lightweight fabric with flattering cut for warm weather comfort.",
    "Breathable linen with relaxed fit for natural comfort in warm weather.",
    "Ultra-soft cashmere for luxurious warmth and elegant accessorizing.",
    "Versatile denim layer with vintage-inspired detailing for casual style.",
    "Crisp, wrinkle-resistant fabric with spread collar for business attire.",
    "Soft, stretchy material with relaxed fit for ultimate home comfort.",
    "Structured layering piece with contemporary styling for versatile outfits.",
    "Insulating fabric with moisture management for cold weather base layer.",
    "Light, airy fabric with stylish design for beach and pool occasions."
  ];
  
  const clothingTags = [
    ["cotton", "casual", "t-shirt", "basics"],
    ["denim", "pants", "casual", "everyday"],
    ["hoodie", "casual", "warm", "cotton"],
    ["leather", "jacket", "outerwear", "classic"],
    ["dress", "summer", "casual", "women"],
    ["polo", "collar", "casual", "men"],
    ["athletic", "shorts", "sport", "comfortable"],
    ["sweater", "knit", "warm", "winter"],
    ["shirt", "formal", "business", "slim fit"],
    ["yoga", "athletic", "stretch", "women"],
    ["coat", "winter", "warm", "outerwear"],
    ["skirt", "fashion", "women", "casual"],
    ["suit", "formal", "business", "professional"],
    ["t-shirt", "graphic", "casual", "printed"],
    ["pants", "cargo", "pockets", "casual"],
    ["blouse", "silk", "elegant", "women"],
    ["dress", "formal", "elegant", "event"],
    ["raincoat", "waterproof", "rain", "outerwear"],
    ["swimsuit", "beach", "summer", "water"],
    ["shoes", "running", "athletic", "sport"],
    ["blazer", "wool", "formal", "jacket"],
    ["top", "sleeveless", "summer", "casual"],
    ["pants", "linen", "breathable", "summer"],
    ["scarf", "cashmere", "winter", "accessory"],
    ["jacket", "denim", "casual", "versatile"],
    ["shirt", "formal", "business", "collar"],
    ["pants", "lounge", "comfortable", "relaxed"],
    ["vest", "layering", "fashion", "sleeveless"],
    ["underwear", "thermal", "warm", "base layer"],
    ["cover-up", "beach", "summer", "swimwear"]
  ];
  
  for (let i = 0; i < 150; i++) {
    const nameIndex = i % clothingNames.length;
    const descIndex = i % clothingDescriptions.length;
    const tagIndex = i % clothingTags.length;
    const sellerIndex = i % sellers.length;
    
    const style = String.fromCharCode(65 + (i % 26)) + "-" + (Math.floor(Math.random() * 900) + 100);
    const basePrice = randomPrice(19.99, 299.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    clothingProducts.push({
      id: `clothing${i + 1}`,
      name: `${clothingNames[nameIndex]} ${style}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: clothingDescriptions[descIndex],
      category: "clothing",
      image: `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: clothingTags[tagIndex],
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('clothing'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return clothingProducts;
};


import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

// Generate accessories products
export const generateAccessoriesProducts = (): Product[] => {
  const accessoriesProducts: Product[] = [];
  const accessoriesNames = [
    "Leather Wallet", "Fashion Sunglasses", "Wristwatch", "Silk Scarf", "Handbag",
    "Necklace", "Leather Belt", "Earrings", "Backpack", "Beanie Hat",
    "Bracelet", "Tie", "Ring", "Gloves", "Laptop Bag",
    "Anklet", "Baseball Cap", "Tote Bag", "Phone Case", "Keychain",
    "Hair Clip", "Cufflinks", "Travel Pillow", "Umbrella", "Passport Holder",
    "Socks", "Headband", "Coin Purse", "Luggage Tag", "Watch Band"
  ];
  
  const accessoriesDescriptions = [
    "Genuine leather with multiple card slots and secure bill compartment for everyday use.",
    "UV-protective lenses with stylish frames to protect eyes and complement outfits.",
    "Precision timekeeping with elegant design for both formal and casual occasions.",
    "Smooth silk fabric with vibrant print for elegant neck, hair, or bag accessorizing.",
    "Spacious interior with secure closure and stylish design for daily essentials.",
    "Delicate chain with custom pendant for elegant neckline enhancement.",
    "Quality leather with classic buckle to secure and style pants or jeans.",
    "Lightweight design with secure straps for comfortable all-day wear.",
    "Padded straps and multiple compartments for comfortable carrying of personal items.",
    "Soft, stretchy knit with folded brim for warmth and street style.",
    "Adjustable chain with decorative charms to accent the wrist.",
    "Premium fabric with subtle pattern for professional or formal attire.",
    "Polished band with decorative stone or design for finger adornment.",
    "Insulated material with touchscreen compatibility for warm hands during device use.",
    "Padded compartment with organizational pockets for secure computer transport.",
    "Delicate chain with tiny charms to accent the ankle.",
    "Adjustable strap with curved brim and embroidered design for casual style.",
    "Durable canvas with reinforced handles for shopping or daily carry.",
    "Impact-resistant material with precise cutouts for device protection and style.",
    "Sturdy ring with decorative charm or functional tool for key organization.",
    "Secure clasp with decorative design for stylish hair management.",
    "Polished metal with decorative face for formal shirt cuff closure.",
    "Memory foam construction with washable cover for comfortable travel rest.",
    "Automatic opening with windproof structure for reliable rain protection.",
    "RFID-blocking material with slots for documents and cards during travel.",
    "Comfortable blend with reinforced heel and toe for extended wear.",
    "Elastic fabric with stylish design for hair control during activities.",
    "Compact size with secure closure for organizing loose change.",
    "Durable material with clear window and sturdy strap for luggage identification.",
    "Quick-release pins with comfortable material to customize watch appearance."
  ];
  
  const accessoriesTags = [
    ["wallet", "leather", "men", "accessory"],
    ["sunglasses", "fashion", "UV protection", "eyewear"],
    ["watch", "timepiece", "wrist", "accessory"],
    ["scarf", "silk", "neck", "fashion"],
    ["handbag", "purse", "fashion", "women"],
    ["necklace", "jewelry", "fashion", "accessory"],
    ["belt", "leather", "waist", "accessory"],
    ["earrings", "jewelry", "fashion", "women"],
    ["backpack", "bag", "travel", "storage"],
    ["hat", "beanie", "winter", "headwear"],
    ["bracelet", "jewelry", "wrist", "fashion"],
    ["tie", "formal", "men", "neck"],
    ["ring", "jewelry", "finger", "fashion"],
    ["gloves", "winter", "hands", "warm"],
    ["bag", "laptop", "travel", "work"],
    ["anklet", "jewelry", "ankle", "fashion"],
    ["cap", "hat", "casual", "headwear"],
    ["bag", "tote", "shopping", "canvas"],
    ["case", "phone", "protection", "accessory"],
    ["keychain", "keys", "holder", "accessory"],
    ["clip", "hair", "accessory", "fashion"],
    ["cufflinks", "formal", "men", "shirt"],
    ["pillow", "travel", "neck", "comfort"],
    ["umbrella", "rain", "weather", "protection"],
    ["holder", "passport", "travel", "document"],
    ["socks", "feet", "cotton", "comfort"],
    ["headband", "hair", "sport", "fashion"],
    ["purse", "coin", "money", "small"],
    ["tag", "luggage", "travel", "identification"],
    ["band", "watch", "wrist", "replacement"]
  ];
  
  for (let i = 0; i < 150; i++) {
    const nameIndex = i % accessoriesNames.length;
    const descIndex = i % accessoriesDescriptions.length;
    const tagIndex = i % accessoriesTags.length;
    const sellerIndex = i % sellers.length;
    
    const material = ["Leather", "Metal", "Cotton", "Silk", "Nylon", "Canvas"][i % 6];
    const basePrice = randomPrice(9.99, 199.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    accessoriesProducts.push({
      id: `accessories${i + 1}`,
      name: `${material} ${accessoriesNames[nameIndex]}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: accessoriesDescriptions[descIndex],
      category: "accessories",
      image: `https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: accessoriesTags[tagIndex],
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('accessories'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return accessoriesProducts;
};

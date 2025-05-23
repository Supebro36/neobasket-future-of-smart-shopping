
import { Product } from "./types";

// Generate a set of sample products for the search function to work with
const generateSampleProducts = (): Product[] => {
  const categories = ["electronics", "clothing", "home-decor", "accessories"];
  const products: Product[] = [];
  
  // Create 50 sample products for each category
  for (let catIndex = 0; catIndex < categories.length; catIndex++) {
    const category = categories[catIndex];
    
    for (let i = 1; i <= 50; i++) {
      const id = `${category}${i}`;
      const name = `${getProductPrefix(category)} ${getProductName(category, i)}`;
      const price = getPriceForCategory(category);
      const discountPrice = Math.random() > 0.6 ? Math.floor(price * (0.7 + Math.random() * 0.2)) : undefined;
      const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
      
      const tags = getTagsForCategory(category);
      const description = getDescriptionForCategory(category);
      
      products.push({
        id,
        name,
        price,
        discountPrice,
        description,
        category,
        image: `https://picsum.photos/seed/${id}/400/400`,
        rating,
        reviews: Math.floor(Math.random() * 500),
        inStock: Math.random() > 0.15,
        tags,
        seller: {
          id: `seller${Math.floor(Math.random() * 10) + 1}`,
          name: `${getSellerName()} ${getSellerSuffix()}`,
          rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
          verified: Math.random() > 0.3
        }
      });
    }
  }
  
  return products;
};

// Helper functions to generate more varied product data
function getProductPrefix(category: string): string {
  const prefixes: Record<string, string[]> = {
    "electronics": ["Premium", "Smart", "Ultra", "Next-Gen", "Pro", "Elite", "Digital", "Wireless", "Advanced", "Modern"],
    "clothing": ["Casual", "Elegant", "Vintage", "Classic", "Designer", "Trendy", "Summer", "Winter", "Athletic", "Business"],
    "home-decor": ["Luxurious", "Minimalist", "Rustic", "Contemporary", "Bohemian", "Modern", "Elegant", "Handcrafted", "Vintage", "Artisan"],
    "accessories": ["Stylish", "Essential", "Designer", "Luxury", "Handcrafted", "Premium", "Signature", "Classic", "Fashionable", "Exclusive"]
  };
  
  return prefixes[category][Math.floor(Math.random() * prefixes[category].length)];
}

function getProductName(category: string, index: number): string {
  const names: Record<string, string[]> = {
    "electronics": ["Smartphone", "Laptop", "Tablet", "Smartwatch", "Headphones", "Bluetooth Speaker", "Camera", "Gaming Console", "Drone", "Fitness Tracker"],
    "clothing": ["T-Shirt", "Jeans", "Dress", "Jacket", "Sweater", "Hoodie", "Skirt", "Trousers", "Blouse", "Coat"],
    "home-decor": ["Table Lamp", "Wall Art", "Throw Pillow", "Vase", "Rug", "Mirror", "Curtains", "Clock", "Plant Pot", "Bookshelf"],
    "accessories": ["Wallet", "Handbag", "Watch", "Sunglasses", "Necklace", "Bracelet", "Earrings", "Scarf", "Hat", "Belt"]
  };
  
  const baseNameIndex = index % names[category].length;
  const modelNumber = Math.floor(Math.random() * 900) + 100;
  return `${names[category][baseNameIndex]} ${modelNumber}`;
}

function getPriceForCategory(category: string): number {
  const priceRanges: Record<string, [number, number]> = {
    "electronics": [99.99, 1299.99],
    "clothing": [19.99, 299.99],
    "home-decor": [24.99, 499.99],
    "accessories": [9.99, 249.99]
  };
  
  const [min, max] = priceRanges[category];
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getTagsForCategory(category: string): string[] {
  const allTags: Record<string, string[][]> = {
    "electronics": [
      ["tech", "gadget", "wireless", "smart", "digital"],
      ["portable", "innovative", "connected", "rechargeable", "bluetooth"],
      ["premium", "high-tech", "touchscreen", "4k", "HD"],
      ["wearable", "smart home", "entertainment", "productivity", "AI"]
    ],
    "clothing": [
      ["fashion", "casual", "trendy", "comfortable", "stylish"],
      ["seasonal", "cotton", "designer", "everyday", "breathable"],
      ["urban", "vintage", "sustainable", "handmade", "premium"],
      ["modern", "classic", "unisex", "lightweight", "durable"]
    ],
    "home-decor": [
      ["home", "decor", "interior", "decoration", "stylish"],
      ["modern", "rustic", "elegant", "handcrafted", "accent"],
      ["living room", "bedroom", "kitchen", "minimalist", "cozy"],
      ["decorative", "functional", "aesthetic", "artisan", "unique"]
    ],
    "accessories": [
      ["fashion", "style", "personal", "trendy", "everyday"],
      ["essential", "designer", "luxury", "gift", "practical"],
      ["elegant", "modern", "classic", "statement", "versatile"],
      ["handcrafted", "premium", "signature", "casual", "formal"]
    ]
  };
  
  const tagSet = allTags[category][Math.floor(Math.random() * allTags[category].length)];
  // Add the category itself as a tag
  tagSet.push(category);
  // Select a random subset of tags (3-5 tags)
  const numTags = Math.floor(Math.random() * 3) + 3;
  const shuffled = [...tagSet].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTags);
}

function getDescriptionForCategory(category: string): string {
  const descriptions: Record<string, string[]> = {
    "electronics": [
      "High-quality device featuring the latest technology for an enhanced user experience.",
      "Innovative design with cutting-edge features and exceptional performance.",
      "State-of-the-art technology providing seamless connectivity and functionality.",
      "Premium quality with advanced features designed for everyday convenience.",
      "Sleek and modern design combined with powerful performance and reliability."
    ],
    "clothing": [
      "Stylish and comfortable design perfect for everyday wear and special occasions.",
      "High-quality fabric ensuring durability and comfort throughout the day.",
      "Trendy design with attention to detail and a perfect fit for all body types.",
      "Premium quality materials combined with expert craftsmanship for long-lasting wear.",
      "Versatile piece that easily transitions from casual to formal settings."
    ],
    "home-decor": [
      "Beautiful piece that adds elegant style and character to any living space.",
      "Handcrafted with attention to detail, bringing warmth and personality to your home.",
      "Unique design that serves as a striking focal point in any room.",
      "Perfect blend of aesthetics and functionality to enhance your living environment.",
      "Carefully designed accent piece that complements various interior styles."
    ],
    "accessories": [
      "Elegant accessory that adds a perfect finishing touch to any outfit.",
      "Versatile piece designed for everyday use while maintaining a stylish appearance.",
      "Premium quality craftsmanship ensuring durability and long-lasting appeal.",
      "Meticulously crafted accessory that combines style with practical functionality.",
      "Timeless design that elevates your personal style with a sophisticated touch."
    ]
  };
  
  return descriptions[category][Math.floor(Math.random() * descriptions[category].length)];
}

function getSellerName(): string {
  const firstParts = ["Tech", "Style", "Home", "Fashion", "Modern", "Global", "Urban", "Elite", "Premier", "Smart", "Luxury"];
  const secondParts = ["Hub", "Store", "Market", "Emporium", "Boutique", "Shop", "Experts", "Gallery", "Collection", "Traders"];
  
  return `${firstParts[Math.floor(Math.random() * firstParts.length)]}${secondParts[Math.floor(Math.random() * secondParts.length)]}`;
}

function getSellerSuffix(): string {
  const suffixes = ["Co.", "Inc.", "Ltd.", "International", "Store", "Group", "Collective", "Partners", "Designs", ""];
  return suffixes[Math.floor(Math.random() * suffixes.length)];
}

// Generate the sample products
const products = generateSampleProducts();

export default products;

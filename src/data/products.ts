
import { Product, Seller, Category } from "../types";

// Generate more sellers to distribute products across
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
  },
  {
    id: "seller5",
    name: "StyleMasters",
    rating: 4.6,
    verified: true
  },
  {
    id: "seller6",
    name: "DecorInnovations",
    rating: 4.3,
    verified: true
  },
  {
    id: "seller7",
    name: "AccessoryWorld",
    rating: 4.4,
    verified: false
  },
  {
    id: "seller8",
    name: "GadgetGalaxy",
    rating: 4.7,
    verified: true
  },
  {
    id: "seller9",
    name: "LuxuryLiving",
    rating: 4.9,
    verified: true
  },
  {
    id: "seller10",
    name: "TrendSetters",
    rating: 4.2,
    verified: true
  }
];

// Function to generate a random price between min and max
const randomPrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Function to generate a random discount price (occasionally null to represent no discount)
const randomDiscountPrice = (price: number): number | undefined => {
  // 60% chance of having a discount
  if (Math.random() > 0.4) {
    // Discount between 5% and 30% off
    const discountPercent = Math.random() * 0.25 + 0.05;
    return parseFloat((price * (1 - discountPercent)).toFixed(2));
  }
  return undefined;
};

// Function to generate random reviews count
const randomReviews = (): number => {
  return Math.floor(Math.random() * 500) + 1;
};

// Function to generate random rating between 3.5 and 5.0
const randomRating = (): number => {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
};

// Generate electronics products
const generateElectronicsProducts = (): Product[] => {
  const electronicsProducts: Product[] = [];
  const electronicsNames = [
    "Wireless Headphones", "Bluetooth Speaker", "Smart Watch", "Laptop", "Tablet",
    "Smartphone", "Digital Camera", "Gaming Console", "Wireless Earbuds", "Smart TV",
    "Drone", "VR Headset", "Fitness Tracker", "External Hard Drive", "Wireless Mouse",
    "Mechanical Keyboard", "Portable Charger", "Wi-Fi Router", "Projector", "Graphic Card",
    "Curved Monitor", "Smart Home Hub", "Voice Assistant", "Noise-Cancelling Headphones", "Portable SSD",
    "Wireless Printer", "Smart Thermostat", "USB-C Hub", "E-Reader", "Action Camera",
  ];
  
  const electronicsDescriptions = [
    "High-quality audio with noise cancellation technology for immersive listening experience.",
    "Powerful sound with deep bass and long-lasting battery life for portable entertainment.",
    "Track fitness, manage notifications, and stay connected with this versatile wearable.",
    "Powerful performance for work, gaming, and entertainment with stunning display.",
    "Lightweight and portable device perfect for browsing, reading, and media consumption.",
    "Latest technology with high-resolution camera and all-day battery life.",
    "Capture stunning photos and videos with professional quality results.",
    "Immersive gaming experience with high-definition graphics and exclusive titles.",
    "True wireless design with premium sound quality and convenient charging case.",
    "Crystal clear 4K resolution with smart features and streaming capabilities.",
    "Aerial photography and videography with stable flight and high-resolution camera.",
    "Immersive virtual reality experience with comfortable fit and interactive controllers.",
    "Monitor health metrics and activity with this sleek and waterproof device.",
    "Reliable storage solution for backing up important files and data.",
    "Ergonomic design with precise tracking and customizable buttons.",
    "Tactile typing experience with programmable RGB lighting effects.",
    "Keep your devices charged on the go with fast charging technology.",
    "High-speed internet connectivity throughout your home with advanced security features.",
    "Theater-quality entertainment at home with adjustable screen size.",
    "Enhance your gaming or graphic design with powerful rendering capabilities.",
    "Immersive viewing experience with ultra-wide curved display.",
    "Control all your smart home devices from one central interface.",
    "Hands-free assistance for music, information, and smart home control.",
    "Block out distractions with premium noise-cancelling technology.",
    "Fast data transfer and storage in a compact, durable design.",
    "Print remotely from any device with high-quality color reproduction.",
    "Energy-efficient temperature control with smart scheduling and remote access.",
    "Expand your connectivity options with multiple ports in one compact device.",
    "Paper-like reading experience with adjustable lighting and weeks of battery life.",
    "Capture adventure footage with stabilization and waterproof design."
  ];
  
  const electronicsTags = [
    ["audio", "wireless", "headphones", "bluetooth"],
    ["speaker", "audio", "bluetooth", "portable"],
    ["wearable", "fitness", "smart", "watch"],
    ["computer", "portable", "work", "gaming"],
    ["portable", "touch screen", "entertainment", "browsing"],
    ["mobile", "phone", "camera", "apps"],
    ["photography", "video", "digital", "memory"],
    ["gaming", "entertainment", "video games", "multiplayer"],
    ["audio", "wireless", "bluetooth", "portable"],
    ["entertainment", "streaming", "4K", "smart"],
    ["photography", "aerial", "flying", "camera"],
    ["gaming", "virtual reality", "immersive", "entertainment"],
    ["fitness", "health", "wearable", "waterproof"],
    ["storage", "backup", "data", "portable"],
    ["computer", "wireless", "ergonomic", "peripheral"],
    ["typing", "gaming", "RGB", "mechanical"],
    ["battery", "charging", "portable", "power"],
    ["networking", "internet", "wifi", "connectivity"],
    ["entertainment", "video", "portable", "presentation"],
    ["gaming", "computer", "graphics", "rendering"],
    ["display", "ultrawide", "computer", "screen"],
    ["smart home", "automation", "control", "IoT"],
    ["smart", "voice", "assistant", "automation"],
    ["audio", "noise cancellation", "travel", "premium"],
    ["storage", "fast", "portable", "data"],
    ["printing", "wireless", "office", "document"],
    ["smart home", "energy", "temperature", "automation"],
    ["connectivity", "adapter", "ports", "expansion"],
    ["reading", "books", "digital", "e-ink"],
    ["camera", "adventure", "waterproof", "video"]
  ];
  
  for (let i = 0; i < 150; i++) {
    const nameIndex = i % electronicsNames.length;
    const descIndex = i % electronicsDescriptions.length;
    const tagIndex = i % electronicsTags.length;
    const sellerIndex = i % sellers.length;
    
    const modelNumber = Math.floor(Math.random() * 1000) + 1000;
    const basePrice = randomPrice(49.99, 999.99);
    const discountPrice = randomDiscountPrice(basePrice);
    
    electronicsProducts.push({
      id: `electronics${i + 1}`,
      name: `${electronicsNames[nameIndex]} ${modelNumber}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: electronicsDescriptions[descIndex],
      category: "electronics",
      image: `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: Math.random() > 0.1, // 90% chance to be in stock
      tags: electronicsTags[tagIndex],
      seller: sellers[sellerIndex]
    });
  }
  
  return electronicsProducts;
};

// Generate clothing products
const generateClothingProducts = (): Product[] => {
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
      inStock: Math.random() > 0.1, // 90% chance to be in stock
      tags: clothingTags[tagIndex],
      seller: sellers[sellerIndex]
    });
  }
  
  return clothingProducts;
};

// Generate home decor products
const generateHomeDecorProducts = (): Product[] => {
  const homeDecorProducts: Product[] = [];
  const homeDecorNames = [
    "Table Lamp", "Decorative Pillow", "Wall Art", "Throw Blanket", "Vase",
    "Photo Frame", "Area Rug", "Candle Set", "Wall Clock", "Bookends",
    "Curtains", "Planter", "Wall Mirror", "Shelf Unit", "Decorative Bowl",
    "Throw Pillow Cover", "Table Runner", "Wind Chime", "Door Mat", "Wall Hanging",
    "Bed Set", "Floor Lamp", "Sculpture", "Accent Table", "Tapestry",
    "Scented Diffuser", "Jewelry Box", "Decorative Tray", "Drawer Knobs", "Coasters"
  ];
  
  const homeDecorDescriptions = [
    "Modern design with adjustable brightness perfect for bedside or desk illumination.",
    "Soft, plush fabric with vibrant pattern to accent any sofa or bed.",
    "Contemporary artwork on canvas to create a focal point in any room.",
    "Ultra-soft material with elegant design for warmth and decorative appeal.",
    "Hand-crafted ceramic with unique glaze ideal for fresh or dried arrangements.",
    "Elegant frame to showcase cherished memories with protective glass cover.",
    "Plush pile with intricate pattern to define spaces and add warmth to floors.",
    "Aromatic wax blends in decorative holders for ambiance and fragrance.",
    "Precision timekeeping with artistic face design to complement any wall.",
    "Heavy-duty design with artistic flair to organize and display books stylishly.",
    "Light-filtering fabric with elegant drape to frame windows and provide privacy.",
    "Ceramic pot with drainage and saucer for healthy indoor plants and decor.",
    "Beveled glass with decorative frame to reflect light and create visual space.",
    "Sturdy construction with modern design for storage and display of items.",
    "Handcrafted design with glazed finish for centerpiece or decorative use.",
    "Zippered covers with vibrant patterns to refresh pillows seasonally.",
    "Intricate embroidery on premium fabric to elegantly style dining tables.",
    "Melodic tubes with precise tuning for soothing outdoor ambiance.",
    "Durable, absorbent material with welcoming design for entryway protection.",
    "Textured fabric art with unique design for vertical wall interest.",
    "Premium cotton sheets, pillowcases, and duvet cover in coordinated design.",
    "Architectural design with adjustable height and direction for ambient lighting.",
    "Hand-detailed figurine with artistic expression for shelf or table display.",
    "Compact surface with distinctive base for placement of decorative items.",
    "Woven textile artwork with rich colors for wall covering or throw.",
    "Long-lasting fragrance oils with decorative vessel for subtle room scenting.",
    "Lined compartments with secure closure for organizing precious items.",
    "Multi-purpose surface with decorative edges for organizing or serving.",
    "Unique hardware with artistic details to update cabinets and drawers.",
    "Protective surfaces with decorative designs to prevent furniture marks."
  ];
  
  const homeDecorTags = [
    ["lamp", "lighting", "table", "modern"],
    ["pillow", "soft", "decor", "accent"],
    ["art", "wall", "hanging", "decor"],
    ["blanket", "throw", "soft", "cozy"],
    ["vase", "ceramic", "flower", "decor"],
    ["frame", "photo", "display", "memory"],
    ["rug", "floor", "textile", "pattern"],
    ["candle", "scented", "ambiance", "decor"],
    ["clock", "wall", "time", "decoration"],
    ["bookends", "organize", "display", "decor"],
    ["curtains", "window", "fabric", "privacy"],
    ["planter", "plant", "garden", "indoor"],
    ["mirror", "wall", "reflection", "decor"],
    ["shelf", "storage", "display", "organize"],
    ["bowl", "decorative", "centerpiece", "accent"],
    ["pillow cover", "textile", "pattern", "decor"],
    ["runner", "table", "fabric", "dining"],
    ["chime", "outdoor", "sound", "hanging"],
    ["mat", "door", "entrance", "welcome"],
    ["wall hanging", "textile", "art", "decor"],
    ["bed set", "bedding", "sheets", "bedroom"],
    ["lamp", "floor", "lighting", "standing"],
    ["sculpture", "art", "figure", "decor"],
    ["table", "accent", "furniture", "side"],
    ["tapestry", "wall", "textile", "art"],
    ["diffuser", "scent", "aroma", "fragrance"],
    ["box", "jewelry", "storage", "decor"],
    ["tray", "serving", "decorative", "organize"],
    ["knobs", "drawer", "hardware", "accent"],
    ["coasters", "drink", "protect", "table"]
  ];
  
  for (let i = 0; i < 150; i++) {
    const nameIndex = i % homeDecorNames.length;
    const descIndex = i % homeDecorDescriptions.length;
    const tagIndex = i % homeDecorTags.length;
    const sellerIndex = i % sellers.length;
    
    const collection = ["Elegance", "Modern", "Rustic", "Minimalist", "Bohemian", "Classic"][i % 6];
    const basePrice = randomPrice(19.99, 399.99);
    const discountPrice = randomDiscountPrice(basePrice);
    
    homeDecorProducts.push({
      id: `homedecor${i + 1}`,
      name: `${collection} ${homeDecorNames[nameIndex]}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: homeDecorDescriptions[descIndex],
      category: "home-decor",
      image: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: Math.random() > 0.1, // 90% chance to be in stock
      tags: homeDecorTags[tagIndex],
      seller: sellers[sellerIndex]
    });
  }
  
  return homeDecorProducts;
};

// Generate accessories products
const generateAccessoriesProducts = (): Product[] => {
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
    "Lightweight design with secure backs for comfortable all-day wear.",
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
      inStock: Math.random() > 0.1, // 90% chance to be in stock
      tags: accessoriesTags[tagIndex],
      seller: sellers[sellerIndex]
    });
  }
  
  return accessoriesProducts;
};

// Combine all products
const electronicsProducts = generateElectronicsProducts();
const clothingProducts = generateClothingProducts();
const homeDecorProducts = generateHomeDecorProducts();
const accessoriesProducts = generateAccessoriesProducts();

const products: Product[] = [
  ...electronicsProducts,
  ...clothingProducts,
  ...homeDecorProducts,
  ...accessoriesProducts
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

// Additional utility functions for filtering and searching products

export const getDiscountedProducts = (limit = 8): Product[] => {
  return products
    .filter(p => p.discountPrice !== undefined)
    .sort(() => Math.random() - 0.5) // Shuffle for variety
    .slice(0, limit);
};

export const getNewArrivals = (limit = 8): Product[] => {
  // In a real app, this would be based on creation date
  // Here we'll just return random products to simulate new arrivals
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterProducts = (
  category?: Category,
  minPrice?: number,
  maxPrice?: number,
  minRating?: number,
  tags?: string[]
): Product[] => {
  return products.filter(product => {
    // Filter by category
    if (category && product.category !== category) return false;
    
    // Filter by price range
    const price = product.discountPrice || product.price;
    if (minPrice !== undefined && price < minPrice) return false;
    if (maxPrice !== undefined && price > maxPrice) return false;
    
    // Filter by rating
    if (minRating !== undefined && product.rating < minRating) return false;
    
    // Filter by tags
    if (tags && tags.length > 0) {
      if (!tags.some(tag => product.tags.includes(tag))) return false;
    }
    
    return true;
  });
};

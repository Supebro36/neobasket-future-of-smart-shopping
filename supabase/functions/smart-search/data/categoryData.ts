
import { Category } from "../types";

// Define category-specific data
export const priceRanges: Record<Category, [number, number]> = {
  "electronics": [99.99, 1299.99],
  "clothing": [19.99, 299.99],
  "home-decor": [24.99, 499.99],
  "accessories": [9.99, 249.99]
};

export const productPrefixes: Record<Category, string[]> = {
  "electronics": ["Premium", "Smart", "Ultra", "Next-Gen", "Pro", "Elite", "Digital", "Wireless", "Advanced", "Modern"],
  "clothing": ["Casual", "Elegant", "Vintage", "Classic", "Designer", "Trendy", "Summer", "Winter", "Athletic", "Business"],
  "home-decor": ["Luxurious", "Minimalist", "Rustic", "Contemporary", "Bohemian", "Modern", "Elegant", "Handcrafted", "Vintage", "Artisan"],
  "accessories": ["Stylish", "Essential", "Designer", "Luxury", "Handcrafted", "Premium", "Signature", "Classic", "Fashionable", "Exclusive"]
};

export const productNames: Record<Category, string[]> = {
  "electronics": ["Smartphone", "Laptop", "Tablet", "Smartwatch", "Headphones", "Bluetooth Speaker", "Camera", "Gaming Console", "Drone", "Fitness Tracker"],
  "clothing": ["T-Shirt", "Jeans", "Dress", "Jacket", "Sweater", "Hoodie", "Skirt", "Trousers", "Blouse", "Coat"],
  "home-decor": ["Table Lamp", "Wall Art", "Throw Pillow", "Vase", "Rug", "Mirror", "Curtains", "Clock", "Plant Pot", "Bookshelf"],
  "accessories": ["Wallet", "Handbag", "Watch", "Sunglasses", "Necklace", "Bracelet", "Earrings", "Scarf", "Hat", "Belt"]
};

export const tagsMap: Record<Category, string[][]> = {
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

export const descriptions: Record<Category, string[]> = {
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

export const categoryImages: Record<Category, string[]> = {
  "electronics": [
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // headphones
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // laptop
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // smartwatch
    "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // phone
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // tablet
  ],
  "clothing": [
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // shirt
    "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // jeans
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // jacket
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // dress
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // sweater
  ],
  "home-decor": [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // lamp
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // vase
    "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // rug
    "https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // pillow
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // wall art
  ],
  "accessories": [
    "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // watch
    "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // wallet
    "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // sunglasses
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // necklace
    "https://images.unsplash.com/photo-1611085583191-a3b181a88552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // bag
  ]
};

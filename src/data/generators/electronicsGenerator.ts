
import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

// Generate electronics products
export const generateElectronicsProducts = (): Product[] => {
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
    const stockQty = randomStockQuantity();
    
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
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: electronicsTags[tagIndex],
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('electronics'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return electronicsProducts;
};


import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

// Generate car and bike accessories products
export const generateCarBikeAccessoriesProducts = (): Product[] => {
  const carBikeProducts: Product[] = [];
  const carBikeNames = [
    "Car Rain Cover", "Bike Rain Cover", "LED Headlight", "Fog Light", "Tail Light",
    "Air Pressure Pump", "Digital Tire Inflator", "Car Wash Kit", "Bike Wash Spray", "Microfiber Cloth Set",
    "Tire Shine Spray", "Dashboard Cleaner", "Leather Seat Cover", "Bike Chain Lubricant", "Engine Oil",
    "Brake Fluid", "Coolant", "Car Phone Holder", "Bike Phone Mount", "GPS Navigator",
    "Car Charger", "Bike USB Charger", "Car Floor Mats", "Bike Mudguard", "Side Mirror",
    "Helmet", "Riding Gloves", "Knee Guards", "Back Rest Cushion", "Car Pillow",
    "Sunshade", "Window Tint Film", "Parking Sensor", "Reverse Camera", "Dash Cam",
    "Car Vacuum Cleaner", "Bike Tool Kit", "Puncture Repair Kit", "Jump Starter", "Battery Charger",
    "Car Perfume", "Air Freshener", "Steering Wheel Cover", "Gear Knob", "Pedal Cover",
    "Car Speaker", "Bike Horn", "Turn Signal Light", "Hazard Light", "Number Plate"
  ];
  
  const carBikeDescriptions = [
    "High-quality waterproof cover providing complete protection from rain and weather elements.",
    "Durable rain protection with UV resistance and secure fitting for long-lasting use.",
    "Bright LED headlight with energy-efficient design and superior illumination for safety.",
    "Powerful fog light cutting through mist and low visibility conditions effectively.",
    "High-visibility tail light with bright LED technology for enhanced road safety.",
    "Reliable air pressure pump with accurate gauge for optimal tire maintenance.",
    "Digital tire inflator with preset pressure settings and automatic shut-off feature.",
    "Complete car wash kit with professional-grade cleaning products and tools.",
    "Specialized bike wash spray formula for effective cleaning without damage.",
    "Premium microfiber cloth set for streak-free cleaning and scratch prevention.",
    "Professional tire shine spray for long-lasting gloss and protection.",
    "Advanced dashboard cleaner removing dust and providing UV protection.",
    "Comfortable leather seat cover with premium stitching and perfect fit.",
    "High-performance bike chain lubricant for smooth operation and longevity.",
    "Premium engine oil providing optimal lubrication and engine protection.",
    "High-quality brake fluid ensuring reliable braking performance and safety.",
    "Effective coolant preventing overheating and maintaining optimal engine temperature.",
    "Secure car phone holder with adjustable mounting and easy access.",
    "Sturdy bike phone mount with shock absorption and weather protection.",
    "Advanced GPS navigator with real-time traffic updates and voice guidance.",
    "Fast car charger with multiple ports and intelligent charging technology.",
    "Weatherproof bike USB charger with reliable power delivery system.",
    "Custom-fit car floor mats with non-slip backing and easy cleaning.",
    "Effective bike mudguard protecting from dirt and water splash.",
    "High-quality side mirror with clear reflection and adjustable positioning.",
    "Safety helmet with impact resistance and comfortable ventilation system.",
    "Protective riding gloves with enhanced grip and knuckle protection.",
    "Durable knee guards providing impact protection during rides.",
    "Ergonomic back rest cushion for comfortable long-distance driving.",
    "Supportive car pillow with memory foam for neck and head comfort.",
    "UV-blocking sunshade reducing interior heat and protecting upholstery.",
    "Professional window tint film providing privacy and heat reduction.",
    "Ultrasonic parking sensor with audio alerts and distance display.",
    "High-definition reverse camera with night vision and wide-angle view.",
    "Advanced dash cam recording in HD with loop recording feature.",
    "Portable car vacuum cleaner with powerful suction and attachments.",
    "Comprehensive bike tool kit with essential tools for maintenance.",
    "Emergency puncture repair kit with patches and tire levers.",
    "Portable jump starter with built-in safety features and LED light.",
    "Smart battery charger with automatic charging and maintenance mode.",
    "Long-lasting car perfume with pleasant fragrance and elegant design.",
    "Natural air freshener eliminating odors and providing fresh scent.",
    "Comfortable steering wheel cover with enhanced grip and style.",
    "Ergonomic gear knob with smooth operation and premium feel.",
    "Anti-slip pedal cover improving grip and driving safety.",
    "High-quality car speaker delivering clear sound and deep bass.",
    "Loud bike horn with distinctive sound for effective communication.",
    "Bright turn signal light with clear indication and durability.",
    "Emergency hazard light with high visibility and reliable operation.",
    "Legal number plate with proper dimensions and reflective properties."
  ];
  
  const carBikeTags = [
    ["car", "rain cover", "waterproof", "protection"],
    ["bike", "rain cover", "waterproof", "weather"],
    ["LED", "headlight", "lighting", "safety"],
    ["fog light", "visibility", "driving", "safety"],
    ["tail light", "LED", "safety", "visibility"],
    ["pump", "tire", "pressure", "maintenance"],
    ["inflator", "digital", "tire", "automotive"],
    ["wash", "car", "cleaning", "detailing"],
    ["bike", "wash", "spray", "cleaning"],
    ["microfiber", "cloth", "cleaning", "car care"],
    ["tire", "shine", "spray", "detailing"],
    ["dashboard", "cleaner", "interior", "car care"],
    ["seat cover", "leather", "comfort", "interior"],
    ["chain", "lubricant", "bike", "maintenance"],
    ["engine oil", "lubrication", "automotive", "maintenance"],
    ["brake fluid", "safety", "braking", "automotive"],
    ["coolant", "engine", "temperature", "automotive"],
    ["phone holder", "car", "mount", "accessories"],
    ["bike", "phone mount", "navigation", "accessories"],
    ["GPS", "navigation", "driving", "technology"],
    ["charger", "car", "USB", "power"],
    ["bike", "USB", "charger", "power"],
    ["floor mats", "car", "protection", "interior"],
    ["mudguard", "bike", "protection", "accessories"],
    ["mirror", "side", "visibility", "safety"],
    ["helmet", "safety", "protection", "riding"],
    ["gloves", "riding", "protection", "safety"],
    ["knee guards", "protection", "safety", "riding"],
    ["cushion", "back rest", "comfort", "driving"],
    ["pillow", "car", "comfort", "support"],
    ["sunshade", "UV protection", "car", "interior"],
    ["tint", "window", "privacy", "protection"],
    ["sensor", "parking", "safety", "technology"],
    ["camera", "reverse", "safety", "technology"],
    ["dash cam", "recording", "safety", "technology"],
    ["vacuum", "car", "cleaning", "portable"],
    ["tool kit", "bike", "maintenance", "repair"],
    ["puncture", "repair", "emergency", "bike"],
    ["jump starter", "battery", "emergency", "automotive"],
    ["charger", "battery", "maintenance", "automotive"],
    ["perfume", "car", "fragrance", "interior"],
    ["air freshener", "odor", "fragrance", "car"],
    ["steering", "wheel cover", "comfort", "grip"],
    ["gear knob", "shift", "interior", "accessories"],
    ["pedal", "cover", "grip", "safety"],
    ["speaker", "car", "audio", "sound"],
    ["horn", "bike", "safety", "communication"],
    ["signal", "turn", "safety", "lighting"],
    ["hazard", "emergency", "safety", "lighting"],
    ["number plate", "legal", "identification", "automotive"]
  ];
  
  for (let i = 0; i < 150; i++) {
    const nameIndex = i % carBikeNames.length;
    const descIndex = i % carBikeDescriptions.length;
    const tagIndex = i % carBikeTags.length;
    const sellerIndex = i % sellers.length;
    
    const brand = ["AutoMax", "BikeGuard", "RoadMaster", "SpeedPro", "CarCare", "RideWell"][i % 6];
    const model = `${String.fromCharCode(65 + (i % 26))}${Math.floor(Math.random() * 900) + 100}`;
    const basePrice = randomPrice(15.99, 299.99);
    const discountPrice = randomDiscountPrice(basePrice);
    const stockQty = randomStockQuantity();
    
    carBikeProducts.push({
      id: `carbike${i + 1}`,
      name: `${brand} ${carBikeNames[nameIndex]} ${model}`,
      price: basePrice,
      discountPrice: discountPrice,
      description: carBikeDescriptions[descIndex],
      category: "accessories",
      image: `https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
      rating: randomRating(),
      reviews: randomReviews(),
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: carBikeTags[tagIndex],
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('accessories'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return carBikeProducts;
};


import { Product } from "../../types";
import { sellers } from "../sellers";
import { randomPrice, randomDiscountPrice, randomReviews, randomRating, randomStockQuantity, generateSpecifications } from "../utils/productUtils";

// Generate home decor products
export const generateHomeDecorProducts = (): Product[] => {
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
    const stockQty = randomStockQuantity();
    
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
      inStock: stockQty > 0,
      stockQuantity: stockQty,
      tags: homeDecorTags[tagIndex],
      seller: sellers[sellerIndex],
      specifications: generateSpecifications('home-decor'),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return homeDecorProducts;
};

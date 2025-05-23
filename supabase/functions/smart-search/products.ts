
import { Product } from "./types";

// Generate a smaller subset of products for the search function to work with
// This avoids the edge function being too large
const generateSampleProducts = (): Product[] => {
  const categories = ["electronics", "clothing", "home-decor", "accessories"];
  const products: Product[] = [];
  
  // Create 20 sample products for each category
  for (let catIndex = 0; catIndex < categories.length; catIndex++) {
    const category = categories[catIndex];
    
    for (let i = 1; i <= 20; i++) {
      const id = `${category}${i}`;
      const name = `Sample ${category.charAt(0).toUpperCase() + category.slice(1)} ${i}`;
      const price = Math.floor(Math.random() * 500) + 10;
      const discountPrice = Math.random() > 0.6 ? Math.floor(price * 0.8) : undefined;
      const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
      
      let tags: string[];
      let description: string;
      
      switch (category) {
        case "electronics":
          description = "High-quality electronic device with modern features for everyday use.";
          tags = ["tech", "gadget", "wireless", category];
          break;
        case "clothing":
          description = "Comfortable and stylish clothing item perfect for any occasion.";
          tags = ["fashion", "casual", "trendy", category];
          break;
        case "home-decor":
          description = "Beautiful decorative item to enhance the look of your living space.";
          tags = ["home", "decor", "interior", category];
          break;
        case "accessories":
          description = "Elegant accessory to complement your personal style.";
          tags = ["fashion", "style", "personal", category];
          break;
        default:
          description = "High-quality product with great features.";
          tags = ["quality", "popular", category];
      }
      
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
        inStock: Math.random() > 0.1,
        tags,
        seller: {
          id: `seller${Math.floor(Math.random() * 10) + 1}`,
          name: `Sample Seller ${Math.floor(Math.random() * 10) + 1}`,
          rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
          verified: Math.random() > 0.3
        }
      });
    }
  }
  
  return products;
};

// Generate the sample products
const products = generateSampleProducts();

export default products;


import { Product, Seller, Category } from "../types";
import {
  getProductPrefix,
  getProductName,
  getPriceForCategory,
  getTagsForCategory,
  getDescriptionForCategory,
  getSellerName,
  getSellerSuffix,
  getCategoryImage
} from "./productHelpers";

// Generate a single product
function generateProduct(category: string, index: number): Product {
  const id = `${category}${index}`;
  const name = `${getProductPrefix(category)} ${getProductName(category, index)}`;
  const price = getPriceForCategory(category);
  const discountPrice = Math.random() > 0.6 ? Math.floor(price * (0.7 + Math.random() * 0.2)) : undefined;
  const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
  
  const tags = getTagsForCategory(category);
  const description = getDescriptionForCategory(category);
  
  const seller: Seller = {
    id: `seller${Math.floor(Math.random() * 10) + 1}`,
    name: `${getSellerName()} ${getSellerSuffix()}`,
    rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
    verified: Math.random() > 0.3
  };
  
  return {
    id,
    name,
    price,
    discountPrice,
    description,
    category: category as Category,
    image: getCategoryImage(category, index),
    rating,
    reviews: Math.floor(Math.random() * 500),
    inStock: Math.random() > 0.15,
    tags,
    seller
  };
}

// Generate multiple products for a specific category
function generateCategoryProducts(category: string, count: number): Product[] {
  const products: Product[] = [];
  
  for (let i = 1; i <= count; i++) {
    products.push(generateProduct(category, i));
  }
  
  return products;
}

// Generate the entire product catalog
export function generateSampleProducts(): Product[] {
  const categories = ["electronics", "clothing", "home-decor", "accessories"];
  const products: Product[] = [];
  
  // Create sample products for each category
  for (const category of categories) {
    const categoryProducts = generateCategoryProducts(category, 50);
    products.push(...categoryProducts);
  }
  
  return products;
}

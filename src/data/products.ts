
import { Product, Category } from "../types";
import { generateElectronicsProducts } from "./generators/electronicsGenerator";
import { generateClothingProducts } from "./generators/clothingGenerator";
import { generateHomeDecorProducts } from "./generators/homeDecorGenerator";
import { generateAccessoriesProducts } from "./generators/accessoriesGenerator";
import { generateCarBikeAccessoriesProducts } from "./generators/carBikeGenerator";

// Combine all products including the new car/bike accessories
const electronicsProducts = generateElectronicsProducts();
const clothingProducts = generateClothingProducts();
const homeDecorProducts = generateHomeDecorProducts();
const accessoriesProducts = generateAccessoriesProducts();
const carBikeAccessoriesProducts = generateCarBikeAccessoriesProducts();

const products: Product[] = [
  ...electronicsProducts,
  ...clothingProducts,
  ...homeDecorProducts,
  ...accessoriesProducts,
  ...carBikeAccessoriesProducts
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

export const getDiscountedProducts = (limit = 8): Product[] => {
  return products
    .filter(p => p.discountPrice !== undefined)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

export const getNewArrivals = (limit = 8): Product[] => {
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
    const price = product.discountPrice || product.price;
    if (category && product.category !== category) return false;
    if (minPrice !== undefined && price < minPrice) return false;
    if (maxPrice !== undefined && price > maxPrice) return false;
    if (minRating !== undefined && product.rating < minRating) return false;
    if (tags && tags.length > 0) {
      if (!tags.some(tag => product.tags.includes(tag))) return false;
    }
    return true;
  });
};

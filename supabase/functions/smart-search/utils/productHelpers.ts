
import { Category } from "../types";
import { 
  productPrefixes, 
  productNames, 
  priceRanges, 
  tagsMap, 
  descriptions,
  categoryImages
} from "../data/categoryData";
import { sellerFirstParts, sellerSecondParts, sellerSuffixes } from "../data/sellerData";

// Helper function to get product prefix based on category
export function getProductPrefix(category: string): string {
  const prefixes = productPrefixes[category as Category];
  return prefixes[Math.floor(Math.random() * prefixes.length)];
}

// Helper function to get product name based on category and index
export function getProductName(category: string, index: number): string {
  const names = productNames[category as Category];
  const baseNameIndex = index % names.length;
  const modelNumber = Math.floor(Math.random() * 900) + 100;
  return `${names[baseNameIndex]} ${modelNumber}`;
}

// Helper function to get price based on category
export function getPriceForCategory(category: string): number {
  const [min, max] = priceRanges[category as Category];
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Helper function to get tags based on category
export function getTagsForCategory(category: string): string[] {
  const allTags = tagsMap[category as Category];
  const tagSet = allTags[Math.floor(Math.random() * allTags.length)];
  
  // Add the category itself as a tag
  const combinedTags = [...tagSet, category];
  
  // Select a random subset of tags (3-5 tags)
  const numTags = Math.floor(Math.random() * 3) + 3;
  const shuffled = [...combinedTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTags);
}

// Helper function to get description based on category
export function getDescriptionForCategory(category: string): string {
  const categoryDescriptions = descriptions[category as Category];
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
}

// Helper function to get seller name
export function getSellerName(): string {
  const firstPart = sellerFirstParts[Math.floor(Math.random() * sellerFirstParts.length)];
  const secondPart = sellerSecondParts[Math.floor(Math.random() * sellerSecondParts.length)];
  
  return `${firstPart}${secondPart}`;
}

// Helper function to get seller suffix
export function getSellerSuffix(): string {
  return sellerSuffixes[Math.floor(Math.random() * sellerSuffixes.length)];
}

// Function to get image for a category and index
export function getCategoryImage(category: string, index: number): string {
  // Use modulo to cycle through the available images
  const images = categoryImages[category as Category];
  const imageIndex = (index - 1) % images.length;
  return images[imageIndex];
}

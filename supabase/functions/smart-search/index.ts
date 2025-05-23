
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import products from "./products.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the search query from the request
    const { query } = await req.json();
    console.log(`Processing search query: "${query}"\n`);

    if (!query || query.length < 2) {
      return new Response(
        JSON.stringify({ results: [] }),
        { 
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          } 
        }
      );
    }

    // Perform enhanced smart search on the products array
    const searchResults = enhancedSmartSearch(query);

    return new Response(
      JSON.stringify({ results: searchResults }),
      { 
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error(`Error in smart-search function: ${error}`);
    return new Response(
      JSON.stringify({ error: "Failed to process search query" }),
      { 
        status: 400, 
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        } 
      }
    );
  }
});

function enhancedSmartSearch(query: string) {
  if (!products || products.length === 0) {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase();
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 1);
  
  // Score products based on relevance to query
  const scoredProducts = products.map(product => {
    let score = 0;
    const productName = product.name.toLowerCase();
    const productDesc = product.description.toLowerCase();
    const productTags = product.tags.map(tag => tag.toLowerCase());
    const productCategory = product.category.toLowerCase();
    
    // Exact match on full query
    if (productName === normalizedQuery) {
      score += 50;
    }
    
    // Check if full query appears in name (highest priority)
    if (productName.includes(normalizedQuery)) {
      score += 30;
    }
    
    // Extra points for exact match at beginning of name
    if (productName.startsWith(normalizedQuery)) {
      score += 15;
    }
    
    // Check individual terms in name
    for (const term of queryTerms) {
      if (productName.includes(term)) {
        score += 5;
      }
      
      // Extra points if term is at start of product name
      if (productName.startsWith(term)) {
        score += 3;
      }
    }
    
    // Check if query appears in tags
    if (productTags.some(tag => tag.includes(normalizedQuery))) {
      score += 10;
    }
    
    // Check individual terms in tags
    for (const term of queryTerms) {
      if (productTags.some(tag => tag.includes(term))) {
        score += 3;
      }
    }
    
    // Check if query appears in description
    if (productDesc.includes(normalizedQuery)) {
      score += 7;
    }
    
    // Check individual terms in description
    for (const term of queryTerms) {
      if (productDesc.includes(term)) {
        score += 1;
      }
    }
    
    // Check if query appears in category
    if (productCategory.includes(normalizedQuery)) {
      score += 12;
    }
    
    // Price-based scoring
    const priceNumeric = parseFloat(normalizedQuery.replace(/[$,]/g, ''));
    if (!isNaN(priceNumeric)) {
      // If query appears to be a price, boost products with similar prices
      const productPrice = product.discountPrice || product.price;
      const priceDifference = Math.abs(productPrice - priceNumeric);
      if (priceDifference < 20) {
        score += 15;
      } else if (priceDifference < 50) {
        score += 10;
      } else if (priceDifference < 100) {
        score += 5;
      }
    }
    
    // Boost score for products with high ratings
    score += product.rating;
    
    // Boost score for products on sale
    if (product.discountPrice) {
      score += 3;
    }
    
    return { product, score };
  });
  
  // Filter out products with zero relevance and sort by score
  return scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Return top 10 results
    .map(item => item.product);
}


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import products from "../../src/data/products.ts";

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

    // Perform "smart" search on the products array
    const searchResults = smartSearch(query);

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

function smartSearch(query: string) {
  if (!products || products.length === 0) {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase();
  
  // Score products based on relevance to query
  const scoredProducts = products.map(product => {
    let score = 0;
    
    // Check if query appears in name (highest priority)
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    // Extra points for exact match at beginning of name
    if (product.name.toLowerCase().startsWith(normalizedQuery)) {
      score += 5;
    }
    
    // Check if query appears in tags
    if (product.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      score += 7;
    }
    
    // Check if query appears in description
    if (product.description.toLowerCase().includes(normalizedQuery)) {
      score += 3;
    }
    
    // Check if query appears in category
    if (product.category.includes(normalizedQuery)) {
      score += 6;
    }
    
    // Boost score for products with high ratings
    score += product.rating;
    
    // Boost score for products on sale
    if (product.discountPrice) {
      score += 2;
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

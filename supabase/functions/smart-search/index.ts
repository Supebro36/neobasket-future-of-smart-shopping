
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://nlnwvuaidgbbtqvuwocp.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`Processing search query: "${query}"`);
    
    // Get the product data - for this example we're using the local data
    // In a real application with a database, you would fetch this from the database
    const productData = await getProductData();
    
    // Use OpenAI to understand the query and find relevant products
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are a product search assistant. Given a list of products and a search query, 
                      return the IDs of the most relevant products. Only return product IDs that exist in the
                      provided list. Return between 1 and 5 products, depending on relevance.
                      The response should be a JSON array of product IDs. Nothing else.`
          },
          { 
            role: 'user', 
            content: `Here are the products:\n${JSON.stringify(productData)}\n\nSearch query: "${query}"`
          }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" }
      }),
    });

    const openAiData = await response.json();
    const productIds = JSON.parse(openAiData.choices[0].message.content).productIds;

    console.log(`Found ${productIds.length} relevant products`);
    
    // Get the full details of the matching products
    const matchingProducts = productData.filter(product => 
      productIds.includes(product.id)
    );

    return new Response(
      JSON.stringify({ 
        products: matchingProducts,
        explanation: `Found ${matchingProducts.length} products matching your search.` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in smart-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Function to get product data
// In this MVP, we're importing from a static list
// In a production version, this would query your Supabase database
async function getProductData() {
  // This is a simplified list based on your product data
  return [
    {
      id: "prod1",
      name: "Wireless Noise-Cancelling Headphones",
      price: 299.99,
      discountPrice: 249.99,
      description: "Premium noise-cancelling headphones with 30-hour battery life and crystal clear sound quality. Perfect for commuting, travel, and focused work.",
      category: "electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      reviews: 342,
      tags: ["headphones", "wireless", "audio", "bluetooth"]
    },
    {
      id: "prod2",
      name: "Smart Home Speaker with Assistant",
      price: 129.99,
      discountPrice: 99.99,
      description: "Voice-controlled smart speaker with built-in virtual assistant. Control your smart home, play music, get answers, and more with simple voice commands.",
      category: "electronics",
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
      reviews: 218,
      tags: ["smart home", "speaker", "voice assistant", "bluetooth"]
    },
    {
      id: "prod3",
      name: "Minimalist Table Lamp",
      price: 79.99,
      description: "Modern minimalist table lamp with adjustable brightness. Sleek design complements any room decor while providing perfect task or ambient lighting.",
      category: "home-decor",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      reviews: 124,
      tags: ["lamp", "home decor", "lighting", "minimalist"]
    },
    {
      id: "prod4",
      name: "Premium Cotton T-Shirt",
      price: 34.99,
      discountPrice: 24.99,
      description: "Ultra-soft premium cotton t-shirt with modern fit. Breathable, comfortable, and durable for everyday wear in multiple colors.",
      category: "clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
      reviews: 276,
      tags: ["t-shirt", "clothing", "cotton", "apparel"]
    },
    {
      id: "prod5",
      name: "Wireless Earbuds",
      price: 159.99,
      discountPrice: 139.99,
      description: "True wireless earbuds with passive noise isolation, touch controls, and 24-hour battery life with charging case. Crystal clear audio for music and calls.",
      category: "electronics",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
      reviews: 189,
      tags: ["earbuds", "wireless", "audio", "bluetooth"]
    },
    {
      id: "prod6",
      name: "Geometric Wall Art",
      price: 149.99,
      description: "Modern geometric wall art on canvas. Bold, contemporary design adds a striking focal point to any room with vibrant colors and clean lines.",
      category: "home-decor",
      image: "https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.9,
      reviews: 87,
      tags: ["wall art", "home decor", "art", "modern"]
    },
    {
      id: "prod7",
      name: "Smart Fitness Watch",
      price: 199.99,
      discountPrice: 179.99,
      description: "Advanced fitness tracker with heart rate monitor, sleep tracking, GPS, and 7-day battery life. Water-resistant design for all your activities.",
      category: "electronics",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      reviews: 245,
      tags: ["smartwatch", "fitness", "health", "wearable"]
    },
    {
      id: "prod8",
      name: "Designer Leather Bag",
      price: 249.99,
      description: "Handcrafted leather handbag with premium hardware and signature design details. Spacious interior with multiple compartments for organization.",
      category: "accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      reviews: 103,
      tags: ["bag", "leather", "handbag", "accessories"]
    }
  ];
}

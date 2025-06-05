
import { supabase } from "@/integrations/supabase/client";

export class SearchService {
  static async searchProducts(searchQuery: string, category?: string) {
    if (!searchQuery || searchQuery.length < 2) {
      return [];
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    // Build the base query with seller information
    let query = supabase
      .from('products')
      .select(`
        *,
        sellers (
          seller_id,
          name,
          business_name,
          verification_status
        )
      `)
      .eq('is_active', true);

    // Apply category filter if specified
    if (category) {
      query = query.eq('category', category);
    }

    // Search in multiple fields with different priorities
    // This creates an OR condition across multiple fields
    query = query.or(`
      name.ilike.%${normalizedQuery}%,
      description.ilike.%${normalizedQuery}%,
      category.ilike.%${normalizedQuery}%
    `);

    // Order by relevance (products with query in name first, then description, then category)
    // Also order by price to show lower prices first
    query = query.order('price', { ascending: true });

    const { data, error } = await query.limit(10);

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    // Sort results by relevance on the client side for better ranking
    const sortedResults = this.rankSearchResults(data || [], normalizedQuery);
    
    return sortedResults;
  }

  private static rankSearchResults(products: any[], searchQuery: string): any[] {
    const query = searchQuery.toLowerCase();
    
    return products.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // Name matches (highest priority)
      if (a.name.toLowerCase().includes(query)) scoreA += 10;
      if (b.name.toLowerCase().includes(query)) scoreB += 10;
      
      // Exact name match
      if (a.name.toLowerCase() === query) scoreA += 20;
      if (b.name.toLowerCase() === query) scoreB += 20;
      
      // Name starts with query
      if (a.name.toLowerCase().startsWith(query)) scoreA += 15;
      if (b.name.toLowerCase().startsWith(query)) scoreB += 15;
      
      // Category matches
      if (a.category.toLowerCase().includes(query)) scoreA += 5;
      if (b.category.toLowerCase().includes(query)) scoreB += 5;
      
      // Description matches (lower priority)
      if (a.description && a.description.toLowerCase().includes(query)) scoreA += 2;
      if (b.description && b.description.toLowerCase().includes(query)) scoreB += 2;
      
      // If scores are equal, sort by price (lower first)
      if (scoreA === scoreB) {
        return a.price - b.price;
      }
      
      return scoreB - scoreA; // Higher score first
    });
  }

  static async getPopularSearchTerms(): Promise<string[]> {
    // Get a sample of product names and categories for search suggestions
    const { data, error } = await supabase
      .from('products')
      .select('name, category')
      .eq('is_active', true)
      .limit(50);

    if (error) {
      console.error('Error fetching popular search terms:', error);
      return [];
    }

    // Extract unique terms from product names and categories
    const terms = new Set<string>();
    
    data?.forEach(product => {
      // Add category
      terms.add(product.category);
      
      // Add significant words from product names (3+ characters)
      const words = product.name.split(' ').filter(word => word.length >= 3);
      words.forEach(word => terms.add(word.toLowerCase()));
    });

    return Array.from(terms).slice(0, 20);
  }
}

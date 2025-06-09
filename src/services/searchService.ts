
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

    // Enhanced search across multiple fields with proper single-line formatting
    query = query.or(`name.ilike.%${normalizedQuery}%,description.ilike.%${normalizedQuery}%,category.ilike.%${normalizedQuery}%`);

    // Order by relevance and price
    query = query.order('price', { ascending: true });

    const { data, error } = await query.limit(20);

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
      if (a.category.toLowerCase().includes(query)) scoreA += 8;
      if (b.category.toLowerCase().includes(query)) scoreB += 8;
      
      // Description matches (lower priority)
      if (a.description && a.description.toLowerCase().includes(query)) scoreA += 3;
      if (b.description && b.description.toLowerCase().includes(query)) scoreB += 3;
      
      // If scores are equal, sort by price (lower first)
      if (scoreA === scoreB) {
        return a.price - b.price;
      }
      
      return scoreB - scoreA; // Higher score first
    });
  }

  static async getSearchSuggestions(partialQuery: string): Promise<string[]> {
    if (!partialQuery || partialQuery.length < 1) {
      return [];
    }

    const normalizedQuery = partialQuery.toLowerCase().trim();
    
    // Get product names and categories that match the partial query
    const { data, error } = await supabase
      .from('products')
      .select('name, category')
      .eq('is_active', true)
      .or(`name.ilike.%${normalizedQuery}%,category.ilike.%${normalizedQuery}%`)
      .limit(10);

    if (error) {
      console.error('Error fetching search suggestions:', error);
      return [];
    }

    // Extract unique suggestions
    const suggestions = new Set<string>();
    
    data?.forEach(product => {
      // Add category if it matches
      if (product.category.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.category);
      }
      
      // Add product name if it matches
      if (product.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.name);
      }
    });

    return Array.from(suggestions).slice(0, 8);
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

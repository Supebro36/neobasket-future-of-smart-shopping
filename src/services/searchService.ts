
import { supabase } from "@/integrations/supabase/client";

export class SearchService {
  static async searchProducts(searchQuery: string, category?: string) {
    console.log('SearchService.searchProducts called with:', { searchQuery, category });
    
    if (!searchQuery || searchQuery.length < 2) {
      return [];
    }

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

    // Create search conditions for name, description, and category
    const searchPattern = `%${searchQuery}%`;
    query = query.or(`name.ilike.${searchPattern},description.ilike.${searchPattern},category.ilike.${searchPattern}`);

    // If category is provided and not "all", filter by category
    if (category && category !== "all") {
      query = query.eq('category', category);
    }

    // Order by price for consistent results
    query = query.order('price', { ascending: true }).limit(20);

    console.log('SearchService query built, executing...');
    const { data, error } = await query;

    console.log('SearchService query result:', { data, error });

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    console.log('SearchService returning data:', data);
    return data || [];
  }

  static async getSearchSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 1) {
      return [];
    }

    try {
      // Get product names and categories that match the query
      const { data, error } = await supabase
        .from('products')
        .select('name, category')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(5);

      if (error) {
        console.error('Error getting search suggestions:', error);
        return [];
      }

      const suggestions: string[] = [];
      data?.forEach(product => {
        if (product.name.toLowerCase().includes(query.toLowerCase())) {
          suggestions.push(product.name);
        }
        if (product.category.toLowerCase().includes(query.toLowerCase()) && 
            !suggestions.includes(product.category)) {
          suggestions.push(product.category);
        }
      });

      return [...new Set(suggestions)].slice(0, 5);
    } catch (error) {
      console.error('Error in getSearchSuggestions:', error);
      return [];
    }
  }

  static async getPopularSearchTerms(): Promise<string[]> {
    try {
      // Get popular categories and product names
      const { data, error } = await supabase
        .from('products')
        .select('category, name')
        .eq('is_active', true)
        .limit(50);

      if (error) {
        console.error('Error getting popular search terms:', error);
        return [];
      }

      // Extract popular categories and some product names
      const categories = [...new Set(data?.map(p => p.category) || [])];
      const productNames = data?.slice(0, 10).map(p => p.name) || [];
      
      return [...categories, ...productNames].slice(0, 8);
    } catch (error) {
      console.error('Error in getPopularSearchTerms:', error);
      return [];
    }
  }

  private static rankSearchResults(products: any[], searchQuery: string) {
    const query = searchQuery.toLowerCase();
    
    return products.sort((a, b) => {
      const aName = (a.name || '').toLowerCase();
      const bName = (b.name || '').toLowerCase();
      const aDescription = (a.description || '').toLowerCase();
      const bDescription = (b.description || '').toLowerCase();
      
      // Exact name matches get highest priority
      if (aName.includes(query) && !bName.includes(query)) return -1;
      if (!aName.includes(query) && bName.includes(query)) return 1;
      
      // Then description matches
      if (aDescription.includes(query) && !bDescription.includes(query)) return -1;
      if (!aDescription.includes(query) && bDescription.includes(query)) return 1;
      
      // Finally sort by price
      return (a.price || 0) - (b.price || 0);
    });
  }
}

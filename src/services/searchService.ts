
import { supabase } from "@/integrations/supabase/client";

export class SearchService {
  static async searchProducts(searchQuery: string, category?: string) {
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
      .eq('is_active', true)
      .ilike('name', `%${searchQuery}%`);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    return data;
  }
}

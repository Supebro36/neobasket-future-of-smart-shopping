
import { supabase } from "@/integrations/supabase/client";

export class ProductService {
  static async getProducts(category?: string, limit = 20) {
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
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data;
  }

  static async getProductById(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        sellers (
          seller_id,
          name,
          business_name,
          verification_status
        ),
        price_history (
          price,
          start_date,
          end_date
        )
      `)
      .eq('product_id', productId)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return data;
  }
}

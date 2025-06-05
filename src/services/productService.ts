
import { supabase } from "@/integrations/supabase/client";

export class ProductService {
  static async getProducts(category?: string, limit = 20) {
    console.log('ProductService.getProducts called with:', { category, limit });
    
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

    console.log('ProductService query built, executing...');
    const { data, error } = await query;

    console.log('ProductService query result:', { data, error });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    console.log('ProductService returning data:', data);
    return data;
  }

  static async getProductById(productId: string) {
    console.log('ProductService.getProductById called with:', productId);
    
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

    console.log('ProductService.getProductById result:', { data, error });

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return data;
  }
}

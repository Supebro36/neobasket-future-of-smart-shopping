
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
    return data || [];
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

  static async getProductsByCategory(category: string, limit = 50) {
    console.log('ProductService.getProductsByCategory called with:', { category, limit });
    
    const { data, error } = await supabase
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
      .eq('category', category)
      .limit(limit);

    console.log('ProductService.getProductsByCategory result:', { data, error });

    if (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }

    return data || [];
  }

  static async getAllCategories() {
    console.log('ProductService.getAllCategories called');
    
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    // Get unique categories
    const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
    console.log('ProductService.getAllCategories result:', uniqueCategories);
    
    return uniqueCategories;
  }
}

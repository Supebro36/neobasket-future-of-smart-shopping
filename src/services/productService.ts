
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

    // Ensure we return valid data even if sellers is null
    const processedData = (data || []).map(product => ({
      ...product,
      sellers: product.sellers || {
        seller_id: product.seller_id,
        name: 'Unknown Seller',
        business_name: 'Unknown Business',
        verification_status: 'Pending'
      }
    }));

    console.log('ProductService returning processed data:', processedData);
    return processedData;
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

    // Ensure seller data exists
    if (data && !data.sellers) {
      data.sellers = {
        seller_id: data.seller_id,
        name: 'Unknown Seller',
        business_name: 'Unknown Business',
        verification_status: 'Pending'
      };
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

    // Process data to handle null sellers
    const processedData = (data || []).map(product => ({
      ...product,
      sellers: product.sellers || {
        seller_id: product.seller_id,
        name: 'Unknown Seller',
        business_name: 'Unknown Business',
        verification_status: 'Pending'
      }
    }));

    return processedData;
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

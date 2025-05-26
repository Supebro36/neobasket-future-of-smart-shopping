
import { supabase } from "@/integrations/supabase/client";
import { DatabaseUser, DatabaseProduct, DatabaseOrder, DatabaseWatchlist } from "@/types/database";

export class DatabaseService {
  // User operations
  static async getCurrentUser(): Promise<DatabaseUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  }

  static async updateUserProfile(userId: string, updates: Partial<DatabaseUser>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data;
  }

  // Product operations
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

  // Order operations
  static async createOrder(orderData: {
    user_id: string;
    total_amount: number;
    shipping_address?: any;
    items: Array<{
      product_id: string;
      quantity: number;
      unit_price: number;
    }>;
  }) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    return order;
  }

  static async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            name,
            image_url,
            price
          )
        ),
        payments (
          payment_status,
          payment_method,
          amount
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }

    return data;
  }

  // Watchlist operations
  static async addToWatchlist(userId: string, productId: string, targetPrice?: number) {
    const { data, error } = await supabase
      .from('watchlists')
      .insert({
        user_id: userId,
        product_id: productId,
        target_price: targetPrice,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }

    return data;
  }

  static async removeFromWatchlist(userId: string, productId: string) {
    const { error } = await supabase
      .from('watchlists')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  }

  static async getUserWatchlist(userId: string) {
    const { data, error } = await supabase
      .from('watchlists')
      .select(`
        *,
        products (
          *,
          sellers (
            name,
            business_name
          )
        )
      `)
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (error) {
      console.error('Error fetching watchlist:', error);
      throw error;
    }

    return data;
  }

  // Search products
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

  // Price history
  static async getProductPriceHistory(productId: string) {
    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('product_id', productId)
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Error fetching price history:', error);
      throw error;
    }

    return data;
  }
}

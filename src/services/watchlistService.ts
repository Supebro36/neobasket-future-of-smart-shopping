
import { supabase } from "@/integrations/supabase/client";

export class WatchlistService {
  static async addToWatchlist(userId: string, productId: string, targetPrice?: number) {
    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized: Can only manage own watchlist');
    }

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
    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized: Can only manage own watchlist');
    }

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
    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized: Can only access own watchlist');
    }

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
}

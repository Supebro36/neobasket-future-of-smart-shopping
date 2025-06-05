
import { supabase } from "@/integrations/supabase/client";

export class PriceHistoryService {
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

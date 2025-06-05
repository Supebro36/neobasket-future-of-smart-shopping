
import { supabase } from "@/integrations/supabase/client";

export class OrderService {
  static async createOrder(orderData: {
    user_id: string;
    total_amount: number;
    shipping_address?: any;
    items: Array<{
      product_id: string;
      quantity: number;
      unit_price: number;
    }>;
    payment_method?: string;
  }) {
    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== orderData.user_id) {
      throw new Error('Unauthorized: User must be logged in to create orders');
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        payment_status: 'pending'
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

    // Create payment record if payment method is provided
    if (orderData.payment_method) {
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: order.order_id,
          payment_method: orderData.payment_method as any,
          amount: orderData.total_amount,
          payment_status: 'Pending'
        });

      if (paymentError) {
        console.error('Error creating payment record:', paymentError);
        // Don't throw here as order was created successfully
      }
    }

    return order;
  }

  static async getUserOrders(userId: string) {
    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized: Can only access own orders');
    }

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
}

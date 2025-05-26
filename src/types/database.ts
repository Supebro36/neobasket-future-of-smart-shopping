
export interface DatabaseUser {
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  address?: any;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSeller {
  seller_id: string;
  name: string;
  email: string;
  business_name: string;
  verification_status: 'Pending' | 'Verified' | 'Rejected';
  address?: any;
  document_links?: string[];
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProduct {
  product_id: string;
  seller_id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url?: string;
  ar_model_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  order_id: string;
  user_id: string;
  order_date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total_amount: number;
  shipping_address?: any;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrderItem {
  order_item_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface DatabasePayment {
  payment_id: string;
  order_id: string;
  payment_method: 'UPI' | 'Card' | 'Wallet' | 'Net Banking' | 'COD';
  payment_status: 'Pending' | 'Success' | 'Failed' | 'Refunded';
  transaction_reference?: string;
  amount: number;
  paid_at?: string;
  created_at: string;
}

export interface DatabasePriceHistory {
  price_id: string;
  product_id: string;
  price: number;
  start_date: string;
  end_date?: string;
  created_at: string;
}

export interface DatabaseWatchlist {
  watchlist_id: string;
  user_id: string;
  product_id: string;
  added_at: string;
  price_alert_enabled: boolean;
  target_price?: number;
}

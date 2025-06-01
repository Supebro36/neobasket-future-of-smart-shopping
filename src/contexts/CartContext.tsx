
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "../types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  createOrder: (paymentMethod?: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("neobasket-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart data", error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("neobasket-cart", JSON.stringify(items));
  }, [items]);
  
  // Sync with user cart if logged in
  useEffect(() => {
    if (user && user.cart.length > 0 && items.length === 0) {
      setItems(user.cart);
    }
  }, [user]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const createOrder = async (paymentMethod = "card") => {
    if (!user) {
      toast.error("Please log in to place an order");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // Import DatabaseService dynamically to avoid circular dependencies
      const { DatabaseService } = await import("../services/databaseService");
      
      const orderData = {
        user_id: user.id,
        total_amount: subtotal,
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.discountPrice || item.product.price,
        })),
        payment_method: paymentMethod,
      };

      await DatabaseService.createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      createOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

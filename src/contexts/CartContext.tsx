
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "../types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { DatabaseService } from "@/services";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  createOrder: (paymentMethod?: string, shippingAddress?: any) => Promise<boolean>;
  isCreatingOrder: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const { user, isAuthenticated } = useAuth();
  
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
    if (user && user.cart && user.cart.length > 0 && items.length === 0) {
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
    localStorage.removeItem("neobasket-cart");
    toast.info("Cart cleared");
  };

  const createOrder = async (paymentMethod = "card", shippingAddress?: any): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to place an order");
      return false;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }

    setIsCreatingOrder(true);

    try {
      console.log("Creating order for user:", user.id);
      console.log("Cart items:", items);
      
      // Calculate total amount including COD charges if applicable
      const baseAmount = subtotal;
      const codCharge = paymentMethod === "cod" ? 40 : 0;
      const totalAmount = baseAmount + codCharge;

      // Prepare order data
      const orderData = {
        user_id: user.id,
        total_amount: totalAmount,
        shipping_address: shippingAddress || {
          street: "Default Address",
          city: "Default City",
          state: "Default State",
          zipCode: "000000"
        },
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.discountPrice || item.product.price,
        })),
        payment_method: paymentMethod,
      };

      console.log("Order data prepared:", orderData);

      // Create order in database
      const order = await DatabaseService.createOrder(orderData);
      console.log("Order created successfully:", order);

      // Clear cart after successful order creation
      clearCart();
      
      // Show success message
      if (paymentMethod === "cod") {
        toast.success("Order placed successfully! You can pay when the order arrives.");
      } else {
        toast.success("Order placed successfully!");
      }

      return true;
    } catch (error) {
      console.error("Failed to create order:", error);
      
      if (error instanceof Error) {
        if (error.message.includes('Unauthorized')) {
          toast.error("Please log in to place an order");
        } else {
          toast.error(`Failed to place order: ${error.message}`);
        }
      } else {
        toast.error("Failed to place order. Please try again.");
      }
      
      return false;
    } finally {
      setIsCreatingOrder(false);
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
      createOrder,
      isCreatingOrder
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

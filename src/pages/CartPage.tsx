
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, ArrowRight, Trash2, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount, subtotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // In a real app, would redirect to order confirmation
      alert("Thank you for your order! This is just a demo so no actual purchase was made.");
    }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <div className="neo-container py-16">
        <div className="text-center">
          <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShoppingCart size={36} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/">
            <Button className="bg-neo-purple hover:bg-neo-purple/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="neo-container py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-500">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Quantity</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium sr-only">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => {
                  const product = item.product;
                  const price = product.discountPrice || product.price;
                  const itemTotal = price * item.quantity;
                  
                  return (
                    <tr key={product.id} className="text-gray-800">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <Link to={`/product/${product.id}`} className="font-medium hover:text-neo-purple transition-colors">
                              {product.name}
                            </Link>
                            <p className="text-xs text-gray-500">{product.seller.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        ${price.toFixed(2)}
                        {product.discountPrice && (
                          <span className="block text-xs text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center border border-gray-200 rounded w-min">
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                            className="w-10 text-center border-x border-gray-200 py-1 text-sm"
                          />
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium">
                        ${itemTotal.toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Link to="/" className="text-sm text-neo-purple hover:underline">
              Continue Shopping
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCart} 
              className="text-sm"
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-neo-purple hover:bg-neo-purple/90 mb-4"
              disabled={isCheckingOut}
              onClick={handleCheckout}
            >
              {isCheckingOut ? (
                <>Processing...</>
              ) : (
                <>Proceed to Checkout <ArrowRight size={16} className="ml-2" /></>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Secure checkout powered by NeoBasket. This is a demo and no actual purchase will be made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

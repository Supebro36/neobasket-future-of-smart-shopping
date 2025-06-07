
import { Link } from "react-router-dom";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const hasDiscount = !!product.discountPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) 
    : 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-neo-purple text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-1">
            <span className="text-xs text-gray-500">{product.seller.name}</span>
            {product.seller.verified && (
              <span className="ml-1 text-xs text-neo-purple">✓</span>
            )}
          </div>
          
          <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">
                ({product.reviews})
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {hasDiscount ? (
                <>
                  <span className="font-bold text-gray-900">₹{product.discountPrice!.toFixed(2)}</span>
                  <span className="ml-2 text-xs text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full bg-neo-purple hover:bg-neo-purple/90"
          onClick={() => addItem(product)}
        >
          <ShoppingCart size={14} className="mr-1" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}

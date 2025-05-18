
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import ProductGrid from "../components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  
  useEffect(() => {
    // Reset page on navigation
    setProduct(null);
    setRelatedProducts([]);
    setLoading(true);
    setQuantity(1);
    window.scrollTo(0, 0);
    
    // Simulate loading
    setTimeout(() => {
      if (productId) {
        const foundProduct = getProductById(productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setRelatedProducts(getRelatedProducts(foundProduct));
        } else {
          navigate("/not-found");
        }
      }
      
      setLoading(false);
    }, 500);
  }, [productId, navigate]);
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <div className="neo-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return null;
  }
  
  const hasDiscount = !!product.discountPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) 
    : 0;

  return (
    <div className="neo-container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col">
          <div>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <span>{product.seller.name}</span>
              {product.seller.verified && (
                <span className="ml-1 text-neo-purple">✓</span>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="mb-4">
              {hasDiscount ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.discountPrice!.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-2 bg-neo-purple text-white text-xs font-bold px-2 py-1 rounded">
                    {discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            <div className="border-t border-b py-4 mb-6">
              <div className="flex items-center mb-6">
                <span className="mr-4 text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-x border-gray-300 py-1"
                  />
                  <button
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  className="flex-1 bg-neo-purple hover:bg-neo-purple/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2" size={18} /> Add to Cart
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart size={18} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="flex items-center text-sm">
                <span className="text-gray-600 w-24">Category:</span>
                <span className="font-medium">{product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
              </p>
              <p className="flex items-center text-sm">
                <span className="text-gray-600 w-24">Tags:</span>
                <span className="font-medium">{product.tags.join(', ')}</span>
              </p>
              <p className="flex items-center text-sm">
                <span className="text-gray-600 w-24">In Stock:</span>
                <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'Yes' : 'No'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid products={relatedProducts} title="You May Also Like" />
        </div>
      )}
    </div>
  );
}

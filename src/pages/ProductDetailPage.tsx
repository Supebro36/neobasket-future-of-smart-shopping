
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import ProductGrid from "../components/ProductGrid";
import ReviewForm from "@/components/ReviewForm";
import ProductDetail from "@/components/product/ProductDetail";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addItem } = useCart();
  
  useEffect(() => {
    // Reset page on navigation
    setProduct(null);
    setRelatedProducts([]);
    setLoading(true);
    setQuantity(1);
    setShowReviewForm(false);
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
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <div className="neo-container py-8">
      <ProductDetail
        product={product!}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
        loading={loading}
        showReviewForm={showReviewForm}
        toggleReviewForm={toggleReviewForm}
      />
      
      {showReviewForm && product && (
        <ReviewForm 
          product={product} 
          onSubmit={() => setShowReviewForm(false)}
        />
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid products={relatedProducts} title="You May Also Like" />
        </div>
      )}
    </div>
  );
}

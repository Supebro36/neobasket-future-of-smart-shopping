
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, convertDatabaseProductToProduct } from "../types";
import { useCart } from "../contexts/CartContext";
import ProductGrid from "../components/ProductGrid";
import ReviewForm from "@/components/ReviewForm";
import ProductDetail from "@/components/product/ProductDetail";
import { useProduct, useProducts } from "../hooks/useDatabase";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addItem } = useCart();
  
  // Use the database hook to fetch the specific product
  const { data: dbProduct, isLoading, error } = useProduct(productId || '');
  
  // Fetch related products from the same category
  const product = dbProduct ? convertDatabaseProductToProduct(dbProduct) : null;
  const { data: dbRelatedProducts = [] } = useProducts(product?.category, 8);
  
  console.log('ProductDetailPage - productId:', productId);
  console.log('ProductDetailPage - dbProduct:', dbProduct);
  console.log('ProductDetailPage - converted product:', product);
  console.log('ProductDetailPage - isLoading:', isLoading);
  console.log('ProductDetailPage - error:', error);
  
  // Convert related products and filter out the current product
  const relatedProducts = dbRelatedProducts
    .filter((p: any) => p.product_id !== productId)
    .slice(0, 4)
    .map((dbProduct: any) => convertDatabaseProductToProduct(dbProduct));
  
  useEffect(() => {
    // Reset state on navigation
    setQuantity(1);
    setShowReviewForm(false);
    window.scrollTo(0, 0);
  }, [productId]);
  
  useEffect(() => {
    // Handle product not found
    if (!isLoading && !dbProduct && !error) {
      console.error('Product not found, navigating to 404');
      navigate("/not-found");
    }
  }, [isLoading, dbProduct, error, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  // Show error state
  if (error) {
    console.error('ProductDetailPage error:', error);
    return (
      <div className="neo-container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
          <p className="text-gray-600">Failed to load product details. Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error?.message || 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="neo-container py-8">
      <ProductDetail
        product={product!}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
        loading={isLoading || !product}
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


import React from "react";
import ProductImageDisplay from "./ProductImageDisplay";
import ProductMeta from "./ProductMeta";
import ProductRating from "./ProductRating";
import ProductPricing from "./ProductPricing";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./ProductActions";
import { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddToCart: () => void;
  loading: boolean;
  showReviewForm: boolean;
  toggleReviewForm: () => void;
}

export default function ProductDetail({ 
  product, 
  quantity, 
  setQuantity, 
  handleAddToCart, 
  loading,
  showReviewForm,
  toggleReviewForm
}: ProductDetailProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageDisplay loading={true} image="" name="" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-24 w-full bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  // For demo purposes, consider products with ratings > 4.5 as having all verified reviews
  // and products with lower ratings as potentially having fake reviews
  const hasVerifiedReviews = product.rating > 4.5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImageDisplay image={product.image} name={product.name} />
      
      <div className="flex flex-col">
        <div>
          <ProductMeta 
            seller={product.seller}
            category={product.category}
            tags={product.tags}
            inStock={product.inStock}
          />
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <ProductRating 
            rating={product.rating} 
            reviews={product.reviews} 
            verified={hasVerifiedReviews} 
          />
          
          <ProductPricing price={product.price} discountPrice={product.discountPrice} />
          
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          <div className="border-t border-b py-4 mb-6">
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            
            <ProductActions 
              product={product}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              toggleReviewForm={toggleReviewForm}
              showReviewForm={showReviewForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

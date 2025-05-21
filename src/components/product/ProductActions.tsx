
import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductActionsProps {
  product: Product;
  quantity: number;
  onAddToCart: () => void;
  toggleReviewForm: () => void;
  showReviewForm: boolean;
}

export default function ProductActions({ product, quantity, onAddToCart, toggleReviewForm, showReviewForm }: ProductActionsProps) {
  return (
    <>
      <div className="flex space-x-4">
        <Button 
          className="flex-1 bg-neo-purple hover:bg-neo-purple/90"
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2" size={18} /> Add to Cart
        </Button>
        
        <Button variant="outline" size="icon">
          <Heart size={18} />
        </Button>
      </div>
      
      <Button 
        variant="outline" 
        className="mt-6"
        onClick={toggleReviewForm}
      >
        {showReviewForm ? "Cancel Review" : "Write a Review"}
      </Button>
    </>
  );
}

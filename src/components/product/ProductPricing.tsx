
import React from "react";

interface ProductPricingProps {
  price: number;
  discountPrice?: number;
}

export default function ProductPricing({ price, discountPrice }: ProductPricingProps) {
  const hasDiscount = !!discountPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((price - discountPrice!) / price) * 100) 
    : 0;

  return (
    <div className="mb-4">
      {hasDiscount ? (
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">₹{discountPrice!.toFixed(2)}</span>
          <span className="ml-2 text-sm text-gray-500 line-through">₹{price.toFixed(2)}</span>
          <span className="ml-2 bg-neo-purple text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        </div>
      ) : (
        <span className="text-2xl font-bold text-gray-900">₹{price.toFixed(2)}</span>
      )}
    </div>
  );
}

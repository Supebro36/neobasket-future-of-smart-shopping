
import React from "react";
import { Seller } from "@/types";

interface ProductMetaProps {
  seller: Seller;
  category: string;
  tags: string[];
  inStock: boolean;
}

export default function ProductMeta({ seller, category, tags, inStock }: ProductMetaProps) {
  return (
    <>
      <div className="mb-2 flex items-center text-sm text-gray-500">
        <span>{seller.name}</span>
        {seller.verified && (
          <span className="ml-1 text-neo-purple">✓</span>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="flex items-center text-sm">
          <span className="text-gray-600 w-24">Category:</span>
          <span className="font-medium">{category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
        </p>
        <p className="flex items-center text-sm">
          <span className="text-gray-600 w-24">Tags:</span>
          <span className="font-medium">{tags.join(', ')}</span>
        </p>
        <p className="flex items-center text-sm">
          <span className="text-gray-600 w-24">In Stock:</span>
          <span className={`font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'Yes' : 'No'}
          </span>
        </p>
      </div>
    </>
  );
}

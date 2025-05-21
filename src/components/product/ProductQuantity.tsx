
import React from "react";
import { Minus, Plus } from "lucide-react";

interface ProductQuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export default function ProductQuantity({ quantity, setQuantity }: ProductQuantityProps) {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  return (
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
  );
}

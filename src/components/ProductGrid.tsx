
import ProductCard from "./ProductCard";
import { Product } from "../types";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  title?: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export default function ProductGrid({ products, title, hasMore, isLoadingMore, onLoadMore }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">No products found</h3>
        <p className="text-gray-600 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore}
            disabled={isLoadingMore}
            variant="outline"
            size="lg"
          >
            {isLoadingMore ? "Loading..." : "Show More Products"}
          </Button>
        </div>
      )}
    </div>
  );
}

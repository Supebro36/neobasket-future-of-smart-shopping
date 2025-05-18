
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import products, { getProductsByCategory } from "../data/products";
import { Category } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState(products);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      // Get products for this category
      if (categoryId) {
        const validCategory = categoryId as Category;
        setCategoryProducts(getProductsByCategory(validCategory));
      }
      setLoading(false);
    }, 500);
  }, [categoryId]);
  
  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryName = categoryId ? formatCategoryName(categoryId) : "";
  
  return (
    <div className="neo-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{categoryName}</h1>
        <p className="text-gray-600 mt-2">Explore our selection of {categoryName.toLowerCase()} products</p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={categoryProducts} />
      )}
    </div>
  );
}

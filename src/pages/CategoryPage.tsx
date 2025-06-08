
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useDatabase";
import { usePagination } from "../hooks/usePagination";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDatabaseProductToProduct, Product } from "../types";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { limit, isLoadingMore, loadMore, reset } = usePagination({ initialLimit: 20, increment: 20 });
  
  // Use the database hook to fetch products by category with pagination
  const { data: dbProducts = [], isLoading, error } = useProducts(categoryId, limit);
  
  console.log('CategoryPage - categoryId:', categoryId);
  console.log('CategoryPage - dbProducts:', dbProducts);
  console.log('CategoryPage - isLoading:', isLoading);
  console.log('CategoryPage - error:', error);
  
  // Convert database products to frontend Product type
  const products: Product[] = dbProducts.map((dbProduct: any) => {
    console.log('Converting product:', dbProduct);
    return convertDatabaseProductToProduct(dbProduct);
  });
  
  console.log('CategoryPage - converted products:', products);

  // Reset pagination when category changes
  useEffect(() => {
    reset();
  }, [categoryId, reset]);

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryName = categoryId ? formatCategoryName(categoryId) : "";
  
  // Check if there might be more products to load
  const hasMore = products.length === limit && products.length >= 20;
  
  if (error) {
    console.error('CategoryPage error:', error);
    return (
      <div className="neo-container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <p className="text-gray-600">Failed to load products for this category. Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error?.message || 'Unknown error'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="neo-container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{categoryName}</h1>
        <p className="text-gray-600 mt-2">
          {isLoading 
            ? "Loading products..." 
            : `Found ${products.length} ${categoryName.toLowerCase()} products`
          }
        </p>
      </div>
      
      {isLoading && products.length === 0 ? (
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
        <ProductGrid 
          products={products} 
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}

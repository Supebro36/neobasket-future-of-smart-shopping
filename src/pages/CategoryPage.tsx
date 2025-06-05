
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useDatabase";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDatabaseProductToProduct, Product } from "../types";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Use the database hook to fetch products by category
  const { data: dbProducts = [], isLoading, error } = useProducts(categoryId);
  
  // Convert database products to frontend Product type
  const products: Product[] = dbProducts.map((dbProduct: any) => convertDatabaseProductToProduct(dbProduct));
  
  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const categoryName = categoryId ? formatCategoryName(categoryId) : "";
  
  if (error) {
    return (
      <div className="neo-container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <p className="text-gray-600">Failed to load products for this category. Please try again later.</p>
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
      
      {isLoading ? (
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
        <ProductGrid products={products} />
      )}
    </div>
  );
}


import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { useProducts, useSearchProducts } from "../hooks/useDatabase";
import { usePagination } from "../hooks/usePagination";
import { Skeleton } from "@/components/ui/skeleton";
import { convertDatabaseProductToProduct, Product } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { limit, isLoadingMore, loadMore, reset } = usePagination({ initialLimit: 20, increment: 20 });
  
  // Use search hook when there's a search query, otherwise use regular products hook
  const { data: searchResults = [], isLoading: isSearchLoading, error: searchError } = useSearchProducts(
    searchQuery, 
    selectedCategory === "all" ? undefined : selectedCategory
  );
  
  const { data: dbProducts = [], isLoading: isProductsLoading, error: productsError } = useProducts(
    selectedCategory === "all" ? undefined : selectedCategory, 
    limit
  );
  
  // Determine which data to use
  const isSearchMode = searchQuery.length >= 2;
  const isLoading = isSearchMode ? isSearchLoading : isProductsLoading;
  const error = isSearchMode ? searchError : productsError;
  const rawProducts = isSearchMode ? searchResults : dbProducts;
  
  console.log('ProductsPage - searchQuery:', searchQuery);
  console.log('ProductsPage - isSearchMode:', isSearchMode);
  console.log('ProductsPage - rawProducts:', rawProducts);
  console.log('ProductsPage - selectedCategory:', selectedCategory);
  console.log('ProductsPage - isLoading:', isLoading);
  console.log('ProductsPage - error:', error);
  
  // Convert database products to frontend Product type
  const products: Product[] = rawProducts.map((dbProduct: any) => {
    console.log('Converting product in ProductsPage:', dbProduct);
    return convertDatabaseProductToProduct(dbProduct);
  });
  
  console.log('ProductsPage - converted products:', products);
  
  // Reset pagination when category or search changes
  useEffect(() => {
    if (!isSearchMode) {
      reset();
    }
  }, [selectedCategory, searchQuery, reset, isSearchMode]);
  
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home-decor", label: "Home Decor" },
    { value: "accessories", label: "Accessories" },
    { value: "beauty", label: "Beauty" },
    { value: "books", label: "Books" },
    { value: "Baby Care", label: "Baby Care" },
    { value: "Auto Accessories", label: "Auto Accessories" },
    { value: "Books ", label: "Books" }
  ];
  
  // Check if there might be more products to load (only for non-search mode)
  const hasMore = !isSearchMode && products.length === limit && products.length >= 20;
  
  if (error) {
    console.error('ProductsPage error:', error);
    return (
      <div className="neo-container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <p className="text-gray-600">Failed to load products. Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error?.message || 'Unknown error'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="neo-container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {isSearchMode ? `Search Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLoading 
              ? "Loading products..." 
              : `Showing ${products.length} products`
            }
          </p>
        </div>
        
        <div className="w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading && products.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(12)].map((_, i) => (
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

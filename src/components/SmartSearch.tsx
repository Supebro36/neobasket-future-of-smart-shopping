
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchService } from "@/services";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle, Star } from "lucide-react";
import { toast } from "sonner";

export default function SmartSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  // Use React Query to search products from the database
  const { data: searchResults = [], isLoading, error } = useQuery({
    queryKey: ['smartSearch', query],
    queryFn: () => SearchService.searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 30000,
  });

  // Get search suggestions for auto-complete
  const { data: suggestions = [] } = useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => SearchService.getSearchSuggestions(query),
    enabled: query.length >= 1 && query.length < 3,
    staleTime: 60000,
  });

  // Get popular search terms when dialog opens
  const { data: popularTerms = [] } = useQuery({
    queryKey: ['popularSearchTerms'],
    queryFn: SearchService.getPopularSearchTerms,
    enabled: open && query.length === 0,
    staleTime: 300000, // 5 minutes
  });
  
  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    setOpen(false);
    setQuery("");
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
  };
  
  const handleSearch = () => {
    if (query.length < 2) {
      toast.info("Please enter at least 2 characters to search");
      return;
    }
    // Navigate to products page with search query
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setOpen(false);
    setQuery("");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-gray-600 hover:text-neo-purple flex items-center gap-1"
        >
          <Search size={20} />
          <span className="hidden md:block">Smart Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Smart Product Search</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search products by name, category, or description..." 
            value={query}
            onValueChange={setQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button 
            className="mx-3 mt-2 bg-neo-purple hover:bg-neo-purple/90" 
            onClick={handleSearch}
            disabled={isLoading || query.length < 2}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
          
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-neo-purple border-t-transparent rounded-full animate-spin mr-2"></div>
                Searching product database...
              </div>
            ) : (
              <>
                {error && (
                  <div className="py-6 text-center text-sm flex flex-col items-center justify-center text-red-500 gap-2">
                    <AlertCircle size={24} />
                    <p>Search failed. Please try again.</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSearch}
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Show search suggestions when typing */}
                {query.length >= 1 && query.length < 3 && suggestions.length > 0 && (
                  <CommandGroup heading="Search Suggestions">
                    {suggestions.map((suggestion, index) => (
                      <CommandItem 
                        key={index}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                        className="flex items-center gap-2 py-2 cursor-pointer"
                      >
                        <Search size={16} className="text-gray-400" />
                        <span>{suggestion}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {/* Show popular terms when no query */}
                {query.length === 0 && popularTerms.length > 0 && (
                  <CommandGroup heading="Popular Searches">
                    {popularTerms.slice(0, 8).map((term, index) => (
                      <CommandItem 
                        key={index}
                        onSelect={() => handleSuggestionSelect(term)}
                        className="flex items-center gap-2 py-2 cursor-pointer"
                      >
                        <Star size={16} className="text-neo-purple" />
                        <span className="capitalize">{term}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {/* Show search results */}
                {searchResults.length > 0 && (
                  <CommandGroup heading="Products">
                    {searchResults.map((product) => (
                      <CommandItem 
                        key={product.product_id}
                        onSelect={() => handleProductSelect(product.product_id)}
                        className="flex items-center gap-2 py-3 cursor-pointer"
                      >
                        <img 
                          src={product.image_url || "/placeholder.svg"} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-sm text-green-600">
                            ${product.price}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">{product.category}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {query.length >= 2 && searchResults.length === 0 && !isLoading && !error && (
                  <CommandEmpty>
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 mb-2">No products found matching "{query}"</p>
                      <p className="text-xs text-gray-400">Try different keywords or browse our categories</p>
                    </div>
                  </CommandEmpty>
                )}
                
                {query.length < 2 && suggestions.length === 0 && popularTerms.length === 0 && (
                  <div className="py-6 text-center text-sm text-gray-500">
                    Enter at least 2 characters to start searching
                  </div>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

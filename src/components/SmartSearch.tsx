
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
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
import { Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function SmartSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    setSearchError(null);
    
    try {
      console.log("Sending search query:", searchQuery);
      
      const { data, error } = await supabase.functions.invoke("smart-search", {
        body: { query: searchQuery }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      console.log("Search results:", data);
      
      if (!data || !data.results) {
        throw new Error("Invalid response format from search function");
      }
      
      setSearchResults(data.results);
      
      if (data.results.length === 0) {
        toast.info("No products found matching your search.");
      }
    } catch (error) {
      console.error("Smart search error:", error);
      setSearchError("Search failed. Please try again.");
      toast.error("Search error. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    setOpen(false);
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
            placeholder="Search with natural language..." 
            value={query}
            onValueChange={setQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(query);
              }
            }}
          />
          <Button 
            className="mx-3 mt-2 bg-neo-purple hover:bg-neo-purple/90" 
            onClick={() => handleSearch(query)}
            disabled={isSearching || !query.trim()}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
          
          <CommandList>
            {isSearching ? (
              <div className="py-6 text-center text-sm flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-neo-purple border-t-transparent rounded-full animate-spin mr-2"></div>
                Searching product database...
              </div>
            ) : (
              <>
                {searchError && (
                  <div className="py-6 text-center text-sm flex flex-col items-center justify-center text-red-500 gap-2">
                    <AlertCircle size={24} />
                    <p>{searchError}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSearch(query)}
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
                
                {searchResults.length > 0 && (
                  <CommandGroup>
                    {searchResults.map((product) => (
                      <CommandItem 
                        key={product.id}
                        onSelect={() => handleProductSelect(product.id)}
                        className="flex items-center gap-2 py-3 cursor-pointer"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            ${product.discountPrice || product.price}
                            {product.discountPrice && (
                              <span className="line-through ml-1 text-xs">${product.price}</span>
                            )}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {query && searchResults.length === 0 && !isSearching && !searchError && (
                  <CommandEmpty>No products found matching your search.</CommandEmpty>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

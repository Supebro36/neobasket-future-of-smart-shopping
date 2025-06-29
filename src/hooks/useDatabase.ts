
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '@/services';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function useCurrentUser() {
  const { user, isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['currentUser', user?.id],
    queryFn: DatabaseService.getCurrentUser,
    enabled: !!user && isAuthenticated,
  });
}

export function useProducts(category?: string, limit = 30) {
  return useQuery({
    queryKey: ['products', category, limit],
    queryFn: () => DatabaseService.getProducts(category, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => DatabaseService.getProductById(productId),
    enabled: !!productId,
  });
}

export function useProductsByCategory(category: string, limit = 50) {
  return useQuery({
    queryKey: ['productsByCategory', category, limit],
    queryFn: () => DatabaseService.getProducts(category, limit),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
}

export function useAllCategories() {
  return useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      // Get all products and extract unique categories
      const products = await DatabaseService.getProducts(undefined, 1000);
      const categories = [...new Set(products.map((p: any) => p.category))];
      return categories;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (replaces cacheTime)
  });
}

export function useUserOrders() {
  const { user, isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['userOrders', user?.id],
    queryFn: () => DatabaseService.getUserOrders(user!.id),
    enabled: !!user && isAuthenticated,
  });
}

export function useUserWatchlist() {
  const { user, isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['userWatchlist', user?.id],
    queryFn: () => DatabaseService.getUserWatchlist(user!.id),
    enabled: !!user && isAuthenticated,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  
  return useMutation({
    mutationFn: DatabaseService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
      toast.success('Order created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create order:', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        toast.error('Please log in to place an order');
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    },
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  
  return useMutation({
    mutationFn: ({ userId, productId, targetPrice }: { userId: string; productId: string; targetPrice?: number }) =>
      DatabaseService.addToWatchlist(userId, productId, targetPrice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWatchlist'] });
      toast.success('Added to watchlist!');
    },
    onError: (error) => {
      console.error('Failed to add to watchlist:', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        toast.error('Please log in to manage your watchlist');
      } else {
        toast.error('Failed to add to watchlist. Please try again.');
      }
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  
  return useMutation({
    mutationFn: ({ userId, productId }: { userId: string; productId: string }) =>
      DatabaseService.removeFromWatchlist(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWatchlist'] });
      toast.success('Removed from watchlist!');
    },
    onError: (error) => {
      console.error('Failed to remove from watchlist:', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        toast.error('Please log in to manage your watchlist');
      } else {
        toast.error('Failed to remove from watchlist. Please try again.');
      }
    },
  });
}

export function useSearchProducts(searchQuery: string, category?: string) {
  return useQuery({
    queryKey: ['searchProducts', searchQuery, category],
    queryFn: () => DatabaseService.searchProducts(searchQuery, category),
    enabled: searchQuery.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
}

export function useProductPriceHistory(productId: string) {
  return useQuery({
    queryKey: ['productPriceHistory', productId],
    queryFn: () => DatabaseService.getProductPriceHistory(productId),
    enabled: !!productId,
  });
}

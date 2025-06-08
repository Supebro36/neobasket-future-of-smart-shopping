
import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialLimit?: number;
  increment?: number;
}

export function usePagination({ initialLimit = 20, increment = 20 }: UsePaginationProps = {}) {
  const [limit, setLimit] = useState(initialLimit);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    setLimit(prevLimit => prevLimit + increment);
    // Reset loading state after a short delay to show loading feedback
    setTimeout(() => setIsLoadingMore(false), 500);
  }, [increment]);

  const reset = useCallback(() => {
    setLimit(initialLimit);
    setIsLoadingMore(false);
  }, [initialLimit]);

  return {
    limit,
    isLoadingMore,
    loadMore,
    reset
  };
}

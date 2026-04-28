import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchListings } from '@/lib/api';

export function useListings(category?: string) {
  const queryClient = useQueryClient();

  const listingsQuery = useQuery({
    queryKey: ['listings', category],
    queryFn: () => fetchListings(category),
  });

  // Example mutation for creating a listing (can be expanded)
  const createListingMutation = useMutation({
    mutationFn: async (newListing: Record<string, unknown>) => {
      // For now, we don't have a create API endpoint implemented in api.ts
      // but this is where it would go.
      // return createListing(newListing);
      // eslint-disable-next-line no-console
      console.log('Creating listing:', newListing);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });

  return {
    listings: listingsQuery.data || [],
    isLoading: listingsQuery.isLoading,
    error: listingsQuery.error,
    createListing: createListingMutation.mutate,
    isCreating: createListingMutation.isPending,
  };
}

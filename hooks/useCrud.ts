import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CrudOptions<T> {
  resourceName: string;
  fetchFn: () => Promise<T[]>;
  createFn?: (data: Partial<T>) => Promise<T>;
  updateFn?: (id: string, data: Partial<T>) => Promise<T>;
  deleteFn?: (id: string) => Promise<void>;
}

export function useCrud<T>({
  resourceName,
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
}: CrudOptions<T>) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [resourceName],
    queryFn: fetchFn,
  });

  const createMutation = useMutation({
    mutationFn: createFn || (async () => { throw new Error("Create not implemented"); }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceName] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
      updateFn ? updateFn(id, data) : (async () => { throw new Error("Update not implemented"); })(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceName] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn || (async () => { throw new Error("Delete not implemented"); }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourceName] });
    },
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    create: createMutation.mutate,
    isCreating: createMutation.isPending,
    update: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    remove: deleteMutation.mutate,
    isRemoving: deleteMutation.isPending,
  };
}

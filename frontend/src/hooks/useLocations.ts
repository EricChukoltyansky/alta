import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { locationsApi, Location } from "../api/client";

export const useLocations = (params?: Parameters[0]) => {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: () => locationsApi.getAll(params).then((res) => res.data),
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: locationsApi.create,
    onMutate: async (newLocation) => {
      await queryClient.cancelQueries({ queryKey: ["locations"] });

      const optimisticLocation: Location = {
        ...newLocation,
        _id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(["locations"], (old: any) => ({
        ...old,
        data: [optimisticLocation, ...(old?.data || [])],
      }));

      return { optimisticLocation };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters[1] }) =>
      locationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: locationsApi.delete,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["locations"] });

      queryClient.setQueryData(["locations"], (old: any) => ({
        ...old,
        data: old?.data?.filter((loc: Location) => loc._id !== id) || [],
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

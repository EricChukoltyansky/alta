import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { locationsApi, Location } from "../api/client";

export const useLocations = (params?: Parameters[0]) => {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: () => locationsApi.getAll(params).then((res) => res.data),
  });
};


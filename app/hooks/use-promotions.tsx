import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, postData, deleteData, updateData } from "../../lib/fetch-utils";
import { queryClient } from "@/app/admin/layout";

// Get active promotion (public)
export const useGetActivePromotionQuery = () => {
  return useQuery({
    queryFn: () => fetchData("/api/promotions"),
    queryKey: ["active-promotion"],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0, // Always refetch to get latest promotion
  });
};

// Get all promotions (admin)
export const useGetPromotionsQuery = () => {
  return useQuery({
    queryFn: () => fetchData("/api/promotions/admin"),
    queryKey: ["promotions"],
  });
};

// Create promotion (admin)
export const useCreatePromotionMutation = () => {
  return useMutation({
    mutationFn: (data: any) => postData("/api/promotions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["promotions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-promotion"],
      });
    },
  });
};

// Update promotion (admin)
export const useUpdatePromotionMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      updateData(`/api/promotions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["promotions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-promotion"],
      });
    },
  });
};

// Delete promotion (admin)
export const useDeletePromotionMutation = () => {
  return useMutation({
    mutationFn: (id: string | number) => deleteData(`/api/promotions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["promotions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-promotion"],
      });
    },
  });
};


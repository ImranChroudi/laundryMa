import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, postData, deleteData } from "../../lib/fetch-utils";
import { queryClient } from "@/app/admin/layout";

export const useGetOrdersQuery = () => {
  return useQuery({
    queryFn: () => fetchData("/api/orders/get-orders"),
    queryKey: ["orders"],
  });
};

export const useCreatePickupMutation = () => {
  return useMutation({
    mutationFn: (data: {
      nameClient: string;
      phone: string;
      dateRamassage: string;
      dateLivraisonPrevue: string;
      heureRamassage: string;
      heureLivraison: string;
      locationRamassage: { latitude: number; longitude: number; address: string };
      locationLivraison: { latitude: number; longitude: number; address: string };
    }) => postData("/api/orders/create-pickup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { orderToDelete: string | number }) => {
      return deleteData(`/api/orders/${data.orderToDelete}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
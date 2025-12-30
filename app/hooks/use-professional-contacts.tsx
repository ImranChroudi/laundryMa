import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, deleteData } from "../../lib/fetch-utils";
import { queryClient } from "@/app/admin/layout";

// Get all professional contacts
export const useGetProfessionalContactsQuery = () => {
  return useQuery({
    queryFn: () => fetchData("/api/professional-contacts"),
    queryKey: ["professional-contacts"],
  });
};

// Delete professional contact
export const useDeleteProfessionalContactMutation = () => {
  return useMutation({
    mutationFn: async (data: { contactId: string | number }) => {
      return deleteData(`/api/professional-contacts/${data.contactId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professional-contacts"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};


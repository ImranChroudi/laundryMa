import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, postData, deleteData } from "../../lib/fetch-utils";

import { queryClient } from "@/app/admin/layout";
// const queryClient = new QueryClient();
// export const useAddEmployeeMutation = () => {
//   return useMutation({
//     mutationFn: (data: {
//       formData: { name: string; salary: string };
//       branchId: string;
//     }) => postData("/employee/add-employee", data),
//      onSuccess: (data: any) => {
//       queryClient.invalidateQueries({
//         queryKey: ["employees"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["expenses", data.branchId],
//       });
//     },

//   });
// };


export const useGetOrdersQuery = () => {
    console.log("useEmployeesByBranchQuery");
  return useQuery({
    queryFn: () => fetchData("/api/orders/get-orders"),
    queryKey: ["orders"], // ✅ queryKey includes branchId
})}



// export const useUpdateEmployeeMutation = () => {
//   return useMutation({
//     mutationFn: (data: {
//       formData: { name: string; salary: string };
//       employeeId: string;
//     }) => updateData("/employee/update-employee" , data),
//     onSuccess: (data: any) => {
//         console.log("useUpdateEmployeeMutation", data);
//       queryClient.invalidateQueries({
//         queryKey: ["employees", data.branchId],
//       });
//     },

//   });
// };





export const useCreatePickupMutation = () => {

  return useMutation({
    mutationFn: (data: {
      nameClient: string;
      phone: string;
      dateRamassage : string;
      dateLivraisonPrevue: string;
      heureRamassage: string;
      heureLivraison: string;
      locationRamassage: { latitude: number; longitude: number; address: string };
      locationLivraison: { latitude: number; longitude: number; address: string };
    }) => postData("/api/orders/create-pickup", data),
    onSuccess: (data : any) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
   
  return useMutation({
    mutationFn: async (data: {orderToDelete: string | number}) => {
      return deleteData(`/api/orders/${data.orderToDelete}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

// export const useAddMatriculeMutation = () => {
//   return useMutation({
//     mutationFn: (data: { matricule: string , action : "enter" | "leave"}) =>
//       updateData("/employee/add-matricule", data),
//     onSuccess: (data: any) => {
//       queryClient.invalidateQueries({
//         queryKey: ["employees"],
//       });
//     },
//   });
// };
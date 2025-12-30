import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteData, fetchData, postData, updateData } from "../../lib/fetch-utils";
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



export const useAddEmployeeMutation = () => {
   return useMutation({
    mutationFn: (data: {email: string}) => postData("/api/employee/add-employee" , data),
   onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["employee" , "employee"],
      });
    },
  });
};

// ✅ Get customers by branch
export const useGetEmployees = () => {
  console.log("useCustomersByBranchToAddOrderQuery");
  
  return useQuery({
    queryFn: () => fetchData("/api/employee/get-employees"),
    queryKey: ["employee" , "employee"], // include branchId to scope cache
  });
};

export const useSignUpEmployeeMutation = () => {
   return useMutation({
    mutationFn: (data: {name: string , email: string , password : string}) => 
      postData("/api/employee/sign-up" , data),
   onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee" , "employee"],
      });
    },
  });
};

export const useUpdateEmployeeMutation = () => {
   return useMutation({

    mutationFn: (data : {email : string , id : string | number}) => 
      updateData("/api/employee/update-employee" , data),
   onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["employee" , "employee"],
      });
    },
  });
};

export const useDeleteEmployeeMutation = () => {
  return useMutation({
    mutationFn: (data: { employeeId: string | number | null}) =>
      updateData("/api/employee/delete-employee",{employeeId :  data.employeeId}),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["employee" , "employee"],
      });
    },
  });
}






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


// export const useDeleteEmployeeMutation = () => {
//   console.log("useDeleteEmployeeMutation");
//   return useMutation({
//     mutationFn: (data: { employeeId: string , branchId : string}) =>
//       deleteData("/employee/delete-employee",{employeeId :  data.employeeId}),
//     onSuccess: (data: any) => {
//       queryClient.invalidateQueries({
//         queryKey: ["employees" , data.branchId],
//       });
//     },
//   });
// }


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
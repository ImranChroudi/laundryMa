import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteData, fetchData, postData, updateData } from "../../lib/fetch-utils";



export const useAddCommantsMutation = () => {
   return useMutation({
    mutationFn: (data: {
        name : string , email : string  , comment : string , rating : number
    }) => postData("/api/comments/add-comment" , data),
   onSuccess: (data: any) => {
      useQueryClient.invalidateQueries({
        queryKey: ["comments" , "comments"],
      });
    },
  });
};

// ✅ Get customers by branch
export const useGetCommants = () => {
  console.log("use get comments ");
  
  return useQuery({
    queryFn: () => fetchData("/api/comments/get-comments"),
    queryKey: ["comments" , "comments"], // include branchId to scope cache
  });
};


export const useUpdateCommentsMutation = () => {
   return useMutation({

    mutationFn: (data : {commentId : string | number , state : boolean}) => 
      updateData("/api/comments/update-comment" , data),
   onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comments" , "comments"],
      });
    },
  });
};

// ✅ Delete Comment
export const useDeleteCommentsMutation = () => {
  return useMutation({
   mutationFn: (data: { commentId: string | number | null}) =>
      updateData("/api/comments/delete-comment", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "comments"],
      });
    },
  });
};



// ✅ Accept Comment (update isAccepted=1 & isPublished=1)
export const useAcceptCommentMutation = () => {
  return useMutation({
    mutationFn: (data: { commentId: string | number }) =>
      updateData("/api/comments/accept-comment", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "comments"],
      });
    },
  });
};




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
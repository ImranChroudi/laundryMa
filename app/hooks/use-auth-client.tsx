import {  useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, postData } from "@/lib/fetch-utils";
import { queryClient } from "@/app/admin/context/index";

// Types
export interface SignUpData {
  name: string;
  phone: string;
  email: string;
  password: string;
  rememberMe?: string;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// ✅ Sign Up Mutation
export const useSignUpClientMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpData) => 
      postData("/api/auth/client/signup-client", data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "user"],
      });
    },
  });
};

// ✅ Sign In Mutation
export const useSignInClientMutation = () => {
  return useMutation({
    mutationFn: (data: SignInData) => 
      postData("/api/auth/signin", data),
    onSuccess: (data: AuthResponse) => {
      // Store token in localStorage or cookies
      if (data.success && data.data.token) {
        localStorage.setItem('authToken', data.data.token);
      }
      queryClient.invalidateQueries({
        queryKey: ["auth", "user"],
      });
    },
  });
};

// ✅ Get Current User Profile
export const useGetCurrentUser = () => {
  return useQuery({
    queryFn: () => fetchData("/api/auth/profile"),
    queryKey: ["auth", "user"],
    enabled: !!localStorage.getItem('authToken'), // Only run if token exists
    retry: false,
  });
};

// ✅ Sign Out Mutation
export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: () => 
      postData("/api/auth/signout", {}),
    onSuccess: () => {
      // Clear token from storage
      localStorage.removeItem('authToken');
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.invalidateQueries({
        queryKey: ["auth", "user"],
      });
    },
  });
};

// ✅ Update User Profile Mutation
export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (data: Partial<User>) => 
      postData("/api/auth/update-profile", data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "user"],
      });
    },
  });
};

// ✅ Verify Token Mutation
// export const useVerifyTokenMutation = () => {
//   return useMutation({
//     mutationFn: (token: string) => 
//       postData("/api/auth/verify-token", { token }),
//     onSuccess: (data: any) => {
//       if (data.success) {
//         queryClient.invalidateQueries({
//           queryKey: ["auth", "user"],
//         });
//       }
//     },
//   });
//};
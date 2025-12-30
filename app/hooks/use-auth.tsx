import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../../lib/fetch-utils";






export const useSignInMutation = () => {
  console.log("useSignInMutation");
  return useMutation({
    mutationFn: (data: { email: string; password: string , role : string }) =>
      postData("/api/auth/signin", data),
  });
};


export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string }) =>
      postData("/auth/forgot-password", data),
  });
};

export const useVerifyCodeMutation = () => {
  return useMutation({mutationFn: (data: { email: string | string[] , code : string }) =>
      postData("/auth/verify-code", data),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { 
        forgotEmail : string, newPassword : string
    }) =>
      postData("/auth/reset-password", data),
  });
};

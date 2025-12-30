import { useMutation } from "@tanstack/react-query";
import { postData } from "../../lib/fetch-utils";
import { queryClient } from "@/app/admin/layout";

// ✅ Envoyer le code de vérification
export const useSendVerificationCodeMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; role: "admin" | "employe" }) =>
      postData("/api/forgot-password/send-code", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forgot-password"] });
    },
  });
};

// ✅ Vérifier le code reçu
export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      postData("/api/forgot-password/verify-code", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forgot-password"] });
    },
  });
};

// ✅ Réinitialiser le mot de passe et récupérer le token
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { 
      email: string; 
      newPassword: string; 
      confirmPassword: string;
    }) =>
      postData("/api/forgot-password/reset-password", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forgot-password"] });
    },
  });
};

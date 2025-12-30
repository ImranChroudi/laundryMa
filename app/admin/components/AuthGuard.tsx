"use client";

import { useAuth } from "@/app/context/AdminProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "../login/page";
import LoaderCommponent from "@/app/components/ui/Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Check if user is on login page
  const isLoginPage = pathname === "/admin/login";
  const isAdminRoot = pathname === "/admin";
  
  // Public routes that don't require authentication
  const isForgotPasswordPage = pathname === "/admin/forgot-password";
  const isVerifyCodePage = pathname?.startsWith("/admin/verify-code");
  const isResetPasswordPage = pathname?.startsWith("/admin/reset-password");
  const isPublicRoute = isLoginPage || isForgotPasswordPage || isVerifyCodePage || isResetPasswordPage;

  if (isLoading) {
    return <LoaderCommponent />;
  }

  useEffect(() => {
    // If authenticated and on login page or admin root, redirect to dashboard
    if (isAuthenticated && (isLoginPage || isAdminRoot) && !isLoading) {
      window.location.href = "/admin/dashboard/";
    }
  }, [isAuthenticated, isLoginPage, isAdminRoot, isLoading]);

  // Allow public routes without authentication
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Show login page if not authenticated (on any admin page)
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Show children if authenticated
  return <>{children}</>;
}


"use client";
import "../global.css";
import { AdminProvider } from "../context/AdminProvider";
import AuthGuard from "./components/AuthGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <title>Admin Dashboard - Laundry App</title>
      <meta name="description" content="Admin panel for laundry management" />
      <body>
        <AdminProvider>
          <QueryClientProvider client={queryClient}>
            <AuthGuard>
              <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
                <Toaster position="top-center" reverseOrder={false} />
              </main>
            </AuthGuard>
          </QueryClientProvider>
        </AdminProvider>
      </body>
    </html>
  );
}

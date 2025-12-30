import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardSidebar from "../components/Sidebar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden  lg:block lg:relative">
        <DashboardSidebar />
      </div>
        

      {/* Main Content */}
      <div className="flex-1 lg:ml-[100px]">
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}


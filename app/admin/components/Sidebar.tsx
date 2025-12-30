"use client";

import {  useState } from "react";
import { Menu, X, LogOut, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/context/AdminProvider";
import { navigationAdmin } from "../context";
import ConfirmationDialog from "@/app/components/ui/ConfirmationDialog";
import logo from "../../../public/images/logo.jpg";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { logout, user , isLoading } = useAuth();
  const pathname = usePathname();

  if(isLoading) return <Loader />

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden h-full fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
        } lg:translate-x-0  transform transition-transform duration-300 ease-in-out fixed top-0 left-0 z-50 h-screen border-r`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 pl-6 py-4 border-b border-border">
             <img src={logo.src} alt="Logo" className="h-15 w-full" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col  px-4 py-6 space-y-2">
            <div>
                <>
                  {navigationAdmin.map((item) => {
                    console.log(pathname);
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                   ${
                     isActive
                       ? "bg-primary text-primary-foreground"
                       : "text-muted-foreground hover:text-foreground hover:bg-accent"
                   }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </>
              
            </div>
            <div className="mt-auto">
              <Button
                onClick={() => setIsDialogOpen(true)}
                className={`flex  items-center gap-3 bg-transparent hover:bg-transparent px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground`}
              >
                <LogOut className="h-4 w-4 text-destructive" />
                se Deconnecte
              </Button>
            </div>
          </nav>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        message="Voulez-vous vraiment vous deconnecter ?"
        onConfirm={() => logout("admin")}
        onCancel={() => setIsDialogOpen(false)}
      />

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;

"use client";

import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <header className="bg-blue-500 p-4 flex items-center justify-center w-full sticky top-0 z-10 gap-4">
          <SidebarTrigger className="absolute left-5" />
          <AppSidebar />
          <h1 className="text-2xl font-bold text-white">Todo App</h1>
        </header>
        <div className="p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default PrivateLayout;

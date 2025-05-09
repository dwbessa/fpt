
"use client"; // Add "use client" for useRouter

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import { SidebarNavItems } from './sidebar-nav-items';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster"

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter(); // Initialize useRouter

  const handleLogout = () => {
    // In a real app, you would also clear any authentication tokens or session data.
    router.push('/login');
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r">
        <SidebarRail />
        <SidebarHeader className="p-4">
          <div className="group-data-[collapsible=icon]:hidden">
            <Logo />
          </div>
           <div className="hidden items-center justify-center group-data-[collapsible=icon]:flex">
             <Logo />
           </div>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-grow">
          <SidebarNavItems />
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:aspect-square"
            onClick={handleLogout} // Add onClick handler
          >
            <LogOut className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden">Sair</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        {children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}

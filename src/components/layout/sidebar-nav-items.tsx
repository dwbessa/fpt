"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenText, LayoutDashboard, Gamepad2, BarChartBig, type LucideIcon } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/subject-trails', label: 'Trilhas de Estudo', icon: BookOpenText, tooltip: 'Trilhas de Estudo' },
  { href: '/practice-zone', label: 'Zona de Prática', icon: Gamepad2, tooltip: 'Zona de Prática' },
  { href: '/performance-analysis', label: 'Análise de Desempenho', icon: BarChartBig, tooltip: 'Análise de Desempenho' },
];

export function SidebarNavItems() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={{ children: item.tooltip || item.label, side: 'right' }}
              className={cn(
                "w-full justify-start",
                pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

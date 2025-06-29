"use client";
import { LabeledSection } from '@/shared/components/atoms/ui/section';
import { cn } from "@/shared/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/shared/components/atoms/ui/sidebar";
import { 
  Home,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Bus,
  Route
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/atoms/ui/avatar";
import { Button } from "@/shared/components/atoms/ui/button";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Logo } from "@/shared/components/atoms/ui/logo";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/admin", badge: null },
  { title: "Réservations", icon: Calendar, url: "/admin/reservations", badge: "12" },
  { title: "Voyages", icon: Route, url: "/admin/voyages", badge: null },
  { title: "Véhicules", icon: Bus, url: "/admin/vehicules", badge: null },
  { title: "Chauffeurs", icon: Users, url: "/admin/chauffeurs", badge: null },
  { title: "Clients", icon: Users, url: "/admin/clients", badge: "3" },
  { title: "Finances", icon: DollarSign, url: "/admin/finances", badge: null },
  { title: "Rapports", icon: BarChart3, url: "/admin/rapports", badge: null },
  { title: "Paramètres", icon: Settings, url: "/admin/parametres", badge: null }
];

function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <Logo variant="compact" size="md" />
          <div>
            <p className="text-sm text-gray-500">Administration</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all",
                      "hover:bg-gray-100 hover:text-primary",
                      "data-[state=open]:bg-primary data-[state=open]:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                    asChild
                  >
                    <a href={item.url} className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-primary text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/api/placeholder/40/40" alt="Admin" />
            <AvatarFallback className="bg-primary text-white">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin Trevia</p>
            <p className="text-xs text-gray-500 truncate">admin@trevia-transport.com</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-gray-500 hover:text-primary hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}

function SidebarDemo() {
  return (
    <div className="min-h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-full">
          <AppSidebar />
          <main className="flex-1 p-6 bg-gray-50">
            <div className="flex items-center space-x-4 mb-6">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            </div>
            {/* ...stats and activity... */}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export function AdminSidebarSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Sidebar Admin avec Navigation">
        <SidebarDemo />
      </LabeledSection>
      <LabeledSection label="Sidebar Compacte">
        <div className="min-h-[400px] border border-gray-200 rounded-lg overflow-hidden">
          <SidebarProvider defaultOpen={false}>
            <div className="flex h-full">
              <AppSidebar />
              <main className="flex-1 p-6 bg-gray-50">
                <div className="flex items-center space-x-4 mb-6">
                  <SidebarTrigger />
                  <h1 className="text-2xl font-bold text-gray-900">Vue Compacte</h1>
                </div>
                <p className="text-gray-600">
                  Cliquez sur l&apos;icône hamburger pour ouvrir la sidebar.
                </p>
              </main>
            </div>
          </SidebarProvider>
        </div>
      </LabeledSection>
    </div>
  );
}

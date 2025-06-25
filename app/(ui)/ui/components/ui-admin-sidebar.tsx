"use client";

import { LabeledSection } from "./ui-section";
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
} from "@/components/ui/sidebar";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
    badge: null
  },
  {
    title: "Réservations",
    icon: Calendar,
    url: "/admin/reservations",
    badge: "12"
  },
  {
    title: "Voyages", 
    icon: Route,
    url: "/admin/voyages",
    badge: null
  },
  {
    title: "Véhicules",
    icon: Bus,
    url: "/admin/vehicules",
    badge: null
  },
  {
    title: "Chauffeurs",
    icon: Users,
    url: "/admin/chauffeurs",
    badge: null
  },
  {
    title: "Clients",
    icon: Users,
    url: "/admin/clients",
    badge: "3"
  },
  {
    title: "Finances",
    icon: DollarSign,
    url: "/admin/finances",
    badge: null
  },
  {
    title: "Rapports",
    icon: BarChart3,
    url: "/admin/rapports",
    badge: null
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "/admin/parametres",
    badge: null
  }
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
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="bg-primary text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
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
            <p className="text-sm font-medium text-gray-900 truncate">
              Admin Trevia
            </p>
            <p className="text-xs text-gray-500 truncate">
              admin@trevia-transport.com
            </p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Réservations</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+12% ce mois</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenus</p>
                    <p className="text-2xl font-bold text-gray-900">€45,231</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+8% ce mois</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Véhicules</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bus className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">2 en maintenance</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clients</p>
                    <p className="text-2xl font-bold text-gray-900">8,942</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+15% ce mois</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Activité récente
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Nouvelle réservation - Paris → Lyon
                  </p>
                  <p className="text-xs text-gray-400">Il y a 5 min</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Véhicule BUS-001 en maintenance terminée
                  </p>
                  <p className="text-xs text-gray-400">Il y a 1h</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Nouveau chauffeur ajouté - Jean Martin
                  </p>
                  <p className="text-xs text-gray-400">Il y a 2h</p>
                </div>
              </div>
            </div>
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

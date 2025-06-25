'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Info,
  Package,
  Settings,
  ArrowRight
} from 'lucide-react';
import { StatsCard } from '@/shared/components/molecules/dashboard/stats-card';
import { ChartCard } from '@/shared/components/molecules/dashboard/chart-card';
import { ActivityList, Activity } from '@/shared/components/molecules/dashboard/activity-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Exemple de données - À remplacer par de vraies données de votre API
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fév', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Avr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Juin', value: 2390 },
];

const recentActivities: Activity[] = [
  {
    id: '1',
    title: 'Nouvelle commande #1234',
    description: 'Client: John Doe - Total: 156.00€',
    timestamp: new Date(),
    icon: ShoppingCart,
    status: 'success',
    user: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
  },
  {
    id: '2',
    title: 'Alerte stock faible',
    description: 'Produit XYZ en dessous du seuil minimum',
    timestamp: new Date(Date.now() - 3600000),
    icon: AlertCircle,
    status: 'warning'
  },
  {
    id: '3',
    title: 'Maintenance système',
    description: 'Mise à jour de la base de données terminée',
    timestamp: new Date(Date.now() - 7200000),
    icon: Info,
    status: 'info'
  }
];

export default function DashboardPage() {
  // Exemple de requête - À adapter selon votre API
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Simuler un appel API
      return {
        totalUsers: 1234,
        totalOrders: 567,
        revenue: 12345.67,
        growth: 23.4
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div>
     
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>
            Accès direct aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/admin/categories">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Gérer les Catégories</p>
                    <p className="text-xs text-muted-foreground">
                      Créer et modifier les catégories
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/admin/users">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-green-500 text-white">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Utilisateurs</p>
                    <p className="text-xs text-muted-foreground">
                      Gérer les comptes utilisateurs
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/admin/settings">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-purple-500 text-white">
                    <Settings className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Paramètres</p>
                    <p className="text-xs text-muted-foreground">
                      Configuration système
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { LabeledSection } from "./ui-section";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Package,
  Calendar,
  Activity,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react';

// Composant StatsCard local pour éviter les problèmes de Server/Client Components
function StatsCard({ 
  title, 
  value, 
  iconName, 
  description, 
  trend, 
  className = "" 
}: {
  title: string;
  value: string;
  iconName: string;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}) {
  const getIcon = (name: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      'Users': Users,
      'ShoppingCart': ShoppingCart,
      'TrendingUp': TrendingUp,
      'DollarSign': DollarSign,
      'Package': Package,
      'Calendar': Calendar,
      'Activity': Activity
    };
    return icons[name] || Users;
  };

  const Icon = getIcon(iconName);

  return (
    <Card className={`${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{description}</span>
          {trend && (
            <Badge variant={trend.isPositive ? "default" : "destructive"} className="text-xs">
              {trend.isPositive ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {trend.value}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminStatsSample() {
    return (
        <div className="space-y-8">
            <LabeledSection label="Dashboard Stats Cards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat) => (
                        <StatsCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            iconName={stat.iconName || "Users"}
                            description={stat.description}
                            trend={stat.trend}
                            className={stat.className}
                        />
                    ))}
                </div>
            </LabeledSection>

            <LabeledSection label="Trending Stats">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingData.map((stat) => (
                        <StatsCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            iconName={stat.iconName || "Users"}
                            description={stat.description}
                            trend={stat.trend}
                            className="hover:shadow-md transition-shadow"
                        />
                    ))}
                </div>
            </LabeledSection>
        </div>
    );
}

const statsData = [
    {
        id: "users",
        title: "Total Utilisateurs",
        value: "2,543",
        iconName: "Users",
        description: "Utilisateurs actifs",
        trend: {
            value: 12.5,
            isPositive: true
        }
    },
    {
        id: "orders",
        title: "Commandes",
        value: "1,247",
        iconName: "ShoppingCart",
        description: "Ce mois-ci",
        trend: {
            value: 8.2,
            isPositive: true
        }
    },
    {
        id: "revenue",
        title: "Revenus",
        value: "€45,231",
        iconName: "DollarSign",
        description: "Total mensuel",
        trend: {
            value: 15.3,
            isPositive: true
        }
    },
    {
        id: "growth",
        title: "Croissance",
        value: "23.5%",
        iconName: "TrendingUp",
        description: "Vs mois dernier",
        trend: {
            value: 5.1,
            isPositive: true
        },
        className: "border-primary/20 bg-primary/5"
    }
];

const trendingData = [
    {
        id: "products",
        title: "Produits",
        value: "856",
        iconName: "Package",
        description: "En stock",
        trend: {
            value: 3.2,
            isPositive: false
        }
    },
    {
        id: "events",
        title: "Événements",
        value: "42",
        iconName: "Calendar",
        description: "Cette semaine",
        trend: {
            value: 18.7,
            isPositive: true
        }
    },
    {
        id: "activity",
        title: "Activité",
        value: "94%",
        iconName: "Activity",
        description: "Taux d'engagement",
        trend: {
            value: 2.1,
            isPositive: true
        }
    }
];

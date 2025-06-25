"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home, Users, Settings, BarChart3, Package } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbConfig {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const getBreadcrumbConfig = (pathname: string): BreadcrumbConfig[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbConfig[] = [
    { label: 'Tableau de bord', href: '/admin', icon: Home }
  ];

  if (segments.includes('admin')) {
    if (pathname.includes('/admin/users')) {
      breadcrumbs.push({ label: 'Utilisateurs', href: '/admin/users', icon: Users });
    } else if (pathname.includes('/admin/categories')) {
      breadcrumbs.push({ label: 'Catégories', href: '/admin/categories', icon: Package });
    } else if (pathname.includes('/admin/settings')) {
      breadcrumbs.push({ label: 'Paramètres', href: '/admin/settings', icon: Settings });
    }
    
    // Ajouter des sous-pages spécifiques si nécessaire
    if (pathname.includes('/create')) {
      breadcrumbs.push({ label: 'Créer', icon: BarChart3 });
    } else if (pathname.includes('/edit')) {
      breadcrumbs.push({ label: 'Modifier', icon: Settings });
    }
  }

  return breadcrumbs;
};

export function AdminBreadcrumb() {
  const pathname = usePathname();
  
  // Ne pas afficher le breadcrumb sur la page d'accueil admin
  if (pathname === '/admin') {
    return null;
  }
  
  const breadcrumbs = getBreadcrumbConfig(pathname);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const Icon = breadcrumb.icon;

            return (
              <div key={breadcrumb.label} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="flex items-center gap-2 font-medium text-foreground">
                      {Icon && <Icon className="w-4 h-4" />}
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      asChild
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Link href={breadcrumb.href!}>
                        {Icon && <Icon className="w-4 h-4" />}
                        {breadcrumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

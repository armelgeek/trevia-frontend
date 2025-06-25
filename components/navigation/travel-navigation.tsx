'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { UserNavigation } from './user-navigation';
import { AuthDebugInfo } from '@/components/debug/auth-debug-info';
import { 
  Plane, 
  MapPin, 
  Heart, 
  User, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface TravelNavigationProps {
  className?: string;
  variant?: 'header' | 'sidebar' | 'breadcrumb';
}

export function TravelNavigation({ className, variant = 'header' }: TravelNavigationProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      label: 'Tous les voyages',
      href: '/travels',
      icon: Plane,
      description: 'Explorez toutes nos destinations',
      active: pathname === '/travels'
    },
    {
      label: 'Destinations',
      href: '/travels/destinations',
      icon: MapPin,
      description: 'Voyages par destination',
      active: pathname.startsWith('/travels/destinations')
    },
    {
      label: 'Favoris',
      href: '/travels/favorites',
      icon: Heart,
      description: 'Vos voyages favoris',
      active: pathname === '/travels/favorites',
      badge: '3' // Exemple de nombre de favoris
    },
    {
      label: 'Mes réservations',
      href: '/account/reservations',
      icon: Calendar,
      description: 'Gérez vos réservations',
      active: pathname === '/account/reservations'
    }
  ];

  if (variant === 'breadcrumb') {
    return (
      <nav className={cn("flex items-center space-x-1 text-sm text-gray-500", className)}>
        <Link href="/" className="hover:text-gray-900">
          Accueil
        </Link>
        <ChevronRight className="h-4 w-4" />
        
        {pathname.includes('/travels') && (
          <>
            <Link href="/travels" className="hover:text-gray-900">
              Voyages
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        
        {pathname.includes('/travels/') && !pathname.endsWith('/travels') && (
          <>
            <span className="text-gray-900 font-medium">
              Détail
            </span>
          </>
        )}
      </nav>
    );
  }

  if (variant === 'sidebar') {
    return (
      <nav className={cn("space-y-2", className)}>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
              item.active 
                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <header className={cn("bg-white border-b border-gray-200 sticky top-0 z-50", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Trevia</span>
            </Link>
            
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <span>/</span>
              <span className="ml-2">Voyages</span>
            </div>
          </div>

          {/* Navigation principale */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors relative",
                  item.active 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="text-xs absolute -top-1 -right-1">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions utilisateur */}
          <UserNavigation />
        </div>
      </div>
      
      {/* Debug info en développement */}
      <AuthDebugInfo />
    </header>
  );
}

// Composant pour la navigation mobile
export function MobileTravelNavigation() {
  const pathname = usePathname();

  const mobileNavItems = [
    { label: 'Voyages', href: '/travels', icon: Plane },
    { label: 'Destinations', href: '/travels/destinations', icon: MapPin },
    { label: 'Favoris', href: '/travels/favorites', icon: Heart },
    { label: 'Compte', href: '/account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="grid grid-cols-4 gap-1">
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-3 px-2 text-xs",
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface TravelBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function TravelBreadcrumb({ items, className }: TravelBreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-gray-500", className)}>
      <Link 
        href="/" 
        className="flex items-center hover:text-gray-900 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {item.href && !item.current ? (
            <Link 
              href={item.href} 
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              item.current ? "text-gray-900 font-medium" : "text-gray-500"
            )}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// Composant prêt à utiliser pour les différentes pages
export function TravelsBreadcrumb() {
  return (
    <TravelBreadcrumb
      items={[
        { label: 'Voyages', href: '/travels', current: true }
      ]}
    />
  );
}

export function TravelDetailBreadcrumb({ travelTitle }: { travelTitle: string }) {
  return (
    <TravelBreadcrumb
      items={[
        { label: 'Voyages', href: '/travels' },
        { label: travelTitle, current: true }
      ]}
    />
  );
}

export function TravelReserveBreadcrumb({ travelTitle }: { travelTitle: string }) {
  return (
    <TravelBreadcrumb
      items={[
        { label: 'Voyages', href: '/travels' },
        { label: travelTitle, href: '/travels/[id]' },
        { label: 'Réservation', current: true }
      ]}
    />
  );
}

import { Icons } from "@/components/ui/icons";

const kAppName = "Trevia Admin";
const kAppAbbr = "TA";
const kAppTagline = "Système d'administration ultra-simplifié";
const kAppDescription = `Trevia Admin est une plateforme d'administration moderne qui permet de gérer facilement vos contenus, utilisateurs et paramètres avec des interfaces CRUD générées automatiquement.`;

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Conducteurs',
    url: '/admin/drivers',
    icon: 'user',
    shortcut: ['c', 'd'],
    isActive: false,
    items: []
  },
  {
    title: 'Routes',
    url: '/admin/routes',
    icon: 'route',
    shortcut: ['r', 't'],
    isActive: false,
    items: []
  },
  {
    title: 'Véhicules',
    url: '/admin/vehicle',
    icon: 'car',
    shortcut: ['v', 'h'],
    isActive: false,
    items: []
  },
  {
    title: 'Voyages',
    url: '/admin/trip',
    icon: 'plane',
    shortcut: ['v', 'v'],
    isActive: false,
    items: []
  },
  
  {
    title: 'Réservations',
    url: '/admin/bookings',
    icon: 'page',
    shortcut: ['r', 'r'],
    isActive: false,
    items: []
  }
];

export { kAppName, kAppAbbr, kAppTagline, kAppDescription };

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
    title: 'Catégories',
    url: '/admin/categories',
    icon: 'page',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Réservations',
    url: '/admin/booking',
    icon: 'page',
    shortcut: ['r', 'r'],
    isActive: false,
    items: []
  },
  {
    title: 'Voyages',
    url: '/admin/trip',
    icon: 'post',
    shortcut: ['v', 'v'],
    isActive: false,
    items: []
  }
];

export { kAppName, kAppAbbr, kAppTagline, kAppDescription };

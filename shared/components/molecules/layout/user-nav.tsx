'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/atoms/ui/avatar';
import { Button } from '@/shared/components/atoms/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/shared/components/atoms/ui/dropdown-menu';
import { User2Icon, LogOut, Settings, ShieldCheck, TimerIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/shared/providers/auth-provider';

export function UserNav() {
  const { session, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success('Déconnexion réussie');
      router.push('/login');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
      console.error('Logout error:', error);
    }
  };

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={session.user?.image ?? 'https://i.pravatar.cc/150?img=50'}
              alt={session.user?.name ?? ''}
              className='h-8 w-8 rounded-full border border-red-500 object-cover'
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {session.user?.name ?? 'Utilisateur'}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account" className="flex items-center">
              <User2Icon className="mr-2 h-4 w-4" />
              Mon profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/bookings" className="flex items-center">
              <TimerIcon className="mr-2 h-4 w-4" />
              Mes réservations
            </Link>
          </DropdownMenuItem>
          {session.user?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/d" className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Administration
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/account/update-password" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Se déconnecter
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

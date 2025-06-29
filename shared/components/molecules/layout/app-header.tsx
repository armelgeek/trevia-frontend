"use client";

import React, { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/shared/components/atoms/ui/sidebar';
import SearchInput from '@/shared/components/atoms/ui/search-input';
import ThemeToggle from '@/shared/components/atoms/ui/theme-toggle';
import { UserNav } from './user-nav';
import { Separator } from '@/shared/components/atoms/ui/separator';
import { authClient } from '@/shared/lib/config/auth-client';

type SessionType = {
  user?: {
    name?: string;
    email?: string;
    image?: string | null;
    role?: string;
  };
} | null;

export default function Header() {
  const [session, setSession] = useState<SessionType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        setSession(sessionData.data);
      } catch (error) {
        console.error('Failed to get session:', error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  if (loading) {
    return (
      <header className='flex py-2 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
        </div>
        <div className='flex items-center gap-2 px-4'>
          <div className='hidden md:flex'>
            <SearchInput />
          </div>
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          <ThemeToggle />
        </div>
      </header>
    );
  }

  return (
    <header className='flex py-2 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
       
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
        <ThemeToggle />
      </div>
    </header>
  );
}

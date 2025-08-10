import React from 'react';
import '@/shared/styles/globals.css';
import { Footer } from '@/shared/components/atoms/ui/footer';
import AppClientMenu from '@/shared/components/molecules/layout/app-client-menu';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <AppClientMenu />
      <main className="lg:px-60ss xl:px-60 min-h-screen">
        {children}
      </main>
      <Footer variant="detailed" />
    </div>
  );
}

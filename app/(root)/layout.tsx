import React from 'react';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { Footer } from '@/components/ui/footer';
import AppClientMenu from '@/shared/components/molecules/layout/app-client-menu';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <AppClientMenu />
      <main className="max-w-screen-2xl lg:px-48 xl:px-48 min-h-screen">
        {children}
      </main>
      <Footer variant="detailed" />
    </div>
  );
}

import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { fontMap } from '@/shared/lib/utils/font';
import { Provider } from '@/shared/providers';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { UserAvatar } from '@/shared/components/molecules/user-avatar';
import { AppLogo } from '@/shared/components/molecules/layout/app-logo';
import { Link, routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes'
import { LocaleSwitcher } from '@/shared/components/molecules/locale-switcher';
import { ThemeSwitcher } from '@/shared/components/molecules/theme-switcher';
interface RootLayoutProps {
  readonly children: React.ReactNode;
  params: {locale : string}
}

export default async function RootLayout({ children , params }: RootLayoutProps) {
  const inter = fontMap['inter'].next;
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} r font-sans antialiased`}>
        <Provider>
          <main>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider>
                <div>
                  {children}
                </div>
              </ThemeProvider>
            </NextIntlClientProvider>
          </main>
        </Provider>
        <Toaster richColors />
      </body>
    </html>
  );
}

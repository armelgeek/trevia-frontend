"use client";

import { Navigation, NavLink } from "@/shared/components/atoms/ui/navigation";
import { Button } from "@/shared/components/atoms/ui/button";
import { UserNav } from "./user-nav";
import { useAuth } from "@/shared/providers/auth-provider";
import Link from "next/link";
import { useActivePath } from "./use-active-path";
import { authClient } from "@/shared/lib/config/auth-client";

const AppClientMenu = () => {
  const { isLoading } = useAuth();
  const { data } = authClient.useSession();
  const session = data?.session;
  console.log('session', session);
  const pathname = useActivePath();

  const ctaButton = () => {
    if (isLoading) {
      return <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />;
    }

    if (session) {
      return <UserNav />;
    }

    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/register">Créer un compte</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
      </div>
    );
  };

  return (
    <Navigation
      className="w-full bg-white/80 backdrop-blur border-b border-gray-100 sticky top-0 z-30 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] h-16"
      ctaButton={ctaButton()}
    >
      <NavLink
        href="/"
        className="font-semibold  py-2 transition-colors duration-150 hover:text-primary"
        active={pathname === "/"}
      >
        Accueil
      </NavLink>
      <NavLink
        href="/destinations"
        className="font-semibold  py-2 transition-colors duration-150 hover:text-primary"
        active={pathname.startsWith("/destinations")}
      >
        Destinations
      </NavLink>
      <NavLink
        href="/services"
        className="font-semibold  py-2 transition-colors duration-150 hover:text-primary"
        active={pathname.startsWith("/services")}
      >
        Services
      </NavLink>
      <NavLink
        href="/contact"
        className="font-semibold  py-2 transition-colors duration-150 hover:text-primary"
        active={pathname.startsWith("/contact")}
      >
        Contact
      </NavLink>
    </Navigation>
  );
};

export default AppClientMenu;

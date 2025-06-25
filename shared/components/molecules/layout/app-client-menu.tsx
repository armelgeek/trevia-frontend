"use client";

import { Navigation, NavLink } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { useAuth } from "@/shared/providers/auth-provider";
import Link from "next/link";

const AppClientMenu = () => {
  const { session, isLoading } = useAuth();

  const ctaButton = () => {
    if (isLoading) {
      return <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />;
    }

    if (session?.user) {
      return <UserNav />;
    }

    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
        <Button variant="default" asChild>
          <Link href="/contact">Réserver maintenant</Link>
        </Button>
      </div>
    );
  };

  return (
    <Navigation 
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      ctaButton={ctaButton()}
    >
      <NavLink href="/" active>Accueil</NavLink>
      <NavLink href="#destinations">Destinations</NavLink>
      <NavLink href="#horaires">Horaires</NavLink>
    </Navigation>
  );
};

export default AppClientMenu;

"use client";

import { authClient } from "@/shared/lib/config/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { EditableProfilePhotoForm } from "@/shared/components/atoms/editable-profile-photo-form";
import { ClientProfileForm } from '@/features/auth/components/organisms/client-profile-form';
import { Skeleton } from "@/shared/components/atoms/ui/skeleton";
import { useEffect, useState } from "react";

interface User {
  name?: string;
  email?: string;
  image?: string | null;
  isAnonymous?: boolean | null;
}

export default function AccountPageClient() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const { data: session } = await authClient.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      console.error("Erreur lors de la récupération de la session:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      await fetchSession();
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Skeleton pour la photo de profil */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Photo de profil</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Skeleton className="h-32 w-32 rounded-full" />
          </CardContent>
        </Card>

        {/* Skeleton pour les informations du profil */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Non authentifié</h2>
              <p className="text-muted-foreground">
                Vous devez être connecté pour accéder à cette page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EditableProfilePhotoForm
        photoUrl={user.image ?? undefined}
        disabled={false}
      />
      <ClientProfileForm user={user} onUserUpdate={handleUserUpdate} />
    </div>
  );
}

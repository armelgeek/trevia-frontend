"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { LabeledSection } from "@/app/(ui)/ui/components/ui-section";
import { Skeleton } from "@/shared/components/atoms/ui/skeleton";
import { ProfileHeader, PersonalInfoForm, PreferencesCard } from "@/app/(ui)/ui/components/ui-user-profile";

export default function UserProfileHome() {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Mapping du user provider vers le format UserProfile attendu
  const mappedUser = user
    ? {
        id: user.id || "",
        firstName: user.firstName || user.name?.split(" ")[0] || "",
        lastName: user.lastName || user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        address: user.address || {
          street: "",
          city: "",
          zipCode: "",
          country: ""
        },
        memberSince: user.memberSince || "2022-01-01",
        status: user.status || "bronze",
        totalTrips: user.totalTrips || 0,
        totalSpent: user.totalSpent || 0,
        preferences: user.preferences || {
          emailNotifications: true,
          smsNotifications: false,
          promotionalEmails: true,
          twoFactorAuth: false
        }
      }
    : null;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <LabeledSection label="Profil Utilisateur Complet">
          <div className="space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-96 w-full rounded-xl" />
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          </div>
        </LabeledSection>
      </div>
    );
  }

  if (!isAuthenticated || !mappedUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Non authentifié</h2>
          <p className="text-muted-foreground">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <LabeledSection label="Profil Utilisateur Complet">
        <div className="space-y-6">
          <ProfileHeader user={mappedUser} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PersonalInfoForm user={mappedUser} />
            <PreferencesCard user={mappedUser} />
          </div>
        </div>
      </LabeledSection>
    </div>
  );
}
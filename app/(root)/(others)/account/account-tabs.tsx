"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/atoms/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { EditableProfilePhotoForm } from "@/shared/components/atoms/editable-profile-photo-form";
import { ClientProfileForm } from '@/features/auth/components/organisms/client-profile-form';
import { UserBookingsList } from "./user-bookings-list";

interface User {
  name?: string;
  email?: string;
  image?: string | null;
  isAnonymous?: boolean | null;
}

export default function AccountTabs({ user, onUserUpdate }: { user: User, onUserUpdate: (u: User) => void }) {
  const [tab, setTab] = useState("profile");
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="bookings">Mes réservations</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <EditableProfilePhotoForm photoUrl={user.image ?? undefined} disabled={false} />
        <ClientProfileForm user={user} onUserUpdate={onUserUpdate} />
      </TabsContent>
      <TabsContent value="bookings">
        <UserBookingsList user={user} />
      </TabsContent>
    </Tabs>
  );
}

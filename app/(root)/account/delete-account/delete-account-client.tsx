"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteAccount } from "@/features/auth/components/organisms/delete-account-form";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { authClient } from '@/shared/lib/config/auth-client';
import { Skeleton } from "@/components/ui/skeleton";

type SessionType = {
  user?: {
    name?: string;
    email?: string;
    image?: string | null;
    isAnonymous?: boolean | null;
  };
} | null;

export default function DeleteAccountClient() {
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
            <div className="container max-w-4xl mx-auto py-8 space-y-6">
                <div className="text-center space-y-2">
                    <Skeleton className="h-8 w-64 mx-auto" />
                    <Skeleton className="h-4 w-96 mx-auto" />
                </div>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }
    
    return (
        <div className="container max-w-4xl mx-auto">
           
            {session?.user && !session.user.isAnonymous && (
                <>
                    <Separator />
                    {/* Zone de danger */}
                    <Card className="border-destructive/20 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                        <CardHeader className="border-b border-destructive/20">
                            <CardTitle className="text-xl text-destructive flex items-center">
                                <AlertTriangle className="mr-3 h-6 w-6" />
                                Zone de danger
                            </CardTitle>
                            <CardDescription className="text-destructive/80">
                                Actions irréversibles qui affectent définitivement votre compte
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Alert className="border-destructive/30 bg-destructive/5 mb-4">
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                                <AlertDescription className="text-destructive">
                                    <strong>Attention :</strong> La suppression de votre compte entraînera :
                                    <ul className="mt-2 ml-4 list-disc space-y-1 text-sm">
                                        <li>Suppression définitive de toutes vos données</li>
                                        <li>Perte de l&apos;accès à votre historique</li>
                                        <li>Annulation de tous vos abonnements</li>
                                        <li>Impossibilité de récupérer vos informations</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-destructive/10 border border-destructive/30">
                                <div className="space-y-2 mb-4 sm:mb-0">
                                    <h3 className="text-lg font-semibold text-destructive">
                                        Supprimer définitivement le compte
                                    </h3>
                                    <p className="text-sm text-destructive/80 max-w-md">
                                        Cette action supprimera immédiatement et définitivement votre compte 
                                        ainsi que toutes les données associées. Cette action ne peut pas être annulée.
                                    </p>
                                </div>
                                <DeleteAccount />
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}

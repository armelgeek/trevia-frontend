"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Download, Upload, Search } from "lucide-react";
import { useState } from "react";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "default" | "lg";
  onClick?: () => void;
}

function LoadingButton({ isLoading, children, variant = "default", size = "default", onClick }: LoadingButtonProps) {
  return (
    <Button 
      variant={variant} 
      size={size} 
      disabled={isLoading}
      onClick={onClick}
      className="relative"
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </Button>
  );
}

function SkeletonCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="border-b p-4 bg-gray-50">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-b p-4">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressExample() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
      <Button onClick={startProgress} disabled={isLoading}>
        {isLoading ? "En cours..." : "Démarrer"}
      </Button>
    </div>
  );
}

function SpinnerVariants() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {/* Simple spinner */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
        <p className="text-sm text-gray-600">Simple</p>
      </div>

      {/* Large spinner */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <p className="text-sm text-gray-600">Large</p>
      </div>

      {/* Spinner with text */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm">Chargement...</span>
        </div>
        <p className="text-sm text-gray-600">Avec texte</p>
      </div>

      {/* Colored spinner */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-green-600" />
        </div>
        <p className="text-sm text-gray-600">Coloré</p>
      </div>
    </div>
  );
}

function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-gray-600">Traitement en cours...</p>
      </div>
    </div>
  );
}

export function LoadingStatesSample() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    download: false,
    upload: false,
    search: false,
    submit: false
  });

  const toggleLoading = (key: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <LabeledSection label="Boutons de Chargement">
        <div className="flex flex-wrap gap-4">
          <LoadingButton 
            isLoading={loadingStates.download}
            onClick={() => toggleLoading("download")}
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </LoadingButton>

          <LoadingButton 
            isLoading={loadingStates.upload}
            variant="outline"
            onClick={() => toggleLoading("upload")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Uploader
          </LoadingButton>

          <LoadingButton 
            isLoading={loadingStates.search}
            size="sm"
            onClick={() => toggleLoading("search")}
          >
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </LoadingButton>

          <LoadingButton 
            isLoading={loadingStates.submit}
            variant="destructive"
            size="lg"
            onClick={() => toggleLoading("submit")}
          >
            Confirmer
          </LoadingButton>
        </div>
      </LabeledSection>

      <LabeledSection label="Spinners">
        <SpinnerVariants />
      </LabeledSection>

      <LabeledSection label="Barre de Progression">
        <div className="max-w-md">
          <ProgressExample />
        </div>
      </LabeledSection>

      <LabeledSection label="Skeleton Card">
        <div className="max-w-md">
          <SkeletonCard />
        </div>
      </LabeledSection>

      <LabeledSection label="Skeleton Table">
        <SkeletonTable />
      </LabeledSection>

      <LabeledSection label="Overlay de Chargement">
        <div className="space-y-4">
          <Button onClick={() => setShowOverlay(true)}>
            Afficher l&apos;overlay
          </Button>
          <LoadingOverlay isVisible={showOverlay} />
          {showOverlay && (
            <Button 
              variant="outline" 
              onClick={() => setShowOverlay(false)}
            >
              Masquer l&apos;overlay
            </Button>
          )}
        </div>
      </LabeledSection>

      <LabeledSection label="États de Chargement de Liste">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Réservations</h3>
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Skeleton className="h-10 w-10 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </div>
      </LabeledSection>
    </div>
  );
}

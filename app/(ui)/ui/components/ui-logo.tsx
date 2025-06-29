"use client";

import { LabeledSection } from "./ui-section";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Logo } from '@/shared/components/atoms/ui/logo';

export { Logo as default } from '@/shared/components/atoms/ui/logo';

export function LogoSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Logo Trevia - Toutes les Variantes">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo par défaut */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Logo par Défaut</h3>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <Logo />
              </div>
              <p className="text-sm text-gray-600">Logo complet avec icône, nom et tagline</p>
            </CardContent>
          </Card>

          {/* Logo compact */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Logo Compact</h3>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <Logo variant="compact" />
              </div>
              <p className="text-sm text-gray-600">Version horizontale compacte</p>
            </CardContent>
          </Card>

          {/* Icône seule */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Icône Seule</h3>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <Logo variant="icon-only" />
              </div>
              <p className="text-sm text-gray-600">Idéal pour les favicons et boutons</p>
            </CardContent>
          </Card>

          {/* Texte seul */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Texte Seul</h3>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <Logo variant="text-only" />
              </div>
              <p className="text-sm text-gray-600">Version texte pure</p>
            </CardContent>
          </Card>
        </div>
      </LabeledSection>

      <LabeledSection label="Tailles Disponibles">
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-center gap-8 p-8 bg-gray-50 rounded-lg">
            <div className="text-center space-y-2">
              <Logo size="xs" variant="compact" />
              <span className="text-xs text-gray-500">XS</span>
            </div>
            <div className="text-center space-y-2">
              <Logo size="sm" variant="compact" />
              <span className="text-xs text-gray-500">SM</span>
            </div>
            <div className="text-center space-y-2">
              <Logo size="md" variant="compact" />
              <span className="text-xs text-gray-500">MD</span>
            </div>
            <div className="text-center space-y-2">
              <Logo size="lg" variant="compact" />
              <span className="text-xs text-gray-500">LG</span>
            </div>
            <div className="text-center space-y-2">
              <Logo size="xl" variant="compact" />
              <span className="text-xs text-gray-500">XL</span>
            </div>
          </div>
        </div>
      </LabeledSection>

      <LabeledSection label="Thèmes Colorés">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thème couleur */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Thème Couleur</h3>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <Logo theme="color" />
              </div>
              <p className="text-sm text-gray-600">Couleurs de la marque</p>
            </CardContent>
          </Card>

          {/* Thème sombre */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Thème Sombre</h3>
              <div className="flex justify-center p-8 bg-white rounded-lg border">
                <Logo theme="dark" />
              </div>
              <p className="text-sm text-gray-600">Pour fonds clairs</p>
            </CardContent>
          </Card>

          {/* Thème clair */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Thème Clair</h3>
              <div className="flex justify-center p-8 bg-gray-900 rounded-lg">
                <Logo theme="light" />
              </div>
              <p className="text-sm text-gray-600">Pour fonds sombres</p>
            </CardContent>
          </Card>
        </div>
      </LabeledSection>

      <LabeledSection label="Utilisations en Context">
        <div className="space-y-6">
          {/* Header simulation */}
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-6 bg-white border-b">
                <Logo variant="compact" size="md" />
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Navigation</span>
                  <span className="text-sm text-gray-600">Contact</span>
                  <span className="text-sm text-gray-600">À propos</span>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-gray-600">
                Simulation d&apos;un header de site web
              </div>
            </CardContent>
          </Card>

          {/* Footer simulation */}
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-900 text-white p-8">
                <div className="flex flex-col md:flex-row items-start justify-between space-y-6 md:space-y-0">
                  <Logo theme="light" size="lg" />
                  <div className="text-sm text-gray-300">
                    <p>Votre partenaire de confiance</p>
                    <p>pour tous vos déplacements</p>
                  </div>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-gray-600">
                Simulation d&apos;un footer
              </div>
            </CardContent>
          </Card>

          {/* Mobile app simulation */}
          <Card>
            <CardContent className="p-0">
              <div className="bg-primary text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <Logo variant="icon-only" size="sm" theme="light" />
                  <span className="text-sm font-medium">Trevia App</span>
                  <div className="w-6"></div>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-gray-600">
                Simulation d&apos;une app mobile
              </div>
            </CardContent>
          </Card>
        </div>
      </LabeledSection>

      <LabeledSection label="Guide d'Utilisation">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-blue-900">Recommandations d&apos;Usage</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li><strong>• Logo par défaut :</strong> À utiliser sur les pages principales et documents officiels</li>
            <li><strong>• Logo compact :</strong> Parfait pour les headers, emails et espaces restreints</li>
            <li><strong>• Icône seule :</strong> Pour les favicons, boutons d&apos;action et réseaux sociaux</li>
            <li><strong>• Texte seul :</strong> Quand l&apos;espace est très limité ou pour la typographie</li>
          </ul>
          
          <div className="border-t border-blue-200 pt-4">
            <h4 className="font-medium text-blue-900 mb-2">Couleurs de la Marque</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm text-blue-800">Primary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary-dark rounded"></div>
                <span className="text-sm text-blue-800">Primary Dark</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-accent rounded"></div>
                <span className="text-sm text-blue-800">Accent</span>
              </div>
            </div>
          </div>
        </div>
      </LabeledSection>
    </div>
  );
}

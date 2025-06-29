'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Switch } from '@/shared/components/atoms/ui/switch';
import { Input } from '@/shared/components/atoms/ui/input';
import { Label } from '@/shared/components/atoms/ui/label';
import { Textarea } from '@/shared/components/atoms/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/atoms/ui/select';
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Palette,
  Save
} from 'lucide-react';
import { Separator } from '@/shared/components/atoms/ui/separator';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground mt-2">
            Gérez la configuration de votre application
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres Généraux
            </CardTitle>
            <CardDescription>
              Configuration de base de l&apos;application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="app-name">Nom de l&apos;application</Label>
              <Input id="app-name" defaultValue="Boilerplate" />
            </div>
            <div>
              <Label htmlFor="app-description">Description</Label>
              <Textarea 
                id="app-description" 
                defaultValue="Empowering developers one snippet at a time"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="app-url">URL de base</Label>
              <Input id="app-url" defaultValue="https://app.example.com" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance">Mode Maintenance</Label>
                <p className="text-sm text-muted-foreground">
                  Activer le mode maintenance
                </p>
              </div>
              <Switch id="maintenance" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Paramètres de sécurité et d&apos;authentification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Authentification à deux facteurs</Label>
                <p className="text-sm text-muted-foreground">
                  Exiger 2FA pour tous les admins
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Connexions multiples</Label>
                <p className="text-sm text-muted-foreground">
                  Autoriser plusieurs sessions simultanées
                </p>
              </div>
              <Switch />
            </div>
            <div>
              <Label htmlFor="session-timeout">Timeout de session (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="60" />
            </div>
            <div>
              <Label htmlFor="password-policy">Politique de mot de passe</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Forte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Gérez les notifications système
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Envoyer des notifications par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications push</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications push dans le navigateur
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Rapports hebdomadaires</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir un rapport d&apos;activité chaque semaine
                </p>
              </div>
              <Switch />
            </div>
            <div>
              <Label htmlFor="admin-email">Email administrateur</Label>
              <Input id="admin-email" type="email" defaultValue="admin@example.com" />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apparence
            </CardTitle>
            <CardDescription>
              Personnalisez l&apos;apparence de l&apos;interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Thème</Label>
              <Select defaultValue="light">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sidebar-default">État sidebar par défaut</Label>
              <Select defaultValue="open">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Ouverte</SelectItem>
                  <SelectItem value="closed">Fermée</SelectItem>
                  <SelectItem value="auto">Automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Animation réduite</Label>
                <p className="text-sm text-muted-foreground">
                  Réduire les animations pour de meilleures performances
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database & API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Base de données & API
          </CardTitle>
          <CardDescription>
            Configuration technique et monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <Label className="font-medium">Base de données</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Connectée • Dernière sauvegarde: 2h ago
              </p>
              <div className="space-y-1">
                <p className="text-xs">CPU: 23%</p>
                <p className="text-xs">Mémoire: 1.2GB/4GB</p>
                <p className="text-xs">Stockage: 45GB/100GB</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <Label className="font-medium">API</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                En ligne • Latence moyenne: 120ms
              </p>
              <div className="space-y-1">
                <p className="text-xs">Requêtes/min: 1,234</p>
                <p className="text-xs">Erreurs: 0.02%</p>
                <p className="text-xs">Uptime: 99.9%</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <Label className="font-medium">Maintenance</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Planifiée dimanche 02:00
              </p>
              <Badge variant="outline" className="text-xs">
                Maintenance programmée
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Raccourcis clavier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⌨️ Raccourcis Clavier
          </CardTitle>
          <CardDescription>
            Raccourcis disponibles pour naviguer plus rapidement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dashboard</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">D</Badge>
                  <Badge variant="outline" className="text-xs">D</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Catégories</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">C</Badge>
                  <Badge variant="outline" className="text-xs">C</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Utilisateurs</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">U</Badge>
                  <Badge variant="outline" className="text-xs">U</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Paramètres</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">S</Badge>
                  <Badge variant="outline" className="text-xs">S</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Recherche globale</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Ctrl</Badge>
                  <Badge variant="outline" className="text-xs">K</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Toggle sidebar</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">Ctrl</Badge>
                  <Badge variant="outline" className="text-xs">B</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

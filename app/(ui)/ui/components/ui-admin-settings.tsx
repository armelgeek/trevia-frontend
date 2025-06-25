import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, Bell, Shield, Globe, Mail, Phone, MapPin } from "lucide-react";

export function AdminSettingsSample() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* En-tête */}
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Paramètres d&apos;administration</h2>
        <Badge variant="secondary">Trevia Transport</Badge>
      </div>

      {/* Informations générales */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Informations générales</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
            <Input id="company-name" defaultValue="Trevia Transport" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-website">Site web</Label>
            <Input id="company-website" defaultValue="https://trevia-transport.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email de contact</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="contact-email" defaultValue="admin@trevia-transport.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="contact-phone" defaultValue="+33 1 23 45 67 89" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Adresse</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="address" defaultValue="123 Avenue des Transports, 75001 Paris" className="pl-10" />
            </div>
          </div>
        </div>
      </Card>

      {/* Paramètres système */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Paramètres système</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Fuseau horaire</Label>
            <Select defaultValue="europe-paris">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                <SelectItem value="america-newyork">America/New_York (UTC-5)</SelectItem>
                <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Langue par défaut</Label>
            <Select defaultValue="fr">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Format de date</Label>
            <Select defaultValue="dd-mm-yyyy">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Devise</Label>
            <Select defaultValue="eur">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eur">Euro (€)</SelectItem>
                <SelectItem value="usd">Dollar US ($)</SelectItem>
                <SelectItem value="gbp">Livre Sterling (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications par email</p>
              <p className="text-sm text-gray-600">Recevoir les alertes importantes par email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications en temps réel</p>
              <p className="text-sm text-gray-600">Notifications push pour les événements critiques</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rapports hebdomadaires</p>
              <p className="text-sm text-gray-600">Résumé d&apos;activité envoyé chaque lundi</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </Button>
        <Button variant="outline" className="flex-1">
          Annuler
        </Button>
        <Button variant="secondary" className="flex-1">
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}

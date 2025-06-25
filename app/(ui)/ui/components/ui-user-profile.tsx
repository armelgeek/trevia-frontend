"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  Shield,
  Edit,
  Save,
  Camera,
  Bell,
  Lock,
  Settings
} from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  memberSince: string;
  status: "bronze" | "silver" | "gold" | "platinum";
  totalTrips: number;
  totalSpent: number;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    promotionalEmails: boolean;
    twoFactorAuth: boolean;
  };
}

const sampleUser: UserProfile = {
  id: "USER-2024-001",
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@email.com",
  phone: "06 12 34 56 78",
  birthDate: "1985-03-15",
  address: {
    street: "123 Rue de la Paix",
    city: "Paris",
    zipCode: "75001",
    country: "France"
  },
  memberSince: "2022-01-15",
  status: "gold",
  totalTrips: 42,
  totalSpent: 1580,
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    twoFactorAuth: true
  }
};

function getStatusColor(status: UserProfile["status"]) {
  switch (status) {
    case "bronze":
      return "bg-orange-100 text-orange-800";
    case "silver":
      return "bg-gray-100 text-gray-800";
    case "gold":
      return "bg-yellow-100 text-yellow-800";
    case "platinum":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status: UserProfile["status"]) {
  switch (status) {
    case "bronze":
      return "Bronze";
    case "silver":
      return "Argent";
    case "gold":
      return "Or";
    case "platinum":
      return "Platine";
    default:
      return "Standard";
  }
}

function ProfileHeader({ user }: { user: UserProfile }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/api/placeholder/96/96" alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="text-2xl">{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              variant="outline"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600 mt-1">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Membre depuis {new Date(user.memberSince).getFullYear()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.address.city}, {user.address.country}</span>
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 text-right">
                <Badge className={`${getStatusColor(user.status)} mb-2`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {getStatusText(user.status)}
                </Badge>
                <div className="text-sm text-gray-600">
                  <p>{user.totalTrips} voyages • {user.totalSpent}€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PersonalInfoForm({ user }: { user: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    // Here you would typically save to an API
    setIsEditing(false);
    console.log("Saving user data:", formData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Informations personnelles</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-1">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span>Téléphone</span>
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>Adresse</span>
          </h4>
          
          <div className="space-y-2">
            <Label htmlFor="street">Adresse</Label>
            <Input
              id="street"
              value={formData.address.street}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                address: { ...prev.address, street: e.target.value }
              }))}
              disabled={!isEditing}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Code postal</Label>
              <Input
                id="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, zipCode: e.target.value }
                }))}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={formData.address.city}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, city: e.target.value }
                }))}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={formData.address.country}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, country: e.target.value }
                }))}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PreferencesCard({ user }: { user: UserProfile }) {
  const [preferences, setPreferences] = useState(user.preferences);

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // Here you would typically save to an API
    console.log("Updating preferences:", { [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Préférences</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium flex items-center space-x-1">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notifications par email</Label>
                <p className="text-sm text-gray-500">Recevoir les confirmations et mises à jour</p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">Notifications SMS</Label>
                <p className="text-sm text-gray-500">Recevoir les alertes importantes</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotional-emails">Emails promotionnels</Label>
                <p className="text-sm text-gray-500">Recevoir les offres et promotions</p>
              </div>
              <Switch
                id="promotional-emails"
                checked={preferences.promotionalEmails}
                onCheckedChange={(checked) => handlePreferenceChange("promotionalEmails", checked)}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium flex items-center space-x-1">
            <Lock className="w-4 h-4" />
            <span>Sécurité</span>
          </h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
              <p className="text-sm text-gray-500">Sécuriser votre compte avec un code supplémentaire</p>
            </div>
            <Switch
              id="two-factor"
              checked={preferences.twoFactorAuth}
              onCheckedChange={(checked) => handlePreferenceChange("twoFactorAuth", checked)}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium flex items-center space-x-1">
            <CreditCard className="w-4 h-4" />
            <span>Paiement</span>
          </h4>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="w-4 h-4 mr-2" />
              Gérer les méthodes de paiement
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Changer le mot de passe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserProfileSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Profil Utilisateur Complet">
        <div className="space-y-6">
          <ProfileHeader user={sampleUser} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PersonalInfoForm user={sampleUser} />
            <PreferencesCard user={sampleUser} />
          </div>
        </div>
      </LabeledSection>
      
      <LabeledSection label="En-tête de Profil">
        <ProfileHeader user={sampleUser} />
      </LabeledSection>
    </div>
  );
}

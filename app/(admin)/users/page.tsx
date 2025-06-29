'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/ui/card';
import { Button } from '@/shared/components/atoms/ui/button';
import { Badge } from '@/shared/components/atoms/ui/badge';
import { Users, Plus, Search, MoreHorizontal } from 'lucide-react';
import { Input } from '@/shared/components/atoms/ui/input';

const mockUsers = [
  {
    id: '1',
    name: 'Jean Martin',
    email: 'jean.martin@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2025-06-24',
    avatar: 'JM'
  },
  {
    id: '2',
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    role: 'Utilisateur',
    status: 'active',
    lastLogin: '2025-06-23',
    avatar: 'MD'
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre.durand@example.com',
    role: 'Utilisateur',
    status: 'inactive',
    lastLogin: '2025-06-20',
    avatar: 'PD'
  },
  {
    id: '4',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    role: 'Moderateur',
    status: 'active',
    lastLogin: '2025-06-24',
    avatar: 'SL'
  }
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+5% ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,183</div>
            <p className="text-xs text-muted-foreground">95% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
            <div className="h-2 w-2 bg-blue-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground">+12% vs mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <div className="h-2 w-2 bg-purple-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Rôles admin actifs</p>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des Utilisateurs</CardTitle>
              <CardDescription>
                Gérez et surveillez tous les comptes utilisateurs
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{user.name}</h3>
                      <Badge variant={user.role === 'Admin' ? 'default' : user.role === 'Moderateur' ? 'secondary' : 'outline'}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm capitalize">{user.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Dernière connexion: {user.lastLogin}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Affichage de 4 sur 1,247 utilisateurs
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

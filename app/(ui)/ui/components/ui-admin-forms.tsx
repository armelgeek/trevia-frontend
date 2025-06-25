import { LabeledSection } from "./ui-section";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  X, 
  Upload, 
  Plus, 
  Settings,
  User,
  Shield,
  Mail
} from 'lucide-react';

export function AdminFormsSample() {
    return (
        <div className="space-y-8">
            <LabeledSection label="User Management Form">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Gestion Utilisateur
                        </CardTitle>
                        <CardDescription>
                            Créer ou modifier un utilisateur du système
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom</Label>
                                <Input id="firstName" placeholder="Jean" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom</Label>
                                <Input id="lastName" placeholder="Dupont" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="jean.dupont@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="role">Rôle</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un rôle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                    <SelectItem value="moderator">Modérateur</SelectItem>
                                    <SelectItem value="user">Utilisateur</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Switch id="isActive" />
                            <Label htmlFor="isActive">Compte actif</Label>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex gap-2">
                            <Button className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Enregistrer
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <X className="h-4 w-4" />
                                Annuler
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </LabeledSection>

            <LabeledSection label="Content Management Form">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Gestion de Contenu
                        </CardTitle>
                        <CardDescription>
                            Créer ou modifier du contenu
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" placeholder="Titre du contenu" />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                placeholder="Description du contenu..." 
                                rows={4}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Catégories</Label>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Transport</Badge>
                                <Badge variant="secondary">Voyage</Badge>
                                <Badge variant="outline">+ Ajouter</Badge>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Options</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="published" />
                                    <Label htmlFor="published">Publié</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="featured" />
                                    <Label htmlFor="featured">Mis en avant</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="comments" />
                                    <Label htmlFor="comments">Autoriser les commentaires</Label>
                                </div>
                            </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex gap-2">
                            <Button className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Publier
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Sauvegarder en brouillon
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </LabeledSection>

            <LabeledSection label="Quick Actions Panel">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="flex items-center p-6">
                            <Plus className="h-8 w-8 text-primary mr-4" />
                            <div>
                                <h3 className="font-semibold">Nouvel utilisateur</h3>
                                <p className="text-sm text-muted-foreground">Créer un compte</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="flex items-center p-6">
                            <Mail className="h-8 w-8 text-blue-500 mr-4" />
                            <div>
                                <h3 className="font-semibold">Envoyer email</h3>
                                <p className="text-sm text-muted-foreground">Newsletter ou notification</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="flex items-center p-6">
                            <Shield className="h-8 w-8 text-green-500 mr-4" />
                            <div>
                                <h3 className="font-semibold">Sécurité</h3>
                                <p className="text-sm text-muted-foreground">Gérer les permissions</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </LabeledSection>
        </div>
    );
}

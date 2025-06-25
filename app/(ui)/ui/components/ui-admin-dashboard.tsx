import { LabeledSection } from "./ui-section";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Calendar, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Activity,
  BarChart3
} from 'lucide-react';

export function AdminDashboardSample() {
    return (
        <div className="space-y-8">
            <LabeledSection label="Dashboard Overview">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Stats */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">€45,231.89</div>
                                    <p className="text-xs text-muted-foreground">
                                        +20.1% par rapport au mois dernier
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2,350</div>
                                    <p className="text-xs text-muted-foreground">
                                        +180 nouveaux cette semaine
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Chart Placeholder */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Analyse des Performances
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] bg-gradient-to-r from-primary/10 to-accent/10 rounded flex items-center justify-center">
                                    <div className="text-center">
                                        <Activity className="h-12 w-12 text-primary mx-auto mb-2" />
                                        <p className="text-muted-foreground">Graphique des performances</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Activité Récente
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm">Nouvel utilisateur inscrit</p>
                                            <p className="text-xs text-muted-foreground">Il y a 2 min</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm">Commande #1234 traitée</p>
                                            <p className="text-xs text-muted-foreground">Il y a 15 min</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm">Mise à jour système</p>
                                            <p className="text-xs text-muted-foreground">Il y a 1h</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Voir tout
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                        
                        {/* System Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>État du Système</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Serveur</span>
                                        <Badge className="bg-green-100 text-green-800">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            En ligne
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Base de données</span>
                                        <Badge className="bg-green-100 text-green-800">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            Optimale
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Sauvegarde</span>
                                        <Badge className="bg-yellow-100 text-yellow-800">
                                            <Clock className="mr-1 h-3 w-3" />
                                            En cours
                                        </Badge>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Utilisation CPU</span>
                                        <span>45%</span>
                                    </div>
                                    <Progress value={45} className="h-2" />
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Mémoire</span>
                                        <span>67%</span>
                                    </div>
                                    <Progress value={67} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </LabeledSection>

            <LabeledSection label="Admin Quick Actions">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                            <h3 className="font-semibold">Utilisateurs</h3>
                            <p className="text-sm text-muted-foreground">2,350 actifs</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <h3 className="font-semibold">Événements</h3>
                            <p className="text-sm text-muted-foreground">12 à venir</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                            <h3 className="font-semibold">Alertes</h3>
                            <p className="text-sm text-muted-foreground">3 nouvelles</p>
                        </CardContent>
                    </Card>
                    
                    <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <h3 className="font-semibold">Rapports</h3>
                            <p className="text-sm text-muted-foreground">Générer</p>
                        </CardContent>
                    </Card>
                </div>
            </LabeledSection>
        </div>
    );
}

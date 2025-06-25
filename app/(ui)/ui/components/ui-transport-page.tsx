import { LabeledSection } from "./ui-section";
import { Navigation, NavLink } from '@/components/ui/navigation';
import { HeroSection } from '@/components/ui/hero-section';
import { Section } from '@/components/ui/section';
import { ServiceCard } from '@/components/ui/service-card';
import { StatCard, StatsContainer } from '@/components/ui/stat-card';
import { Grid } from '@/components/ui/grid';
import { Button } from '@/components/ui/button';

export function TransportPageSample() {
    return (
        <div className="space-y-8">
            <LabeledSection label="Complete Transport Page Example">
                <div className="border rounded-lg overflow-hidden">
                    {/* Navigation */}
                    <Navigation>
                        <NavLink href="#" active>Accueil</NavLink>
                        <NavLink href="#services">Services</NavLink>
                        <NavLink href="#destinations">Destinations</NavLink>
                        <NavLink href="#horaires">Horaires</NavLink>
                        <NavLink href="#reservation">Réservation</NavLink>
                    </Navigation>

                    {/* Hero Section */}
                    <HeroSection
                        title="VOYAGEZ EN TOUTE SÉRÉNITÉ"
                        subtitle="Des transports confortables et fiables pour tous vos déplacements. Réservez en ligne en quelques clics !"
                        primaryAction={{
                            text: "Réserver maintenant",
                            href: "#reservation"
                        }}
                        secondaryAction={{
                            text: "Nos services",
                            href: "#services"
                        }}
                        backgroundVariant="white"
                        image={
                            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                                <i className="fas fa-bus text-6xl text-primary"></i>
                            </div>
                        }
                    />

                    {/* Services Section */}
                    <Section
                        title="NOS SERVICES"
                        subtitle="Découvrez notre gamme complète de services de transport adaptés à tous vos besoins."
                        backgroundVariant="white"
                    >
                        <Grid cols={3} gap="lg">
                            <ServiceCard
                                icon="fas fa-bus"
                                title="Transport en commun"
                                description="Des liaisons régulières entre les principales villes avec un confort optimal."
                            />
                            <ServiceCard
                                icon="fas fa-shuttle-van"
                                title="Navettes aéroport"
                                description="Transferts directs vers les aéroports avec horaires adaptés aux vols."
                                iconColor="text-blue-600"
                            />
                            <ServiceCard
                                icon="fas fa-bus-alt"
                                title="Voyages longue distance"
                                description="Confort premium pour vos trajets interurbains avec wifi et prises USB."
                                iconColor="text-green-600"
                            />
                            <ServiceCard
                                icon="fas fa-school"
                                title="Transport scolaire"
                                description="Un service sécurisé pour le transport des enfants vers les établissements scolaires."
                                iconColor="text-yellow-600"
                            />
                            <ServiceCard
                                icon="fas fa-users"
                                title="Transport de groupes"
                                description="Solutions sur mesure pour les voyages en groupe, associations et entreprises."
                                iconColor="text-purple-600"
                            />
                            <ServiceCard
                                icon="fas fa-wheelchair"
                                title="Accessibilité PMR"
                                description="Véhicules adaptés pour personnes à mobilité réduite avec accompagnement."
                                iconColor="text-indigo-600"
                            />
                        </Grid>
                    </Section>

                    {/* Statistics Section */}
                    <StatsContainer
                        title="TREVIA TRANSPORT EN CHIFFRES"
                        subtitle="Notre succès en quelques statistiques"
                        backgroundVariant="gradient"
                    >
                        <StatCard
                            value="500K+"
                            label="Voyageurs satisfaits"
                            sublabel="cette année"
                            valueColor="text-yellow-300"
                        />
                        <StatCard
                            value="150+"
                            label="Départs quotidiens"
                            sublabel="vers 25 destinations"
                            valueColor="text-yellow-300"
                        />
                        <StatCard
                            value="98%"
                            label="Ponctualité"
                            sublabel="taux de satisfaction"
                            valueColor="text-yellow-300"
                        />
                        <StatCard
                            value="15"
                            label="Années d'expérience"
                            sublabel="dans le transport"
                            valueColor="text-yellow-300"
                        />
                    </StatsContainer>

                    {/* CTA Section */}
                    <Section
                        title="PRÊT À VOYAGER ?"
                        subtitle="Réservez votre voyage dès maintenant et profitez de nos tarifs préférentiels."
                        backgroundVariant="white"
                        titleAlign="center"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" size="lg" className="font-bold py-3 px-8">
                                Réserver maintenant
                            </Button>
                            <Button variant="outline" size="lg" className="font-bold py-3 px-8">
                                Voir les horaires
                            </Button>
                        </div>
                    </Section>
                </div>
            </LabeledSection>
        </div>
    );
}

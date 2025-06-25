import { LabeledSection } from "./ui-section";
import { ServiceCard } from '@/components/ui/service-card';

export function ServiceCardSample() {
    return (
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.map((service) => (
                <LabeledSection label={service.id} key={`s-${service.id}`}>
                    <ServiceCard
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        iconColor={service.iconColor}
                    />
                </LabeledSection>
            ))}
        </div>
    );
}

const serviceData = [
    {
        id: "transport-commun",
        icon: "fas fa-bus",
        title: "Transport en commun",
        description: "Des liaisons régulières entre les principales villes avec un confort optimal.",
        iconColor: "text-primary"
    },
    {
        id: "navettes-aeroport",
        icon: "fas fa-shuttle-van",
        title: "Navettes aéroport",
        description: "Transferts directs vers les aéroports avec horaires adaptés aux vols.",
        iconColor: "text-blue-600"
    },
    {
        id: "voyages-longue-distance",
        icon: "fas fa-bus-alt",
        title: "Voyages longue distance",
        description: "Confort premium pour vos trajets interurbains avec wifi et prises USB.",
        iconColor: "text-green-600"
    },
    {
        id: "transport-scolaire",
        icon: "fas fa-school",
        title: "Transport scolaire",
        description: "Un service sécurisé pour le transport des enfants vers les établissements scolaires.",
        iconColor: "text-yellow-600"
    },
    {
        id: "transport-groupes",
        icon: "fas fa-users",
        title: "Transport de groupes",
        description: "Solutions sur mesure pour les voyages en groupe, associations et entreprises.",
        iconColor: "text-purple-600"
    },
    {
        id: "accessibilite-pmr",
        icon: "fas fa-wheelchair",
        title: "Accessibilité PMR",
        description: "Véhicules adaptés pour personnes à mobilité réduite avec accompagnement.",
        iconColor: "text-indigo-600"
    }
];

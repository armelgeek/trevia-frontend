import { LabeledSection } from "./ui-section";
import { StatCard, StatsContainer } from '@/components/ui/stat-card';

export function StatsSample() {
    return (
        <div className="space-y-8">
            <LabeledSection label="Statistics Section">
                <StatsContainer
                    title="TREVIA TRANSPORT EN CHIFFRES"
                    subtitle="Notre succès en quelques statistiques"
                    backgroundVariant="gradient"
                >
                    {statsData.map((stat) => (
                        <StatCard
                            key={stat.id}
                            value={stat.value}
                            label={stat.label}
                            sublabel={stat.sublabel}
                            valueColor={stat.valueColor}
                        />
                    ))}
                </StatsContainer>
            </LabeledSection>

            <LabeledSection label="Statistics White Background">
                <StatsContainer
                    title="Nos Performances"
                    subtitle="Des chiffres qui parlent"
                    backgroundVariant="white"
                >
                    {statsDataWhite.map((stat) => (
                        <StatCard
                            key={stat.id}
                            value={stat.value}
                            label={stat.label}
                            sublabel={stat.sublabel}
                            valueColor={stat.valueColor}
                        />
                    ))}
                </StatsContainer>
            </LabeledSection>
        </div>
    );
}

const statsData = [
    {
        id: "voyageurs",
        value: "500K+",
        label: "Voyageurs satisfaits",
        sublabel: "cette année",
        valueColor: "text-yellow-300"
    },
    {
        id: "departs",
        value: "150+",
        label: "Départs quotidiens",
        sublabel: "vers 25 destinations",
        valueColor: "text-yellow-300"
    },
    {
        id: "ponctualite",
        value: "98%",
        label: "Ponctualité",
        sublabel: "taux de satisfaction",
        valueColor: "text-yellow-300"
    },
    {
        id: "experience",
        value: "15",
        label: "Années d'expérience",
        sublabel: "dans le transport",
        valueColor: "text-yellow-300"
    }
];

const statsDataWhite = [
    {
        id: "routes",
        value: "25",
        label: "Routes actives",
        sublabel: "dans toute la région",
        valueColor: "text-primary"
    },
    {
        id: "vehicles",
        value: "50+",
        label: "Véhicules",
        sublabel: "flotte moderne",
        valueColor: "text-primary"
    },
    {
        id: "staff",
        value: "200+",
        label: "Employés",
        sublabel: "équipe qualifiée",
        valueColor: "text-primary"
    },
    {
        id: "awards",
        value: "12",
        label: "Récompenses",
        sublabel: "qualité de service",
        valueColor: "text-primary"
    }
];

import { LabeledSection } from "./ui-section";
import { HeroSection } from '@/components/ui/hero-section';

export function HeroSample() {
    return (
        <div className="space-y-8">
            {heroData.map((hero) => (
                <LabeledSection label={hero.id} key={`h-${hero.id}`}>
                    <HeroSection
                        title={hero.title}
                        subtitle={hero.subtitle}
                        primaryAction={hero.primaryAction}
                        secondaryAction={hero.secondaryAction}
                        backgroundVariant={hero.backgroundVariant}
                        image={hero.image}
                    />
                </LabeledSection>
            ))}
        </div>
    );
}

const heroData = [
    {
        id: "hero-white",
        title: "VOYAGEZ EN TOUTE SÉRÉNITÉ",
        subtitle: "Des transports confortables et fiables pour tous vos déplacements. Réservez en ligne en quelques clics !",
        primaryAction: {
            text: "Réserver maintenant",
            href: "#"
        },
        secondaryAction: {
            text: "Nos services",
            href: "#services"
        },
        backgroundVariant: "white" as const,
        image: (
            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-bus text-6xl text-primary"></i>
            </div>
        )
    },
    {
        id: "hero-gradient",
        title: "TREVIA TRANSPORT",
        subtitle: "Découvrez nos destinations avec Trevia, le transport nouvelle génération.",
        primaryAction: {
            text: "Explorer",
            href: "#"
        },
        backgroundVariant: "gradient" as const,
        image: (
            <div className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-rocket text-6xl text-white"></i>
            </div>
        )
    }
];

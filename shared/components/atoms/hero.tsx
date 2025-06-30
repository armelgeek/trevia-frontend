import { HeroSection } from "@/shared/components/atoms/ui/hero-section";

const defaultHero = {
  id: "hero-white",
  title: "VOYAGEZ EN TOUTE SÉRÉNITÉ",
  subtitle: "Des transports confortables et fiables pour tous vos déplacements. Réservez en ligne en quelques clics !",
  primaryAction: {
    text: "Nos services",
    href: "/services"
  },
  secondaryAction: {
    text: "Voir les voyages de la semaine",
    href: "#voyages-semaine"
  },
  backgroundVariant: "gradient" as const,
  image: (
    <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <i className="fas fa-bus text-6xl text-white drop-shadow-lg"></i>
    </div>
  )
};

interface HeroProps {
  primaryAction?: { text: string; href: string };
  secondaryAction?: { text: string; href: string };
  menu?: React.ReactNode;
}

const Hero = ({ primaryAction, secondaryAction, menu }: HeroProps) => {
  return (
    <HeroSection
      title={defaultHero.title}
      subtitle={defaultHero.subtitle}
      primaryAction={primaryAction || defaultHero.primaryAction}
      secondaryAction={secondaryAction || defaultHero.secondaryAction}
      backgroundVariant={defaultHero.backgroundVariant}
      image={defaultHero.image}
      menu={menu}
    />
  );
};

export default Hero;

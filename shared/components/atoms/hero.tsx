import { HeroSection } from "@/components/ui/hero-section";

const hero = {
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
};
const Hero = () => {
  return (
    <HeroSection
      title={hero.title}
      subtitle={hero.subtitle}
      primaryAction={hero.primaryAction}
      secondaryAction={hero.secondaryAction}
      backgroundVariant={hero.backgroundVariant}
      image={hero.image}
    />
  );
};

export default Hero;

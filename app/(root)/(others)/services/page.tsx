import { Section } from '@/shared/components/atoms/ui/section';
import { ServiceCard } from '@/shared/components/atoms/ui/service-card';
import { Bus, Clock, Leaf, Wifi, Shield, Euro } from "lucide-react";
import { Button } from '@/shared/components/atoms/ui/button';

export const metadata = {
  title: 'Nos Services',
  description: 'Découvrez tous les services proposés par Trevia Transport.'
};

const services = [
  {
    icon: <Bus className="w-8 h-8 text-primary" />, 
    title: 'Transport longue distance',
    description: 'Voyagez confortablement entre les grandes villes françaises à prix abordable.'
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: 'Départs fréquents',
    description: 'Des horaires flexibles et de nombreux départs chaque jour.'
  },
  {
    icon: <Leaf className="w-8 h-8 text-primary" />,
    title: 'Éco-responsable',
    description: 'Des véhicules modernes et moins polluants pour un transport durable.'
  },
  {
    icon: <Wifi className="w-8 h-8 text-primary" />,
    title: 'Wi-Fi & Confort',
    description: 'Profitez du Wi-Fi gratuit et de sièges confortables à bord.'
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Sécurité',
    description: 'Chauffeurs expérimentés et normes de sécurité strictes.'
  },
  {
    icon: <Euro className="w-8 h-8 text-primary" />,
    title: 'Prix transparents',
    description: 'Aucun frais caché, réservation simple et rapide.'
  }
];

export default function ServicesPage() {
  return (
    <Section
      title="Tous nos services"
      subtitle="Retrouvez ici l'ensemble des services proposés par Trevia Transport."
      backgroundVariant="white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service, i) => (
          <ServiceCard key={i} {...service} />
        ))}
      </div>
      <div className="flex flex-row justify-center py-8">
        <Button asChild>
          <a href="/booking">Réserver un voyage</a>
        </Button>
      </div>
    </Section>
  );
}

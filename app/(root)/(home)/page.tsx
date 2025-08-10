import { Section } from '@/shared/components/atoms/ui/section';
import Hero from '@/shared/components/atoms/hero';
import type { Metadata } from 'next';
import { Button } from '@/shared/components/atoms/ui/button';
import { ServiceCard } from '@/shared/components/atoms/ui/service-card';
import { Testimonials } from '@/shared/components/organisms/testimonials';
import { CtaSection } from '@/shared/components/atoms/ui/cta-section';
import { Bus, Clock, Leaf, Wifi, Shield, Euro } from "lucide-react";
import { StatCard, StatsContainer } from '@/shared/components/atoms/ui/stat-card';
import { FAQ } from '@/shared/components/organisms/faq';
import ScheduleTableMultiDestinationAccordion from '@/app/(ui)/ui/components/ui-schedule-table-multi';
import PopularDestinationsSection from '@/features/trip/components/popular-destinations-section';
import { ContactForm } from '@/shared/components/organisms/contact-form';

export const metadata: Metadata = {
  title: 'Trevia Transport - Votre partenaire de voyage',
  description: 'Découvrez Trevia Transport, votre solution de transport longue distance en France. Réservez facilement vos voyages en bus avec des départs fréquents, un service client 24/7 et des prix transparents. Profitez du confort, de la sécurité et de l’éco-responsabilité à bord de nos véhicules modernes.',
};

export default function Home() {

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

  const testimonials = [
    {
      id: '1',
      name: 'Sophie Martin',
      rating: 5,
      comment: 'Service impeccable, bus à l’heure et très confortable. Je recommande !',
      role: 'Voyageuse',
      avatar: undefined
    },
    {
      id: '2',
      name: 'Karim Benali',
      rating: 4,
      comment: 'Très bon rapport qualité/prix. Réservation facile et rapide.',
      role: 'Client régulier',
      avatar: undefined
    },
    {
      id: '3',
      name: 'Lucie Durand',
      rating: 5,
      comment: 'J’ai adoré le Wi-Fi à bord et la gentillesse du personnel.',
      role: 'Étudiante',
      avatar: undefined
    }
  ];

  const stats = [
    { value: '10 000+', label: 'Voyageurs/mois', sublabel: 'Clients satisfaits' },
    { value: '50+', label: 'Destinations', sublabel: 'Partout en France' },
    { value: '4.8/5', label: 'Note moyenne', sublabel: 'Basée sur 2 000 avis' },
    { value: '24/7', label: 'Support client', sublabel: 'Assistance continue' },
  ];

  const faqs = [
    {
      id: '1',
      question: 'Comment réserver un billet ?',
      answer: 'Vous pouvez réserver directement en ligne via notre site ou notre application mobile.',
      category: 'Réservation',
      tags: ['réservation', 'achat']
    },
    {
      id: '2',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons les paiements par carte bancaire, PayPal et Apple Pay.',
      category: 'Paiement',
      tags: ['paiement', 'carte', 'paypal']
    },
    {
      id: '3',
      question: 'Puis-je modifier ou annuler ma réservation ?',
      answer: 'Oui, vous pouvez modifier ou annuler votre réservation jusqu’à 24h avant le départ.',
      category: 'Réservation',
      tags: ['modification', 'annulation']
    },
    {
      id: '4',
      question: 'Où puis-je trouver les horaires des départs ?',
      answer: 'Les horaires sont disponibles sur chaque fiche destination et lors de la réservation.',
      category: 'Horaires',
      tags: ['horaires', 'départs']
    },
    {
      id: '5',
      question: 'Comment contacter le service client ?',
      answer: 'Notre équipe est disponible 24/7 par chat, email ou téléphone.',
      category: 'Compte',
      tags: ['support', 'contact']
    }
  ];

  return (
    <>
      <Hero
        secondaryAction={{ text: 'Voir les voyages de la semaine', href: '#voyages-semaine' }}
      />
      <div>
        <Section
          title="NOS SERVICES"
          subtitle="Découvrez notre gamme complète de services de transport adaptés à tous vos besoins."
          backgroundVariant="white"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
          <div className="flex flex-row justify-center py-8">
            <Button asChild>
              <a href="/services">Découvrir tous nos services {'>>'}</a>
            </Button>
          </div>
        </Section>

        <PopularDestinationsSection />


        <Section
          id="voyages-semaine"
          title="Voyages de la semaine"
          subtitle="Consultez les prochains voyages disponibles par destination."
          spacing="sm"
          backgroundVariant="white"
        >
          <ScheduleTableMultiDestinationAccordion />
        </Section>


        <Section
          title="CE QUE NOS CLIENTS DISENT"
          subtitle="Plus de 10 000 voyageurs nous font confiance chaque mois. \nDécouvrez leurs expériences avec Cosmic Transport."
          backgroundVariant="white"
        >
          <Testimonials testimonials={testimonials} variant="grid" showRating showRoute />
        </Section>


        <StatsContainer
          title="Pourquoi choisir Trevia Transport ?"
          subtitle="Des chiffres qui parlent d’eux-mêmes."
          backgroundVariant="white"
          className="my-12 text-center py-3"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </StatsContainer>
        
        <CtaSection
          title="Prêt à réserver votre prochain voyage ?"
          subtitle="Rejoignez des milliers de voyageurs satisfaits et profitez de nos offres exclusives."
          actions={[
            { label: 'Réserver maintenant', href: '/booking', variant: 'primary', size: 'lg' },
            { label: 'Découvrir nos destinations', href: '/destinations', variant: 'outline', size: 'lg' }
          ]}
          backgroundVariant="white"
          layout="horizontal"
          titleAlign="center"
        />
        <Section
          title="Questions fréquentes"
          subtitle="Retrouvez ici les réponses aux questions les plus courantes sur nos services, la réservation, le paiement et plus encore."
          backgroundVariant="white"
        >
          <FAQ faqs={faqs} variant="searchable" showCategories />
        </Section>


        <Section
          title="Contactez-nous"
          subtitle="Nous sommes là pour vous aider"
          backgroundVariant="white"
        >
          <ContactForm
            variant="detailed"
          />
        </Section>

      </div>
    </>
  );
}

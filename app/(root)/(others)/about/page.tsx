import About from '@/shared/components/molecules/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trevia Transport - Votre partenaire de voyage',
  description: 'Découvrez Trevia Transport, votre solution de transport longue distance en France. Réservez facilement vos voyages en bus avec des départs fréquents, un service client 24/7 et des prix transparents. Profitez du confort, de la sécurité et de l’éco-responsabilité à bord de nos véhicules modernes.',
};


export default function Page() {
  return (
    <>
      <About/>
    </>
  );
}

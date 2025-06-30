import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/atoms/ui/tabs';
import { Section } from '@/shared/components/atoms/ui/section';
import { Button } from '@/shared/components/atoms/ui/button';

export default function UserDashboard() {
  return (
    <Section title="Mon espace" subtitle="Gérez vos informations et réservations" backgroundVariant="white">
      <Tabs defaultValue="reservations" className="w-full max-w-3xl mx-auto mt-8">
        <TabsList className="flex justify-center gap-4 mb-6">
          <TabsTrigger value="reservations">Mes réservations</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>
        <TabsContent value="reservations">
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-2">Mes réservations</h2>
            <p className="text-gray-600 mb-4">Retrouvez ici l’historique et le suivi de vos réservations.</p>
            {/* TODO: Liste des réservations utilisateur */}
            <Button variant="primary">Nouvelle réservation</Button>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-2">Mon profil</h2>
            <p className="text-gray-600 mb-4">Modifiez vos informations personnelles et préférences.</p>
            {/* TODO: Formulaire de modification du profil utilisateur */}
          </div>
        </TabsContent>
      </Tabs>
    </Section>
  );
}

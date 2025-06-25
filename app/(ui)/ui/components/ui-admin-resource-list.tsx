import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const resources = [
  { id: 1, name: "Minibus 14 places", status: "Disponible" },
  { id: 2, name: "Bus 50 places", status: "En maintenance" },
  { id: 3, name: "Véhicule VIP", status: "Disponible" },
];

export function AdminResourceListSample() {
  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Ressources (Véhicules)</h2>
      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Nom</th>
            <th className="text-left py-2">Statut</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r.id} className="border-b last:border-0">
              <td className="py-2">{r.name}</td>
              <td className="py-2">{r.status}</td>
              <td className="py-2">
                <Button size="sm" variant="outline">Modifier</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button>Ajouter une ressource</Button>
    </Card>
  );
}

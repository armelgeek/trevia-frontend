import { Card } from "@/components/ui/card";

const logs = [
  { date: "2025-06-22", user: "admin", action: "Connexion réussie" },
  { date: "2025-06-22", user: "admin", action: "Modification des paramètres" },
  { date: "2025-06-21", user: "jdoe", action: "Suppression d'un utilisateur" },
];

export function AdminAuditLogSample() {
  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Journal d’audit</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Utilisateur</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-2">{log.date}</td>
              <td className="py-2">{log.user}</td>
              <td className="py-2">{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

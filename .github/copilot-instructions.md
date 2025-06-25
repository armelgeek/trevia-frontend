# Copilot Instructions: Générer une Simple Admin Page

Pour toute nouvelle entité admin, effectue les étapes suivantes :

1. **Schéma et type**
   - Crée le fichier `features/[entity]/[entity].schema.ts`
   - Exporte un schéma Zod et le type TypeScript correspondant :
     ```ts
     import { z } from 'zod';
     import { createField } from '@/lib/admin-generator';

     export const [Entity]Schema = z.object({
       // ...fields...
     });

     export type [Entity] = z.infer<typeof [Entity]Schema>;
     ```

2. **Données mock et service mock**
   - Crée le fichier `features/[entity]/[entity].mock.ts`
   - Exporte un tableau de données mock et un service mock :
     ```ts
     import { [Entity] } from './[entity].schema';
     import { createMockService } from '@/lib/admin-generator';

     export const mock[Entity]s: [Entity][] = [ /* ... */ ];
     export const [entity]Service = createMockService(mock[Entity]s);
     ```

3. **Configuration admin**
   - Crée le fichier `features/[entity]/[entity].admin-config.ts`
   - Exporte la config admin avec :
     ```ts
     import { createAdminEntity } from '@/lib/admin-generator';
     import { [Entity]Schema } from './[entity].schema';
     import { [entity]Service } from './[entity].mock';

     export const [Entity]AdminConfig = createAdminEntity('[Nom]', [Entity]Schema, {
       description: 'Gérez vos ...',
       icon: '🏷️',
       actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
       services: {
         fetchItems: [entity]Service.fetchItems,
         createItem: [entity]Service.createItem,
         updateItem: [entity]Service.updateItem,
         deleteItem: [entity]Service.deleteItem,
       },
       queryKey: ['[entity]s'],
     });
     ```

4. **Page d’admin**
   - Crée le fichier `app/(admin)/admin/[entity]/page.tsx`
   - Utilise :
     ```tsx
     import { [Entity]Schema } from '@/features/[entity]/[entity].schema';
     import { [Entity]AdminConfig } from '@/features/[entity]/[entity].admin-config';
     import { SimpleAdminPage } from '@/components/ui/simple-admin-page';

     export default function [Entity]AdminPage() {
       return (
         <SimpleAdminPage
           config={[Entity]AdminConfig}
           schema={[Entity]Schema}
         />
       );
     }
     ```

5. **Vérifie que le composant `SimpleAdminPage` est bien utilisé**  
   - Import depuis `@/components/ui/simple-admin-page`.

> Remplace `[entity]`, `[Entity]`, `[Nom]` par le nom de ton entité (ex : `category`, `Category`, `Catégorie`).

Cette structure garantit une admin page modulaire, claire et réutilisable.

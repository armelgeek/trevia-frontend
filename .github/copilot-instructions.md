``instructions

# Copilot Instructions: Générer une Simple Admin Page

> **Avant de générer une page ou un composant pour une nouvelle fonctionnalité admin, vérifie dans `components/ui/` si un design ou composant correspondant existe déjà pour illustrer ou structurer la fonctionnalité.  
> Si un composant adapté existe, utilise-le ou référence-le dans la page ou le formulaire généré.  
> Si aucun composant n’existe, utilise le composant générique prévu (`SimpleAdminPage` ou autre selon le contexte) et signale qu’aucun design spécifique n'a été trouvé dans `components/ui/`.**

**Tous les endpoints d’API doivent être ajoutés dans `shared/config/api.ts` sous la clé appropriée (`API_ENDPOINTS`).**

**Tous les composants générés doivent commencer par la directive `"use client"` pour être explicitement des composants client React.**

**Jamais d'appel direct à `fetch` ou à une API dans un composant React.**
- Utilise toujours l’architecture du projet : crée un service (`features/[entity]/[entity].service.ts`) qui hérite de `BaseService` (l'implémentation des appels API est dans `lib/base-service.ts`), puis un hook (`features/[entity]/hooks/use-[entity].ts`) qui encapsule l’appel API avec React Query (`useQuery` ou `useMutation`).
- Les composants ne doivent consommer que les hooks personnalisés, jamais `fetch` ou `axios` directement.
- Respecte la séparation : service = accès API (via `BaseService`), hook = gestion de la donnée/caching, composant = affichage.

**Après chaque génération de fichier, vérifie automatiquement s’il y a des erreurs de compilation ou de typage dans les fichiers générés. Si des erreurs sont détectées, corrige-les avant de considérer la tâche comme terminée.**

**Ne génère pas de commentaires dans le code, sauf si c'est strictement nécessaire pour la compréhension d'un algorithme complexe.**

Pour toute nouvelle entité admin, effectue les étapes suivantes :

1. **Schéma et type**
   - Crée le fichier `features/[entity]/[entity].schema.ts`
   - Exporte un schéma Zod et le type TypeScript correspondant :

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
   - Exporte un tableau de données mock et un service mock :

```ts
import { [Entity] } from './[entity].schema';
import { createMockService } from '@/lib/admin-generator';

export const mock[Entity]s: [Entity][] = [ /* ... */ ];
export const [entity]Service = createMockService(mock[Entity

3. **Service API réel**
   - Crée le fichier `features/[entity]/[entity].service.ts` :

```ts
import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export const [entity]Service = new BaseService<[Entity]>(
  http.private,
  API_ENDPOINTS.[entity]
);
```

4. **Hook de query**
   - Crée le fichier `features/[entity]/hooks/use-[entity].ts` :

```ts
import { useQuery } from '@tanstack/react-query';
import { [entity]Service } from '../[entity].service';

export function use[Entity]() {
  return useQuery({
    queryKey: ['[entity]s'],
    queryFn: () => [entity]Service.list(),
  });
}
```

5. **Configuration admin**
   - Crée le fichier `features/[entity]/[entity].admin-config.ts`
   - Selon le type de service utilisé, choisis l’exemple adapté :

**a) Avec mock :**

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

**b) Avec API réelle :**

```ts
import { createAdminEntity } from '@/lib/admin-generator';
import { [Entity]Schema } from './[entity].schema';
import { [entity]Service } from './[entity].service';

export const [Entity]AdminConfig = createAdminEntity('[Nom]', [Entity]Schema, {
  description: 'Gérez vos ...',
  icon: '🏷️',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: {
    fetchItems: [entity]Service.list,
    createItem: [entity]Service.create,
    updateItem: [entity]Service.update,
    deleteItem: [entity]Service.delete,
  },
  queryKey: ['[entity]s'],
});
```

6. **Page d’admin**
   - Crée le fichier `app/(admin)/admin/[entity]/page.tsx`
   - Utilise :

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

7. **Vérifie que le composant `SimpleAdminPage` est bien utilisé**  
   - Import depuis `@/components/ui/simple-admin-page`.

**À chaque fois qu’une nouvelle fonctionnalité admin est générée, ajoute automatiquement une entrée correspondante dans le menu sidebar admin.**
- La liste des menus sidebar se trouve dans `shared/lib/constants/app.constant.ts`.
- L’intitulé, l’icône et le chemin doivent être cohérents avec la nouvelle entité.
- Cette étape est obligatoire pour toute nouvelle page ou module admin.

> Remplace `[entity]`, `[Entity]`, `[Nom]` par le nom de ton entité (ex : `category`, `Category`, `Catégorie`).

**Jamais :**
- d’appel direct à `fetch` ou `axios` dans un composant React
- d’appel API dans un composant sans passer par un hook custom et un service
- d’implémentation d’appel API ailleurs que dans un service héritant de `BaseService`

**Toujours :**
- Service = accès API (via `BaseService`)
- Hook = gestion de la donnée/caching (React Query)
- Composant = affichage, consomme le hook

Cette structure garantit une admin page modulaire, claire, réutilisable et maintenable.

---

## 🏗️ Architecture du Projet

### Structure des Dossiers (extrait réel du projet)

```
/ (racine)
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       └── categories/
│   │           └── page.tsx
│   ├── (root)/
│   └── (ui)/
├── components/
│   ├── debug/
│   ├── navigation/
│   └── ui/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── providers/
│   └── category/
│       ├── category.admin-config.ts
│       ├── category.mock.ts
│       └── category.schema.ts
├── hooks/
├── lib/
├── public/
├── scripts/
├── shared/
│   ├── components/
│   ├── domain/
│   ├── hooks/
│   ├── layout/
│   ├── lib/
│   ├── providers/
│   └── styles/
```

> Cette structure réelle doit être respectée pour toute nouvelle fonctionnalité ou page d’admin.

---

### 1. Structure d'une Fonctionnalité (adaptée à ce projet)

Chaque fonctionnalité doit être organisée dans `features/[nom-fonctionnalite]/` :

```ts
// features/category/category.schema.ts
import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'category.errors.name.required'),
  description: z.string().optional(),
});

// features/category/category.types.ts
export type Category = z.infer<typeof categorySchema>;

// features/category/category.config.ts
export const categoryKeys = createQueryKeys({
  entity: 'category'
});

// features/category/index.ts
export { useCategory } from './hooks/use-category';
export { useCategoryActions } from './hooks/use-category-actions';
export type { Category } from './category.types';
```

### 2. Hooks Personnalisés

#### Hook de Query (Lecture)
```ts
// features/category/hooks/use-category.ts
export const useCategory = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: () => categoryService.list({ page: 1, limit: 10 }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: categoryKeys.lists(),
      refetchType: 'all'
    });
  };

  return { ...query, invalidate };
};
```

#### Hook d'Actions (Mutations)
```ts
// features/category/hooks/use-category-actions.ts
export const useCategoryActions = () => {
  const mutations = useMutations<Category>({
    service: categoryService,
    queryKeys: categoryKeys,
    successMessages: {
      create: t('admin.category.create.success')
    }
  });

  return {
    create: mutations.create,
    update: mutations.modify,
    isUpdating: mutations.isModifing,
    invalidate: mutations.invalidate
  };
};
```

### 3. Services API

#### Configuration des Endpoints
```ts
// lib/api-endpoints.ts
export const API_ENDPOINTS = {
  category: {
    base: `${prefix}/v1/category`,
    create: `${prefix}/v1/category`,
    list: (qs: string) => `${prefix}/v1/category?${qs}`,
    detail: (id: string) => `${prefix}/v1/category/${id}`,
    update: (id: string) => `${prefix}/v1/category/${id}`,
    delete: (id: string) => `${prefix}/v1/category/${id}`
  }
} as const;
```

#### Service HTTP
```ts
// features/category/category.service.ts
import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export const categoryService = new BaseService<Category>(
  http.private,
  API_ENDPOINTS.category
);
```

> Adapte les chemins et noms de fichiers/types à la convention de ce projet (dossier `features/`, services dans `lib/` ou `features/[feature]/`, hooks dans `features/[feature]/hooks/`, etc.).

### 4. Composants & Formulaires

#### Structure d'un Composant
```ts
// Suivre cet ordre dans les composants :
export function CategoryForm({ onSubmit }: { onSubmit: (data: Category) => void }) {
  // 1. État local
  const [loading, setLoading] = useState(false);
  
  // 2. Hooks personnalisés
  const { t } = useTranslation();
  const { data, isLoading } = useCategory();
  
  // 3. Effets
  useEffect(() => {
    // logique d'effet
  }, []);

  // 4. Gestionnaires d'événements
  const handleSubmit = (data: Category) => {
    onSubmit(data);
  };

  // 5. JSX
  return (
    <form onSubmit={handleSubmit}>
      {/* Contenu du formulaire */}
    </form>
  );
}
```

#### Formulaires avec React Hook Form + Zod
```ts
const { control, handleSubmit, reset } = useForm<Category>({
  defaultValues: {
    name: '',
    description: ''
  },
  resolver: zodResolver(categorySchema),
  mode: 'onChange'
});

const onSubmit = async (data: Category) => {
  await create(data);
  reset();
};

// Utiliser les composants contrôlés
<ControlledTextInput
  name="name"
  control={control}
  placeholder={t('admin.category.form.placeholders.name')}
/>
```

### 5. Gestion d'État

#### État Local avec Zustand
```ts
// features/category/category.store.ts
interface CategoryState {
  currentCategory: Category | null;
  setCurrentCategory: (category: Category) => void;
  clearCurrentCategory: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  currentCategory: null,
  setCurrentCategory: (category) => set({ currentCategory: category }),
  clearCurrentCategory: () => set({ currentCategory: null })
}));
```

#### Mutations avec Invalidation Automatique
```ts
// lib/react-query/mutation.ts
export function useMutations<T extends HasId, P>(config: MutationConfig<T, P>) {
  const handleSuccess = (type: 'create' | 'update' | 'delete', data: T) => {
    // Invalidation automatique des queries
    queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    // ...autre logique métier...
  };
}
```

---

## 📝 Bonnes Pratiques

### 1. Conventions de Nommage
- **Fichiers** : kebab-case (`user-avatar.tsx`)
- **Composants** : PascalCase (`UserAvatar`)
- **Hooks** : camelCase avec préfixe `use` (`useCategory`)
- **Types** : PascalCase (`CategoryPayload`)
- **Variables** : camelCase (`isLoading`)

### 2. Structure des Fichiers
- Un composant par fichier
- Export par défaut pour les composants principaux
- Export nommé pour les utilitaires

### 3. Commentaires dans le Code
- **Éviter les commentaires** dans le code de production
- Le code doit être auto-documenté avec des noms explicites
- Privilégier des noms de variables et fonctions clairs
- Les seuls commentaires acceptés :
  - JSDoc pour les fonctions publiques/exportées
  - Commentaires temporaires pendant le développement (à supprimer avant commit)
  - Commentaires explicatifs pour des algorithmes complexes (rare)

```ts
// ❌ Éviter
const d = new Date(); // Date actuelle
const u = users.filter(u => u.active); // Filtrer les utilisateurs actifs

// ✅ Préférer
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);
```

### 4. Gestion des Erreurs
```ts
// Dans les hooks
const { mutate: createCategory, isPending, error } = useMutation({
  mutationFn: categoryService.create,
  onSuccess: () => {
    toast.success(t('success.message'));
  },
  onError: (error) => {
    toast.error(`Erreur: ${error.message}`);
  }
});
```

### 5. Performance
- Utilisez `useMemo` pour les calculs coûteux
- Utilisez `useCallback` pour les fonctions passées en props
- Préférez la pagination pour les listes importantes

### 6. Accessibilité
- Toujours inclure `aria-label` sur les éléments interactifs
- Utiliser les rôles ARIA appropriés
- Gérer le focus keyboard

## 🚀 Checklist pour Nouvelle Fonctionnalité

### Avant de Commencer
- [ ] Créer le dossier `features/[feature]/`
- [ ] Définir les schémas Zod dans `category.schema.ts`
- [ ] Créer les types TypeScript dans `category.types.ts`
- [ ] Configurer les query keys dans `category.config.ts`

### Développement
- [ ] Créer le service API
- [ ] Implémenter les hooks (query + mutations)
- [ ] Développer les composants UI
- [ ] Configurer la navigation/routing

### Tests & Finalisation
- [ ] Tester les formulaires (validation, soumission)
- [ ] Vérifier la gestion d'erreur
- [ ] Valider l'accessibilité
- [ ] Optimiser les performances
- [ ] Documenter les APIs publiques

## 📚 Ressources

- [Documentation React Query](https://tanstack.com/query/latest)
- [Documentation Zod](https://zod.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Documentation Radix UI](https://www.radix-ui.com/)
- [Guide Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

## 🤖 Instructions pour l'IA

Quand tu développes une nouvelle fonctionnalité :

1. **Analyse** d'abord la structure existante similaire
2. **Suis** l'architecture modulaire décrite
3. **Utilise** les patterns établis (hooks, services, composants)
4. **Respecte** les conventions de nommage
5. **Pense** à l'invalidation des caches React Query
6. **Gère** les états de chargement et d'erreur
7. **Assure-toi** de l'accessibilité des composants

**Exemple de workflow** :
1. Créer les types et schémas
2. Implémenter le service API
3. Créer les hooks (query + actions)
4. Développer les composants UI
5. Intégrer dans les pages
6. Tester et optimiser

---

### 🔗 Utilisation d’une vraie API pour l’admin

Si tu utilises une vraie API (et non un mock) pour l’admin :

1. **Service API réel**
   - Crée le fichier `features/[entity]/[entity].service.ts` :

```ts
import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export const [entity]Service = new BaseService<[Entity]>(
  http.private,
  API_ENDPOINTS.[entity]
);
```

2. **Configuration admin**
   - Dans `features/[entity]/[entity].admin-config.ts`, importe le vrai service :

```ts
import { createAdminEntity } from '@/lib/admin-generator';
import { [Entity]Schema } from './[entity].schema';
import { [entity]Service } from './[entity].service';

export const [Entity]AdminConfig = createAdminEntity('[Nom]', [Entity]Schema, {
  description: 'Gérez vos ...',
  icon: '🏷️',
  actions: { create: true, read: true, update: true, delete: true, bulk: false, export: false },
  services: {
    fetchItems: [entity]Service.list,
    createItem: [entity]Service.create,
    updateItem: [entity]Service.update,
    deleteItem: [entity]Service.delete,
  },
  queryKey: ['[entity]s'],
});
```

3. **Page d’admin**
   - Rien ne change, tu utilises toujours le composant `SimpleAdminPage` avec la config ci-dessus.

> Remplace `[entity]`, `[Entity]`, `[Nom]` par le nom de ton entité (ex : `category`, `Category`, `Catégorie`).
> Les méthodes à fournir dans `services` sont : `list`, `create`, `update`, `delete` (ou leurs équivalents selon ton service).

---

**Tous les retours d’API sont normalisés sous la forme :

{
  "data": [...],
  "page": 1,
  "limit": 20,
  "total": 130
}

Les hooks et services doivent toujours consommer la propriété `data` du retour API pour lister les entités, et non le retour brut.**

- Pour la lecture (list), utiliser `response.data`.
- Pour la création, modification, suppression, utiliser la propriété `data` du retour si présente.
- Adapter les hooks et composants pour ne jamais supposer un tableau brut, mais toujours un objet avec une clé `data`.

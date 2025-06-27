import { z, ZodSchema, ZodObject } from 'zod';
import { BaseServiceImpl, ResourceEndpoints } from '@/shared/domain/base.service';
import { Filter } from '@/shared/lib/types/filter';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'textarea' | 'date' | 'email' | 'url' | 'rich-text' | 'image' | 'file' | 'relation';
  required?: boolean;
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  display?: {
    showInTable?: boolean;
    showInForm?: boolean;
    showInDetail?: boolean;
    order?: number;
    widget?: 'select' | 'tag' | 'radio';
  };
  relation?: {
    entity: string;
    displayField: string;
    multiple?: boolean;
  };
}

export interface AdminConfig {
  title: string;
  description?: string;
  icon?: string;
  fields: FieldConfig[];
  actions: {
    create?: boolean;
    read?: boolean;
    update?: boolean;
    delete?: boolean;
    bulk?: boolean;
    export?: boolean;
    import?: boolean;
  };
  permissions?: {
    roles: string[];
    conditions?: Record<string, unknown>;
  };
  ui?: {
    table?: {
      defaultSort?: string;
      defaultFilters?: Record<string, unknown>;
      pageSize?: number;
    };
    form?: {
      layout?: 'tabs' | 'sections' | 'simple';
      sections?: {
        title: string;
        fields: string[];
      }[];
    };
  };
}

interface ZodMetadata {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: FieldConfig['type'];
  display?: FieldConfig['display'];
  relation?: FieldConfig['relation'];
  options?: string[] | { value: string; label: string }[];
}

// Fonction utilitaire pour accéder dynamiquement aux propriétés
export function getNestedProperty<T = unknown>(obj: Record<string, unknown>, path: string): T | undefined {
  return path.split('.').reduce<Record<string, unknown> | undefined>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      const next = (current as Record<string, unknown>)[key];
      return typeof next === 'object' && next !== null
        ? (next as Record<string, unknown>)
        : next as Record<string, unknown> | undefined;
    }
    return undefined;
  }, obj) as T | undefined;
}

// Fonction pour définir une propriété dynamiquement
export function setNestedProperty(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) return;
  
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    return current[key] as Record<string, unknown>;
  }, obj);
  
  target[lastKey] = value;
}

// Fonction pour vérifier si une propriété existe
export function hasNestedProperty(obj: Record<string, unknown>, path: string): boolean {
  return getNestedProperty(obj, path) !== undefined;
}

// Interface pour l'accès dynamique
export interface DynamicFieldAccess {
  getValue: <T = unknown>(obj: Record<string, unknown>, field: string) => T | undefined;
  setValue: (obj: Record<string, unknown>, field: string, value: unknown) => void;
  hasValue: (obj: Record<string, unknown>, field: string) => boolean;
}

// Implémentation pour l'accès dynamique
export function createDynamicAccessor(): DynamicFieldAccess {
  return {
    getValue: <T = unknown>(obj: Record<string, unknown>, field: string): T | undefined => {
      // Support pour les chemins simples et imbriqués
      if (field.includes('.')) {
        return getNestedProperty<T>(obj, field);
      }
      return obj[field] as T | undefined;
    },
    
    setValue: (obj: Record<string, unknown>, field: string, value: unknown): void => {
      if (field.includes('.')) {
        setNestedProperty(obj, field, value);
      } else {
        obj[field] = value;
      }
    },

    hasValue: (obj: Record<string, unknown>, field: string): boolean => {
      if (field.includes('.')) {
        return hasNestedProperty(obj, field);
      }
      return field in obj;
    }
  };
}

// Extension de AdminConfig avec l'accessor dynamique
export interface AdminConfigWithAccessor extends AdminConfig {
  accessor: DynamicFieldAccess;
}

export function withMeta<T extends ZodSchema>(schema: T, metadata: ZodMetadata): T & { _metadata: ZodMetadata } {
  return Object.assign(schema, { _metadata: metadata });
}

export const createField = {
  string: (metadata?: ZodMetadata) => 
    withMeta(z.string(), { type: 'text', ...metadata }),
  
  email: (metadata?: ZodMetadata) => 
    withMeta(z.string().email(), { type: 'email', ...metadata }),
  
  url: (metadata?: ZodMetadata) => 
    withMeta(z.string().url(), { type: 'url', ...metadata }),
  
  textarea: (metadata?: ZodMetadata) => 
    withMeta(z.string(), { type: 'textarea', ...metadata }),
  
  richText: (metadata?: ZodMetadata) => 
    withMeta(z.string(), { type: 'rich-text', ...metadata }),
  
  number: (metadata?: ZodMetadata) => 
    withMeta(z.number(), { type: 'number', ...metadata }),
  
  boolean: (metadata?: ZodMetadata) => 
    withMeta(z.boolean(), { type: 'boolean', ...metadata }),
  
  date: (metadata?: ZodMetadata) => 
    withMeta(z.date(), { type: 'date', ...metadata }),
  
  select: (options: [string, ...string[]], metadata?: ZodMetadata) => 
    withMeta(z.enum(options), { 
      type: 'select', 
      options, 
      ...metadata 
    }),
  
  relation: (entity: string, displayField: string = 'name', multiple: boolean = false, metadata?: ZodMetadata) =>
    withMeta(multiple ? z.array(z.string()) : z.string(), { 
      type: 'relation', 
      relation: { entity, displayField, multiple }, 
      ...metadata 
    }),
  
  image: (metadata?: ZodMetadata) => 
    withMeta(z.string(), { type: 'image', ...metadata }),
  
  file: (metadata?: ZodMetadata) => 
    withMeta(z.string(), { type: 'file', ...metadata }),
};

export function generateAdminConfig(schema: ZodObject<z.ZodRawShape>, title: string): AdminConfigWithAccessor {
  const fields: FieldConfig[] = [];
  const accessor = createDynamicAccessor();
  
  const shape = schema.shape;
  
  Object.entries(shape).forEach(([key, zodField]) => {
    // Pour les champs optionnels, récupérer les métadonnées du champ interne
    let metadata: ZodMetadata = {};
    let actualField = zodField;
    
    // Si c'est un champ optionnel, récupérer le champ interne
    if (zodField instanceof z.ZodOptional) {
      actualField = zodField._def.innerType;
    }
    
    // Récupérer les métadonnées
    if ((actualField as { _metadata?: ZodMetadata })._metadata) {
      metadata = (actualField as { _metadata?: ZodMetadata })._metadata || {};
    } else if ((zodField as { _metadata?: ZodMetadata })._metadata) {
      metadata = (zodField as { _metadata?: ZodMetadata })._metadata || {};
    }
    
    console.log(`[generateAdminConfig] Processing field ${key}:`, {
      metadata,
      zodFieldType: zodField.constructor.name,
      actualFieldType: actualField.constructor.name,
      hasMetadata: !!metadata,
      metadataType: metadata.type,
      isOptional: zodField instanceof z.ZodOptional
    });
    
    const field: FieldConfig = {
      key,
      label: metadata.label || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      type: metadata.type || 'text',
      required: !zodField.isOptional(),
      placeholder: metadata.placeholder,
      description: metadata.description,
      display: {
        showInTable: !['textarea', 'rich-text', 'image', 'file'].includes(metadata.type || 'text'),
        showInForm: true,
        showInDetail: true,
        ...metadata.display,
      },
      relation: metadata.relation,
    };

    console.log(`[generateAdminConfig] Generated field config for ${key}:`, field);

    // Auto-détection du type si pas de métadonnées
    if (!metadata.type) {
      if (actualField instanceof z.ZodString) {
        if (key.toLowerCase().includes('email')) field.type = 'email';
        else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('website')) field.type = 'url';
        else if (key.toLowerCase().includes('description') || key.toLowerCase().includes('comment') || key.toLowerCase().includes('content')) field.type = 'textarea';
        else if (key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') || key.toLowerCase().includes('avatar')) field.type = 'image';
        else if (key.toLowerCase().includes('date') || key.toLowerCase().includes('time') || key === 'createdAt' || key === 'updatedAt') field.type = 'date';
        else if (key.toLowerCase().includes('status') || key.toLowerCase().includes('type') || key.toLowerCase().includes('state')) {
          field.type = 'select';
          // Si options dans metadata, on les prend, sinon on laisse undefined
          if (metadata.options) field.options = metadata.options;
        }
        else field.type = 'text';
      } else if (actualField instanceof z.ZodNumber) {
        field.type = 'number';
      } else if (actualField instanceof z.ZodBoolean) {
        field.type = 'boolean';
      } else if (actualField instanceof z.ZodEnum) {
        field.type = 'select';
        field.options = actualField.options;
      } else if (actualField instanceof z.ZodDate) {
        field.type = 'date';
      }
    }

    // Ajouter les options si c'est un select
    if (metadata.options) {
      field.options = metadata.options;
    }

    // Spécial: le champ 'id' n'est jamais affiché dans le formulaire par défaut, mais oui dans le tableau et le détail
    if (key === 'id') {
      field.display = {
        ...field.display,
        showInForm: false,
        showInTable: false,
        showInDetail: true,
      };
    }
    // Spécial: masquer updatedAt par défaut dans le tableau et le formulaire
    if (key === 'updatedAt') {
      field.display = {
        ...field.display,
        showInForm: false,
        showInTable: false,
        showInDetail: true,
      };
    }

    fields.push(field);
  });

  return {
    title,
    fields,
    accessor, // Ajout de l'accessor dynamique
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      bulk: true,
      export: false,
      import: false,
    },
    ui: {
      table: {
        defaultSort: 'createdAt',
        pageSize: 10,
      },
      form: {
        layout: 'simple',
      },
    },
  };
}

// Fonction pour créer des colonnes React Table dynamiquement
export function createDynamicColumns(fields: FieldConfig[], accessor: DynamicFieldAccess) {
  return fields
    .filter(field => field.display?.showInTable !== false)
    .map(field => ({
      accessorKey: field.key,
      header: field.label,
      cell: ({ row }: { row: { original: Record<string, unknown> } }) => {
        const value = accessor.getValue(row.original, field.key);
        
        // Formatage selon le type de champ
        switch (field.type) {
          case 'date':
            if (!value) return '';
            const date = new Date(value as string);
            return isNaN(date.getTime()) ? value : date.toLocaleDateString('fr-FR');
          
          case 'boolean':
            return value ? '✓' : '✗';
          
          case 'email':
            return value ? String(value) : '';
          
          case 'url':
            return value ? String(value) : '';
          
          case 'select':
            if (field.options && Array.isArray(field.options)) {
              const option = field.options.find(opt => 
                typeof opt === 'string' ? opt === value : opt.value === value
              );
              return typeof option === 'string' ? option : option?.label || String(value || '');
            }
            return String(value || '');
          
          case 'relation':
            // Pour les relations, vous pourriez avoir besoin de données supplémentaires
            return String(value || '');
          
          case 'number':
            return value !== undefined && value !== null ? String(value) : '';
          
          default:
            return String(value || '');
        }
      }
    }));
}

// Fonction utilitaire pour créer des accesseurs de formulaire dynamiques
export function createFormAccessors<T extends Record<string, unknown>>(
  data: T,
  fields: FieldConfig[]
) {
  const accessor = createDynamicAccessor();
  
  return {
    // Obtenir la valeur d'un champ
    getFieldValue: (fieldKey: string) => {
      return accessor.getValue(data, fieldKey);
    },
    
    // Définir la valeur d'un champ
    setFieldValue: (fieldKey: string, value: unknown) => {
      accessor.setValue(data, fieldKey, value);
    },
    
    // Obtenir toutes les valeurs des champs visibles dans le formulaire
    getFormValues: () => {
      const values: Record<string, unknown> = {};
      fields
        .filter(field => field.display?.showInForm !== false)
        .forEach(field => {
          values[field.key] = accessor.getValue(data, field.key);
        });
      return values;
    },
    
    // Valider les champs requis
    validateRequired: () => {
      const errors: string[] = [];
      fields
        .filter(field => field.required && field.display?.showInForm !== false)
        .forEach(field => {
          const value = accessor.getValue(data, field.key);
          if (value === undefined || value === null || value === '') {
            errors.push(`${field.label} est requis`);
          }
        });
      return errors;
    }
  };
}

export function useZodValidation<T>(schema: ZodSchema<T>) {
  const validate = (data: unknown): { success: boolean; data?: T; errors?: string[] } => {
    try {
      const result = schema.parse(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      return { success: false, errors: ['Erreur de validation inconnue'] };
    }
  };

  const safeValidate = (data: unknown) => {
    const result = schema.safeParse(data);
    return result;
  };

  return { validate, safeValidate };
}

export function createAdminEntity<T extends z.ZodRawShape>(
  name: string,
  schema: ZodObject<T>,
  config?: Partial<AdminConfigWithChild<z.infer<ZodObject<T>>>>
): AdminConfigWithChild<z.infer<ZodObject<T>>> {
  const baseConfig = generateAdminConfig(schema, name);
  return {
    ...baseConfig,
    ...config,
    fields: config?.fields || baseConfig.fields,
    actions: { ...baseConfig.actions, ...config?.actions },
    ui: { ...baseConfig.ui, ...config?.ui },
    services: config?.services,
    queryKey: config?.queryKey || [name.toLowerCase()],
    parent: config?.parent,
    children: config?.children,
    formFields: config?.formFields,
  };
}

export function createEntitySchema<T extends z.ZodRawShape>(
  fields: T,
  relations?: Record<string, { entity: string; displayField?: string; multiple?: boolean }>
) {
  const schema = z.object(fields);
  
  if (relations) {
    const relatedFields: Record<string, z.ZodTypeAny> = {};
    Object.entries(relations).forEach(([key, relation]) => {
      relatedFields[key] = createField.relation(
        relation.entity, 
        relation.displayField, 
        relation.multiple
      );
    });
    
    return z.object({ ...fields, ...relatedFields });
  }
  
  return schema;
}

export interface CrudService<T extends Record<string, unknown>> {
  fetchItems: () => Promise<{ data: T[]; meta?: { total: number; totalPages: number } }>;
  createItem: (data: T) => Promise<T>;
  updateItem: (id: string, data: Partial<T>) => Promise<T>;
  deleteItem: (id: string) => Promise<void>;
}

export interface AdminConfigWithServices<T extends Record<string, unknown>> extends AdminConfigWithAccessor {
  services?: CrudService<T>;
  queryKey?: string[];
  parseData?: (item: Partial<T>) => Partial<T> | T;
  formFields?: string[];
}

export interface AdminConfigWithParent<T extends Record<string, unknown>> extends AdminConfigWithServices<T> {
  parent?: {
    key: string;
    routeParam: string;
    parentEntity?: string;
    parentLabel?: string;
  };
}

export interface AdminConfigWithChild<T extends Record<string, unknown>> extends AdminConfigWithParent<T> {
  children?: {
    route: string;
    label?: string;
    icon?: string;
    [key: string]: unknown;
  }[];
}

export function createMockService<T extends Record<string, unknown>>(
  initialData: T[] = []
): CrudService<T> {
  const data: T[] = [...initialData];
  
  return {
    fetchItems: async () => ({
      data: [...data],
      meta: { total: data.length, totalPages: Math.ceil(data.length / 20) }
    }),
    
    createItem: async (item: T) => {
      console.log('createMockService.createItem called with:', item);
      const newItem = { 
        ...item, 
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      } as T;
      console.log('Creating new item:', newItem);
      data.push(newItem);
      return newItem;
    },
    
    updateItem: async (id: string, updates: Partial<T>) => {
      console.log('createMockService.updateItem called with:', id, updates);
      const index = data.findIndex((item: T) => (item as Record<string, unknown>).id === id);
      if (index === -1) throw new Error('Item not found');
      data[index] = { ...data[index], ...updates, updatedAt: new Date() };
      return data[index];
    },
    
    deleteItem: async (id: string) => {
      console.log('createMockService.deleteItem called with:', id);
      const index = data.findIndex((item: T) => (item as Record<string, unknown>).id === id);
      if (index === -1) throw new Error('Item not found');
      data.splice(index, 1);
    }
  };
}

export class AdminCrudService<T extends Record<string, unknown>> extends BaseServiceImpl<T, T> {
  protected endpoints: ResourceEndpoints;

  constructor(baseEndpoint: string) {
    super();
    this.endpoints = {
      base: baseEndpoint,
      list: (qs: string) => `${baseEndpoint}${qs ? `?${qs}` : ''}`,
      create: baseEndpoint,
      detail: (slug: string) => `${baseEndpoint}/${slug}`,
      update: (slug: string) => `${baseEndpoint}/${slug}`,
      delete: (slug: string) => `${baseEndpoint}/${slug}`,
    };
  }

  protected serializeParams(filter: Filter): string {
    const params = new URLSearchParams();
    
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    
    return params.toString();
  }

 async fetchItems(filters?: Record<string, string | number | undefined>): Promise<{ data: T[]; meta?: { total: number; totalPages: number; page?: number; limit?: number } }> {
    try {
      // Ajout des filtres en query params
      const response = await this.list(filters || {});
      return {
        data: response.data,
        meta: {
          total: response.total,
          totalPages: response.limit ? Math.ceil(response.total / response.limit) : 1,
          page: response.page,
          limit: response.limit
        },
      };
    } catch (error) {
      console.error('AdminCrudService.fetchItems error:', error);
      throw error;
    }
  }

  async createItem(data: T): Promise<T> {
    try {
      const response = await this.create(data);
      return response.data || data;
    } catch (error) {
      console.error('AdminCrudService.createItem error:', error);
      throw error;
    }
  }

  async updateItem(id: string, data: Partial<T>): Promise<T> {
    try {
      const response = await this.update(id, data as T);
      return response.data || (data as T);
    } catch (error) {
      console.error('AdminCrudService.updateItem error:', error);
      throw error;
    }
  }

  async deleteItem(id: string): Promise<void> {
    await this.fetchData(this.endpoints.delete(id), {
      method: 'DELETE',
      credentials: 'include', 
    });
  }
}

export function createApiService<T extends Record<string, unknown>>(
  baseUrl: string
): CrudService<T> {
  const service = new AdminCrudService<T>(baseUrl);
  
  return {
    fetchItems: (filters?: Record<string, string | number | undefined>) => service.fetchItems(filters),
    createItem: (data: T) => service.createItem(data),
    updateItem: (id: string, data: Partial<T>) => service.updateItem(id, data),
    deleteItem: (id: string) => service.deleteItem(id),
  };
}
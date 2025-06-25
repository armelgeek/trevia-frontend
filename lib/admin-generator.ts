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

export function generateAdminConfig(schema: ZodObject<z.ZodRawShape>, title: string): AdminConfig {
  const fields: FieldConfig[] = [];
  
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
        if (key.includes('email')) field.type = 'email';
        else if (key.includes('url') || key.includes('website')) field.type = 'url';
        else if (key.includes('description') || key.includes('comment') || key.includes('content')) field.type = 'textarea';
        else if (key.includes('image') || key.includes('photo') || key.includes('avatar')) field.type = 'image';
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

    fields.push(field);
  });

  return {
    title,
    fields,
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
  config?: Partial<AdminConfigWithServices<z.infer<ZodObject<T>>>>
): AdminConfigWithServices<z.infer<ZodObject<T>>> {
  const baseConfig = generateAdminConfig(schema, name);
  
  return {
    ...baseConfig,
    ...config,
    fields: config?.fields || baseConfig.fields,
    actions: { ...baseConfig.actions, ...config?.actions },
    ui: { ...baseConfig.ui, ...config?.ui },
    services: config?.services,
    queryKey: config?.queryKey || [name.toLowerCase()],
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

export interface AdminConfigWithServices<T extends Record<string, unknown>> extends AdminConfig {
  services?: CrudService<T>;
  queryKey?: string[];
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

 async fetchItems(): Promise<{ data: T[]; meta?: { total: number; totalPages: number } }> {
    try {
      const response = await this.list({});
      return {
        data: response.data,
        meta: {
          total: response.meta.pagination.total,
          totalPages: response.meta.pagination.pageCount,
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
    try {
      await this.remove(id);
    } catch (error) {
      console.error('AdminCrudService.deleteItem error:', error);
      throw error;
    }
  }
}

export function createApiService<T extends Record<string, unknown>>(
  baseUrl: string
): CrudService<T> {
  const service = new AdminCrudService<T>(baseUrl);
  
  return {
    fetchItems: () => service.fetchItems(),
    createItem: (data: T) => service.createItem(data),
    updateItem: (id: string, data: Partial<T>) => service.updateItem(id, data),
    deleteItem: (id: string) => service.deleteItem(id),
  };
}

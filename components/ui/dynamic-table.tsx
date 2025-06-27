'use client';

import React from 'react';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { FieldConfig, AdminConfig } from '@/lib/admin-generator';
import { toast } from 'sonner';
import { ZodType } from 'zod';

export interface AdminConfigWithParseEdit<T = Record<string, unknown>> extends AdminConfig {
  parseData?: (item: Record<string, unknown>) => T;
}

export function generateTableColumns<T extends Record<string, unknown>>(
  config: AdminConfigWithParseEdit<T>,
  onEdit?: (item: T) => void,
  onDelete?: (item: T) => void,
  schema?: ZodType<T>
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [];

  //console.log('[generateTableColumns] Config fields:', config.fields);

  config.fields
    .filter(field => field.display?.showInTable !== false)
    .sort((a, b) => (a.display?.order || 0) - (b.display?.order || 0))
    .forEach(field => {
      // console.log(`[generateTableColumns] Adding column for field: ${field.key}, type: ${field.type}`);
      columns.push({
        accessorKey: field.key,
        header: field.label,
        cell: ({ row }) => {
          let value = row.getValue(field.key);
          // Fallback : si la valeur n'est pas trouvée, on tente de la récupérer dans row.original via dot notation (clé simple ou imbriquée)
          if ((value === undefined || value === null) && row.original && typeof row.original === 'object') {
            const keys = field.key.split('.');
            let nested: unknown = row.original;
            for (const k of keys) {
              if (nested && typeof nested === 'object' && k in nested) {
                nested = (nested as Record<string, unknown>)[k];
              } else {
                nested = undefined;
                break;
              }
            }
            value = nested;
          }
          return renderCellValue(value, field);
        },
      });
    });

  // Ajouter la colonne d'actions si des actions sont configurées
  if (config.actions.update || config.actions.delete) {
    columns.push({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {config.actions.update && onEdit && (
                <DropdownMenuItem onClick={() => {
                  let parsed: T | undefined;
                  if (config.parseData) {
                    try {
                      parsed = config.parseData(item);
                    } catch (e) {
                      toast.error('Erreur lors du parsing custom de l’item.');
                      console.error('parseData error:', e, item);
                      return;
                    }
                  } else {
                    parsed = item as T;
                  }
                  onEdit(parsed);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
              )}
              {config.actions.delete && onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(item)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  }

  return columns;
}

function renderCellValue(value: unknown, field: FieldConfig): React.ReactNode {

  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">-</span>;
  }

  switch (field.type) {
    case 'boolean':
      return (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Oui' : 'Non'}
        </Badge>
      );

    case 'date':
      // console.log(`[renderCellValue] Processing date field ${field.key}:`, value);
      try {
        // Gestion des différents types de valeurs de date
        let date: Date;
        if (value instanceof Date) {
          date = value;
        } else if (typeof value === 'string' || typeof value === 'number') {
          date = new Date(value);
        } else {
          // console.error(`[renderCellValue] Invalid date type for ${field.key}:`, typeof value, value);
          return <span className="text-muted-foreground">Date invalide</span>;
        }

        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
          // console.error(`[renderCellValue] Invalid date value for ${field.key}:`, date);
          return <span className="text-muted-foreground">Date invalide</span>;
        }

        const formattedDate = format(date, 'dd/MM/yyyy');
        //console.log(`[renderCellValue] Formatted date for ${field.key}:`, formattedDate);
        return formattedDate;
      } catch (error) {
        console.error('Error formatting date:', error, value);
        return <span className="text-muted-foreground">Date invalide</span>;
      }

    case 'email':
      return (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {value as string}
        </a>
      );

    case 'url':
      return (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {value as string}
        </a>
      );

    case 'image':
      return (
        <div className="flex items-center">
          <Image
            src={value as string}
            alt="Image"
            width={32}
            height={32}
            className="h-8 w-8 rounded object-cover"
            onError={() => {
              console.error('Image failed to load:', value);
            }}
          />
        </div>
      );

    case 'textarea':
    case 'rich-text':
      const text = value as string;
      return (
        <div className="max-w-xs truncate" title={text}>
          {text}
        </div>
      );

    case 'select':
      return (
        <Badge variant="outline">
          {value as string}
        </Badge>
      );

    case 'number':
      return (
        <span className="font-mono">
          {typeof value === 'number' ? value.toLocaleString() : String(value || '')}
        </span>
      );

    case 'relation':
      return (
        <Badge variant="outline">
          {value as string}
        </Badge>
      );

    default:
      return value as string;
  }
}

import { ZodObject, ZodRawShape } from 'zod';

function coerceItemWithSchema<T extends Record<string, unknown>>(item: Record<string, unknown>, schema: ZodType<T>): Record<string, unknown> {
  if (!('shape' in schema)) return item;
  const zodObject = schema as unknown as ZodObject<ZodRawShape>;
  const shape = zodObject.shape;
  console.log('shape', shape);
  const result: Record<string, unknown> = { ...item };
  for (const key in shape) {
    if (!(key in item)) continue;
    const field = shape[key];
    // Zod types : ZodNumber, ZodDate, ZodBoolean, ZodArray, ZodObject, etc.
    if (field?._def?.typeName === 'ZodNumber') {
      result[key] = typeof item[key] === 'string' ? Number(item[key]) : item[key];
    } else if (field?._def?.typeName === 'ZodDate') {
      result[key] = typeof item[key] === 'string' ? new Date(item[key] as string) : item[key];
    } else if (field?._def?.typeName === 'ZodBoolean') {
      if (typeof item[key] === 'string') {
        result[key] = item[key] === 'true' || item[key] === '1';
      }
    }
    // Pour les arrays, objets imbriqués, etc. : à adapter si besoin
  }
  return result;
}

export { renderCellValue };

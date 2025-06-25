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

export function generateTableColumns<T extends Record<string, unknown>>(
  config: AdminConfig,
  onEdit?: (item: T) => void,
  onDelete?: (item: T) => void
): ColumnDef<T>[] {
  const columns: ColumnDef<T>[] = [];

  console.log('[generateTableColumns] Config fields:', config.fields);

  config.fields
    .filter(field => field.display?.showInTable !== false)
    .sort((a, b) => (a.display?.order || 0) - (b.display?.order || 0))
    .forEach(field => {
      console.log(`[generateTableColumns] Adding column for field: ${field.key}, type: ${field.type}`);
      columns.push({
        accessorKey: field.key,
        header: field.label,
        cell: ({ row }) => {
          const value = row.getValue(field.key);
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
                <DropdownMenuItem onClick={() => onEdit(item)}>
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
  console.log(`[renderCellValue] Field: ${field.key}, Type: ${field.type}, Value:`, value, typeof value);
  
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
      console.log(`[renderCellValue] Processing date field ${field.key}:`, value);
      try {
        // Gestion des différents types de valeurs de date
        let date: Date;
        if (value instanceof Date) {
          date = value;
        } else if (typeof value === 'string' || typeof value === 'number') {
          date = new Date(value);
        } else {
          console.error(`[renderCellValue] Invalid date type for ${field.key}:`, typeof value, value);
          return <span className="text-muted-foreground">Date invalide</span>;
        }
        
        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
          console.error(`[renderCellValue] Invalid date value for ${field.key}:`, date);
          return <span className="text-muted-foreground">Date invalide</span>;
        }
        
        const formattedDate = format(date, 'dd/MM/yyyy');
        console.log(`[renderCellValue] Formatted date for ${field.key}:`, formattedDate);
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

export { renderCellValue };

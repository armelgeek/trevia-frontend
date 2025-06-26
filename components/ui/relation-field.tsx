'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import type { FieldConfig } from '@/lib/admin-generator';
import { API_URL } from '@/shared/lib/config/api';

// Type pour les éléments de relation
interface RelationItem {
  id: string;
  name?: string;
  title?: string;
  label?: string;
  [key: string]: unknown;
}

interface RelationFieldProps {
  field: FieldConfig;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  className?: string;
}

// Service générique pour charger les données de relation
async function fetchRelationData(entity: string) {
  try {
    const response = await fetch(`${API_URL}/api/${entity}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${entity}`);
    }
    const data = await response.json();
    return data.data || data; // Support pour différents formats de réponse
  } catch (error) {
    console.error(`Error fetching ${entity}:`, error);
    return [];
  }
}

export function RelationField({ field, value, onChange, className }: RelationFieldProps) {
  const { relation } = field;
  
  const { data: relationData = [], isLoading } = useQuery({
    queryKey: ['relations', relation?.entity || 'none'],
    queryFn: () => relation ? fetchRelationData(relation.entity) : Promise.resolve([]),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!relation, // Désactiver la query si pas de relation
  });
  
  if (!relation) {
    return null;
  }

  const handleSingleSelect = (selectedValue: string) => {
    onChange(selectedValue);
  };

  const handleMultipleSelect = (selectedValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (!currentValues.includes(selectedValue)) {
      onChange([...currentValues, selectedValue]);
    }
  };

  const handleRemoveFromMultiple = (valueToRemove: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    onChange(currentValues.filter(v => v !== valueToRemove));
  };

  const getDisplayName = (item: RelationItem): string => {
    return String(item[relation.displayField] || item.name || item.title || item.id || 'Unknown');
  };

  if (relation.multiple) {
    const selectedValues = Array.isArray(value) ? value : [];
    const selectedItems = relationData.filter((item: RelationItem) => 
      selectedValues.includes(item.id)
    );

    return (
      <div className={cn('space-y-2', className)}>
        {/* Selected items */}
        {selectedItems.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item: RelationItem) => (
              <Badge key={item.id} variant="secondary" className="flex items-center gap-1">
                {getDisplayName(item)}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemoveFromMultiple(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Selector */}
        <Select onValueChange={handleMultipleSelect}>
          <SelectTrigger>
            <SelectValue 
              placeholder={
                isLoading 
                  ? `Chargement des ${relation.entity}...`
                  : `Ajouter ${relation.entity}`
              } 
            />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <SelectItem value="loading" disabled>
                Chargement...
              </SelectItem>
            ) : relationData.length === 0 ? (
              <SelectItem value="empty" disabled>
                Aucun {relation.entity} disponible
              </SelectItem>
            ) : (
              relationData
                .filter((item: RelationItem) => !selectedValues.includes(item.id))
                .map((item: RelationItem) => (
                  <SelectItem key={item.id} value={item.id}>
                    {getDisplayName(item)}
                  </SelectItem>
                ))
            )}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Single relation
  return (
    <Select onValueChange={handleSingleSelect} value={value as string}>
      <SelectTrigger className={className}>
        <SelectValue 
          placeholder={
            isLoading 
              ? `Chargement des ${relation.entity}...`
              : `Sélectionner ${relation.entity}`
          } 
        />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <SelectItem value="loading" disabled>
            Chargement...
          </SelectItem>
        ) : relationData.length === 0 ? (
          <SelectItem value="empty" disabled>
            Aucun {relation.entity} disponible
          </SelectItem>
        ) : (
          <>
            <SelectItem value="">
              Aucun
            </SelectItem>
            {relationData.map((item: RelationItem) => (
              <SelectItem key={item.id} value={item.id}>
                {getDisplayName(item)}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
}

// Hook pour utiliser les relations
export function useRelationData(entity: string) {
  return useQuery({
    queryKey: ['relations', entity],
    queryFn: () => fetchRelationData(entity),
    staleTime: 5 * 60 * 1000,
  });
}

// Composant d'affichage pour les relations dans les tableaux
interface RelationDisplayProps {
  relationData: RelationItem[];
  displayField: string;
  className?: string;
}

export function RelationDisplay({ relationData, displayField, className }: RelationDisplayProps) {
  if (!relationData || relationData.length === 0) {
    return <span className="text-muted-foreground">-</span>;
  }

  if (relationData.length === 1) {
    return (
      <Badge variant="outline" className={className}>
        {String(relationData[0][displayField] || relationData[0].name || relationData[0].id || 'Unknown')}
      </Badge>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {relationData.slice(0, 2).map((item, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {String(item[displayField] || item.name || item.id || 'Unknown')}
        </Badge>
      ))}
      {relationData.length > 2 && (
        <Badge variant="secondary" className="text-xs">
          +{relationData.length - 2}
        </Badge>
      )}
    </div>
  );
}

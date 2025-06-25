'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/shared/lib/utils';
import { RelationField } from './relation-field';
import type { FieldConfig, AdminConfig } from '@/lib/admin-generator';

interface DynamicFormProps<T = Record<string, unknown>> {
  config: AdminConfig;
  schema: z.ZodSchema<T>;
  initialData?: T;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onSuccess?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export function DynamicForm({
  config,
  schema,
  initialData,
  onSubmit,
  onSuccess,
  isSubmitting = false,
  className,
}: DynamicFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });

  // Réinitialiser le formulaire quand initialData change
  useEffect(() => {
    console.log('DynamicForm initialData changed:', initialData);
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Form submission started with data:', data);
    console.log('Form validation state:', form.formState.isValid);
    console.log('Form errors:', form.formState.errors);
    console.log('Is initial data present:', !!initialData);
    console.log('Initial data:', initialData);
    
    try {
      console.log('Calling onSubmit function...');
      await onSubmit(data);
      console.log('Form submission successful');
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderField = (field: FieldConfig) => {
    console.log('Rendering field:', field.key, 'showInForm:', field.display?.showInForm);
    
    if (!field.display?.showInForm) {
      console.log('Field', field.key, 'hidden from form');
      return null;
    }

    return (
      <FormField
        key={field.key}
        control={form.control}
        name={field.key}
        render={({ field: fieldProps }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              {renderFieldInput(field, fieldProps)}
            </FormControl>
            {field.description && (
              <FormDescription>{field.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderFieldInput = (fieldConfig: FieldConfig, fieldProps: {
    onChange: (value: unknown) => void;
    onBlur: () => void;
    value: unknown;
    disabled?: boolean;
  }) => {
    switch (fieldConfig.type) {
      case 'text':
      case 'email':
      case 'url':
        return (
          <Input
            type={fieldConfig.type === 'email' ? 'email' : fieldConfig.type === 'url' ? 'url' : 'text'}
            placeholder={fieldConfig.placeholder}
            value={(fieldProps.value as string) || ''}
            onChange={(e) => fieldProps.onChange(e.target.value)}
            onBlur={fieldProps.onBlur}
            disabled={fieldProps.disabled}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={fieldConfig.placeholder}
            value={(fieldProps.value as number) || ''}
            onChange={(e) => fieldProps.onChange(parseFloat(e.target.value) || 0)}
            onBlur={fieldProps.onBlur}
            disabled={fieldProps.disabled}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={fieldConfig.placeholder}
            value={(fieldProps.value as string) || ''}
            onChange={(e) => fieldProps.onChange(e.target.value)}
            onBlur={fieldProps.onBlur}
            disabled={fieldProps.disabled}
          />
        );

      case 'boolean':
        return (
          <Switch
            checked={(fieldProps.value as boolean) || false}
            onCheckedChange={fieldProps.onChange}
          />
        );

      case 'select':
        return (
          <Select
            onValueChange={fieldProps.onChange}
            value={(fieldProps.value as string) || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder={fieldConfig.placeholder || `Sélectionner ${fieldConfig.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.options?.map((option) => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );

      case 'date':
        let dateValue: Date | undefined;
        
        // Conversion sécurisée de la valeur en Date
        if (fieldProps.value instanceof Date) {
          dateValue = fieldProps.value;
        } else if (fieldProps.value && typeof fieldProps.value === 'string') {
          try {
            dateValue = new Date(fieldProps.value);
            // Vérifier si la date est valide
            if (isNaN(dateValue.getTime())) {
              dateValue = undefined;
            }
          } catch {
            dateValue = undefined;
          }
        } else if (fieldProps.value && typeof fieldProps.value === 'number') {
          try {
            dateValue = new Date(fieldProps.value);
            if (isNaN(dateValue.getTime())) {
              dateValue = undefined;
            }
          } catch {
            dateValue = undefined;
          }
        }
        
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateValue && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue ? (
                  format(dateValue, 'PPP')
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(date) => fieldProps.onChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case 'image':
      case 'file':
        return (
          <div className="space-y-2">
            <Input
              type="file"
              accept={fieldConfig.type === 'image' ? 'image/*' : '*'}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Ici vous pouvez implémenter votre logique d'upload
                  fieldProps.onChange(file.name); // Temporaire
                }
              }}
            />
            {typeof fieldProps.value === 'string' && fieldProps.value && (
              <p className="text-sm text-muted-foreground">
                Fichier sélectionné: {fieldProps.value}
              </p>
            )}
          </div>
        );

      case 'rich-text':
        return (
          <Textarea
            placeholder={fieldConfig.placeholder}
            className="min-h-[120px]"
            value={(fieldProps.value as string) || ''}
            onChange={(e) => fieldProps.onChange(e.target.value)}
            onBlur={fieldProps.onBlur}
            disabled={fieldProps.disabled}
          />
        );

      case 'relation':
        return (
          <RelationField
            field={fieldConfig}
            value={fieldProps.value as string | string[] | undefined}
            onChange={fieldProps.onChange}
          />
        );

      default:
        return (
          <Input
            placeholder={fieldConfig.placeholder}
            value={(fieldProps.value as string) || ''}
            onChange={(e) => fieldProps.onChange(e.target.value)}
            onBlur={fieldProps.onBlur}
            disabled={fieldProps.disabled}
          />
        );
    }
  };

  const renderFormSections = () => {
    console.log('Available fields:', config.fields.map(f => ({ key: f.key, showInForm: f.display?.showInForm })));
    
    if (config.ui?.form?.layout === 'sections' && config.ui.form.sections) {
      return config.ui.form.sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h3 className="text-lg font-medium">{section.title}</h3>
          <div className="grid gap-4">
            {section.fields.map((fieldKey) => {
              const field = config.fields.find(f => f.key === fieldKey);
              return field ? renderField(field) : null;
            })}
          </div>
        </div>
      ));
    }

    return (
      <div className="grid gap-4">
        {config.fields
          .filter(field => field.display?.showInForm !== false)
          .sort((a, b) => (a.display?.order || 0) - (b.display?.order || 0))
          .map(renderField)}
      </div>
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('space-y-6', className)}
      >
        {renderFormSections()}

        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => console.log('Submit button clicked, form valid:', form.formState.isValid, 'errors:', form.formState.errors)}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

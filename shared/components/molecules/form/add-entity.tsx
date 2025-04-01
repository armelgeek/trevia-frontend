'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface EntityFormProps<T> {
  /**
   * The title of the entity (e.g., "Category", "Product", etc.)
   */
  title: string;
  /**
   * Optional description shown in the sheet header
   */
  description?: string;
  /**
   * Initial data for the form
   */
  initialData: T | null;
  /**
   * Function to handle the form submission
   */
  onSubmit: (data: T) => Promise<void>;
  /**
   * Loading state for the form submission
   */
  isSubmitting?: boolean;
  /**
   * The form component to render
   */
  Form: React.ComponentType<{
    initialData: T | null;
    onSubmit: (data: T) => Promise<void>;
    isSubmitting?: boolean;
  }>;
  queryKey: readonly string[] | string[];
  mode?: 'add' | 'edit';
  buttonLabel?: string;
  buttonVariant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  className?: string;
}

export function EntityForm<T>({
  title,
  description = "Click save when you're done.",
  initialData,
  onSubmit,
  isSubmitting = false,
  Form,
  queryKey,
  mode = 'add',
  buttonLabel,
  buttonVariant = 'default',
  className = "max-w w-full md:max-w-[500px]"
}: EntityFormProps<T>) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (input: T) => {
    try {
      await onSubmit(input);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isEditMode = mode === 'edit';
  const actionText = isEditMode ? 'Edit' : 'Add';

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <Button variant={buttonVariant}>
          {isEditMode ? (
            <Pencil
              className="-ms-1 me-2"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          ) : (
            <Plus
              className="-ms-1 me-2"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
          {buttonLabel || `${actionText} ${title}`}
        </Button>
      </SheetTrigger>
      <SheetContent className={className}>
        <SheetHeader>
          <SheetTitle>{actionText} {title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Form
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

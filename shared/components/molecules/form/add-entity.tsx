'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ModalFormProps<T> {

  title: string;
  customTitle?: string;
  description?: string;
  initialData: T | null;
  onSubmit: (data: T) => Promise<void>;
  isSubmitting?: boolean;
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
  className = "max-w-md"
}: ModalFormProps<T>) {
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        {!isEditMode ? (
          <Button variant={buttonVariant}>
            <Plus
              className="mr-2"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {buttonLabel || `${actionText} ${title}`}
          </Button>
        ) : (
          <div className='flex flex-row gap-2 items-center ml-2 cursor-pointer'> 
            <Edit
              size={14}
              strokeWidth={2}
              className="mr-2 text-sm"
              aria-hidden="true"
            />
            {buttonLabel || actionText}
          </div>
        )}
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{actionText} {title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
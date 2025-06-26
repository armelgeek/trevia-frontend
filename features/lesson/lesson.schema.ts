import { z } from 'zod';
import { createField } from '@/lib/admin-generator';

export const LessonSchema = z.object({
  id: createField.string({ label: 'ID', display: { showInForm: false } }).optional(),
  title: createField.string({ label: 'Titre', description: 'Le titre est requis' }),
  description: createField.textarea({ label: 'Description', description: 'Description', display: { showInForm: true,showInTable: true } }),
  order: createField.number({ label: 'Ordre', description: 'Ordre', display: { showInForm: false,showInTable: false } }).optional(),
  moduleId: createField.string({ label: 'Module', display: { showInForm: false,showInTable: false } }).optional(), 
});

export type Lesson = z.infer<typeof LessonSchema>;

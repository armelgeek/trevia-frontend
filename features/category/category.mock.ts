import { Category } from './category.schema';
import { createMockService } from '@/lib/admin-generator';

export const mockCategories: Category[] = [
  { id: '1', name: 'Électronique', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-01-15') },
  { id: '2', name: 'Vêtements', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-01-12') },
  { id: '3', name: 'Maison & Jardin', createdAt: new Date('2024-01-05'), updatedAt: new Date('2024-01-08') },
  { id: '4', name: 'Livres', createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-03') },
];

export const categoryService = createMockService(mockCategories);

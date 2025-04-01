import { z } from 'zod';

import { CategoryFormSchema, CategorySelectSchema } from './category.schema';
import { PaginatedResponse } from '@/shared/lib/types/pagination';

export type Category = z.infer<typeof CategorySelectSchema>;

export type CategoryPayload = z.infer<typeof CategoryFormSchema>;

export type PaginatedPage = PaginatedResponse<Category>;
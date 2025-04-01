import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Category, CategoryPayload } from '../config/category.type';

const categorySearch = createSearchParams();
export class CategoryServiceImpl extends BaseServiceImpl<Category, CategoryPayload> {
  protected endpoints = API_ENDPOINTS.categories;
  protected serializeParams(filter: Filter): string {
    return categorySearch.serialize(filter);
  }
}
export const categoryService = new CategoryServiceImpl();
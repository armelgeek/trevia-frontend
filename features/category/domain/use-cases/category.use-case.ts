import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { categories } from '@/drizzle/schema/categories';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Category, CategoryPayload } from '../../config/category.type';
import { CategoryFormSchema } from '../../config/category.schema';

export const categoryUseCase = new UseCase<Category, CategoryPayload, unknown>({
  name: 'Category',
  schema: CategoryFormSchema,
  operations: {
    async create(data: CategoryPayload) {
      const slug = slugify(data.name, { lower: true });
      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.slug, slug),
      });
      
      if (existingCategory) {
        throw new Error('Category with this name already exists');
      }
      const [category] = await db
        .insert(categories)
        .values({ ...data, slug })
        .returning();
        
      return category;
    },
    
    async getById(slug: string) {
      const category = await db.query.categories.findFirst({
        where: eq(categories.slug, slug)
      });
      return category ?? null;
    },
    
    async update(slug: string, data: CategoryPayload) {
      await db
        .update(categories)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(categories.slug, slug));
      
      return { message: 'Category updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(categories)
        .where(eq(categories.slug, slug));
      
      return { message: 'Category deleted successfully' };
    },
    
    async list(filter: Filter) {
      const searchColumns = ['name'];
      const sortColumns = ['name'];

      const whereClause = {
        search: filter.search
      };
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(categories)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .from(categories)
        .where(conditions)
        .orderBy(sort)
        .limit(itemsPerPage)
        .offset(offset);

      return {
        data,
        meta: {
          pagination,
        },
      };
    }
  }
});

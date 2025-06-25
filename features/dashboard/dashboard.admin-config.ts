import { dashboardSchema } from '@/features/dashboard/dashboard.schema';
import { dashboardService } from '@/features/dashboard/dashboard.service';
import { createAdminEntity } from '@/lib/admin-generator';

export const DashboardAdminConfig = createAdminEntity('Dashboard', dashboardSchema, {
  description: 'Accédez aux statistiques et alertes administrateur',
  icon: '📊',
  actions: { create: false, read: true, update: false, delete: false, bulk: false, export: false },
  services: {
    fetchItems: async () => {
      const res = await dashboardService.get('');
      return { data: [res.data as { stats: { value: number; label: string; }[]; alerts: { title: string; description: string; }[]; }], meta: res.meta };
    },
    createItem: async () => { throw new Error('Not implemented'); },
    updateItem: async () => { throw new Error('Not implemented'); },
    deleteItem: async () => { throw new Error('Not implemented'); },
  },
  queryKey: ['dashboard'],
});

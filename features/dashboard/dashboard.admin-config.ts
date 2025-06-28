import { dashboardSchema } from '@/features/dashboard/dashboard.schema';
import { dashboardService } from '@/features/dashboard/dashboard.service';
import { createAdminEntity, registerAdminEntity } from '@/lib/admin-generator';

export const DashboardAdminConfig = createAdminEntity('Dashboard', dashboardSchema, {
  description: 'Accédez aux statistiques et alertes administrateur',
  icon: '📊',
  actions: { create: false, read: true, update: false, delete: false, bulk: false},
  services: dashboardService,
  queryKey: ['dashboard'],
});
registerAdminEntity('dashboard', DashboardAdminConfig, '/admin/dashboard', '🚗',1);

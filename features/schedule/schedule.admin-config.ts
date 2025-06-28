import { createAdminEntity } from '@/lib/admin-generator';
import { scheduleSchema } from './schedule.schema';
import { scheduleService } from './schedule.service';

export const ScheduleAdminConfig = createAdminEntity('Horaire', scheduleSchema, {
  description: 'Gérez les horaires des voyages',
  icon: '⏰',
  actions: { create: true, read: true, update: true, delete: true, bulk: false },
  services: scheduleService,
  queryKey: ['schedules'],
  formFields: [
    'departureTime',
    'arrivalTime',
    'status'
  ],
  parent: {
    key: 'tripId',
    routeParam: 'tripId',
    parentEntity: 'trips',
    parentLabel: 'Voyage',
  },
  ui:{
    form:{
      layout: 'two-cols'
    }
  }
});

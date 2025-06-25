import { z } from 'zod';

export const dashboardSchema = z.object({
  stats: z.array(z.object({
    label: z.string(),
    value: z.number()
  })),
  alerts: z.array(z.object({
    title: z.string(),
    description: z.string()
  }))
});

export type Dashboard = z.infer<typeof dashboardSchema>;

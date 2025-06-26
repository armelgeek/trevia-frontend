import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Le nom est requis').describe('Nom'),
  description: z.string().optional().describe('Description'),
});

export type Module = z.infer<typeof ModuleSchema>;

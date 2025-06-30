import { z } from 'zod';

export const citySchema = z.string().min(1);
export type City = z.infer<typeof citySchema>;

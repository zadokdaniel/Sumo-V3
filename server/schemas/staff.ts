import { z } from 'zod';

export const staffSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  startTime: z.string().datetime().nullable(),
  endTime: z.string().datetime().nullable(),
  breaks: z.number().int().min(0).nullable(),
  expenses: z.number().min(0).default(0),
});

export const updateStaffSchema = staffSchema.partial();

export type CreateStaffInput = z.infer<typeof staffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
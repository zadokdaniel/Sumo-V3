import { z } from 'zod';

export const shiftSchema = z.object({
  date: z.string().datetime(),
  timePeriod: z.enum(['AM', 'PM']),
  netTips: z.number().min(0),
  rules: z.object({
    intervals: z.number().int().min(5).max(60),
    multiplierValue: z.number().min(1).max(2),
    multiplierEnabled: z.boolean(),
    provisionValue: z.number().min(0).max(0.2),
    provisionThreshold: z.number().min(0),
    provisionEnabled: z.boolean(),
  }),
});

export const updateShiftSchema = shiftSchema.partial();

export type CreateShiftInput = z.infer<typeof shiftSchema>;
export type UpdateShiftInput = z.infer<typeof updateShiftSchema>;
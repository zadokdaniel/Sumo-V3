import { z } from 'zod';

export const staffTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  source: z.enum(['provision', 'tips']),
  calculationMethod: z.enum(['divided', 'hours']),
  hourlyAdjustmentMethod: z.enum(['fixed', 'rational', 'null']).nullable(),
  adjustmentValue: z.number().nullable(),
  minimumWageThreshold: z.number()
});

export const staffMemberSchema = z.object({
  name: z.string(),
  type: z.string(),
  start: z.string().nullable(),
  end: z.string().nullable(),
  breaks: z.number().nullable(),
  expenses: z.number()
});

export const shiftRulesSchema = z.object({
  intervals: z.number(),
  multiplier: z.object({
    value: z.number(),
    isApplicable: z.boolean()
  }),
  provision: z.object({
    value: z.number(),
    hourlyMinThreshold: z.number(),
    isApplicable: z.boolean()
  })
});

export const shiftSchema = z.object({
  id: z.string(),
  date: z.string(),
  timePeriod: z.enum(['am', 'pm']),
  netTips: z.number(),
  rules: shiftRulesSchema,
  staffTypes: z.array(staffTypeSchema),
  staff: z.array(staffMemberSchema)
});

export type StaffType = z.infer<typeof staffTypeSchema>;
export type StaffMember = z.infer<typeof staffMemberSchema>;
export type ShiftRules = z.infer<typeof shiftRulesSchema>;
export type Shift = z.infer<typeof shiftSchema>;
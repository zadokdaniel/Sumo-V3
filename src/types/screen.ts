import { z } from "zod";

export const screenSizeSchema = z.object({
  isExtraSmall: z.boolean(),
  isMobile: z.boolean(),
  isTablet: z.boolean(),
  isDesktop: z.boolean(),
  isExtraLarge: z.boolean(),
  width: z.number(),
  height: z.number(),
});

export type ScreenSize = z.infer<typeof screenSizeSchema>;

export const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1440,
} as const;
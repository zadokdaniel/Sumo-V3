import { useScreenSize } from './useScreenSize';
import { breakpoints } from '../types/screen';

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(breakpoint: Breakpoint, operator: 'up' | 'down' = 'up'): boolean {
  const { width } = useScreenSize();
  const breakpointValue = breakpoints[breakpoint];

  return operator === 'up' 
    ? width >= breakpointValue
    : width < breakpointValue;
}
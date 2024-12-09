import { ScreenSize, breakpoints } from '../../types/screen';

export function simulateViewport(width: number, height: number): ScreenSize {
  return {
    isExtraSmall: width < breakpoints.xs,
    isMobile: width >= breakpoints.xs && width < breakpoints.sm,
    isTablet: width >= breakpoints.sm && width < breakpoints.md,
    isDesktop: width >= breakpoints.md && width < breakpoints.lg,
    isExtraLarge: width >= breakpoints.lg,
    width,
    height,
  };
}

export const commonViewports = {
  // Mobile devices
  iphoneSE: { width: 320, height: 568 },
  iphone12: { width: 390, height: 844 },
  pixel5: { width: 393, height: 851 },
  
  // Tablets
  ipadMini: { width: 768, height: 1024 },
  ipadPro: { width: 1024, height: 1366 },
  
  // Laptops
  laptop: { width: 1280, height: 800 },
  laptopL: { width: 1440, height: 900 },
  
  // Desktops
  desktop: { width: 1920, height: 1080 },
  desktop4K: { width: 2560, height: 1440 },
};

export function isBreakpointMatch(
  width: number,
  breakpoint: keyof typeof breakpoints,
  operator: 'up' | 'down' = 'up'
): boolean {
  const breakpointValue = breakpoints[breakpoint];
  return operator === 'up' 
    ? width >= breakpointValue
    : width < breakpointValue;
}
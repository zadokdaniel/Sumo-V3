import { useState, useEffect, useCallback } from 'react';
import { ScreenSize, breakpoints } from '../types/screen';

function getScreenSize(): ScreenSize {
  const width = window.innerWidth;
  const height = window.innerHeight;

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

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  const handleResize = useCallback(() => {
    let timeoutId: number | null = null;

    if (timeoutId) {
      window.cancelAnimationFrame(timeoutId);
    }

    timeoutId = window.requestAnimationFrame(() => {
      setScreenSize(getScreenSize());
    });
  }, []);

  useEffect(() => {
    // Initial size check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return screenSize;
}
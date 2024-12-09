import React from 'react';
import { useScreenSize } from '../hooks/useScreenSize';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function ScreenSizeExample() {
  const screenSize = useScreenSize();
  const isDesktopUp = useBreakpoint('md', 'up');
  const isMobileDown = useBreakpoint('sm', 'down');

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Screen Size Information</h2>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-600">Extra Small:</div>
          <div className="text-sm font-medium">{screenSize.isExtraSmall ? 'Yes' : 'No'}</div>
          
          <div className="text-sm text-gray-600">Mobile:</div>
          <div className="text-sm font-medium">{screenSize.isMobile ? 'Yes' : 'No'}</div>
          
          <div className="text-sm text-gray-600">Tablet:</div>
          <div className="text-sm font-medium">{screenSize.isTablet ? 'Yes' : 'No'}</div>
          
          <div className="text-sm text-gray-600">Desktop:</div>
          <div className="text-sm font-medium">{screenSize.isDesktop ? 'Yes' : 'No'}</div>
          
          <div className="text-sm text-gray-600">Extra Large:</div>
          <div className="text-sm font-medium">{screenSize.isExtraLarge ? 'Yes' : 'No'}</div>
        </div>

        <div className="border-t pt-2 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-600">Width:</div>
            <div className="text-sm font-medium">{screenSize.width}px</div>
            
            <div className="text-sm text-gray-600">Height:</div>
            <div className="text-sm font-medium">{screenSize.height}px</div>
          </div>
        </div>

        <div className="border-t pt-2 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-600">Desktop and up:</div>
            <div className="text-sm font-medium">{isDesktopUp ? 'Yes' : 'No'}</div>
            
            <div className="text-sm text-gray-600">Mobile and down:</div>
            <div className="text-sm font-medium">{isMobileDown ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
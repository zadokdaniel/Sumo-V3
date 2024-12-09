import { breakpoints } from '../../types/screen';

export interface ResponsiveTestCase {
  name: string;
  width: number;
  height: number;
  tests: Array<{
    component: string;
    checks: string[];
  }>;
}

export const testCases: ResponsiveTestCase[] = [
  {
    name: 'Mobile Portrait',
    width: 320,
    height: 568,
    tests: [
      {
        component: 'StaffDrawer',
        checks: [
          'Drawer should be full width',
          'Handle should be centered',
          'Content should be scrollable',
          'Backdrop should be visible when open'
        ]
      },
      {
        component: 'ShiftDetails',
        checks: [
          'Date and shift selector should stack vertically',
          'Complete button should be full width',
          'Relative date should align with selected date'
        ]
      }
    ]
  },
  {
    name: 'Mobile Landscape',
    width: 568,
    height: 320,
    tests: [
      {
        component: 'StaffDrawer',
        checks: [
          'Drawer height should adjust to viewport',
          'Content should be scrollable with smaller height',
          'Handle should remain accessible'
        ]
      }
    ]
  },
  {
    name: 'Tablet Portrait',
    width: 768,
    height: 1024,
    tests: [
      {
        component: 'StaffDrawer',
        checks: [
          'Drawer should be right-aligned with fixed width',
          'Should overlay main content',
          'Handle should be visible when collapsed'
        ]
      },
      {
        component: 'Layout',
        checks: [
          'Navigation should show full menu',
          'Content should have appropriate margins',
          'Grid layout should adjust columns'
        ]
      }
    ]
  },
  {
    name: 'Desktop',
    width: 1024,
    height: 768,
    tests: [
      {
        component: 'StaffPanel',
        checks: [
          'Should be fixed on right side',
          'Should scroll independently',
          'Should maintain full height'
        ]
      },
      {
        component: 'TipsInput',
        checks: [
          'Calculator should open in popover',
          'Grid should show all columns',
          'Numbers should be properly aligned'
        ]
      }
    ]
  }
];

export function getBreakpointName(width: number): string {
  if (width < breakpoints.xs) return 'xs';
  if (width < breakpoints.sm) return 'sm';
  if (width < breakpoints.md) return 'md';
  if (width < breakpoints.lg) return 'lg';
  return 'xl';
}

export function generateTestReport(results: Array<{
  case: ResponsiveTestCase;
  issues: Array<{
    component: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}>): string {
  return results
    .map(({ case: testCase, issues }) => {
      const breakpoint = getBreakpointName(testCase.width);
      return `
## ${testCase.name} (${breakpoint}: ${testCase.width}x${testCase.height})

${issues.length === 0 ? '✅ All tests passed' : `Issues found: ${issues.length}`}

${issues.map(({ component, issue, severity }) => `
- [${severity.toUpperCase()}] ${component}: ${issue}`).join('\n')}
`;
    })
    .join('\n');
}
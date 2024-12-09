export interface ComponentTest {
  name: string;
  selectors: {
    [key: string]: string;
  };
  expectations: {
    [key: string]: {
      mobile: string[];
      tablet: string[];
      desktop: string[];
    };
  };
}

export const componentTests: ComponentTest[] = [
  {
    name: 'StaffDrawer',
    selectors: {
      container: '[data-testid="staff-drawer"]',
      handle: '[data-testid="staff-drawer-handle"]',
      content: '[data-testid="staff-drawer-content"]',
      backdrop: '[data-testid="staff-drawer-backdrop"]',
    },
    expectations: {
      layout: {
        mobile: [
          'width: 100%',
          'position: fixed',
          'bottom: 0',
          'border-radius-top: 12px',
        ],
        tablet: [
          'width: 400px',
          'position: fixed',
          'right: 0',
          'bottom: 0',
        ],
        desktop: [
          'display: none',
        ],
      },
    },
  },
  {
    name: 'StaffPanel',
    selectors: {
      container: '[data-testid="staff-panel"]',
      list: '[data-testid="staff-list"]',
      addButton: '[data-testid="add-staff-button"]',
    },
    expectations: {
      layout: {
        mobile: [
          'display: none',
        ],
        tablet: [
          'display: none',
        ],
        desktop: [
          'display: block',
          'position: sticky',
          'top: 24px',
          'height: calc(100vh - 7rem)',
        ],
      },
    },
  },
];
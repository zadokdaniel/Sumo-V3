export * from './responsive';
export * from './viewport';
export * from './components';

export const responsiveTestingGuide = `
# Responsive Design Testing Guide

## Breakpoints
- Extra Small (xs): < 480px
- Mobile (sm): 480px - 767px
- Tablet (md): 768px - 1023px
- Desktop (lg): 1024px - 1439px
- Extra Large (xl): ≥ 1440px

## Key Components to Test

### StaffDrawer
- Mobile: Full-width drawer with bottom handle
- Tablet: Right-aligned drawer with fixed width
- Desktop: Hidden (replaced by StaffPanel)

### Layout
- Mobile: Single column, stacked elements
- Tablet: Two columns where appropriate
- Desktop: Three columns with fixed sidebar

### Navigation
- Mobile: Collapsed menu with drawer
- Tablet: Semi-collapsed with icons and labels
- Desktop: Full expanded navigation

## Testing Process
1. Test each breakpoint using common device sizes
2. Verify component behavior during transition
3. Check touch interactions on mobile/tablet
4. Verify keyboard accessibility
5. Test orientation changes
6. Check content overflow handling

## Common Issues to Watch
- Content overflow
- Touch target sizes
- Text readability
- Spacing consistency
- Animation performance
- Gesture handling
- Keyboard accessibility
`;
# UI/UX Coding Standards

## Component Library

### shadcn/ui Components Only
- **MANDATORY**: Use ONLY shadcn/ui components throughout the entire project
- **NO CUSTOM COMPONENTS**: Absolutely no custom components should be created
- If a required component doesn't exist in shadcn/ui, find an alternative combination of existing shadcn/ui components
- If a component is truly missing and critical, discuss with the team before creating any custom component

### Component Usage Guidelines
- Always import components from the shadcn/ui library
- Follow the documented usage patterns for each component
- Maintain consistency in component styling and behavior
- Use the same props and configurations across the application

## Date Formatting

### Date-FNS Library
- **MANDATORY**: All date formatting must be done using the `date-fns` library
- Never use native JavaScript Date methods for formatting in the UI
- Import required functions from `date-fns` as needed

### Format Specifications
Dates should be formatted exactly as follows:
- `1st Sep 2025`
- `2nd Aug 2025`
- `3rd Jan 2026`
- `4th Jun 2024`

### Implementation Example
```typescript
import { format } from 'date-fns';

const formatDate = (date: Date) => {
  // Use date-fns to format the date in the required format
  return format(date, 'do MMM yyyy');
};
```

## Styling Standards

### Tailwind CSS
- Use Tailwind CSS utility classes for styling
- Leverage the configured theme and color palette
- Maintain consistent spacing and typography throughout the application

### Dark Mode Support
- Ensure all components work properly in both light and dark modes
- Use Tailwind's dark mode variants where necessary
- Test components in both color schemes

## Accessibility

- Ensure all components meet accessibility standards
- Use proper semantic HTML elements
- Include appropriate ARIA attributes where needed
- Maintain proper color contrast ratios
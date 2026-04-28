# Layout Components

Layout components provide structural elements for organizing content and defining page hierarchy within the Neo Design System.

## Overview

This category includes foundational components designed for:

- **Content Organization**: Structural containers and navigation elements
- **Visual Hierarchy**: Headers, cards, and content wrappers
- **Navigation Structure**: Breadcrumbs and tab-based navigation
- **Content Presentation**: Placeholders and organized content display
- **Responsive Design**: Flexible layouts that adapt to different screen sizes

## Component Categories

### Navigation Structure
- **nck-breadcrumb** - Hierarchical navigation showing user location within the application
- **nck-tabs** - Tab-based navigation for organizing related content into sections
- **nck-header** - Page and section headers with consistent typography and hierarchy

### Content Organization
- **nck-card** - Flexible container component for grouping related information
- **nck-placeholder** - Empty state component for missing or loading content

## Usage Guidelines

### Accessibility Standards
All layout components follow WCAG AA standards with:
- Proper semantic HTML structure (header, nav, main, section, article)
- ARIA landmarks and navigation roles
- Keyboard navigation support (Tab, Arrow keys for tab navigation)
- Screen reader compatibility with proper heading hierarchy
- High contrast ratios for text and background elements
- Focus indicators for interactive elements

### Design Consistency
Components use consistent design tokens for:
- **Spacing**: Standardized margins, padding, and gap values
- **Colors**: Unified background, border, and text colors
- **Typography**: Consistent font families, sizes, and line heights for headers and content
- **Elevation**: Box shadows and layering for card components
- **Borders**: Consistent border radius and stroke weights

### Responsive Behavior
Layout components are designed to:
- Adapt to different screen sizes and orientations
- Maintain proper spacing and proportions across devices
- Support mobile-first responsive design patterns
- Preserve accessibility features across all breakpoints

## Quick Reference

| Component | Purpose | Use Case | Key Features |
|-----------|---------|----------|--------------|
| nck-header | Page/section titles | Page headers, section dividers | Typography hierarchy, flexible content |
| nck-card | Content grouping | Product cards, information panels | Elevation, flexible layout, actions |
| nck-breadcrumb | Navigation path | Location awareness, navigation | Hierarchical structure, clickable path |
| nck-tabs | Content sections | Organizing related content | Keyboard navigation, active states |
| nck-placeholder | Empty states | Loading states, missing content | Customizable messaging, loading indicators |

## Best Practices

### Component Selection
- Use **nck-header** for establishing clear page and section hierarchy
- Choose **nck-card** for grouping related content with clear boundaries
- Implement **nck-breadcrumb** for deep navigation structures
- Apply **nck-tabs** when content can be logically organized into sections
- Use **nck-placeholder** for empty states and loading conditions

### Layout Hierarchy
- Establish clear visual hierarchy with proper header levels
- Group related content using cards and containers
- Provide navigation context with breadcrumbs in deep structures
- Use tabs sparingly and ensure content is truly related
- Maintain consistent spacing between layout elements

### Content Strategy
- Keep header content concise and descriptive
- Design cards with clear action items when interactive
- Structure breadcrumbs to reflect actual navigation paths
- Limit tab count to maintain usability (typically 3-7 tabs)
- Provide meaningful placeholder content and loading states

## Component Integration

### Content Flow
Layout components work together to create cohesive page structures:
- **Headers** establish page context and hierarchy
- **Breadcrumbs** provide navigation context
- **Tabs** organize content sections
- **Cards** group related information and actions
- **Placeholders** handle empty and loading states

### State Management
- Maintain consistent states across layout components
- Handle loading states gracefully with placeholders
- Preserve navigation state in breadcrumbs and tabs
- Coordinate responsive behavior across all layout elements

## Related Documentation

- [Typography Guidelines](../typography.md)
- [Spacing Standards](../foundations.md)
- [Responsive Design](../responsive.md)
- [Navigation Patterns](../navigation-patterns.md)
- [Content Organization](../content-strategy.md)

## Component Integration

All layout components integrate seamlessly with:
- **Vue 3 Composition API** - Modern reactive patterns
- **Responsive Grid System** - Flexible layout foundations
- **Neo Design Token System** - Unified spacing and typography
- **Accessibility Standards** - WCAG AA compliance throughout

For detailed implementation examples and API documentation, explore the individual component pages within this category.
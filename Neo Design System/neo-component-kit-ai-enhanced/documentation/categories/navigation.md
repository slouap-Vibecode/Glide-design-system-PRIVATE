# Navigation Components

Navigation components help users move through content and understand their current location within the Neo Design System.

## Overview

This category includes components specifically designed for:

- **Content Navigation**: Moving between pages, sections, and data sets
- **Location Awareness**: Helping users understand where they are in the application
- **Information Architecture**: Supporting clear navigation patterns and user flows
- **Large Dataset Navigation**: Efficiently navigating through extensive content
- **Accessibility**: Full keyboard and screen reader navigation support

## Component Categories

### Pagination
- **nck-pagination** - Navigate through multi-page content with page numbers, previous/next controls, and jump-to-page functionality

## Usage Guidelines

### Accessibility Standards
All navigation components follow WCAG AA standards with:
- **Keyboard Navigation**: Full support for Tab, Enter, Space, and Arrow key navigation
- **Screen Reader Support**: Proper ARIA labels, live regions, and context announcements
- **Focus Management**: Clear focus indicators and logical tab order
- **Landmark Roles**: Appropriate ARIA navigation landmarks
- **State Announcements**: Clear communication of current page, total pages, and navigation actions
- **Skip Links**: Ability to skip navigation when appropriate

### Design Consistency
Components use consistent design tokens for:
- **Interactive States**: Hover, focus, active, and disabled states
- **Typography**: Consistent font families and sizes for navigation elements
- **Spacing**: Standardized spacing between navigation items
- **Colors**: Unified color palette for navigation elements and states
- **Icons**: Consistent iconography for navigation actions (arrows, ellipsis)
- **Sizing**: Appropriate touch targets for mobile devices (44px minimum)

### Navigation Patterns
Designed to support:
- **Progressive Disclosure**: Revealing information in manageable chunks
- **Wayfinding**: Clear indication of current location and available actions
- **Efficiency**: Quick access to specific pages or sections
- **Context Preservation**: Maintaining user context during navigation
- **Performance**: Efficient loading of content as users navigate

## Quick Reference

| Component | Purpose | Use Case | Key Features |
|-----------|---------|----------|--------------|
| nck-pagination | Page navigation | Multi-page lists, search results, data tables | Page numbers, previous/next, jump-to-page, responsive |

## Best Practices

### Component Selection
- Use **nck-pagination** for any content that spans multiple pages or screens
- Implement pagination for search results, data tables, and content listings
- Consider infinite scroll vs. pagination based on user experience goals
- Apply pagination when users need to jump to specific pages or sections
- Use for both client-side and server-side paginated data

### Pagination Implementation
- **Page Size**: Choose appropriate page sizes based on content type and user needs
- **Page Numbers**: Show enough page numbers for context without overwhelming
- **Current Page**: Clearly indicate the current page with distinct styling
- **Navigation Controls**: Provide previous/next buttons for sequential navigation
- **Jump Navigation**: Allow users to jump to first, last, or specific pages
- **Loading States**: Handle loading states gracefully during page transitions

### Performance Considerations
- **Server-Side Pagination**: Implement for large datasets to improve performance
- **Client-Side Caching**: Cache previously loaded pages for faster navigation
- **Progressive Loading**: Load content progressively as users navigate
- **URL State**: Maintain pagination state in URL for bookmarking and sharing
- **Lazy Loading**: Load page content only when needed

### Mobile Optimization
- **Touch Targets**: Ensure pagination controls meet minimum touch target sizes
- **Responsive Design**: Adapt pagination layout for different screen sizes
- **Simplified Controls**: Consider simplified pagination on mobile devices
- **Swipe Navigation**: Support swipe gestures where appropriate
- **Compact Layout**: Use condensed pagination for mobile screens

## Navigation Patterns

### Page Navigation
- **Sequential Navigation**: Previous/next buttons for linear content browsing
- **Direct Navigation**: Page number buttons for jumping to specific pages
- **Range Navigation**: First/last page buttons for quick access to boundaries
- **Contextual Navigation**: Show current page within total page context

### State Management
- **Current State**: Clear indication of current page with visual distinction
- **Available Actions**: Enable/disable navigation controls based on context
- **Loading States**: Show loading indicators during page transitions
- **Error States**: Handle navigation errors gracefully with user feedback

### Content Integration
- **Result Counts**: Display total items and current range being shown
- **Page Size Controls**: Allow users to adjust items per page when appropriate
- **Search Integration**: Maintain search context during pagination
- **Filter Persistence**: Preserve applied filters across page navigation

## User Experience Patterns

### Information Clarity
- **Context Information**: Show "Showing X of Y results" or similar context
- **Progress Indication**: Help users understand their progress through content
- **Breadcrumb Integration**: Work with breadcrumb components for navigation context
- **Quick Navigation**: Provide shortcuts to commonly accessed pages

### Interaction Feedback
- **Visual Feedback**: Clear hover and active states for all interactive elements
- **Loading Indicators**: Show progress during page loading
- **Confirmation**: Provide feedback when navigation actions are completed
- **Error Recovery**: Clear error messages and recovery options

## Component Integration

### Data Integration
Navigation components work seamlessly with:
- **API Pagination**: RESTful and GraphQL paginated responses
- **Search Results**: Integration with search and filter components
- **Data Tables**: Coordination with table components for data navigation
- **Content Management**: Support for CMS and content-heavy applications

### State Management
- **URL Synchronization**: Maintain pagination state in browser URL
- **History Management**: Proper browser history integration
- **State Persistence**: Remember user pagination preferences
- **Deep Linking**: Support direct links to specific pages

## Related Documentation

- [Data Display Components](./data-display.md) - For table and list integration
- [Layout Components](./layout.md) - For structural navigation elements
- [Accessibility Guidelines](../accessibility.md)
- [Performance Optimization](../performance.md)
- [URL State Management](../state-management.md)

## Component Integration

All navigation components integrate seamlessly with:
- **Vue 3 Composition API** - Reactive navigation state and computed properties
- **Vue Router** - URL state management and history integration
- **TypeScript** - Full type safety for navigation props and events
- **Neo Design Token System** - Consistent spacing, colors, and interaction states
- **Accessibility Standards** - WCAG AA compliance for all navigation patterns

For detailed implementation examples, API documentation, and advanced navigation patterns, explore the individual component pages within this category.
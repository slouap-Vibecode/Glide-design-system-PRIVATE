# Feedback & Status Components

Feedback & Status components provide visual indicators, notifications, and user feedback within the Neo Design System.

## Overview

This category includes components designed for:

- **Status Communication**: Visual indicators of system and content states
- **User Feedback**: Notifications, messages, and progress indicators
- **Content Enhancement**: Badges, labels, and contextual information
- **Progress Tracking**: Loading states, timelines, and process indicators

## Component Categories

### Status Indicators
- **nck-badge** - Status and category indicators for content classification
- **nck-status-indicator** - System and user status with color-coded feedback
- **nck-counter-badge** - Numerical indicators for counts and notifications
- **nck-recommended-badge** - Highlighting recommended or featured options

### Messaging & Notifications
- **nck-banner** - Important messages and system-wide notifications
- **nck-banner-item** - Individual banner content elements
- **nck-banner-item-group** - Organized groups of banner notifications
- **nck-chip** - Compact tags, labels, and removable information
- **nck-chip-popover** - Detailed chip information with popover display

### Progress & Loading
- **nck-loader** - Loading states and progress indication
- **nck-loading-area** - Content area loading states and placeholders
- **nck-timeline** - Chronological events and process progress visualization

## Usage Guidelines

### Visual Hierarchy
Components follow a clear visual hierarchy for different feedback types:
- **Critical**: High-contrast colors for errors and urgent notifications
- **Warning**: Attention-grabbing but non-critical states
- **Success**: Positive feedback and completion states
- **Informational**: Neutral information and general status
- **Subtle**: Background status and secondary information

### Color System
Consistent color usage across feedback components:
- **Red/Error**: System errors, validation failures, critical alerts
- **Orange/Warning**: Caution states, pending actions, alerts
- **Green/Success**: Completed actions, positive feedback, confirmations
- **Blue/Info**: General information, helpful tips, neutral status
- **Gray/Neutral**: Inactive states, placeholder content, subtle indicators

### Animation & Transitions
Appropriate motion for user feedback:
- **Loading States**: Smooth, non-distracting progress indicators
- **Status Changes**: Subtle transitions between states
- **Notifications**: Gentle entrance and exit animations
- **Interactive Elements**: Hover and focus state transitions

## Component Specifications

### Badge Components
| Component | Purpose | Variants | Placement |
|-----------|---------|----------|-----------|
| nck-badge | Status labels | Color variants, sizes | Content headers, list items |
| nck-counter-badge | Numerical counts | Small, medium, large | Navigation, notifications |
| nck-recommended-badge | Recommendations | Standard, premium | Product cards, options |

### Banner Components
| Component | Purpose | Content Type | Layout |
|-----------|---------|--------------|--------|
| nck-banner | System messages | Text, actions, icons | Full-width, contained |
| nck-banner-item | Individual messages | Rich content | Flexible container |
| nck-banner-item-group | Message groups | Multiple items | Organized list |

### Progress Components
| Component | Purpose | States | Animation |
|-----------|---------|--------|-----------|
| nck-loader | Loading indicator | Spinner, progress | Continuous rotation |
| nck-loading-area | Content placeholder | Skeleton, overlay | Fade transitions |
| nck-timeline | Process flow | Past, current, future | Step progression |

## Best Practices

### Status Communication
- **Be Specific**: Use clear, actionable messages for status feedback
- **Provide Context**: Include relevant information about the status or error
- **Maintain Consistency**: Use the same color and styling patterns across the application
- **Consider Timing**: Show feedback immediately for user actions

### Loading States
- **Show Progress**: Use loading indicators for operations taking more than 1 second
- **Provide Feedback**: Include percentage or time estimates when possible
- **Maintain Context**: Keep relevant content visible during loading
- **Plan for Errors**: Design error states for failed loading operations

### Notification Strategy
- **Prioritize Messages**: Use appropriate urgency levels for different notifications
- **Group Related Items**: Combine similar notifications to reduce noise
- **Provide Actions**: Include relevant actions users can take
- **Auto-dismiss**: Remove non-critical notifications after appropriate time

### Accessibility Considerations
- **Screen Readers**: Include appropriate ARIA labels and live regions
- **Color Independence**: Don't rely solely on color for status communication
- **Keyboard Navigation**: Ensure interactive feedback components are keyboard accessible
- **Focus Management**: Handle focus appropriately for dynamic status changes

## Implementation Patterns

### Status Updates
```typescript
// Example status indicator usage
const status = ref<'loading' | 'success' | 'error' | 'idle'>('idle');

// Update status based on operations
const handleSubmit = async () => {
  status.value = 'loading';
  try {
    await submitForm();
    status.value = 'success';
  } catch (error) {
    status.value = 'error';
  }
};
```

### Progress Tracking
```typescript
// Example timeline usage for multi-step processes
const steps = [
  { id: 1, label: 'Information', status: 'completed' },
  { id: 2, label: 'Verification', status: 'current' },
  { id: 3, label: 'Confirmation', status: 'pending' }
];
```

## Related Documentation

- [Color System Guidelines](../foundations/colors.md)
- [Animation Principles](../foundations/animation.md)
- [Accessibility Standards](../accessibility.md)
- [User Experience Patterns](../ux-patterns.md)

## Integration Notes

All feedback components work seamlessly with:
- **Vue 3 Reactivity** - Automatic updates based on data changes
- **Neo Icon Kit** - Consistent iconography across status indicators
- **Design Token System** - Unified color and spacing standards
- **Animation Library** - Smooth transitions and loading states

For detailed implementation examples and API documentation, explore the individual component pages within this category.
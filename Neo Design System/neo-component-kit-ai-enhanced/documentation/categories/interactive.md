# Interactive Components

Interactive components provide advanced user interactions, utilities, and visual elements within the Neo Design System.

## Overview

This category includes specialized components designed for:

- **Advanced Interactions**: Complex user interface patterns and behaviors
- **Visual Communication**: Icons, symbols, and graphical elements
- **Contextual Actions**: Menus, popover controls, and action triggers
- **Flexible UI Elements**: Adaptable components for diverse use cases

## Component Categories

### Navigation & Menus
- **nck-menu** - Contextual actions, dropdown menus, and navigation options
- **nck-toggle-chip** - Selectable filter options, tags, and interactive labels
- **nck-toggle-chip-group** - Multiple toggle chip management and coordination

### Visual Elements
- **nck-icon** - SVG icons with consistent styling and accessibility support

## Usage Guidelines

### Interaction Principles
Components in this category follow advanced interaction patterns:
- **Contextual Awareness**: Components adapt based on their usage context
- **Progressive Enhancement**: Basic functionality works without JavaScript
- **Keyboard Navigation**: Full keyboard accessibility for all interactions
- **Touch Optimization**: Responsive touch targets for mobile devices

### Icon Usage Standards
The nck-icon component provides:
- **Consistent Sizing**: Standardized icon sizes (XS, S, M, L, XL)
- **Color Flexibility**: Support for primary and secondary colors
- **Accessibility**: Alternative text and semantic markup
- **Performance**: Optimized SVG rendering and caching

### Menu Interaction Patterns
Menu components support:
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab navigation
- **Mouse Interaction**: Click, hover, and focus states
- **Touch Gestures**: Tap interactions for mobile interfaces
- **Auto-positioning**: Smart placement to avoid viewport edges

## Component Specifications

### Menu Components
| Component | Purpose | Trigger Types | Content |
|-----------|---------|---------------|---------|
| nck-menu | Action menus | Button, hover, context | Text, icons, separators |

### Toggle Components
| Component | Purpose | Selection Mode | Grouping |
|-----------|---------|----------------|----------|
| nck-toggle-chip | Individual selection | Single, multiple | Standalone |
| nck-toggle-chip-group | Group management | Coordinated | Multiple chips |

### Icon System
| Component | Purpose | Sources | Customization |
|-----------|---------|---------|---------------|
| nck-icon | Visual symbols | Neo Icon Kit (833+ icons) | Size, color, alt text |

## Best Practices

### Menu Design
- **Clear Hierarchy**: Organize menu items by importance and frequency of use
- **Logical Grouping**: Group related actions together with separators
- **Consistent Labeling**: Use clear, action-oriented labels for menu items
- **Appropriate Triggers**: Choose suitable trigger patterns for different contexts

### Icon Implementation
- **Semantic Usage**: Choose icons that clearly represent their intended meaning
- **Size Consistency**: Use appropriate icon sizes for different UI contexts
- **Color Harmony**: Select icon colors that complement the overall design
- **Alternative Text**: Always provide meaningful alt text for accessibility

### Toggle Controls
- **Clear States**: Make selected and unselected states visually distinct
- **Immediate Feedback**: Provide instant visual feedback for user interactions
- **Group Coordination**: Ensure toggle groups work harmoniously together
- **Persistent State**: Maintain toggle states across user sessions when appropriate

### Accessibility Implementation
- **Keyboard Support**: Ensure all interactive elements are keyboard accessible
- **Screen Readers**: Provide appropriate ARIA labels and descriptions
- **Focus Management**: Handle focus states clearly and predictably
- **State Communication**: Announce state changes to assistive technologies

## Implementation Examples

### Icon Usage
```vue
<template>
  <!-- Standard icon usage -->
  <nck-icon
    iconName="arrow-left"
    :iconSize="IconSize.M"
    primaryColor="@bright-blue-300"
    iconAltText="Navigate back"
  />

  <!-- Icon with secondary color -->
  <nck-icon
    iconName="settings"
    :iconSize="IconSize.S"
    primaryColor="@gray-600"
    secondaryColor="@gray-400"
    iconAltText="Settings menu"
  />
</template>
```

### Menu Implementation
```vue
<template>
  <!-- Contextual menu -->
  <nck-menu
    :menuItems="menuItems"
    :position="MenuPosition.BOTTOM_RIGHT"
    @item-click="handleMenuAction"
  />
</template>

<script setup lang="ts">
const menuItems = [
  { label: 'Edit', action: 'edit', icon: 'edit' },
  { label: 'Delete', action: 'delete', icon: 'trash', destructive: true },
  { type: 'separator' },
  { label: 'Share', action: 'share', icon: 'share' }
];
</script>
```

### Toggle Chip Groups
```vue
<template>
  <!-- Coordinated toggle chip group -->
  <nck-toggle-chip-group
    v-model="selectedFilters"
    :direction="GroupDirection.HORIZONTAL"
    :allowMultiple="true"
  >
    <nck-toggle-chip value="new" label="New" />
    <nck-toggle-chip value="popular" label="Popular" />
    <nck-toggle-chip value="featured" label="Featured" />
  </nck-toggle-chip-group>
</template>
```

## Integration Patterns

### With Form Components
Interactive components work seamlessly with form elements:
- Menu triggers integrated with buttons and inputs
- Toggle chips used as advanced checkbox alternatives
- Icons enhancing form field clarity and navigation

### With Feedback Components
Coordinated usage with status and feedback:
- Menu actions triggering status updates
- Icons indicating state changes in badges and notifications
- Toggle states reflected in status indicators

### Responsive Behavior
Components adapt to different screen sizes:
- **Desktop**: Full feature sets with hover states and detailed interactions
- **Tablet**: Touch-optimized targets and simplified hover states
- **Mobile**: Gesture-friendly interactions and appropriate sizing

## Related Documentation

- [Neo Icon Kit Documentation](../icons.md)
- [Keyboard Navigation Guidelines](../accessibility/keyboard-navigation.md)
- [Touch Interaction Standards](../mobile/touch-guidelines.md)
- [Menu Design Patterns](../patterns/menus.md)

## Performance Considerations

- **Icon Loading**: Icons are optimized and cached for fast loading
- **Menu Rendering**: Menus use virtual scrolling for large item lists
- **Event Handling**: Efficient event delegation for toggle chip groups
- **Accessibility Tree**: Minimal impact on screen reader performance

For detailed implementation examples, API documentation, and advanced usage patterns, explore the individual component pages within this category.
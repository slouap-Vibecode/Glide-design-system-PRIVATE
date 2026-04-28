# Form Components

Form components provide interactive elements for data collection, user input, and form validation within the Neo Design System.

## Overview

This category includes all input-related components designed for:

- **Data Collection**: Text inputs, dropdowns, checkboxes, and specialized inputs
- **User Interaction**: Buttons, switches, and selection controls
- **Validation Integration**: Built-in support for form validation and error states
- **Accessibility**: Full WCAG AA compliance with keyboard navigation and screen reader support

## Component Categories

### Input Components
- **nck-text-input** - Single-line text input for names, emails, and general text
- **nck-text-area** - Multi-line text input for longer content and descriptions
- **nck-search-input** - Specialized search input with built-in search functionality
- **nck-phone-number-input** - Phone number input with formatting and validation

### Selection Components
- **nck-dropdown** - Selection from a list of options
- **nck-autocomplete** - Dynamic search and selection with auto-completion
- **nck-checkbox** - Boolean selections and multi-option choices
- **nck-radio-buttons** - Single-choice selections from multiple options
- **nck-content-switcher** - Toggle between different content views

### Date & Time
- **nck-datepicker-single** - Single date selection with calendar interface
- **nck-datepicker-range** - Date range selection for periods and spans

### Interactive Controls
- **nck-button** - Primary actions, form submission, and navigation
- **nck-slider** - Numeric value selection within a specified range
- **nck-switch** - Binary on/off toggle controls
- **nck-toggle-chip** - Selectable filter options and tags
- **nck-toggle-chip-group** - Multiple toggle chip management

### Specialized Components
- **nck-form** - Form wrapper with validation and submission handling
- **nck-menu** - Contextual actions and dropdown menus

## Usage Guidelines

### Accessibility Standards
All form components follow WCAG AA standards with:
- Proper ARIA attributes and labels
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Screen reader compatibility
- High contrast color ratios
- Focus indicators and error state announcements

### Design Consistency
Components use consistent design tokens for:
- **Spacing**: Standardized padding and margins
- **Colors**: Consistent color palette for states (default, hover, focus, disabled, error)
- **Typography**: Unified font families, sizes, and line heights
- **Interaction States**: Hover, focus, active, and disabled states

### Form Validation
Integration with VeeValidate for:
- Real-time validation feedback
- Error message display
- Success state indication
- Custom validation rules

## Quick Reference

| Component | Purpose | Use Case | Validation |
|-----------|---------|----------|------------|
| nck-button | Primary actions | Form submission, navigation | N/A |
| nck-text-input | Single-line text | Names, emails, search | Built-in rules |
| nck-dropdown | Selection from list | Country, category selection | Required validation |
| nck-checkbox | Boolean selection | Terms acceptance, preferences | Custom rules |
| nck-datepicker-single | Date selection | Birth date, event date | Date format validation |

## Best Practices

### Component Selection
- Use **nck-text-input** for short, single-line text entries
- Choose **nck-dropdown** when users need to select from predetermined options
- Implement **nck-autocomplete** for searchable lists with many options
- Apply **nck-radio-buttons** for mutually exclusive choices
- Use **nck-checkbox** for multiple selections or boolean confirmations

### Layout & Spacing
- Maintain consistent spacing between form elements
- Group related form fields together
- Provide clear visual hierarchy with proper labeling
- Use appropriate component sizing for different form layouts

### Error Handling
- Provide immediate feedback for validation errors
- Use clear, actionable error messages
- Maintain form state during error correction
- Highlight problematic fields with appropriate error styling

## Related Documentation

- [Form Validation Guide](../form-validation.md)
- [Accessibility Guidelines](../accessibility.md)
- [Design Tokens](../foundations.md)
- [Component Usage Examples](../examples.md)

## Component Integration

All form components integrate seamlessly with:
- **Vue 3 Composition API** - Modern reactive patterns
- **VeeValidate** - Comprehensive form validation
- **Neo Icon Kit** - Consistent iconography
- **Design Token System** - Unified styling approach

For detailed implementation examples and API documentation, explore the individual component pages within this category.
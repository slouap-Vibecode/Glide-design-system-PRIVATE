# Neo Component Kit

A comprehensive Vue 3 component library with design tokens, accessibility-first components, and AI-optimized development experience.

## Features

🎨 **40+ Production-Ready Components** - Complete set of Vue 3 components with TypeScript support
🔧 **Design Token System** - Centralized design tokens with reactive theming
♿ **Accessibility First** - WCAG AA compliance built into every component
🤖 **AI-Optimized** - Enhanced developer experience for AI-assisted development
🎯 **Icon Integration** - Seamless integration with Neo Icon Kit (833+ optimized icons)
⚡ **Performance Focused** - Tree-shakeable, optimized builds

## Quick Start

### Installation

```bash
npm install @neo-design/component-kit @neotechnologygroup/neo-icon-kit
```

### Basic Usage

```vue
<template>
  <div>
    <!-- Button with icon -->
    <nck-button label="Save Changes" type="filled" leftIcon="check" @click="handleSave" />

    <!-- Form field with validation -->
    <nck-text-input name="email" label="Email Address" type="email" required v-model="email" />

    <!-- Card layout -->
    <nck-card>
      <template #header>
        <h2>User Profile</h2>
      </template>
      <p>Card content goes here</p>
      <template #actions>
        <nck-button label="Edit" type="outline" />
        <nck-button label="Delete" type="ghost" color="danger" />
      </template>
    </nck-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckButton, NckTextInput, NckCard } from "@neo-design/component-kit";

const email = ref("");

const handleSave = () => {
  console.log("Saving changes...");
};
</script>
```

### Setup & Configuration

```typescript
// main.ts
import { createApp } from "vue";
import { initialize } from "@neo-design/component-kit";
import "@neo-design/component-kit/styles";

const app = createApp(App);

// Initialize the component kit
initialize({
  urls: {
    iconsURL: "/icons/", // Path to your Neo Icon Kit icons
  },
  // Optional: Configure translations, theme, etc.
});

app.mount("#app");
```

## AI-Optimized Development

This component kit is optimized for AI-assisted development:

### Smart Component Discovery

```typescript
import { suggestComponents, getComponentsByUseCase } from "@neo-design/component-kit/ai";

// Get components for specific use cases
const formComponents = getComponentsByUseCase("data-entry");
const feedbackComponents = getComponentsByUseCase("user-feedback");

// Get intelligent suggestions
const suggestions = suggestComponents("user authentication form");
// Returns: ['nck-form', 'nck-text-input', 'nck-button', 'nck-modal']
```

### Pre-built Templates

```typescript
import { CommonUIPatterns } from "@neo-design/component-kit/templates";

// Get ready-to-use templates
const loginForm = CommonUIPatterns.loginForm;
const dataTable = CommonUIPatterns.dataTableWithPagination;
const userProfile = CommonUIPatterns.userProfileCard;
```

### Smart Defaults

```typescript
import { useSmartDefaults } from "@neo-design/component-kit/ai";

const { smartButton, smartFormField } = useSmartDefaults();

// Intelligent component configuration
const saveButton = smartButton("save"); // { type: 'filled', leftIcon: 'check', color: 'primary' }
const emailField = smartFormField("email"); // { rules: 'required|email', placeholder: 'Enter email' }
```

## Component Categories

### Layout & Structure

- **nck-card** - Flexible content container
- **nck-drawer** - Slide-out panel
- **nck-header** - Page/section header
- **nck-modal** - Overlay dialog

### Form Controls

- **nck-button** - Interactive button with icons and states
- **nck-text-input** - Text input with validation
- **nck-dropdown** - Select dropdown
- **nck-checkbox** - Checkbox with validation
- **nck-radio-buttons** - Radio button group
- **nck-switch** - Toggle switch
- **nck-form** - Form container with validation

### Data Display

- **nck-table** - Data table with sorting
- **nck-pagination** - Page navigation
- **nck-badge** - Status/count indicator
- **nck-chip** - Removable tags
- **nck-timeline** - Event timeline

### Feedback & Communication

- **nck-toast** - Toast notifications
- **nck-banner** - Page-level messages
- **nck-loader** - Loading indicators
- **nck-popover** - Contextual overlays

### Navigation

- **nck-breadcrumb** - Breadcrumb navigation
- **nck-tabs** - Tab navigation
- **nck-menu** - Action menus
- **nck-pagination** - Page navigation

## Accessibility Features

All components include:

- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Screen Reader Support** - Proper ARIA attributes
- ✅ **Focus Management** - Logical focus flow
- ✅ **Color Contrast** - WCAG AA compliant colors
- ✅ **Motion Preferences** - Respects reduced motion settings

## Design Tokens

The component kit includes a comprehensive design token system:

```less
// Colors
@bright-blue-300: #006fcf;
@green-300: #10b981;
@red-300: #ef4444;

// Spacing
--nck-spacing-xs: 4px;
--nck-spacing-s: 8px;
--nck-spacing-m: 16px;

// Border Radius
--nck-radius-s: 4px;
--nck-radius-m: 8px;
--nck-radius-l: 16px;
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type { INckButtonProps, INckModalProps } from "@neo-design/component-kit";

interface MyComponentProps {
  buttonProps: INckButtonProps;
  modalProps: INckModalProps;
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📖 [Documentation](https://neo-design.github.io/component-kit)
- 🐛 [Issues](https://github.com/neo-design/component-kit/issues)
- 💬 [Discussions](https://github.com/neo-design/component-kit/discussions)
- 📧 [Email Support](mailto:design-system@neo-design.com)

---

Built with ❤️ by the Neo Design Team

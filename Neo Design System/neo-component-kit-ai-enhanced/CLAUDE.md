# Neo Design System Development Guidelines

This document outlines the standards, practices, and guidelines for developing with and extending the Neo Design System, based on comprehensive analysis of the existing codebase architecture and best practices.

## System Overview

### Architecture

- **Neo Component Kit**: Vue 3 component library with design tokens (v16.0.0+)
- **Neo Icon Kit**: SVG icon library with 833+ optimized icons (v5.5.0+)
- **Integration**: Direct file imports during development, npm packages for distribution
- **Registry**: Private Nexus registry `https://nexus.prod.build.kds.com/repository/npm-hosted/`

## Code Standards

### TypeScript Requirements

```typescript
// ✅ DO: Use strict TypeScript throughout
interface ComponentProps {
  label: string;
  isActive: boolean;
  onClick?: (event: MouseEvent) => void;
}

// ✅ DO: Define comprehensive component interfaces
export interface INckButton {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

// ❌ DON'T: Use 'any' type or loose typing
const props: any = defineProps({...}); // Avoid this
```

### Vue 3 Composition API Standards

```vue
<script setup lang="ts">
// ✅ DO: Use Composition API with TypeScript
import { computed, ref, onMounted } from "vue";

// ✅ DO: Define props with comprehensive interfaces
const props = defineProps<{
  label?: string;
  disabled?: boolean;
}>();

// ✅ DO: Use computed properties for derived state
const buttonClasses = computed(() => ({
  "nck-button--disabled": props.disabled,
  "nck-button--primary": !props.disabled,
}));

// ✅ DO: Emit events with proper typing
const emit = defineEmits<{
  click: [event: MouseEvent];
  change: [value: string];
}>();
</script>
```

## Component Development

### Component Structure

```
src/components/
├── nckComponentName.vue          # Main component file
├── interfaces/
│   └── iNckComponentName.ts     # TypeScript interface
└── internal/                    # Private sub-components
    └── componentName/
```

### Component Template Standards

```vue
<template>
  <!-- ✅ DO: Use semantic HTML with proper ARIA -->
  <button
    class="nck-style nck-internal nck-button"
    :class="buttonStyleClasses"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :tabindex="disabled || loading ? -1 : null"
    @click="emitClicksIfInteractive"
  >
    <!-- ✅ DO: Use nck-icon for all icons -->
    <nck-icon
      v-if="leftIcon"
      :iconName="leftIcon"
      :iconSize="IconSize.S"
      :primaryColor="iconColor"
      :iconAltText="leftIconAlternativeText"
    />

    <!-- ✅ DO: Provide slot documentation -->
    <!-- @slot Button label content -->
    <slot>{{ label }}</slot>
  </button>
</template>
```

### CSS and Styling

#### Design Token Usage

```less
// ✅ DO: Use design tokens from colorsVariables.less
.nck-button {
  background-color: @bright-blue-300;
  color: @white;
  border-radius: var(--nck-radius-m);
  box-shadow: var(--box-shadow-level-2);

  // ✅ DO: Use consistent spacing patterns
  padding: 12px 16px;

  &:hover {
    background-color: @bright-blue-400;
    box-shadow: var(--box-shadow-level-3);
  }
}

// ❌ DON'T: Use hardcoded values
.bad-button {
  background-color: #006fcf; // Use @bright-blue-300 instead
  border-radius: 8px; // Use var(--nck-radius-m) instead
}
```

#### CSS Class Naming

```less
// ✅ DO: Follow BEM-like naming with nck prefix
.nck-component {
  &--modifier {
  }
  &__element {
  }
  &--disabled {
  }
  &--loading {
  }
}

// ✅ DO: Use consistent internal classes
.nck-style.nck-internal.nck-component-name {
}
```

### Accessibility Standards

#### WCAG Compliance

```vue
<template>
  <!-- ✅ DO: Provide proper ARIA attributes -->
  <div
    role="button"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >

  <!-- ✅ DO: Use aria-live for dynamic content -->
  <div class="loader" aria-live="polite">
    <nck-loader v-if="loading" :loadingText="loadingText" />
  </div>

  <!-- ✅ DO: Provide alternative text for icons -->
  <nck-icon
    :iconName="iconName"
    :iconAltText="iconAltText || `${actionType} icon`"
  />
</template>
```

#### Focus Management

```typescript
// ✅ DO: Manage focus states properly
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClick();
  }
};

// ✅ DO: Provide focus indicators
const focusClasses = computed(() => ({
  "focus-visible": isFocused.value,
}));
```

## Icon Usage

### Icon Integration

```vue
<template>
  <!-- ✅ DO: Use nckIcon component for all icons -->
  <nck-icon
    :iconName="leftIcon"
    :iconSize="IconSize.S"
    :primaryColor="iconColor"
    :secondaryColor="iconSecondaryColor"
    :iconAltText="iconDescription"
    class="component-icon"
  />
</template>

<script setup lang="ts">
import { IconSize } from "@/constants/iconSize";

// ✅ DO: Use IconSize enum for consistent sizing
const iconProps = {
  iconSize: IconSize.XS, // Extra small
  iconSize: IconSize.S, // Small
  iconSize: IconSize.M, // Medium
  iconSize: IconSize.L, // Large
};
</script>
```

### Icon Naming Conventions

```typescript
// ✅ DO: Use semantic icon names
const iconNames = {
  leftIcon: "arrow-left",
  rightIcon: "arrow-right",
  closeIcon: "close",
  addIcon: "add-plus",
  editIcon: "edit",
  deleteIcon: "delete",
};

// ❌ DON'T: Use generic or unclear names
const badIconNames = {
  icon1: "icon-1",
  genericIcon: "icon",
  leftThing: "thing-left",
};
```

## Form Integration

### Validation Patterns

```vue
<script setup lang="ts">
import { useField } from "vee-validate";

// ✅ DO: Integrate with VeeValidate for forms
const { value, errorMessage, handleBlur } = useField(() => props.name, props.rules);

// ✅ DO: Provide consistent error handling
const hasError = computed(() => !!errorMessage.value);
const fieldClasses = computed(() => ({
  "field--error": hasError.value,
  "field--disabled": props.disabled,
}));
</script>

<template>
  <div class="nck-field">
    <input
      v-model="value"
      :class="fieldClasses"
      @blur="handleBlur"
      :aria-describedby="hasError ? `${fieldId}-error` : undefined"
    />

    <!-- ✅ DO: Associate error messages with fields -->
    <div v-if="hasError" :id="`${fieldId}-error`" class="field-error" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>
```

## Testing Standards

### Component Testing

```typescript
// ✅ DO: Write comprehensive component tests
describe("nckButton", () => {
  it("should render with correct accessibility attributes", () => {
    const wrapper = mount(NckButton, {
      props: { disabled: true },
    });

    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.attributes("tabindex")).toBe("-1");
  });

  it("should emit click events when interactive", async () => {
    const wrapper = mount(NckButton, {
      props: { disabled: false },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
```

### Visual Regression Testing

```json
// ✅ DO: Add BackstopJS scenarios for new components
{
  "label": "nckNewComponent - Default State",
  "url": "http://localhost:6006/?path=/story/components-nck-new-component--default",
  "selectors": ["[data-testid='component-wrapper']"],
  "misMatchThreshold": 0.1
}
```

## Documentation Standards

### Component Documentation

```vue
<script setup lang="ts">
/**
 * @component
 * @displayName nck-component-name
 * Brief description of what the component does and its primary use case.
 *
 * PREREQUISITES:
 * - [Required translations](#translations): list any required i18n keys
 * - Any other setup requirements
 */

const props = defineProps({
  /**
   * Description of what this prop controls.
   * @example "Save changes"
   */
  label: String,

  /**
   * Whether the component is in a disabled state.
   * When disabled, the component will not respond to user interactions.
   */
  disabled: Boolean,
});
</script>

<template>
  <div class="nck-component">
    <!-- @slot Main content area. Accepts HTML and other components. -->
    <slot></slot>

    <!-- @slot Footer actions. Typically used for buttons. -->
    <slot name="actions"></slot>
  </div>
</template>
```

## Build and Development

### Package Scripts

```bash
# ✅ DO: Run full quality pipeline before commits
npm run typecheck    # TypeScript validation
npm run lint         # ESLint + StyleLint
npm run format       # Prettier formatting
npm run build        # Production build
npm run test:visual  # Visual regression tests

# ✅ DO: Use specific test commands during development
npm run test:single ComponentName  # Test single component
```

### Git Workflow

```bash
# ✅ DO: Follow conventional commit messages
git commit -m "feat(nckButton): add loading state support"
git commit -m "fix(nckCard): resolve hover state accessibility issue"
git commit -m "docs(nckModal): update prop documentation"

# ✅ DO: Use pre-commit hooks (automated via Husky)
# - TypeScript compilation
# - Linting and formatting
# - Test execution
```

### Component Creation Checklist

When creating new components:

- [ ] **Structure**: Create component file and interface
- [ ] **TypeScript**: Full type safety with comprehensive interfaces
- [ ] **Accessibility**: WCAG AA compliance with proper ARIA
- [ ] **Design Tokens**: Use existing tokens, avoid hardcoded values
- [ ] **Responsive**: Mobile-first responsive design
- [ ] **Testing**: Visual regression tests and unit tests
- [ ] **Documentation**: Component docs with usage examples
- [ ] **Integration**: Form validation if applicable
- [ ] **Icons**: Use nckIcon component with proper alt text
- [ ] **Slots**: Document all slots with @slot comments
- [ ] **Events**: Type all emitted events
- [ ] **Props**: Validate all props with runtime and compile-time checks

## Performance Guidelines

### Component Optimization

```vue
<script setup lang="ts">
// ✅ DO: Use computed properties for expensive operations
const expensiveComputation = computed(() => {
  return props.items.filter((item) => item.active).length;
});

// ✅ DO: Lazy load heavy components
const HeavyComponent = defineAsyncComponent(() => import("./HeavyComponent.vue"));

// ✅ DO: Use v-memo for expensive list rendering
</script>

<template>
  <div v-for="item in items" :key="item.id" v-memo="[item.active]">
    <!-- Expensive rendering here -->
  </div>
</template>
```

## Migration Guidelines

### From Legacy Components

```typescript
// ❌ OLD: Vue 2 Options API
export default {
  props: ["label", "disabled"],
  data() {
    return { isActive: false };
  },
};

// ✅ NEW: Vue 3 Composition API
const props = defineProps<{
  label?: string;
  disabled?: boolean;
}>();

const isActive = ref(false);
```

### Design Token Migration

```less
// ❌ OLD: Hardcoded values
.component {
  color: #006fcf;
  border-radius: 8px;
}

// ✅ NEW: Design tokens
.component {
  color: @bright-blue-300;
  border-radius: var(--nck-radius-m);
}
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Run `npm run typecheck` to identify issues
2. **Linting Failures**: Run `npm run lint:fix` for auto-fixes
3. **Visual Regression**: Update BackstopJS references after intentional changes
4. **Icon Missing**: Ensure icon exists in neo-icon-kit and name is correct
5. **Form Validation**: Check VeeValidate integration and field naming

### Debug Tools

- Vue DevTools for component inspection
- Accessibility auditing via axe-core
- Performance profiling via Vue DevTools
- Visual diff comparison in BackstopJS reports

---

**Remember**: This design system prioritizes accessibility, consistency, and maintainability. When in doubt, refer to existing components as examples and maintain the established patterns and quality standards.

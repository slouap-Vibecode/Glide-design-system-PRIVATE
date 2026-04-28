# Quick Reference - Design Workspace Development Standards

## 🎯 For All Agents: Critical Requirements

### 📋 Design System Manager
- **Must Reference**: `/internal-component-kit-master/` for current component architecture
- **Token Management**: Define and govern design tokens in `/src/styles/`
- **Component Strategy**: Plan component roadmap and consistency rules
- **Cross-Platform**: Ensure Vue.js and React implementation alignment

### 🎨 UX Engineer
- **Must Reference**: Component specifications and accessibility requirements
- **Component APIs**: Design comprehensive component interfaces with TypeScript
- **Accessibility**: WCAG 2.1 AA compliance requirements
- **Design Tokens**: Token architecture and implementation guidelines

### 👨‍💻 Vue Engineer
- **CRITICAL**: Follow Vue 3 + Composition API patterns exactly
- **Architecture**: Single File Components with TypeScript interfaces
- **Design Tokens**: Integrate LESS variables and CSS custom properties
- **Icon Integration**: Use nckIcon component with 833+ SVG icons
- **Testing**: 80% minimum coverage with Vitest

### 🧪 QA Tester
- **Must Reference**: Component specifications and test requirements
- **Test Framework**: Vitest + Vue Test Utils for component testing
- **Coverage**: Unit, integration, accessibility, and performance testing
- **Bug Reports**: Follow detailed component bug report template

## ⚡ Quick Templates

### Component Specification (UX Engineer)
```markdown
## Component: [ComponentName]
**Type**: [Button/Input/Card/etc.] | **Priority**: [High/Medium/Low]
### Props Interface: [TypeScript definition]
### Accessibility Requirements: [WCAG compliance notes]
### Design Token Usage: [Required tokens]
### Icon Integration: [If applicable]
```

### Vue Component (Vue Engineer)
```vue
<template>
  <component
    :is="tag"
    :class="componentClasses"
    :style="componentStyles"
    v-bind="$attrs"
  >
    <nck-icon v-if="iconName" :icon-name="iconName" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import { nckIcon } from '@/components'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  iconName?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})
</script>
```

### Component Test (QA Tester)
```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ComponentName from '@/components/ComponentName.vue'

describe('ComponentName', () => {
  it('renders with default props', () => {
    const wrapper = mount(ComponentName)
    expect(wrapper.classes()).toContain('nck-component')
  })

  it('integrates design tokens correctly', () => {
    const wrapper = mount(ComponentName, {
      props: { variant: 'primary' }
    })
    expect(wrapper.attributes('style')).toContain('var(--nck-primary-bg)')
  })
})
```

## 🚀 Workspace Commands

```bash
# Component development workflow
npm run dev          # Development server
npm run typecheck    # TypeScript validation
npm run test         # Component testing
npm run build        # Production build
npm run storybook    # Component documentation

# Design system workflow
npm run build:tokens # Compile design tokens
npm run lint         # Code quality checks
npm run test:a11y    # Accessibility testing
```

## 📊 Quality Standards

### Component Quality Gates
- [ ] Vue 3 Composition API patterns followed
- [ ] TypeScript interfaces complete
- [ ] Design tokens properly integrated
- [ ] Icon system utilized (if applicable)
- [ ] Accessibility implemented (WCAG 2.1 AA)
- [ ] 80% test coverage achieved

### Design System Requirements
- ✅ Consistent component APIs
- ✅ Design token compliance
- ✅ Icon integration patterns
- ✅ Cross-platform consistency (Vue/React)
- ✅ Documentation completeness

### Testing Requirements
- ✅ Unit tests for component behavior
- ✅ Integration tests with design tokens
- ✅ Accessibility compliance tests
- ✅ Performance benchmarks
- ✅ Cross-browser compatibility

## 🔗 Key Workspace Paths

### Core Directories
- `/internal-component-kit-master/` - **70+ Vue 3 components**
- `/neo-icon-kit-master/` - **833+ SVG icons**
- `/Research repository/` - **UX research and insights**
- `/docs/` - **Organized documentation system**
- `/.claude/skills/` - **Agent skill definitions**

### Important Files
- `/internal-component-kit-master/src/components/` - Vue components
- `/internal-component-kit-master/src/styles/` - Design tokens (LESS)
- `/internal-component-kit-master/src/components/interfaces/` - TypeScript interfaces
- `/neo-icon-kit-master/preloadedIcons.js` - Icon bundle

## 🎨 Design Workspace Context

### Technology Stack
- **Framework**: Vue 3 + Composition API
- **Build System**: Vite + TypeScript (strict mode)
- **Styling**: LESS variables + CSS custom properties
- **Icons**: 833+ optimized SVG icons via nckIcon component
- **Testing**: Vitest + Vue Test Utils
- **Documentation**: Organized `/docs/` structure

### Component Architecture
- **Component Count**: 70+ Vue 3 components (nckButton, nckCard, etc.)
- **Design Tokens**: LESS-based system in `/src/styles/`
- **Icon Integration**: Pre-compiled SVG bundle
- **Type Safety**: Complete TypeScript interfaces
- **Accessibility**: Built-in WCAG compliance

## ⚠️ Critical Reminders
1. **ALWAYS** reference workspace paths correctly
2. **NO** hardcoded values - use design tokens
3. **MANDATORY** TypeScript strict mode compliance
4. **REQUIRED** accessibility support (WCAG 2.1 AA)
5. **FOLLOW** Vue 3 Composition API patterns
6. **DOCUMENT** all solutions in `/docs/` structure

## 🔄 Agent Coordination Flow
```
Manager → UX Engineer → Vue Engineer → QA Tester
   ↓         ↓            ↓           ↓
Strategy  Architecture  Implementation  Validation
```

Always prioritize design system consistency, component quality, and cross-platform alignment while maintaining focus on Vue 3 development excellence within the design workspace.
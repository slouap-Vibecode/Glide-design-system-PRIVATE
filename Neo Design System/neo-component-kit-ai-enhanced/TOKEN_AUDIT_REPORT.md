# Neo Design System - Token Audit Report

**Date**: January 27, 2026
**Version**: Neo Component Kit v16.0.0
**Scope**: Complete audit of all LESS variables and CSS custom properties

## Executive Summary

The Neo Design System currently maintains **85+ design tokens** across 11 variable files, using a hybrid approach of LESS variables and CSS custom properties. This audit identifies token categories, naming patterns, relationships, and opportunities for modernization.

## Token Inventory by Category

### 🎨 **Colors** (39 tokens)

#### Base Color Palette (38 tokens)

**Location**: `src/styles/colorsVariables.less`

| Category        | Tokens   | Scale     | Example Values        |
| --------------- | -------- | --------- | --------------------- |
| **Deep Blue**   | 5 tokens | 400 → 100 | `#001245` → `#eaefff` |
| **Bright Blue** | 5 tokens | 400 → 100 | `#0056a0` → `#ecf6ff` |
| **Blue Grey**   | 8 tokens | 700 → 100 | `#1a233e` → `#f8f9fb` |
| **Green**       | 5 tokens | 400 → 100 | `#005f45` → `#ecfbf4` |
| **Orange**      | 5 tokens | 400 → 100 | `#c43d0a` → `#ffefe9` |
| **Red**         | 5 tokens | 400 → 100 | `#9e0000` → `#fae5e7` |
| **Yellow**      | 6 tokens | 400 → 50  | `#916400` → `#fffcf3` |

**Detailed Token List**:

```less
// Primary Colors
@deep-blue-400: #001245;
@deep-blue-300: #00175a;
@deep-blue-200: #99ace3;
@deep-blue-150: #d0dbff;
@deep-blue-100: #eaefff;

@bright-blue-400: #0056a0;
@bright-blue-300: #006fcf;
@bright-blue-200: #7dc3ff;
@bright-blue-150: #dcf0ff;
@bright-blue-100: #ecf6ff;

// Neutral Colors
@blue-grey-700: #1a233e;
@blue-grey-600: #444b61;
@blue-grey-500: #848996;
@blue-grey-400: #c6c8d2;
@blue-grey-300: #e7e8ee;
@blue-grey-200: #f0f1f4;
@blue-grey-100: #f8f9fb;
@white: #ffffff;

// Status Colors
@green-400: #005f45;
@green-300: #00825f;
@green-200: #94d8c5;
@green-150: #caeee4;
@green-100: #ecfbf4;

@orange-400: #c43d0a;
@orange-300: #f85d22;
@orange-200: #ffb69a;
@orange-150: #ffd2c0;
@orange-100: #ffefe9;

@red-400: #9e0000;
@red-300: #cf0000;
@red-200: #fe9d9d;
@red-150: #ffc3c3;
@red-100: #fae5e7;

@yellow-400: #916400;
@yellow-300: #ffba00;
@yellow-200: #ffe399;
@yellow-150: #fff1cc;
@yellow-100: #fff6de;
@yellow-50: #fffcf3;
```

#### Text Colors (3 tokens)

```less
@ink-100: #282d3a; // Primary text
@ink-70: fade(@ink-100, 70%); // Secondary text (70% opacity)
@ink-40: fade(@ink-100, 40%); // Disabled text (40% opacity)
```

#### Derived Colors (2 tokens)

```less
@focus-color: fade(@bright-blue-300, 40%); // Focus outline
@invalid-focus-color: fade(@red-300, 40%); // Error focus outline
```

### 📐 **Layout & Spacing** (21+ tokens)

#### Border Radius (4 tokens)

**Location**: `src/styles/radiusVariables.less`

```css
--nck-radius-s: 0.25rem; /* 4px - Small radius */
--nck-radius-m: 0.5rem; /* 8px - Medium radius */
--nck-radius-l: 1rem; /* 16px - Large radius */
--nck-radius-pill: 999rem; /* Pill shape */
```

#### Box Shadows (12 tokens)

**Location**: `src/styles/boxShadowsVariables.less`

**Elevation System**:

```css
--box-shadow-level-1: /* Subtle elevation */ --box-shadow-level-2: /* Card hover */
  --box-shadow-level-3: /* Raised elements */ --box-shadow-level-4: /* Floating panels */
  --box-shadow-level-5: /* Modal overlays */ --box-shadow-level-6: /* High elevation */
  --box-shadow-level-7: /* Maximum elevation */;
```

**Directional Shadows**:

```css
--box-shadow-level-7-top:     /* Top-facing shadow */ --box-shadow-level-7-right: /* Right-facing shadow */
  --box-shadow-level-7-left: /* Left-facing shadow */;
```

**Interactive Shadows**:

```css
--box-shadow-focus: 0 0 0 0.1875rem [focus-color];
--box-shadow-invalid: 0 0 0 0.1875rem [invalid-focus-color];
```

#### Component-Specific Sizing (8 tokens)

**Location**: `src/styles/sizeVariables.less`

```less
@checkbox-margin-right: 0.5rem; /* Checkbox spacing */
@checkbox-size: 1.25rem; /* Mobile checkbox */
@checkbox-size-desktop: 1rem; /* Desktop checkbox */
@thin-border: 0.0625rem; /* 1px border */
@input-with-inner-label-padding: 1.25rem; /* Input padding */
@input-padding: 0.25rem; /* Base input padding */
```

**Popover Variables** (`popoverVariables.less`):

```less
@popover-margin: 0.25rem; /* Popover spacing */
@popover-trigger-size: 3.125rem; /* Trigger button size */
@popover-chip-size: 2.25rem; /* Chip size in popover */
```

**Progress Indicator Variables** (`progressIndicatorVariables.less`):

```less
@success-vertical-progress-line: #38ad8d; /* TODO: Convert to token */
@vertical-line-width: 1rem; /* Progress line width */
```

**History Variables** (`historyVariables.less`):

```less
@event-icon-size: 1.25rem; /* Timeline icon size */
@vertical-line-width: 1px; /* Timeline line width */
```

### 🔤 **Typography** (15 tokens)

#### Line Height System (15 tokens)

**Location**: `src/styles/typographyVariables.less`

```css
/* Header Line Heights */
--line-height-header-1: 1.875rem; /* 30px - H1 line height */
--line-height-header-2: 1.75rem; /* 28px - H2 line height */
--line-height-header-3: 1.25rem; /* 20px - H3 line height */
--line-height-header-4: 1.25rem; /* 20px - H4 line height */

/* Text Size Line Heights */
--line-height-text-l: 1.5rem; /* 24px - Large text */
--line-height-text-m: 1.25rem; /* 20px - Medium text */
--line-height-text-s: 1.125rem; /* 18px - Small text */
--line-height-text-xs: 1.125rem; /* 18px - Extra small text */

/* Amount Line Heights */
--line-height-amount-large: 2.25rem; /* 36px - Large amounts */
--line-height-amount-medium: 1.5rem; /* 24px - Medium amounts */
--line-height-amount-small: 1.125rem; /* 18px - Small amounts */
--line-height-amount-xsmall: 0.8125rem; /* 13px - Extra small amounts */

/* Badge Line Height */
--line-height-badge-font: 0.625rem; /* 10px - Badge text */
```

### 🎬 **Animation & Motion** (13 tokens)

#### Easing Functions (3 tokens)

**Location**: `src/styles/animationsVariables.less`

```css
--nck-easing-out: cubic-bezier(0, 0, 0.3, 1); /* Ease out */
--nck-easing-in: cubic-bezier(0.7, 0, 1, 1); /* Ease in */
--nck-easing-in-out: cubic-bezier(0.6, 0, 0.4, 1); /* Ease in-out */
```

#### Duration Scale (10 tokens)

```css
--nck-duration-100: 100ms; /* Ultra fast */
--nck-duration-200: 150ms; /* Very fast */
--nck-duration-300: 200ms; /* Fast */
--nck-duration-400: 250ms; /* Medium-fast */
--nck-duration-500: 350ms; /* Medium */
--nck-duration-600: 500ms; /* Medium-slow */
--nck-duration-700: 700ms; /* Slow */
--nck-duration-800: 1000ms; /* Very slow */
--nck-duration-900: 1500ms; /* Ultra slow */
--nck-duration-1000: 2000ms; /* Maximum duration */
```

### 📱 **Responsive Breakpoints** (7 tokens)

**Location**: `src/styles/breakpointsVariables.less`

```less
@screen-max-phone: 45rem; /* 720px - Max phone width */
@screen-max-tablet: 64rem; /* 1024px - Max tablet width */
@screen-min-tablet: (@screen-max-phone + 0.001rem); /* Min tablet */
@screen-min-desktop: (@screen-max-tablet + 0.001rem); /* Min desktop */

/* Media Query Strings */
@desktop: ~"screen and (min-width: @{screen-min-desktop})";
@tablet: ~"screen and (min-width: @{screen-min-tablet}) and (max-width: @{screen-max-tablet})";
@phone: ~"screen and (max-width: @{screen-max-phone})";
```

## Token Architecture Analysis

### 🏗️ **Current Implementation Patterns**

#### Dual Token System

```less
// LESS Variables (colorsVariables.less)
@bright-blue-300: #006fcf;

// CSS Custom Properties (colorsCssVariables.less)
:root {
  --bright-blue-300: @bright-blue-300;
}
```

#### Token Collections

```less
// Programmatic token maps for JavaScript access
@kit-colors: {
  deep-blue-400: @deep-blue-400;
  bright-blue-300: @bright-blue-300;
  // ... all colors
};

@icon-colors: {
  // Subset of colors for icon usage
  deep-blue-400: @deep-blue-400;
  bright-blue-300: @bright-blue-300;
  // ... icon-appropriate colors
};
```

### 🔍 **Token Naming Analysis**

#### Appearance-Based Naming (❌ **Issues Identified**)

**Color Naming Problems**:

- `@deep-blue-400` vs `@bright-blue-300` - No semantic meaning
- `@blue-grey-500` - Describes appearance, not purpose
- `@ink-100` vs `@blue-grey-700` - Inconsistent naming systems

**Scale Inconsistencies**:

- Most colors use 400/300/200/150/100 scale
- Yellow adds 50: `@yellow-50`
- Blue-grey uses 700/600/500/400/300/200/100 scale
- Opacity-based text colors: `@ink-70`, `@ink-40`

#### Semantic Naming (✅ **Good Examples**)

**Well-Named Tokens**:

```css
--nck-radius-s/m/l/pill          /* Size-based, semantic */
--box-shadow-focus               /* Purpose-based */
--box-shadow-invalid             /* State-based */
--nck-easing-out/in/in-out      /* Function-based */
--line-height-header-1           /* Context-based */
```

### 🔗 **Token Relationships & Dependencies**

#### Color Dependencies

```less
// Text colors depend on base ink color
@ink-100: #282d3a;
@ink-70: fade(@ink-100, 70%); // ← Derived from ink-100
@ink-40: fade(@ink-100, 40%); // ← Derived from ink-100

// Focus colors depend on interactive colors
@focus-color: fade(@bright-blue-300, 40%); // ← Derived
@invalid-focus-color: fade(@red-300, 40%); // ← Derived
```

#### Shadow Dependencies

```less
// Box shadows reference blue-grey colors
@blue-grey-700-fade-4: fade(@blue-grey-700, 4%); // ← Derived
@blue-grey-700-fade-8: fade(@blue-grey-700, 8%); // ← Derived
@blue-grey-700-fade-10: fade(@blue-grey-700, 10%); // ← Derived
@blue-grey-700-fade-12: fade(@blue-grey-700, 12%); // ← Derived
```

#### Breakpoint Dependencies

```less
// Tablet and desktop breakpoints calculated from phone
@screen-min-tablet: (@screen-max-phone + 0.001rem); // ← Derived
@screen-min-desktop: (@screen-max-tablet + 0.001rem); // ← Derived
```

### ⚠️ **Issues Identified**

#### 1. Technical Debt

```less
// TODO comments indicate pending work
@success-vertical-progress-line: #38ad8d;
//TODO replace after NCK-2072: var(--green-250);
```

#### 2. Hardcoded Values

```less
// Component-specific hardcoded colors
@success-vertical-progress-line: #38ad8d; // Should reference token
```

#### 3. Scale Inconsistencies

- **Blue-grey**: Uses 700-100 scale (7 steps)
- **Other colors**: Use 400-100 scale (5 steps) + 150
- **Yellow**: Adds unique 50 value
- **Duration**: Uses 100-1000 scale (10 steps)

#### 4. Missing Semantic Layer

- No `@color-primary`, `@color-secondary` tokens
- No `@text-primary`, `@background-default` tokens
- Colors are only available by appearance name

#### 5. Limited Theming Support

- All tokens are hardcoded values
- No theme-specific token variations
- CSS custom properties are 1:1 mappings, not semantic

## Migration Opportunities

### 🎯 **High-Impact Improvements**

#### 1. Semantic Color System

```json
// Proposed semantic layer
{
  "color": {
    "primary": {
      "50": "#eaefff",
      "500": "#006fcf",
      "900": "#001245"
    },
    "text": {
      "primary": "{color.neutral.900}",
      "secondary": "{color.neutral.600}"
    },
    "background": {
      "default": "{color.neutral.0}",
      "elevated": "{color.neutral.50}"
    }
  }
}
```

#### 2. Unified Scale System

- Standardize all color scales to 50/100/200/300/400/500/600/700/800/900
- Create consistent spacing scale: 1/2/3/4/5/6/8/10/12/16/20/24/32
- Align duration scale with standard easing curves

#### 3. Theme Architecture

```json
// Light theme
{
  "color-text-primary": "{color.neutral.900}",
  "color-background-default": "{color.neutral.0}"
}

// Dark theme
{
  "color-text-primary": "{color.neutral.100}",
  "color-background-default": "{color.neutral.900}"
}
```

### 📊 **Migration Priority Matrix**

| Priority | Tokens          | Impact | Effort | Timeline |
| -------- | --------------- | ------ | ------ | -------- |
| **P0**   | Colors (39)     | High   | Medium | Month 1  |
| **P1**   | Layout (21)     | Medium | Low    | Month 2  |
| **P2**   | Typography (15) | Medium | Low    | Month 2  |
| **P3**   | Animation (13)  | Low    | Low    | Month 3  |
| **P4**   | Breakpoints (7) | Low    | Medium | Month 3  |

## Implementation Recommendations

### 🚀 **Phase 1: Foundation (Month 1)**

1. **Convert appearance-based color names to semantic**
2. **Establish unified 50-900 color scale**
3. **Create semantic color assignments**
4. **Set up token build pipeline**

### 📈 **Phase 2: Enhancement (Month 2-3)**

1. **Add missing spacing tokens**
2. **Normalize typography scale**
3. **Implement theme architecture**
4. **Update component usage**

### 🎯 **Success Metrics**

- [ ] 100% semantic color naming
- [ ] Single source of truth for all tokens
- [ ] Theme switching capability
- [ ] Zero hardcoded values in components
- [ ] Cross-platform token compatibility

## Token Usage Guidelines

### ✅ **Best Practices for New Tokens**

1. Use semantic names: `primary-500` not `blue-300`
2. Follow consistent scales: 50/100/200/300/400/500/600/700/800/900
3. Document purpose and usage context
4. Create aliases for commonly used combinations
5. Test across light/dark themes

### 🚫 **Anti-Patterns to Avoid**

1. Appearance-based names: `bright-blue-300`
2. Inconsistent scales: mixing 150 with standard increments
3. Hardcoded values: `#38ad8d` instead of token reference
4. Component-specific tokens without semantic meaning
5. Missing CSS custom property mappings

---

**Report Generated**: January 27, 2026
**Next Review**: After Phase 1 implementation
**Contact**: Design System Team

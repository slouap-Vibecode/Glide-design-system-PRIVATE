# Glide Design Token — Neo Design System Workspace

This repository contains the full **Neo Design System** source code, including the Vue 3 component library, icon kit, Claude AI agent configuration, and the complete 4-layer design token architecture migrated in April 2026.

---

## What's inside

```
glide-workspace/
├── Neo Design System/
│   ├── neo-component-kit-ai-enhanced/   # Vue 3 component library (v16.0.0)
│   └── neo-icon-kit/                   # SVG icon library (833+ icons)
├── neo-design-system-mcp-server/        # MCP server for AI tool integration
├── .claude/                             # Claude AI agent & skill definitions
├── 01- docs/                            # Architecture, investigations, guides
└── README.md                            # This file
```

---

## Neo Component Kit (`neo-component-kit-ai-enhanced`)

Vue 3 component library with 45+ production-ready components. Published as `@neotechnologygroup/neo-component-kit`.

### Quick start

```bash
cd "Neo Design System/neo-component-kit-ai-enhanced"
npm install
```

| Command | What it does |
|---|---|
| `npm run doc:serve` | Start Vue Styleguidist on http://localhost:6060/16.0.0/ |
| `npm run build` | Build the library (`dist/`) |
| `npm run typecheck` | TypeScript validation |
| `npm run lint` | ESLint + Stylelint |
| `npm run format:write` | Prettier formatting |
| `npm run test:a11y` | Accessibility tests |
| `npm run test:vrt` | Visual regression tests (BackstopJS) |

### Component library

45 components organized by category:

- **Form** — `nck-text-input`, `nck-dropdown`, `nck-checkbox`, `nck-radio-buttons`, `nck-switch`, `nck-slider`, `nck-text-area`, `nck-search-input`, `nck-phone-number-input`, `nck-autocomplete`, `nck-datepicker-range`, `nck-datepicker-single`
- **Feedback & Status** — `nck-banner`, `nck-badge`, `nck-chip`, `nck-toast`, `nck-loader`, `nck-status-indicator`, `nck-counter-badge`, `nck-recommended-badge`
- **Layout** — `nck-card`, `nck-modal`, `nck-drawer`, `nck-header`, `nck-breadcrumb`, `nck-tabs`, `nck-placeholder`
- **Navigation** — `nck-pagination`, `nck-menu`, `nck-content-switcher`
- **Data display** — `nck-table`, `nck-list`, `nck-timeline`
- **Interactive** — `nck-icon`, `nck-button`, `nck-popover`, `nck-tooltip`

---

## Design Token Architecture

The token system follows a strict 4-layer chain — never skip layers when writing component styles.

```
L1 (Primitive)  →  L2 (Semantic)  →  L3 (Contextual)  →  Component code
@bright-blue-300    --nck-color-p400   --nck-surface-info-solid   background-color
```

### Layer overview

| Layer | File | Prefix | Use in |
|---|---|---|---|
| L1 — Primitives | `src/styles/colorsVariables.less` | `@bright-blue-*`, `@red-*` etc. | L2 only |
| L2 — Semantic colors | `src/styles/l2SemanticColors.less` | `--nck-color-p400`, `--nck-color-e600` etc. | L3 only |
| L3 — Contextual | `src/styles/l3ContextualTokens.less` | `--nck-surface-*`, `--nck-text-*`, `--nck-icon-*`, `--nck-border-*`, `--nck-effect-*` | Component `.less` |
| Responsive | `src/styles/responsiveTokens.less` | `--nck-spacing-*`, `--nck-font-size-*`, `--nck-icon-size-*`, `--nck-focus-width-*` | Component `.less` |
| Radius & borders | `src/styles/radiusVariables.less` | `--nck-radius-*`, `--nck-border-width-*` | Component `.less` |
| Typography | `src/styles/typographyVariables.less` | `--nck-font-weight-*` | Component `.less` |

### Key L3 tokens (use these in component code)

```css
/* Surfaces */
--nck-surface-primary          /* white — default background */
--nck-surface-secondary        /* blue-grey-100 — inputs, sidebar */
--nck-surface-info-solid       /* brand blue — primary buttons */
--nck-surface-disabled         /* blue-grey-300 */
--nck-surface-negative-solid   /* red — error/destructive */
--nck-surface-success-solid    /* green */
--nck-surface-modal            /* dark overlay at 70% */

/* Text */
--nck-text-default             /* primary body text */
--nck-text-secondary           /* subdued text */
--nck-text-disabled            /* greyed out text */
--nck-text-brand               /* brand blue labels */
--nck-text-negative            /* error messages */
--nck-text-reverse             /* white text on dark backgrounds */

/* Borders */
--nck-border-neutral           /* default resting border */
--nck-border-active            /* focused / selected border */
--nck-border-negative          /* error border */

/* Focus rings */
--nck-effect-focus-primary     /* standard blue focus ring */
--nck-effect-focus-negative    /* red focus ring for error fields */

/* Spacing */
--nck-spacing-s    /*  8px */
--nck-spacing-m    /* 12px */
--nck-spacing-l    /* 16px */
--nck-spacing-xl   /* 24px */

/* Border widths */
--nck-border-width-s   /* 1px — hairline border */
--nck-border-width-m   /* 2px */

/* Radius */
--nck-radius-m     /* 8px  */
--nck-radius-pill  /* 999rem — fully rounded */
```

Full token reference is in the Styleguidist docs under **Foundations → CSS variables**.

---

## Neo Icon Kit (`neo-icon-kit`)

833+ optimized SVG icons.

```bash
cd "Neo Design System/neo-icon-kit"
npm install
node generatePreloadedIcons.js   # Regenerate preloadedIcons.js bundle
```

Use icons in components via the `nck-icon` Vue component:

```vue
<nck-icon
  iconName="arrow-left"
  :iconSize="IconSize.M"
  primaryColor="var(--nck-icon-brand)"
  iconAltText="Go back"
/>
```

---

## Claude AI Agents (`.claude/`)

Pre-configured specialized agents for design system work. Invoke them in Claude Code with `/agent-name`.

| Agent | Role |
|---|---|
| `design-system-manager` | Token governance, brand consistency |
| `design-system-vue` | Vue 3 component implementation |
| `design-system-ux-engineer` | Accessibility, WCAG compliance |
| `engineer-agent` | Build system, architecture |
| `qa-tester-agent` | Testing strategy, validation |
| `product-designer-agent` | Visual design validation |

---

## Documentation (`01- docs/`)

Structured knowledge base organized by type:

| Folder | Content |
|---|---|
| `00-quick-start/` | Onboarding guides |
| `04 - architecture/` | Token architecture decisions |
| `06 - implementation/` | Step-by-step implementation guides |
| `07 - investigations/` | Technical deep dives |
| `08 - troubleshooting/` | Known issues and fixes |
| `09 - reference/` | Quick lookup tables |

---

## Getting started from scratch

```bash
# 1. Clone the repo
git clone https://github.com/slouap_gbtg/Glide-design-token.git
cd Glide-design-token

# 2. Install component kit dependencies
cd "Neo Design System/neo-component-kit-ai-enhanced"
npm install

# 3. Launch the Styleguidist documentation
npm run doc:serve
# → open http://localhost:6060/16.0.0/
```

---

## Tech stack

- **Vue 3** with Composition API and TypeScript
- **LESS** for component styles with CSS custom properties for tokens
- **Vue Styleguidist** for component documentation
- **VeeValidate** for form validation
- **BackstopJS** for visual regression testing
- **axe-core** for accessibility testing

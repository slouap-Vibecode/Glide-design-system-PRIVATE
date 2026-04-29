L3 contextual design tokens. These are the **primary tokens to use in component code** — they express semantic intent (e.g. "the surface of a primary element") rather than raw color values. All reference L2 semantic aliases.

```jsx
<TokenColorGrid />
```

#### Surface
| Token | Maps to | Usage |
|---|---|---|
| `--nck-surface-page` | white | Page background |
| `--nck-surface-primary` | white | Default component background |
| `--nck-surface-primary-reverse` | blue-grey-700 | Inverse/dark component background |
| `--nck-surface-primary-hover` | blue-grey-200 | Hover state on primary surface |
| `--nck-surface-secondary` | blue-grey-100 | Subdued background (e.g. input fields, sidebar) |
| `--nck-surface-disabled` | blue-grey-300 | Disabled element background |
| `--nck-surface-info-subtle` | bright-blue-100 | Light info / active selection background |
| `--nck-surface-info-solid` | bright-blue-300 | Brand-blue filled background |
| `--nck-surface-info-solid-hover` | bright-blue-400 | Brand-blue filled hover |
| `--nck-surface-success-subtle` | green-100 | Light success background |
| `--nck-surface-success-solid` | green-300 | Filled success background |
| `--nck-surface-warning-subtle` | orange-100 | Light warning background |
| `--nck-surface-warning-solid` | orange-400 | Filled warning background |
| `--nck-surface-negative-subtle` | red-100 | Light error/negative background |
| `--nck-surface-negative-solid` | red-300 | Filled error background |
| `--nck-surface-negative-solid-hover` | red-400 | Filled error hover |
| `--nck-surface-highlight-subtle` | deep-blue-100 | Light highlight background |
| `--nck-surface-highlight-solid` | deep-blue-300 | Filled highlight background |
| `--nck-surface-gain-subtle` | yellow-50 | Light gain/positive-money background |
| `--nck-surface-gain-solid` | yellow-300 | Filled gain background |
| `--nck-surface-modal` | blue-grey-700 at 70% | Modal/drawer backdrop overlay |

#### Text
| Token | Maps to | Usage |
|---|---|---|
| `--nck-text-default` | ink-100 | Primary body text |
| `--nck-text-secondary` | ink-70 | Secondary / subdued text |
| `--nck-text-disabled` | ink-40 | Disabled text |
| `--nck-text-reverse` | white | Text on dark backgrounds |
| `--nck-text-brand` | bright-blue-300 | Brand-colored text / active labels |
| `--nck-text-negative` | red-300 | Error messages, required signs |
| `--nck-text-positive` | green-300 | Success messages |
| `--nck-text-warning` | orange-400 | Warning messages |
| `--nck-text-gain` | yellow-400 | Gain/financial positive text |
| `--nck-text-link` | bright-blue-300 | Inline links on light backgrounds |
| `--nck-text-link-reverse` | bright-blue-200 | Inline links on dark backgrounds (e.g. toast) |

#### Icon
| Token | Maps to | Usage |
|---|---|---|
| `--nck-icon-neutral` | blue-grey-600 | Default icon color |
| `--nck-icon-neutral-subtle` | blue-grey-500 | Subdued/unselected icon |
| `--nck-icon-brand` | bright-blue-300 | Brand-colored icon |
| `--nck-icon-positive` | green-300 | Success icon |
| `--nck-icon-negative` | red-300 | Error icon |
| `--nck-icon-warning` | orange-300 | Warning icon |
| `--nck-icon-reverse` | white | Icon on dark surface |
| `--nck-icon-disabled` | blue-grey-400 | Disabled icon |
| `--nck-icon-brand-reverse` | bright-blue-200 | Brand icon on dark surface |

#### Border
| Token | Maps to | Usage |
|---|---|---|
| `--nck-border-neutral` | blue-grey-300 | Default/resting border |
| `--nck-border-neutral-hover` | blue-grey-500 | Hovered neutral border |
| `--nck-border-active` | bright-blue-300 | Selected / focused border |
| `--nck-border-active-hover` | bright-blue-400 | Hovered active border |
| `--nck-border-negative` | red-300 | Error / invalid border |
| `--nck-border-negative-hover` | red-400 | Hovered error border |
| `--nck-border-positive` | green-300 | Success border |
| `--nck-border-warning` | orange-300 | Warning border |
| `--nck-border-info` | bright-blue-300 | Informational border |

#### Effects (focus rings)
| Token | Maps to | Usage |
|---|---|---|
| `--nck-effect-focus-primary` | bright-blue-300 at 40% | Standard focus ring color |
| `--nck-effect-focus-positive` | green-300 at 40% | Success/positive focus ring |
| `--nck-effect-focus-negative` | red-300 at 40% | Error/invalid focus ring |

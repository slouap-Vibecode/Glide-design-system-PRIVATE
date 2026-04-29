Responsive design tokens for spacing, font sizes, icon sizes, and focus ring widths. Use these in component styles instead of raw `rem` values.

```jsx
<TokenSpacingScale />
```

```jsx
<TokenTypographyScale />
```

#### Spacing
| Token | Value | px equivalent |
|---|---|---|
| `--nck-spacing-none` | 0 | 0 |
| `--nck-spacing-4xs` | 0.0625rem | 1px |
| `--nck-spacing-3xs` | 0.125rem | 2px |
| `--nck-spacing-2xs` | 0.25rem | 4px |
| `--nck-spacing-s` | 0.5rem | 8px |
| `--nck-spacing-m` | 0.75rem | 12px |
| `--nck-spacing-l` | 1rem | 16px |
| `--nck-spacing-xl` | 1.5rem | 24px |
| `--nck-spacing-2xl` | 2rem | 32px |
| `--nck-spacing-3xl` | 2.5rem | 40px |
| `--nck-spacing-4xl` | 3rem | 48px |

#### Font size — body
| Token | Value | Usage |
|---|---|---|
| `--nck-font-size-body-xs` | 0.6875rem | `.text-xs` |
| `--nck-font-size-body-s` | 0.75rem | `.text-s` |
| `--nck-font-size-body-m` | 0.8125rem | `.text-m` (default body) |
| `--nck-font-size-body-l` | 0.9375rem | `.text-l` |

#### Font size — headings
| Token | Value | Usage |
|---|---|---|
| `--nck-font-size-h1` | 1.5rem | `.header-1` |
| `--nck-font-size-h2` | 1.125rem | `.header-2` |
| `--nck-font-size-h3` | 0.9375rem | `.header-3` |
| `--nck-font-size-h4` | 0.75rem | `.header-4` |

#### Font size — amounts
| Token | Value | Usage |
|---|---|---|
| `--nck-font-size-amount-xsmall` | 0.8125rem | `.amount-xsmall` |
| `--nck-font-size-amount-small` | 1.125rem | `.amount-small` |
| `--nck-font-size-amount-medium` | 1.5rem | `.amount-medium` |
| `--nck-font-size-amount-large` | 2.25rem | `.amount-large` |

#### Font size — badge
| Token | Value | Usage |
|---|---|---|
| `--nck-font-size-badge-xs` | 0.625rem | `.badge-font` |

#### Icon size
| Token | Value | px equivalent |
|---|---|---|
| `--nck-icon-size-xxs` | 0.5rem | 8px |
| `--nck-icon-size-xs` | 1rem | 16px |
| `--nck-icon-size-s` | 1.25rem | 20px |
| `--nck-icon-size-m` | 1.5rem | 24px |
| `--nck-icon-size-l` | 2rem | 32px |
| `--nck-icon-size-xl` | 3rem | 48px |

#### Focus ring width
| Token | Value | Usage |
|---|---|---|
| `--nck-focus-width-m` | 0.1875rem | Standard focus ring width (3px) |

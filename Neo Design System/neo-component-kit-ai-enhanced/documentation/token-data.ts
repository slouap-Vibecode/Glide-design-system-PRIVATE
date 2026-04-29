/**
 * Static registry of all --nck-* CSS variable names, organised by category.
 * Visualisation components import from here — this is the single source of truth
 * alongside the LESS token files in src/styles/.
 */

export const L3_COLOR_TOKENS: Record<string, string[]> = {
  Surface: [
    '--nck-surface-page',
    '--nck-surface-primary',
    '--nck-surface-primary-reverse',
    '--nck-surface-primary-hover',
    '--nck-surface-secondary',
    '--nck-surface-disabled',
    '--nck-surface-info-subtle',
    '--nck-surface-info-solid',
    '--nck-surface-info-solid-hover',
    '--nck-surface-success-subtle',
    '--nck-surface-success-solid',
    '--nck-surface-warning-subtle',
    '--nck-surface-warning-solid',
    '--nck-surface-negative-subtle',
    '--nck-surface-negative-solid',
    '--nck-surface-negative-solid-hover',
    '--nck-surface-highlight-subtle',
    '--nck-surface-highlight-solid',
    '--nck-surface-gain-subtle',
    '--nck-surface-gain-solid',
    '--nck-surface-modal',
  ],
  Text: [
    '--nck-text-default',
    '--nck-text-secondary',
    '--nck-text-disabled',
    '--nck-text-reverse',
    '--nck-text-brand',
    '--nck-text-negative',
    '--nck-text-positive',
    '--nck-text-warning',
    '--nck-text-gain',
    '--nck-text-link',
    '--nck-text-link-reverse',
  ],
  Icon: [
    '--nck-icon-neutral',
    '--nck-icon-neutral-subtle',
    '--nck-icon-brand',
    '--nck-icon-positive',
    '--nck-icon-negative',
    '--nck-icon-warning',
    '--nck-icon-reverse',
    '--nck-icon-disabled',
    '--nck-icon-brand-reverse',
  ],
  Border: [
    '--nck-border-neutral',
    '--nck-border-neutral-hover',
    '--nck-border-active',
    '--nck-border-active-hover',
    '--nck-border-negative',
    '--nck-border-negative-hover',
    '--nck-border-positive',
    '--nck-border-warning',
    '--nck-border-info',
  ],
  Effects: [
    '--nck-effect-focus-primary',
    '--nck-effect-focus-positive',
    '--nck-effect-focus-negative',
  ],
}

export const L2_COLOR_TOKENS: Record<string, string[]> = {
  'Primary (bright-blue)': [
    '--nck-color-p100',
    '--nck-color-p200',
    '--nck-color-p300',
    '--nck-color-p400',
    '--nck-color-p500',
    '--nck-color-p400-transparent',
  ],
  'Secondary (deep-blue)': ['--nck-color-s100', '--nck-color-s600', '--nck-color-s700'],
  'Neutral (blue-grey)': [
    '--nck-color-n100',
    '--nck-color-n200',
    '--nck-color-n300',
    '--nck-color-n400',
    '--nck-color-n500',
    '--nck-color-n600',
    '--nck-color-n700',
    '--nck-color-n700-transparent',
  ],
  'Text (ink)': ['--nck-color-ikp100', '--nck-color-iks200', '--nck-color-ikt300'],
  'Success (green)': [
    '--nck-color-su100',
    '--nck-color-su300',
    '--nck-color-su600',
    '--nck-color-su700',
    '--nck-color-su600-transparent',
  ],
  'Warning (orange)': ['--nck-color-w100', '--nck-color-w300', '--nck-color-w500', '--nck-color-w600'],
  'Negative (red)': [
    '--nck-color-e100',
    '--nck-color-e300',
    '--nck-color-e600',
    '--nck-color-e700',
    '--nck-color-e600-transparent',
  ],
  'Gain (yellow)': ['--nck-color-g100', '--nck-color-g600', '--nck-color-g700'],
  White: ['--nck-color-white'],
}

export const RESPONSIVE_TOKENS: Record<string, string[]> = {
  Spacing: [
    '--nck-spacing-none',
    '--nck-spacing-4xs',
    '--nck-spacing-3xs',
    '--nck-spacing-2xs',
    '--nck-spacing-s',
    '--nck-spacing-m',
    '--nck-spacing-l',
    '--nck-spacing-xl',
    '--nck-spacing-2xl',
    '--nck-spacing-3xl',
    '--nck-spacing-4xl',
  ],
  'Font size — body': [
    '--nck-font-size-body-xs',
    '--nck-font-size-body-s',
    '--nck-font-size-body-m',
    '--nck-font-size-body-l',
  ],
  'Font size — headings': [
    '--nck-font-size-h1',
    '--nck-font-size-h2',
    '--nck-font-size-h3',
    '--nck-font-size-h4',
  ],
  'Font size — amounts': [
    '--nck-font-size-amount-xsmall',
    '--nck-font-size-amount-small',
    '--nck-font-size-amount-medium',
    '--nck-font-size-amount-large',
  ],
  'Font size — badge': ['--nck-font-size-badge-xs'],
  'Icon size': [
    '--nck-icon-size-xxs',
    '--nck-icon-size-xs',
    '--nck-icon-size-s',
    '--nck-icon-size-m',
    '--nck-icon-size-l',
    '--nck-icon-size-xl',
  ],
  'Focus ring': ['--nck-focus-width-m'],
}

export const RADIUS_TOKENS: string[] = [
  '--nck-radius-none',
  '--nck-radius-s',
  '--nck-radius-m',
  '--nck-radius-l',
  '--nck-radius-pill',
]

export const BORDER_WIDTH_TOKENS: string[] = [
  '--nck-border-width-none',
  '--nck-border-width-s',
  '--nck-border-width-m',
  '--nck-border-width-l',
]

export const SHADOW_TOKENS: string[] = [
  '--box-shadow-level-1',
  '--box-shadow-level-2',
  '--box-shadow-level-3',
  '--box-shadow-level-4',
  '--box-shadow-level-5',
  '--box-shadow-level-6',
  '--box-shadow-level-7',
]

/** Flat map of category name → token names — used by TokenPlayground to offer alternatives */
export const ALL_COLOR_CATEGORIES: Record<string, string[]> = {
  ...L3_COLOR_TOKENS,
  ...L2_COLOR_TOKENS,
}

/**
 * Static registry of all L1 CSS custom property names and their resolved hex values.
 * Source of truth: src/styles/colorsVariables.less + colorsCssVariables.less
 *
 * Used by ThemeEditor.vue to populate the L1 primitive dropdown for each L2 token.
 */

export interface L1Primitive {
  /** CSS custom property name as defined in colorsCssVariables.less */
  name: string
  /** Resolved hex value (from colorsVariables.less) */
  hex: string
  /** Colour family label for grouping in the dropdown */
  group: string
}

export const L1_PRIMITIVES: L1Primitive[] = [
  /* ---- Primary (bright-blue) ---- */
  { name: '--bright-blue-100', hex: '#ecf6ff', group: 'Primary (bright-blue)' },
  { name: '--bright-blue-150', hex: '#dcf0ff', group: 'Primary (bright-blue)' },
  { name: '--bright-blue-200', hex: '#7dc3ff', group: 'Primary (bright-blue)' },
  { name: '--bright-blue-300', hex: '#006fcf', group: 'Primary (bright-blue)' },
  { name: '--bright-blue-400', hex: '#0056a0', group: 'Primary (bright-blue)' },

  /* ---- Secondary (deep-blue) ---- */
  { name: '--deep-blue-100',   hex: '#eaefff', group: 'Secondary (deep-blue)' },
  { name: '--deep-blue-150',   hex: '#d0dbff', group: 'Secondary (deep-blue)' },
  { name: '--deep-blue-200',   hex: '#99ace3', group: 'Secondary (deep-blue)' },
  { name: '--deep-blue-300',   hex: '#00175a', group: 'Secondary (deep-blue)' },
  { name: '--deep-blue-400',   hex: '#001245', group: 'Secondary (deep-blue)' },

  /* ---- Neutral (blue-grey) ---- */
  { name: '--blue-grey-100',   hex: '#f8f9fb', group: 'Neutral (blue-grey)' },
  { name: '--blue-grey-200',   hex: '#f0f1f4', group: 'Neutral (blue-grey)' },
  { name: '--blue-grey-300',   hex: '#e7e8ee', group: 'Neutral (blue-grey)' },
  { name: '--blue-grey-400',   hex: '#c6c8d2', group: 'Neutral (blue-grey)' },
  { name: '--blue-grey-500',   hex: '#848996', group: 'Neutral (blue-grey)' },
  { name: '--blue-grey-600',   hex: '#444b61', group: 'Neutral (blue-grey)' },
  { name: '--blue-grey-700',   hex: '#1a233e', group: 'Neutral (blue-grey)' },
  { name: '--white',           hex: '#ffffff', group: 'Neutral (blue-grey)' },

  /* ---- Text (ink) ---- */
  { name: '--ink-100',         hex: '#282d3a',   group: 'Text (ink)' },
  { name: '--ink-70',          hex: '#282d3ab2', group: 'Text (ink)' },
  { name: '--ink-40',          hex: '#282d3a66', group: 'Text (ink)' },

  /* ---- Success (green) ---- */
  { name: '--green-100',       hex: '#ecfbf4', group: 'Success (green)' },
  { name: '--green-150',       hex: '#caeee4', group: 'Success (green)' },
  { name: '--green-200',       hex: '#94d8c5', group: 'Success (green)' },
  { name: '--green-300',       hex: '#00825f', group: 'Success (green)' },
  { name: '--green-400',       hex: '#005f45', group: 'Success (green)' },

  /* ---- Warning (orange) ---- */
  { name: '--orange-100',      hex: '#ffefe9', group: 'Warning (orange)' },
  { name: '--orange-150',      hex: '#ffd2c0', group: 'Warning (orange)' },
  { name: '--orange-200',      hex: '#ffb69a', group: 'Warning (orange)' },
  { name: '--orange-300',      hex: '#f85d22', group: 'Warning (orange)' },
  { name: '--orange-400',      hex: '#c43d0a', group: 'Warning (orange)' },

  /* ---- Negative (red) ---- */
  { name: '--red-100',         hex: '#fae5e7', group: 'Negative (red)' },
  { name: '--red-150',         hex: '#ffc3c3', group: 'Negative (red)' },
  { name: '--red-200',         hex: '#fe9d9d', group: 'Negative (red)' },
  { name: '--red-300',         hex: '#cf0000', group: 'Negative (red)' },
  { name: '--red-400',         hex: '#9e0000', group: 'Negative (red)' },

  /* ---- Gain (yellow) ---- */
  { name: '--yellow-50',       hex: '#fffcf3', group: 'Gain (yellow)' },
  { name: '--yellow-100',      hex: '#fff6de', group: 'Gain (yellow)' },
  { name: '--yellow-150',      hex: '#fff1cc', group: 'Gain (yellow)' },
  { name: '--yellow-200',      hex: '#ffe399', group: 'Gain (yellow)' },
  { name: '--yellow-300',      hex: '#ffba00', group: 'Gain (yellow)' },
  { name: '--yellow-400',      hex: '#916400', group: 'Gain (yellow)' },
]

/**
 * All L2 token names in definition order (from l2SemanticColors.less).
 * Used by ThemeEditor to render the token table.
 */
export const L2_TOKEN_NAMES: string[] = [
  /* Primary */
  '--nck-color-p100',
  '--nck-color-p200',
  '--nck-color-p300',
  '--nck-color-p400',
  '--nck-color-p500',
  '--nck-color-p400-transparent',
  /* Secondary */
  '--nck-color-s100',
  '--nck-color-s600',
  '--nck-color-s700',
  /* Neutral */
  '--nck-color-n100',
  '--nck-color-n200',
  '--nck-color-n300',
  '--nck-color-n400',
  '--nck-color-n500',
  '--nck-color-n600',
  '--nck-color-n700',
  '--nck-color-n700-transparent',
  /* Text (ink) */
  '--nck-color-ikp100',
  '--nck-color-iks200',
  '--nck-color-ikt300',
  /* Success */
  '--nck-color-su100',
  '--nck-color-su300',
  '--nck-color-su600',
  '--nck-color-su700',
  '--nck-color-su600-transparent',
  /* Warning */
  '--nck-color-w100',
  '--nck-color-w300',
  '--nck-color-w500',
  '--nck-color-w600',
  /* Negative */
  '--nck-color-e100',
  '--nck-color-e300',
  '--nck-color-e600',
  '--nck-color-e700',
  '--nck-color-e600-transparent',
  /* Gain */
  '--nck-color-g100',
  '--nck-color-g600',
  '--nck-color-g700',
  /* White */
  '--nck-color-white',
]

/**
 * Groups L2 token names by colour family — used to render section headings
 * in the ThemeEditor token table.
 */
export const L2_TOKEN_GROUPS: Record<string, string[]> = {
  'Primary (bright-blue)': ['--nck-color-p100', '--nck-color-p200', '--nck-color-p300', '--nck-color-p400', '--nck-color-p500', '--nck-color-p400-transparent'],
  'Secondary (deep-blue)': ['--nck-color-s100', '--nck-color-s600', '--nck-color-s700'],
  'Neutral (blue-grey)':   ['--nck-color-n100', '--nck-color-n200', '--nck-color-n300', '--nck-color-n400', '--nck-color-n500', '--nck-color-n600', '--nck-color-n700', '--nck-color-n700-transparent'],
  'Text (ink)':            ['--nck-color-ikp100', '--nck-color-iks200', '--nck-color-ikt300'],
  'Success (green)':       ['--nck-color-su100', '--nck-color-su300', '--nck-color-su600', '--nck-color-su700', '--nck-color-su600-transparent'],
  'Warning (orange)':      ['--nck-color-w100', '--nck-color-w300', '--nck-color-w500', '--nck-color-w600'],
  'Negative (red)':        ['--nck-color-e100', '--nck-color-e300', '--nck-color-e600', '--nck-color-e700', '--nck-color-e600-transparent'],
  'Gain (yellow)':         ['--nck-color-g100', '--nck-color-g600', '--nck-color-g700'],
  'White':                 ['--nck-color-white'],
}

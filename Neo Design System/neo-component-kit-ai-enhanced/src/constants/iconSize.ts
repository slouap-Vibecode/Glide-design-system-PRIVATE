/**
 * Icon size enumeration for consistent icon scaling across the design system
 * Controls both width and height of icons in rem units
 *
 * @aiUsage Core visual sizing system - choose size based on context and hierarchy
 * @aiCategory visual
 */
export enum IconSize {
  /**
   * Extra Extra Small: 0.5rem (8px)
   * @aiUsage Inline text icons, minimal indicators, tight space constraints
   * @aiContext Within text content, small badges, compact lists
   * @example Inline status indicators, text decorations, micro-interactions
   */
  XXS = "xxs",

  /**
   * Extra Small: 1rem (16px)
   * @aiUsage Form controls, small buttons, table actions
   * @aiContext Input fields, compact interfaces, secondary actions
   * @example Form field icons, table row actions, small button icons
   */
  XS = "xs",

  /**
   * Small: 1.25rem (20px) - Most common size
   * @aiUsage Standard buttons, navigation items, general purpose icons
   * @aiContext Primary UI elements, standard interactions, default choice
   * @example Navigation icons, standard button icons, toolbar items
   */
  S = "s",

  /**
   * Medium: 1.5rem (24px)
   * @aiUsage Larger buttons, section headers, prominent actions
   * @aiContext Important UI elements, headers, featured content
   * @example Section header icons, prominent action buttons, feature highlights
   */
  M = "m",

  /**
   * Large: 2rem (32px)
   * @aiUsage Feature icons, cards, emphasis elements
   * @aiContext Feature showcases, card headers, important visual elements
   * @example Feature card icons, dashboard sections, large action buttons
   */
  L = "l",

  /**
   * Extra Large: 3rem (48px)
   * @aiUsage Hero sections, empty states, primary illustrations
   * @aiContext Hero content, empty states, primary visual focal points
   * @example Empty state illustrations, hero section icons, onboarding graphics
   */
  XL = "xl",
}

/**
 * AI-friendly icon size selection guide
 * Provides contextual recommendations for choosing appropriate icon sizes
 */
export const IconSizeGuide = {
  /**
   * Size selection by UI context
   */
  byContext: {
    inline: IconSize.XXS, // Within text content
    form: IconSize.XS, // Form fields and controls
    button: IconSize.S, // Standard buttons and actions
    header: IconSize.M, // Section headers and titles
    card: IconSize.M, // Card icons and content elements
    feature: IconSize.L, // Feature highlights and cards
    hero: IconSize.XL, // Hero sections and empty states
  },

  /**
   * Size selection by component type
   */
  byComponent: {
    "nck-button": {
      small: IconSize.XS,
      medium: IconSize.S,
      large: IconSize.M,
    },
    "nck-text-input": IconSize.XS,
    "nck-card": IconSize.M,
    "nck-banner": IconSize.XS,
    "nck-table": IconSize.XS,
    "nck-tabs": IconSize.S,
    "nck-header": IconSize.M,
  },

  /**
   * Size selection by semantic meaning
   */
  bySemantic: {
    decorative: IconSize.XS, // Visual decoration only
    functional: IconSize.S, // Interactive elements
    informational: IconSize.M, // Status and info display
    navigational: IconSize.S, // Navigation elements
    branding: IconSize.L, // Logo and brand elements
  },
} as const;

/**
 * Icon size accessibility guidelines
 */
export const IconSizeAccessibility = {
  /**
   * Minimum recommended sizes for different contexts
   */
  minimumSizes: {
    interactive: IconSize.S, // 20px minimum for touch targets
    standalone: IconSize.XS, // 16px minimum for standalone icons
    decorative: IconSize.XXS, // 8px acceptable for decoration
  },

  /**
   * Touch target considerations
   */
  touchTargets: {
    mobile: "Use minimum S size (20px) for interactive icons on mobile",
    desktop: "XS size (16px) acceptable for desktop pointer interactions",
    accessibility: "Consider users with motor impairments - larger is better",
  },
} as const;

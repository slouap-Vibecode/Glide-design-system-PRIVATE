/**
 * Icon color enumeration for consistent icon theming across the design system
 * Maps to design tokens with semantic meaning and accessibility compliance
 *
 * @aiUsage Core color system for icons - choose colors based on semantic meaning and contrast requirements
 * @aiCategory visual
 */
export enum IconColors {
  // Deep Blue - Professional, trustworthy, calm
  /**
   * Deep Blue 400: Darkest blue for high contrast needs
   * @aiUsage Strong emphasis, high contrast backgrounds, accessibility requirements
   * @aiSemantic Authority, trust, stability, professional contexts
   * @aiContrast Excellent against light backgrounds, good readability
   */
  DEEP_BLUE_400 = "deep-blue-400",

  /**
   * Deep Blue 300: Primary deep blue for standard use
   * @aiUsage Standard professional interfaces, corporate branding, trust indicators
   * @aiSemantic Professionalism, reliability, corporate identity
   * @aiContrast Good against light and medium backgrounds
   */
  DEEP_BLUE_300 = "deep-blue-300",

  /**
   * Deep Blue 200: Medium deep blue for secondary elements
   * @aiUsage Secondary actions, supporting elements, muted professional contexts
   * @aiSemantic Subtle professionalism, supporting content, secondary information
   * @aiContrast Suitable for medium contrast needs, light backgrounds
   */
  DEEP_BLUE_200 = "deep-blue-200",

  /**
   * Deep Blue 100: Lightest deep blue for backgrounds and subtle elements
   * @aiUsage Background tints, subtle emphasis, disabled states
   * @aiSemantic Soft professionalism, background context, subtle branding
   * @aiContrast Low contrast, suitable for backgrounds and subtle elements
   */
  DEEP_BLUE_100 = "deep-blue-100",

  // Bright Blue - Primary brand, interactive, energetic
  /**
   * Bright Blue 400: Darkest bright blue for strong brand presence
   * @aiUsage Primary brand elements, important CTAs, strong interactive states
   * @aiSemantic Primary brand, energy, innovation, modern technology
   * @aiContrast Excellent contrast, suitable for important elements
   */
  BRIGHT_BLUE_400 = "bright-blue-400",

  /**
   * Bright Blue 300: Primary brand color - most common choice
   * @aiUsage Primary actions, brand icons, interactive elements, links
   * @aiSemantic Brand identity, interactivity, primary actions, digital innovation
   * @aiContrast Good contrast, ideal for interactive elements and primary actions
   */
  BRIGHT_BLUE_300 = "bright-blue-300",

  /**
   * Bright Blue 200: Medium bright blue for secondary brand elements
   * @aiUsage Secondary brand elements, hover states, supporting interactive elements
   * @aiSemantic Secondary brand presence, approachable technology, friendly interactions
   * @aiContrast Medium contrast, suitable for supporting elements
   */
  BRIGHT_BLUE_200 = "bright-blue-200",

  /**
   * Bright Blue 100: Lightest bright blue for backgrounds and subtle brand presence
   * @aiUsage Information backgrounds, subtle brand tints, informational contexts
   * @aiSemantic Subtle brand presence, informational content, approachable technology
   * @aiContrast Low contrast, suitable for backgrounds and informational contexts
   */
  BRIGHT_BLUE_100 = "bright-blue-100",

  // Blue Grey - Neutral, balanced, professional
  /**
   * Blue Grey 700: Darkest neutral for high contrast text and icons
   * @aiUsage Primary text, high contrast icons, important neutral elements
   * @aiSemantic Neutral authority, primary content, strong readability
   * @aiContrast Excellent contrast, meets WCAG AA standards for text
   */
  BLUE_GREY_700 = "blue-grey-700",

  /**
   * Blue Grey 600: Standard neutral for icons and secondary text
   * @aiUsage Standard icons, secondary text, neutral interactive elements
   * @aiSemantic Neutral professionalism, standard content, balanced design
   * @aiContrast Good contrast, suitable for icons and secondary content
   */
  BLUE_GREY_600 = "blue-grey-600",

  /**
   * Blue Grey 500: Medium neutral for supporting elements
   * @aiUsage Supporting icons, muted content, placeholder states
   * @aiSemantic Neutral support, background content, non-critical information
   * @aiContrast Medium contrast, suitable for supporting elements
   */
  BLUE_GREY_500 = "blue-grey-500",

  /**
   * Blue Grey 400: Light neutral for subtle elements
   * @aiUsage Disabled states, subtle icons, background supporting elements
   * @aiSemantic Muted content, disabled states, subtle guidance
   * @aiContrast Lower contrast, suitable for subtle and disabled elements
   */
  BLUE_GREY_400 = "blue-grey-400",

  /**
   * White: Pure white for dark backgrounds and contrast
   * @aiUsage Dark background icons, high contrast needs, overlay content
   * @aiSemantic Clarity, cleanliness, high contrast, overlay content
   * @aiContrast Excellent on dark backgrounds, inverse color schemes
   */
  WHITE = "white",

  // Green - Success, positive, growth, nature
  /**
   * Green 400: Darkest green for strong success indicators
   * @aiUsage Critical success states, confirmation actions, positive completion
   * @aiSemantic Strong success, confirmed completion, positive outcomes
   * @aiContrast Excellent contrast for important success messaging
   */
  GREEN_400 = "green-400",

  /**
   * Green 300: Primary success color - most common choice
   * @aiUsage Success messages, positive states, completion indicators, approval actions
   * @aiSemantic Success, approval, positive progress, environmental consciousness
   * @aiContrast Good contrast, ideal for success indicators and positive messaging
   */
  GREEN_300 = "green-300",

  /**
   * Green 200: Medium green for supporting success elements
   * @aiUsage Secondary success elements, positive hover states, growth indicators
   * @aiSemantic Positive progress, growth, secondary success context
   * @aiContrast Medium contrast, suitable for supporting positive elements
   */
  GREEN_200 = "green-200",

  /**
   * Green 100: Lightest green for success backgrounds
   * @aiUsage Success backgrounds, positive context tints, growth environments
   * @aiSemantic Subtle success context, positive environment, growth background
   * @aiContrast Low contrast, suitable for success backgrounds
   */
  GREEN_100 = "green-100",

  // Orange - Warning, attention, energy, creativity
  /**
   * Orange 400: Darkest orange for critical warnings
   * @aiUsage Critical warnings, urgent attention needed, important cautions
   * @aiSemantic Urgent attention, critical warnings, high priority alerts
   * @aiContrast Excellent contrast for critical warning messaging
   */
  ORANGE_400 = "orange-400",

  /**
   * Orange 300: Primary warning color - most common choice
   * @aiUsage Warning messages, caution states, attention indicators, pending actions
   * @aiSemantic Warning, caution, attention needed, pending states, creativity
   * @aiContrast Good contrast, ideal for warning indicators and attention messaging
   */
  ORANGE_300 = "orange-300",

  /**
   * Orange 200: Medium orange for supporting warning elements
   * @aiUsage Secondary warning elements, creative contexts, warm attention
   * @aiSemantic Moderate attention, creative energy, warm warnings
   * @aiContrast Medium contrast, suitable for supporting warning elements
   */
  ORANGE_200 = "orange-200",

  /**
   * Orange 100: Lightest orange for warning backgrounds
   * @aiUsage Warning backgrounds, attention context tints, creative environments
   * @aiSemantic Subtle warning context, creative environment, warm background
   * @aiContrast Low contrast, suitable for warning backgrounds
   */
  ORANGE_100 = "orange-100",

  // Red - Error, danger, urgent, stop
  /**
   * Red 400: Darkest red for critical errors
   * @aiUsage Critical errors, destructive actions, urgent problems, system failures
   * @aiSemantic Critical danger, system errors, destructive consequences, urgent stop
   * @aiContrast Excellent contrast for critical error messaging
   */
  RED_400 = "red-400",

  /**
   * Red 300: Primary error color - most common choice
   * @aiUsage Error messages, negative states, delete actions, failure indicators
   * @aiSemantic Error, danger, negative outcomes, destructive actions, urgency
   * @aiContrast Good contrast, ideal for error indicators and danger messaging
   */
  RED_300 = "red-300",

  /**
   * Red 200: Medium red for supporting error elements
   * @aiUsage Secondary error elements, negative hover states, moderate warnings
   * @aiSemantic Moderate danger, secondary errors, negative context
   * @aiContrast Medium contrast, suitable for supporting error elements
   */
  RED_200 = "red-200",

  /**
   * Red 100: Lightest red for error backgrounds
   * @aiUsage Error backgrounds, negative context tints, danger environments
   * @aiSemantic Subtle error context, negative environment, danger background
   * @aiContrast Low contrast, suitable for error backgrounds
   */
  RED_100 = "red-100",

  // Yellow - Highlight, star ratings, sunshine, optimism
  /**
   * Yellow 400: Darkest yellow for strong highlights
   * @aiUsage Premium features, star ratings, important highlights, achievement badges
   * @aiSemantic Excellence, premium quality, achievement, strong positive highlight
   * @aiContrast Good contrast, suitable for important highlighting
   */
  YELLOW_400 = "yellow-400",

  /**
   * Yellow 300: Primary highlight color
   * @aiUsage Star ratings, featured content, positive highlights, awards
   * @aiSemantic Quality, featured content, positive recognition, optimism
   * @aiContrast Good contrast, ideal for positive highlighting and ratings
   */
  YELLOW_300 = "yellow-300",

  /**
   * Yellow 200: Medium yellow for supporting highlights
   * @aiUsage Secondary highlights, optimistic contexts, supporting star elements
   * @aiSemantic Positive energy, optimism, secondary featured content
   * @aiContrast Medium contrast, suitable for supporting highlight elements
   */
  YELLOW_200 = "yellow-200",

  /**
   * Yellow 100: Light yellow for highlight backgrounds
   * @aiUsage Highlight backgrounds, featured content tints, positive environments
   * @aiSemantic Subtle positivity, featured environment, optimistic background
   * @aiContrast Low contrast, suitable for highlight backgrounds
   */
  YELLOW_100 = "yellow-100",

  /**
   * Yellow 50: Subtle yellow for minimal highlighting
   * @aiUsage Very subtle highlights, minimal featured context, soft positive tints
   * @aiSemantic Very subtle positivity, minimal featured context, soft optimism
   * @aiContrast Very low contrast, suitable for subtle highlighting only
   */
  YELLOW_50 = "yellow-50",
}

/**
 * AI-friendly icon color selection guide
 * Provides semantic and contextual recommendations for choosing appropriate colors
 */
export const IconColorGuide = {
  /**
   * Color selection by semantic meaning
   */
  bySemantic: {
    // Primary brand and interactive
    primary: IconColors.BRIGHT_BLUE_300,
    interactive: IconColors.BRIGHT_BLUE_300,
    brand: IconColors.BRIGHT_BLUE_300,
    link: IconColors.BRIGHT_BLUE_300,

    // Status and feedback
    success: IconColors.GREEN_300,
    positive: IconColors.GREEN_300,
    approval: IconColors.GREEN_300,
    completion: IconColors.GREEN_300,

    warning: IconColors.ORANGE_300,
    caution: IconColors.ORANGE_300,
    attention: IconColors.ORANGE_300,
    pending: IconColors.ORANGE_300,

    error: IconColors.RED_300,
    danger: IconColors.RED_300,
    negative: IconColors.RED_300,
    destructive: IconColors.RED_300,

    // Neutral states
    neutral: IconColors.BLUE_GREY_600,
    secondary: IconColors.BLUE_GREY_500,
    disabled: IconColors.BLUE_GREY_400,
    placeholder: IconColors.BLUE_GREY_400,

    // Special contexts
    highlight: IconColors.YELLOW_300,
    featured: IconColors.YELLOW_300,
    star: IconColors.YELLOW_300,
    premium: IconColors.YELLOW_400,

    professional: IconColors.DEEP_BLUE_300,
    corporate: IconColors.DEEP_BLUE_300,
    trust: IconColors.DEEP_BLUE_300,
  },

  /**
   * Color selection by component context
   */
  byComponent: {
    "nck-banner": {
      success: IconColors.GREEN_300,
      error: IconColors.RED_300,
      warning: IconColors.ORANGE_300,
      info: IconColors.BRIGHT_BLUE_300,
      neutral: IconColors.BLUE_GREY_600,
    },
    "nck-button": {
      primary: IconColors.WHITE, // On colored button backgrounds
      secondary: IconColors.BRIGHT_BLUE_300, // On light button backgrounds
      danger: IconColors.WHITE, // On red button backgrounds
    },
    "nck-badge": {
      success: IconColors.GREEN_300,
      error: IconColors.RED_300,
      warning: IconColors.ORANGE_300,
      info: IconColors.BRIGHT_BLUE_300,
      neutral: IconColors.BLUE_GREY_600,
    },
  },

  /**
   * Color selection by background context
   */
  byBackground: {
    light: IconColors.BLUE_GREY_600, // Standard icons on light backgrounds
    dark: IconColors.WHITE, // Icons on dark backgrounds
    colored: IconColors.WHITE, // Icons on colored backgrounds
    brand: IconColors.WHITE, // Icons on brand color backgrounds
  },
} as const;

/**
 * Icon color accessibility guidelines
 */
export const IconColorAccessibility = {
  /**
   * High contrast color recommendations for accessibility compliance
   */
  highContrast: {
    text: IconColors.BLUE_GREY_700, // Meets WCAG AA for text
    interactive: IconColors.BRIGHT_BLUE_300, // Good contrast for interactive elements
    status: {
      success: IconColors.GREEN_400, // Higher contrast green
      error: IconColors.RED_400, // Higher contrast red
      warning: IconColors.ORANGE_400, // Higher contrast orange
    },
  },

  /**
   * Color usage guidelines for accessibility
   */
  guidelines: {
    contrast: "Ensure minimum 3:1 contrast ratio for graphic elements, 4.5:1 for text-like icons",
    colorBlind: "Don't rely solely on color to convey meaning - combine with shape, text, or position",
    semantic: "Use consistent color meanings across the application (green=success, red=error, etc.)",
    testing: "Test color combinations with accessibility tools and color blindness simulators",
  },
} as const;

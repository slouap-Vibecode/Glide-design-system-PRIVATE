import { IconSize } from "../../constants/iconSize";
import { IconColors } from "../../constants/iconColors";

/**
 * Interface for nck-icon component props
 * Universal icon component that loads and displays SVG icons from the Neo Icon Kit
 *
 * @aiUsage Core visual component used throughout all interfaces - handles icon loading, sizing, and accessibility
 * @aiCategory layout
 * @aiComplexity simple
 */
export interface INckIcon {
  /**
   * Icon name from Neo Icon Kit (833 available icons)
   * Must match exact SVG filename without extension
   * @example "check", "add-plus", "warning-filled", "amenity-parking", "currency-dollar-filled"
   * @aiRequired true
   * @aiSuggestions {
   *   "success": "check-filled",
   *   "error": "cancel-circle-filled",
   *   "warning": "warning-filled",
   *   "info": "info-support-filled",
   *   "add": "add-plus",
   *   "edit": "edit",
   *   "delete": "delete",
   *   "save": "check",
   *   "close": "close",
   *   "back": "arrow-left",
   *   "next": "arrow-right",
   *   "up": "arrow-up",
   *   "down": "arrow-down"
   * }
   */
  iconName: string;

  /**
   * Icon display size - controls both width and height
   * - XXS: 0.5rem (8px) - Inline text icons
   * - XS: 1rem (16px) - Small buttons, form controls
   * - S: 1.25rem (20px) - Standard buttons, navigation
   * - M: 1.5rem (24px) - Larger buttons, headers
   * - L: 2rem (32px) - Feature icons, emphasis
   * - XL: 3rem (48px) - Hero icons, illustrations
   * @aiRequired true
   * @aiSuggestions {
   *   "button": "S",
   *   "form": "XS",
   *   "header": "M",
   *   "feature": "L",
   *   "hero": "XL",
   *   "inline": "XXS"
   * }
   */
  iconSize: IconSize;

  /**
   * Accessible alternative text for screen readers
   * - Use descriptive text when icon conveys important information
   * - Use empty string "" when icon is purely decorative
   * - Use action text for functional icons ("Save", "Delete", "Close")
   * @example "Save document", "Delete item", "Close dialog", "" (decorative)
   * @aiRequired true
   * @aiGuidance "Provide meaningful description for functional icons, empty string for decorative"
   */
  iconAltText: string;

  /**
   * Primary fill color override using design system colors
   * Automatically calculated based on context if not provided
   * @default Inherited from design system context
   * @aiSuggestions {
   *   "success": "green-300",
   *   "error": "red-300",
   *   "warning": "orange-300",
   *   "info": "bright-blue-300",
   *   "neutral": "blue-grey-500",
   *   "brand": "bright-blue-300"
   * }
   */
  primaryColor?: IconColors;

  /**
   * Secondary fill color for icons with multiple color elements
   * Only used by icons that have secondary fill areas (badges, backgrounds)
   * @example Icons like "amenity-forward-facing-seat-dark" with seat + background colors
   * @aiUsage Only use with icons that have secondary color elements
   */
  secondaryColor?: IconColors;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common icon usage patterns and best practices
 */
export const NckIconExamples = {
  /**
   * Functional button icon with accessible text
   * @aiContext Action buttons, interactive elements
   */
  functional: `<nck-icon
    iconName="check"
    :iconSize="IconSize.S"
    iconAltText="Save changes"
    :primaryColor="IconColors.GREEN_300" />`,

  /**
   * Decorative icon without alt text
   * @aiContext Visual enhancement, non-essential decoration
   */
  decorative: `<nck-icon
    iconName="star-filled"
    :iconSize="IconSize.XS"
    iconAltText=""
    :primaryColor="IconColors.YELLOW_300" />`,

  /**
   * Status indicator icon with semantic coloring
   * @aiContext Status displays, state indicators
   */
  status: `<nck-icon
    iconName="warning-filled"
    :iconSize="IconSize.M"
    iconAltText="Warning"
    :primaryColor="IconColors.ORANGE_300" />`,

  /**
   * Large feature icon for emphasis
   * @aiContext Hero sections, feature highlights, empty states
   */
  feature: `<nck-icon
    iconName="chart-line"
    :iconSize="IconSize.XL"
    iconAltText="Analytics dashboard"
    :primaryColor="IconColors.BRIGHT_BLUE_300" />`,

  /**
   * Navigation icon with directional meaning
   * @aiContext Navigation controls, arrows, directional actions
   */
  navigation: `<nck-icon
    iconName="arrow-right"
    :iconSize="IconSize.S"
    iconAltText="Continue to next step"
    :primaryColor="IconColors.BRIGHT_BLUE_300" />`,

  /**
   * Multi-color icon with primary and secondary fills
   * @aiContext Rich icons with backgrounds, badges, complex graphics
   */
  multiColor: `<nck-icon
    iconName="amenity-parking"
    :iconSize="IconSize.M"
    iconAltText="Parking available"
    :primaryColor="IconColors.BRIGHT_BLUE_300"
    :secondaryColor="IconColors.GREEN_300" />`,

  /**
   * Currency icon for financial content
   * @aiContext Payment interfaces, pricing, financial data
   */
  currency: `<nck-icon
    iconName="currency-dollar-filled"
    :iconSize="IconSize.S"
    iconAltText="US Dollar"
    :primaryColor="IconColors.GREEN_300" />`,

  /**
   * Inline icon sized for text content
   * @aiContext Inline with text, small indicators, list bullets
   */
  inline: `<span class="text-content">
    Available features
    <nck-icon
      iconName="check-filled"
      :iconSize="IconSize.XXS"
      iconAltText=""
      :primaryColor="IconColors.GREEN_300" />
  </span>`,

  /**
   * Loading state icon
   * @aiContext Async operations, processing states
   */
  loading: `<nck-icon
    iconName="loading"
    :iconSize="IconSize.M"
    iconAltText="Loading content"
    :primaryColor="IconColors.BLUE_GREY_500" />`,
} as const;

/**
 * Icon selection guidance by usage context
 */
export const NckIconContextGuide = {
  /**
   * Common action icons and their semantic meanings
   */
  actions: {
    save: { icon: "check", altText: "Save", color: "green-300" },
    add: { icon: "add-plus", altText: "Add new", color: "bright-blue-300" },
    edit: { icon: "edit", altText: "Edit", color: "bright-blue-300" },
    delete: { icon: "delete", altText: "Delete", color: "red-300" },
    close: { icon: "close", altText: "Close", color: "blue-grey-500" },
    search: { icon: "search", altText: "Search", color: "blue-grey-500" },
    filter: { icon: "filter", altText: "Filter", color: "blue-grey-500" },
    refresh: { icon: "refresh", altText: "Refresh", color: "bright-blue-300" },
  },

  /**
   * Status and feedback icons with appropriate colors
   */
  status: {
    success: { icon: "check-filled", altText: "Success", color: "green-300" },
    error: { icon: "cancel-circle-filled", altText: "Error", color: "red-300" },
    warning: { icon: "warning-filled", altText: "Warning", color: "orange-300" },
    info: { icon: "info-support-filled", altText: "Information", color: "bright-blue-300" },
    pending: { icon: "clock", altText: "Pending", color: "orange-300" },
    loading: { icon: "loading", altText: "Loading", color: "blue-grey-500" },
  },

  /**
   * Navigation and directional icons
   */
  navigation: {
    back: { icon: "arrow-left", altText: "Go back", color: "bright-blue-300" },
    forward: { icon: "arrow-right", altText: "Continue", color: "bright-blue-300" },
    up: { icon: "arrow-up", altText: "Move up", color: "bright-blue-300" },
    down: { icon: "arrow-down", altText: "Move down", color: "bright-blue-300" },
    external: { icon: "external-link", altText: "Opens in new window", color: "bright-blue-300" },
    dropdown: { icon: "chevron-down", altText: "Show options", color: "blue-grey-500" },
  },

  /**
   * User and account related icons
   */
  user: {
    profile: { icon: "account-filled", altText: "User profile", color: "bright-blue-300" },
    login: { icon: "login", altText: "Sign in", color: "bright-blue-300" },
    logout: { icon: "logout", altText: "Sign out", color: "blue-grey-500" },
    settings: { icon: "settings", altText: "Settings", color: "blue-grey-500" },
    security: { icon: "shield", altText: "Security", color: "green-300" },
  },

  /**
   * Content and media icons
   */
  content: {
    document: { icon: "document", altText: "Document", color: "blue-grey-500" },
    image: { icon: "image", altText: "Image", color: "blue-grey-500" },
    video: { icon: "video", altText: "Video", color: "blue-grey-500" },
    download: { icon: "download", altText: "Download", color: "bright-blue-300" },
    upload: { icon: "upload", altText: "Upload", color: "bright-blue-300" },
  },
} as const;

/**
 * AI guidance for icon implementation
 */
export const NckIconAIGuidance = {
  /**
   * Size selection guidelines
   */
  sizeGuidance: {
    XXS: "Inline with text, tiny indicators, minimal space constraints",
    XS: "Form controls, small buttons, table actions, compact interfaces",
    S: "Standard buttons, navigation items, most common use case",
    M: "Larger buttons, section headers, prominent actions",
    L: "Feature icons, section dividers, important visual emphasis",
    XL: "Hero sections, empty states, primary visual elements",
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    functionalIcons: "Always provide descriptive iconAltText for icons that convey meaning",
    decorativeIcons: 'Use empty string "" for iconAltText when icon is purely visual',
    actionContext: "Alt text should describe the action, not the icon appearance",
    consistency: "Use consistent alt text patterns across similar functions",
    screenReader: "Consider how the icon + surrounding content sounds to screen readers",
  },

  /**
   * Color usage guidelines
   */
  colorGuidance: {
    semantic: "Use semantic colors that match icon meaning (green for success, red for errors)",
    contrast: "Ensure sufficient contrast against background colors",
    consistency: "Use consistent color patterns for similar icon types",
    branding: "Use bright-blue-300 for brand-related icons and primary actions",
    neutrality: "Use blue-grey colors for neutral, secondary actions",
  },

  /**
   * Performance considerations
   */
  performance: {
    iconLoading: "Icons load asynchronously - consider loading states for critical icons",
    caching: "Icon SVG content is cached automatically after first load",
    errorHandling: "Component handles missing icons gracefully with fallback display",
    bundleSize: "Icon SVGs are loaded on-demand, not bundled with application code",
  },

  /**
   * Common usage patterns
   */
  usagePatterns: {
    buttonIcons: "Use with nck-button leftIcon/rightIcon props for integrated styling",
    statusIndicators: "Combine with badges or text for clear status communication",
    lists: "Use consistently sized icons in lists for visual alignment",
    navigation: "Use directional icons to reinforce navigation flow",
    emptyStates: "Use large, friendly icons to soften empty content areas",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    missingAltText: "Don't leave iconAltText undefined - always provide string (even empty)",
    wrongSizes: "Don't use XL icons in buttons or XXS icons for primary actions",
    colorMismatch: "Don't use red colors for positive actions or green for errors",
    overuseSecondaryColor: "Don't use secondaryColor unless icon actually has secondary elements",
    inconsistentSizing: "Don't mix different icon sizes for same functional context",
  },
} as const;

import { ButtonType } from "../../constants/buttonType";
import { ButtonSize } from "../../constants/buttonSize";
import { ButtonColor } from "../../constants/buttonColor";
import { ButtonControlType } from "../../constants/buttonControlType";

/**
 * Interface for nck-button component props
 * Interactive button component with icons, loading states, and accessibility built-in
 *
 * @aiUsage Primary component for user actions - automatically handles accessibility, focus, and loading states
 * @aiCategory action
 * @aiComplexity simple
 */
export interface INckButton {
  /**
   * Button display text - the main label users will see
   * If empty, you must provide iconAltText for accessibility
   * @example "Save Changes", "Delete Item", "Continue"
   * @aiRequired When no icon alt text is provided
   */
  label?: string;

  /**
   * Button visual hierarchy - controls appearance and semantic meaning
   * - filled: Primary actions (save, submit, confirm) - solid background
   * - outline: Secondary actions (cancel, back) - border only
   * - ghost: Tertiary actions (help, learn more) - text only
   * @default "filled"
   * @aiSuggestions { "primary": "filled", "secondary": "outline", "tertiary": "ghost" }
   */
  type?: ButtonType;

  /**
   * Button size variant - affects padding, text size, and icon size
   * - s: Small buttons for compact interfaces (desktop only)
   * - m: Medium buttons for standard use (most common)
   * - l: Large buttons for prominent actions
   * @default "m"
   */
  size?: ButtonSize;

  /**
   * Button color theme - semantic meaning through color
   * - light: Default light theme (most common)
   * - primary: Main brand actions
   * - positive: Success/confirmation actions (green)
   * - negative: Destructive actions (red)
   * @default "light"
   * @aiSuggestions { "save": "primary", "delete": "negative", "cancel": "light", "confirm": "positive" }
   */
  color?: ButtonColor;

  /**
   * ARIA role override - changes semantic meaning
   * - button: Interactive button element (default)
   * - link: Navigation link behavior
   * @default "button"
   * @aiUsage Use "link" for navigation actions, "button" for form actions
   */
  ariaRole?: "button" | "link";

  /**
   * Native button type - only applies when ariaRole is "button"
   * Controls form submission behavior
   * @default ButtonControlType.BUTTON
   * @aiUsage Use SUBMIT for form submission buttons
   */
  controlType?: ButtonControlType;

  /**
   * Icon name from neo-icon-kit displayed on the left side
   * Use semantic icons that reinforce the action meaning
   * @example "check", "add-plus", "edit", "delete", "arrow-left"
   * @aiSuggestions { "save": "check", "add": "add-plus", "edit": "edit", "delete": "delete", "back": "arrow-left" }
   */
  leftIcon?: string;

  /**
   * Icon name from neo-icon-kit displayed on the right side
   * Commonly used for directional actions or external links
   * @example "arrow-right", "external-link", "chevron-down"
   */
  rightIcon?: string;

  /**
   * Disables button interaction - prevents clicks and shows disabled state
   * When true, button becomes non-interactive and visually dimmed
   * @default false
   */
  disabled?: boolean;

  /**
   * Alternative text for left icon - for accessibility
   * Required when leftIcon is provided and conveys meaning
   * Use empty string "" for purely decorative icons
   * @example "Save", "Add new item", "Go back", ""
   * @aiUsage Provide meaningful text when icon conveys action information
   */
  iconAltText?: string;

  /**
   * Alternative text for right icon - for accessibility
   * Required when rightIcon is provided and conveys meaning
   * Use empty string "" for purely decorative icons
   */
  rightIconAltText?: string;

  /**
   * Make button take full width of parent container
   * Useful for mobile layouts or full-width call-to-action buttons
   * @default false
   */
  fullwidth?: boolean;

  /**
   * Shows loading spinner and prevents interaction
   * Use for async operations like form submissions, API calls
   * @default false
   * @aiUsage Always provide loading states for async actions
   * @aiWarning Only beginning of loading is announced - handle end announcement yourself
   */
  loading?: boolean;

  /**
   * Accessible text announced to screen readers during loading
   * Mandatory if button can be in loading mode
   * @example "Saving your changes...", "Deleting item...", "Processing request..."
   * @aiRequired When loading prop is used
   */
  loadingText?: string;

  /**
   * Creates a floating action button (round shape)
   * Adds elevated shadow and round styling
   * Note: Ghost type becomes Outline when floating
   * @default false
   * @aiUsage Use for primary floating actions in mobile interfaces
   */
  floating?: boolean;

  /**
   * Display counter badge with this number
   * Shows 99+ for numbers > 99, must be integer >= 0
   * Badge appears after label or top-right of right icon
   * @aiUsage Use for notification counts, item counts
   */
  counterBadgeEntry?: number;

  /**
   * Adds "+" prefix to counter badge number
   * @default false
   * @aiUsage Use when counter represents additions or growth
   */
  counterBadgePlusPrefix?: boolean;

  /**
   * HTML form attribute - associates button with specific form by ID
   * Only applies when ariaRole is "button"
   * Useful for buttons outside the form element
   * @example "user-settings-form", "checkout-form"
   */
  form?: string;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common patterns and best practices
 */
export const NckButtonExamples = {
  /**
   * Simple primary button - most common usage
   * @aiContext Form submissions, primary actions, confirmations
   */
  primary: `<nck-button label="Save Changes" type="filled" />`,

  /**
   * Secondary action button - for alternative actions
   * @aiContext Cancel buttons, back navigation, alternative paths
   */
  secondary: `<nck-button label="Cancel" type="outline" color="secondary" />`,

  /**
   * Button with left icon - reinforces action meaning
   * @aiContext Actions where icon adds clarity (save, add, edit, delete)
   */
  withLeftIcon: `<nck-button label="Add Item" type="filled" leftIcon="add-plus" />`,

  /**
   * Button with right icon - for directional or external actions
   * @aiContext Navigation, external links, dropdown triggers
   */
  withRightIcon: `<nck-button label="Continue" type="filled" rightIcon="arrow-right" />`,

  /**
   * Loading button - for async operations
   * @aiContext Form submissions, API calls, any async action
   */
  loading: `<nck-button label="Saving..." :loading="true" loadingText="Saving your changes" />`,

  /**
   * Disabled button - for unavailable actions
   * @aiContext Form validation, conditional actions, locked states
   */
  disabled: `<nck-button label="Submit" :disabled="!isFormValid" />`,

  /**
   * Destructive action button - for dangerous operations
   * @aiContext Delete operations, irreversible actions
   */
  danger: `<nck-button label="Delete Item" type="filled" color="danger" leftIcon="delete" />`,

  /**
   * Small button - for compact interfaces
   * @aiContext Table actions, toolbars, dense layouts
   */
  compact: `<nck-button label="Edit" type="outline" size="s" leftIcon="edit" />`,

  /**
   * Large prominent button - for important actions
   * @aiContext Hero sections, call-to-action, primary flows
   */
  prominent: `<nck-button label="Get Started" type="filled" size="l" />`,

  /**
   * Form submission button - proper type for forms
   * @aiContext Inside nck-form components, native form submissions
   */
  formSubmit: `<nck-button label="Submit" type="filled" nativeType="submit" />`,

  /**
   * Ghost button - minimal styling for tertiary actions
   * @aiContext Help links, optional actions, subtle interactions
   */
  subtle: `<nck-button label="Learn More" type="ghost" rightIcon="arrow-right" />`,
} as const;

/**
 * AI guidance for common use cases and patterns
 */
export const NckButtonAIGuidance = {
  /**
   * When to use each button type
   */
  typeUsage: {
    filled: "Primary actions: save, submit, confirm, main call-to-action",
    outline: "Secondary actions: cancel, back, edit, alternative options",
    ghost: "Tertiary actions: help, learn more, optional interactions",
  },

  /**
   * Color semantic meanings
   */
  colorMeaning: {
    primary: "Main brand actions, positive progress, default choice",
    secondary: "Alternative actions, neutral operations, cancel options",
    danger: "Destructive actions, delete operations, irreversible changes",
    success: "Positive confirmations, completion actions, approve operations",
  },

  /**
   * Icon recommendations by action context
   */
  iconSuggestions: {
    save: { icon: "check", position: "left", alt: "Save" },
    add: { icon: "add-plus", position: "left", alt: "Add" },
    edit: { icon: "edit", position: "left", alt: "Edit" },
    delete: { icon: "delete", position: "left", alt: "Delete" },
    back: { icon: "arrow-left", position: "left", alt: "Go back" },
    next: { icon: "arrow-right", position: "right", alt: "Continue" },
    external: { icon: "external-link", position: "right", alt: "Opens in new tab" },
    download: { icon: "download", position: "left", alt: "Download" },
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    labels: "Use descriptive labels that explain the action, avoid 'Click here'",
    loading: "Always provide loadingText for screen reader users during async operations",
    icons: "Use leftIconAlternativeText when icons convey meaning, empty string for decoration",
    disabled: "Ensure disabled reasons are clear from context or additional messaging",
    keyboard: "All buttons automatically support Enter and Space key activation",
  },

  /**
   * Common anti-patterns to avoid
   */
  antiPatterns: {
    multiPrimary: "Don't use multiple filled buttons in the same section",
    genericLabels: "Avoid labels like 'Click here', 'Button', 'OK' - be specific",
    missingLoading: "Always show loading states for async operations",
    wrongColors: "Don't use danger color for non-destructive actions",
    tooManyIcons: "Limit to one icon per button, prefer left side for actions",
  },
} as const;

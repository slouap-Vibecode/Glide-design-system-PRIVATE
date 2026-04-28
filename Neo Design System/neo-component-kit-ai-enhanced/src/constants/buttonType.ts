/**
 * Button visual hierarchy types for consistent interaction design
 * Controls button appearance and conveys interaction importance
 *
 * @aiUsage Core interaction hierarchy system - choose based on action priority and visual weight
 * @aiCategory interaction
 */
export enum ButtonType {
  /**
   * Filled Button: Solid background with highest visual weight
   * @aiUsage Primary actions, main call-to-action, most important interactions
   * @aiContext Form submissions, purchase actions, primary workflows, confirmation actions
   * @aiHierarchy Highest priority - use sparingly, ideally one per screen section
   * @aiExample "Save Changes", "Buy Now", "Submit Form", "Create Account"
   */
  FILLED = "filled",

  /**
   * Outline Button: Border with transparent background
   * @aiUsage Secondary actions, alternative options, supporting interactions
   * @aiContext Cancel actions, alternative paths, secondary workflows, navigation
   * @aiHierarchy Medium priority - supports primary actions without competing
   * @aiExample "Cancel", "Back", "Edit", "View Details", "Export Data"
   */
  OUTLINE = "outline",

  /**
   * Ghost Button: Minimal styling, text-only appearance
   * @aiUsage Tertiary actions, optional interactions, subtle navigation
   * @aiContext Help links, optional features, subtle actions, text-based navigation
   * @aiHierarchy Lowest priority - for optional or supporting interactions
   * @aiExample "Learn More", "Skip", "Help", "View All", "Advanced Options"
   */
  GHOST = "ghost",
}

/**
 * AI-friendly button type selection guide
 * Provides contextual recommendations for choosing appropriate button hierarchy
 */
export const ButtonTypeGuide = {
  /**
   * Selection by action priority and context
   */
  byPriority: {
    primary: ButtonType.FILLED, // Main action user should take
    secondary: ButtonType.OUTLINE, // Alternative or supporting action
    tertiary: ButtonType.GHOST, // Optional or subtle action
  },

  /**
   * Selection by action type and semantic meaning
   */
  byActionType: {
    // Commitment and creation actions
    create: ButtonType.FILLED, // "Create Account", "Add Item", "Start Project"
    save: ButtonType.FILLED, // "Save Changes", "Save Draft", "Update Profile"
    submit: ButtonType.FILLED, // "Submit Form", "Send Message", "Place Order"
    confirm: ButtonType.FILLED, // "Confirm Purchase", "Yes, Delete", "Proceed"

    // Navigation and exploration
    navigate: ButtonType.OUTLINE, // "View Details", "Go to Dashboard", "Continue"
    back: ButtonType.OUTLINE, // "Back", "Previous", "Return"
    cancel: ButtonType.OUTLINE, // "Cancel", "Discard", "Close"
    edit: ButtonType.OUTLINE, // "Edit", "Modify", "Change"

    // Optional and informational
    help: ButtonType.GHOST, // "Help", "Learn More", "Documentation"
    optional: ButtonType.GHOST, // "Skip", "Maybe Later", "Not Now"
    info: ButtonType.GHOST, // "View All", "Show Details", "More Info"
    subtle: ButtonType.GHOST, // "Advanced Settings", "Customize", "Preferences"
  },

  /**
   * Selection by UI context and layout
   */
  byContext: {
    forms: {
      submit: ButtonType.FILLED, // Primary form submission
      cancel: ButtonType.OUTLINE, // Form cancellation
      reset: ButtonType.GHOST, // Reset to defaults
    },
    modals: {
      confirm: ButtonType.FILLED, // Confirmation action
      cancel: ButtonType.OUTLINE, // Close/cancel modal
      help: ButtonType.GHOST, // Help or info links
    },
    cards: {
      primary: ButtonType.FILLED, // Main card action
      secondary: ButtonType.OUTLINE, // Secondary card action
      details: ButtonType.GHOST, // "View Details", "Learn More"
    },
    navigation: {
      cta: ButtonType.FILLED, // Call-to-action nav items
      standard: ButtonType.OUTLINE, // Standard navigation
      breadcrumb: ButtonType.GHOST, // Breadcrumb navigation
    },
  },
} as const;

/**
 * Button type visual hierarchy and usage patterns
 */
export const ButtonTypePatterns = {
  /**
   * Visual weight and attention hierarchy
   */
  visualHierarchy: {
    [ButtonType.FILLED]: {
      weight: "High",
      attention: "Maximum",
      usage: "1-2 per screen section",
      background: "Solid color",
      contrast: "High",
    },
    [ButtonType.OUTLINE]: {
      weight: "Medium",
      attention: "Moderate",
      usage: "2-4 per screen section",
      background: "Transparent",
      contrast: "Medium",
    },
    [ButtonType.GHOST]: {
      weight: "Low",
      attention: "Minimal",
      usage: "Unlimited",
      background: "None",
      contrast: "Low",
    },
  },

  /**
   * Common button grouping patterns
   */
  groupingPatterns: {
    primarySecondary: [ButtonType.FILLED, ButtonType.OUTLINE],
    fullHierarchy: [ButtonType.FILLED, ButtonType.OUTLINE, ButtonType.GHOST],
    modalActions: [ButtonType.FILLED, ButtonType.OUTLINE], // Confirm + Cancel
    formActions: [ButtonType.FILLED, ButtonType.OUTLINE, ButtonType.GHOST], // Submit + Cancel + Help
    cardActions: [ButtonType.OUTLINE, ButtonType.GHOST], // Action + Details
  },
} as const;

/**
 * Button type accessibility and UX guidelines
 */
export const ButtonTypeAccessibility = {
  /**
   * Accessibility considerations by button type
   */
  guidelines: {
    [ButtonType.FILLED]: {
      contrast: "Ensure sufficient contrast between text and background color",
      focus: "Provide clear focus indicators that work with solid backgrounds",
      recognition: "High visual prominence aids users in identifying primary actions",
    },
    [ButtonType.OUTLINE]: {
      contrast: "Ensure border and text have sufficient contrast with background",
      focus: "Focus states should be distinguishable from border styling",
      recognition: "Medium prominence helps users identify secondary actions",
    },
    [ButtonType.GHOST]: {
      contrast: "Text must meet minimum contrast requirements",
      focus: "Provide clear focus indicators since button has minimal visual presence",
      recognition: "Low prominence requires clear labeling for discoverability",
    },
  },

  /**
   * Screen reader and keyboard navigation considerations
   */
  screenReader: {
    labeling: "All button types require clear, descriptive labels that explain the action",
    context: "Provide sufficient context for the action, especially for ghost buttons",
    grouping: "Use consistent button type patterns to help users predict interface behavior",
  },
} as const;

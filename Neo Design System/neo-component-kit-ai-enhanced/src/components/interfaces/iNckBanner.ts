import { BannerType } from "../../constants/bannerType";

/**
 * Interface for nck-banner component props
 * Alert and notification component for displaying contextual system messages
 *
 * @aiUsage Primary component for user notifications - handles semantic messaging with icons and dismissal
 * @aiCategory feedback
 * @aiComplexity medium
 */
export interface INckBanner {
  /**
   * Banner display text - the main message users will see
   * Plain text only, no HTML allowed for security and consistency
   * @example "Changes saved successfully", "Please check your input", "Connection failed"
   * @aiRequired true
   */
  heading: string;

  /**
   * Banner semantic type - controls appearance and meaning
   * - NEUTRAL: Default informational messages (gray theme)
   * - INFORMATION: General information and tips (blue theme)
   * - SUCCESS: Positive confirmations and completions (green theme)
   * - WARNING: Caution messages and attention needed (orange theme)
   * - ERROR: Critical errors and failures (red theme)
   * @default BannerType.NEUTRAL
   * @aiSuggestions {
   *   "success": "SUCCESS",
   *   "error": "ERROR",
   *   "warning": "WARNING",
   *   "info": "INFORMATION",
   *   "default": "NEUTRAL"
   * }
   */
  type?: BannerType;

  /**
   * Enables dismissal functionality with close button
   * When true, shows an X button that allows users to hide the banner
   * @default false
   * @aiUsage Enable for non-critical messages that users can dismiss
   */
  dismissable?: boolean;

  /**
   * Removes rounded corners for edge-to-edge styling
   * Use when banner spans full container width without margins
   * @default false
   * @aiUsage Enable for full-width page notifications or card-edge styling
   */
  noRadius?: boolean;

  /**
   * Clickable link text displayed after the heading
   * Must be used with linkAriaRole and link-clicked event handler
   * @example "Learn more", "View details", "Try again"
   * @aiUsage Use for contextual actions related to the banner message
   */
  linkLabel?: string;

  /**
   * ARIA role for the link element - defines interaction semantic
   * - button: Link performs an action (like opening modal, triggering process)
   * - link: Link navigates to another page or section
   * @aiRequired When linkLabel is provided
   * @aiSuggestions { "action": "button", "navigation": "link", "modal": "button" }
   */
  linkAriaRole?: "button" | "link";

  /**
   * Custom icon name from neo-icon-kit to override default type icon
   * Replaces semantic type icon with specific icon for context
   * @example "coffee-cup" for success with custom context
   * @aiUsage Use when default type icon doesn't match specific context
   */
  leadingIcon?: string;

  /**
   * Alternative text for custom leading icon - for accessibility
   * Required when leadingIcon conveys specific meaning beyond banner type
   * If not provided, uses default translation for banner type
   * @example "Coffee ready", "Download complete", "Server offline"
   * @aiRequired When leadingIcon is provided and conveys specific meaning
   */
  leadingIconAltText?: string;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common banner patterns and best practices
 */
export const NckBannerExamples = {
  /**
   * Success notification - positive confirmations
   * @aiContext Form submissions, save operations, successful processes
   */
  success: `<nck-banner
    type="success"
    heading="Changes saved successfully"
    :dismissable="true"
    @banner-dismissed="handleDismiss" />`,

  /**
   * Error notification - critical alerts
   * @aiContext Form validation errors, API failures, system issues
   */
  error: `<nck-banner
    type="critical"
    heading="Unable to save changes"
    linkLabel="Try again"
    linkAriaRole="button"
    @link-clicked="retryAction" />`,

  /**
   * Warning notification - cautionary messages
   * @aiContext Data validation, important notices, attention needed
   */
  warning: `<nck-banner
    type="warning"
    heading="Your session will expire in 5 minutes"
    linkLabel="Extend session"
    linkAriaRole="button"
    @link-clicked="extendSession" />`,

  /**
   * Information banner - general guidance
   * @aiContext Tips, help text, feature announcements
   */
  information: `<nck-banner
    type="info"
    heading="New features are now available"
    linkLabel="Learn more"
    linkAriaRole="link"
    :dismissable="true"
    @link-clicked="navigateToFeatures" />`,

  /**
   * Custom icon banner - specific context messaging
   * @aiContext Domain-specific notifications, custom workflows
   */
  customIcon: `<nck-banner
    type="success"
    heading="Your coffee is ready"
    leadingIcon="breakfast"
    leadingIconAltText="Coffee cup"
    :dismissable="true" />`,

  /**
   * Full-width banner - page-level notifications
   * @aiContext System-wide messages, maintenance notices
   */
  fullWidth: `<nck-banner
    type="warning"
    heading="Scheduled maintenance tonight from 2-4 AM EST"
    :noRadius="true"
    linkLabel="View details"
    linkAriaRole="link"
    @link-clicked="viewMaintenanceInfo" />`,

  /**
   * Banner with detailed content using item groups
   * @aiContext Multi-point messages, validation feedback lists
   */
  withItems: `<nck-banner
    type="critical"
    heading="Please fix the following issues:">

    <nck-banner-item-group>
      <nck-banner-item text="Email address is required" />
      <nck-banner-item
        text="Password must be at least 8 characters"
        linkLabel="View requirements"
        linkAriaRole="link"
        @link-clicked="showPasswordHelp" />
      <nck-banner-item text="Terms of service must be accepted" />
    </nck-banner-item-group>
  </nck-banner>`,

  /**
   * Persistent system banner - non-dismissable critical info
   * @aiContext Critical system status, mandatory notices
   */
  persistent: `<nck-banner
    type="critical"
    heading="System is in read-only mode"
    linkLabel="Check status"
    linkAriaRole="link"
    @link-clicked="checkSystemStatus" />`,
} as const;

/**
 * Banner type configuration guide for semantic usage
 */
export const NckBannerTypeGuide = {
  /**
   * Success banners - positive confirmations and completions
   */
  success: {
    defaultIcon: "success",
    color: "green",
    useCases: [
      "Form submission successful",
      "Data saved/updated",
      "Process completed",
      "Action confirmed",
      "Upload finished",
    ],
    examples: {
      save: { heading: "Changes saved successfully", dismissable: true },
      upload: { heading: "File uploaded successfully", dismissable: true },
      process: { heading: "Account created successfully", linkLabel: "Continue setup" },
    },
  },

  /**
   * Error banners - critical alerts and failures
   */
  error: {
    defaultIcon: "cancel-circle",
    color: "red",
    useCases: [
      "API request failures",
      "Validation errors",
      "System errors",
      "Authentication failures",
      "Connection problems",
    ],
    examples: {
      validation: { heading: "Please fix the errors below", linkLabel: "Reset form" },
      network: { heading: "Connection failed", linkLabel: "Retry", linkAriaRole: "button" },
      auth: { heading: "Session expired", linkLabel: "Sign in again", linkAriaRole: "link" },
    },
  },

  /**
   * Warning banners - caution and attention-needed messages
   */
  warning: {
    defaultIcon: "warning",
    color: "orange",
    useCases: ["Session timeouts", "Data loss warnings", "Pending actions", "Capacity limits", "Deprecation notices"],
    examples: {
      session: { heading: "Session expires in 5 minutes", linkLabel: "Extend session" },
      storage: { heading: "Storage 90% full", linkLabel: "Manage files" },
      unsaved: { heading: "You have unsaved changes", linkLabel: "Save now" },
    },
  },

  /**
   * Information banners - general information and guidance
   */
  information: {
    defaultIcon: "info-support",
    color: "bright-blue",
    useCases: ["Feature announcements", "Tips and guidance", "Status updates", "Educational content", "Help messages"],
    examples: {
      feature: { heading: "New dashboard available", linkLabel: "Try it now", dismissable: true },
      tip: { heading: "Pro tip: Use keyboard shortcuts", linkLabel: "View all shortcuts" },
      status: { heading: "System maintenance completed", dismissable: true },
    },
  },

  /**
   * Neutral banners - default informational messages
   */
  neutral: {
    defaultIcon: "flag-circle",
    color: "blue-grey",
    useCases: [
      "General notifications",
      "Status messages",
      "Informational updates",
      "Default messaging",
      "Neutral feedback",
    ],
    examples: {
      general: { heading: "Processing your request...", dismissable: false },
      update: { heading: "Data refreshed", dismissable: true },
      info: { heading: "Welcome to the new interface", dismissable: true },
    },
  },
} as const;

/**
 * AI guidance for banner implementation and patterns
 */
export const NckBannerAIGuidance = {
  /**
   * When to use banners vs other feedback components
   */
  usageDecisions: {
    useBanner: "Page-level messages, system notifications, contextual alerts, multi-line feedback",
    useToast: "Temporary confirmations, non-blocking notifications, auto-dismiss messages",
    useInlineError: "Field-level validation, form-specific errors, input-adjacent feedback",
    useModal: "Critical confirmations, complex error details, blocking important information",
  },

  /**
   * Banner type selection guidance
   */
  typeSelection: {
    success: "Use for positive confirmations - save success, process completion, positive status changes",
    error: "Use for failures and critical issues - validation errors, API failures, system errors",
    warning: "Use for caution and attention - timeouts, pending actions, capacity issues, data loss warnings",
    information: "Use for helpful information - tips, feature announcements, educational content",
    neutral: "Use for general notifications - status updates, processing messages, default feedback",
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    required: [
      "Provide meaningful heading text that describes the situation",
      "Use appropriate banner type for semantic meaning",
      "Include linkAriaRole when linkLabel is provided",
      "Provide leadingIconAltText for custom icons with specific meaning",
    ],
    bestPractices: [
      "Use clear, concise language in heading text",
      "Avoid technical jargon in user-facing messages",
      "Provide actionable link text (not generic 'click here')",
      "Consider screen reader announcement impact",
      "Test with keyboard navigation for dismissable banners",
    ],
  },

  /**
   * UX patterns and timing
   */
  userExperience: {
    timing: {
      success: "Show immediately after successful action, allow dismissal after 3-5 seconds",
      error: "Show immediately when error occurs, keep visible until resolved or dismissed",
      warning: "Show as soon as warning condition is detected, allow user control",
      information: "Show at appropriate context moments, make dismissable for repeated views",
    },
    positioning: {
      pageLevel: "Use noRadius=true for full-width page notifications",
      contextual: "Use default styling within content containers",
      persistent: "Avoid dismissable for critical system status messages",
    },
  },

  /**
   * Content guidelines
   */
  contentGuidance: {
    headingText: {
      clarity: "Be specific about what happened or what action is needed",
      tone: "Match tone to banner type (encouraging for success, helpful for errors)",
      length: "Keep to 1-2 lines for better readability",
      actionable: "Include clear next steps when action is required",
    },
    linkUsage: {
      contextual: "Link text should be contextually relevant to the banner message",
      actionOriented: "Use action verbs (Try again, View details, Learn more)",
      roleSelection: "Use 'button' for actions, 'link' for navigation",
    },
  },

  /**
   * Technical implementation patterns
   */
  implementationPatterns: {
    stateManagement: "Use reactive state to control banner visibility and content",
    eventHandling: "Handle banner-dismissed and link-clicked events appropriately",
    persistence: "Consider whether banner state should persist across sessions",
    integration: "Integrate with form validation and API response patterns",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    overuse: "Don't show multiple banners simultaneously - prioritize and stack appropriately",
    wrongType: "Don't use success type for neutral information or error type for warnings",
    missingActions: "Don't provide linkLabel without corresponding event handler",
    poorContent: "Avoid vague messages like 'Error occurred' - be specific about the issue",
    accessibilityGaps: "Don't forget linkAriaRole when providing linkLabel",
  },
} as const;

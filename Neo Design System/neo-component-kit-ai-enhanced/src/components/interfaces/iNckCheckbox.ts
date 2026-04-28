import { ComponentPublicInstance } from "vue";
import { IFocusableExposed } from "./iFocusable";

/**
 * Interface for nck-checkbox component props
 * Checkbox input component with validation, accessibility, and form integration
 *
 * @aiUsage Essential component for boolean selections, agreement confirmations, and multi-option forms
 * @aiCategory form
 * @aiComplexity simple
 */
export interface INckCheckboxProps {
  /**
   * Accessible label text for the checkbox
   * Required for screen reader accessibility and user understanding
   * @example "I agree to the Terms of Service", "Enable notifications", "Mark as completed"
   * @aiRequired true
   * @aiUsage Provide clear, actionable text that explains what checking the box does
   */
  label: string;

  /**
   * Unique field name for form identification and validation
   * Used by form libraries like VeeValidate for field tracking
   * @example "termsAccepted", "emailNotifications", "isCompleted"
   * @aiRequired true
   * @aiUsage Use camelCase naming that clearly indicates the boolean nature
   */
  name: string;

  /**
   * Current checkbox state (checked/unchecked)
   * Use with v-model for two-way data binding
   * @example v-model="formData.termsAccepted"
   * @aiUsage Essential for form state management and validation
   */
  modelValue?: boolean;

  /**
   * Validation rules for VeeValidate integration
   * Commonly used to ensure required checkboxes are checked
   * @example "required", "accepted"
   * @aiSuggestions {
   *   "required": "required",
   *   "mustAccept": "accepted",
   *   "optional": ""
   * }
   */
  rules?: string;

  /**
   * Whether the checkbox is required for form submission
   * Adds visual indicators and affects validation behavior
   * @default false
   * @aiUsage Set true for terms acceptance, required confirmations
   */
  required?: boolean;

  /**
   * Whether the checkbox is disabled and non-interactive
   * Prevents user interaction and excludes from form submission
   * @default false
   * @aiUsage Use for conditional logic or read-only states
   */
  disabled?: boolean;

  /**
   * Puts checkbox in indeterminate state (partially checked)
   * Useful for parent checkboxes controlling child checkbox groups
   * @default false
   * @aiUsage Use for "select all" checkboxes with partial selections
   */
  indeterminate?: boolean;

  /**
   * Additional descriptive text below the main label
   * Provides context or explanation for the checkbox choice
   * @example "You can change this setting later in your profile", "This will affect all team members"
   * @aiUsage Use for important clarifications or consequences
   */
  description?: string;

  /**
   * Value to use when checkbox is checked (for form submission)
   * Useful when checkbox represents a specific value rather than just true/false
   * @default true
   * @example "yes", "enabled", 1
   * @aiUsage Use when the checked state represents a specific value
   */
  checkedValue?: unknown;

  /**
   * Value to use when checkbox is unchecked (for form submission)
   * Useful for explicit false values or specific unchecked states
   * @default false
   * @example "no", "disabled", 0
   * @aiUsage Use when the unchecked state represents a specific value
   */
  uncheckedValue?: unknown;

  /**
   * Icon name to display alongside the checkbox label
   * Provides visual context and improves recognition
   * @example "info", "warning", "shield", "notification"
   * @aiUsage Use when checkbox needs visual context or categorization
   */
  icon?: string;

  /**
   * Accessible description for the icon
   * Required when icon is provided for screen reader support
   * @example "Information icon", "Warning icon", "Security icon"
   * @aiRequired When icon is provided
   */
  iconAltText?: string;

  /**
   * Size variant for the checkbox component
   * Affects both checkbox size and label typography
   * @default "medium"
   * @aiSuggestions {
   *   "compact": "small",
   *   "standard": "medium",
   *   "prominent": "large"
   * }
   */
  size?: "small" | "medium" | "large";

  /**
   * Visual emphasis level for the checkbox
   * Affects styling and visual prominence
   * @default "normal"
   * @aiUsage Use "emphasized" for critical checkboxes like terms acceptance
   */
  emphasis?: "normal" | "emphasized";
}

/**
 * Interface for nck-checkbox component exposed methods
 */
export interface INckCheckboxExposed extends IFocusableExposed {
  /**
   * Programmatically sets focus on the checkbox element
   * Essential for accessibility and user experience flows
   * @aiUsage Call after error correction or form navigation
   */
  focus: () => void;

  /**
   * Programmatically toggles the checkbox state
   * Changes checked/unchecked state and emits appropriate events
   * @aiUsage Use for programmatic control or external toggle triggers
   */
  toggle: () => void;

  /**
   * Programmatically checks the checkbox
   * Sets checkbox to checked state and emits change event
   * @aiUsage Use for "select all" functionality or programmatic selection
   */
  check: () => void;

  /**
   * Programmatically unchecks the checkbox
   * Sets checkbox to unchecked state and emits change event
   * @aiUsage Use for "deselect all" functionality or programmatic deselection
   */
  uncheck: () => void;

  /**
   * Gets the current checked state
   * Returns boolean indicating if checkbox is currently checked
   * @returns True if checked, false if unchecked
   * @aiUsage Access current state for conditional logic
   */
  isChecked: () => boolean;
}

/**
 * Complete interface for nck-checkbox component
 */
export interface INckCheckbox extends ComponentPublicInstance, INckCheckboxExposed {}

/**
 * AI-Friendly usage examples for rapid prototyping
 */
export const NckCheckboxExamples = {
  /**
   * Basic checkbox - simple boolean selection
   * @aiContext User preferences, feature toggles, simple confirmations
   */
  basic: `<nck-checkbox
    label="Enable email notifications"
    name="emailNotifications"
    v-model="userSettings.emailNotifications" />`,

  /**
   * Required checkbox with validation
   * @aiContext Terms acceptance, required confirmations, agreements
   */
  required: `<nck-checkbox
    label="I agree to the Terms of Service"
    name="termsAccepted"
    v-model="formData.termsAccepted"
    rules="required"
    required />`,

  /**
   * Checkbox with description and context
   * @aiContext Complex settings, impactful decisions, detailed options
   */
  withDescription: `<nck-checkbox
    label="Share usage data"
    name="shareUsageData"
    v-model="privacySettings.shareUsageData"
    description="Help us improve our service by sharing anonymous usage statistics"
    icon="info"
    iconAltText="Information icon" />`,

  /**
   * Indeterminate checkbox for group control
   * @aiContext "Select all" functionality, parent-child relationships
   */
  indeterminate: `<nck-checkbox
    label="Select all items"
    name="selectAll"
    v-model="selectAllState"
    :indeterminate="someItemsSelected && !allItemsSelected"
    @change="handleSelectAll" />`,

  /**
   * Emphasized checkbox for critical actions
   * @aiContext Important agreements, destructive confirmations
   */
  emphasized: `<nck-checkbox
    label="I understand this action cannot be undone"
    name="confirmDeletion"
    v-model="confirmationState.understood"
    emphasis="emphasized"
    rules="required"
    icon="warning"
    iconAltText="Warning icon"
    required />`,

  /**
   * Disabled checkbox for read-only states
   * @aiContext System settings, computed values, conditional states
   */
  disabled: `<nck-checkbox
    label="Administrator privileges"
    name="isAdmin"
    v-model="user.isAdmin"
    :disabled="!canModifyPermissions"
    description="Contact your system administrator to change this setting" />`,

  /**
   * Checkbox with custom values
   * @aiContext Status toggles, non-boolean selections
   */
  customValues: `<nck-checkbox
    label="Project status"
    name="projectStatus"
    v-model="project.status"
    :checkedValue="'active'"
    :uncheckedValue="'inactive'"
    description="Toggle between active and inactive project status" />`,
} as const;

/**
 * Checkbox patterns for different use cases
 */
export const CheckboxPatterns = {
  /**
   * Common validation patterns
   */
  validation: {
    required: "required",
    accepted: "accepted", // For terms/agreements
    optional: "",
  },

  /**
   * Common use case patterns
   */
  useCases: {
    termsAcceptance: {
      required: true,
      rules: "required",
      emphasis: "emphasized" as const,
    },
    featureToggle: {
      required: false,
      size: "medium" as const,
    },
    groupSelection: {
      indeterminate: true,
      size: "medium" as const,
    },
    notification: {
      icon: "notification",
      size: "medium" as const,
    },
    security: {
      icon: "shield",
      emphasis: "emphasized" as const,
    },
  },

  /**
   * Accessibility-focused patterns
   */
  accessibility: {
    withDescription: "Use description for complex or impactful choices",
    withIcon: "Include iconAltText when using icons",
    grouping: "Use fieldset/legend for related checkbox groups",
    required: "Mark required checkboxes clearly with required prop",
  },
} as const;

/**
 * AI guidance for checkbox implementation and patterns
 */
export const NckCheckboxAIGuidance = {
  /**
   * Label and content best practices
   */
  content: {
    labels: "Use clear, actionable language that explains what happens when checked",
    descriptions: "Provide descriptions for complex choices or important consequences",
    grouping: "Group related checkboxes under clear headings or fieldsets",
    wording: "Use positive phrasing when possible (e.g., 'Enable' rather than 'Disable')",
  },

  /**
   * Accessibility requirements
   */
  accessibility: {
    required: [
      "Always provide clear, descriptive labels for all checkboxes",
      "Include iconAltText when using icons",
      "Use proper grouping (fieldset/legend) for related checkbox sets",
      "Ensure adequate click/touch target size (minimum 44px)",
    ],
    bestPractices: [
      "Test checkbox interaction with screen readers",
      "Provide clear focus indicators",
      "Use descriptions for important or complex choices",
      "Ensure keyboard navigation works correctly",
    ],
  },

  /**
   * Form integration patterns
   */
  forms: {
    validation: "Use 'required' rule for checkboxes that must be checked",
    grouping: "Group related checkboxes logically in form structure",
    feedback: "Provide clear validation messages for failed checkbox requirements",
    submission: "Consider checkbox values in form submission logic",
  },

  /**
   * UX optimization
   */
  ux: {
    placement: "Place checkboxes in logical order of importance or workflow",
    defaults: "Set sensible default states based on user context",
    indeterminate: "Use indeterminate state for parent checkboxes in hierarchical selection",
    emphasis: "Use emphasized styling sparingly for truly critical checkboxes",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    unclearLabels: "Avoid vague labels like 'Accept' without clear context",
    tooManyRequired: "Don't make every checkbox required - be selective",
    noDescription: "Don't omit descriptions for complex or impactful choices",
    poorGrouping: "Don't scatter related checkboxes throughout the form",
    wrongControl: "Don't use checkboxes for mutually exclusive options (use radio buttons instead)",
  },
} as const;

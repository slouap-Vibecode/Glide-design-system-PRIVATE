import { ComponentPublicInstance } from "vue";

/**
 * Interface for nck-form component props
 * Form container with validation, accessibility, and VeeValidate integration
 *
 * @aiUsage Essential component for data collection, validation, and submission workflows
 * @aiCategory form
 * @aiComplexity medium
 */
export interface INckFormProps {
  /**
   * ID of element serving as label for this form
   * Used for accessibility association with form heading or description
   * @example "user-form-title", "settings-heading", "registration-label"
   * @aiRequired true
   * @aiUsage Associate with visible heading element ID for proper screen reader context
   */
  labelId: string;

  /**
   * Unique identifier for the form element
   * Allows external button elements to submit this form via form attribute
   * @example "user-registration-form", "profile-settings", "contact-form"
   * @aiUsage Use when submit button is outside form element structure
   */
  id?: string;

  /**
   * Autocomplete behavior for form fields
   * Controls browser's automatic field completion suggestions
   * - "on": Enable autocomplete for all fields (default)
   * - "off": Disable autocomplete for all fields
   * @default "on"
   * @aiSuggestions { "login": "on", "sensitive": "off", "registration": "on", "payment": "off" }
   * @aiUsage Disable for sensitive forms (passwords, payment), enable for convenience forms
   */
  autocompleteState?: "on" | "off";
}

/**
 * Interface for nck-form component exposed methods
 */
export interface INckFormExposed {
  /**
   * Validates all form fields and returns validation status
   * Uses VeeValidate integration for comprehensive field validation
   * @returns Promise resolving to true if valid, false if validation fails
   * @aiUsage Call before form submission to ensure all validation rules pass
   */
  validate: () => Promise<boolean>;

  /**
   * Sets focus to beginning of form for accessibility
   * Moves focus to start of form content, typically after error correction
   * @aiUsage Call after displaying form-level errors to guide user attention
   */
  focusBeginningOfForm: () => void;

  /**
   * Sets focus to first field with validation errors
   * Automatically finds and focuses the first invalid form field
   * @aiUsage Call after validation fails to help user find and fix errors
   */
  focusFirstInvalidField: () => void;

  /**
   * Resets all form validation states without clearing field values
   * Clears error messages and validation states while preserving user input
   * @aiUsage Use when user wants to retry validation or start fresh validation cycle
   */
  resetValidation: () => void;
}

/**
 * Complete interface for nck-form component
 */
export interface INckForm extends ComponentPublicInstance, INckFormExposed {}

/**
 * AI-Friendly usage examples for rapid prototyping
 */
export const NckFormExamples = {
  /**
   * Basic form - simple data collection
   * @aiContext Contact forms, feedback, simple data entry
   */
  basic: `<nck-form
    id="contact-form"
    labelId="contact-heading"
    ref="contactForm"
    @submit="handleSubmit">

    <h2 id="contact-heading">Contact Information</h2>

    <template #error-container>
      <nck-banner
        v-if="formErrors.length > 0"
        type="critical"
        :heading="formErrors[0]" />
    </template>

    <nck-text-input
      name="name"
      label="Full Name"
      v-model="formData.name"
      rules="required"
      required />

    <nck-text-input
      name="email"
      label="Email Address"
      type="email"
      v-model="formData.email"
      rules="required|email"
      required />

    <div class="form-actions">
      <nck-button
        label="Send Message"
        type="filled"
        nativeType="submit"
        :loading="isSubmitting"
        loadingText="Sending message..." />
      <nck-button
        label="Clear Form"
        type="outline"
        @click="clearForm" />
    </div>
  </nck-form>`,

  /**
   * Registration form - comprehensive data collection
   * @aiContext User registration, account creation, profile setup
   */
  registration: `<nck-form
    id="registration-form"
    labelId="registration-title"
    autocompleteState="on"
    ref="registrationForm"
    @submit="handleRegistration">

    <h1 id="registration-title">Create Your Account</h1>

    <template #error-container>
      <nck-banner
        v-if="registrationErrors.length > 0"
        type="critical"
        heading="Please fix the following errors:"
        dismissable />
    </template>

    <nck-text-input
      name="firstName"
      label="First Name"
      v-model="userData.firstName"
      rules="required|min:2"
      autocomplete="given-name"
      required />

    <nck-text-input
      name="email"
      label="Email Address"
      type="email"
      v-model="userData.email"
      rules="required|email"
      autocomplete="email"
      required />

    <nck-text-input
      name="password"
      label="Password"
      type="password"
      v-model="userData.password"
      rules="required|min:8|password"
      autocomplete="new-password"
      required />

    <nck-checkbox
      name="termsAccepted"
      label="I agree to the Terms of Service"
      v-model="userData.termsAccepted"
      rules="required"
      required />

    <div class="form-actions">
      <nck-button
        label="Create Account"
        type="filled"
        nativeType="submit"
        :loading="isRegistering"
        loadingText="Creating account..."
        :disabled="!userData.termsAccepted" />
    </div>
  </nck-form>`,
} as const;

/**
 * Form validation patterns and best practices
 */
export const FormValidationPatterns = {
  /**
   * Common validation rule patterns
   */
  rules: {
    required: "required",
    email: "required|email",
    phone: "required|phone",
    password: "required|min:8|password",
    confirmPassword: "required|confirmed:password",
    url: "required|url",
    number: "required|numeric",
    positiveNumber: "required|numeric|min_value:0",
  },

  /**
   * Field-specific validation configurations
   */
  fieldTypes: {
    name: "required|min:2|max:50",
    email: "required|email|max:254",
    phone: "required|phone",
    password: "required|min:8|password",
    username: "required|min:3|max:30|alpha_num",
    website: "url",
    age: "required|numeric|min_value:13|max_value:120",
  },
} as const;

/**
 * AI guidance for form implementation and patterns
 */
export const NckFormAIGuidance = {
  /**
   * Form structure best practices
   */
  structure: {
    sections: "Group related fields using visual sections with headings",
    progression: "Order fields logically from basic to detailed information",
    required: "Clearly mark required fields and explain validation requirements",
    actions: "Place primary action (submit) on the right, secondary actions on left",
  },

  /**
   * Accessibility requirements
   */
  accessibility: {
    required: [
      "Always provide labelId pointing to form's descriptive heading",
      "Use error-container slot for form-level errors with aria-live announcements",
      "Ensure all form fields have proper labels and validation messages",
      "Provide clear focus management and keyboard navigation",
    ],
    bestPractices: [
      "Group related fields with fieldset and legend elements",
      "Use progressive disclosure for complex forms (tabs, accordions)",
      "Provide helpful field descriptions and validation guidance",
      "Test form completion with screen readers and keyboard-only navigation",
    ],
  },

  /**
   * Validation patterns
   */
  validation: {
    clientSide: "Provide immediate feedback for format validation (email, phone, etc.)",
    serverSide: "Handle uniqueness and complex business rule validation server-side",
    progressive: "Validate fields as user completes them, not on every keystroke",
    recovery: "Provide clear error recovery guidance and corrective actions",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    noValidation: "Don't submit forms without proper validation feedback",
    poorErrorMessages: "Avoid generic errors - be specific about what needs fixing",
    missingLabels: "Never use placeholder text as the only field labeling",
    forcedFormat: "Don't force rigid input formats - accept flexible user input",
    lostData: "Always warn users before losing form data on navigation",
  },
} as const;

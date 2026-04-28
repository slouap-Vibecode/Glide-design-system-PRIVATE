import { IFormFieldWithValidation } from "./iFormFieldWithValidation";
import { IFocusableExposed } from "./iFocusable";
import NckInputContainer from "@/components/internal/nckInputContainer.vue";
import { ComponentPublicInstance } from "vue";

/**
 * Interface for nck-text-input component props
 * Text input field with validation, accessibility, and mobile optimization
 *
 * @aiUsage Essential component for user data entry, search fields, and form interactions
 * @aiCategory form
 * @aiComplexity simple
 */
export interface INckTextInputProps {
  /**
   * Accessible label text for the input field
   * Required for screen reader accessibility and field identification
   * @example "Email Address", "First Name", "Search Products"
   * @aiRequired true
   * @aiUsage Provide clear, descriptive labels that explain the expected input
   */
  label: string;

  /**
   * Unique field name for form identification and validation
   * Used by form libraries like VeeValidate for field tracking
   * @example "email", "firstName", "searchQuery"
   * @aiRequired true
   * @aiUsage Use camelCase naming that matches your data model
   */
  name: string;

  /**
   * Input field type controlling keyboard behavior and validation
   * Affects mobile keyboard layout and browser validation
   * @default "text"
   * @aiSuggestions {
   *   "email": "email",
   *   "password": "password",
   *   "search": "search",
   *   "phone": "tel",
   *   "website": "url",
   *   "numbers": "number"
   * }
   */
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";

  /**
   * Current input value for controlled component behavior
   * Use with v-model for two-way data binding
   * @example v-model="formData.email"
   * @aiUsage Essential for form state management and validation
   */
  modelValue?: string;

  /**
   * Placeholder text shown when input is empty
   * Should not replace labels but provide input format guidance
   * @example "Enter your email address", "Search for products..."
   * @aiUsage Use sparingly - placeholders disappear and hurt accessibility
   */
  placeholder?: string;

  /**
   * Validation rules for VeeValidate integration
   * Supports pipe-separated rule syntax or custom validators
   * @example "required|email", "required|min:8", "required|phone"
   * @aiSuggestions {
   *   "email": "required|email",
   *   "password": "required|min:8",
   *   "phone": "required|phone",
   *   "required": "required",
   *   "optional": ""
   * }
   */
  rules?: string;

  /**
   * Whether the field is required for form submission
   * Adds visual indicators and affects validation behavior
   * @default false
   * @aiUsage Set true for essential fields, affects form submission
   */
  required?: boolean;

  /**
   * Whether the input is disabled and non-interactive
   * Prevents user interaction and excludes from form submission
   * @default false
   * @aiUsage Use for read-only states or conditional form logic
   */
  disabled?: boolean;

  /**
   * Icon name to display on the left side of input
   * Provides visual context and improves field recognition
   * @example "search", "email", "phone", "lock"
   * @aiUsage Match icons semantically to input purpose
   */
  leadingIcon?: string;

  /**
   * Accessible description for the leading icon
   * Required when leadingIcon is provided for screen reader support
   * @example "Search icon", "Email icon", "Phone icon"
   * @aiRequired When leadingIcon is provided
   */
  leadingIconAltText?: string;

  /**
   * HTML autocomplete attribute for browser auto-fill
   * Improves user experience by enabling smart form completion
   * @example "email", "given-name", "family-name", "current-password"
   * @aiSuggestions {
   *   "email": "email",
   *   "firstName": "given-name",
   *   "lastName": "family-name",
   *   "password": "current-password",
   *   "newPassword": "new-password",
   *   "phone": "tel",
   *   "address": "street-address"
   * }
   */
  autocomplete?: string;

  /**
   * Maximum number of characters allowed
   * Provides user feedback and prevents over-long input
   * @example 100, 255, 500
   * @aiUsage Set reasonable limits based on field purpose and storage
   */
  maxlength?: number;

  /**
   * Minimum number of characters required
   * Works with validation rules for input length requirements
   * @example 2, 8, 3
   * @aiUsage Common for names (2+), passwords (8+), codes (3+)
   */
  minlength?: number;

  /**
   * Whether the input should gain focus on component mount
   * Useful for search fields and primary form inputs
   * @default false
   * @aiUsage Enable for main interaction fields, disable for secondary forms
   */
  autofocus?: boolean;

  /**
   * Whether the input is read-only (visible but not editable)
   * Different from disabled - field is still focusable and selectable
   * @default false
   * @aiUsage Use for display-only fields that users can copy
   */
  readonly?: boolean;
}

/**
 * Interface for nck-text-input component exposed methods
 */
export interface INckTextInputExposed extends IFormFieldWithValidation, IFocusableExposed {
  /**
   * Checks if the field has been validated at least once
   * Useful for determining when to show validation feedback
   * @returns True if validation has been attempted on this field
   * @aiUsage Check before showing error states to avoid premature feedback
   */
  hasBeenValidated: () => boolean;

  /**
   * Programmatically sets focus on the input element
   * Essential for accessibility and user experience flows
   * @aiUsage Call after error correction or form navigation
   */
  focus: () => void;

  /**
   * Clears the current input value
   * Resets field to empty state while maintaining validation status
   * @aiUsage Use for form reset or clear functionality
   */
  clear: () => void;

  /**
   * Selects all text in the input field
   * Useful for quick editing or replacement workflows
   * @aiUsage Enable users to quickly replace entire field contents
   */
  selectAll: () => void;
}

/**
 * Complete interface for nck-text-input component
 */
export interface INckTextInput extends ComponentPublicInstance, INckTextInputExposed {}

/**
 * Specialized interface for autocomplete integration
 */
export interface INckTextInputForNckAutocompleteClass
  extends INckTextInput,
    IFormFieldWithValidation,
    IFocusableExposed {
  /**
   * Direct access to underlying HTML input element
   * Used by autocomplete components for advanced text manipulation
   */
  textInputControl: HTMLInputElement | null;
}

/**
 * Specialized interface for phone number input integration
 */
export interface INckTextInputForNckPhoneNumberInputClass {
  /**
   * Reference to the input container component
   * Provides access to container-level styling and behavior
   */
  textInputContainer: InstanceType<typeof NckInputContainer> | null;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 */
export const NckTextInputExamples = {
  /**
   * Basic text input - simple data entry
   * @aiContext Contact forms, user profiles, general text fields
   */
  basic: `<nck-text-input
    label="Full Name"
    name="fullName"
    v-model="userData.fullName"
    placeholder="Enter your full name"
    required />`,

  /**
   * Email input with validation
   * @aiContext User registration, contact forms, login forms
   */
  email: `<nck-text-input
    label="Email Address"
    name="email"
    type="email"
    v-model="userData.email"
    rules="required|email"
    autocomplete="email"
    leadingIcon="email"
    leadingIconAltText="Email icon"
    required />`,

  /**
   * Password input with security
   * @aiContext Registration, login, settings forms
   */
  password: `<nck-text-input
    label="Password"
    name="password"
    type="password"
    v-model="credentials.password"
    rules="required|min:8|password"
    autocomplete="current-password"
    leadingIcon="lock"
    leadingIconAltText="Password icon"
    required />`,

  /**
   * Search input optimized for queries
   * @aiContext Search bars, filter fields, lookup forms
   */
  search: `<nck-text-input
    label="Search"
    name="searchQuery"
    type="search"
    v-model="searchState.query"
    placeholder="Search products..."
    leadingIcon="search"
    leadingIconAltText="Search icon"
    autofocus />`,

  /**
   * Phone number input
   * @aiContext Contact information, registration forms
   */
  phone: `<nck-text-input
    label="Phone Number"
    name="phoneNumber"
    type="tel"
    v-model="userData.phoneNumber"
    rules="required|phone"
    autocomplete="tel"
    placeholder="(555) 123-4567"
    leadingIcon="phone"
    leadingIconAltText="Phone icon"
    required />`,

  /**
   * Disabled/readonly field
   * @aiContext Display calculated values, system-generated fields
   */
  readonly: `<nck-text-input
    label="User ID"
    name="userId"
    v-model="userData.id"
    readonly
    leadingIcon="account"
    leadingIconAltText="User account icon" />`,
} as const;

/**
 * Input type guide for different use cases
 */
export const InputTypeGuide = {
  /**
   * Input type recommendations by field purpose
   */
  byPurpose: {
    email: "email",
    password: "password",
    search: "search",
    phone: "tel",
    website: "url",
    age: "number",
    quantity: "number",
    name: "text",
    address: "text",
    message: "text",
  },

  /**
   * Autocomplete attribute patterns
   */
  autocomplete: {
    email: "email",
    firstName: "given-name",
    lastName: "family-name",
    fullName: "name",
    currentPassword: "current-password",
    newPassword: "new-password",
    phone: "tel",
    address: "street-address",
    city: "address-level2",
    state: "address-level1",
    zipCode: "postal-code",
    country: "country",
  },

  /**
   * Common validation rule patterns
   */
  validationRules: {
    required: "required",
    email: "required|email",
    password: "required|min:8|password",
    phone: "required|phone",
    url: "required|url",
    name: "required|min:2|max:50",
    username: "required|min:3|max:30|alpha_num",
    optionalEmail: "email",
  },
} as const;

/**
 * AI guidance for text input implementation and patterns
 */
export const NckTextInputAIGuidance = {
  /**
   * Field design best practices
   */
  design: {
    labels: "Always use clear, descriptive labels - never rely solely on placeholders",
    placeholders: "Use placeholders sparingly for format examples, not as label replacements",
    icons: "Match leading icons semantically to field purpose (search, email, phone, etc.)",
    grouping: "Group related fields visually and logically in forms",
  },

  /**
   * Accessibility requirements
   */
  accessibility: {
    required: [
      "Provide descriptive labels for all input fields",
      "Use appropriate input types for mobile keyboard optimization",
      "Include leadingIconAltText when using leadingIcon",
      "Associate error messages with fields using aria-describedby",
    ],
    bestPractices: [
      "Use autocomplete attributes to help users fill forms quickly",
      "Set appropriate maxlength/minlength for user guidance",
      "Consider autofocus for primary interaction fields",
      "Test form completion with screen readers",
    ],
  },

  /**
   * Validation patterns
   */
  validation: {
    immediate: "Validate format (email, phone) immediately after user input",
    deferred: "Validate required fields on blur or form submission",
    feedback: "Provide clear, specific error messages with correction guidance",
    recovery: "Allow users to easily correct validation errors",
  },

  /**
   * Mobile optimization
   */
  mobile: {
    keyboards: "Use correct input types to trigger appropriate mobile keyboards",
    autofill: "Enable browser autofill with autocomplete attributes",
    sizing: "Ensure touch targets meet minimum size requirements (44px)",
    scrolling: "Test field focus behavior with mobile virtual keyboards",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    placeholderLabels: "Never use placeholder text as the only field labeling",
    genericErrors: "Avoid generic error messages - be specific about what's wrong",
    disabledStates: "Don't overuse disabled states - prefer readonly when appropriate",
    forcedFormats: "Don't force rigid input formats - accept flexible user input",
    noValidation: "Always provide validation feedback for required or formatted fields",
  },
} as const;

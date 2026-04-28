import { ComponentPublicInstance } from "vue";
import { IFocusable } from "./iFocusable";
import { IFormFieldWithValidation } from "./iFormFieldWithValidation";

/**
 * Interface for nck-dropdown component props
 * Dropdown selection component with search, validation, and accessibility features
 *
 * @aiUsage Essential component for option selection, navigation, and form inputs
 * @aiCategory form
 * @aiComplexity medium
 */
export interface INckDropdownProps {
  /**
   * Accessible label text for the dropdown field
   * Required for screen reader accessibility and field identification
   * @example "Country", "Department", "Status", "Category"
   * @aiRequired true
   * @aiUsage Provide clear, descriptive labels that explain the selection purpose
   */
  label: string;

  /**
   * Unique field name for form identification and validation
   * Used by form libraries like VeeValidate for field tracking
   * @example "country", "department", "status"
   * @aiRequired true
   * @aiUsage Use camelCase naming that matches your data model
   */
  name: string;

  /**
   * Array of selectable options for the dropdown
   * Each option should have value and label properties
   * @example [{ value: 'us', label: 'United States' }, { value: 'ca', label: 'Canada' }]
   * @aiRequired true
   * @aiUsage Ensure labels are user-friendly and values are system-appropriate
   */
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
    group?: string;
  }>;

  /**
   * Currently selected option value
   * Use with v-model for two-way data binding
   * @example v-model="formData.country"
   * @aiUsage Essential for form state management and validation
   */
  modelValue?: string | number;

  /**
   * Placeholder text shown when no option is selected
   * Should provide guidance on what to select
   * @example "Select a country", "Choose department", "Pick status"
   * @aiUsage Use clear action-oriented text that explains the selection
   */
  placeholder?: string;

  /**
   * Validation rules for VeeValidate integration
   * Supports pipe-separated rule syntax or custom validators
   * @example "required", "required|in:admin,user,guest"
   * @aiSuggestions {
   *   "required": "required",
   *   "optional": "",
   *   "restrictedOptions": "required|in:option1,option2,option3"
   * }
   */
  rules?: string;

  /**
   * Whether the field is required for form submission
   * Adds visual indicators and affects validation behavior
   * @default false
   * @aiUsage Set true for essential selection fields
   */
  required?: boolean;

  /**
   * Whether the dropdown is disabled and non-interactive
   * Prevents user interaction and excludes from form submission
   * @default false
   * @aiUsage Use for conditional logic or read-only states
   */
  disabled?: boolean;

  /**
   * Enables search/filter functionality within dropdown options
   * Allows users to quickly find options by typing
   * @default false
   * @aiUsage Enable for dropdowns with many options (10+)
   */
  searchable?: boolean;

  /**
   * Enables selection of multiple options
   * Changes behavior to checkbox-style multi-select
   * @default false
   * @aiUsage Use when users need to select multiple related items
   */
  multiple?: boolean;

  /**
   * Maximum number of selections allowed (when multiple=true)
   * Prevents over-selection and provides user guidance
   * @example 3, 5, 10
   * @aiUsage Set reasonable limits based on use case and UX
   */
  maxSelections?: number;

  /**
   * Icon name to display on the left side of dropdown
   * Provides visual context and improves recognition
   * @example "location", "department", "status", "category"
   * @aiUsage Match icons semantically to dropdown purpose
   */
  leadingIcon?: string;

  /**
   * Accessible description for the leading icon
   * Required when leadingIcon is provided for screen reader support
   * @example "Location icon", "Department icon", "Status icon"
   * @aiRequired When leadingIcon is provided
   */
  leadingIconAltText?: string;

  /**
   * Message text shown when no options are available
   * Helps users understand why dropdown appears empty
   * @example "No options available", "Loading options...", "No results found"
   * @aiUsage Provide helpful context for empty states
   */
  emptyMessage?: string;

  /**
   * Whether to show a "Clear Selection" option
   * Allows users to reset selection to empty state
   * @default false
   * @aiUsage Enable for optional fields where clearing is useful
   */
  clearable?: boolean;

  /**
   * Groups options under category headers
   * Improves navigation in large option lists
   * @default false
   * @aiUsage Enable when options naturally group into categories
   */
  groupByCategory?: boolean;

  /**
   * Custom loading state for asynchronous option loading
   * Shows loading indicator while options are being fetched
   * @default false
   * @aiUsage Use when options are loaded dynamically from API
   */
  loading?: boolean;

  /**
   * Loading text displayed during option fetching
   * Provides feedback during asynchronous operations
   * @example "Loading options...", "Fetching data...", "Please wait..."
   * @aiUsage Use when loading=true to explain what's happening
   */
  loadingText?: string;
}

/**
 * Interface for nck-dropdown component exposed methods
 */
export interface IDropdownExposed extends IFormFieldWithValidation {
  /**
   * Programmatically sets focus on the dropdown element
   * Essential for accessibility and user experience flows
   * @aiUsage Call after error correction or form navigation
   */
  focus: IFocusable["focus"];

  /**
   * Opens the dropdown options list
   * Useful for programmatic control of dropdown state
   * @aiUsage Trigger dropdown opening based on user actions
   */
  open: () => void;

  /**
   * Closes the dropdown options list
   * Useful for programmatic control of dropdown state
   * @aiUsage Close dropdown after external actions or validation
   */
  close: () => void;

  /**
   * Clears the current selection
   * Resets field to empty state while maintaining validation status
   * @aiUsage Use for form reset or clear functionality
   */
  clearSelection: () => void;

  /**
   * Filters options based on search query (when searchable=true)
   * Programmatically applies search filtering to options
   * @param query Search string to filter options
   * @aiUsage Implement external search logic or pre-filter options
   */
  filterOptions: (query: string) => void;

  /**
   * Gets currently filtered options
   * Returns the options currently visible after search filtering
   * @returns Array of currently visible options
   * @aiUsage Access filtered results for external logic
   */
  getFilteredOptions: () => Array<{ value: string | number; label: string }>;
}

/**
 * Complete interface for nck-dropdown component
 */
export interface INckDropdown extends IDropdownExposed, ComponentPublicInstance {}

/**
 * AI-Friendly usage examples for rapid prototyping
 */
export const NckDropdownExamples = {
  /**
   * Basic dropdown - simple option selection
   * @aiContext Status selection, category picker, simple choices
   */
  basic: `<nck-dropdown
    label="Status"
    name="status"
    v-model="formData.status"
    :options="[
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]"
    placeholder="Select status"
    required />`,

  /**
   * Searchable dropdown with many options
   * @aiContext Country selection, user lists, large datasets
   */
  searchable: `<nck-dropdown
    label="Country"
    name="country"
    v-model="userData.country"
    :options="countryOptions"
    placeholder="Search and select country"
    :searchable="true"
    leadingIcon="location"
    leadingIconAltText="Location icon"
    required />`,

  /**
   * Multi-select dropdown
   * @aiContext Skills selection, permissions, tag assignment
   */
  multiple: `<nck-dropdown
    label="Skills"
    name="skills"
    v-model="userProfile.skills"
    :options="skillsOptions"
    placeholder="Select your skills"
    :multiple="true"
    :maxSelections="5"
    :clearable="true"
    emptyMessage="No skills available" />`,

  /**
   * Grouped dropdown with categories
   * @aiContext Product categories, organizational structure
   */
  grouped: `<nck-dropdown
    label="Department"
    name="department"
    v-model="employee.department"
    :options="[
      { value: 'eng-frontend', label: 'Frontend', group: 'Engineering' },
      { value: 'eng-backend', label: 'Backend', group: 'Engineering' },
      { value: 'design-ui', label: 'UI Design', group: 'Design' },
      { value: 'design-ux', label: 'UX Research', group: 'Design' }
    ]"
    :groupByCategory="true"
    placeholder="Select department"
    required />`,

  /**
   * Async dropdown with loading state
   * @aiContext API-driven options, dynamic content
   */
  async: `<nck-dropdown
    label="Project"
    name="project"
    v-model="task.projectId"
    :options="projectOptions"
    placeholder="Select project"
    :loading="isLoadingProjects"
    loadingText="Loading projects..."
    :searchable="true"
    @opened="loadProjects"
    required />`,

  /**
   * Disabled/readonly dropdown
   * @aiContext System-assigned values, view-only forms
   */
  readonly: `<nck-dropdown
    label="Account Type"
    name="accountType"
    v-model="user.accountType"
    :options="accountTypeOptions"
    :disabled="!canChangeAccountType"
    leadingIcon="account"
    leadingIconAltText="Account icon" />`,
} as const;

/**
 * Option structure guide for different use cases
 */
export const DropdownOptionGuide = {
  /**
   * Simple option structure for basic dropdowns
   */
  simple: {
    value: "string | number",
    label: "string",
  },

  /**
   * Extended option structure with additional features
   */
  extended: {
    value: "string | number",
    label: "string",
    disabled: "boolean (optional)",
    group: "string (optional)",
    description: "string (optional)",
    icon: "string (optional)",
  },

  /**
   * Common option patterns by use case
   */
  patterns: {
    status: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
    priority: [
      { value: "high", label: "High Priority" },
      { value: "medium", label: "Medium Priority" },
      { value: "low", label: "Low Priority" },
    ],
    yesNo: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    userRoles: [
      { value: "admin", label: "Administrator" },
      { value: "user", label: "User" },
      { value: "guest", label: "Guest" },
    ],
  },
} as const;

/**
 * AI guidance for dropdown implementation and patterns
 */
export const NckDropdownAIGuidance = {
  /**
   * Option design best practices
   */
  design: {
    labels: "Use clear, descriptive option labels that users will understand",
    values: "Use consistent value types (string or number) throughout options",
    grouping: "Group related options under clear category headers when appropriate",
    ordering: "Order options logically (alphabetical, priority-based, or frequency-based)",
  },

  /**
   * Accessibility requirements
   */
  accessibility: {
    required: [
      "Provide descriptive labels for all dropdown fields",
      "Include leadingIconAltText when using leadingIcon",
      "Use proper ARIA attributes for screen reader support",
      "Ensure keyboard navigation works for all options",
    ],
    bestPractices: [
      "Test dropdown navigation with screen readers",
      "Provide clear empty states and loading messages",
      "Ensure focus management works correctly",
      "Use appropriate role attributes for multi-select",
    ],
  },

  /**
   * UX optimization patterns
   */
  ux: {
    search: "Enable search for dropdowns with 10+ options for better usability",
    multiSelect: "Use multi-select sparingly - consider if checkboxes might be clearer",
    grouping: "Group options when there are natural categories (5+ groups recommended)",
    loading: "Always provide loading feedback for async option loading",
  },

  /**
   * Performance considerations
   */
  performance: {
    largeDatasets: "Consider virtualization for dropdowns with 100+ options",
    asyncLoading: "Implement lazy loading for API-driven options",
    searchDebouncing: "Debounce search input to prevent excessive API calls",
    caching: "Cache frequently accessed option lists",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    tooManyOptions: "Avoid dropdowns with 50+ unfiltered options - use search or different UI",
    unclearLabels: "Don't use technical values as user-facing labels",
    noEmptyState: "Always handle and communicate empty option states",
    forcedSelection: "Don't force selection of first option - let users choose",
    inconsistentOptionStructure: "Maintain consistent option object structure across all dropdowns",
  },
} as const;

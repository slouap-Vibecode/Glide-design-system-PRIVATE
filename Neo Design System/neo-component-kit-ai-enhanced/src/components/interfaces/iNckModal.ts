import { ComponentPublicInstance, Ref } from "vue";
import { ModalSize } from "../../constants/modalSize";
import { ModalRole } from "../../constants/modalRole";

/**
 * Interface for nck-modal component props
 * Modal dialog component with focus trapping, accessibility, and confirmation workflows
 *
 * @aiUsage Essential component for overlays, confirmations, and complex interactions
 * @aiCategory overlay
 * @aiComplexity complex
 */
export interface INckModalProps {
  /**
   * Modal dialog title displayed in header
   * Used for screen reader navigation and modal identification
   * @example "Confirm Action", "Edit Profile", "Settings"
   * @aiRequired true
   * @aiUsage Provide clear, descriptive titles that explain modal purpose
   */
  modalTitle: string;

  /**
   * Modal size variant - controls width and layout behavior
   * - XS: 320px - Minimal confirmations, simple alerts
   * - S: 600px - Standard forms, simple content
   * - M: 778px - Complex forms, moderate content (default)
   * - L: 980px - Data tables, extensive content
   * - FULL: Full screen - Complex applications, detailed workflows
   * @default ModalSize.M
   * @aiSuggestions {
   *   "confirmation": "XS",
   *   "form": "S",
   *   "content": "M",
   *   "data-table": "L",
   *   "full-app": "FULL"
   * }
   */
  size?: ModalSize;

  /**
   * ARIA role defining modal's semantic purpose
   * - DIALOG: Standard modal for forms, content, interactions
   * - ALERT_DIALOG: Critical confirmations, destructive actions, alerts
   * @default ModalRole.DIALOG
   * @aiRequired When modal contains critical/destructive actions
   * @aiSuggestions { "form": "DIALOG", "confirmation": "ALERT_DIALOG", "delete": "ALERT_DIALOG" }
   */
  role?: ModalRole;

  /**
   * Enables dismissal via close button, overlay click, or escape key
   * When false, modal can only be closed via explicit action buttons
   * @default true
   * @aiUsage Disable for critical workflows that must be completed
   */
  dismissable?: boolean;

  /**
   * Requires confirmation before dismissing modal
   * Shows confirmation dialog when user attempts to close
   * @default false
   * @aiUsage Enable for forms with unsaved changes or important workflows
   */
  confirmDismissal?: boolean;

  /**
   * Removes default padding from modal body content
   * Use for full-width content, tables, or custom layouts
   * @default false
   * @aiUsage Enable when body content needs full control over spacing
   */
  noBodyPadding?: boolean;

  /**
   * Icon name for optional header action button
   * Displays on left side of header for contextual actions
   * @example "help", "settings", "info"
   * @aiRequired headerActionIconAltText when used
   */
  headerActionIconName?: string;

  /**
   * Accessible description for header action icon
   * Required when headerActionIconName is provided
   * @example "Help for this dialog", "Settings", "More information"
   * @aiRequired When headerActionIconName is provided
   */
  headerActionIconAltText?: string;

  /**
   * Controls display of modal footer section
   * When false, hides footer completely regardless of slot content
   * @default true
   * @aiUsage Disable for content-only modals without actions
   */
  footerDisplayed?: boolean;
}

/**
 * Interface for nck-modal component exposed methods and properties
 */
export interface INckModalExposed {
  closeModal: (...args: unknown[]) => void;
  dismissModal: (...args: unknown[]) => void;
  setFocusAtTheBeginning: () => void;
  focusHiddenElementAtTheBeginning: () => void;
  dismissable: Ref<boolean>;
  confirmDismissal: Ref<boolean>;
}

/**
 * Complete interface for nck-modal component
 */
export interface INckModal extends ComponentPublicInstance, INckModalExposed {}

/**
 * AI-Friendly usage examples for rapid prototyping
 */
export const NckModalExamples = {
  /**
   * Confirmation modal - for critical decisions
   * @aiContext Delete confirmations, destructive actions, irreversible operations
   */
  confirmation: `<nck-modal
    modalTitle="Confirm Delete"
    :size="ModalSize.XS"
    :role="ModalRole.ALERT_DIALOG"
    :dismissable="false"
    v-model:displayed="showDeleteModal">

    <template #modal-body>
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </template>

    <template #modal-footer-action-buttons>
      <nck-button
        label="Cancel"
        type="outline"
        @click="showDeleteModal = false" />
      <nck-button
        label="Delete"
        type="filled"
        color="negative"
        @click="confirmDelete" />
    </template>
  </nck-modal>`,

  /**
   * Form modal - for data entry workflows
   * @aiContext User creation, edit profiles, settings forms
   */
  form: `<nck-modal
    modalTitle="Add New User"
    :size="ModalSize.S"
    :confirmDismissal="hasUnsavedChanges"
    v-model:displayed="showUserForm">

    <template #modal-body>
      <nck-form @submit="handleSubmit">
        <nck-text-input
          name="name"
          label="Full Name"
          v-model="userData.name"
          required />
        <nck-text-input
          name="email"
          label="Email Address"
          type="email"
          v-model="userData.email"
          required />
      </nck-form>
    </template>

    <template #modal-footer-action-buttons>
      <nck-button
        label="Cancel"
        type="outline"
        @click="handleCancel" />
      <nck-button
        label="Create User"
        type="filled"
        :loading="isCreating"
        loadingText="Creating user..."
        @click="handleSubmit" />
    </template>
  </nck-modal>`,
} as const;

/**
 * Modal sizing guide for different use cases
 */
export const ModalSizeGuide = {
  /**
   * Size recommendations by modal purpose
   */
  byPurpose: {
    alert: ModalSize.XS, // Simple alerts and confirmations
    confirmation: ModalSize.XS, // Delete confirmations, simple decisions
    simpleForm: ModalSize.S, // Login, contact forms, basic data entry
    standardForm: ModalSize.M, // User profiles, settings, moderate complexity
    complexForm: ModalSize.L, // Multi-section forms, advanced configurations
    dataDisplay: ModalSize.M, // Details views, information presentation
    dataManagement: ModalSize.L, // Tables, lists, data manipulation
    application: ModalSize.FULL, // Complex workflows, app-within-app
  },
} as const;

/**
 * AI guidance for modal implementation and patterns
 */
export const NckModalAIGuidance = {
  /**
   * When to use modals vs other overlay patterns
   */
  usageDecisions: {
    useModal: "Complex forms, confirmations, detailed content, workflows that need focus",
    useDrawer: "Navigation, contextual panels, secondary content, mobile-first interfaces",
    usePopover: "Contextual help, tooltips, small forms, non-blocking information",
    useToast: "Brief notifications, status updates, non-critical feedback",
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    required: [
      "Always provide meaningful modalTitle for screen reader navigation",
      "Use appropriate role (dialog vs alertdialog) based on content criticality",
      "Ensure focus is trapped within modal during interaction",
      "Provide clear action buttons with descriptive labels",
    ],
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    nestedModals: "Avoid opening modals from within modals - use navigation or drawer patterns",
    oversizedContent: "Don't force large content into small modals - choose appropriate size",
    missingActions: "Always provide clear ways to complete or cancel modal interactions",
  },
} as const;

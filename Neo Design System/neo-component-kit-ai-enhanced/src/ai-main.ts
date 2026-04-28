/**
 * Neo Component Kit - AI-Optimized Entry Point
 * Enhanced developer experience for AI-assisted development and rapid prototyping
 *
 * @aiUsage Primary entry point for AI-assisted Neo Design System development
 * @aiCategory development
 */

// Export everything from the main entry point
// AI-specific utilities and helpers
import { computed, ref } from "vue";
import { IconSize, IconColors, ButtonType, ButtonSize, ButtonColor } from "./main.external";
import {
  ComponentValidator,
  ValidationHelpers,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning,
} from "./ai-helpers/componentValidator";
import {
  SmartDefaultsGenerator,
  PropSuggestions,
  CompositionHelpers,
  SmartDefaults as SmartDefaultsUtil,
} from "./ai-helpers/smartDefaults";
import { TemplateGenerator, CommonTemplates, type TemplateResult } from "./ai-helpers/templateGenerator";

export * from "./main.external";

// AI-Enhanced Component Interfaces
export { INckIcon } from "./components/interfaces/iNckIcon";
export { INckButton } from "./components/interfaces/iNckButton";
export { INckCard } from "./components/interfaces/iNckCard";
export { INckTable } from "./components/interfaces/iNckTable";
export { INckTabs } from "./components/interfaces/iNckTabs";
export { INckBanner } from "./components/interfaces/iNckBanner";
export { INckPagination } from "./components/interfaces/iNckPagination";
export { INckHeader } from "./components/interfaces/iNckHeader";

// Form Component Interfaces with AI Optimization
export {
  INckForm,
  INckFormProps,
  INckFormExposed,
  NckFormExamples,
  FormValidationPatterns,
  NckFormAIGuidance,
} from "./components/interfaces/iNckForm";
export {
  INckModal,
  INckModalProps,
  INckModalExposed,
  NckModalExamples,
  ModalSizeGuide,
  NckModalAIGuidance,
} from "./components/interfaces/iNckModal";
export {
  INckTextInput,
  INckTextInputProps,
  INckTextInputExposed,
  NckTextInputExamples,
  InputTypeGuide,
  NckTextInputAIGuidance,
} from "./components/interfaces/iNckTextInput";
export {
  INckDropdown,
  INckDropdownProps,
  IDropdownExposed,
  NckDropdownExamples,
  DropdownOptionGuide,
  NckDropdownAIGuidance,
} from "./components/interfaces/iNckDropdown";
export {
  INckCheckbox,
  INckCheckboxProps,
  INckCheckboxExposed,
  NckCheckboxExamples,
  CheckboxPatterns,
  NckCheckboxAIGuidance,
} from "./components/interfaces/iNckCheckbox";

// Enhanced Constants with AI Guidance
export { IconSizeGuide, IconSizeAccessibility } from "./constants/iconSize";
export { IconColorGuide, IconColorAccessibility } from "./constants/iconColors";
export { ButtonTypeGuide, ButtonTypePatterns, ButtonTypeAccessibility } from "./constants/buttonType";

// Advanced AI Development Helpers
export {
  ComponentValidator,
  ValidationHelpers,
  DevHelpers,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning,
  type ValidationSuggestion,
} from "./ai-helpers/componentValidator";

export {
  SmartDefaultsGenerator,
  PropSuggestions,
  CompositionHelpers,
  SmartDefaults,
  type SmartDefaults as SmartDefaultsType,
} from "./ai-helpers/smartDefaults";

export {
  TemplateGenerator,
  CommonTemplates,
  type TemplateOptions,
  type TemplateResult,
} from "./ai-helpers/templateGenerator";

// AI-friendly component metadata
export const ComponentMetadata = {
  "nck-button": {
    category: "action",
    complexity: "simple",
    description: "Interactive button component with icons, loading states, and accessibility built-in",
    commonUseCases: ["form submission", "navigation", "triggering actions", "modal confirmations"],
    requiredProps: ["label"],
    optionalProps: ["type", "size", "color", "disabled", "loading", "leftIcon", "rightIcon"],
    smartDefaults: {
      type: ButtonType.FILLED,
      size: ButtonSize.M,
      color: ButtonColor.PRIMARY,
    },
    aiExamples: {
      simple: '<nck-button label="Click me" />',
      withIcon: '<nck-button label="Save" leftIcon="check" type="filled" />',
      loading: '<nck-button label="Saving..." :loading="isLoading" />',
      secondary: '<nck-button label="Cancel" type="outline" color="secondary" />',
    },
    relatedComponents: ["nck-form", "nck-modal", "nck-card"],
    accessibilityNotes: "Automatically handles keyboard navigation, focus management, and screen reader support",
  },

  "nck-text-input": {
    category: "form",
    complexity: "simple",
    description: "Text input field with validation, icons, and accessibility features",
    commonUseCases: ["data entry", "search fields", "user registration", "contact forms"],
    requiredProps: ["name", "label"],
    optionalProps: ["type", "placeholder", "required", "disabled", "rules", "leadingIcon"],
    smartDefaults: {
      type: "text",
      required: false,
      disabled: false,
    },
    aiExamples: {
      simple: '<nck-text-input name="email" label="Email Address" />',
      email: '<nck-text-input name="email" label="Email" type="email" required />',
      withIcon: '<nck-text-input name="search" label="Search" leadingIcon="search" />',
      validation: '<nck-text-input name="password" label="Password" type="password" rules="required|min:8" />',
    },
    relatedComponents: ["nck-form", "nck-button", "nck-checkbox"],
    accessibilityNotes: "Includes proper labeling, error announcements, and keyboard support",
  },

  "nck-card": {
    category: "layout",
    complexity: "simple",
    description: "Flexible container component for grouping related content with consistent styling",
    commonUseCases: ["content sections", "feature cards", "data display", "grouped actions"],
    requiredProps: [],
    optionalProps: ["type", "backgroundColor", "elevated"],
    smartDefaults: {
      elevated: true,
    },
    aiExamples: {
      simple: "<nck-card><p>Card content</p></nck-card>",
      withSlots:
        '<nck-card><template #header><h2>Title</h2></template><p>Content</p><template #actions><nck-button label="Action" /></template></nck-card>',
      elevated: '<nck-card :elevated="true"><p>Elevated card content</p></nck-card>',
    },
    relatedComponents: ["nck-button", "nck-badge", "nck-icon"],
    accessibilityNotes: "Provides semantic structure and proper heading hierarchy",
  },

  "nck-modal": {
    category: "overlay",
    complexity: "medium",
    description: "Modal dialog component with focus trapping and accessibility features",
    commonUseCases: ["confirmations", "forms", "detailed views", "alerts"],
    requiredProps: ["title"],
    optionalProps: ["size", "role", "closable", "persistent"],
    smartDefaults: {
      size: "medium",
      closable: true,
      persistent: false,
    },
    aiExamples: {
      simple: '<nck-modal title="Confirmation" v-model:displayed="showModal"><p>Are you sure?</p></nck-modal>',
      withActions:
        '<nck-modal title="Edit Profile"><nck-form>...</nck-form><template #actions><nck-button label="Save" /><nck-button label="Cancel" type="outline" /></template></nck-modal>',
    },
    relatedComponents: ["nck-button", "nck-form", "nck-text-input"],
    accessibilityNotes: "Includes focus trapping, escape key support, and proper ARIA attributes",
  },

  "nck-form": {
    category: "form",
    complexity: "medium",
    description: "Form container with validation, submission handling, and accessibility features",
    commonUseCases: ["user registration", "contact forms", "data entry", "settings"],
    requiredProps: [],
    optionalProps: ["loading", "disabled"],
    smartDefaults: {},
    aiExamples: {
      simple:
        '<nck-form><nck-text-input name="name" label="Name" required /><nck-button label="Submit" type="filled" /></nck-form>',
      withValidation:
        '<nck-form @submit="handleSubmit"><nck-text-input name="email" label="Email" rules="required|email" /><nck-text-input name="password" label="Password" type="password" rules="required|min:8" /></nck-form>',
    },
    relatedComponents: ["nck-text-input", "nck-button", "nck-checkbox", "nck-dropdown"],
    accessibilityNotes: "Provides form validation announcements and proper field associations",
  },
} as const;

// Smart defaults generator for AI assistance
export function useSmartDefaults() {
  return {
    /**
     * Generate intelligent button configuration based on action context
     */
    smartButton: (action: "save" | "cancel" | "delete" | "add" | "edit" | "submit" | "close") => {
      const configs = {
        save: {
          type: ButtonType.FILLED,
          color: ButtonColor.PRIMARY,
          leftIcon: "check",
          label: "Save",
        },
        cancel: {
          type: ButtonType.OUTLINE,
          color: ButtonColor.SECONDARY,
          leftIcon: "close",
          label: "Cancel",
        },
        delete: {
          type: ButtonType.GHOST,
          color: ButtonColor.DANGER,
          leftIcon: "delete",
          label: "Delete",
        },
        add: {
          type: ButtonType.FILLED,
          color: ButtonColor.PRIMARY,
          leftIcon: "add-plus",
          label: "Add",
        },
        edit: {
          type: ButtonType.OUTLINE,
          color: ButtonColor.PRIMARY,
          leftIcon: "edit",
          label: "Edit",
        },
        submit: {
          type: ButtonType.FILLED,
          color: ButtonColor.PRIMARY,
          label: "Submit",
        },
        close: {
          type: ButtonType.GHOST,
          color: ButtonColor.SECONDARY,
          leftIcon: "close",
          label: "Close",
        },
      };
      return configs[action];
    },

    /**
     * Generate intelligent form field configuration based on field type
     */
    smartFormField: (fieldType: "email" | "password" | "phone" | "text" | "search" | "url") => {
      const configs = {
        email: {
          type: "email",
          rules: "required|email",
          placeholder: "Enter your email address",
          leadingIcon: "email",
        },
        password: {
          type: "password",
          rules: "required|min:8",
          placeholder: "Enter your password",
        },
        phone: {
          type: "tel",
          rules: "required|phone",
          placeholder: "Enter your phone number",
          leadingIcon: "phone",
        },
        text: {
          type: "text",
          rules: "required",
          placeholder: "Enter text",
        },
        search: {
          type: "text",
          placeholder: "Search...",
          leadingIcon: "search",
        },
        url: {
          type: "url",
          rules: "required|url",
          placeholder: "https://example.com",
          leadingIcon: "link",
        },
      };
      return configs[fieldType];
    },

    /**
     * Generate semantic icon suggestions based on context
     */
    smartIcon: (context: "success" | "error" | "warning" | "info" | "loading" | "save" | "delete" | "edit" | "add") => {
      const iconMap = {
        success: "check-filled",
        error: "cancel-circle-filled",
        warning: "warning-filled",
        info: "info-support-filled",
        loading: "loading",
        save: "check",
        delete: "delete",
        edit: "edit",
        add: "add-plus",
      };

      const colorMap = {
        success: IconColors.GREEN_300,
        error: IconColors.RED_300,
        warning: IconColors.ORANGE_300,
        info: IconColors.BRIGHT_BLUE_300,
        loading: IconColors.BLUE_GREY_500,
        save: IconColors.GREEN_300,
        delete: IconColors.RED_300,
        edit: IconColors.BRIGHT_BLUE_300,
        add: IconColors.GREEN_300,
      };

      return {
        iconName: iconMap[context],
        primaryColor: colorMap[context],
        iconSize: IconSize.S,
      };
    },
  };
}

// Component discovery and suggestion system
export function useComponentDiscovery() {
  return {
    /**
     * Suggest components based on user intent or use case
     */
    suggestComponents: (intent: string): string[] => {
      const intentMap = {
        form: ["nck-form", "nck-text-input", "nck-button", "nck-checkbox", "nck-dropdown"],
        input: ["nck-text-input", "nck-text-area", "nck-dropdown", "nck-checkbox", "nck-radio-buttons"],
        button: ["nck-button"],
        navigation: ["nck-breadcrumb", "nck-tabs", "nck-pagination", "nck-menu"],
        data: ["nck-table", "nck-list", "nck-card", "nck-badge"],
        layout: ["nck-card", "nck-header", "nck-drawer"],
        feedback: ["nck-toast", "nck-banner", "nck-modal", "nck-loader"],
        overlay: ["nck-modal", "nck-drawer", "nck-popover"],
        "user action": ["nck-button", "nck-menu", "nck-dropdown"],
        "display data": ["nck-table", "nck-card", "nck-list", "nck-badge"],
        "user input": ["nck-text-input", "nck-dropdown", "nck-checkbox", "nck-form"],
      };

      // Find matching suggestions
      const matches: string[] = [];
      Object.entries(intentMap).forEach(([key, components]) => {
        if (intent.toLowerCase().includes(key)) {
          matches.push(...components);
        }
      });

      // Return unique suggestions
      return [...new Set(matches)];
    },

    /**
     * Get components by specific use case category
     */
    getComponentsByUseCase: (useCase: "data-entry" | "user-feedback" | "navigation" | "data-display" | "layout") => {
      const useCaseMap: Record<string, string[]> = {
        "data-entry": [
          "nck-form",
          "nck-text-input",
          "nck-text-area",
          "nck-dropdown",
          "nck-checkbox",
          "nck-radio-buttons",
          "nck-switch",
          "nck-datepicker-single",
          "nck-search-input",
        ],
        "user-feedback": ["nck-toast", "nck-banner", "nck-modal", "nck-loader", "nck-badge", "nck-status-indicator"],
        navigation: ["nck-breadcrumb", "nck-tabs", "nck-pagination", "nck-menu", "nck-content-switcher", "nck-button"],
        "data-display": ["nck-table", "nck-list", "nck-card", "nck-badge", "nck-timeline", "nck-status-indicator"],
        layout: ["nck-card", "nck-header", "nck-drawer", "nck-modal", "nck-popover"],
      };
      return useCaseMap[useCase] || [];
    },

    /**
     * Get next logical component suggestions based on current component
     */
    getNextComponents: (currentComponent: string): string[] => {
      const flowMap: Record<string, string[]> = {
        "nck-text-input": ["nck-button", "nck-form"],
        "nck-form": ["nck-button", "nck-modal"],
        "nck-button": ["nck-modal", "nck-toast", "nck-loader"],
        "nck-table": ["nck-pagination", "nck-modal", "nck-button"],
        "nck-card": ["nck-button", "nck-badge", "nck-modal"],
        "nck-modal": ["nck-button", "nck-form", "nck-text-input"],
      };
      return flowMap[currentComponent] || [];
    },
  };
}

// Template generator for common patterns
export const AITemplateGenerator = {
  /**
   * Generate a complete login form
   */
  loginForm: () => `
    <nck-form @submit="handleLogin">
      <nck-text-input
        name="email"
        label="Email Address"
        type="email"
        required
        rules="required|email"
        v-model="credentials.email"
      />
      <nck-text-input
        name="password"
        label="Password"
        type="password"
        required
        rules="required|min:8"
        v-model="credentials.password"
      />
      <div class="form-actions">
        <nck-button
          label="Sign In"
          type="filled"
          :loading="isLoading"
          @click="handleLogin"
        />
        <nck-button
          label="Cancel"
          type="outline"
          @click="handleCancel"
        />
      </div>
    </nck-form>
  `,

  /**
   * Generate a data table with actions
   */
  dataTableWithActions: (columns: string[]) => `
    <div class="data-table-container">
      <nck-table
        :columns="[${columns.map((col) => `{ key: '${col}', label: '${col}' }`).join(", ")}]"
        :data="tableData"
        @row-click="handleRowClick"
      />
      <nck-pagination
        :total="totalItems"
        :current-page="currentPage"
        @page-change="handlePageChange"
      />
    </div>
  `,

  /**
   * Generate a user profile card
   */
  userProfileCard: () => `
    <nck-card elevated>
      <template #header>
        <div class="profile-header">
          <nck-icon iconName="account-filled" :iconSize="IconSize.L" iconAltText="User Profile" />
          <h2>{{ user.name }}</h2>
        </div>
      </template>

      <div class="profile-content">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <nck-badge :label="user.status" :type="getBadgeType(user.status)" />
      </div>

      <template #actions>
        <nck-button label="Edit" type="outline" leftIcon="edit" @click="editUser" />
        <nck-button label="Delete" type="ghost" color="danger" leftIcon="delete" @click="deleteUser" />
      </template>
    </nck-card>
  `,

  /**
   * Generate a confirmation modal
   */
  confirmationModal: (title: string, message: string) => `
    <nck-modal
      title="${title}"
      v-model:displayed="showModal"
      size="small"
    >
      <p>${message}</p>

      <template #actions>
        <nck-button
          label="Confirm"
          type="filled"
          color="danger"
          @click="handleConfirm"
        />
        <nck-button
          label="Cancel"
          type="outline"
          @click="handleCancel"
        />
      </template>
    </nck-modal>
  `,
};

// Development helpers for AI assistance
export const AIHelpers = {
  /**
   * Validate component usage and provide suggestions
   */
  validateUsage: (componentName: string, props: Record<string, any>) => {
    const metadata = ComponentMetadata[componentName as keyof typeof ComponentMetadata];
    if (!metadata) return { valid: true, suggestions: [] };

    const suggestions: string[] = [];
    const warnings: string[] = [];

    // Check required props
    metadata.requiredProps.forEach((prop) => {
      if (!(prop in props)) {
        warnings.push(`Missing required prop: ${prop}`);
        suggestions.push(`Add ${prop} prop to ${componentName}`);
      }
    });

    // Suggest improvements
    if (componentName === "nck-button" && !props.leftIcon && !props.rightIcon) {
      suggestions.push("Consider adding an icon for better UX");
    }

    if (componentName === "nck-text-input" && !props.rules && props.required) {
      suggestions.push("Consider adding validation rules for better user feedback");
    }

    return {
      valid: warnings.length === 0,
      warnings,
      suggestions,
    };
  },

  /**
   * Generate contextual accessibility recommendations
   */
  getAccessibilityRecommendations: (componentName: string, context: string) => {
    const recommendations: Record<string, string[]> = {
      "nck-button": [
        'Provide descriptive labels instead of generic text like "Click here"',
        "Use loading states for async operations",
        "Consider icon alternatives for text when space is limited",
      ],
      "nck-text-input": [
        "Always provide a clear, descriptive label",
        "Use placeholder text sparingly - it should not replace labels",
        "Provide helpful error messages for validation failures",
      ],
      "nck-modal": [
        "Ensure the modal has a descriptive title",
        "Provide clear action buttons",
        "Consider escape key functionality",
      ],
    };

    return recommendations[componentName] || [];
  },
};

/**
 * Comprehensive AI-Powered Development Assistant
 * Integrates all AI helpers into a unified interface
 */
export class NeoAIAssistant {
  /**
   * Validate component props with advanced AI-powered suggestions
   * @param componentType - The component type (e.g., 'nck-button')
   * @param props - Component props to validate
   * @param componentName - Optional name for better error reporting
   */
  static validate(componentType: string, props: any, componentName?: string) {
    return ValidationHelpers.validateAndLog(componentType, props, componentName);
  }

  /**
   * Get intelligent defaults for a component based on context
   * @param componentType - The component type
   * @param context - Usage context for intelligent defaults
   */
  static getSmartDefaults(componentType: string, context: any = {}) {
    return SmartDefaultsUtil.getDefaults(componentType, context);
  }

  /**
   * Generate component template with best practices and AI optimization
   * @param componentType - The component type
   * @param props - Component props
   * @param options - Generation options
   */
  static generateTemplate(componentType: string, props: any = {}, options: any = {}) {
    return TemplateGenerator.generateTemplate({
      componentType,
      props,
      context: options,
    });
  }

  /**
   * Get contextual prop suggestions and completions
   * @param componentType - The component type
   * @param currentProps - Current component props
   */
  static getSuggestions(componentType: string, currentProps: any = {}) {
    return PropSuggestions.getCompletionSuggestions(componentType, currentProps);
  }

  /**
   * Validate component composition and hierarchy
   * @param components - Array of components in the composition
   */
  static validateComposition(components: { type: string; props: any }[]) {
    return CompositionHelpers.validateComposition(components);
  }

  /**
   * Get usage examples for a component type and context
   * @param componentType - The component type
   * @param context - Usage context
   */
  static getUsageExamples(componentType: string, context: any = {}) {
    return PropSuggestions.getUsageExamples(componentType, context);
  }

  /**
   * Generate complete project templates
   * @param projectType - Type of project to generate
   */
  static generateProjectTemplate(projectType: "crud" | "form") {
    switch (projectType) {
      case "crud":
        return CommonTemplates.crudInterface("Item");
      case "form":
        return CommonTemplates.formDialog([
          { name: "name", type: "text", required: true },
          { name: "email", type: "email", required: true },
          { name: "description", type: "textarea", required: false },
        ]);
      default:
        return { template: "", script: "" };
    }
  }
}

/**
 * Quick AI helper functions for common development tasks
 */
export const NeoAI = {
  /**
   * Quick component validation
   */
  validate: NeoAIAssistant.validate,

  /**
   * Smart prop defaults
   */
  defaults: NeoAIAssistant.getSmartDefaults,

  /**
   * Template generation
   */
  template: NeoAIAssistant.generateTemplate,

  /**
   * Prop suggestions
   */
  suggest: NeoAIAssistant.getSuggestions,

  /**
   * Usage examples
   */
  examples: NeoAIAssistant.getUsageExamples,

  /**
   * Component composition validation
   */
  composition: NeoAIAssistant.validateComposition,

  /**
   * Project templates
   */
  project: NeoAIAssistant.generateProjectTemplate,

  /**
   * Legacy AI helpers (maintained for compatibility)
   */
  legacy: {
    ComponentMetadata,
    useSmartDefaults,
    useComponentDiscovery,
    AITemplateGenerator,
    AIHelpers,
  },
};

// Export metadata for external consumption
export { ComponentMetadata as default };

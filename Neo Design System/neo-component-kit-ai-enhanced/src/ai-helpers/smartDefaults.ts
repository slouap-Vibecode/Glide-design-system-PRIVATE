/**
 * AI-powered smart defaults and contextual suggestions for Neo Design System components
 * Provides intelligent prop defaults based on context and usage patterns
 */

import { IconSize, IconSizeGuide } from "../constants/iconSize";
import { IconColors, IconColorGuide } from "../constants/iconColors";
import { ButtonType, ButtonTypeGuide } from "../constants/buttonType";
import { BannerType } from "../constants/bannerType";
import { HeaderType } from "../constants/headerType";

/**
 * Smart default configuration interface
 */
export interface SmartDefaults {
  iconSize?: IconSize;
  iconColor?: IconColors;
  buttonType?: ButtonType;
  bannerType?: BannerType;
  headerType?: HeaderType;
  [key: string]: any;
}

/**
 * Context-aware smart defaults generator
 */
export class SmartDefaultsGenerator {
  /**
   * Generate smart defaults for nck-icon based on context
   */
  static getIconDefaults(context: {
    usage?: "button" | "form" | "header" | "card" | "inline" | "hero";
    semantic?: "decorative" | "functional" | "informational" | "navigational" | "branding";
    parentComponent?: string;
    actionType?: string;
  }): SmartDefaults {
    const defaults: SmartDefaults = {};

    // Size based on usage context
    if (context.usage) {
      defaults.iconSize = IconSizeGuide.byContext[context.usage] || IconSize.S;
    } else if (context.parentComponent) {
      const componentDefaults =
        IconSizeGuide.byComponent[context.parentComponent as keyof typeof IconSizeGuide.byComponent];
      if (typeof componentDefaults === "object") {
        defaults.iconSize = componentDefaults.medium || IconSize.S;
      } else {
        defaults.iconSize = componentDefaults || IconSize.S;
      }
    }

    // Color based on semantic meaning
    if (context.semantic) {
      defaults.iconColor =
        IconColorGuide.bySemantic[context.semantic as keyof typeof IconColorGuide.bySemantic] ||
        IconColors.BLUE_GREY_600;
    }

    // Action-specific icon suggestions
    if (context.actionType) {
      const actionIcons = this.getActionIconSuggestions(context.actionType);
      if (actionIcons.length > 0) {
        defaults.suggestedIcons = actionIcons;
      }
    }

    return defaults;
  }

  /**
   * Generate smart defaults for nck-button based on context
   */
  static getButtonDefaults(context: {
    action?: "create" | "save" | "submit" | "confirm" | "navigate" | "back" | "cancel" | "edit" | "help" | "optional";
    priority?: "primary" | "secondary" | "tertiary";
    contextType?: "forms" | "modals" | "cards" | "navigation";
    groupPosition?: "single" | "first" | "middle" | "last";
  }): SmartDefaults {
    const defaults: SmartDefaults = {};

    // Button type based on action
    if (context.action) {
      defaults.buttonType = ButtonTypeGuide.byActionType[context.action] || ButtonType.OUTLINE;
    } else if (context.priority) {
      defaults.buttonType = ButtonTypeGuide.byPriority[context.priority];
    }

    // Context-specific defaults
    if (context.contextType && context.action) {
      const contextDefaults = ButtonTypeGuide.byContext[context.contextType as keyof typeof ButtonTypeGuide.byContext];
      if (contextDefaults?.[context.action as keyof typeof contextDefaults]) {
        defaults.buttonType = contextDefaults[context.action as keyof typeof contextDefaults];
      }
    }

    // Icon suggestions based on action
    if (context.action) {
      const iconSuggestion = this.getActionIconSuggestions(context.action);
      if (iconSuggestion.length > 0) {
        defaults.suggestedLeftIcon = iconSuggestion[0];
      }
    }

    return defaults;
  }

  /**
   * Generate smart defaults for nck-banner based on context
   */
  static getBannerDefaults(context: {
    intent?: "success" | "error" | "warning" | "info" | "neutral";
    action?: boolean;
    temporary?: boolean;
    critical?: boolean;
  }): SmartDefaults {
    const defaults: SmartDefaults = {};

    // Banner type based on intent
    if (context.intent) {
      const typeMap = {
        success: BannerType.SUCCESS,
        error: BannerType.ERROR,
        warning: BannerType.WARNING,
        info: BannerType.INFORMATION,
        neutral: BannerType.NEUTRAL,
      };
      defaults.bannerType = typeMap[context.intent];
    }

    // Dismissable based on context
    if (context.temporary && context.intent !== "error") {
      defaults.dismissable = true;
    } else if (context.critical) {
      defaults.dismissable = false;
    }

    return defaults;
  }

  /**
   * Generate smart defaults for nck-header based on context
   */
  static getHeaderDefaults(context: {
    pageType?: "main" | "detail" | "form" | "modal";
    hasSubsequentContent?: boolean;
    complexity?: "simple" | "complex";
  }): SmartDefaults {
    const defaults: SmartDefaults = {};

    // Header type based on page structure
    if (context.hasSubsequentContent) {
      defaults.headerType = HeaderType.CONDENSED;
      defaults.showDivider = false;
    } else {
      defaults.headerType = HeaderType.STANDARD;
      defaults.showDivider = true;
    }

    // Modal headers typically don't need dividers
    if (context.pageType === "modal") {
      defaults.showDivider = false;
    }

    return defaults;
  }

  /**
   * Get icon suggestions based on action type
   */
  private static getActionIconSuggestions(actionType: string): string[] {
    const iconMap: Record<string, string[]> = {
      // Actions
      create: ["add-plus", "plus", "create"],
      add: ["add-plus", "plus"],
      save: ["check", "save", "floppy-disk"],
      submit: ["check", "send", "arrow-right"],
      confirm: ["check", "check-circle"],
      edit: ["edit", "pencil", "edit-pencil"],
      delete: ["delete", "trash", "close"],
      remove: ["close", "minus", "delete"],

      // Navigation
      back: ["arrow-left", "chevron-left"],
      forward: ["arrow-right", "chevron-right"],
      navigate: ["arrow-right", "external-link"],
      up: ["arrow-up", "chevron-up"],
      down: ["arrow-down", "chevron-down"],

      // Information
      help: ["help", "question", "info"],
      info: ["info", "info-circle", "lightbulb"],
      settings: ["settings", "gear", "cog"],
      search: ["search", "magnifying-glass"],

      // Content
      download: ["download", "arrow-down"],
      upload: ["upload", "arrow-up"],
      export: ["download", "share"],
      import: ["upload", "arrow-up"],

      // Status
      success: ["check", "check-circle", "thumbs-up"],
      error: ["close", "x-circle", "warning"],
      warning: ["warning", "alert-triangle"],
      pending: ["clock", "hourglass"],
    };

    return iconMap[actionType] || [];
  }
}

/**
 * Contextual prop suggestions and smart completions
 */
export class PropSuggestions {
  /**
   * Get intelligent prop suggestions based on current props
   */
  static getCompletionSuggestions(
    componentType: string,
    currentProps: any,
  ): {
    required: string[];
    recommended: string[];
    optional: string[];
  } {
    const suggestions = {
      required: [] as string[],
      recommended: [] as string[],
      optional: [] as string[],
    };

    switch (componentType) {
      case "nck-icon":
        suggestions.required = ["iconName", "iconSize", "iconAltText"];
        if (!currentProps.primaryColor) {
          suggestions.recommended.push("primaryColor");
        }
        if (currentProps.iconAltText === "") {
          suggestions.recommended.push("Add descriptive alt text for functional icons");
        }
        break;

      case "nck-button":
        if (!currentProps.label && !currentProps.iconAltText) {
          suggestions.required.push("label or iconAltText for accessibility");
        }
        if (currentProps.loading && !currentProps.loadingText) {
          suggestions.required.push("loadingText when loading is true");
        }
        if (!currentProps.type) {
          suggestions.recommended.push("type (filled, outline, or ghost)");
        }
        break;

      case "nck-banner":
        suggestions.required = ["heading"];
        if (currentProps.linkLabel && !currentProps.linkAriaRole) {
          suggestions.required.push("linkAriaRole when linkLabel is provided");
        }
        if (!currentProps.type) {
          suggestions.recommended.push("type for semantic meaning");
        }
        break;
    }

    return suggestions;
  }

  /**
   * Generate contextual examples based on current props
   */
  static getUsageExamples(componentType: string, context: any): string[] {
    const examples: string[] = [];

    switch (componentType) {
      case "nck-icon":
        if (context.usage === "button") {
          examples.push('<nck-icon iconName="check" :iconSize="IconSize.S" iconAltText="Save" />');
        } else if (context.usage === "decorative") {
          examples.push('<nck-icon iconName="star" :iconSize="IconSize.XS" iconAltText="" />');
        }
        break;

      case "nck-button":
        if (context.action === "save") {
          examples.push('<nck-button label="Save Changes" type="filled" leftIcon="check" />');
        } else if (context.action === "cancel") {
          examples.push('<nck-button label="Cancel" type="outline" />');
        }
        break;

      case "nck-banner":
        if (context.intent === "success") {
          examples.push('<nck-banner type="success" heading="Changes saved successfully" :dismissable="true" />');
        } else if (context.intent === "error") {
          examples.push('<nck-banner type="critical" heading="Please fix the errors below" />');
        }
        break;
    }

    return examples;
  }
}

/**
 * AI-powered component composition helpers
 */
export class CompositionHelpers {
  /**
   * Suggest optimal component combinations
   */
  static suggestComplementaryComponents(
    componentType: string,
    props: any,
  ): {
    component: string;
    reason: string;
    props?: any;
  }[] {
    const suggestions: {
      component: string;
      reason: string;
      props?: any;
    }[] = [];

    switch (componentType) {
      case "nck-button":
        if (props.type === "filled" && props.action === "delete") {
          suggestions.push({
            component: "nck-modal",
            reason: "Destructive actions should have confirmation modals",
            props: {
              title: "Confirm Delete",
              type: "warning",
            },
          });
        }
        break;

      case "nck-table":
        suggestions.push({
          component: "nck-pagination",
          reason: "Large data tables benefit from pagination",
          props: {
            footerWording: "Showing {min}-{max} of {total} items",
          },
        });
        break;

      case "nck-form":
        suggestions.push({
          component: "nck-banner",
          reason: "Forms should have error/success feedback",
          props: {
            type: "error",
          },
        });
        break;
    }

    return suggestions;
  }

  /**
   * Validate component hierarchies and relationships
   */
  static validateComposition(components: { type: string; props: any }[]): {
    valid: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const result = {
      valid: true,
      issues: [] as string[],
      suggestions: [] as string[],
    };

    // Check for multiple primary actions
    const primaryButtons = components.filter((c) => c.type === "nck-button" && c.props.type === "filled");

    if (primaryButtons.length > 2) {
      result.valid = false;
      result.issues.push("Too many primary buttons - use sparingly for visual hierarchy");
      result.suggestions.push("Consider using outline or ghost buttons for secondary actions");
    }

    // Check for accessibility issues
    const interactiveComponents = components.filter((c) => ["nck-button", "nck-icon"].includes(c.type));

    interactiveComponents.forEach((component, index) => {
      if (!component.props.iconAltText && !component.props.label) {
        result.valid = false;
        result.issues.push(`Interactive component at index ${index} missing accessibility labels`);
      }
    });

    return result;
  }
}

/**
 * Export smart defaults utility functions
 */
export const SmartDefaults = {
  /**
   * Get context-aware defaults for any component
   */
  getDefaults: (componentType: string, context: Record<string, unknown>): SmartDefaults => {
    switch (componentType) {
      case "nck-icon":
        return SmartDefaultsGenerator.getIconDefaults(context);
      case "nck-button":
        return SmartDefaultsGenerator.getButtonDefaults(context);
      case "nck-banner":
        return SmartDefaultsGenerator.getBannerDefaults(context);
      case "nck-header":
        return SmartDefaultsGenerator.getHeaderDefaults(context);
      default:
        return {};
    }
  },

  /**
   * Apply smart defaults to component props
   */
  applyDefaults: (componentType: string, props: any, context: any = {}): any => {
    const defaults = SmartDefaults.getDefaults(componentType, context);
    return { ...defaults, ...props }; // Props override defaults
  },
};

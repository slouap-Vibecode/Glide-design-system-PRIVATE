/**
 * AI-powered component validation helpers for development-time assistance
 * Provides intelligent validation and suggestions for Neo Design System components
 */

import { IconSize } from "../constants/iconSize";
import { IconColors } from "../constants/iconColors";
import { ButtonType } from "../constants/buttonType";
import { BannerType } from "../constants/bannerType";

/**
 * Validation result interface for component analysis
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
}

export interface ValidationError {
  type: "error";
  message: string;
  property?: string;
  fix?: string;
}

export interface ValidationWarning {
  type: "warning";
  message: string;
  property?: string;
  recommendation?: string;
}

export interface ValidationSuggestion {
  type: "suggestion";
  message: string;
  property?: string;
  improvement?: string;
}

/**
 * AI-powered component prop validator
 * Analyzes component props for consistency, accessibility, and best practices
 */
export class ComponentValidator {
  /**
   * Validates nck-icon component props for optimal usage
   */
  static validateIcon(props: {
    iconName: string;
    iconSize: IconSize;
    iconAltText: string;
    primaryColor?: IconColors;
    secondaryColor?: IconColors;
  }): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    // Icon name validation
    if (!props.iconName || typeof props.iconName !== "string") {
      result.errors.push({
        type: "error",
        message: "iconName is required and must be a valid string",
        property: "iconName",
        fix: "Provide a valid icon name from the Neo Icon Kit",
      });
      result.isValid = false;
    }

    // Icon alt text accessibility validation
    if (typeof props.iconAltText !== "string") {
      result.errors.push({
        type: "error",
        message: "iconAltText is required for accessibility",
        property: "iconAltText",
        fix: "Provide descriptive alt text or empty string for decorative icons",
      });
      result.isValid = false;
    }

    // Alt text quality validation
    if (props.iconAltText === props.iconName) {
      result.warnings.push({
        type: "warning",
        message: "Alt text should describe the function, not repeat the icon name",
        property: "iconAltText",
        recommendation: 'Use descriptive text like "Save document" instead of "check"',
      });
    }

    // Icon size appropriateness
    if (props.iconSize === IconSize.XL) {
      result.suggestions.push({
        type: "suggestion",
        message: "XL icons are typically reserved for hero sections and empty states",
        property: "iconSize",
        improvement: "Consider using L or M size for better visual hierarchy",
      });
    }

    // Color consistency validation
    if (props.primaryColor && props.secondaryColor && props.primaryColor === props.secondaryColor) {
      result.warnings.push({
        type: "warning",
        message: "Primary and secondary colors should be different for visual distinction",
        property: "secondaryColor",
        recommendation: "Use different colors or remove secondaryColor if not needed",
      });
    }

    return result;
  }

  /**
   * Validates nck-button component props for optimal usage
   */
  static validateButton(props: {
    label?: string;
    type?: ButtonType;
    disabled?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    iconAltText?: string;
    rightIconAltText?: string;
    loading?: boolean;
    loadingText?: string;
  }): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    // Button label validation
    if (!props.label && !props.iconAltText) {
      result.errors.push({
        type: "error",
        message: "Button must have either label or iconAltText for accessibility",
        property: "label",
        fix: "Provide a descriptive label or icon alt text",
      });
      result.isValid = false;
    }

    // Loading state validation
    if (props.loading && !props.loadingText) {
      result.errors.push({
        type: "error",
        message: "loadingText is required when loading is true for screen reader accessibility",
        property: "loadingText",
        fix: 'Provide descriptive loading text like "Saving changes..."',
      });
      result.isValid = false;
    }

    // Icon alt text validation
    if (props.leftIcon && !props.iconAltText) {
      result.warnings.push({
        type: "warning",
        message: "Consider providing iconAltText for the left icon",
        property: "iconAltText",
        recommendation: "Use descriptive alt text or empty string for decorative icons",
      });
    }

    if (props.rightIcon && !props.rightIconAltText) {
      result.warnings.push({
        type: "warning",
        message: "Consider providing rightIconAltText for the right icon",
        property: "rightIconAltText",
        recommendation: "Use descriptive alt text or empty string for decorative icons",
      });
    }

    // Button hierarchy suggestions
    if (props.type === ButtonType.FILLED) {
      result.suggestions.push({
        type: "suggestion",
        message: "Filled buttons should be used sparingly for primary actions",
        property: "type",
        improvement: "Ensure this is the primary action in the current context",
      });
    }

    return result;
  }

  /**
   * Validates nck-banner component props for optimal usage
   */
  static validateBanner(props: {
    heading: string;
    type?: BannerType;
    dismissable?: boolean;
    linkLabel?: string;
    linkAriaRole?: string;
    leadingIcon?: string;
    leadingIconAltText?: string;
  }): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    // Heading validation
    if (!props.heading || typeof props.heading !== "string") {
      result.errors.push({
        type: "error",
        message: "heading is required and must be a non-empty string",
        property: "heading",
        fix: "Provide a clear, descriptive banner message",
      });
      result.isValid = false;
    }

    // Link validation
    if (props.linkLabel && !props.linkAriaRole) {
      result.errors.push({
        type: "error",
        message: "linkAriaRole is required when linkLabel is provided",
        property: "linkAriaRole",
        fix: 'Set linkAriaRole to "button" for actions or "link" for navigation',
      });
      result.isValid = false;
    }

    // Custom icon validation
    if (props.leadingIcon && !props.leadingIconAltText) {
      result.warnings.push({
        type: "warning",
        message: "Consider providing leadingIconAltText for custom icons",
        property: "leadingIconAltText",
        recommendation: "Provide descriptive alt text for the custom icon",
      });
    }

    // Banner type appropriateness
    if (props.type === BannerType.ERROR && props.dismissable) {
      result.suggestions.push({
        type: "suggestion",
        message: "Error banners typically should not be dismissable until resolved",
        property: "dismissable",
        improvement: "Consider making error banners non-dismissable for critical issues",
      });
    }

    return result;
  }

  /**
   * Validates component accessibility practices
   */
  static validateAccessibility(componentType: string, props: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    // General accessibility checks
    if (props.ariaRole && !["button", "link"].includes(props.ariaRole)) {
      result.warnings.push({
        type: "warning",
        message: `Unusual aria role "${props.ariaRole}" for ${componentType}`,
        property: "ariaRole",
        recommendation: 'Use standard roles like "button" or "link" for better compatibility',
      });
    }

    // Color contrast suggestions
    if (props.primaryColor || props.color) {
      result.suggestions.push({
        type: "suggestion",
        message: "Ensure sufficient color contrast for accessibility compliance",
        property: "color",
        improvement: "Test color combinations with accessibility tools for WCAG compliance",
      });
    }

    return result;
  }

  /**
   * Comprehensive component validation
   */
  static validateComponent(componentType: string, props: any): ValidationResult {
    let result: ValidationResult;

    switch (componentType) {
      case "nck-icon":
        result = this.validateIcon(props);
        break;
      case "nck-button":
        result = this.validateButton(props);
        break;
      case "nck-banner":
        result = this.validateBanner(props);
        break;
      default:
        result = {
          isValid: true,
          errors: [],
          warnings: [],
          suggestions: [],
        };
    }

    // Add general accessibility validation
    const accessibilityResult = this.validateAccessibility(componentType, props);
    result.errors.push(...accessibilityResult.errors);
    result.warnings.push(...accessibilityResult.warnings);
    result.suggestions.push(...accessibilityResult.suggestions);

    result.isValid = result.isValid && accessibilityResult.isValid;

    return result;
  }
}

/**
 * Development-time validation helper functions
 */
export const ValidationHelpers = {
  /**
   * Formats validation results for console output
   */
  formatValidationOutput(result: ValidationResult, componentName = "Component"): string {
    let output = `\n📋 ${componentName} Validation Results:\n`;

    if (result.isValid && result.errors.length === 0) {
      output += "✅ Validation passed!\n";
    } else {
      output += "❌ Validation failed!\n";
    }

    if (result.errors.length > 0) {
      output += "\n🚫 Errors:\n";
      result.errors.forEach((error, index) => {
        output += `  ${index + 1}. ${error.message}\n`;
        if (error.fix) output += `     Fix: ${error.fix}\n`;
      });
    }

    if (result.warnings.length > 0) {
      output += "\n⚠️ Warnings:\n";
      result.warnings.forEach((warning, index) => {
        output += `  ${index + 1}. ${warning.message}\n`;
        if (warning.recommendation) output += `     Recommendation: ${warning.recommendation}\n`;
      });
    }

    if (result.suggestions.length > 0) {
      output += "\n💡 Suggestions:\n";
      result.suggestions.forEach((suggestion, index) => {
        output += `  ${index + 1}. ${suggestion.message}\n`;
        if (suggestion.improvement) output += `     Improvement: ${suggestion.improvement}\n`;
      });
    }

    return output;
  },

  /**
   * Quick validation check with console output
   */
  validateAndLog(componentType: string, props: Record<string, unknown>, componentName?: string): boolean {
    const result = ComponentValidator.validateComponent(componentType, props);

    // In development, we could log validation results
    // but removing console statements for production build
    if (process.env.NODE_ENV === "development") {
      const _output = this.formatValidationOutput(result, componentName);
      if (result.errors.length > 0) {
        // Error logging would go here in development
      } else if (result.warnings.length > 0) {
        // Warning logging would go here in development
      } else {
        // Success logging would go here in development
      }
    }

    return result.isValid;
  },
};

/**
 * Runtime development helpers (disabled in production)
 */
export const DevHelpers = {
  /**
   * Enable development-time validation warnings
   */
  enableValidation: process.env.NODE_ENV === "development",

  /**
   * Validate component props during development
   */
  validateProps(componentType: string, props: any, componentName?: string) {
    if (!this.enableValidation) return;

    ValidationHelpers.validateAndLog(componentType, props, componentName);
  },

  /**
   * Log component usage patterns for analysis
   */
  logUsagePattern(_componentType: string, _props: Record<string, unknown>) {
    if (!this.enableValidation) return;

    // Usage pattern logging would go here in development
    if (process.env.NODE_ENV === "development") {
      // Debug logging would go here: Component Usage: ${componentType}
      // Data: props: Object.keys(props), timestamp: new Date().toISOString()
    }
  },
};

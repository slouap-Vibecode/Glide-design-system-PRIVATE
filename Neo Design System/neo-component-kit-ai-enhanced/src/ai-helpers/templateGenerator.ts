/**
 * AI-powered template generator for rapid component scaffolding
 * Generates complete component templates with proper structure, props, and best practices
 */

// Removed unused imports: ButtonType, BannerType

/**
 * Template generation options interface
 */
export interface TemplateOptions {
  componentType: string;
  props?: Record<string, unknown>;
  context?: {
    framework?: "vue" | "react" | "html";
    useCompositionAPI?: boolean;
    includeAccessibility?: boolean;
    includeValidation?: boolean;
    includeDocumentation?: boolean;
  };
}

/**
 * Generated template result
 */
export interface TemplateResult {
  template: string;
  script?: string;
  style?: string;
  documentation?: string;
  imports?: string[];
}

/**
 * AI-powered template generator
 */
export class TemplateGenerator {
  /**
   * Generate complete component templates based on specifications
   */
  static generateTemplate(options: TemplateOptions): TemplateResult {
    const framework = options.context?.framework || "vue";

    switch (framework) {
      case "vue":
        return this.generateVueTemplate(options);
      case "react":
        return this.generateReactTemplate(options);
      case "html":
        return this.generateHTMLTemplate(options);
      default:
        throw new Error(`Unsupported framework: ${framework}`);
    }
  }

  /**
   * Generate Vue 3 component template
   */
  private static generateVueTemplate(options: TemplateOptions): TemplateResult {
    const { componentType, props = {}, context = {} } = options;
    const useComposition = context.useCompositionAPI !== false;

    let template = "<template>\n";
    let script = "";
    let imports: string[] = [];
    let documentation = "";

    switch (componentType) {
      case "nck-button":
        template += this.generateButtonTemplate("vue", props);
        if (useComposition) {
          script = this.generateButtonCompositionScript(props);
        } else {
          script = this.generateButtonOptionsScript(props);
        }
        imports = ["ButtonType", "ButtonColor", "ButtonSize"];
        break;

      case "nck-banner":
        template += this.generateBannerTemplate("vue", props);
        script = this.generateBannerScript(props, useComposition);
        imports = ["BannerType"];
        break;

      case "nck-table":
        template += this.generateTableTemplate("vue", props);
        script = this.generateTableScript(props, useComposition);
        imports = ["SortOrder"];
        break;

      case "nck-form":
        template += this.generateFormTemplate("vue", props);
        script = this.generateFormScript(props, useComposition);
        imports = ["useForm", "useField"];
        break;

      default:
        template += `  <${componentType}${this.formatProps(props, "vue")}>\n`;
        template += `    <!-- Component content -->\n`;
        template += `  </${componentType}>\n`;
    }

    template += "</template>\n";

    if (context.includeDocumentation) {
      documentation = this.generateDocumentation(componentType, props);
    }

    return {
      template,
      script,
      imports,
      documentation,
    };
  }

  /**
   * Generate React component template
   */
  private static generateReactTemplate(options: TemplateOptions): TemplateResult {
    const { componentType, props = {} } = options;

    let template = `import React from 'react';\n`;
    template += `import { ${componentType} } from '@neo/component-kit';\n\n`;
    template += `export function ExampleComponent() {\n`;
    template += `  return (\n`;
    template += `    <${componentType}${this.formatProps(props, "react")}>\n`;
    template += `      {/* Component content */}\n`;
    template += `    </${componentType}>\n`;
    template += `  );\n`;
    template += `}\n`;

    return {
      template,
    };
  }

  /**
   * Generate HTML template
   */
  private static generateHTMLTemplate(options: TemplateOptions): TemplateResult {
    const { componentType, props = {} } = options;

    let template = `<${componentType}${this.formatProps(props, "html")}>\n`;
    template += `  <!-- Component content -->\n`;
    template += `</${componentType}>\n`;

    return {
      template,
    };
  }

  /**
   * Generate button-specific templates
   */
  private static generateButtonTemplate(framework: string, props: any): string {
    const defaultProps = {
      label: props.label || "Button Label",
      type: props.type || "filled",
      leftIcon: props.leftIcon,
      rightIcon: props.rightIcon,
      loading: props.loading || false,
      disabled: props.disabled || false,
      ...props,
    };

    let template = "  <nck-button\n";

    if (defaultProps.label) {
      template += `    label="${defaultProps.label}"\n`;
    }

    if (defaultProps.type !== "filled") {
      template += `    type="${defaultProps.type}"\n`;
    }

    if (defaultProps.leftIcon) {
      template += `    leftIcon="${defaultProps.leftIcon}"\n`;
      template += `    iconAltText="${props.iconAltText || "Icon description"}"\n`;
    }

    if (defaultProps.rightIcon) {
      template += `    rightIcon="${defaultProps.rightIcon}"\n`;
      template += `    rightIconAltText="${props.rightIconAltText || "Right icon description"}"\n`;
    }

    if (defaultProps.loading) {
      template += `    :loading="isLoading"\n`;
      template += `    loadingText="${props.loadingText || "Loading..."}"\n`;
    }

    if (defaultProps.disabled) {
      template += `    :disabled="isDisabled"\n`;
    }

    template += '    @click="handleClick" />\n';

    return template;
  }

  /**
   * Generate banner-specific templates
   */
  private static generateBannerTemplate(framework: string, props: any): string {
    const defaultProps = {
      heading: props.heading || "Banner message",
      type: props.type || "info",
      dismissable: props.dismissable || false,
      linkLabel: props.linkLabel,
      ...props,
    };

    let template = "  <nck-banner\n";
    template += `    heading="${defaultProps.heading}"\n`;

    if (defaultProps.type !== "info") {
      template += `    type="${defaultProps.type}"\n`;
    }

    if (defaultProps.dismissable) {
      template += `    :dismissable="true"\n`;
      template += `    @banner-dismissed="handleDismiss"\n`;
    }

    if (defaultProps.linkLabel) {
      template += `    linkLabel="${defaultProps.linkLabel}"\n`;
      template += `    linkAriaRole="${props.linkAriaRole || "button"}"\n`;
      template += `    @link-clicked="handleLinkClick"\n`;
    }

    template += "  />\n";

    return template;
  }

  /**
   * Generate table-specific templates
   */
  private static generateTableTemplate(framework: string, props: any): string {
    let template = "  <nck-table\n";
    template += '    :columnsDescription="columns"\n';
    template += '    :data="tableData"\n';
    template += '    rowUniqueKey="id"\n';
    template += '    ariaLabel="Data table"\n';

    if (props.multiSelect) {
      template += '    :multiSelect="true"\n';
      template += '    selectAllLabel="Select all rows"\n';
      template += '    unselectAllLabel="Deselect all rows"\n';
      template += '    :getLabelForRowSelection="getRowSelectionLabel"\n';
      template += '    @selection-changed="handleSelectionChange"\n';
    }

    if (props.sortable) {
      template += '    :initiallySortedColumnIndex="0"\n';
      template += '    :initiallySortedColumnSortOrder="SortOrder.ASCENDING"\n';
    }

    template += '    @row-clicked="handleRowClick" />\n';

    return template;
  }

  /**
   * Generate form-specific templates
   */
  private static generateFormTemplate(framework: string, props: any): string {
    let template = '  <form @submit.prevent="handleSubmit">\n';
    template += "    <nck-text-input\n";
    template += '      label="Field Label"\n';
    template += '      name="fieldName"\n';
    template += '      v-model="formData.fieldName"\n';
    template += '      :rules="fieldRules"\n';
    template += "      required />\n\n";

    template += '    <div class="form-actions">\n';
    template += "      <nck-button\n";
    template += '        label="Submit"\n';
    template += '        type="filled"\n';
    template += '        nativeType="submit"\n';
    template += '        :loading="isSubmitting"\n';
    template += '        loadingText="Submitting..." />\n';
    template += "      <nck-button\n";
    template += '        label="Cancel"\n';
    template += '        type="outline"\n';
    template += '        @click="handleCancel" />\n';
    template += "    </div>\n";
    template += "  </form>\n";

    return template;
  }

  /**
   * Generate Vue Composition API script
   */
  private static generateButtonCompositionScript(props: any): string {
    let script = '<script setup lang="ts">\n';
    script += 'import { ref } from "vue";\n';
    script += 'import { ButtonType } from "@/constants/buttonType";\n\n';

    if (props.loading) {
      script += "const isLoading = ref(false);\n";
    }

    if (props.disabled) {
      script += "const isDisabled = ref(false);\n";
    }

    script += "\nfunction handleClick() {\n";
    script += '  console.log("Button clicked");\n';

    if (props.loading) {
      script += "  // Example async operation\n";
      script += "  isLoading.value = true;\n";
      script += "  setTimeout(() => {\n";
      script += "    isLoading.value = false;\n";
      script += "  }, 2000);\n";
    }

    script += "}\n";
    script += "</script>\n";

    return script;
  }

  /**
   * Generate banner script with event handlers
   */
  private static generateBannerScript(props: any, useComposition: boolean): string {
    if (!useComposition) return "";

    let script = '<script setup lang="ts">\n';
    script += 'import { BannerType } from "@/constants/bannerType";\n\n';

    if (props.dismissable) {
      script += "function handleDismiss(event: Event) {\n";
      script += '  console.log("Banner dismissed", event);\n';
      script += "}\n\n";
    }

    if (props.linkLabel) {
      script += "function handleLinkClick(event: Event) {\n";
      script += '  console.log("Banner link clicked", event);\n';
      script += "}\n\n";
    }

    script += "</script>\n";

    return script;
  }

  /**
   * Generate table script with data management
   */
  private static generateTableScript(props: any, useComposition: boolean): string {
    if (!useComposition) return "";

    let script = '<script setup lang="ts">\n';
    script += 'import { ref, reactive } from "vue";\n';
    script += 'import { SortOrder } from "@/constants/sortOrder";\n\n';

    script += "// Table data\n";
    script += "const tableData = ref([\n";
    script += '  { id: 1, name: "Item 1", status: "Active" },\n';
    script += '  { id: 2, name: "Item 2", status: "Inactive" },\n';
    script += "]);\n\n";

    script += "// Column definitions\n";
    script += "const columns = [\n";
    script += '  { headerLabel: "Name", dataPath: "name", width: "50%" },\n';
    script += '  { headerLabel: "Status", dataPath: "status", width: "30%" },\n';
    script += '  { headerLabel: "Actions", slotName: "actions", width: "20%" }\n';
    script += "];\n\n";

    if (props.multiSelect) {
      script += "function getRowSelectionLabel(entry: any, selected: boolean) {\n";
      script += '  return `${selected ? "Deselect" : "Select"} ${entry.name}`;\n';
      script += "}\n\n";

      script += "function handleSelectionChange(selectedItems: any[]) {\n";
      script += '  console.log("Selection changed:", selectedItems);\n';
      script += "}\n\n";
    }

    script += "function handleRowClick(item: any) {\n";
    script += '  console.log("Row clicked:", item);\n';
    script += "}\n";

    script += "</script>\n";

    return script;
  }

  /**
   * Generate form script with validation
   */
  private static generateFormScript(props: any, useComposition: boolean): string {
    if (!useComposition) return "";

    let script = '<script setup lang="ts">\n';
    script += 'import { ref, reactive } from "vue";\n';
    script += 'import { useForm } from "vee-validate";\n\n';

    script += "// Form data\n";
    script += "const formData = reactive({\n";
    script += '  fieldName: ""\n';
    script += "});\n\n";

    script += "// Form state\n";
    script += "const isSubmitting = ref(false);\n\n";

    script += "// Validation rules\n";
    script += 'const fieldRules = "required";\n\n';

    script += "async function handleSubmit() {\n";
    script += "  isSubmitting.value = true;\n";
    script += "  try {\n";
    script += "    // Submit form data\n";
    script += '    console.log("Submitting:", formData);\n';
    script += "    // await submitForm(formData);\n";
    script += "  } catch (error) {\n";
    script += '    console.error("Submit error:", error);\n';
    script += "  } finally {\n";
    script += "    isSubmitting.value = false;\n";
    script += "  }\n";
    script += "}\n\n";

    script += "function handleCancel() {\n";
    script += '  console.log("Form cancelled");\n';
    script += "}\n";

    script += "</script>\n";

    return script;
  }

  /**
   * Generate Options API script (fallback)
   */
  private static generateButtonOptionsScript(props: any): string {
    let script = '<script lang="ts">\n';
    script += 'import { defineComponent } from "vue";\n';
    script += 'import { ButtonType } from "@/constants/buttonType";\n\n';
    script += "export default defineComponent({\n";
    script += "  data() {\n";
    script += "    return {\n";

    if (props.loading) {
      script += "      isLoading: false,\n";
    }

    if (props.disabled) {
      script += "      isDisabled: false,\n";
    }

    script += "    };\n";
    script += "  },\n";
    script += "  methods: {\n";
    script += "    handleClick() {\n";
    script += '      console.log("Button clicked");\n';
    script += "    }\n";
    script += "  }\n";
    script += "});\n";
    script += "</script>\n";

    return script;
  }

  /**
   * Format component props for different frameworks
   */
  private static formatProps(props: Record<string, any>, framework: string): string {
    const entries = Object.entries(props);
    if (entries.length === 0) return "";

    const formatted = entries.map(([key, value]) => {
      switch (framework) {
        case "vue":
          if (typeof value === "boolean") {
            return value ? `\n    :${key}="true"` : `\n    :${key}="false"`;
          } else if (typeof value === "string") {
            return `\n    ${key}="${value}"`;
          } else {
            return `\n    :${key}="${value}"`;
          }
        case "react":
          if (typeof value === "boolean") {
            return value ? ` ${key}` : ` ${key}={false}`;
          } else if (typeof value === "string") {
            return ` ${key}="${value}"`;
          } else {
            return ` ${key}={${value}}`;
          }
        case "html":
          return ` ${key}="${value}"`;
        default:
          return ` ${key}="${value}"`;
      }
    });

    return formatted.join("");
  }

  /**
   * Generate component documentation
   */
  private static generateDocumentation(componentType: string, props: any): string {
    let doc = `# ${componentType} Component\n\n`;
    doc += `This component demonstrates the usage of ${componentType} with the Neo Design System.\n\n`;
    doc += `## Props\n\n`;

    Object.entries(props).forEach(([key, value]) => {
      doc += `- **${key}**: \`${typeof value}\` - ${this.getPropDescription(key, value)}\n`;
    });

    doc += `\n## Accessibility\n\n`;
    doc += `This component follows WCAG 2.1 AA guidelines:\n`;
    doc += `- Proper ARIA attributes are included\n`;
    doc += `- Keyboard navigation is supported\n`;
    doc += `- Screen reader compatible\n`;

    return doc;
  }

  /**
   * Get prop description for documentation
   */
  private static getPropDescription(key: string, value: any): string {
    const descriptions: Record<string, string> = {
      label: "The display text for the component",
      type: "The visual style variant",
      disabled: "Whether the component is disabled",
      loading: "Whether the component is in loading state",
      iconName: "Name of the icon from Neo Icon Kit",
      iconSize: "Size of the icon",
      iconAltText: "Alternative text for screen readers",
      heading: "Main message or title text",
      dismissable: "Whether the component can be dismissed by user",
    };

    return descriptions[key] || "Component property";
  }
}

/**
 * Pre-built templates for common patterns
 */
export const CommonTemplates = {
  /**
   * CRUD interface template
   */
  crudInterface: (entityName: string): TemplateResult => {
    const template = `<template>
  <div class="crud-interface">
    <nck-header
      :title="\`\${entityName} Management\`"
      subtitle="Manage your \${entityName.toLowerCase()} records"
      rightButtonLabel="Add New"
      rightButtonIconName="add-plus"
      rightButtonAriaRole="button"
      @page-header-right-button-clicked="showCreateDialog = true" />

    <nck-table
      :columnsDescription="columns"
      :data="items"
      rowUniqueKey="id"
      :ariaLabel="\`\${entityName} data table\`"
      :multiSelect="true"
      selectAllLabel="Select all items"
      unselectAllLabel="Deselect all items"
      :getLabelForRowSelection="getRowSelectionLabel"
      @row-clicked="editItem"
      @selection-changed="handleSelectionChange">

      <template #actions="{ entry }">
        <nck-button
          label="Edit"
          type="outline"
          size="s"
          leftIcon="edit"
          @click="editItem(entry)" />
        <nck-button
          label="Delete"
          type="outline"
          color="negative"
          size="s"
          leftIcon="delete"
          @click="deleteItem(entry)" />
      </template>
    </nck-table>

    <nck-pagination
      :totalNumberOfItems="totalItems"
      v-model:numberOfItemsPerPage="pageSize"
      :currentPage="currentPage"
      footerWording="Showing {min}-{max} of {total} \${entityName.toLowerCase()}"
      pageNumberWording="Go to page {pageNumber}"
      :withItemsPerPageDropdown="[10, 25, 50]"
      withItemsPerPageLabel="Items per page"
      @page-changed="loadPage" />
  </div>
</template>`;

    const script = `<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

// Data state
const items = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(25);
const showCreateDialog = ref(false);

// Table configuration
const columns = [
  { headerLabel: "ID", dataPath: "id", width: "10%" },
  { headerLabel: "Name", dataPath: "name", width: "40%" },
  { headerLabel: "Status", dataPath: "status", width: "20%" },
  { headerLabel: "Created", dataPath: "createdAt", width: "20%" },
  { headerLabel: "Actions", slotName: "actions", width: "10%" }
];

// Methods
function getRowSelectionLabel(entry: any, selected: boolean) {
  return \`\${selected ? 'Deselect' : 'Select'} \${entry.name}\`;
}

function handleSelectionChange(selectedItems: any[]) {
  console.log('Selection changed:', selectedItems);
}

function editItem(item: any) {
  console.log('Edit item:', item);
}

function deleteItem(item: any) {
  console.log('Delete item:', item);
}

function loadPage(page: number) {
  currentPage.value = page;
  // Load data for the new page
}

onMounted(() => {
  // Load initial data
});
</script>`;

    return {
      template,
      script,
      imports: ["HeaderType", "ButtonType", "SortOrder"],
    };
  },

  /**
   * Form dialog template
   */
  formDialog: (formFields: { name: string; type: string; required?: boolean }[]): TemplateResult => {
    const template = `<template>
  <nck-modal
    title="Form Dialog"
    :isOpen="isOpen"
    @close="handleClose"
    @confirm="handleSubmit">

    <form @submit.prevent="handleSubmit">
      ${formFields
        .map(
          (field) => `
      <nck-text-input
        label="${field.name.charAt(0).toUpperCase() + field.name.slice(1)}"
        name="${field.name}"
        v-model="formData.${field.name}"
        ${field.required ? ":rules=\"'required'\"" : ""}
        ${field.required ? "required" : ""} />`,
        )
        .join("\n")}
    </form>

    <template #actions>
      <nck-button
        label="Cancel"
        type="outline"
        @click="handleClose" />
      <nck-button
        label="Save"
        type="filled"
        :loading="isSubmitting"
        loadingText="Saving..."
        @click="handleSubmit" />
    </template>
  </nck-modal>
</template>`;

    const script = `<script setup lang="ts">
import { ref, reactive } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", data: any): void;
}>();

// Form state
const isSubmitting = ref(false);
const formData = reactive({
  ${formFields.map((field) => `${field.name}: ""`).join(",\n  ")}
});

async function handleSubmit() {
  isSubmitting.value = true;
  try {
    emit("submit", formData);
  } catch (error) {
    console.error("Submit error:", error);
  } finally {
    isSubmitting.value = false;
  }
}

function handleClose() {
  emit("close");
}
</script>`;

    return {
      template,
      script,
      imports: ["ModalSize", "ButtonType"],
    };
  },
};

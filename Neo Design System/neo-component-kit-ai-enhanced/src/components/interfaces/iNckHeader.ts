import { HeaderType } from "../../constants/headerType";

/**
 * Interface for nck-header component props
 * Page header component for navigation, branding, and primary page actions
 *
 * @aiUsage Essential component for page structure - provides consistent navigation and page context
 * @aiCategory layout
 * @aiComplexity medium
 */
export interface INckHeader {
  /**
   * Main page or section title displayed prominently
   * Cannot be used with title-content slot
   * @example "User Settings", "Dashboard", "Product Details"
   * @aiUsage Primary heading that describes the current page/section context
   */
  title?: string;

  /**
   * Secondary text providing additional context
   * Appears below or inline with title based on subtitlePosition
   * Cannot be used without title or title-content slot
   * @example "Manage your account preferences", "Overview of system metrics"
   * @aiUsage Clarifying information that enhances the main title
   */
  subtitle?: string;

  /**
   * Header visual density - controls spacing and sizing
   * - STANDARD: Full spacing for standalone headers (default)
   * - CONDENSED: Reduced spacing when followed by tabs or filters
   * @default HeaderType.STANDARD
   * @aiSuggestions { "standalone": "STANDARD", "with-tabs": "CONDENSED", "with-filters": "CONDENSED" }
   */
  headerType?: HeaderType;

  /**
   * Subtitle layout positioning (desktop only)
   * - under: Subtitle appears on line below title (default)
   * - inline: Subtitle appears same line as title with spacing
   * @default "under"
   * @aiSuggestions { "long-subtitle": "under", "short-subtitle": "inline", "clean-layout": "under" }
   */
  subtitlePosition?: "under" | "inline";

  /**
   * Shows bottom border divider below header
   * Provides visual separation from content below
   * @default true
   * @aiUsage Disable when header flows into related content (tabs, filters)
   */
  showDivider?: boolean;

  /**
   * Breadcrumb-style back navigation link
   * Shows as text link on desktop, left arrow icon on mobile
   * Cannot be used with leftIconName properties (mutually exclusive)
   * @example "Back to Dashboard", "Return to Settings"
   * @aiUsage Navigation context for hierarchical page structures
   */
  backlink?: string;

  /**
   * Custom left-side icon name from neo-icon-kit
   * Cannot be used with backlink property (mutually exclusive)
   * @example "menu", "user", "settings", "arrow-left"
   * @aiRequired leftIconAriaRole and leftIconAltText when used
   * @aiSuggestions { "navigation": "menu", "back": "arrow-left", "user": "user", "close": "close" }
   */
  leftIconName?: string;

  /**
   * Accessible description for left icon action
   * Required when leftIconName is provided
   * @example "Open navigation menu", "Go back", "Close dialog"
   * @aiRequired When leftIconName is used
   * @aiUsage Describe what happens when icon is clicked, not what icon looks like
   */
  leftIconAltText?: string;

  /**
   * ARIA role for left icon interaction semantic
   * - button: Icon performs an action (menu, close, action)
   * - link: Icon navigates to another page/section
   * @aiRequired When leftIconName is used
   * @aiSuggestions { "menu": "button", "navigation": "link", "action": "button", "back": "link" }
   */
  leftIconAriaRole?: "button" | "link";

  /**
   * Custom right-side icon name from neo-icon-kit
   * Cannot be used with rightButtonLabel properties (mutually exclusive)
   * @example "more", "search", "settings", "close"
   * @aiRequired rightIconAriaRole and rightIconAltText when used
   * @aiSuggestions { "actions": "more", "search": "search", "settings": "settings", "close": "close" }
   */
  rightIconName?: string;

  /**
   * Accessible description for right icon action
   * Required when rightIconName is provided
   * @example "Show more options", "Open search", "Account settings"
   * @aiRequired When rightIconName is used
   * @aiUsage Describe the action performed, not the icon appearance
   */
  rightIconAltText?: string;

  /**
   * ARIA role for right icon interaction semantic
   * - button: Icon performs an action (menu, search, modal)
   * - link: Icon navigates to another page/section
   * @aiRequired When rightIconName is used
   * @aiSuggestions { "menu": "button", "search": "button", "settings": "link", "modal": "button" }
   */
  rightIconAriaRole?: "button" | "link";

  /**
   * Text for right-side button (desktop) that becomes icon on mobile
   * Cannot be used with rightIconName properties (mutually exclusive)
   * @example "Add New", "Save Changes", "Settings", "Help"
   * @aiRequired rightButtonIconName and rightButtonAriaRole when used
   * @aiUsage Primary action related to current page context
   */
  rightButtonLabel?: string;

  /**
   * Icon name for right button when displayed as icon on mobile
   * Required when rightButtonLabel is provided
   * @example "add-plus", "check", "settings", "help"
   * @aiRequired When rightButtonLabel is used
   * @aiUsage Icon should represent the same action as button text
   */
  rightButtonIconName?: string;

  /**
   * ARIA role for right button interaction semantic
   * - button: Button performs an action (save, add, process)
   * - link: Button navigates to another page/section
   * @aiRequired When rightButtonLabel is used
   * @aiSuggestions { "save": "button", "add": "button", "settings": "link", "help": "link" }
   */
  rightButtonAriaRole?: "button" | "link";
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common header patterns and best practices
 */
export const NckHeaderExamples = {
  /**
   * Basic page header - simple title only
   * @aiContext Simple pages, content areas, basic layouts
   */
  basic: `<nck-header title="Dashboard Overview" />`,

  /**
   * Header with subtitle - additional context
   * @aiContext Complex pages, detailed sections, explanatory content
   */
  withSubtitle: `<nck-header
    title="User Management"
    subtitle="Manage user accounts, permissions, and access controls"
    subtitlePosition="under" />`,

  /**
   * Navigation header - with back link
   * @aiContext Detail pages, sub-sections, hierarchical navigation
   */
  withBacklink: `<nck-header
    title="Profile Settings"
    backlink="Back to Dashboard"
    @page-header-backlink-clicked="navigateBack" />`,

  /**
   * Header with left menu - navigation control
   * @aiContext Mobile layouts, sidebar navigation, app headers
   */
  withLeftIcon: `<nck-header
    title="My Application"
    leftIconName="menu"
    leftIconAltText="Open navigation menu"
    leftIconAriaRole="button"
    @page-header-left-icon-clicked="toggleNavigation" />`,

  /**
   * Action header - with primary action button
   * @aiContext CRUD interfaces, management pages, form headers
   */
  withActionButton: `<nck-header
    title="Products"
    subtitle="Manage your product catalog"
    rightButtonLabel="Add Product"
    rightButtonIconName="add-plus"
    rightButtonAriaRole="button"
    @page-header-right-button-clicked="createProduct" />`,

  /**
   * Condensed header - for use with tabs/filters
   * @aiContext Tab layouts, filtered content, compact interfaces
   */
  condensedWithTabs: `<nck-header
    title="Analytics Dashboard"
    headerType="Condensed"
    :showDivider="false" />`,

  /**
   * Full navigation header - menu + actions
   * @aiContext App headers, comprehensive navigation, multi-action interfaces
   */
  fullNavigation: `<nck-header
    title="Project Management"
    subtitle="Plan, track, and deliver projects efficiently"
    leftIconName="menu"
    leftIconAltText="Main navigation"
    leftIconAriaRole="button"
    rightIconName="settings"
    rightIconAltText="Project settings"
    rightIconAriaRole="link"
    @page-header-left-icon-clicked="openMenu"
    @page-header-right-icon-clicked="openSettings" />`,

  /**
   * Modal header - with close action
   * @aiContext Modal dialogs, overlay content, focused workflows
   */
  modalHeader: `<nck-header
    title="Edit User Profile"
    rightIconName="close"
    rightIconAltText="Close dialog"
    rightIconAriaRole="button"
    :showDivider="false"
    @page-header-right-icon-clicked="closeModal" />`,

  /**
   * Complex header with custom content
   * @aiContext Advanced layouts, custom actions, specialized interfaces
   */
  withSlots: `<nck-header
    title="Data Analysis"
    leftIconName="arrow-left"
    leftIconAltText="Back to reports"
    leftIconAriaRole="link"
    @page-header-left-icon-clicked="navigateBack">

    <template #trailing-content>
      <nck-button
        label="Export"
        type="outline"
        leftIcon="download"
        @click="exportData" />
      <nck-button
        label="Share"
        type="outline"
        leftIcon="share"
        style="margin-left: 0.5rem"
        @click="shareReport" />
    </template>
  </nck-header>`,

  /**
   * Editable title header - dynamic content
   * @aiContext Content management, editable interfaces, admin panels
   */
  editableTitle: `<nck-header>
    <template #title-content>
      <div v-if="editingTitle" class="editable-title">
        <nck-text-input
          v-model="editedTitle"
          label="Page title" />
        <nck-button
          leftIcon="check"
          iconAltText="Save title"
          color="positive"
          @click="saveTitle" />
        <nck-button
          leftIcon="close"
          iconAltText="Cancel edit"
          @click="cancelEdit" />
      </div>
      <div v-else class="title-with-edit">
        <span>{{ pageTitle }}</span>
        <nck-button
          leftIcon="edit"
          iconAltText="Edit title"
          type="ghost"
          @click="startEditing" />
      </div>
    </template>
  </nck-header>`,
} as const;

/**
 * Header layout patterns for different interface types
 */
export const NckHeaderPatterns = {
  /**
   * Application shell header patterns
   */
  appShell: {
    mobile: {
      leftIcon: "menu",
      title: "App Name",
      rightIcon: "user", // or notification, search, etc.
    },
    desktop: {
      title: "Application Name",
      subtitle: "Current section or context",
      rightButton: "Primary Action",
    },
  },

  /**
   * Content page header patterns
   */
  contentPage: {
    list: {
      title: "Content Type (plural)",
      subtitle: "Description of content purpose",
      rightButton: "Add New",
    },
    detail: {
      backlink: "Back to [List]",
      title: "Item Name or Detail Title",
      rightButton: "Edit", // or "Delete", "Save", etc.
    },
    edit: {
      backlink: "Back to [Detail]",
      title: "Edit [Item Type]",
      rightButton: "Save Changes",
    },
  },

  /**
   * Modal dialog header patterns
   */
  modal: {
    standard: {
      title: "Modal Purpose",
      rightIcon: "close",
      showDivider: false,
    },
    wizard: {
      title: "Step Title",
      subtitle: "Step X of Y",
      leftIcon: "arrow-left", // for back navigation
      rightIcon: "close",
    },
  },

  /**
   * Dashboard header patterns
   */
  dashboard: {
    main: {
      title: "Dashboard",
      subtitle: "System overview and key metrics",
      rightButton: "Refresh Data",
    },
    section: {
      title: "Section Name",
      headerType: "Condensed",
      showDivider: false, // when followed by tabs or filters
    },
  },
} as const;

/**
 * AI guidance for header implementation and patterns
 */
export const NckHeaderAIGuidance = {
  /**
   * When to use headers vs other navigation components
   */
  usageDecisions: {
    useHeader: "Page-level navigation, primary page titles, app shells, modal headers",
    useBreadcrumbs: "Deep hierarchical navigation, file systems, complex site structures",
    useNavbar: "Horizontal navigation menus, top-level site navigation",
    useSidebar: "Secondary navigation, contextual menus, app navigation panels",
  },

  /**
   * Title and content guidelines
   */
  contentGuidance: {
    titles: {
      clarity: "Use clear, descriptive titles that indicate current page/section context",
      length: "Keep titles concise but descriptive (ideally 1-4 words)",
      hierarchy: "Ensure title hierarchy makes sense within overall page structure",
      consistency: "Maintain consistent title patterns across similar page types",
    },
    subtitles: {
      purpose: "Use subtitles to provide additional context, not duplicate title information",
      length: "Keep subtitles brief and focused (1-2 sentences maximum)",
      relevance: "Ensure subtitles add value and aren't just decorative",
    },
  },

  /**
   * Icon and action guidelines
   */
  iconActionGuidance: {
    leftSide: {
      navigation: "Use left icons for back navigation, menu toggles, or contextual actions",
      consistency: "Maintain consistent left icon usage patterns across the application",
      hierarchy: "Left icons should support navigation hierarchy (back, up, menu)",
    },
    rightSide: {
      actions: "Use right side for primary actions related to current page context",
      priority: "Right actions should be the most important action available",
      balance: "Don't overcrowd right side - consider trailing-content slot for multiple actions",
    },
  },

  /**
   * Responsive behavior patterns
   */
  responsivePatterns: {
    mobile: {
      buttonToIcon: "Right buttons automatically become icons on mobile",
      backlinkBehavior: "Backlinks show as text on desktop, icon on mobile",
      titleAlignment: "Titles center-align on mobile, left-align on desktop",
      spacing: "Condensed spacing automatically applied on smaller screens",
    },
    desktop: {
      fullLabels: "Show full button labels and backlink text",
      spacing: "Use standard or condensed spacing based on context",
      actions: "Consider more complex action layouts with trailing-content slot",
    },
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    required: [
      "Always provide iconAltText for icons that convey meaning",
      "Include appropriate ariaRole for all interactive icons",
      "Ensure title hierarchy is semantically correct (h1 for page titles)",
      "Provide meaningful alternative text that describes actions, not appearances",
    ],
    bestPractices: [
      "Use descriptive titles that provide context for screen reader users",
      "Ensure icon alternative text describes the action outcome",
      "Test keyboard navigation through all header interactive elements",
      "Consider how header content flows for screen reader users",
    ],
  },

  /**
   * Layout and spacing guidelines
   */
  layoutGuidance: {
    spacing: {
      standard: "Use for standalone headers or when followed by unrelated content",
      condensed: "Use when immediately followed by tabs, filters, or related navigation",
      divider: "Show divider by default, hide when header flows into related content",
    },
    alignment: {
      title: "Titles left-align on desktop, center on mobile automatically",
      actions: "Right-side actions align to edge, left-side actions align to content",
    },
  },

  /**
   * Integration patterns with other components
   */
  integrationPatterns: {
    withTabs: "Use condensed header type and hide divider for seamless integration",
    withBreadcrumbs: "Place breadcrumbs below header, use backlink for immediate parent",
    withSearch: "Consider search in trailing-content slot or as right icon action",
    withFilters: "Use condensed header when filters appear directly below",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    mutuallyExclusive: "Don't use backlink with leftIconName, or rightButton with rightIconName",
    missingRequiredProps: "Always provide altText and ariaRole when using icons",
    poorAltText: "Avoid generic alt text like 'icon' or 'button' - be descriptive",
    inconsistentHierarchy: "Don't use subtitle without title or title-content",
    wrongHeaderType: "Don't use condensed headers when content isn't immediately following",
  },
} as const;

import { TabsType } from "../../constants/tabsType";
import { ITabOptions } from "../../models/iTabOptions";

/**
 * Interface for nck-tabs component props
 * Comprehensive tabs component for organizing content into sections with navigation
 *
 * @aiUsage Primary component for content organization - supports overflow handling, icons, and counters
 * @aiCategory navigation
 * @aiComplexity medium
 */
export interface INckTabs {
  /**
   * Visual style of the tabs component
   * - UniformFull: Equal width tabs across full container (max 4 tabs recommended)
   * - Compact: Content-based width tabs with overflow menu handling
   * - CompactSide: Compact tabs with side alignment and overflow menu
   * @aiRequired true
   * @aiSuggestions { "main-navigation": "UniformFull", "content-sections": "Compact", "sidebar-tabs": "CompactSide" }
   */
  type: TabsType;

  /**
   * Makes tab content scrollable within its container
   * Use when tabs take most of the page height and you want sticky tab headers
   * @default false
   * @aiUsage Enable for full-page tab layouts, dashboard sections
   */
  scrollableContent?: boolean;

  /**
   * Hides the bottom border divider line under tabs
   * Use for custom styling or when tabs are in containers with borders
   * @default false
   * @aiUsage Use for cleaner look in cards or custom layouts
   */
  hideDivider?: boolean;

  /**
   * Index of tab to select initially (0-based)
   * Updates selected tab when value changes
   * Note: This is one-way binding - doesn't update with user selection
   * @example 0 (first tab), 2 (third tab)
   * @aiUsage Use to set default active tab or programmatically switch tabs
   */
  preselectedTabIndex?: number;
}

/**
 * Individual tab configuration options
 * Used within nck-tab sub-components or programmatic tab definitions
 */
export interface INckTabOptions extends ITabOptions {
  /**
   * Tab display text - the main label users will see
   * @example "Overview", "Settings", "User Profile"
   * @aiRequired true
   */
  heading: string;

  /**
   * Icon name from neo-icon-kit displayed before the tab text
   * Use semantic icons that reinforce the tab content meaning
   * @example "dashboard", "settings", "user", "chart"
   * @aiSuggestions { "overview": "dashboard", "settings": "settings", "users": "account", "reports": "chart" }
   */
  leadingIcon?: string;

  /**
   * Icon name from neo-icon-kit displayed after the tab text
   * Commonly used for external links, dropdown indicators, or status
   * @example "external-link", "chevron-down", "info"
   */
  trailingIcon?: string;

  /**
   * Counter value displayed after tab text (as badge)
   * Use for notification counts, item counts, unread indicators
   * @example "3", "99+", "New"
   * @aiUsage Use for counts, notifications, status indicators
   */
  trailingCounterValue?: string;

  /**
   * Click handler function called when tab is clicked
   * Use for additional logic beyond content switching
   * @param tabIndex - Index of clicked tab
   * @param tabData - Tab configuration data
   * @aiUsage Use for analytics, validation, or side effects on tab change
   */
  clickCallback?: (tabIndex?: number, tabData?: ITabOptions) => void;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common tab patterns and best practices
 */
export const NckTabsExamples = {
  /**
   * Basic uniform tabs - equal width navigation
   * @aiContext Main navigation, primary content sections
   */
  uniform: `<nck-tabs type="UniformFull">
    <nck-tab heading="Overview">
      <div class="tab-content">
        <h2>Overview Content</h2>
        <p>Main dashboard content...</p>
      </div>
    </nck-tab>

    <nck-tab heading="Analytics">
      <div class="tab-content">
        <h2>Analytics</h2>
        <p>Charts and metrics...</p>
      </div>
    </nck-tab>

    <nck-tab heading="Settings">
      <div class="tab-content">
        <h2>Settings</h2>
        <p>Configuration options...</p>
      </div>
    </nck-tab>
  </nck-tabs>`,

  /**
   * Compact tabs with icons and counters
   * @aiContext Content organization with status indicators
   */
  compactWithIcons: `<nck-tabs type="Compact">
    <nck-tab
      heading="Messages"
      leadingIcon="message"
      trailingCounterValue="3">
      <div class="messages-content">
        <h2>Messages</h2>
        <p>3 unread messages...</p>
      </div>
    </nck-tab>

    <nck-tab
      heading="Notifications"
      leadingIcon="bell"
      trailingCounterValue="12">
      <div class="notifications-content">
        <h2>Notifications</h2>
        <p>12 new notifications...</p>
      </div>
    </nck-tab>

    <nck-tab
      heading="Profile"
      leadingIcon="account">
      <div class="profile-content">
        <h2>User Profile</h2>
        <p>Profile information...</p>
      </div>
    </nck-tab>
  </nck-tabs>`,

  /**
   * Tabs with preselected active tab
   * @aiContext Default to specific content section
   */
  preselected: `<nck-tabs
    type="Compact"
    :preselectedTabIndex="1">
    <nck-tab heading="General">
      <p>General settings content...</p>
    </nck-tab>

    <nck-tab heading="Advanced">
      <p>Advanced settings content (selected by default)...</p>
    </nck-tab>

    <nck-tab heading="Security">
      <p>Security settings content...</p>
    </nck-tab>
  </nck-tabs>`,

  /**
   * Scrollable content tabs for full-page layouts
   * @aiContext Dashboard sections, application main areas
   */
  scrollableContent: `<nck-tabs
    type="UniformFull"
    :scrollableContent="true">
    <nck-tab heading="Dashboard" leadingIcon="dashboard">
      <div class="dashboard-content">
        <!-- Long scrollable content -->
        <div v-for="widget in dashboardWidgets" :key="widget.id">
          <nck-card>{{ widget.content }}</nck-card>
        </div>
      </div>
    </nck-tab>

    <nck-tab heading="Reports" leadingIcon="chart">
      <div class="reports-content">
        <!-- Scrollable reports content -->
        <nck-table :data="reportData" />
      </div>
    </nck-tab>
  </nck-tabs>`,

  /**
   * Tabs with click handlers for additional logic
   * @aiContext Analytics tracking, validation, side effects
   */
  withClickHandlers: `<nck-tabs type="Compact">
    <nck-tab
      heading="Users"
      @click="trackTabView('users')">
      <div class="users-content">
        <nck-table :data="users" />
      </div>
    </nck-tab>

    <nck-tab
      heading="Settings"
      @click="validateChanges">
      <div class="settings-content">
        <nck-form>
          <!-- Form content -->
        </nck-form>
      </div>
    </nck-tab>
  </nck-tabs>`,

  /**
   * Compact side tabs for sidebar layouts
   * @aiContext Sidebar navigation, secondary content organization
   */
  compactSide: `<nck-tabs type="CompactSide">
    <nck-tab heading="Quick Actions" leadingIcon="lightning">
      <div class="quick-actions">
        <nck-button label="Create New" type="filled" />
        <nck-button label="Import Data" type="outline" />
      </div>
    </nck-tab>

    <nck-tab heading="Recent Items" leadingIcon="clock">
      <div class="recent-items">
        <nck-list :items="recentItems" />
      </div>
    </nck-tab>
  </nck-tabs>`,

  /**
   * Tabs without divider for custom styling
   * @aiContext Clean layouts, custom borders, card containers
   */
  noDivider: `<nck-tabs
    type="Compact"
    :hideDivider="true">
    <nck-tab heading="Content">
      <p>Content without bottom border...</p>
    </nck-tab>

    <nck-tab heading="Media">
      <p>Media content...</p>
    </nck-tab>
  </nck-tabs>`,
} as const;

/**
 * AI guidance for tabs implementation and patterns
 */
export const NckTabsAIGuidance = {
  /**
   * When to use each tab type
   */
  typeUsage: {
    UniformFull: "Main navigation, primary content sections (max 4 tabs for mobile compatibility)",
    Compact: "Content organization with dynamic widths, handles overflow with 'more' menu",
    CompactSide: "Sidebar or secondary navigation, aligned to one side",
  },

  /**
   * Content organization best practices
   */
  contentOrganization: {
    relatedContent: "Group logically related content together in single tab",
    contentLength: "Use scrollableContent for long content that should scroll while keeping tabs visible",
    tabLabels: "Use clear, descriptive headings that indicate content purpose",
    iconUsage: "Use leadingIcons to reinforce content meaning and improve recognition",
  },

  /**
   * Accessibility considerations
   */
  accessibility: {
    keyboardNavigation: "Tabs automatically support arrow key navigation between tab headers",
    screenReaderSupport: "Tab headers are properly announced with ARIA attributes",
    focusManagement: "Focus moves appropriately between tabs and content areas",
    semanticStructure: "Use proper heading hierarchy within tab content",
  },

  /**
   * Performance and UX considerations
   */
  performance: {
    lazyLoading: "Consider lazy loading tab content for performance with heavy content",
    contentSwitching: "Tab content switching is handled automatically with proper cleanup",
    overflowHandling: "Compact types automatically handle overflow with 'more' menu on small screens",
    mobileOptimization: "UniformFull type respects mobile viewport limitations",
  },

  /**
   * Common usage patterns
   */
  usagePatterns: {
    dashboard: "Use UniformFull with scrollableContent for main dashboard sections",
    settings: "Use Compact for settings categories with descriptive labels",
    dataViews: "Use Compact with counters to show data counts in each section",
    sidebar: "Use CompactSide for secondary navigation in sidebar layouts",
    notifications: "Use trailingCounterValue to show unread counts or status indicators",
  },

  /**
   * Icon and counter guidelines
   */
  iconGuidance: {
    leadingIcons: "Use semantic icons that match content (dashboard, settings, user, chart)",
    trailingIcons: "Use sparingly for special indicators (external-link, dropdown)",
    counters: "Show notification counts, unread items, or status counts",
    consistency: "Maintain consistent icon style across all tabs in a set",
  },

  /**
   * Responsive design considerations
   */
  responsiveDesign: {
    UniformFull: "Limited to 4 tabs for mobile compatibility, equal width distribution",
    Compact: "Automatically creates 'more' menu for overflow tabs on small screens",
    mobileFirst: "Consider starting with Compact type for better mobile experience",
    contentAdaptation: "Use scrollableContent for mobile-friendly long content",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    tooManyUniformTabs: "Don't use >4 tabs with UniformFull type (mobile overflow)",
    inconsistentContent: "Don't mix unrelated content types within single tab",
    missingHeadings: "Don't forget descriptive tab headings - required for accessibility",
    overuseCounters: "Don't use trailingCounterValue for non-count information",
    nestedTabs: "Avoid nesting tabs within tabs - creates confusing navigation",
  },
} as const;

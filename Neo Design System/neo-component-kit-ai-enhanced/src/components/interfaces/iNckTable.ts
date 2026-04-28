import { ITableColumnOptions } from "../../models/iTableColumnOption";
import { SortOrder } from "../../constants/sortOrder";

/**
 * Interface for nck-table component props
 * Comprehensive data table component with sorting, selection, accessibility, and responsive features
 *
 * @aiUsage Primary component for displaying structured data with sorting, filtering, and selection capabilities
 * @aiCategory data-display
 * @aiComplexity complex
 */
export interface INckTable {
  /**
   * Column configuration array - defines table structure and behavior
   * Each column object contains: headerLabel, dataPath/slotName, width, alignment, sorting
   * @example [{ headerLabel: "Name", dataPath: "user.name", width: "30%" }]
   * @aiRequired true - Must have at least one column
   */
  columnsDescription: ITableColumnOptions[];

  /**
   * Array of data objects to display in table rows
   * Each object represents one row of data
   * @example [{ id: 1, name: "John", email: "john@example.com" }]
   * @aiRequired true - Table data source
   */
  data: Array<Record<string, any>>;

  /**
   * Property key used for unique row identification (for v-key performance)
   * Must be unique across all data entries
   * @example "id", "userId", "uuid"
   * @aiRequired true - Essential for Vue performance and selection tracking
   * @aiSuggestions { "database": "id", "user": "userId", "uuid": "uuid" }
   */
  rowUniqueKey: string;

  /**
   * Accessible label for the table - describes table purpose
   * Required if labeledByTitleId is not provided
   * @example "User management table", "Product inventory", "Order history"
   * @aiUsage Provide clear description of table contents for screen readers
   */
  ariaLabel?: string;

  /**
   * ID of external title element that labels the table
   * Takes precedence over ariaLabel if both provided
   * @example "users-table-title", "products-heading"
   * @aiUsage Use when table has a visible heading element
   */
  labeledByTitleId?: string;

  /**
   * ARIA role for clickable rows - defines row interaction semantic
   * Only required when rows are clickable (row-clicked listener exists)
   * - button: Row performs an action when clicked
   * - link: Row navigates to another page/section
   * @aiRequired When row-clicked event listener is provided
   * @aiSuggestions { "action": "button", "navigation": "link", "details": "button" }
   */
  rowAriaRole?: "button" | "link";

  /**
   * Enables row selection with checkboxes
   * When true, adds selection column and enables multi-selection functionality
   * @default false
   * @aiUsage Use for bulk operations, data management interfaces
   */
  multiSelect?: boolean;

  /**
   * Accessible label for header "select all" checkbox when unchecked
   * Required when multiSelect is enabled
   * @example "Select all rows", "Select all users"
   * @aiRequired When multiSelect is true
   */
  selectAllLabel?: string;

  /**
   * Accessible label for header "select all" checkbox when checked
   * Required when multiSelect is enabled
   * @example "Unselect all rows", "Deselect all users"
   * @aiRequired When multiSelect is true
   */
  unselectAllLabel?: string;

  /**
   * Function to generate accessible label for each row's selection checkbox
   * Required when multiSelect is enabled
   * @param entry - Row data object
   * @param selected - Current selection state of the row
   * @returns Accessible label string
   * @example (entry, selected) => `${selected ? 'Deselect' : 'Select'} user ${entry.name}`
   * @aiRequired When multiSelect is true
   */
  getLabelForRowSelection?: (entry: Record<string, any>, selected: boolean) => string;

  /**
   * Determines which rows cannot be selected in multiSelect mode
   * Can be property name (string) or function returning boolean
   * @example "isDisabled" or (row) => row.status === 'locked'
   * @aiUsage Use to disable selection for specific rows based on business logic
   */
  notSelectableSource?: string | ((entry: Record<string, any>) => boolean);

  /**
   * Enables horizontal scrolling for table content
   * Useful for tables with many columns or responsive layouts
   * @default false
   * @aiUsage Use for wide tables or mobile-responsive designs
   */
  scrollableContent?: boolean;

  /**
   * Column index to show as initially sorted (0-based)
   * Must correspond to a sortable column (has onSort function)
   * @example 0 (first column), 2 (third column)
   * @aiUsage Use to show default sort state on table load
   */
  initiallySortedColumnIndex?: number;

  /**
   * Sort order to display on initially sorted column
   * Must be used with initiallySortedColumnIndex
   * @aiUsage Use to indicate current sort direction on initial load
   */
  initiallySortedColumnSortOrder?: SortOrder;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common table patterns and best practices
 */
export const NckTableExamples = {
  /**
   * Basic data table - simple data display
   * @aiContext Product lists, user directories, simple data display
   */
  basic: `<nck-table
    :columnsDescription="columns"
    :data="tableData"
    rowUniqueKey="id"
    ariaLabel="Users table">
  </nck-table>`,

  /**
   * Sortable table with click handling
   * @aiContext Interactive data management, detailed views
   */
  sortableClickable: `<nck-table
    :columnsDescription="sortableColumns"
    :data="users"
    rowUniqueKey="userId"
    rowAriaRole="button"
    ariaLabel="User management table"
    @row-clicked="handleRowClick">
  </nck-table>`,

  /**
   * Multi-select table for bulk operations
   * @aiContext Data management, bulk actions, selection workflows
   */
  multiSelect: `<nck-table
    :columnsDescription="columns"
    :data="products"
    rowUniqueKey="productId"
    :multiSelect="true"
    selectAllLabel="Select all products"
    unselectAllLabel="Deselect all products"
    :getLabelForRowSelection="(product, selected) =>
      \`\${selected ? 'Deselect' : 'Select'} product \${product.name}\`"
    @selection-changed="handleSelectionChange">

    <template #action-bar>
      <div class="table-actions">
        <nck-button label="Delete Selected" color="negative" />
        <nck-button label="Export Selected" type="outline" />
      </div>
    </template>
  </nck-table>`,

  /**
   * Responsive scrollable table
   * @aiContext Mobile interfaces, wide data tables
   */
  responsive: `<nck-table
    :columnsDescription="wideColumns"
    :data="detailedData"
    rowUniqueKey="id"
    :scrollableContent="true"
    ariaLabel="Detailed data table">
  </nck-table>`,

  /**
   * Table with custom column slots
   * @aiContext Rich content display, action columns, custom formatting
   */
  withSlots: `<nck-table
    :columnsDescription="columnsWithSlots"
    :data="orders"
    rowUniqueKey="orderId"
    ariaLabel="Order management table">

    <template #status="{ entry }">
      <nck-badge
        :label="entry.status"
        :type="getStatusBadgeType(entry.status)" />
    </template>

    <template #actions="{ entry }">
      <nck-button
        label="View"
        type="outline"
        size="s"
        @click="viewOrder(entry)" />
      <nck-button
        label="Edit"
        type="outline"
        size="s"
        @click="editOrder(entry)" />
    </template>
  </nck-table>`,

  /**
   * Initially sorted table
   * @aiContext Default sorted views, pre-configured data display
   */
  initiallySorted: `<nck-table
    :columnsDescription="sortableColumns"
    :data="sortedData"
    rowUniqueKey="id"
    :initiallySortedColumnIndex="1"
    :initiallySortedColumnSortOrder="SortOrder.DESCENDING"
    ariaLabel="Pre-sorted data table">
  </nck-table>`,
} as const;

/**
 * Column configuration examples for common scenarios
 */
export const NckTableColumnExamples = {
  /**
   * Basic text columns with data path
   */
  basicColumns: `[
    { headerLabel: "Name", dataPath: "user.name", width: "30%" },
    { headerLabel: "Email", dataPath: "user.email", width: "40%" },
    { headerLabel: "Role", dataPath: "role", width: "30%" }
  ]`,

  /**
   * Sortable columns with sort handlers
   */
  sortableColumns: `[
    {
      headerLabel: "Name",
      dataPath: "name",
      width: "40%",
      onSort: async (sortOrder) => {
        await sortDataByName(sortOrder);
      }
    },
    {
      headerLabel: "Created Date",
      dataPath: "createdAt",
      width: "30%",
      headerAlignment: "center",
      rowAlignment: "center",
      onSort: async (sortOrder) => {
        await sortDataByDate(sortOrder);
      }
    }
  ]`,

  /**
   * Columns with custom slots for rich content
   */
  slotColumns: `[
    { headerLabel: "Product", dataPath: "name", width: "30%" },
    { headerLabel: "Status", slotName: "status", width: "20%" },
    { headerLabel: "Price", dataPath: "price", width: "20%", headerAlignment: "right", rowAlignment: "right" },
    { headerLabel: "Actions", slotName: "actions", width: "30%" }
  ]`,

  /**
   * Mixed columns with alignment and formatting
   */
  alignedColumns: `[
    { headerLabel: "Product Name", dataPath: "name", width: "40%" },
    {
      headerLabel: "Quantity",
      dataPath: "quantity",
      width: "20%",
      headerAlignment: "center",
      rowAlignment: "center"
    },
    {
      headerLabel: "Price",
      dataPath: "formattedPrice",
      width: "20%",
      headerAlignment: "right",
      rowAlignment: "right"
    },
    { headerLabel: "Actions", slotName: "actions", width: "20%" }
  ]`,
} as const;

/**
 * AI guidance for table implementation and patterns
 */
export const NckTableAIGuidance = {
  /**
   * When to use tables vs other components
   */
  usageDecisions: {
    useTable: "Structured data with multiple columns, comparison needed, sorting/filtering required",
    useList: "Simple item display, single primary property, mobile-first design",
    useCards: "Rich content display, visual emphasis, mixed content types",
  },

  /**
   * Column configuration best practices
   */
  columnConfiguration: {
    widthAllocation: "Use percentages for responsive design, ensure total doesn't exceed 100%",
    dataPath: "Use for simple property access (user.name, product.price)",
    slotName: "Use for complex content (badges, buttons, formatted data, custom components)",
    alignment: "Right-align numbers/currency, center-align short status text, left-align text content",
    sorting: "Implement server-side sorting for large datasets, client-side for <1000 rows",
  },

  /**
   * Accessibility requirements
   */
  accessibility: {
    required: [
      "Provide ariaLabel or labeledByTitleId for table purpose",
      "Include rowAriaRole when rows are clickable",
      "Supply all multiSelect label functions when enabling selection",
      "Ensure column headers are descriptive and clear",
    ],
    bestPractices: [
      "Use semantic column headers that describe data type",
      "Provide context in selection labels (e.g., 'Select user John Doe')",
      "Announce sort changes to screen readers",
      "Maintain focus management for keyboard navigation",
    ],
  },

  /**
   * Performance considerations
   */
  performance: {
    largeDatasets: "Use pagination with nck-pagination component for >100 rows",
    sorting: "Implement async onSort handlers to prevent UI blocking",
    rowUniqueKey: "Choose efficient unique keys (avoid complex computed properties)",
    reactivity: "Use shallowRef for large data arrays to optimize rendering",
  },

  /**
   * Common patterns and use cases
   */
  patterns: {
    dataManagement: "Multi-select tables with action bar for bulk operations",
    reporting: "Sortable tables with initially sorted columns for default views",
    masterDetail: "Clickable rows that navigate to detail views (use rowAriaRole='link')",
    actionTables: "Tables with action columns using slots for buttons",
    responsiveTables: "Use scrollableContent for mobile-friendly wide tables",
  },

  /**
   * Selection and interaction patterns
   */
  selectionPatterns: {
    singleAction: "Use row clicks for primary action (view details, edit)",
    bulkOperations: "Enable multiSelect for delete, export, status changes",
    disabledRows: "Use notSelectableSource to prevent selection of locked/processed items",
    actionBar: "Show contextual actions in action-bar slot when items selected",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    missingRowKey: "Don't forget rowUniqueKey - causes performance issues and selection bugs",
    asyncSortingWithoutHandling: "Don't use onSort without proper loading states",
    missingAccessibilityLabels: "Don't enable multiSelect without proper label functions",
    overuseSlots: "Don't use slots for simple text content - use dataPath instead",
    widthOverallocation: "Don't set column widths that total > 100%",
  },
} as const;

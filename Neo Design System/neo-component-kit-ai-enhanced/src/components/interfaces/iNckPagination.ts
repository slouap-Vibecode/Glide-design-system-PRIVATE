import { MenuPosition } from "../../constants/menuPosition";

/**
 * Interface for nck-pagination component props
 * Navigation component for large datasets with page-based browsing and items-per-page control
 *
 * @aiUsage Essential component for data tables and large lists - handles pagination logic and accessibility
 * @aiCategory navigation
 * @aiComplexity complex
 */
export interface INckPagination {
  /**
   * Total count of items across all pages
   * Must be a positive integer representing the complete dataset size
   * @example 1000, 500, 25
   * @aiRequired true
   * @aiValidation Must be > 0 and integer
   */
  totalNumberOfItems: number;

  /**
   * Number of items to display on each page
   * Must be a positive integer that divides the total items into pages
   * @example 10, 25, 50, 100
   * @aiRequired true
   * @aiValidation Must be > 0 and integer
   * @aiSuggestions { "table": "25", "list": "10", "grid": "12", "large-dataset": "50" }
   */
  numberOfItemsPerPage: number;

  /**
   * Current active page number (1-based indexing)
   * Must be between 1 and total number of pages
   * @example 1, 5, 10
   * @default 1
   * @aiUsage Use 1-based indexing (first page = 1, not 0)
   * @aiValidation Must be > 0, integer, and ≤ totalPages
   */
  currentPage?: number;

  /**
   * Footer text template for displaying page range information
   * Supports template variables: {min}, {max}, {total}
   * Uses translateAndFormat function for internationalization
   * @example "Showing {min}-{max} of {total} items", "Items {min} to {max} of {total}"
   * @aiRequired true
   * @aiUsage Provide clear context about current page range and total count
   */
  footerWording: string;

  /**
   * Page number aria-label template for accessibility
   * Supports template variables: {pageNumber}
   * Uses translateAndFormat function for screen reader announcements
   * @example "Go to page {pageNumber}", "Page {pageNumber}"
   * @aiRequired true
   * @aiUsage Essential for screen reader navigation context
   */
  pageNumberWording: string;

  /**
   * Available page size options for items-per-page dropdown
   * When provided, adds dropdown for dynamic page size changes
   * @example [10, 25, 50, 100], [5, 10, 20]
   * @default []
   * @aiUsage Use progressive values that make sense for your data volume
   */
  withItemsPerPageDropdown?: number[];

  /**
   * Label for the items-per-page dropdown
   * Required when withItemsPerPageDropdown is provided
   * @example "Items per page", "Results per page", "Rows per page"
   * @aiRequired When withItemsPerPageDropdown is used
   */
  withItemsPerPageLabel?: string;

  /**
   * Menu position for the items-per-page dropdown
   * Controls where the dropdown menu appears relative to the trigger
   * @aiSuggestions { "default": "TOP_LEFT", "constrained-space": "TOP_RIGHT", "above-content": "BOTTOM_LEFT" }
   */
  withItemsMenuPosition?: MenuPosition;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common pagination patterns and best practices
 */
export const NckPaginationExamples = {
  /**
   * Basic pagination - simple page navigation
   * @aiContext Data tables, search results, product listings
   */
  basic: `<nck-pagination
    :totalNumberOfItems="500"
    :numberOfItemsPerPage="25"
    :currentPage="currentPage"
    footerWording="Showing {min}-{max} of {total} items"
    pageNumberWording="Go to page {pageNumber}"
    @page-changed="handlePageChange" />`,

  /**
   * Pagination with dynamic page size - user-controlled page size
   * @aiContext Large datasets, user preference interfaces, admin tables
   */
  withPageSize: `<nck-pagination
    :totalNumberOfItems="1000"
    v-model:numberOfItemsPerPage="pageSize"
    :currentPage="currentPage"
    footerWording="Displaying {min}-{max} of {total} results"
    pageNumberWording="Navigate to page {pageNumber}"
    :withItemsPerPageDropdown="[10, 25, 50, 100]"
    withItemsPerPageLabel="Results per page"
    :withItemsMenuPosition="MenuPosition.TOP_LEFT"
    @page-changed="handlePageChange"
    @update:numberOfItemsPerPage="handlePageSizeChange" />`,

  /**
   * Table pagination integration - with data loading
   * @aiContext Data tables, management interfaces, filtered results
   */
  tableIntegration: `<div class="data-container">
    <nck-table
      :data="tableData"
      :columnsDescription="columns"
      rowUniqueKey="id"
      ariaLabel="User data table" />

    <nck-pagination
      :totalNumberOfItems="totalUsers"
      :numberOfItemsPerPage="usersPerPage"
      :currentPage="currentUserPage"
      footerWording="Showing {min}-{max} of {total} users"
      pageNumberWording="View page {pageNumber} of users"
      :withItemsPerPageDropdown="[10, 25, 50]"
      withItemsPerPageLabel="Users per page"
      @page-changed="loadUsersPage"
      @update:numberOfItemsPerPage="updateUsersPageSize" />
  </div>`,

  /**
   * Search results pagination - with result context
   * @aiContext Search interfaces, filtering systems, product catalogs
   */
  searchResults: `<div class="search-results">
    <div class="results-grid">
      <div v-for="item in searchResults" :key="item.id" class="result-item">
        <!-- Search result content -->
      </div>
    </div>

    <nck-pagination
      :totalNumberOfItems="totalResults"
      :numberOfItemsPerPage="resultsPerPage"
      :currentPage="currentResultPage"
      footerWording="Results {min}-{max} of {total} found"
      pageNumberWording="View page {pageNumber} of search results"
      :withItemsPerPageDropdown="[12, 24, 48]"
      withItemsPerPageLabel="Results per page"
      :withItemsMenuPosition="MenuPosition.TOP_RIGHT"
      @page-changed="searchPage"
      @update:numberOfItemsPerPage="updateResultsPageSize" />
  </div>`,

  /**
   * Small dataset pagination - minimal configuration
   * @aiContext Small lists, simple browsing, focused content
   */
  small: `<nck-pagination
    :totalNumberOfItems="50"
    :numberOfItemsPerPage="10"
    :currentPage="page"
    footerWording="{min}-{max} of {total}"
    pageNumberWording="Page {pageNumber}"
    @page-changed="changePage" />`,

  /**
   * Large dataset pagination - with progressive page sizes
   * @aiContext Analytics interfaces, big data browsing, enterprise tables
   */
  largeDataset: `<nck-pagination
    :totalNumberOfItems="50000"
    v-model:numberOfItemsPerPage="itemsPerPage"
    :currentPage="currentPage"
    footerWording="Records {min} to {max} of {total} total"
    pageNumberWording="Navigate to page {pageNumber}"
    :withItemsPerPageDropdown="[25, 50, 100, 200]"
    withItemsPerPageLabel="Records per page"
    :withItemsMenuPosition="MenuPosition.TOP_LEFT"
    @page-changed="loadDataPage"
    @update:numberOfItemsPerPage="adjustPageSize" />`,

  /**
   * Mobile-optimized pagination - responsive design
   * @aiContext Mobile interfaces, responsive tables, touch-friendly navigation
   */
  mobileOptimized: `<nck-pagination
    :totalNumberOfItems="itemCount"
    :numberOfItemsPerPage="isMobile ? 5 : 20"
    :currentPage="page"
    footerWording="Items {min}-{max} of {total}"
    pageNumberWording="Page {pageNumber}"
    :withItemsPerPageDropdown="isMobile ? [5, 10] : [10, 20, 50]"
    :withItemsPerPageLabel="isMobile ? 'Per page' : 'Items per page'"
    @page-changed="handlePageChange"
    @update:numberOfItemsPerPage="handlePageSizeChange" />`,
} as const;

/**
 * Pagination calculation utilities for AI-assisted development
 */
export const NckPaginationCalculators = {
  /**
   * Calculate total number of pages from items and page size
   * @param totalItems Total number of items in dataset
   * @param itemsPerPage Number of items to show per page
   * @returns Total number of pages needed
   */
  calculateTotalPages: (totalItems: number, itemsPerPage: number): number => {
    return Math.ceil(totalItems / itemsPerPage);
  },

  /**
   * Calculate the range of items shown on a specific page
   * @param page Page number (1-based)
   * @param itemsPerPage Number of items per page
   * @param totalItems Total number of items
   * @returns Object with min, max, and total for footer display
   */
  calculatePageRange: (page: number, itemsPerPage: number, totalItems: number) => {
    const min = (page - 1) * itemsPerPage + 1;
    const max = Math.min(page * itemsPerPage, totalItems);
    return { min, max, total: totalItems };
  },

  /**
   * Validate page number is within valid range
   * @param page Page number to validate
   * @param totalItems Total number of items
   * @param itemsPerPage Number of items per page
   * @returns Whether page number is valid
   */
  isValidPage: (page: number, totalItems: number, itemsPerPage: number): boolean => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return page >= 1 && page <= totalPages && Number.isInteger(page);
  },
};

/**
 * Common pagination configuration patterns
 */
export const NckPaginationPatterns = {
  /**
   * Standard table pagination settings
   */
  table: {
    defaultPageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    footerTemplate: "Showing {min}-{max} of {total} entries",
    pageNumberTemplate: "Go to page {pageNumber}",
  },

  /**
   * Search results pagination settings
   */
  search: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50],
    footerTemplate: "Results {min}-{max} of {total} found",
    pageNumberTemplate: "View page {pageNumber} of results",
  },

  /**
   * Product grid pagination settings
   */
  productGrid: {
    defaultPageSize: 12,
    pageSizeOptions: [12, 24, 48],
    footerTemplate: "Products {min}-{max} of {total}",
    pageNumberTemplate: "Browse page {pageNumber}",
  },

  /**
   * User list pagination settings
   */
  userList: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
    footerTemplate: "Users {min}-{max} of {total}",
    pageNumberTemplate: "View page {pageNumber} of users",
  },

  /**
   * Mobile-friendly pagination settings
   */
  mobile: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20],
    footerTemplate: "{min}-{max} of {total}",
    pageNumberTemplate: "Page {pageNumber}",
  },
} as const;

/**
 * AI guidance for pagination implementation and patterns
 */
export const NckPaginationAIGuidance = {
  /**
   * When to use pagination vs other navigation patterns
   */
  usageDecisions: {
    usePagination: "Large datasets (>100 items), tabular data, search results, sequential browsing",
    useInfiniteScroll: "Social feeds, image galleries, continuous content consumption",
    useLoadMore: "Medium datasets (20-100 items), mobile-first interfaces, casual browsing",
    useVirtualization: "Very large datasets (>10k items), performance-critical interfaces",
  },

  /**
   * Page size selection guidelines
   */
  pageSizeGuidance: {
    small: "5-10 items: Mobile interfaces, detailed content, focused browsing",
    medium: "10-25 items: Standard tables, balanced performance and UX",
    large: "25-50 items: Power users, fast browsing, high-performance contexts",
    enterprise: "50-200 items: Data analysis, bulk operations, expert interfaces",
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    required: [
      "Provide meaningful footerWording and pageNumberWording templates",
      "Ensure current page is clearly announced to screen readers",
      "Use proper ARIA navigation role (automatically handled)",
      "Maintain focus management when page changes",
    ],
    bestPractices: [
      "Use descriptive wording that provides context (not just numbers)",
      "Consider screen reader flow when page content changes",
      "Provide clear indication of current page in template text",
      "Test keyboard navigation through page numbers",
    ],
  },

  /**
   * Performance considerations
   */
  performance: {
    serverSide: "Implement server-side pagination for datasets >1000 items",
    clientSide: "Use client-side pagination for <100 items or cached data",
    caching: "Cache previous pages to improve navigation performance",
    loading: "Show loading states during page transitions",
    prefetching: "Consider prefetching adjacent pages for smooth UX",
  },

  /**
   * UX patterns and behaviors
   */
  userExperience: {
    pageNumbers: {
      showFirst: "Always show page 1 for quick access to beginning",
      showLast: "Always show last page for quick access to end",
      ellipsis: "Use ellipsis (...) to indicate skipped pages",
      currentPage: "Highlight current page clearly with distinct styling",
    },
    controls: {
      previousNext: "Always include previous/next arrows for sequential navigation",
      pageJump: "Allow direct page number clicking for random access",
      pageSize: "Offer page size options for user control over data density",
    },
  },

  /**
   * Integration patterns with other components
   */
  integrationPatterns: {
    withTables: "Place pagination below tables, manage loading states during page changes",
    withSearch: "Reset to page 1 when search criteria change",
    withFilters: "Reset to page 1 when filters are applied",
    withSorting: "Maintain current page when sorting changes",
    withSelection: "Consider how selection state behaves across page changes",
  },

  /**
   * Focus management guidelines
   */
  focusManagement: {
    pageChange: "Move focus to beginning of new content after page change",
    loading: "Announce loading state to screen readers",
    errors: "Handle invalid page numbers gracefully with user feedback",
    persistence: "Maintain focus on pagination after page size changes",
  },

  /**
   * Common implementation patterns
   */
  implementationPatterns: {
    dataFetching: `
      // Server-side pagination pattern
      const fetchPageData = async (page: number, pageSize: number) => {
        const response = await api.getData({
          page,
          limit: pageSize,
          // other filters
        });
        return {
          items: response.data,
          totalCount: response.total
        };
      };
    `,
    stateManagement: `
      // Reactive pagination state
      const paginationState = reactive({
        currentPage: 1,
        itemsPerPage: 25,
        totalItems: 0,
        loading: false
      });
    `,
    urlSyncing: `
      // Sync pagination with URL parameters
      const updateUrl = (page: number, pageSize: number) => {
        router.push({
          query: { ...route.query, page, pageSize }
        });
      };
    `,
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    inconsistentPageSizes: "Don't offer page sizes that don't make sense for your content type",
    poorWording: "Avoid technical jargon in footerWording and pageNumberWording",
    noFocusManagement: "Don't ignore focus management after page changes",
    invalidStates: "Always validate currentPage is within valid range",
    missingLoadingStates: "Don't forget loading indicators during page transitions",
  },
} as const;

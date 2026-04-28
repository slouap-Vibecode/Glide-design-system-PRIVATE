import { CardType } from "../../constants/cardType";
import { CardBackgroundColor } from "../../constants/cardBackgroundColor";

/**
 * Interface for nck-card component props
 * Flexible container component for grouping related content with consistent styling and interactions
 *
 * @aiUsage Core layout component for content organization - supports hover, selection, and click interactions
 * @aiCategory layout
 * @aiComplexity simple
 */
export interface INckCard {
  /**
   * Card visual style - controls elevation and borders
   * - elevated: Default style with shadow (recommended for most use cases)
   * - flat: No shadow, minimal styling for content areas
   * - outlined: Border instead of shadow (only works with white background)
   * @default CardType.ELEVATED
   * @aiSuggestions { "content": "elevated", "minimal": "flat", "structured": "outlined" }
   */
  type?: CardType;

  /**
   * Card background color theme
   * - white: Default clean background (most common)
   * - blue-grey-100: Subtle neutral background
   * - bright-blue-100: Light blue for informational content
   * - green-100: Light green for success/positive content
   * - orange-100: Light orange for warning content
   * - red-100: Light red for error content
   * @default CardBackgroundColor.WHITE
   * @aiSuggestions { "default": "white", "info": "bright-blue-100", "success": "green-100", "warning": "orange-100", "error": "red-100" }
   */
  backgroundColor?: CardBackgroundColor;

  /**
   * Makes card show hover effects without being clickable
   * Use when card contains interactive elements but card itself isn't clickable
   * @default false
   * @aiUsage Enable for cards with buttons or links inside
   */
  isHoverable?: boolean;

  /**
   * Shows blue border to indicate selected state
   * Use for cards in selectable lists or when highlighting current selection
   * @default false
   * @aiUsage Use in card grids, option selection, or multi-select interfaces
   */
  isSelected?: boolean;

  /**
   * Shows stronger border for active state
   * Use to indicate card is currently active or focused
   * @default false
   * @aiUsage Use for current active item in navigation or multi-step flows
   */
  isActive?: boolean;

  /**
   * ARIA role when card is clickable (click listener provided)
   * - button: Card performs an action when clicked
   * - link: Card navigates to another page or section
   * @aiRequired When card has click listener
   * @aiUsage Use "button" for actions, "link" for navigation
   */
  ariaRole?: "button" | "link";

  /**
   * Shows bare card on mobile/tablet (full width, no shadows/borders)
   * Automatically disables click, hover, active, and selected states on small screens
   * @default false
   * @aiUsage Use for content cards that should be simplified on mobile
   */
  bareOnSmallResolution?: boolean;
}

/**
 * AI-Friendly usage examples for rapid prototyping
 * These examples demonstrate common patterns and best practices
 */
export const NckCardExamples = {
  /**
   * Basic content card - most common usage
   * @aiContext General content display, information panels
   */
  basic: `<nck-card>
    <h2>Card Title</h2>
    <p>Card content goes here...</p>
  </nck-card>`,

  /**
   * Interactive clickable card - for navigation or actions
   * @aiContext Product cards, feature cards, navigation tiles
   */
  clickable: `<nck-card ariaRole="button" @click="handleCardClick">
    <h3>Clickable Card</h3>
    <p>Click anywhere on this card to trigger action</p>
  </nck-card>`,

  /**
   * Card with hover effects - contains interactive elements
   * @aiContext Cards with buttons, links, or form controls inside
   */
  hoverable: `<nck-card :isHoverable="true">
    <h3>User Profile</h3>
    <p>User information...</p>
    <nck-button label="Edit Profile" type="outline" />
  </nck-card>`,

  /**
   * Selected state card - for selectable lists
   * @aiContext Multi-select interfaces, option selection, current selection
   */
  selectable: `<nck-card
    :isSelected="selectedCard === 'card1'"
    ariaRole="button"
    @click="selectCard('card1')">
    <h3>Option 1</h3>
    <p>This card can be selected</p>
  </nck-card>`,

  /**
   * Status card with colored background - for semantic content
   * @aiContext Success messages, error states, warnings, info panels
   */
  statusCard: `<nck-card backgroundColor="green-100">
    <nck-icon iconName="check-filled" :iconSize="IconSize.M" iconAltText="" />
    <h3>Success</h3>
    <p>Your action was completed successfully!</p>
  </nck-card>`,

  /**
   * Mobile-optimized card - simplified on small screens
   * @aiContext Content that should be full-width and simplified on mobile
   */
  responsive: `<nck-card :bareOnSmallResolution="true">
    <div class="card-content">
      <h2>Responsive Card</h2>
      <p>This card adapts to screen size</p>
    </div>
  </nck-card>`,

  /**
   * Card with structured content using slots
   * @aiContext Complex cards with header, content, and action areas
   */
  structured: `<nck-card>
    <template #header>
      <div class="card-header">
        <h2>Card Header</h2>
        <nck-badge label="New" />
      </div>
    </template>

    <div class="card-body">
      <p>Main card content...</p>
    </div>

    <template #footer>
      <div class="card-actions">
        <nck-button label="Action" type="filled" />
        <nck-button label="Cancel" type="outline" />
      </div>
    </template>
  </nck-card>`,

  /**
   * Outlined card for structured layouts
   * @aiContext Form sections, content blocks, structured data display
   */
  outlined: `<nck-card type="outlined">
    <div class="form-section">
      <h3>Personal Information</h3>
      <nck-text-input name="name" label="Full Name" />
      <nck-text-input name="email" label="Email" />
    </div>
  </nck-card>`,

  /**
   * Flat card for minimal styling
   * @aiContext Content areas where elevation isn't needed
   */
  minimal: `<nck-card type="flat">
    <div class="content-area">
      <p>Simple content without elevation</p>
    </div>
  </nck-card>`,
} as const;

/**
 * AI guidance for component usage and patterns
 */
export const NckCardAIGuidance = {
  /**
   * When to use each card type
   */
  typeUsage: {
    elevated: "Default choice - provides clear content separation with shadow",
    flat: "Use in sidebars, content areas where elevation isn't needed",
    outlined: "Use for form sections, structured content (white background only)",
  },

  /**
   * Background color semantic meanings
   */
  backgroundColorMeaning: {
    white: "Default - neutral content, most versatile",
    "blue-grey-100": "Subtle neutral background for secondary content",
    "bright-blue-100": "Informational content, tips, notices",
    "green-100": "Success messages, positive confirmations, completed states",
    "orange-100": "Warning messages, important notices, attention needed",
    "red-100": "Error messages, critical alerts, failed states",
  },

  /**
   * Interactive state combinations
   */
  interactiveStates: {
    nonInteractive: { hoverable: false, clickable: false },
    containsInteractiveElements: { isHoverable: true, clickable: false },
    clickableAction: { ariaRole: "button", clickable: true },
    clickableNavigation: { ariaRole: "link", clickable: true },
    selectable: { isSelected: true, ariaRole: "button", clickable: true },
  },

  /**
   * Common usage patterns
   */
  usagePatterns: {
    contentDisplay: "Basic cards for displaying information without interaction",
    productCards: "Clickable cards for product listings, feature showcases",
    userProfiles: "Cards with user info and action buttons inside",
    statusCards: "Colored background cards for system messages",
    formSections: "Outlined cards to group related form fields",
    dashboardTiles: "Interactive cards for dashboard navigation",
    selectableOptions: "Cards that can be selected in multi-choice scenarios",
  },

  /**
   * Accessibility best practices
   */
  accessibility: {
    clickableCards: "Always provide ariaRole when card is clickable",
    keyboardNavigation: "Clickable cards automatically support keyboard navigation",
    semanticStructure: "Use proper heading hierarchy inside cards",
    colorMeaning: "Don't rely solely on background color to convey meaning",
    focusManagement: "Ensure focus indicators are visible for clickable cards",
  },

  /**
   * Layout considerations
   */
  layout: {
    grid: "Use consistent spacing between cards in grid layouts",
    mobile: "Consider bareOnSmallResolution for better mobile experience",
    nesting: "Avoid nesting interactive cards - use isHoverable for parent",
    spacing: "Maintain consistent padding inside cards for visual harmony",
  },

  /**
   * Anti-patterns to avoid
   */
  antiPatterns: {
    nestedClickableCards: "Don't nest clickable cards - confuses user interaction",
    missingAriaRole: "Don't make cards clickable without proper ariaRole",
    colorOnlyMeaning: "Don't use background color as the only way to convey meaning",
    outlinedWithColor: "Don't use outlined type with non-white backgrounds",
    overuseInteractive: "Don't make every card interactive - reserve for actual interactions",
  },
} as const;

/**
 * Neo Component Kit - External Distribution Entry Point
 * Optimized for public/external usage without internal dependencies
 */

import type { INckPopover } from "./components/interfaces/iNckPopover";
import type { INckMenu } from "./components/interfaces/iNckMenu";
import type { INckForm } from "./components/interfaces/iNckForm";
import type { INckTextInput } from "./components/interfaces/iNckTextInput";
import type { INckAutocomplete } from "./components/interfaces/iNckAutocomplete";
import type { INckDatepicker } from "./components/interfaces/iNckDatepicker";
import type { INckChipPopover } from "./components/interfaces/iNckChipPopover";
import type { INckToggleChip } from "./components/interfaces/iNckToggleChip";
import type { IFormFieldWithValidation } from "./components/interfaces/iFormFieldWithValidation";
import type { INckDropdown } from "./components/interfaces/iNckDropdown";
import type { INckRadioButtons } from "./components/interfaces/iNckRadioButtons";
import type { INckCheckbox } from "./components/interfaces/iNckCheckbox";
import type { INckSwitch } from "./components/interfaces/iNckSwitch";
import type { INckTextArea } from "./components/interfaces/iNckTextArea";
import type { INckModal } from "./components/interfaces/iNckModal";
import type { INckDrawer } from "./components/interfaces/iNckDrawer";

// Core Components
import NckButton from "./components/nckButton.vue";
import NckChip from "./components/nckChip.vue";
import NckBanner from "./components/nckBanner.vue";
import NckBannerItemGroup from "./components/nckBannerItemGroup.vue";
import NckBannerItem from "./components/nckBannerItem.vue";
import NckToast from "./components/nckToast.vue";
import NckIcon from "./components/nckIcon.vue";
import NckCard from "./components/nckCard.vue";
import NckHeader from "./components/nckHeader.vue";
import NckModal from "./components/nckModal.vue";
import NckDrawer from "./components/nckDrawer.vue";

// Form Components
import NckTextInput from "./components/nckTextInput.vue";
import NckTextArea from "./components/nckTextArea.vue";
import NckCheckbox from "./components/nckCheckbox.vue";
import NckRadioButtons from "./components/nckRadioButtons.vue";
import NckDropdown from "./components/nckDropdown.vue";
import NckSwitch from "./components/nckSwitch.vue";
import NckForm from "./components/nckForm.vue";
import NckAutocomplete from "./components/nckAutocomplete.vue";
import NckDatepickerRange from "./components/nckDatepickerRange.vue";
import NckDatepickerSingle from "./components/nckDatepickerSingle.vue";
import NckSearchInput from "./components/nckSearchInput.vue";

// Data Display Components
import NckTable from "./components/nckTable.vue";
import NckList from "./components/nckList.vue";
import NckBadge from "./components/nckBadge.vue";
import NckCounterBadge from "./components/nckCounterBadge.vue";
import NckRecommendedBadge from "./components/nckRecommendedBadge.vue";
import NckStatusIndicator from "./components/nckStatusIndicator.vue";
import NckTimeline from "./components/nckTimeline.vue";

// Navigation Components
import NckTabs from "./components/nckTabs.vue";
import NckBreadcrumb from "./components/nckBreadcrumb.vue";
import NckPagination from "./components/nckPagination.vue";
import NckContentSwitcher from "./components/nckContentSwitcher.vue";
import NckMenu from "./components/nckMenu.vue";

// Interactive Components
import NckPopover from "./components/nckPopover.vue";
import NckChipPopover from "./components/nckChipPopover.vue";
import NckToggleChip from "./components/nckToggleChip.vue";
import NckToggleChipGroup from "./components/nckToggleChipGroup.vue";
import NckSlider from "./components/nckSlider.vue";

// Utility Components
import NckLoader from "./components/nckLoader.vue";
import NckLoadingArea from "./components/nckLoadingArea.vue";
import NckPlaceholder from "./components/nckPlaceholder.vue";

// Directives (external-compatible)
import NckInfoTooltip from "./directives/nckInfoTooltip";
import NckDialogTooltip from "./directives/nckDialogTooltip";

// Styles (external version without internal dependencies)
import "./styles/main.less";

// Constants and Enums (safe for external use)
import { BannerType } from "./constants/bannerType";
import { ModalRole } from "./constants/modalRole";
import { IconSize } from "./constants/iconSize";
import { CounterBadgeSize } from "./constants/counterBadgeSize";
import { Colors } from "./constants/colors";
import { BackgroundColors } from "./constants/backgroundColors";
import { TabsType } from "./constants/tabsType";
import { TextAlignment } from "./constants/textAlignment";
import { HeaderType } from "./constants/headerType";
import { DrawerPosition } from "./constants/drawerPosition";
import { ButtonColor } from "./constants/buttonColor";
import { ButtonSize } from "./constants/buttonSize";
import { PopoverSize } from "./constants/popoverSize";
import { PopoverHidingEventType } from "./constants/popoverHidingEventType";
import { ButtonControlType } from "./constants/buttonControlType";
import { ButtonType } from "./constants/buttonType";
import { IconColors } from "./constants/iconColors";
import { ModalSize } from "./constants/modalSize";
import { LoaderSize } from "./constants/loaderSize";
import { LoaderType } from "./constants/loaderType";
import { DisplayContext } from "./constants/displayContext";
import { Status } from "./constants/status";
import { ToastType } from "./constants/toastType";
import { GroupDirection } from "./constants/groupDirection";
import { RadioButtonsDisplay } from "./constants/radioButtonsDisplay";
import { MenuPosition } from "./constants/menuPosition";
import { DatepickerPopoverPosition } from "@/constants/datepickerPopoverPosition";
import { BadgeColor } from "./constants/badgeColor";
import { BadgeType } from "./constants/badgeType";
import { RecommendedBadgeType } from "./constants/recommendedBadgeType";
import { RecommendationLevel } from "./constants/recommendationLevel";
import { SortOrder } from "./constants/sortOrder";
import { DIVIDER_TOKEN } from "./constants/dividerToken";
import { TimeInterval } from "./constants/timeInterval";
import { CardBackgroundColor } from "./constants/cardBackgroundColor";
import { CardType } from "./constants/cardType";
import { TimelineEventState } from "./constants/timelineEventState";
import { TimelineType } from "./constants/timelineType";
import { SwitchLabelPosition } from "./constants/switchLabelPosition";

// Models and Interfaces (external-safe)
import type { INckGlobalOptions } from "./models/iNckGlobalOptions";
import type { ITableColumnOptions } from "./models/iTableColumnOption";
import type { InfoTooltipOptions } from "./models/infoTooltipOptions";
import type { IBreadcrumbOption } from "./models/iBreadcrumbOption";
import type { IContentSwitcherOption } from "./models/iContentSwitcherOption";
import type { ValidationRule } from "./models/validationRule";
import type { IRadioButtonOption } from "./models/iRadioButtonOption";
import type { IDropdownOption } from "./models/iDropdownOption";
import type { IMenuItem } from "./models/iMenuItem";
import type { IAutocompleteItem } from "./models/iAutocompleteItem";
import type { DividerToken } from "./constants/dividerToken";
import type { IDateWithRange } from "./models/iDateWithRange";

// Controllers (external-safe)
import { GlobalOptionsProvider } from "./controllers/globalOptionsProvider";
import { ModalService } from "./controllers/modalService";
import { ToastService } from "./controllers/toastService";

import { App } from "vue";

/**
 * Initialize the Neo Component Kit with configuration
 * External-friendly initialization without internal dependencies
 */
function initialize(options: INckGlobalOptions) {
  // Validate required options for external usage
  if (!options.urls?.iconsURL) {
    // Warning: iconsURL is required for icon functionality
    // Please provide a path to your Neo Icon Kit icons
    if (process.env.NODE_ENV === "development") {
      // Development warning would go here
    }
  }

  GlobalOptionsProvider.provideOptions(options);
  initializeNeoIconsCache();
}

/**
 * Initialize icon cache for external usage
 */
function initializeNeoIconsCache() {
  if (typeof window !== "undefined") {
    window.neoIconsPromiseMap = new Map<string, Promise<string>>();
  }
}

/**
 * Vue plugin install function for external usage
 */
function install(app: App, options: INckGlobalOptions) {
  // Register all components globally
  app.component("NckBadge", NckBadge);
  app.component("NckBanner", NckBanner);
  app.component("NckBannerItemGroup", NckBannerItemGroup);
  app.component("NckBannerItem", NckBannerItem);
  app.component("NckBreadcrumb", NckBreadcrumb);
  app.component("NckButton", NckButton);
  app.component("NckChip", NckChip);
  app.component("NckCard", NckCard);
  app.component("NckCheckbox", NckCheckbox);
  app.component("NckContentSwitcher", NckContentSwitcher);
  app.component("NckCounterBadge", NckCounterBadge);
  app.component("NckDatepickerSingle", NckDatepickerSingle);
  app.component("NckDatepickerRange", NckDatepickerRange);
  app.component("NckDropdown", NckDropdown);
  app.component("NckForm", NckForm);
  app.component("NckHeader", NckHeader);
  app.component("NckIcon", NckIcon);
  app.component("NckList", NckList);
  app.component("NckLoader", NckLoader);
  app.component("NckLoadingArea", NckLoadingArea);
  app.component("NckMenu", NckMenu);
  app.component("NckModal", NckModal);
  app.component("NckDrawer", NckDrawer);
  app.component("NckPopover", NckPopover);
  app.component("NckPagination", NckPagination);
  app.component("NckPlaceholder", NckPlaceholder);
  app.component("NckRadioButtons", NckRadioButtons);
  app.component("NckRecommendedBadge", NckRecommendedBadge);
  app.component("NckSlider", NckSlider);
  app.component("NckSwitch", NckSwitch);
  app.component("NckTabs", NckTabs);
  app.component("NckTable", NckTable);
  app.component("NckTextArea", NckTextArea);
  app.component("NckTextInput", NckTextInput);
  app.component("NckAutocomplete", NckAutocomplete);
  app.component("NckToast", NckToast);
  app.component("NckChipPopover", NckChipPopover);
  app.component("NckToggleChip", NckToggleChip);
  app.component("NckToggleChipGroup", NckToggleChipGroup);
  app.component("NckSearchInput", NckSearchInput);
  app.component("NckStatusIndicator", NckStatusIndicator);
  app.component("NckTimeline", NckTimeline);

  // Register directives
  app.directive("nck-dialog-tooltip", NckDialogTooltip);
  app.directive("nck-info-tooltip", NckInfoTooltip);

  initialize(options);
}

// Export everything for external usage
export {
  // Component Interfaces
  INckForm,
  INckPopover,
  INckMenu,
  INckTextInput,
  INckAutocomplete,
  INckDatepicker,
  IFormFieldWithValidation,
  INckDropdown,
  INckRadioButtons,
  INckCheckbox,
  INckSwitch,
  INckTextArea,
  INckModal,
  INckDrawer,
  INckChipPopover,
  INckToggleChip,

  // Core Components
  NckButton,
  NckChip,
  NckBanner,
  NckBannerItemGroup,
  NckBannerItem,
  NckToast,
  NckIcon,
  NckCard,
  NckHeader,
  NckModal,
  NckDrawer,

  // Form Components
  NckTextInput,
  NckTextArea,
  NckCheckbox,
  NckRadioButtons,
  NckDropdown,
  NckSwitch,
  NckForm,
  NckAutocomplete,
  NckDatepickerRange,
  NckDatepickerSingle,
  NckSearchInput,

  // Data Display Components
  NckTable,
  NckList,
  NckBadge,
  NckCounterBadge,
  NckRecommendedBadge,
  NckStatusIndicator,
  NckTimeline,

  // Navigation Components
  NckTabs,
  NckBreadcrumb,
  NckPagination,
  NckContentSwitcher,
  NckMenu,

  // Interactive Components
  NckPopover,
  NckChipPopover,
  NckToggleChip,
  NckToggleChipGroup,
  NckSlider,

  // Utility Components
  NckLoader,
  NckLoadingArea,
  NckPlaceholder,

  // Directives
  NckInfoTooltip,
  NckDialogTooltip,

  // Constants
  BannerType,
  IconSize,
  CounterBadgeSize,
  BackgroundColors,
  Colors,
  TabsType,
  TextAlignment,
  HeaderType,
  IconColors,
  DrawerPosition,
  ButtonControlType,
  ButtonType,
  ButtonColor,
  ButtonSize,
  PopoverSize,
  PopoverHidingEventType,
  LoaderSize,
  LoaderType,
  DisplayContext,
  GroupDirection,
  RadioButtonsDisplay,
  MenuPosition,
  DatepickerPopoverPosition,
  BadgeColor,
  BadgeType,
  RecommendedBadgeType,
  RecommendationLevel,
  SortOrder,
  Status,
  ModalSize,
  DIVIDER_TOKEN,
  CardBackgroundColor,
  CardType,
  TimeInterval,
  ModalRole,
  ToastType,
  SwitchLabelPosition,
  TimelineEventState,
  TimelineType,

  // Models and Types
  INckGlobalOptions,
  ITableColumnOptions,
  InfoTooltipOptions,
  IBreadcrumbOption,
  IContentSwitcherOption,
  ValidationRule,
  IRadioButtonOption,
  IDropdownOption,
  IMenuItem,
  IAutocompleteItem,
  DividerToken,
  IDateWithRange,

  // Controllers and Services
  ModalService,
  ToastService,

  // Functions
  initialize,
};

// Default export for Vue plugin usage
export default {
  install,
  version: process.env.VUE_APP_VERSION ?? "16.1.0",
};

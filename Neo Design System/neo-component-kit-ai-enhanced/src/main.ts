import type { INckPopover } from "./components/interfaces/iNckPopover";
import type { INckMenu } from "./components/interfaces/iNckMenu";
import type { INckForm } from "./components/interfaces/iNckForm";
import type { INckTextInput } from "./components/interfaces/iNckTextInput";
import type { INckAutocomplete } from "./components/interfaces/iNckAutocomplete";
import type { INckDatepicker } from "./components/interfaces/iNckDatepicker";
import type { INckChipPopover } from "./components/interfaces/iNckChipPopover";
import type { INckToggleChip } from "./components/interfaces/iNckToggleChip";

import NckButton from "./components/nckButton.vue";
import NckChip from "./components/nckChip.vue";
import NckBanner from "./components/nckBanner.vue";
import NckBannerItemGroup from "./components/nckBannerItemGroup.vue";
import NckBannerItem from "./components/nckBannerItem.vue";
import NckToast from "./components/nckToast.vue";
import NckInfoTooltip from "./directives/nckInfoTooltip";
import NckDialogTooltip from "./directives/nckDialogTooltip";
import NckList from "./components/nckList.vue";
import NckCounterBadge from "./components/nckCounterBadge.vue";
import NckIcon from "./components/nckIcon.vue";
import NckTabs from "./components/nckTabs.vue";
import NckCard from "./components/nckCard.vue";
import NckHeader from "./components/nckHeader.vue";
import NckTable from "./components/nckTable.vue";
import NckBadge from "./components/nckBadge.vue";
import NckContentSwitcher from "./components/nckContentSwitcher.vue";
import NckPagination from "./components/nckPagination.vue";
import NckBreadcrumb from "./components/nckBreadcrumb.vue";
import NckTextInput from "./components/nckTextInput.vue";
import NckPhoneNumberInput from "./components/nckPhoneNumberInput.vue";
import NckModal from "./components/nckModal.vue";
import NckDrawer from "./components/nckDrawer.vue";
import NckPopover from "./components/nckPopover.vue";
import NckLoader from "./components/nckLoader.vue";
import NckLoadingArea from "./components/nckLoadingArea.vue";
import NckCheckbox from "./components/nckCheckbox.vue";
import NckSlider from "./components/nckSlider.vue";
import NckStatusIndicator from "./components/nckStatusIndicator.vue";
import NckSwitch from "./components/nckSwitch.vue";
import NckRadioButtons from "./components/nckRadioButtons.vue";
import NckTextArea from "./components/nckTextArea.vue";
import NckDropdown from "./components/nckDropdown.vue";
import NckRecommendedBadge from "./components/nckRecommendedBadge.vue";
import NckPlaceholder from "./components/nckPlaceholder.vue";
import NckMenu from "./components/nckMenu.vue";
import NckForm from "./components/nckForm.vue";
import NckAutocomplete from "./components/nckAutocomplete.vue";
import NckDatepickerRange from "./components/nckDatepickerRange.vue";
import NckDatepickerSingle from "./components/nckDatepickerSingle.vue";
import NckChipPopover from "./components/nckChipPopover.vue";
import NckToggleChip from "./components/nckToggleChip.vue";
import NckToggleChipGroup from "./components/nckToggleChipGroup.vue";
import NckSearchInput from "./components/nckSearchInput.vue";
import NckTimeline from "./components/nckTimeline.vue";

import "./styles/main.less";

import { BannerType } from "./constants/bannerType";
import { ModalRole } from "./constants/modalRole";
import { IconSize } from "./constants/iconSize";
import { CounterBadgeSize } from "./constants/counterBadgeSize";
import type { INckGlobalOptions } from "./models/iNckGlobalOptions";
import { GlobalOptionsProvider } from "./controllers/globalOptionsProvider";
import { Colors } from "./constants/colors";
import { BackgroundColors } from "./constants/backgroundColors";
import { TabsType } from "./constants/tabsType";
import type { ITableColumnOptions } from "./models/iTableColumnOption";
import { TextAlignment } from "./constants/textAlignment";
import { HeaderType } from "./constants/headerType";
import type { InfoTooltipOptions } from "./models/infoTooltipOptions";
import type { IBreadcrumbOption } from "./models/iBreadcrumbOption";
import type { IContentSwitcherOption } from "./models/iContentSwitcherOption";
import { DrawerPosition } from "./constants/drawerPosition";
import { ButtonColor } from "./constants/buttonColor";
import { ButtonSize } from "./constants/buttonSize";
import { PopoverSize } from "./constants/popoverSize";
import { PopoverHidingEventType } from "./constants/popoverHidingEventType";
import { ButtonControlType } from "./constants/buttonControlType";
import { ButtonType } from "./constants/buttonType";
import { IconColors } from "./constants/iconColors";
import { ValidationRule } from "./models/validationRule";
import { ModalService } from "./controllers/modalService";
import { ModalSize } from "./constants/modalSize";
import { ToastService } from "./controllers/toastService";
import { LoaderSize } from "./constants/loaderSize";
import { LoaderType } from "./constants/loaderType";
import { DisplayContext } from "./constants/displayContext";
import { Status } from "./constants/status";
import { ToastType } from "./constants/toastType";
import type { IRadioButtonOption } from "./models/iRadioButtonOption";
import { GroupDirection } from "./constants/groupDirection";
import { RadioButtonsDisplay } from "./constants/radioButtonsDisplay";
import type { IDropdownOption } from "./models/iDropdownOption";
import { MenuPosition } from "./constants/menuPosition";
import { DatepickerPopoverPosition } from "@/constants/datepickerPopoverPosition";
import { BadgeColor } from "./constants/badgeColor";
import { BadgeType } from "./constants/badgeType";
import { RecommendedBadgeType } from "./constants/recommendedBadgeType";
import { RecommendationLevel } from "./constants/recommendationLevel";
import { SortOrder } from "./constants/sortOrder";
import { DIVIDER_TOKEN } from "./constants/dividerToken";
import type { DividerToken } from "./constants/dividerToken";
import { TimeInterval } from "./constants/timeInterval";
import { CardBackgroundColor } from "./constants/cardBackgroundColor";
import { CardType } from "./constants/cardType";
import { TimelineEventState } from "./constants/timelineEventState";
import { TimelineType } from "./constants/timelineType";
import { App } from "vue";
import type { IFormFieldWithValidation } from "./components/interfaces/iFormFieldWithValidation";
import type { IMenuItem } from "./models/iMenuItem";
import type { IAutocompleteItem } from "./models/iAutocompleteItem";
import type { INckDropdown } from "./components/interfaces/iNckDropdown";
import type { INckRadioButtons } from "./components/interfaces/iNckRadioButtons";
import type { INckCheckbox } from "./components/interfaces/iNckCheckbox";
import type { INckSwitch } from "./components/interfaces/iNckSwitch";
import type { INckTextArea } from "./components/interfaces/iNckTextArea";
import type { INckModal } from "./components/interfaces/iNckModal";
import type { INckDrawer } from "./components/interfaces/iNckDrawer";
import type { IDateWithRange } from "./models/iDateWithRange";
import { SwitchLabelPosition } from "./constants/switchLabelPosition";

function initialize(options: INckGlobalOptions) {
  GlobalOptionsProvider.provideOptions(options);
  initializeNeoIconsCache();
}

function initializeNeoIconsCache() {
  window.neoIconsPromiseMap = new Map<string, Promise<string>>();
}

export {
  /* component interfaces */
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
  /* components */
  NckButton,
  NckChip,
  NckBanner,
  NckBannerItemGroup,
  NckBannerItem,
  NckToast,
  NckList,
  NckIcon,
  NckCounterBadge,
  NckCard,
  NckHeader,
  NckTabs,
  NckBadge,
  NckTable,
  NckBreadcrumb,
  NckPagination,
  NckContentSwitcher,
  NckModal,
  NckPopover,
  NckTextInput,
  NckPhoneNumberInput,
  NckLoader,
  NckLoadingArea,
  NckCheckbox,
  NckSlider,
  NckSwitch,
  NckRadioButtons,
  NckTextArea,
  NckDropdown,
  NckRecommendedBadge,
  NckPlaceholder,
  NckMenu,
  NckAutocomplete,
  NckForm,
  NckDatepickerRange,
  NckDatepickerSingle,
  NckChipPopover,
  NckToggleChip,
  NckDrawer,
  NckStatusIndicator,
  NckToggleChipGroup,
  NckSearchInput,
  NckTimeline,
  /* directives */
  NckInfoTooltip,
  NckDialogTooltip,
  /* constants */
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
  /* models */
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
  /* controllers */
  ModalService,
  ToastService,
  /* functions */
  initialize,
};

function install(app: App, options: INckGlobalOptions) {
  /* @ts-nocheck */
  app.component("NckBadge", NckBadge);
  app.component("NckBanner", NckBanner);
  app.component("NckBreadcrumb", NckBreadcrumb);
  app.component("NckButton", NckButton);
  app.component("NckChip", NckChip);
  app.component("NckCard", NckCard);
  app.component("NckCheckbox", NckCheckbox);
  app.component("NckContentSwitcher", NckContentSwitcher);
  app.component("NckCounterBadge", NckCounterBadge);
  app.component("NckDatepickerSingle", NckDatepickerSingle);
  app.component("NckDatepickerRange", NckDatepickerRange);
  app.directive("nck-dialog-tooltip", NckDialogTooltip);
  app.component("NckDropdown", NckDropdown);
  app.component("NckForm", NckForm);
  app.component("NckHeader", NckHeader);
  app.component("NckIcon", NckIcon);
  app.directive("nck-info-tooltip", NckInfoTooltip);
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
  app.component("NckPhoneNumberInput", NckPhoneNumberInput);
  app.component("NckAutocomplete", NckAutocomplete);
  app.component("NckToast", NckToast);
  app.component("NckChipPopover", NckChipPopover);
  app.component("NckToggleChip", NckToggleChip);
  app.component("NckToggleChipGroup", NckToggleChipGroup);
  app.component("NckSearchInput", NckSearchInput);
  app.component("NckStatusIndicator", NckStatusIndicator);

  initialize(options);
}

export default { install };

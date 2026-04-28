import { createWebHashHistory, createRouter } from "vue-router";
import HomePage from "./views/HomePage.vue";
import ButtonTestPage from "./views/ButtonTestPage.vue";
import ButtonErrorsTestPage from "./views/ButtonErrorsTestPage.vue";
import TooltipInfoTestPage from "./views/TooltipInfoTestPage.vue";
import TooltipInfoFlipTestPage from "./views/TooltipInfoFlipTestPage.vue";
import TooltipDialogTestPage from "./views/TooltipDialogTestPage.vue";
import TooltipDialogFlipTestPage from "./views/TooltipDialogFlipTestPage.vue";
import BannerTestPage from "./views/BannerTestPage.vue";
import ToastTestPage from "./views/ToastTestPage.vue";
import BannerErrorsTestPage from "./views/BannerErrorsTestPage.vue";
import ListTestPage from "./views/ListTestPage.vue";
import CounterBadgeTestPage from "./views/CounterBadgeTestPage.vue";
import IconTestPage from "./views/IconTestPage.vue";
import IconErrorsTestPage from "./views/IconErrorsTestPage.vue";
import TabsTestPage from "./views/TabsTestPage.vue";
import TabsErrorsTestPage from "./views/TabsErrorsTestPage.vue";
import CardTestPage from "./views/CardTestPage.vue";
import CardErrorsTestPage from "./views/CardErrorsTestPage.vue";
import HeaderTestPage from "./views/HeaderTestPage.vue";
import HeaderErrorsTestPage from "./views/HeaderErrorsTestPage.vue";
import TableTestPage from "./views/TableTestPage.vue";
import TableErrorsTestPage from "./views/TableErrorsTestPage.vue";
import BadgeTestPage from "./views/BadgeTestPage.vue";
import BadgeErrorsTestPage from "./views/BadgeErrorsTestPage.vue";
import ContentSwitcherTestPage from "./views/ContentSwitcherTestPage.vue";
import ContentSwitcherErrorsTestPage from "./views/ContentSwitcherErrorsTestPage.vue";
import PaginationTestPage from "./views/PaginationTestPage.vue";
import PaginationErrorsTestPage from "./views/PaginationErrorsTestPage.vue";
import BreadcrumbTestPage from "./views/BreadcrumbTestPage.vue";
import BreadcrumbErrorsTestPage from "./views/BreadcrumbErrorsTestPage.vue";
import CheckboxTestPage from "./views/CheckboxTestPage.vue";
import SwitchTestPage from "./views/SwitchTestPage.vue";
import TextInputTestPage from "./views/TextInputTestPage.vue";
import TextInputErrorsTestPage from "./views/TextInputErrorsTestPage.vue";
import PhoneNumberInputTestPage from "./views/PhoneNumberInputTestPage.vue";
import PhoneNumberInputErrorsTestPage from "./views/PhoneNumberInputErrorsTestPage.vue";
import ModalTestPage from "./views/ModalTestPage.vue";
import DrawerTestPage from "./views/DrawerTestPage.vue";
import PopoverTestPage from "./views/PopoverTestPage.vue";
import ModalErrorsTestPage from "./views/ModalErrorsTestPage.vue";
import LoaderTestPage from "./views/LoaderTestPage.vue";
import LoaderErrorsTestPage from "./views/LoaderErrorsTestPage.vue";
import RadioButtonsTestPage from "./views/RadioButtonsTestPage.vue";
import TextAreaTestPage from "./views/TextAreaTestPage.vue";
import DropdownTestPage from "./views/DropdownTestPage.vue";
import DropdownErrorsTestPage from "./views/DropdownErrorsTestPage.vue";
import RecommendedBadgeTestPage from "./views/RecommendedBadgeTestPage.vue";
import RecommendedBadgeErrorsTestPage from "./views/RecommendedBadgeErrorsTestPage.vue";
import PlaceholderTestPage from "./views/PlaceholderTestPage.vue";
import PlaceholderErrorsTestPage from "./views/PlaceholderErrorsTestPage.vue";
import ChipTestPage from "./views/ChipTestPage.vue";
import ChipErrorsTestPage from "./views/ChipErrorsTestPage.vue";
import ChipPopoverTestPage from "./views/ChipPopoverTestPage.vue";
import ChipPopoverErrorsTestPage from "./views/ChipPopoverErrorsTestPage.vue";
import MenuTestPage from "./views/MenuTestPage.vue";
import FormTestPage from "./views/FormTestPage.vue";
import DatepickerRangeTestPage from "./views/DatepickerRangeTestPage.vue";
import DatepickerRangeErrorsTestPage from "./views/DatepickerRangeErrorsTestPage.vue";
import DatepickerSingleTestPage from "./views/DatepickerSingleTestPage.vue";
import DatepickersWithTimeTestPage from "./views/DatepickersWithTimeTestPage.vue";
import AutocompleteTestPage from "./views/AutocompleteTestPage.vue";
import AutocompleteErrorTestPage from "./views/AutocompleteErrorTestPage.vue";
import ShowcasePage from "./views/ShowcasePage.vue";
import ToggleChipTestPage from "./views/ToggleChipTestPage.vue";
import ToggleChipGroupTestPage from "./views/ToggleChipGroupTestPage.vue";
import ToggleChipErrorsTestPage from "./views/ToggleChipErrorsTestPage.vue";
import SliderTestPage from "./views/SliderTestPage.vue";
import StatusIndicatorTestPage from "./views/StatusIndicatorTestPage.vue";
import StylesTestPage from "./views/StylesTestPage.vue";
import SearchInputTestPage from "./views/SearchInputTestPage.vue";

import FourOhFourPage from "./views/FourOhFourPage.vue";
import SearchInputErrorsTestPage from "./views/SearchInputErrorsTestPage.vue";
import TimelineTestPage from "./views/TimelineTestPage.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/button",
      name: "button",
      component: ButtonTestPage
    },
    {
      path: "/button-errors",
      name: "button-errors",
      component: ButtonErrorsTestPage
    },
    {
      path: "/banner",
      name: "banner",
      component: BannerTestPage
    },
    {
      path: "/banner-errors",
      name: "banner-errors",
      component: BannerErrorsTestPage
    },
    {
      path: "/toast",
      name: "toast",
      component: ToastTestPage
    },
    {
      path: "/list",
      name: "list",
      component: ListTestPage
    },
    {
      path: "/counterBadge",
      name: "counterBadge",
      component: CounterBadgeTestPage
    },
    {
      path: "/infoTooltip",
      name: "infoTooltip",
      component: TooltipInfoTestPage
    },
    {
      path: "/infoTooltip/flip",
      name: "infoTooltipFlip",
      component: TooltipInfoFlipTestPage
    },
    {
      path: "/dialogTooltip",
      name: "tooltipDialog",
      component: TooltipDialogTestPage
    },
    {
      path: "/dialogTooltip/flip",
      name: "tooltipDialogFlip",
      component: TooltipDialogFlipTestPage
    },
    {
      path: "/icon",
      name: "icon",
      component: IconTestPage
    },
    {
      path: "/icon-errors",
      name: "icon-errors",
      component: IconErrorsTestPage
    },
    {
      path: "/tabs",
      name: "tabs",
      component: TabsTestPage
    },
    {
      path: "/tabs-errors",
      name: "tabs-errors",
      component: TabsErrorsTestPage
    },
    {
      path: "/card",
      name: "card",
      component: CardTestPage
    },
    {
      path: "/card-errors",
      name: "card-errors",
      component: CardErrorsTestPage
    },
    {
      path: "/header",
      name: "header",
      component: HeaderTestPage
    },
    {
      path: "/header-errors",
      name: "header-errors",
      component: HeaderErrorsTestPage
    },
    {
      path: "/table",
      name: "table",
      component: TableTestPage
    },
    {
      path: "/table-errors",
      name: "table-errors",
      component: TableErrorsTestPage
    },
    {
      path: "/badge",
      name: "badge",
      component: BadgeTestPage
    },
    {
      path: "/badge-errors",
      name: "badge-errors",
      component: BadgeErrorsTestPage
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuTestPage
    },
    {
      path: "/contentSwitcher",
      name: "ContentSwitcher",
      component: ContentSwitcherTestPage
    },
    {
      path: "/contentSwitcher-errors",
      name: "contentSwitcher-errors",
      component: ContentSwitcherErrorsTestPage
    },
    {
      path: "/pagination",
      name: "pagination",
      component: PaginationTestPage
    },
    {
      path: "/pagination-errors",
      name: "pagination-errors",
      component: PaginationErrorsTestPage
    },
    {
      path: "/breadcrumb",
      name: "breadcrumb",
      component: BreadcrumbTestPage
    },
    {
      path: "/breadcrumb-errors",
      name: "breadcrumb-errors",
      component: BreadcrumbErrorsTestPage
    },
    {
      path: "/textInput",
      name: "textInput",
      component: TextInputTestPage
    },
    {
      path: "/textInput-errors",
      name: "textInput-errors",
      component: TextInputErrorsTestPage
    },
    {
      path: "/phone-number-input",
      name: "phoneNumberInput",
      component: PhoneNumberInputTestPage
    },
    {
      path: "/phone-number-input-errors",
      name: "phoneNumberInput-errors",
      component: PhoneNumberInputErrorsTestPage
    },
    {
      path: "/modal",
      name: "modal",
      component: ModalTestPage
    },
    {
      path: "/modal-errors",
      name: "modal-errors",
      component: ModalErrorsTestPage
    },
    {
      path: "/drawer",
      name: "drawer",
      component: DrawerTestPage
    },
    {
      path: "/popover",
      name: "popover",
      component: PopoverTestPage
    },
    {
      path: "/loader",
      name: "loader",
      component: LoaderTestPage
    },
    {
      path: "/loader-errors",
      name: "loader-erros",
      component: LoaderErrorsTestPage
    },
    {
      path: "/checkbox",
      name: "checkbox",
      component: CheckboxTestPage
    },
    {
      path: "/switch",
      name: "switch",
      component: SwitchTestPage
    },
    {
      path: "/chip",
      name: "chip",
      component: ChipTestPage
    },
    {
      path: "/chip-errors",
      name: "chip-errors",
      component: ChipErrorsTestPage
    },
    {
      path: "/chip-popover",
      name: "chip-popover",
      component: ChipPopoverTestPage
    },
    {
      path: "/chip-popover-errors",
      name: "chip-popover-errors",
      component: ChipPopoverErrorsTestPage
    },
    {
      path: "/radiobuttons",
      name: "radiobuttons",
      component: RadioButtonsTestPage
    },
    {
      path: "/textArea",
      name: "textArea",
      component: TextAreaTestPage
    },
    {
      path: "/dropdown",
      name: "dropdown",
      component: DropdownTestPage
    },
    {
      path: "/dropdown-errors",
      name: "dropdown-errors",
      component: DropdownErrorsTestPage
    },
    {
      path: "/recommendedBadge",
      name: "recommendedBadge",
      component: RecommendedBadgeTestPage
    },
    {
      path: "/recommendedBadge-errors",
      name: "recommendedBadge-errors",
      component: RecommendedBadgeErrorsTestPage
    },
    {
      path: "/placeholder",
      name: "placeholder",
      component: PlaceholderTestPage
    },
    {
      path: "/placeholder-errors",
      name: "placeholder-errors",
      component: PlaceholderErrorsTestPage
    },
    {
      path: "/form",
      name: "form",
      component: FormTestPage
    },
    {
      path: "/datepicker-range",
      name: "datepicker-range",
      component: DatepickerRangeTestPage
    },
    {
      path: "/datepicker-range-errors",
      name: "datepicker-range-errors",
      component: DatepickerRangeErrorsTestPage
    },
    {
      path: "/datepicker-single",
      name: "datepicker-single",
      component: DatepickerSingleTestPage
    },
    {
      path: "/datepickers-with-time",
      name: "datepickers-with-time",
      component: DatepickersWithTimeTestPage
    },
    {
      path: "/autocomplete",
      name: "autocomplete",
      component: AutocompleteTestPage
    },
    {
      path: "/autocomplete-errors",
      name: "autocomplete-errors",
      component: AutocompleteErrorTestPage
    },
    {
      path: "/showcase",
      name: "showcase",
      component: ShowcasePage
    },
    {
      path: "/toggleChip",
      name: "toggleChip",
      component: ToggleChipTestPage
    },
    {
      path: "/toggleChip-errors",
      name: "toggleChip-errors",
      component: ToggleChipErrorsTestPage
    },
    {
      path: "/slider",
      name: "slider",
      component: SliderTestPage
    },
    {
      path: "/status-indicator",
      name: "status-indicator",
      component: StatusIndicatorTestPage
    },
    {
      path: "/styles",
      name: "styles",
      component: StylesTestPage
    },
    {
      path: "/timeline",
      name: "timeline",
      component: TimelineTestPage
    },
    {
      path: "/toggle-chip-group",
      name: "toggle-chip-group",
      component: ToggleChipGroupTestPage
    },
    {
      path: "/search-input",
      name: "search-input",
      component: SearchInputTestPage
    },
    {
      path: "/search-input-errors",
      name: "search-input-errors",
      component: SearchInputErrorsTestPage
    },
    /* keep it last, it is a fallback for all routes for 404 */
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: FourOhFourPage
    }
  ]
});

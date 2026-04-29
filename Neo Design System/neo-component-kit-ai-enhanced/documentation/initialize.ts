import { App  } from "vue";
import NckInfoTooltip from "../src/directives/nckInfoTooltip";
import NckDialogTooltip from "../src/directives/nckDialogTooltip";
import "../src/styles/tooltip.less";
import "./styles/font.css";
import "./styles/documentation-styles.css";
import { TabsType } from "../src/constants/tabsType";
import { Colors } from "../src/constants/colors";
import { BackgroundColors } from "../src/constants/backgroundColors";
import { IconSize } from "../src/constants/iconSize";
import { BannerType } from "../src/constants/bannerType";
import { ModalRole } from "../src/constants/modalRole";
import { TextAlignment } from "../src/constants/textAlignment";
import { translateAndFormat } from "../test-application/src/helpers/translationAndFormattingHelper";
import { HeaderType } from "../src/constants/headerType";
import { DrawerPosition } from "../src/constants/drawerPosition"
import { ButtonColor } from "../src/constants/buttonColor";
import { ButtonSize } from "../src/constants/buttonSize";
import { PopoverSize } from "../src/constants/popoverSize";
import { PopoverHidingEventType } from "../src/constants/popoverHidingEventType";
import { ButtonControlType } from "../src/constants/buttonControlType";
import { ButtonType } from "../src/constants/buttonType";
import { IconColors } from "../src/constants/iconColors";
import { LoaderSize } from "../src/constants/loaderSize";
import { Status } from "../src/constants/status";
import { LoaderType } from "../src/constants/loaderType";
import { DisplayContext } from "../src/constants/displayContext";
import { GroupDirection } from "../src/constants/groupDirection";
import { RadioButtonsDisplay } from "../src/constants/radioButtonsDisplay";
import { MenuPosition } from "../src/constants/menuPosition";
import { BadgeColor } from "../src/constants/badgeColor";
import { BadgeType } from "../src/constants/badgeType";
import { RecommendedBadgeType } from "../src/constants/recommendedBadgeType";
import { RecommendationLevel } from "../src/constants/recommendationLevel";
import { SortOrder } from "../src/constants/sortOrder";
import { ToastType } from "../src/constants/toastType";
import { initialize } from "../src/main";
import { ValidationRule } from "../src/models/validationRule";
import { ModalSize } from "../src/constants/modalSize";
import { DatepickerPopoverPosition } from "../src/constants/datepickerPopoverPosition";
import { DIVIDER_TOKEN } from "../src/constants/dividerToken";
import { CardBackgroundColor } from "../src/constants/cardBackgroundColor";
import { CardType } from "../src/constants/cardType";
import { TimeInterval } from "../src/constants/timeInterval";
import { CounterBadgeSize } from "../src/constants/counterBadgeSize";
import { SwitchLabelPosition } from "../src/constants/switchLabelPosition";
import { TimelineEventState } from "../src/constants/timelineEventState";
import { TimelineType } from "../src/constants/timelineType";

import ToastDocExample from "./components/ToastDocExample.vue"
import ModalDocExample from "./components/ModalDocExample.vue"
import TokenColorGrid from "./components/TokenColorGrid.vue"
import TokenSpacingScale from "./components/TokenSpacingScale.vue"
import TokenTypographyScale from "./components/TokenTypographyScale.vue"
import TokenShadowShowcase from "./components/TokenShadowShowcase.vue"
import TokenRadiusShowcase from "./components/TokenRadiusShowcase.vue"
import TokenPlayground from "./components/TokenPlayground.vue"
import tokenManifest from "./token-manifest.json"
import { L2_COLOR_TOKENS } from "./token-data"

export default (app: App) => {
  Object.assign(app.config.globalProperties, {
      Colors,
      BackgroundColors,
      TabsType,
      IconSize,
      CounterBadgeSize,
      BannerType,
      TextAlignment,
      HeaderType,
      ButtonColor,
      ButtonSize,
      PopoverSize,
      PopoverHidingEventType,
      ButtonControlType,
      ButtonType,
      DrawerPosition,
      IconColors,
      LoaderSize,
      LoaderType,
      DisplayContext,
      GroupDirection,
      RadioButtonsDisplay,
      ModalRole,
      MenuPosition,
      BadgeColor,
      BadgeType,
      RecommendedBadgeType,
      RecommendationLevel,
      Status,
      SortOrder,
      ModalSize,
      ToastType,
      DatepickerPopoverPosition,
      DIVIDER_TOKEN,
      CardBackgroundColor,
      CardType,
      TimeInterval,
      ValidationRule,
      SwitchLabelPosition,
      TimelineEventState,
      TimelineType
  })

  app.directive("nck-info-tooltip", NckInfoTooltip);
  app.directive("nck-dialog-tooltip", NckDialogTooltip);

  app.component("modal-doc-example", ModalDocExample);
  app.component("toast-doc-example", ToastDocExample);

  // Token visualisation & playground components
  app.component("TokenColorGrid", TokenColorGrid);
  app.component("TokenSpacingScale", TokenSpacingScale);
  app.component("TokenTypographyScale", TokenTypographyScale);
  app.component("TokenShadowShowcase", TokenShadowShowcase);
  app.component("TokenRadiusShowcase", TokenRadiusShowcase);
  app.component("TokenPlayground", TokenPlayground);

  // Expose token manifest and L2 data for use in doc examples
  app.config.globalProperties.$tokenManifest = tokenManifest;
  app.config.globalProperties.L2_COLOR_TOKENS = L2_COLOR_TOKENS;

  initialize({
    translations: {
      datepickerCancel: "Cancel",
      datepickerDone: "Done",
      datepickerRangeTitle: "Select dates",
      datepickerSingleTitle: "Select date",
      information: "Information",
      success: "Success",
      warning: "Warning",
      error: "Error",
      close: "Close",
      nextPage: "Next page",
      previousPage: "Previous page",
      pagination: "Pagination",
      requiredField: "This field is required",
      recommendedPartnerTooltipHeader: "Recommended partner tooltip header",
      recommendedPartnerTooltipBody: "Recommended partner tooltip body",
      recommendedPartnerBadgeAltText: "Recommended partner badge alternative text",
      moreRecommendedPartnerBadgeAltText: "More recommended partner badge alternative text",
      mostRecommendedPartnerBadgeAltText: "Most recommended partner badge alternative text",
      modalConfirmDismissalTitle: "Your changes won’t be saved",
      modalConfirmDismissalMessage: "We won’t be able to save your data if you leave this page.",
      modalConfirmDismissalCancel: "Continue editing",
      modalConfirmDismissalConfirm: "Discard changes"
    },
    componentOptions: {
      datepicker: {
        weekdays: [ "S", "M", "T", "W", "T", "F", "S" ],
        months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        firstDayOfWeek: 1,
        dateFormat: "DD/MM/YYYY",
        dateFormatWording: "dd/mm/yyyy",
        timeFormat: "hh:mm (example: \"20:38\")",
        timeRangeNames: {
          allDay: "All day translation",
          morning: "Morning translation",
          afternoon: "Afternoon translation",
          evening: "Evening translation",
          night: "Night translation"
        },
        timeFormatter: (date: Date) => {
          return Intl.DateTimeFormat("fr-FR", { timeStyle: "short" }).format(date);
        },
        timeParser: (time: string) => {
          const parsedDate = Date.parse(`2024-01-01T${time}:00.000`);
          if (parsedDate) {
            return new Date(parsedDate);
          }
        }
      },
    },
    urls: {
      iconsURL: process.env.BRANCH_NAME ? "./" + process.env.BRANCH_NAME + "/icons/" : "./icons/"
    },
    utils: {
      translateAndFormat
    }
  });

  return app;
}

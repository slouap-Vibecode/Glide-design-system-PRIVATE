import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initialize } from "@neotechnologygroup/neo-component-kit";
import { generateNeoIconsPromiseMap } from "@neotechnologygroup/neo-icon-kit/preloadedIcons";

import "@neotechnologygroup/neo-component-kit/dist/neo-component-kit.css";
import "./styles/main.css";

import { translateAndFormat } from "./helpers/translationAndFormattingHelper";
const hash = window.location.hash;
const param = "?lang=";
let lang = null;
if (hash) {
  const paramIdx = hash.indexOf(param);
  if (paramIdx > 0) {
    lang = hash.substring(paramIdx + param.length);
  }
}
let datepickerOptions: {
  weekdays: [ string, string, string, string, string, string, string ];
  months: [ string, string, string, string, string, string, string, string, string, string, string, string ];
  firstDayOfWeek: number;
  dateFormat?: string;
  dateFormatWording?: string;
  timeFormat?: string;
  timeFormatter?: (date: Date) => string;
  timeParser?: (time: string) => Date | null;
  timeRangeNames?: {
    allDay?: string;
    morning?: string;
    afternoon?: string;
    evening?: string;
    night?: string;
  };
};
switch (lang) {
  case "en-US":
    datepickerOptions = {
      weekdays: [ "S", "M", "T", "W", "T", "F", "S" ],
      months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
      firstDayOfWeek: 0,
      dateFormat: "MM-DD-YYYY",
      timeFormat: "h h mm",
      timeRangeNames: {
        allDay: "All day translation",
        morning: "Morning translation",
        afternoon: "Afternoon translation",
        evening: "Evening translation",
        night: "Night translation"
      },
      timeFormatter: (date: Date) => {
        return `${String(date.getHours())} h ${String(date.getMinutes()).padStart(2, "0")}`;
      },
      timeParser: (time: string) => {
        const timeWithColonSeparator = time.replace(" h ", ":");
        const parsedDate = Date.parse(`2024-01-01T${timeWithColonSeparator}:00.000`);
        if (parsedDate) {
          return new Date(parsedDate);
        }
        return null;
      }
    };
    break;
  case "ro":
    datepickerOptions = {
      weekdays: [ "D", "L", "M", "M", "J", "V", "S" ],
      months: [ "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie" ],
      firstDayOfWeek: 1,
      dateFormat: "DD/MM/YYYY",
      dateFormatWording: "zz/ll/aaaa",
      timeFormat: "HH:mm",
      timeRangeNames: {
        allDay: "Toată ziua",
        morning: "Dimineaţă",
        afternoon: "După-amiază",
        evening: "Seară",
        night: "Noapte"
      },
      timeFormatter: (date: Date) => {
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      },
      timeParser: (time: string) => {
        const parsedDate = Date.parse(`2024-01-01T${time}:00.000`);
        if (parsedDate) {
          return new Date(parsedDate);
        }
        return null;
      }
    };
    break;
  default: // en-GB
    datepickerOptions = {
      weekdays: [ "S", "M", "T", "W", "T", "F", "S" ],
      months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
      firstDayOfWeek: 1,
      dateFormat: "DD/MM/YYYY",
      dateFormatWording: "dd/mm/yyyy",
      timeFormat: "hh:mm A",
      timeRangeNames: {
        allDay: "All day translation",
        morning: "Morning translation",
        afternoon: "Afternoon translation",
        evening: "Evening translation",
        night: "Night translation"
      },
      timeFormatter: (date: Date) => {
        if (date.getHours() > 11) {
          return `${String((date.getHours() - 12) === 0 ? 12 : (date.getHours() - 12)).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} PM`;
        } else {
          return `${String(date.getHours() === 0 ? 12 : date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} AM`;
        }
      },
      timeParser: (time: string) => {
        const meridiemSign = time.includes("AM") ? "AM" : time.includes("PM") ? "PM" : null;
        const timeWithoutMeridiemSign = time.replace(" AM", "").replace(" PM", "");
        const parsedDate = Date.parse(`2024-01-01T${timeWithoutMeridiemSign}:00.000`);
        if (parsedDate) {
          const finalDate = new Date(parsedDate);
          if (meridiemSign === "AM" && finalDate.getHours() === 12) {
            finalDate.setHours(0);
          }
          if (meridiemSign === "PM" && finalDate.getHours() !== 12) {
            finalDate.setHours(finalDate.getHours() + 12);
          }
          return finalDate;
        }
        return null;
      }
    };
}

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
    requiredField: "This field is mandatory",
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
    datepicker: datepickerOptions
  },
  utils: {
    translateAndFormat
  },
  urls: {
    iconsURL: "./icons/"
  }
});

const app = createApp(App);
app.use(router);
window.neoIconsPromiseMap = generateNeoIconsPromiseMap("./icons/");

app.config.performance = true;

app.mount("#app");

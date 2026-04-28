import { IDateWithRange } from "@/models/iDateWithRange";
import { GlobalOptionsProvider } from "./globalOptionsProvider";
import { ITime } from "@/models/iTime";

export function getFormattedTime(dateWithRange: IDateWithRange | ITime | null) {
  if (dateWithRange) {
    const timeFormatter = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter;
    let dateTime = null;
    if (Object.hasOwn(dateWithRange, "date")) {
      dateTime = (dateWithRange as IDateWithRange).date;
    } else if (Object.hasOwn(dateWithRange, "time")) {
      dateTime = (dateWithRange as ITime).time;
    } else {
      return "";
    }

    if (timeFormatter && dateTime) {
      let timeString = "";
      if (dateWithRange.range !== 0) {
        timeString = getTimeRangeLabel(dateTime.getHours(), dateWithRange.range) ?? "";
      } else {
        timeString = timeFormatter(dateTime);
      }
      return timeString;
    }
  }
  return "";
}

// eslint-disable-next-line complexity
function getTimeRangeLabel(hour: number, range: number) {
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  if (range === 12 && hour === 12) {
    return timeRangeNames?.allDay;
  } else if (range === 3) {
    switch (hour) {
      case 3:
        return timeRangeNames?.night;
      case 9:
        return timeRangeNames?.morning;
      case 15:
        return timeRangeNames?.afternoon;
      case 21:
        return timeRangeNames?.evening;
    }
  }
}

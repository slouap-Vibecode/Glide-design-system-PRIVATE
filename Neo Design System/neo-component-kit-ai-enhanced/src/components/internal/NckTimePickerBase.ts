import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { IAutocompleteItem, TimeInterval } from "@/main";

export function getTimeOptions(
  timeInterval: TimeInterval,
  withFlexibleTime: boolean,
  withTimeRange: boolean,
): IAutocompleteItem[] {
  const values: IAutocompleteItem[] = [];
  const timeFormatter = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter;
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  for (let i = 0; i < 24 * 60; i += timeInterval) {
    const currentTime = new Date(0);
    currentTime.setHours(Math.floor(i / 60));
    currentTime.setMinutes(i % 60);
    if (timeFormatter) {
      values.push({ label: timeFormatter(currentTime), value: { time: currentTime, range: 0 } });
    }
  }
  if (withFlexibleTime) {
    const currentTime = new Date(0);
    currentTime.setHours(12);
    values.push({ label: timeRangeNames?.allDay ?? "", value: { time: currentTime, range: 12 } });
  }

  if (withTimeRange) {
    values.push(getNightValue());
    values.push(getMorningValue());
    values.push(getAfternoonValue());
    values.push(getEveningValue());
  }
  return values;
}

// eslint-disable-next-line complexity
export function checkPrerequisitesForTimePicker(withFlexibleTime?: boolean, withTimeRange?: boolean) {
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  if (typeof GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter !== "function") {
    throw new Error(
      "Error in NckDatePicker: you need to provide a timeFormatter function when using the 'withTime' option of date picker",
    );
  }
  if (!GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormat) {
    throw new Error(
      "Error in NckDatePicker: you need to provide a timeFormat pattern when using the 'withTime' option of date picker",
    );
  }
  if (typeof GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeParser !== "function") {
    throw new Error(
      "Error in NckDatePicker: you need to provide a timeParser function when using the 'withTime' option of date picker",
    );
  }
  if (!timeRangeNames?.allDay && withFlexibleTime) {
    throw new Error(
      "Error in NckDatePicker: you need to provide a translation for timeRangeNames.allDay when using the 'withFlexibleTime' option",
    );
  }
  if (
    !timeRangeNames?.morning &&
    !timeRangeNames?.afternoon &&
    !timeRangeNames?.evening &&
    !timeRangeNames?.night &&
    withTimeRange
  ) {
    throw new Error(
      "Error in NckDatePicker: you need to provide a translation for timeRangeNames.morning, timeRangeNames.afternoon, timeRangeNames.evening and timeRangeNames.night when using the 'withFlexibleTime' option",
    );
  }
}

function getRangeObject(startHour: number, label: string) {
  const timeFormatter = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter;
  let sublabel = "";
  const midnight = new Date(0);
  midnight.setHours(startHour);
  const three = new Date(0);
  three.setHours(startHour + 3);
  const six = new Date(0);
  six.setHours(startHour + 6);
  if (timeFormatter) {
    sublabel = `${timeFormatter(midnight)} - ${timeFormatter(six)}`;
  }
  return { label, subLabel: sublabel, value: { time: three, range: 3 } };
}

function getNightValue() {
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  return getRangeObject(0, timeRangeNames?.night ?? "");
}

function getMorningValue() {
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  return getRangeObject(6, timeRangeNames?.morning ?? "");
}

function getAfternoonValue() {
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  return getRangeObject(12, timeRangeNames?.afternoon ?? "");
}

function getEveningValue() {
  // unfortunatly "evening" doesn't follow exactly the same by ending at 23:59 instead of mdignight.
  const timeRangeNames = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeRangeNames;
  const timeFormatter = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter;
  let sublabel = "";
  const eighteen = new Date(0);
  eighteen.setHours(18);
  const twentyOne = new Date(0);
  twentyOne.setHours(21);
  const midnight = new Date(0);
  midnight.setHours(23);
  midnight.setMinutes(59);
  if (timeFormatter) {
    sublabel = `${timeFormatter(eighteen)} - ${timeFormatter(midnight)}`;
  }
  return { label: timeRangeNames?.evening ?? "", subLabel: sublabel, value: { time: twentyOne, range: 3 } };
}

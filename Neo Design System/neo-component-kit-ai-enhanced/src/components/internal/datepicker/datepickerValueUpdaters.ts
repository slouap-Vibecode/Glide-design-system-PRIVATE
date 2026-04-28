import { IDateWithRange } from "@/models/iDateWithRange";
import { ITime } from "@/models/iTime";

export function getDatepickerValue(
  dateValues: [IDateWithRange | Date | null | undefined, IDateWithRange | Date | null | undefined],
  timeValues?: [ITime | null, ITime | null],
): [IDateWithRange | Date | null | undefined, IDateWithRange | Date | null | undefined] {
  if (timeValues) {
    updateDateWithTime(dateValues, timeValues);

    const mappedValues = dateValues.map((date, idx) => {
      if (date === null || date === undefined) {
        return date;
      } else if (date instanceof Date) {
        const result: IDateWithRange = { date, range: timeValues[idx]?.range ?? 0 };
        return result;
      } else if (date?.date) {
        const result: IDateWithRange = { date: date?.date, range: timeValues[idx]?.range ?? 0 };
        return result;
      }
      return null;
    });
    return [mappedValues[0], mappedValues[1]];
  } else {
    return dateValues;
  }
}

function updateDateWithTime(
  dateValues: [IDateWithRange | Date | null | undefined, IDateWithRange | Date | null | undefined],
  timeValues: [ITime | null, ITime | null],
) {
  dateValues.forEach((dateWithRange, idx) => {
    if (dateWithRange) {
      const time = timeValues[idx]?.time;
      if (dateWithRange instanceof Date && time) {
        dateWithRange.setHours(time.getHours());
        dateWithRange.setMinutes(time.getMinutes());
      } else if (time && (dateWithRange as IDateWithRange).date) {
        (dateWithRange as IDateWithRange).date.setHours(time.getHours());
        (dateWithRange as IDateWithRange).date.setMinutes(time.getMinutes());
      }
    }
  });
}

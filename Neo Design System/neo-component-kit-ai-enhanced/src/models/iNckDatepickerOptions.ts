export interface IDatepickerOptions {
  weekdays: [string, string, string, string, string, string, string];
  months: [string, string, string, string, string, string, string, string, string, string, string, string];
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
}

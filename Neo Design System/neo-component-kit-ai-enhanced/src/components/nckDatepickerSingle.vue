<template>
  <NckDatepickerRange
    ref="datepickerRef"
    v-bind="props"
    v-model="internalDates"
    :isRange="false"
    :startRangeName="name"
    :endRangeName="'none'"
    :startRangeLabel="label"
    :endRangeLabel="'none'"
    :startRangeRules="rules"
    :startTimeLabel="timeLabel"
    :startTimeName="timeName"
    :endTimeLabel="'none'"
    :endTimeName="'donteverusethisfield'"
    :startTimeClearButtonAltText="timeClearButtonAltText"
    :endTimeClearButtonAltText="'donteverusethisfield'"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { INckDatepickerExposed } from "./interfaces/iNckDatepicker";
import NckDatepickerRange from "@/components/nckDatepickerRange.vue";
import { IDatepickerCommonProperties } from "./interfaces/internal/iDatepickerCommonProperties";
import { IDatepickerPopover } from "./interfaces/internal/iDatepickerPopover";
import { IFormFieldWithValidationAndCustomRulesProps } from "./interfaces/internal/iFormFieldWithValidationAndCustomRulesProps";
import { IDateWithRange } from "@/models/iDateWithRange";
import { DatepickerPopoverPosition } from "@/constants/datepickerPopoverPosition";
import { TimeInterval } from "@/constants/timeInterval";

/**
 * @component
 * @displayName nck-datepicker-single
 * Datepicker component allowing selection of a single date.
 *
 * For selecting a range of dates, please refer to the [nck-datepicker-range](#nckdatepickerrange) component.
 *
 * Please refer to the [nck-datepicker-range](#nckdatepickerrange) documentation for additional information on Accessibility and PREREQUISITES.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - Same as [nck-datepicker-range](#nckdatepickerrange), except you don't need to define datepickerRangeTitle if you don't use the nck-datepicker-range.
 *  - datepickerTitle : title for the modal (DEPRECATED, datepickerSingleTitle should be used instead).
 *  - datepickerSingleTitle : title for the modal.
 */

interface Props extends IDatepickerCommonProperties, IDatepickerPopover, IFormFieldWithValidationAndCustomRulesProps {
  /**
   * Name for the date html input.
   */
  name: string;

  /**
   * Label for the date.
   */
  label: string;

  /**
   * Label for the time picker.
   */
  timeLabel?: string;

  /**
   * *Required* when using "withTime" option. Name for the time picker input, only used with the "withTime" option.
   */
  timeName?: string;

  /**
   * *Required* when using "withTime" option. The text alternative for the input clearing button for the time picker. Only used in Date & Time picker (with "withTime" option).
   */
  timeClearButtonAltText?: string;

  /**
   * The v-model for the date.
   * It accepts Date or null value when used in Date only (withTime absent or false).
   * In case of usage as a Date & Time picker (withTime being true or present), it takes an object implementing IDateWithRange { date: Date, range: 0 | 3 | 12 } or null.
   * A null value has the meaning of an unset date.
   */
  modelValue?: IDateWithRange | Date | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  popoverPosition: DatepickerPopoverPosition.LEFT,
  ignoreParentOverflow: false,
  timeInterval: TimeInterval.ONE_HOUR,
});

const emit = defineEmits<{
  /**
   * Emitted when value is modified. This component supports "v-model" pattern.
   * @param {IDateWithRange} value the date formatted with time range when used with time picker
   */
  (event: "update:modelValue", value: IDateWithRange | Date | null | undefined): void;
}>();

const datepickerRef = ref<InstanceType<typeof NckDatepickerRange> | null>(null);

defineExpose<INckDatepickerExposed>({
  /**
   * @public
   * Focuses the date trigger
   */
  focus,

  /**
   * @public
   * Return validity of the current input.
   * Be careful if the input has been modified programmatically then you need to validate again.
   * Use 'validate' method
   * @returns true if valid, false otherwise
   */
  isValid,

  /**
   * @public
   * Validate the current date input value.
   * @returns Promise resolving to true if the value is valid and to false otherwise
   */
  validate,
  isValidationEnabled,
});

function focus() {
  datepickerRef.value?.focus();
}

function isValid() {
  return datepickerRef.value?.isValid() ?? true;
}

async function validate(): Promise<boolean> {
  return datepickerRef.value?.validate() ?? true;
}

function isValidationEnabled() {
  return datepickerRef.value?.isValidationEnabled() ?? false;
}

const internalDates = computed({
  get(): [typeof props.modelValue, null] {
    return [props.modelValue, null];
  },
  set(newValue: [IDateWithRange | Date | null | undefined, IDateWithRange | Date | null | undefined]) {
    emit("update:modelValue", newValue[0]);
  },
});
</script>

<docs>
A datepicker with a single date as a model, along with the label corresponding to this date.
The datepicker opens in a modal or in a popover, depending on resolution.
The calendar displays two months side by side when displayed in popover and one month in case where it is displayed inside a modal.
The months are navigable but not the years.
```js
const date = null;
<nck-datepicker-single
  v-model="date"
  name="dateInput"
  label="Date"
/>
```
The default behavior is to accept an empty value. The "required" param disallows that.
```js
const date = null;
<nck-datepicker-single
  required
  v-model="date"
  name="dateInput"
  label="Date"
/>

<button @click="validateEx">validate</button>
```
The default position of the popover is on the left. Right placement is also possible.
```js
const date = new Date("2022-06-05T01:00:00");
<nck-datepicker-single
  :popoverPosition="DatepickerPopoverPosition.RIGHT"
  v-model="date"
  name="dateInput"
  label="Date"
/>
```
It's possible to specify an allowed range for dates, outside of which date selection is disabled.
```js
const date = null;
const november10th = new Date("2022-11-10T00:00:00");
const inOneWeek = new Date();
inOneWeek.setDate(inOneWeek.getDate()+7);
inOneWeek.setHours(0,0,0);
<nck-datepicker-single
  v-model="date"
  name="dateInput"
  label="Date"
  :minDateAllowed="november10th"
  :maxDateAllowed="inOneWeek"
  beforeMinDateErrorMessage="You should select a date after November 10th 2022"
  afterMaxDateErrorMessage="The date should be selected within one week from today"
/>
```

A datepicker can also have a time picker to select hours.
```js
const date = null;
<nck-datepicker-single
  v-model="date"
  withTime
  name="dateInput"
  label="Date"
  timeLabel="Time"
  timeClearButtonAltText="Clear time field"
/>

value: {{date}}
```

Time picker can also have ranges. Ranges are predefined hours ranges.
You can also prefill it with your value. Time is in the user's browser timezone.
```js
const date = { "date": new Date("2023-06-22T09:00:00.000"), "range": 3 };
<nck-datepicker-single
  v-model="date"
  withTime
  withTimeRange
  withFlexibleTime
  name="dateInput"
  label="Date"
  timeLabel="Time"
  timeClearButtonAltText="Clear time field"
/>

value: {{date}}
```
</docs>

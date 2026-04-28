<template>
  <div
    class="nck-datepicker-internal"
    :class="{
      'within-modal': isWithinModal,
      'within-popover': isWithinPopover,
      'single-date': !genericProps.isRange,
      'with-timepicker': genericProps.withTime && !isWithinModal,
    }"
    ref="rootRef"
  >
    <div class="datepicker-dates">
      <div class="date-group">
        <NckTextInput
          ref="startInputRef"
          :name="genericProps.startRangeName"
          class="datepicker-date"
          :label="startRangeDisplayLabel"
          :required="genericProps.required"
          :rules="startInputRules"
          v-model="displayedTextValues[0]"
          inputAttributeAutocomplete="off"
          :validationMode="ValidationMode.PASSIVE"
          :additionalDescribedBy="dateFormatExplanationId"
          @input-focused="onStartInputFocused()"
          @input-blurred="onStartInputBlurred()"
          @enter-key-pressed="onInputEnterKeyPressed($event)"
        />
        <NckTimePicker
          v-if="
            genericProps.withTime &&
            isWithinPopover &&
            genericProps.startTimeLabel &&
            genericProps.timeInterval &&
            genericProps.startTimeClearButtonAltText
          "
          ref="startTimePickerRef"
          class="timepicker"
          :modelValue="timeValues[0]"
          :label="genericProps.startTimeLabel"
          :name="genericProps.startTimeName"
          :required="genericProps.required"
          :timeInterval="genericProps.timeInterval"
          :withTimeRange="genericProps.withTimeRange"
          :withFlexibleTime="genericProps.withFlexibleTime"
          :rules="startTimeValidationRule"
          :additionalDescribedBy="timeFormatExplanationId"
          :clearButtonAltText="genericProps.startTimeClearButtonAltText"
          :isWithinModal="false"
          @update:model-value="updateStartTime"
        />
      </div>
      <div class="date-group" v-if="genericProps.isRange">
        <NckTextInput
          ref="endInputRef"
          :name="genericProps.endRangeName"
          class="datepicker-date"
          :label="endRangeDisplayLabel"
          :required="genericProps.required"
          :rules="endInputRules"
          v-model="displayedTextValues[1]"
          inputAttributeAutocomplete="off"
          :validationMode="ValidationMode.PASSIVE"
          :additionalDescribedBy="dateFormatExplanationId"
          @input-focused="onEndInputFocused()"
          @input-blurred="onEndInputBlurred()"
          @enter-key-pressed="onInputEnterKeyPressed($event)"
        />
        <NckTimePicker
          v-if="
            genericProps.withTime &&
            isWithinPopover &&
            genericProps.endTimeLabel &&
            genericProps.timeInterval &&
            genericProps.endTimeClearButtonAltText
          "
          ref="endTimePickerRef"
          class="timepicker"
          :modelValue="timeValues[1]"
          :label="genericProps.endTimeLabel"
          :name="genericProps.endTimeName"
          :required="genericProps.required"
          :timeInterval="genericProps.timeInterval"
          :withTimeRange="genericProps.withTimeRange"
          :withFlexibleTime="genericProps.withFlexibleTime"
          :rules="endTimeValidationRule"
          :additionalDescribedBy="timeFormatExplanationId"
          :clearButtonAltText="genericProps.endTimeClearButtonAltText"
          :isWithinModal="false"
          @update:model-value="updateEndTime"
        />
      </div>
    </div>
    <div class="calendar-trigger" aria-hidden="true">
      <input ref="calendarTriggerInput" type="text" tabindex="-1" v-model="hiddenTextValue" />
    </div>
  </div>
</template>

<style lang="less">
// This is where Flatpickr classes are overridden
// The calendar is dynamically displayed, and Vue 2.x won't add the vid's, so importing it in the scoped style section wouldn't work
// It is scoped with "nck-datepicker-internal" class as its root
@import "@/styles/datepickerCustomTheme.less";
</style>

<style scoped lang="less">
@import (reference) "@/styles/breakpointsVariables.less";
@import (reference) "@/styles/colorsVariables.less";
@import (reference) "@/styles/sizeVariables.less";

@calendar-size: 50rem;
@middle-space: 2.5rem;
@internal-paddings: 1rem;
.nck-datepicker-internal {
  .datepicker-dates {
    display: flex;
    @media @tablet, @phone {
      flex-direction: column;
    }
    .date-group {
      display: flex;
      @media @tablet, @phone {
        flex: 1;
      }
    }
    .datepicker-date {
      display: inline-block;
      flex: 1;
    }
    @media @desktop {
      .date-group:first-child {
        margin-right: 1rem;
      }
    }
  }

  .calendar-trigger input {
    display: none;
  }

  &.within-popover {
    width: @calendar-size;
    .datepicker-dates {
      padding: @internal-paddings;
      border-bottom: var(--nck-border-width-s) solid var(--nck-border-neutral);
      .datepicker-date {
        width: 15rem;
      }
    }
    .calendar-trigger {
      display: flex;
      flex-direction: column;
    }

    &.single-date {
      .date-group {
        width: 50%;
        margin-right: @middle-space;
      }
    }
  }

  &.within-modal {
    .datepicker-date {
      @media @tablet {
        width: 50%;
      }
      margin-bottom: 1rem;
    }

    &.single-date {
      .datepicker-date {
        width: 100%;
        margin-right: 0;
      }
    }
  }

  &.with-timepicker.within-popover {
    .date-group {
      width: calc((@calendar-size / 2) - (@middle-space / 2) - @internal-paddings);
      &:first-child {
        margin-right: @middle-space;
      }
    }
    .datepicker-dates {
      .datepicker-date {
        flex: 1 1 0rem;
        margin-right: 1rem;
      }
      .timepicker {
        flex: 1;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import { useForm } from "vee-validate";
import NckTextInput from "@/components/nckTextInput.vue";
import NckTimePicker from "../NckTimePicker.vue";
import flatpickr from "flatpickr";
import { DatepickerFormatHelper } from "@/controllers/datepickerFormatHelper";
import { DatepickerContext } from "@/models/datepickerContext";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ValidationRule } from "@/models/validationRule";
import { CustomLocale } from "flatpickr/dist/types/locale";
import { ValidationMode } from "@/constants/validation/validationMode";
import { DatepickerFacadeHelper } from "@/helpers/datepickerFacadeHelper";
import { ITime } from "@/models/iTime";
import { getDatepickerValue } from "./datepickerValueUpdaters";
import { useDatepickerContext } from "@/composables/useDatepickerContext";
import { IDateWithRange } from "@/models/iDateWithRange";
import { getErrorMessageOrKill } from "./datepickerErrorsHelpers";

const RANGE_SEPARATOR = " to ";

interface Props {
  context?: DatepickerContext;
  twoMonthDisplay?: boolean;
  timeValues: [ITime | null, ITime | null];
  dateFormatExplanationId?: string;
  timeFormatExplanationId?: string;
  modelValue: [IDateWithRange | Date | null | undefined, IDateWithRange | Date | null | undefined];
}

const props = withDefaults(defineProps<Props>(), {
  context: DatepickerContext.DEFAULT,
  twoMonthDisplay: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", payload: unknown): void;
  (event: "update:timeValues", payload: Array<ITime | null>): void;
}>();

const { injectDatepickerContext } = useDatepickerContext();
const genericProps = injectDatepickerContext();
const picker = ref<flatpickr.Instance | null>(null);
const dateFormatReminder = ` (${DatepickerFormatHelper.getInstance().getDateFormat()})`;
const internalDates = ref<[Date | null | undefined, Date | null | undefined]>([null, null]);
const displayedTextValues = ref<string[]>(["", ""]);
const hiddenTextValue = ref<string>("");
const startDateBeingPicked = ref<Date | null>(null);
const startInputFocused = ref<boolean>(false);
const endInputFocused = ref<boolean>(false);
const clickingOnDay = ref<boolean>(false); // true if user is clicking on a calendar day
const locale: flatpickr.CustomLocale = buildLocale();
const startInputRules = ref<ValidationRule[]>([]);
const endInputRules = ref<ValidationRule[]>([]);
const dateFormatErrorMessage = ref<string>("");
const datesOrderForStartDateErrorMessage = ref<string>("");
const datesOrderForEndDateErrorMessage = ref<string>("");
const datesOrderForStartTimeErrorMessage = ref<string>("");
const datesOrderForEndTimeErrorMessage = ref<string>("");
let notifyStartClickingOnDay: () => void = () => undefined;
let notifyStopClickingOnDay: () => void = () => undefined;

const rootRef = ref<HTMLElement | null>(null);
const form = useForm();
const calendarTriggerInput = ref<HTMLInputElement | null>(null);
const startInputRef = ref<InstanceType<typeof NckTextInput>>();
const endInputRef = ref<InstanceType<typeof NckTextInput>>();
const startTimePickerRef = ref<InstanceType<typeof NckTimePicker>>();
const endTimePickerRef = ref<InstanceType<typeof NckTimePicker>>();
const inputsRef = {
  startInputRef,
  endInputRef,
  startTimePickerRef,
  endTimePickerRef,
};

function focusStartDateInput() {
  focusInput("startInputRef");
}

/**
 * @public
 * Sets the focus on the end date input.
 */
function focusEndDateInput() {
  focusInput("endInputRef");
}

/**
 * @public
 * Sets the focus on the start time input.
 */
function focusStartTimeInput() {
  focusInput("startTimePickerRef");
}

/**
 * @public
 * Sets the focus on the end time input.
 */
function focusEndTimeInput() {
  focusInput("endTimePickerRef");
}

/**
 * @public
 * Checks whether the two date inputs are valid
 */
function isValid() {
  if (form.errors.value) {
    const errors = form.errors.value;
    for (const key in errors) {
      const errorValue = errors[key];

      if (errorValue && errorValue.length > 0) {
        return false;
      }
    }
  }
  return true;
}

defineExpose({
  /**
   * @public
   * Sets the focus on the start date input.
   */
  focusStartDateInput,
  validateWithFocusOnErrorField,
  /**
   * @public
   * When dismissing popover, prevents the calendar from staying visible during fade out (NCK-838)
   */
  temporarilyForceCalendarToHide,
  /**
   * @public
   * Syncs the dates according to the text field values
   * Wasn't initially public, but used in the context of validating on popover dismiss (NCK-1183),
   * to be sure to have the correct dates if a field was changed and focused just before dismiss.
   * @param clickedOutside handles specifically the click outside popover dismissal case, for which a half-filled range should be updated as-is (TRV3-1315).
   */
  updateInternalDatesFromDisplayedTextValues,
});

async function validateWithFocusOnErrorField(
  afterValidate: (newDates: [Date | null | undefined, Date | null | undefined]) => void,
) {
  const validation = await form.validate();
  if (validation) {
    if (validation.valid) {
      afterValidate.apply({}, [internalDates.value]);
    } else {
      if (validation.results) {
        for (const key in validation.results) {
          if (focusFieldOnError(key, validation.results[key]?.valid ?? false)) {
            break;
          }
        }
      }
    }
  }
}

function temporarilyForceCalendarToHide() {
  const calendarEl = picker.value?.calendarContainer;
  if (calendarEl) {
    calendarEl.style.visibility = "hidden";
    setTimeout(() => {
      calendarEl.style.visibility = "visible";
    }, 400);
  }
}

function updateInternalDatesFromDisplayedTextValues(clickedOutside = false) {
  const start = formattedDisplayedStartDate.value ?? null;
  const end = genericProps.isRange && formattedDisplayedEndDate.value ? formattedDisplayedEndDate.value : null;
  // In "range" mode, if either date is not parseable, we shouldn't present any date to the calendar.
  // In "single" mode, only the start date should be presented to the calendar.
  updateInternalDates(start, end, clickedOutside);
  setDate(internalDates.value);
  // When partial selection in "range" mode, or date selection in "single" mode,
  // we'll still position the calendar to the month the user entered.
  const dateToJump = start ?? end;
  if (picker.value && dateToJump && !(start && end)) {
    picker.value.jumpToDate(dateToJump);
  }
}

const startRangeDisplayLabel = computed(() => {
  return startInputFocused.value && isWithinModal.value
    ? `${genericProps.startRangeLabel}${dateFormatReminder}`
    : genericProps.startRangeLabel;
});

const endRangeDisplayLabel = computed(() => {
  return endInputFocused.value && isWithinModal.value
    ? `${genericProps.endRangeLabel}${dateFormatReminder}`
    : genericProps.endRangeLabel;
});

const isWithinModal = computed(() => {
  return props.context === DatepickerContext.MODAL;
});

const isWithinPopover = computed(() => {
  return props.context === DatepickerContext.POPOVER;
});

const formattedInternalStartDate = computed(() => {
  return DatepickerFormatHelper.getInstance().formatInternal(internalDates.value[0]);
});

const formattedInternalEndDate = computed(() => {
  return DatepickerFormatHelper.getInstance().formatInternal(internalDates.value[1]);
});

const formattedDisplayedStartDate = computed(() => {
  return DatepickerFormatHelper.getInstance().parseExternal(displayedTextValues.value[0]);
});

const formattedDisplayedEndDate = computed(() => {
  return DatepickerFormatHelper.getInstance().parseExternal(displayedTextValues.value[1]);
});

const startTimeValidationRule = computed(() => {
  return [
    new ValidationRule(() => {
      return (
        !isSameDay(displayedTextValues.value[0], displayedTextValues.value[1]) ||
        validateDateOrder(displayedTextValues.value[0], displayedTextValues.value[1])
      );
    }, datesOrderForStartTimeErrorMessage.value),
    ...(genericProps.minDateAllowed ? [beforeMinDateValidationRule(0)] : []),
    ...(genericProps.maxDateAllowed ? [afterMaxDateValidationRule(0)] : []),
  ];
});

const endTimeValidationRule = computed(() => {
  return [
    new ValidationRule(() => {
      return (
        !isSameDay(displayedTextValues.value[0], displayedTextValues.value[1]) ||
        validateDateOrder(displayedTextValues.value[0], displayedTextValues.value[1])
      );
    }, datesOrderForEndTimeErrorMessage.value),
    ...(genericProps.minDateAllowed ? [beforeMinDateValidationRule(1)] : []),
    ...(genericProps.maxDateAllowed ? [afterMaxDateValidationRule(1)] : []),
  ];
});

function watchDates() {
  internalDates.value = props.modelValue.map((date) => {
    if (!date || date instanceof Date) {
      return date;
    } else {
      return date.date;
    }
  }) as [Date | null, Date | null];
}

// for some reason vue watch callback expect params to be optional (undefined type)
function watchInternalDates(
  next?: [Date | null | undefined, Date | null | undefined],
  prev?: [Date | null | undefined, Date | null | undefined],
) {
  /*
   * prevent unnecessary call when array has not changed;
   * https://github.com/vuejs/vue/issues/2164
   *
   * compare array by stringified values because javascript can't compare array by values but by references
   */
  if (JSON.stringify(next) === JSON.stringify(prev)) {
    return;
  }

  updateDisplayedTextValues();
  updateHiddenTextValue();
  setDate(internalDates.value);
}

function watchHiddenTextValue() {
  const hiddenValues = hiddenTextValue.value.split(RANGE_SEPARATOR, 2);
  hiddenValues.forEach((text, index) => {
    // We don't want reactivity of internalDates here
    internalDates.value[index] = DatepickerFormatHelper.getInstance().parseInternal(text);
  });
  if (hiddenValues.length === 1) {
    internalDates.value[1] = null;
  }
  if (isValid()) {
    updateDisplayedTextValues();
  }
}

function beforeMinDateValidationRule(timeInputIndex: number) {
  return new ValidationRule(
    () => {
      const date = DatepickerFormatHelper.getInstance().parseExternal(displayedTextValues.value[timeInputIndex]);
      return isMinDateRespected(date, props.timeValues[timeInputIndex]);
    },
    getErrorMessageOrKill(genericProps, "beforeMinDateErrorMessage"),
  );
}

function isMinDateRespected(date: Date | null | undefined, time: ITime | null | undefined) {
  if (genericProps.withTime) {
    if (date && time?.time) {
      date.setMinutes(time.time.getMinutes());
      date.setHours(time.time.getHours() + time.range);
    }
  }
  return !date || !!(genericProps.minDateAllowed && date.getTime() >= genericProps.minDateAllowed.getTime());
}

function afterMaxDateValidationRule(timeInputIndex: number) {
  return new ValidationRule(
    () => {
      const date = DatepickerFormatHelper.getInstance().parseExternal(displayedTextValues.value[timeInputIndex]);
      return isMaxDateRespected(date, props.timeValues[timeInputIndex]);
    },
    getErrorMessageOrKill(genericProps, "afterMaxDateErrorMessage"),
  );
}

function isMaxDateRespected(date: Date | null | undefined, time: ITime | null | undefined) {
  if (genericProps.withTime) {
    if (date && time?.time) {
      date.setMinutes(time.time.getMinutes());
      date.setHours(time.time.getHours() - time.range);
    }
  }
  return !date || !!(genericProps.maxDateAllowed && date.getTime() <= genericProps.maxDateAllowed.getTime());
}

function focusFieldOnError(fieldKey: string, fieldValid: boolean) {
  if (fieldKey === genericProps.startRangeName && !fieldValid) {
    focusStartDateInput();
    return true;
  } else if (fieldKey === genericProps.endRangeName && !fieldValid) {
    focusEndDateInput();
    return true;
  } else if (fieldKey === genericProps.startTimeName && !fieldValid) {
    focusStartTimeInput();
    return true;
  } else if (fieldKey === genericProps.endTimeName && !fieldValid) {
    focusEndTimeInput();
    return true;
  }
  return false;
}

function updateInternalDates(start: Date | null, end: Date | null, clickedOutside: boolean) {
  internalDates.value[0] = start && (!genericProps.isRange || clickedOutside || end) ? start : null;
  internalDates.value[1] = start && end ? end : null;
}

function setDate(dateValues: [Date | null | undefined, Date | null | undefined]) {
  if (dateValues[0] && !dateValues[1]) {
    // Keep track of the start date for when finishing selection (in case of backwards selection start date would be overridden)
    startDateBeingPicked.value = dateValues[0];
  }
  if (picker.value) {
    // Prepare variables for after the setDate() call
    const currentSelection = dateValues[1] ?? dateValues[0];
    const backwardsDatePicking = !!(
      dateValues[0] &&
      dateValues[1] &&
      startDateBeingPicked.value &&
      startDateBeingPicked.value.getTime() === dateValues[1].getTime() && // test backwards selection
      dateValues[0].getTime() !== dateValues[1].getTime() // don't include range with same date
    );
    const currentMonthBeforeSetDate = picker.value.currentMonth;
    // Now let's call setDate() but Flatpickr may shift the calendar to the left if the date currently being selected is on the second month
    picker.value.setDate(dateValues as Date[]);

    if (
      !backwardsDatePicking &&
      currentSelection &&
      currentMonthBeforeSetDate === getPreviousMonthIndex(currentSelection)
    ) {
      // check if selection on second month
      picker.value.jumpToDate(getPreviousMonthFirstDay(currentSelection)); // let's shift back, having the previous month become the current one as before
    } else if (backwardsDatePicking && dateValues[0]) {
      // [NCK-916] If selection is backwards we want to stay on the start date (last picked), instead of letting Flatpickr go back to the end date
      if (currentMonthBeforeSetDate === getPreviousMonthIndex(dateValues[0])) {
        // [NCK-941] here also, check if selection on second month
        picker.value.jumpToDate(getPreviousMonthFirstDay(dateValues[0])); // and revert shift to stay there
      } else {
        picker.value.jumpToDate(dateValues[0]);
      }
    }
  }
}

/* utility for setDate() */
function getPreviousMonthIndex(date: Date) {
  return date.getMonth() === 0 ? 11 : date.getMonth() - 1;
}

/* utility for setDate() */
function getPreviousMonthFirstDay(date: Date) {
  const previousMonthIndex = getPreviousMonthIndex(date);
  const previousMonthFirstDay = new Date(date.getTime());
  previousMonthFirstDay.setMonth(previousMonthIndex, 1);
  if (previousMonthIndex === 11) {
    previousMonthFirstDay.setFullYear(previousMonthFirstDay.getFullYear() - 1);
  }
  return previousMonthFirstDay;
}

function focusInput(inputRefKey: keyof typeof inputsRef) {
  const input = inputsRef[inputRefKey];
  void nextTick(() => input?.value?.focus());
}

function isSameDay(startDateText: string, endDateText: string): boolean {
  const startDate = DatepickerFormatHelper.getInstance().parseExternal(startDateText);
  const endDate = DatepickerFormatHelper.getInstance().parseExternal(endDateText);
  return !!(
    startDate &&
    endDate &&
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  );
}

function validateDateOrder(startDateText: string, endDateText: string) {
  const startDate = DatepickerFormatHelper.getInstance().parseExternal(startDateText);
  const endDate = DatepickerFormatHelper.getInstance().parseExternal(endDateText);
  if (genericProps.withTime) {
    if (startDate && props.timeValues[0]?.time) {
      startDate.setMinutes(props.timeValues[0].time.getMinutes());
      startDate.setHours(props.timeValues[0].time.getHours() - props.timeValues[0].range);
    }
    if (endDate && props.timeValues[1]?.time) {
      endDate.setMinutes(props.timeValues[1].time.getMinutes());
      endDate.setHours(props.timeValues[1].time.getHours() + props.timeValues[1].range);
    }
    return !startDate || !endDate || startDate.getTime() < endDate.getTime();
  } else {
    return !startDate || !endDate || startDate.getTime() <= endDate.getTime();
  }
}

function createStartDateInternalValidationRules() {
  startInputRules.value = [
    new ValidationRule(DatepickerFormatHelper.FORMAT_VALIDATOR, dateFormatErrorMessage.value),
    new ValidationRule((value: string) => {
      return (
        (Boolean(genericProps.withTime) &&
          isSameDay(value, displayedTextValues.value[1])) /* case caught by time picker */ ||
        validateDateOrder(value, displayedTextValues.value[1])
      );
    }, datesOrderForStartDateErrorMessage.value),
  ];
  if (genericProps.minDateAllowed) {
    startInputRules.value.push(getMinDateAllowedValidationRule());
  }
  if (genericProps.maxDateAllowed) {
    startInputRules.value.push(getMaxDateAllowedValidationRule());
  }
}

function createStartDateValidationRules() {
  createStartDateInternalValidationRules();
  (genericProps.startRangeRules ?? []).forEach((rule) => {
    startInputRules.value.push(
      new ValidationRule(
        // eslint-disable-next-line complexity
        (value: string, params) => {
          const startDate = DatepickerFormatHelper.getInstance().parseExternal(value);
          if (startDate && genericProps.withTime && props.timeValues[0]?.time) {
            startDate.setMinutes(props.timeValues[0].time.getMinutes());
            startDate.setHours(props.timeValues[0].time.getHours());
          }
          if (genericProps.isRange) {
            const endDate = DatepickerFormatHelper.getInstance().parseExternal(
              params ? params[genericProps.endRangeName] : null,
            );
            if (endDate && genericProps.withTime && props.timeValues[1]?.time) {
              endDate.setMinutes(props.timeValues[1].time.getMinutes());
              endDate.setHours(props.timeValues[1].time.getHours());
            }
            return genericProps.withTime
              ? rule.validator([
                  { date: startDate, range: props.timeValues[0]?.range ?? 0 },
                  { date: endDate, range: props.timeValues[1]?.range },
                ])
              : rule.validator([startDate, endDate]);
          } else {
            return genericProps.withTime
              ? rule.validator({ date: startDate, range: props.timeValues[0]?.range ?? 0 })
              : rule.validator(startDate);
          }
        },
        rule.errorMessage,
        genericProps.endRangeName,
      ),
    );
  });
}

function createEndDateInternalValidationRules() {
  endInputRules.value = [
    new ValidationRule(DatepickerFormatHelper.FORMAT_VALIDATOR, dateFormatErrorMessage.value),
    new ValidationRule((value: string) => {
      return (
        (Boolean(genericProps.withTime) &&
          isSameDay(displayedTextValues.value[0], value)) /* case caught by time picker */ ||
        validateDateOrder(displayedTextValues.value[0], value)
      );
    }, datesOrderForEndDateErrorMessage.value),
  ];
  if (genericProps.minDateAllowed) {
    endInputRules.value.push(getMinDateAllowedValidationRule());
  }
  if (genericProps.maxDateAllowed) {
    endInputRules.value.push(getMaxDateAllowedValidationRule());
  }
}

function createEndDateValidationRules() {
  if (!genericProps.isRange) {
    return;
  }
  createEndDateInternalValidationRules();
  (genericProps.endRangeRules ?? []).forEach((rule) => {
    endInputRules.value.push(
      new ValidationRule(
        (value: string, params) => {
          const startDate = DatepickerFormatHelper.getInstance().parseExternal(
            params ? params[genericProps.startRangeName] : null,
          );
          const endDate = DatepickerFormatHelper.getInstance().parseExternal(value);
          if (startDate && genericProps.withTime && props.timeValues[0]?.time) {
            startDate.setMinutes(props.timeValues[0].time.getMinutes());
            startDate.setHours(props.timeValues[0].time.getHours());
          }
          if (endDate && genericProps.withTime && props.timeValues[1]?.time) {
            endDate.setMinutes(props.timeValues[1].time.getMinutes());
            endDate.setHours(props.timeValues[1].time.getHours());
          }
          return genericProps.withTime
            ? rule.validator([
                { date: startDate, range: props.timeValues[0]?.range ?? 0 },
                { date: endDate, range: props.timeValues[1]?.range ?? 0 },
              ])
            : rule.validator([startDate, endDate]);
        },
        rule.errorMessage,
        genericProps.startRangeName,
      ),
    );
  });
}

function getMinDateAllowedValidationRule() {
  return new ValidationRule(
    (value: string) => {
      const date = DatepickerFormatHelper.getInstance().parseExternal(value);
      const todayAt2359 = new Date();
      todayAt2359.setHours(23);
      todayAt2359.setMinutes(59);
      return isMinDateRespected(date, { time: todayAt2359, range: 0 });
    },
    getErrorMessageOrKill(genericProps, "beforeMinDateErrorMessage"),
  );
}

function getMaxDateAllowedValidationRule() {
  return new ValidationRule(
    (value: string) => {
      const date = DatepickerFormatHelper.getInstance().parseExternal(value);
      const todayAt0000 = new Date();
      todayAt0000.setHours(0);
      todayAt0000.setMinutes(0);
      return isMaxDateRespected(date, { time: todayAt0000, range: 0 });
    },
    getErrorMessageOrKill(genericProps, "afterMaxDateErrorMessage"),
  );
}

function createValidationRules() {
  createStartDateValidationRules();
  createEndDateValidationRules();
}

function updateDisplayedTextValues() {
  internalDates.value.forEach((date, index) => {
    const nextValue = [...displayedTextValues.value];
    nextValue[index] = DatepickerFormatHelper.getInstance().formatExternal(date);
    displayedTextValues.value = nextValue;
  });
}

function updateHiddenTextValue() {
  const formattedDates: string[] = [];
  if (internalDates.value[0]) {
    formattedDates.push(formattedInternalStartDate.value);
  }
  if (internalDates.value[1]) {
    formattedDates.push(formattedInternalEndDate.value);
  }
  hiddenTextValue.value = formattedDates.join(RANGE_SEPARATOR);
}

function updateInternalDatesBeforeDayClick() {
  const previousValues = { ...form.values };
  form.resetForm({ values: previousValues });
  internalDates.value[0] = null;
  internalDates.value[1] = null;
}

function updateEndTime(time: ITime | null) {
  const newTimeValues = [props.timeValues[0], time];
  emit("update:timeValues", newTimeValues);
}

function updateStartTime(time: ITime | null) {
  const newTimeValues = [time, props.timeValues[1]];
  emit("update:timeValues", newTimeValues);
}

function onInputBlurred() {
  if (clickingOnDay.value) {
    // [NCK-854] This is a specific case for when the dates are about to be selected through clicking in the calendar
    // We'll empty the dates in preparation, and won't update the calendar immediately
    updateInternalDatesBeforeDayClick();
  } else {
    // This is the nominal case, updating calendar with the inputs content
    updateInternalDatesFromDisplayedTextValues();
  }
}

function onStartInputBlurred() {
  startInputFocused.value = false;
  onInputBlurred();
}

function onStartInputFocused() {
  startInputFocused.value = true;
}

function onInputEnterKeyPressed($event?: Event) {
  // Prevents potential form submission
  $event?.preventDefault();
  updateInternalDatesFromDisplayedTextValues();
}

function onEndInputBlurred() {
  endInputFocused.value = false;
  onInputBlurred();
}

function onEndInputFocused() {
  endInputFocused.value = true;
}

/* Flatpickr initialization */

function buildLocale(): CustomLocale {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  const datepickerOptions = globalOptions?.componentOptions?.datepicker;
  const facadeComponentName = DatepickerFacadeHelper.getFacadeComponentName(genericProps.isRange ?? false);
  if (!datepickerOptions) {
    throw new Error(
      `Error in ${facadeComponentName}: you must provide specific options to the neo-component-kit library to use the datepicker component. First create at the root of the configuration 'componentOptions' then 'componentOptions.datepicker'`,
    );
  }
  return {
    weekdays: {
      shorthand: datepickerOptions.weekdays,
      longhand: ["", "", "", "", "", "", ""],
    },
    months: {
      shorthand: ["", "", "", "", "", "", "", "", "", "", "", ""],
      longhand: datepickerOptions.months,
    },
    firstDayOfWeek: datepickerOptions.firstDayOfWeek,
  };
}

function buildOptions(): flatpickr.Options.Options {
  const options: flatpickr.Options.Options = {
    allowInput: true,
    locale,
    dateFormat: DatepickerFormatHelper.getInstance().getConfigurationFormat(),
    inline: isWithinModal.value || isWithinPopover.value,
    mode: genericProps.isRange ? "range" : "single",
    monthSelectorType: "static",
  };
  setMinMaxDates(options);

  if (props.twoMonthDisplay) {
    options.showMonths = 2;
  }
  if (genericProps.todayDate) {
    options.now = genericProps.todayDate;
  }
  // add hooks
  options.onChange = handleDateChange;
  options.onDayCreate = handleDayCreation;
  return options;
}

function setMinMaxDates(options: flatpickr.Options.Options) {
  if (genericProps.minDateAllowed) {
    const minDateAtMidnight = new Date(genericProps.minDateAllowed);
    minDateAtMidnight.setHours(0);
    minDateAtMidnight.setMinutes(0);
    options.minDate = minDateAtMidnight;
  }
  if (genericProps.maxDateAllowed) {
    const maxDateAtEndOfDay = new Date(genericProps.maxDateAllowed);
    maxDateAtEndOfDay.setHours(23);
    maxDateAtEndOfDay.setMinutes(59);
    options.maxDate = maxDateAtEndOfDay;
  }
}

function handleDateChange(selectedDates: Array<Date | null | undefined>) {
  const dateValues = [selectedDates[0], selectedDates[1]] as [Date | null | undefined, Date | null | undefined];
  if (genericProps.withTime) {
    emit("update:modelValue", getDatepickerValue(dateValues, props.timeValues));
  } else {
    emit("update:modelValue", getDatepickerValue(dateValues));
  }
}

function handleDayCreation(dates: Date[], currentDate: string, self: flatpickr.Instance, dayElement: unknown) {
  if (!genericProps.isRange) {
    return;
  }
  if (((dates[0] && !dates[1]) || (!dates[0] && dates[1])) && dayElement instanceof Element) {
    // hook signature has only "any" for 4th param
    if (dayElement.classList.contains("selected")) {
      dayElement.classList.add("partial"); // [NCK-873, NCK-944] this will denote a partial selection, while waiting for second date
    }
  }
}

function afterCalendarInitialization() {
  // disable year navigation
  const yearControls = rootRef.value?.querySelectorAll("input.cur-year");
  Array.from(yearControls as NodeList).forEach((yearControl) => {
    if (yearControl instanceof HTMLInputElement) {
      yearControl.disabled = true;
    }
  });
  // hack for detecting when the user is clicking on a date (see comment on blur event handling)
  const daysContainer = rootRef.value?.querySelector(".flatpickr-days");
  if (daysContainer) {
    notifyStartClickingOnDay = () => {
      clickingOnDay.value = true;
    };
    notifyStopClickingOnDay = () => {
      clickingOnDay.value = false;
    };
    daysContainer.addEventListener("mousedown", notifyStartClickingOnDay);
    daysContainer.addEventListener("click", notifyStopClickingOnDay);
  }
}

onBeforeMount(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (typeof globalOptions?.utils?.translateAndFormat === "function") {
    const dateFormatWording =
      globalOptions?.componentOptions?.datepicker?.dateFormatWording ??
      DatepickerFormatHelper.getInstance().getDateFormat();
    dateFormatErrorMessage.value = globalOptions.utils.translateAndFormat("dateFormatInvalid", {
      format: dateFormatWording,
    });
    const paramsForDate = {
      startRangeLabel: `ʼ${startRangeDisplayLabel.value}ʼ`,
      endRangeLabel: `ʼ${endRangeDisplayLabel.value}ʼ`,
    };
    datesOrderForStartDateErrorMessage.value = globalOptions.utils.translateAndFormat(
      "datesOrderInvalidForStartDate",
      paramsForDate,
    );
    datesOrderForEndDateErrorMessage.value = globalOptions.utils.translateAndFormat(
      "datesOrderInvalidForEndDate",
      paramsForDate,
    );
    const paramsForTime = {
      startRangeLabel: `’${genericProps.startTimeLabel}ʼ`,
      endRangeLabel: `ʼ${genericProps.endTimeLabel}ʼ`,
    };
    datesOrderForStartTimeErrorMessage.value = globalOptions.utils.translateAndFormat(
      "datesOrderInvalidForStartDate",
      paramsForTime,
    );
    datesOrderForEndTimeErrorMessage.value = globalOptions.utils.translateAndFormat(
      "datesOrderInvalidForEndDate",
      paramsForTime,
    );
  }
});

onMounted(() => {
  if (calendarTriggerInput.value) {
    const options = buildOptions();
    picker.value = flatpickr(calendarTriggerInput.value, options);
    afterCalendarInitialization();
  }
  createValidationRules();
});

onUnmounted(() => {
  const daysContainer = rootRef.value?.querySelector(".flatpickr-days");
  if (daysContainer) {
    daysContainer.removeEventListener("mousedown", notifyStartClickingOnDay);
    daysContainer.removeEventListener("click", notifyStopClickingOnDay);
  }
  picker.value?.destroy();
});

watch(() => props.modelValue, watchDates, { immediate: true });
watch(internalDates, watchInternalDates, { immediate: true, deep: true });
watch(hiddenTextValue, watchHiddenTextValue);
</script>

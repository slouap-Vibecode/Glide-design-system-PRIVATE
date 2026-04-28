<template>
  <div class="nck-style nck-datepicker" ref="container">
    <div class="datepicker-triggers" :class="{ 'with-time': withTime }">
      <div class="nck-datepicker-trigger-container">
        <!-- @slot Content to be added before start date. Useful in order to have symmetric styling with the end date slot and avoid complex CSS rules. -->
        <slot name="start-date-leading-content" />
        <NckDatepickerTrigger
          class="modal-trigger"
          ref="focusAnchorWhenModal"
          :facadeComponentName="facadeComponentName"
          :withTime="withTime"
          :label="startRangeLabel"
          :modelValue="modelValue[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :errorMessage="getFirstErrorNotTimeRelated(startRangeErrors)"
          :helpMessage="helpMessage"
          :leadingIcon="leadingIcon"
          @click="openModal"
        />
        <NckDatepickerTrigger
          class="popover-trigger"
          ref="focusAnchorWhenPopover"
          :facadeComponentName="facadeComponentName"
          :withTime="withTime"
          :label="startRangeLabel"
          :modelValue="modelValue[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :errorMessage="startRangeErrors[0]"
          :helpMessage="helpMessage"
          :popoverId="popoverId"
          :popoverExpanded="popoverDisplayed"
          fieldShouldContainTime
          :leadingIcon="leadingIcon"
          @click="openPopover"
        />
        <NckDatepickerTimeTrigger
          v-if="withTime"
          ref="startTimePicker"
          class="timepicker-trigger"
          :facadeComponentName="facadeComponentName"
          :label="startTimeLabel"
          :modelValue="timeValues[0]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :errorMessage="getFirstErrorNotDateRelated(startRangeErrors)"
          @click="openTimepickerModal('start', startTimePicker)"
        />
      </div>
      <div v-if="isRange" class="nck-datepicker-trigger-container">
        <!-- @slot Content to be added between start date and end date. -->
        <slot name="end-date-leading-content" />
        <NckDatepickerTrigger
          class="modal-trigger"
          :facadeComponentName="facadeComponentName"
          :withTime="withTime"
          :label="endRangeLabel"
          :modelValue="modelValue[1]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :errorMessage="getFirstErrorNotTimeRelated(endRangeErrors)"
          :leadingIcon="leadingIcon"
          @click="openModal"
        />
        <NckDatepickerTrigger
          class="popover-trigger"
          :facadeComponentName="facadeComponentName"
          :withTime="withTime"
          :label="endRangeLabel"
          :modelValue="modelValue[1]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :errorMessage="endRangeErrors[0]"
          :popoverId="popoverId"
          :popoverExpanded="popoverDisplayed"
          fieldShouldContainTime
          :leadingIcon="leadingIcon"
          @click="openPopover"
        />
        <NckDatepickerTimeTrigger
          v-if="withTime"
          ref="endTimePicker"
          class="timepicker-trigger"
          :facadeComponentName="facadeComponentName"
          :label="endTimeLabel"
          :modelValue="timeValues[1]"
          :required="required"
          :readonly="readonly"
          :disabled="disabled"
          :errorMessage="getFirstErrorNotDateRelated(endRangeErrors)"
          @click="openTimepickerModal('end', endTimePicker)"
        />
      </div>
    </div>

    <NckPopover
      :id="popoverId"
      ref="popover"
      class="datepicker-popover"
      :class="{
        'datepicker-position-left': popoverPosition === DatepickerPopoverPosition.LEFT,
        'datepicker-position-right': popoverPosition === DatepickerPopoverPosition.RIGHT,
      }"
      :size="PopoverSize.FLUID_WIDTH"
      :maxHeight="35"
      :displayed="popoverDisplayed"
      @hide-popover="dismissPopover"
      :triggerToSyncPositionWith="ignoreParentOverflow ? $el : null"
      :placement="positionMapping[popoverPosition]"
    >
      <template v-slot:popover-body>
        <div class="datepicker-popover-body" v-if="popoverDisplayed">
          <div tabindex="0" class="screenreader-only" @focus="focusLastPopoverTabbable"></div>
          <div ref="popoverStart" class="screenreader-only" tabindex="-1" aria-hidden="true"></div>
          <NckDatepickerInternal
            ref="popoverDatepickerInternal"
            v-model="popoverDates"
            v-model:timeValues="timeValues"
            :isRange="isRange"
            :withTime="withTime"
            :withTimeRange="withTimeRange"
            :withFlexibleTime="withFlexibleTime"
            :required="required"
            :context="DatepickerContext.POPOVER"
            :timeInterval="timeInterval"
            twoMonthDisplay
            :startRangeName="startRangeName"
            :endRangeName="endRangeName"
            :startRangeLabel="startRangeLabel"
            :endRangeLabel="endRangeLabel"
            :startTimeName="startTimeNameOrBackup"
            :endTimeName="endTimeNameOrBackup"
            :startTimeClearButtonAltText="startTimeClearButtonAltText"
            :endTimeClearButtonAltText="endTimeClearButtonAltText"
            :startTimeLabel="startTimeLabel"
            :endTimeLabel="endTimeLabel"
            :startRangeRules="startRangeRules"
            :endRangeRules="endRangeRules"
            :todayDate="todayDate"
            :minDateAllowed="minDateAllowed"
            :maxDateAllowed="maxDateAllowed"
            :beforeMinDateErrorMessage="beforeMinDateErrorMessage"
            :afterMaxDateErrorMessage="afterMaxDateErrorMessage"
            :dateFormatExplanationId="dateFormatExplanationId"
            :timeFormatExplanationId="timeFormatExplanationId"
          />
        </div>
      </template>
      <template v-slot:popover-footer>
        <div class="datepicker-popover-footer">
          <div class="format-explanations-container text-m">
            <div :id="dateFormatExplanationId" class="date-explanation">
              <span class="font-color-ink-70">{{ dateFormatExplanation }}</span>
              <span class="text-m-semibold font-color-ink-100">&nbsp;{{ dateFormatWording }}</span>
            </div>
            <div v-if="withTime" :id="timeFormatExplanationId" class="date-explanation">
              <span class="font-color-ink-70">{{ timeFormatExplanation }}</span>
              <span class="text-m-semibold font-color-ink-100">&nbsp;{{ timeFormat }}</span>
            </div>
          </div>
          <NckButton
            class="popover-button-cancel"
            :color="ButtonColor.LIGHT"
            :label="popoverCancelButtonLabel"
            :size="ButtonSize.M"
            @click="dismissPopover(PopoverHidingEventType.CANCEL)"
          >
          </NckButton>
          <NckButton
            ref="popoverDoneButton"
            :color="ButtonColor.PRIMARY"
            :label="popoverDoneButtonLabel"
            :size="ButtonSize.M"
            @click="confirmAndClosePopover"
          >
          </NckButton>
          <div tabindex="0" class="screenreader-only" @focus="focusFirstPopoverTabbable"></div>
        </div>
      </template>
    </NckPopover>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/popoverVariables.less";

@datepicker-popover-top-offset: 1.5rem;

.nck-style.nck-datepicker {
  position: relative;
  .datepicker-triggers {
    display: flex;
    &.with-time {
      @media @tablet, @phone {
        flex-direction: column;
      }
      & > .nck-datepicker-trigger-container {
        &:not(:last-child) {
          @media @tablet, @phone {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      }
    }

    .nck-datepicker-trigger-container {
      .modal-trigger {
        @media @desktop {
          display: none;
        }
      }

      .popover-trigger {
        @media @tablet, @phone {
          display: none;
        }
      }
      flex: 1;
      display: flex;
      .modal-trigger,
      .popover-trigger {
        flex: 1;
      }
      .timepicker-trigger {
        @media @desktop {
          display: none;
        }
        flex: 1;
        margin-left: 1rem;
      }
    }
    & > .nck-datepicker-trigger-container {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
    .nck-datepicker-trigger-container {
      flex: 1;
    }
  }

  .datepicker-popover {
    width: auto;

    &:not(.fixed) {
      top: -@datepicker-popover-top-offset;
    }

    &.datepicker-position-left {
      left: -1rem;
    }

    &.datepicker-position-right {
      right: -1rem;
      justify-content: flex-end;
    }

    & .datepicker-popover-footer {
      display: flex;
      .format-explanations-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        .date-explanation {
          margin-left: 0.25rem;
        }
      }

      & .popover-button-cancel {
        margin-left: auto;
        margin-right: 0.5rem;
      }
    }

    &.fixed {
      // needed to overlap inputs and buttons in a modal
      z-index: 3;
      top: (-@popover-trigger-size - @datepicker-popover-top-offset);
    }

    @media @tablet, @phone {
      display: none;
    }
  }
}
</style>

<script setup lang="ts">
import {
  ComponentPublicInstance,
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRef,
  toRefs,
  watch,
} from "vue";
import NckButton from "@/components/nckButton.vue";
import NckPopover from "@/components/nckPopover.vue";
import NckDatepickerInternal from "@/components/internal/datepicker/nckDatepickerInternal.vue";
import NckDatepickerTrigger from "@/components/internal/datepicker/nckDatepickerTrigger.vue";
import NckDatepickerModal from "@/components/internal/datepicker/nckDatepickerModal.vue";
import { DatepickerContext } from "@/models/datepickerContext";
import { INckDatepickerTriggerClickEvent } from "@/models/iNckDatepickerTriggerClickEvent";
import { PopoverSize } from "@/constants/popoverSize";
import { ButtonColor } from "@/constants/buttonColor";
import { ButtonSize } from "@/constants/buttonSize";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ModalService } from "@/controllers/modalService";
import { IDatepickerRangeProperties } from "./interfaces/internal/iDatepickerRangeProperties";
import { IDatepickerPopover } from "./interfaces/internal/iDatepickerPopover";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { DatepickerPopoverPosition } from "@/constants/datepickerPopoverPosition";
import { PopoverHidingEventType } from "@/constants/popoverHidingEventType";
import { ValidationRule } from "@/models/validationRule";
import { ValidationManager } from "@/controllers/validationManager";
import { DatepickerFormatHelper } from "@/controllers/datepickerFormatHelper";
import { Placement } from "@floating-ui/dom";
import { DatepickerFacadeHelper } from "@/helpers/datepickerFacadeHelper";
import { ITime } from "@/models/iTime";
import { IDateWithRange } from "@/models/iDateWithRange";
import NckDatepickerTimeTrigger from "./internal/datepicker/NckDatepickerTimeTrigger.vue";
import NckTimePickerModal from "./internal/NckTimePickerModal.vue";
import { DomHelper } from "@/helpers/domHelper";
import { INckDatepickerExposed } from "./interfaces/iNckDatepicker";
import { getDatepickerValue } from "./internal/datepicker/datepickerValueUpdaters";
import type { IFormFieldWithValidationProps } from "./interfaces/internal/iFormFieldWithValidationProps";
import { useDatepickerContext } from "@/composables/useDatepickerContext";
import { IDatepickerCommonProperties } from "./interfaces/internal/iDatepickerCommonProperties";
import { TimeInterval } from "@/constants/timeInterval";
import { IFocusableExposed } from "./interfaces/iFocusable";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";
import { getErrorMessageOrKill } from "./internal/datepicker/datepickerErrorsHelpers";

/**
 * @component
 * @displayName nck-datepicker-range
 * Datepicker component allowing selection of date ranges.
 *
 * For selecting a single date, please refer to the [nck-datepicker-single](#nckdatepickersingle) component.
 *
 * The consumer application will need to provide several options for this component to be appropriately localized (see below).
 *
 * When using time, the user timezone is considered for the output. It means that if a user selects "05:00" as an hour, then the output value
 * will be at 05:00 in user local time and NOT in UTC time.
 *
 * Accessibility:
 * The Datepicker Popover editor, displayed at large resolution, traps the focus.
 * This choice may seem a bit controversial as the popover does not implement the standard patterns of modal controls: it allows clicking outside to dismiss (not modal), the rest of the page is not aria-hidden=true,...
 * Ideally, we should most probably let the focus escape the popover and close the popover when it does.
 * The display for the editor at low & medium resolution is a modal, so in those cases, it's fully expected to trap the focus within the editor panel.
 * However, it's not a blocking accessibility problem and more an unusual pattern so we have decided to keep this behavior for now (see https://kdsjira.atlassian.net/browse/NCK-940)
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - datepickerCancel : label for the cancel button in the popover.
 *  - datepickerDone : label for the validation button in the modal and in the popover.
 *  - datepickerTitle : title for the modal (DEPRECATED, datepickerRangeTitle should be used instead).
 *  - datepickerRangeTitle : title for the modal.
 *  - dateFormatInvalid : error displayed when the date doesn't comply with the expected format.
 *     This wording will be passed through the "translateAndFormat" function.
 *     The following property will be passed as the second argument:
 *        - format: the expected format of the date input.
 *  - timeFormatInvalid : error displayed when the time input doesn't comply with the expected format.
 *     This wording will be passed through the "translateAndFormat" function.
 *     The following property will be passed as the second argument:
 *        - format: the expected format of the time input.
 *  - datesOrderInvalidForStartDate : error displayed on the start date if it is after the end date.
 *     This wording will be passed through the "translateAndFormat" function.
 *     The following properties will be passed as the second and third arguments:
 *        - startRangeLabel: the label of the start range input,
 *        - endRangeLabel: the label of the end range input.
 *  - datesOrderInvalidForEndDate : error displayed on the end date if it is before the start date.
 *     This wording will be passed through the "translateAndFormat" function.
 *     The following properties will be passed as the second and third arguments:
 *        - startRangeLabel: the label of the start range input,
 *        - endRangeLabel: the label of the end range input.
 *  - dateFormatExplanationWording: explanation for the date format displayed at higher resolution.
 *  - timeFormatExplanationWording: explanation for the time format displayed at higher resolution.
 *  - numberOfTimeOptionsWording : this sentence will be announced to assistive technology to tell the number
 *     of time options. This wording will be passed through the "translateAndFormat" function.
 *     The following property will be passed as the second argument:
 *        - number: the number of time options
 * - Required specific options (to fill under a _datepicker_ key of the [componentOptions](#installation) object):
 *    - weekdays: an array of 7 translation strings, starting with Sunday,
 *    - months: an array of 12 translation strings, starting with January,
 *    - firstDayOfWeek: the first calendar column is Sunday if firstDayOfWeek=0, Monday if firstDayOfWeek=1, etc.
 *    - dateFormat: e.g. 'DD/MM/YYYY'.
 *       - The supported separators are `-_:.,()/`, others may work also but without guarantee.
 *       - The accepted date tokens are the following :
 *          - D: day of the month on one or two digits, 1-31,
 *          - DD: day of the month on two digits, 01-31,
 *          - M: month on one or two digits, 1-12,
 *          - MM: month on one or two digits, 01-12,
 *          - MMM: abbreviated month name, e.g. Jan-Dec,
 *          - DD: two-digit year,
 *          - DDDD: four-digit year
 *    - dateFormatWording: the date format expressed in the user language, e.g. 'jj/mm/aaaa' for French. Used only for display. It MUST match the dateFormat option. If absent, the dateFormat is used as fallback.
 *    - timeRangeNames: labels of the day ranges. Mandatory when using "withTime" and "withTimeRange" and/or "withFlexibleTime"
 *          - allDay: the label for all day value, when using "withFlexibleTime".
 *          - morning: the label for the range between 06:00 and 12:00, when using "withTimeRange".
 *          - afternoon: the label for the range between 12:00 and 18:00, when using "withTimeRange".
 *          - evening: the label for the range between 18:00 and 23:59, when using "withTimeRange".
 *          - night: the label for the range between 00:00 and 06:00, when using "withTimeRange".
 *    - timeFormat: example "HH:MM", "h:mm AM|PM". Mandatory when using "withTime". A label displayed to clarify the expected time input format. Used only for display, and it MUST match the format used by timeFormatter and timeParser functions.
 *    - timeFormatter: Mandatory when using "withTime". A function `(date: Date) => string` to format a time with respect to user culture specifics in the DatePicker with time. It takes a Date object as a parameter. For example, it should format time with 12h & AM/PM in en-US culture or 24h format in fr-FR culture.
 *    - timeParser: Mandatory when using "withTime". A function `(time: string) => Date | null` to parse a time string. It takes a culture-formatted time string as parameter. The expected format should be the same as the one used by the timeFormatter. Must output current date with parsed time set, if parsed with success, or null when parsing has failed.
 */
// the vue compiler needs to have `IDatepickerCommonProperties` even though it is extended by `IDatepickerRangeProperties`
interface Props
  extends IDatepickerCommonProperties,
    IDatepickerRangeProperties,
    IDatepickerPopover,
    IFormFieldWithValidationProps {}

const props = withDefaults(defineProps<Props>(), {
  popoverPosition: DatepickerPopoverPosition.LEFT,
  ignoreParentOverflow: false,
  timeInterval: TimeInterval.ONE_HOUR,
  modelValue: () => [null, null],
  isRange: true,
});

const emit = defineEmits<{
  /**
   * Emitted when value is modified. This component supports "v-model" pattern.
   * @param {[Date | IDateWithRange | null | undefined, Date | IDateWithRange | null | undefined]} payload the date formatted with time range when used with time picker
   */
  (
    event: "update:modelValue",
    payload: [Date | IDateWithRange | null | undefined, Date | IDateWithRange | null | undefined],
  ): void;
}>();

const { provideDatepickerContext } = useDatepickerContext();
provideDatepickerContext(props);

const positionMapping: Record<DatepickerPopoverPosition, Placement> = {
  [DatepickerPopoverPosition.LEFT]: "bottom-start",
  [DatepickerPopoverPosition.RIGHT]: "bottom-end",
} as const;

const popoverDisplayed = ref<boolean>(false);
const popoverDates = ref<[Date | null | undefined, Date | null | undefined]>([null, null]);
const timeValues = ref<[ITime | null, ITime | null]>([
  { time: null, range: 0 },
  { time: null, range: 0 },
]);
const popoverId = AccessibilityHelper.generateId();
const popoverTriggeredBy = ref<IFocusableExposed | null>(null);
const startRangeRulesStr = ref<string>("");
const endRangeRulesStr = ref<string>("");
const backupStartTimeName = `st_${AccessibilityHelper.generateId()}`;
const backupEndTimeName = `st_${AccessibilityHelper.generateId()}`;
const dateFormatExplanationId = `expl_${AccessibilityHelper.generateId()}`;
const timeFormatExplanationId = `expl_${AccessibilityHelper.generateId()}`;

const focusAnchorWhenModal = ref<InstanceType<typeof NckDatepickerTrigger> | null>(null);
const focusAnchorWhenPopover = ref<InstanceType<typeof NckDatepickerTrigger> | null>(null);
const popoverDatepickerInternal = ref<InstanceType<typeof NckDatepickerInternal> | null>(null);
const popoverStart = ref<HTMLDivElement | null>(null);
const endTimePicker = ref<InstanceType<typeof NckDatepickerTimeTrigger> | null>(null);
const startTimePicker = ref<InstanceType<typeof NckDatepickerTimeTrigger> | null>(null);
const startRangeValue = toRef(() => props.modelValue[0]);
const endRangeValue = toRef(() => props.modelValue[1]);
const startRangeNameRef = toRef(() => `main_${props.startRangeName}`);
const endRangeNameRef = toRef(() => `main_${props.endRangeName}`);
const popoverDoneButton = ref<InstanceType<typeof NckButton> | null>(null);
const instance = getCurrentInstance()?.proxy;

const {
  errors: startRangeErrors,
  isValid: isStartRangeValid,
  validate: validateStartRange,
} = useCompositionFormFieldWithValidation(
  {
    // TODO: improve this code
    ...toRefs(reactive({ ...props, modelValue: startRangeValue })),
    name: startRangeNameRef,
  },
  focus,
  startRangeRulesStr,
);

const {
  errors: endRangeErrors,
  isValid: isEndRangeValid,
  validate: validateEndRange,
} = useCompositionFormFieldWithValidation(
  {
    // TODO: improve this code
    ...toRefs(reactive({ ...props, modelValue: endRangeValue, required: props.isRange && props.required })),
    name: endRangeNameRef,
  },
  focus,
  props.isRange ? endRangeRulesStr : undefined,
);

function isValidationEnabled() {
  return !props.readonly && !props.disabled;
}

defineExpose<INckDatepickerExposed>({
  /**
   * @public
   * Focuses the first date trigger
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
   * Validate the current date input values.
   * @returns Promise resolving to true if the value is valid and to false otherwise
   */
  validate,

  isValidationEnabled,
});

function focus() {
  // Checking element visibility with offsetParent to avoid getComputedStyle
  if (focusAnchorWhenModal.value && (focusAnchorWhenModal.value.$el as HTMLElement).offsetParent !== null) {
    focusAnchorWhenModal.value.focus();
    return;
  }
  // Checking the other trigger
  if (focusAnchorWhenPopover.value && (focusAnchorWhenPopover.value.$el as HTMLElement).offsetParent !== null) {
    focusAnchorWhenPopover.value.focus();
  }
}

function isValid() {
  return isStartRangeValid() && isEndRangeValid();
}

async function validate(): Promise<boolean> {
  const results = await Promise.all([validateStartRange(), validateEndRange()]);
  return results[0] && results[1];
}

const facadeComponentName = computed(() => {
  return DatepickerFacadeHelper.getFacadeComponentName(props.isRange);
});

const internalDates = computed<[Date | null | undefined, Date | null | undefined]>({
  get() {
    if (props.withTime) {
      return [
        (props.modelValue[0] as IDateWithRange)?.date ?? null,
        (props.modelValue[1] as IDateWithRange)?.date ?? null,
      ];
    } else {
      return (props.modelValue as [Date, Date]) || [null, null];
    }
  },
  set(dateValues: [Date | null | undefined, Date | null | undefined]) {
    emit("update:modelValue", getDatepickerValue(dateValues, props.withTime ? timeValues.value : undefined));
  },
});

const popoverCancelButtonLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return globalOptions?.translations?.datepickerCancel;
});

const popoverDoneButtonLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return globalOptions?.translations?.datepickerDone;
});

const dateFormatExplanation = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (globalOptions?.utils?.translateAndFormat) {
    return globalOptions.utils.translateAndFormat("dateFormatExplanationWording");
  }
  return "";
});

const dateFormatWording = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return (
    globalOptions?.componentOptions?.datepicker?.dateFormatWording ??
    DatepickerFormatHelper.getInstance().getDateFormat()
  );
});

const timeFormatExplanation = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  const translateAndFormat = globalOptions?.utils?.translateAndFormat;

  if (translateAndFormat) {
    return translateAndFormat("timeFormatExplanationWording");
  }
  return "";
});

const timeFormat = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return globalOptions?.componentOptions?.datepicker?.timeFormat;
});

const leadingIcon = computed(() => {
  return props.hasLeadingIcon ? "calendar" : undefined;
});

const startTimeNameOrBackup = computed(() => {
  return props.startTimeName ?? backupStartTimeName;
});

const endTimeNameOrBackup = computed(() => {
  return props.endTimeName ?? backupEndTimeName;
});

// eslint-disable-next-line complexity
onBeforeMount(() => {
  DatepickerFormatHelper.initialize(facadeComponentName.value);
  popoverDates.value = [internalDates.value[0], internalDates.value[1]];
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.datepickerDone) {
    throw new Error(
      `Error in ${facadeComponentName.value}: you must provide translations options to the neo-component-kit library to use the datepicker component. Requires 'datepickerDone'`,
    );
  }
  if (
    props.isRange &&
    !(globalOptions?.translations?.datepickerRangeTitle ?? globalOptions?.translations?.datepickerTitle)
  ) {
    throw new Error(
      `Error in ${facadeComponentName.value}: you must provide translations options to the neo-component-kit library to use the datepicker component. Requires 'datepickerRangeTitle'`,
    );
  }
  if (
    !props.isRange &&
    !(globalOptions?.translations?.datepickerSingleTitle ?? globalOptions?.translations?.datepickerTitle)
  ) {
    throw new Error(
      `Error in ${facadeComponentName.value}: you must provide translations options to the neo-component-kit library to use the datepicker component. Requires 'datepickerSingleTitle'`,
    );
  }
  if (typeof globalOptions?.utils?.translateAndFormat !== "function") {
    throw new Error(
      `Error in ${facadeComponentName.value}: you must provide the formatting function to the neo-component-kit library to use the datepicker component. Requires 'translateAndFormat'`,
    );
  }
  if (props.minDateAllowed && !props.beforeMinDateErrorMessage) {
    throw new Error(
      `Error in ${facadeComponentName.value}: you must provide the error message 'beforeMinDateErrorMessage' when providing a minimum allowed date 'minDateAllowed'`,
    );
  }
  if (props.maxDateAllowed && !props.afterMaxDateErrorMessage) {
    throw new Error(
      `Error in ${facadeComponentName.value}: you must provide the error message 'afterMaxDateErrorMessage' when providing a maximum allowed date 'maxDateAllowed'`,
    );
  }
  checkTimePickerErrors();
});

function checkTimePickerErrors() {
  if (props.withTime) {
    if (!props.startTimeLabel) {
      throw new Error(
        `Error in ${facadeComponentName.value}: you must provide a value to the 'startTimeLabel' prop when using the 'withTime' prop.`,
      );
    }
    if (!props.endTimeLabel) {
      throw new Error(
        `Error in ${facadeComponentName.value}: you must provide a value to the 'endTimeLabel' prop when using the 'withTime' prop.`,
      );
    }
  }
}

function checkFocusAfterSelectionInPopover() {
  // [NCK-877] After a  date is clicked, Flatpickr currently has activeElement go to body,
  // because the hidden input is not reachable (which was done to avoid other issues).
  // As a consequence, the focus is outside popover, preventing any keyboard listener to trigger (e.g. escape key)
  // So the code below is a workaround, ensuring we put back focus within the popover.
  setTimeout(() => {
    if (DomHelper.getActiveElement() === document.body && popoverStart.value) {
      popoverStart.value.focus();
    }
  }, 100);
}

function updateTimeValues() {
  if (props.withTime) {
    props.modelValue.forEach((dateWithRange, idx) => {
      if (dateWithRange) {
        if (dateWithRange instanceof Date) {
          timeValues.value[idx] = { time: dateWithRange, range: 0 };
        } else {
          timeValues.value[idx] = { time: dateWithRange.date, range: dateWithRange.range };
        }
      }
    });
  }
}
watch(() => props.modelValue, updateTimeValues, { immediate: true });

function getFirstErrorNotTimeRelated(errors: string[]) {
  const label = props.startTimeLabel;
  if (!label) {
    return errors.at(0);
  }

  return errors.find((error) => !error.includes(label));
}

function getFirstErrorNotDateRelated(errors: string[]) {
  return errors.find((error) => !error.includes(props.startRangeLabel));
}

function createValidationRulesForDate(
  translateAndFormat: (wording: string, parameters?: object | undefined) => string,
) {
  const dateParams = { startRangeLabel: `’${props.startRangeLabel}’`, endRangeLabel: `’${props.endRangeLabel}’` };
  const datesOrderForStartDateErrorMessage = translateAndFormat("datesOrderInvalidForStartDate", dateParams);
  const datesOrderForEndDateErrorMessage = translateAndFormat("datesOrderInvalidForEndDate", dateParams);
  const startDateOrderRule = getDatesOrderForStartDateValidationRule(datesOrderForStartDateErrorMessage);
  const endDateOrderRule = getDatesOrderForEndDateValidationRule(datesOrderForEndDateErrorMessage);
  return {
    startDateOrderRule,
    endDateOrderRule,
  };
}

function createValidationRulesForTime(
  translateAndFormat: (wording: string, parameters?: object | undefined) => string,
) {
  const dateParams = { startRangeLabel: `’${props.startTimeLabel}’`, endRangeLabel: `’${props.endTimeLabel}’` };
  const datesOrderForStartDateErrorMessage = translateAndFormat("datesOrderInvalidForStartDate", dateParams);
  const datesOrderForEndDateErrorMessage = translateAndFormat("datesOrderInvalidForEndDate", dateParams);
  const startTimeOrderRule = getDatesOrderForStartTimeValidationRule(datesOrderForStartDateErrorMessage);
  const endTimeOrderRule = getDatesOrderForEndTimeValidationRule(datesOrderForEndDateErrorMessage);
  return {
    startTimeOrderRule,
    endTimeOrderRule,
  };
}

function createValidationRules() {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (typeof globalOptions?.utils?.translateAndFormat === "function") {
    const translateAndFormat = globalOptions?.utils?.translateAndFormat;
    const { startDateOrderRule, endDateOrderRule } = createValidationRulesForDate(translateAndFormat);
    const { startTimeOrderRule, endTimeOrderRule } = createValidationRulesForTime(translateAndFormat);
    const startDateRuleObjects = [startDateOrderRule];
    const endDateRuleObjects = [endDateOrderRule];

    if (props.withTime) {
      startDateRuleObjects.push(startTimeOrderRule);
      endDateRuleObjects.push(endTimeOrderRule);
    }

    if (props.minDateAllowed) {
      startDateRuleObjects.push(getMinDateAllowedValidationRule());
      endDateRuleObjects.push(getMinDateAllowedValidationRule());
    }
    if (props.maxDateAllowed) {
      startDateRuleObjects.push(getMaxDateAllowedValidationRule());
      endDateRuleObjects.push(getMaxDateAllowedValidationRule());
    }

    (props.startRangeRules ?? []).forEach((rule) => {
      startDateRuleObjects.push(getStartRangeCustomValidationRule(rule));
    });
    (props.endRangeRules ?? []).forEach((rule) => {
      endDateRuleObjects.push(getEndRangeCustomValidationRule(rule));
    });
    startRangeRulesStr.value = isValidationEnabled()
      ? ValidationManager.getRuleNames(
          startDateRuleObjects,
          ValidationManager.createRules(startDateRuleObjects),
          props.required,
        )
      : "";
    endRangeRulesStr.value = isValidationEnabled()
      ? ValidationManager.getRuleNames(
          endDateRuleObjects,
          ValidationManager.createRules(endDateRuleObjects),
          props.required,
        )
      : "";
  }
}

function validateDateOrder(startValue: IDateWithRange | Date, endValue: IDateWithRange | Date | null) {
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  if (props.withTime) {
    startDate = (startValue as IDateWithRange).date;
    if ((startValue as IDateWithRange).range > 0) {
      startDate = new Date(startDate.getTime());
      startDate.setHours(startDate.getHours() - (startValue as IDateWithRange).range);
    }
    endDate = (endValue as IDateWithRange)?.date ?? null;
    if (endDate && endValue && (endValue as IDateWithRange).range > 0) {
      endDate = new Date(endDate?.getTime());
      endDate.setHours(endDate.getHours() + (endValue as IDateWithRange).range);
    }
    return !startDate || !endDate || startDate.getTime() < endDate.getTime();
  } else {
    startDate = startValue as Date | null;
    endDate = endValue as Date | null;
    return !startDate || !endDate || startDate.getTime() <= endDate.getTime();
  }
}

function isSameDay(startDate: IDateWithRange | Date | null, endDate: IDateWithRange | Date | null) {
  if (startDate === null || endDate === null) {
    return false;
  }
  const start: Date = props.withTime ? (startDate as IDateWithRange)?.date : (startDate as Date);
  const end: Date = props.isRange && props.withTime ? (endDate as IDateWithRange)?.date : (endDate as Date);

  return (
    start &&
    end &&
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  );
}

function getDatesOrderForStartDateValidationRule(errorMessage: string) {
  return new ValidationRule(
    (value: IDateWithRange | Date) => {
      return (props.withTime && isSameDay(value, endRangeValue.value)) || validateDateOrder(value, endRangeValue.value);
    },
    errorMessage,
    `main_${props.endRangeName}`,
  );
}

function getDatesOrderForEndDateValidationRule(errorMessage: string) {
  return new ValidationRule(
    (value: IDateWithRange | Date) => {
      return (
        (props.withTime && isSameDay(startRangeValue.value, value)) ||
        !startRangeValue.value ||
        validateDateOrder(startRangeValue.value, value)
      );
    },
    errorMessage,
    `main_${props.startRangeName}`,
  );
}

function getDatesOrderForStartTimeValidationRule(errorMessage: string) {
  return new ValidationRule(
    (value: IDateWithRange | Date) => {
      return (
        (props.withTime && !isSameDay(value, endRangeValue.value)) || validateDateOrder(value, endRangeValue.value)
      );
    },
    errorMessage,
    `main_${props.endRangeName}`,
  );
}

function getDatesOrderForEndTimeValidationRule(errorMessage: string) {
  return new ValidationRule(
    (value: IDateWithRange | Date) => {
      return (
        (props.withTime && !isSameDay(startRangeValue.value, value)) ||
        !startRangeValue.value ||
        validateDateOrder(startRangeValue.value, value)
      );
    },
    errorMessage,
    `main_${props.startRangeName}`,
  );
}

function getMinDateAllowedValidationRule() {
  return new ValidationRule(
    (date: Date | IDateWithRange) => {
      const currentDate = (props.withTime ? (date as IDateWithRange)?.date : date) as Date;
      const dateToCheck = currentDate ? new Date(currentDate) : currentDate;
      if (dateToCheck && props.withTime) {
        dateToCheck.setHours(dateToCheck.getHours() + ((date as IDateWithRange)?.range ?? 0));
      }
      return !dateToCheck || !!(props.minDateAllowed && dateToCheck.getTime() >= props.minDateAllowed.getTime());
    },
    getErrorMessageOrKill(props, "beforeMinDateErrorMessage"),
  );
}

function getMaxDateAllowedValidationRule() {
  return new ValidationRule(
    (date: Date | IDateWithRange) => {
      const currentDate = (props.withTime ? (date as IDateWithRange)?.date : date) as Date;
      const dateToCheck = currentDate ? new Date(currentDate) : currentDate;
      if (dateToCheck && props.withTime) {
        dateToCheck.setHours(dateToCheck.getHours() - ((date as IDateWithRange)?.range ?? 0));
      }
      return !dateToCheck || !!(props.maxDateAllowed && dateToCheck.getTime() <= props.maxDateAllowed.getTime());
    },
    getErrorMessageOrKill(props, "afterMaxDateErrorMessage"),
  );
}

function getStartRangeCustomValidationRule(rule: ValidationRule) {
  return new ValidationRule(
    (value: Date) => {
      const validatorValue = props.isRange ? [value, endRangeValue.value] : value;
      return rule.validator(validatorValue);
    },
    rule.errorMessage,
    `main_${props.endRangeName}`,
  );
}

function getEndRangeCustomValidationRule(rule: ValidationRule) {
  return new ValidationRule(
    (value: Date) => {
      return rule.validator([startRangeValue.value, value]);
    },
    rule.errorMessage,
    `main_${props.startRangeName}`,
  );
}

onMounted(() => {
  createValidationRules();
});

/* Popover-related methods */

function refocusTrigger() {
  if (popoverTriggeredBy.value) {
    popoverTriggeredBy.value.focus();
  }
}

function focusFirstPopoverTabbable() {
  if (popoverDatepickerInternal.value) {
    popoverDatepickerInternal.value.focusStartDateInput();
  }
}

function focusLastPopoverTabbable() {
  popoverDoneButton.value?.focus();
}

async function openPopover($event: INckDatepickerTriggerClickEvent) {
  popoverDates.value = [internalDates.value[0], internalDates.value[1]];
  popoverDisplayed.value = true;
  popoverTriggeredBy.value = $event.triggeredBy;
  await nextTick();
  popoverStart.value?.focus();
}

function confirmAndClosePopover() {
  if (popoverDatepickerInternal.value) {
    popoverDatepickerInternal.value.validateWithFocusOnErrorField((newDates) => {
      internalDates.value = [newDates[0], newDates[1]];
      popoverDatepickerInternal.value?.temporarilyForceCalendarToHide();
      popoverDisplayed.value = false;
      refocusTrigger();
      void nextTick(() => {
        void validate();
      });
    });
  }
}

function dismissPopover(eventType: PopoverHidingEventType) {
  if (popoverDatepickerInternal.value) {
    // NCK-1183 : We now validate the datepicker when clicking outside
    if (eventType === PopoverHidingEventType.CLICK_OUTSIDE) {
      popoverDatepickerInternal.value.updateInternalDatesFromDisplayedTextValues(true);
      confirmAndClosePopover();
    } else {
      // no need to check for PopoverHidingEventType.CLOSE event since there's no popover header
      // no need to check for PopoverHidingEventType.BLUR_OUTSIDE event since the focus is trapped
      // so here eventType === PopoverHidingEventType.ESCAPE
      popoverDates.value = [internalDates.value[0], internalDates.value[1]];
      if (props.withTime) {
        timeValues.value = [
          {
            time: (props.modelValue[0] as IDateWithRange)?.date ?? null,
            range: (props.modelValue[0] as IDateWithRange)?.range ?? 0,
          },
          {
            time: (props.modelValue[1] as IDateWithRange)?.date ?? null,
            range: (props.modelValue[1] as IDateWithRange)?.range ?? 0,
          },
        ];
      }
      void validate(); // case for when the datepicker is initially invalid : display the errors
      popoverDatepickerInternal.value.temporarilyForceCalendarToHide();
      popoverDisplayed.value = false;
      refocusTrigger();
    }
  }
}

/* Modal-related methods */

function openModal($event: INckDatepickerTriggerClickEvent) {
  const trigger = $event.clickEvent.target;
  if (trigger && trigger instanceof HTMLElement) {
    const _props = {
      ...props,
      timeValues: timeValues.value,
      modelValue: internalDates.value,
    };
    ModalService.showModal(NckDatepickerModal, instance as ComponentPublicInstance, trigger, _props)
      .then((resolvedDataArray) => {
        internalDates.value = resolvedDataArray[0];
        for (let i = 0; i < 2; i++) {
          if (timeValues.value[i]?.time === null) {
            timeValues.value[i] = { time: resolvedDataArray[0][i] ?? null, range: 0 };
          }
        }
        void nextTick(() => {
          void validate();
        });
      })
      .catch(() => {
        void validate(); // case for when the datepicker is initially invalid : display the errors
      });
  }
}

function openTimepickerModal(context: "start" | "end", trigger: InstanceType<typeof NckDatepickerTimeTrigger> | null) {
  ModalService.showModal(
    NckTimePickerModal,
    instance as ComponentPublicInstance,
    trigger?.focusableElement ?? undefined,
    {
      title: context === "start" ? props.startTimeLabel : props.endTimeLabel,
      modelValue: timeValues.value[context === "start" ? 0 : 1],
      timeInterval: props.timeInterval,
      required: props.required,
      withTimeRange: props.withTimeRange,
      withFlexibleTime: props.withFlexibleTime,
      name: context === "start" ? startTimeNameOrBackup.value : endTimeNameOrBackup.value,
      clearButtonAltText: context === "start" ? props.startTimeClearButtonAltText : props.endTimeClearButtonAltText,
      preventVirtualKeyboardFromOverlappingModalBodyContent: true,
    },
  )
    .then(([newValue]) => {
      const key = context === "start" ? 0 : 1;
      const nextTimeValues = [...timeValues.value] as (typeof timeValues)["value"];
      nextTimeValues[key] = newValue;
      timeValues.value = nextTimeValues;

      if (props.modelValue[0] !== null || props.modelValue[1] !== null) {
        emit("update:modelValue", getDatepickerValue(props.modelValue, props.withTime ? timeValues.value : undefined));
      }
      void validate();
    })
    .catch(() => {
      void validate(); // case for when the datepicker is initially invalid : display the errors
    });
}

watch(popoverDates, checkFocusAfterSelectionInPopover);
</script>

<docs>
A datepicker by a model which is an array of two dates (start and end of range), along with the labels corresponding to those dates.
The datepicker opens in a modal or in a popover, depending on resolution.
The calendar displays two months side by side when displayed in popover and one month in case where it is displayed inside a modal.
The months are navigable but not the years.
```js
const dates = [null, null];
<nck-datepicker-range
  v-model="dates"
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  endRangeLabel="End date"
/>
```
The default behavior is to accept empty values. The "required" param disallows that.
```js
const dates = [null, null];
<nck-datepicker-range
  required
  v-model="dates"
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  endRangeLabel="End date"
/>
```
The default position of the popover is on the left. Right placement is also possible.
```js
const dates = [new Date("2022-06-05T01:00:00"), new Date("2022-06-15T01:00:00")];
<nck-datepicker-range
  :popoverPosition="DatepickerPopoverPosition.RIGHT"
  v-model="dates"
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  endRangeLabel="End date"
/>
```
It's possible to specify an allowed range for dates, outside of which date selection is disabled.
```js
const dates = [null, null];
const november10th = new Date("2022-11-10T00:00:00");
const inOneWeek = new Date();
inOneWeek.setDate(inOneWeek.getDate()+7);
inOneWeek.setHours(0,0,0);
<nck-datepicker-range
  v-model="dates"
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  endRangeLabel="End date"
  :minDateAllowed="november10th"
  :maxDateAllowed="inOneWeek"
  beforeMinDateErrorMessage="You should select a date after November 10th 2022"
  afterMaxDateErrorMessage="The date should be selected within one week from today"
/>
```

You can also add custom rules to have more advanced validation patterns.
The rules can be applied on the start date or the end date independently.
```vue
<template>
  <div>
    <nck-datepicker-range
      ref="input"
      v-model="dates"
      startRangeName="startInput"
      endRangeName="endInput"
      startRangeLabel="Start date"
      endRangeLabel="End date"
      :startRangeRules="[startDateValidationRule]"
      :endRangeRules="[endDateValidationRule]"
    />

    <div>
      <button @click="displayValidity">Display input validity</button>
      <button @click="validateInput">Validate input</button>
    </div>
  </div>
</template>
<script>
import { ValidationRule } from "@/models/validationRule";

  export default {
    data() {
      return {
        dates: [null, null],
        startDateValidationRule : new ValidationRule((dates) => {
            return dates[0] && dates[0].getDay() !== 0 && dates[0].getDay() !== 6
          }, "Start date must be not be on a weekend"),
        endDateValidationRule: new ValidationRule((dates) => {
            return dates[1] && (!dates[0] || dates[0].getDay() !== 1 || (dates[0].getDay() === 1 && dates[1].getDay() !== 0) )
          }, "End date must be not be on a sunday if start date is on monday"),
      }
    },
    methods: {
      displayValidity() {
        const inputElement = this.$refs.input;
        alert("Is field valid? " + inputElement.isValid())
      },

      validateInput() {
        const inputElement = this.$refs.input;
        inputElement.validate();
      }
    }
  }
</script>
```

A datepicker can also have a time picker to select hours.
```js
const dates = [null, null];
<nck-datepicker-range
  v-model="dates"
  withTime
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  startTimeLabel="Start"
  endRangeLabel="End date"
  endTimeLabel="end"
  startTimeClearButtonAltText="Clear start time field"
  endTimeClearButtonAltText="Clear end time field"
/>

values: {{dates}}
```

Time picker can also have ranges. Ranges are predefined hours ranges.
You can also prefill it with your value. Time is in the user's browser timezone.
```js
const dates =  [ { "date": new Date("2023-06-15T05:00:00.000"), "range": 0 }, { "date": new Date("2023-06-22T09:00:00.000"), "range": 3 } ];
<nck-datepicker-range
  v-model="dates"
  withTime
  withTimeRange
  withFlexibleTime
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  startTimeLabel="Start"
  endRangeLabel="End date"
  endTimeLabel="end"
  startTimeClearButtonAltText="Clear start time field"
  endTimeClearButtonAltText="Clear end time field"
/>

values: {{dates}}
```

You can use custom rules to check time also.
You can also customize the time interval in which the hours can be selected.
```vue
<template>
  <div>
    <nck-datepicker-range
      withTime
      ref="input"
      v-model="dates"
      startRangeName="startInput"
      endRangeName="endInput"
      startRangeLabel="Start date"
      startTimeLabel="Start"
      endRangeLabel="End date"
      endTimeLabel="end"
      withFlexibleTime
      :timeInterval="TimeInterval.FIFTEEN_MINUTES"
      :startRangeRules="[tooEarly]"
      :endRangeRules="[tooEarly, noFlexibleOnSundayForEndDate]"
      startTimeClearButtonAltText="Clear start time field"
      endTimeClearButtonAltText="Clear end time field"
    />

    <div>
      <button @click="displayValidity">Display input validity</button>
      <button @click="validateInput">Validate input</button>
    </div>
  </div>
</template>
<script>
import { ValidationRule } from "@/models/validationRule";

  export default {
    data() {
      return {
        dates: [null, null],
        tooEarly : new ValidationRule((dates) => {
            return dates[0] && dates[0].date && dates[0].date.getHours() >= 6 && dates[1] && dates[1].date && dates[1].date.getHours() >= 6
          }, "It opens at 6AM"),
        noFlexibleOnSundayForEndDate: new ValidationRule((dates) => {
            return dates[1] && (dates[1].range !== 12 || dates[1].date.getDay() !== 0)
          }, "You cannot select all day on sunday for the end date"),
      }
    },
    methods: {
      displayValidity() {
        const inputElement = this.$refs.input;
        alert("Is field valid? " + inputElement.isValid())
      },

      validateInput() {
        const inputElement = this.$refs.input;
        inputElement.validate();
      }
    }
  }
</script>
```

You can also add content before start and end date inputs.
```js
const dates =  [ { "date": new Date("2025-06-15T05:00:00.000"), "range": 0 }, { "date": new Date("2025-06-22T09:00:00.000"), "range": 0 } ];
<nck-datepicker-range
  v-model="dates"
  withTime
  withTimeRange
  withFlexibleTime
  startRangeName="startInput"
  endRangeName="endInput"
  startRangeLabel="Start date"
  startTimeLabel="Start"
  endRangeLabel="End date"
  endTimeLabel="end"
  startTimeClearButtonAltText="Clear start time field"
  endTimeClearButtonAltText="Clear end time field"
>
  <template #start-date-leading-content>
    <button>Button 1</button>
  </template>
  <template #end-date-leading-content>
    <button>Button 2</button>
  </template>
</nck-datepicker-range>

values: {{dates}}
```
</docs>

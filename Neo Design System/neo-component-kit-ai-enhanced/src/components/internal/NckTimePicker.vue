<script lang="ts" setup>
import { Ref, computed, onMounted, ref } from "vue";
import { TimeInterval } from "../../constants/timeInterval";
import { ITime } from "@/models/iTime";
import { checkPrerequisitesForTimePicker, getTimeOptions } from "./NckTimePickerBase";
import { ValidationRule } from "@/models/validationRule";
import { ValidationMode } from "@/constants/validation/validationMode";
import NckAutocomplete from "../nckAutocomplete.vue";
import { INckAutocomplete } from "../interfaces/iNckAutocomplete";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { IAutocompleteItem } from "@/main";
import { INameFormFieldProps } from "../interfaces/internal/iNameFormFieldProps";

interface Props extends INameFormFieldProps {
  label: string;
  modelValue: ITime | null;
  timeInterval: TimeInterval;
  required?: boolean;
  withTimeRange?: boolean;
  withFlexibleTime?: boolean;
  rules?: ValidationRule[];
  validationMode?: ValidationMode;
  additionalDescribedBy?: string;
  flat?: boolean;
  maxHeight?: number;
  stickyInput?: boolean;
  clearButtonAltText: string;
  isWithinModal: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "update:modelValue", newValue: ITime | null): void;
}>();

const timeAutocomplete = ref<INckAutocomplete | null>(null);
const searchInput: Ref<string | undefined> = ref();
const isFocused = ref<boolean>(false);

onMounted(() => {
  if (synchronizedValue.value) {
    const timeFormatter = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter;
    const selectedTimeOption = timeOptions.value.find(
      (timeOption) =>
        (timeOption?.value as ITime).time === synchronizedValue.value?.time &&
        (timeOption?.value as ITime).range === synchronizedValue.value?.range,
    );
    if (selectedTimeOption) {
      searchInput.value = selectedTimeOption.label;
    } else if (timeFormatter && synchronizedValue.value.time) {
      searchInput.value = timeFormatter(synchronizedValue.value.time);
    }
  }
});

const timeOptions = computed(() => {
  return getTimeOptions(props.timeInterval, props.withFlexibleTime ?? false, props.withTimeRange ?? false);
});

const synchronizedValue = computed(() => {
  const possibleValues: ITime[] = timeOptions.value.map((entry) => entry.value as ITime);
  if (props.modelValue) {
    if (possibleValues.includes(props.modelValue)) {
      return props.modelValue;
    }
    for (const possibleValue of possibleValues) {
      const possibleTime = possibleValue.time;
      const propTime = props.modelValue.time;
      if (
        possibleValue.range === props.modelValue.range &&
        possibleTime &&
        propTime &&
        possibleTime.getHours() === propTime.getHours() &&
        possibleTime.getMinutes() === propTime.getMinutes()
      ) {
        return possibleValue;
      }
    }
    return props.modelValue;
  }
  return null;
});

const invalidSelectionErrorText = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (globalOptions?.utils?.translateAndFormat) {
    return globalOptions.utils.translateAndFormat("timeFormatInvalid", {
      format: GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormat,
    });
  }
  return "";
});

const inputLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  let timeFormat = "";
  if (globalOptions?.utils?.translateAndFormat) {
    timeFormat = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormat ?? "";
  }

  return isFocused.value && props.isWithinModal ? `${props.label} (${timeFormat})` : props.label;
});

function focus() {
  if (timeAutocomplete.value) {
    timeAutocomplete.value.focus();
  }
}

async function validate(): Promise<boolean> {
  return (await timeAutocomplete.value?.validate()) ?? true;
}

function isValid() {
  return timeAutocomplete.value?.isValid() ?? true;
}

function parseTimeAndEmitEvent(time: unknown) {
  if (typeof time === "string") {
    const timeParser = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeParser;
    if (timeParser) {
      const trimedInputTime = time.trimEnd().trimStart();
      const parsedDate = timeParser(trimedInputTime);
      const timeFormatter = GlobalOptionsProvider.getInstance().options?.componentOptions?.datepicker?.timeFormatter;
      if (timeFormatter) {
        // parsed time, when reformatted, equals user input => successfully recognized a valid time
        if (parsedDate && trimedInputTime === timeFormatter(parsedDate)) {
          emits("update:modelValue", { time: parsedDate, range: 0 });
          return;
        }
        if (tryParseTimeWithFlexibility(trimedInputTime, timeParser, timeFormatter)) {
          return;
        }
      }
    }
    const exactlyMatchingOptionLabel = timeOptions.value.find((option) => option.label === time);
    if (exactlyMatchingOptionLabel) {
      emits("update:modelValue", exactlyMatchingOptionLabel.value as ITime);
      return;
    }
    emits("update:modelValue", null);
  } else {
    emits("update:modelValue", time as ITime);
  }
}

function numberOfLeadingDigits(time: string) {
  const regex = /^[0-9]+/;
  const result = regex.exec(time);
  if (result) {
    return result[0].length;
  } else {
    return 0;
  }
}

function tryParseTimeWithFlexibility(
  time: string,
  timeParser: (time: string) => Date | null,
  timeFormatter: (date: Date) => string,
) {
  // try various small modifications of input and see if we can successfully parse and reformat to the same string
  return (
    tryParseTimeWithAddingLeading0(time, timeParser, timeFormatter) ??
    tryParseTimeWithRemovingLeading0(time, timeParser, timeFormatter) ??
    tryParseTimeWithCasingFlexibility(time, timeParser, timeFormatter)
  );
}

function tryParseTimeWithAddingLeading0(
  time: string,
  timeParser: (time: string) => Date | null,
  timeFormatter: (date: Date) => string,
) {
  if (numberOfLeadingDigits(time) === 1) {
    const timeWithLeading0 = `0${time}`;
    const parsedDateWithLeading0 = timeParser(timeWithLeading0);
    if (parsedDateWithLeading0 && timeWithLeading0 === timeFormatter(parsedDateWithLeading0)) {
      updateSlightlyModifiedTime(timeWithLeading0, parsedDateWithLeading0);
      return true;
    }
  }
}

function tryParseTimeWithRemovingLeading0(
  time: string,
  timeParser: (time: string) => Date | null,
  timeFormatter: (date: Date) => string,
) {
  if (time.startsWith("0")) {
    const timeSubstring = time.substring(1);
    const parsedDateWithoutLeading0 = timeParser(timeSubstring);
    if (parsedDateWithoutLeading0 && timeSubstring === timeFormatter(parsedDateWithoutLeading0)) {
      updateSlightlyModifiedTime(timeSubstring, parsedDateWithoutLeading0);
      return true;
    }
  }
}

function tryParseTimeWithCasingFlexibility(
  time: string,
  timeParser: (time: string) => Date | null,
  timeFormatter: (date: Date) => string,
) {
  const timeUpperCase = time.toUpperCase();
  const parsedDateUppercase = timeParser(timeUpperCase);
  if (parsedDateUppercase && timeUpperCase === timeFormatter(parsedDateUppercase)) {
    updateSlightlyModifiedTime(timeUpperCase, parsedDateUppercase);
    return true;
  }

  const timeLowerCase = time.toLowerCase();
  const parsedDateLowercase = timeParser(timeLowerCase);
  if (parsedDateLowercase && timeLowerCase === timeFormatter(parsedDateLowercase)) {
    updateSlightlyModifiedTime(timeLowerCase, parsedDateLowercase);
    return true;
  }
}

function updateSlightlyModifiedTime(modifiedTimeInput: string, modifiedTimeValue: Date) {
  searchInput.value = modifiedTimeInput;
  emits("update:modelValue", { time: modifiedTimeValue, range: 0 });
}

async function getMatchingProposalsRetriever(_input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((resolve) => {
    resolve(timeOptions.value);
  });
}

checkPrerequisitesForTimePicker(props.withFlexibleTime, props.withTimeRange);

defineExpose({
  focus,
  validate,
  isValid,
});
</script>

<template>
  <!-- loadingText, noMatchesFoundText, errorRetrievingProposalsText are intentionally left empty due to the fact the list of proposals is static, instant and always shown whatever the input -->
  <NckAutocomplete
    ref="timeAutocomplete"
    :name="name"
    :modelValue="synchronizedValue"
    :searchInput="searchInput"
    :label="inputLabel"
    :clearButtonAltText="clearButtonAltText"
    :required="required"
    :proposalsRetriever="getMatchingProposalsRetriever"
    loadingText=""
    :invalidSelectionErrorText="invalidSelectionErrorText"
    noMatchesFoundText=""
    errorRetrievingProposalsText=""
    numberOfMatchingResultsWording="numberOfTimeOptionsWording"
    :autoSelect="false"
    :debounceInput="false"
    acceptArbitraryInput
    arbitraryInputPrefixIcon="time"
    @update:model-value="parseTimeAndEmitEvent"
    @input-focused="isFocused = true"
    @input-blurred="isFocused = false"
    :additionalDescribedBy="additionalDescribedBy"
    :flat="flat"
    :maxHeight="maxHeight"
    :stickyInput="stickyInput"
    :rules="rules"
  />
</template>

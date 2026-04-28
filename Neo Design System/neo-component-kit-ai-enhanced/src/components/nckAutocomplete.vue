<template>
  <div class="nck-style nck-internal nck-autocomplete" :class="{ 'sticky-input': flat && stickyInput }">
    <div :class="{ 'within-container': flat }">
      <NckTextInput
        ref="textInputRef"
        v-model="textInput"
        :label="label"
        :leadingIcon="leadingIcon"
        :clearable="clearable && !readonly"
        :clearButtonAltText="clearButtonAltText"
        :helpMessage="helpMessage"
        :name="name"
        :inlineCompletion="suggestedProposal"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :rules="validationRules"
        inputAttributeAutocomplete="off"
        inputAttributeRole="combobox"
        :input-attribute-aria-activedescendant="activeDescendantId"
        :input-attribute-aria-autocomplete="inlineAutocomplete ? 'both' : 'list'"
        :input-attribute-aria-controls="popoverId"
        :input-attribute-aria-expanded="resultContainerDisplayed ? 'true' : 'false'"
        :additionalDescribedBy="additionalDescribedBy"
        :validationMode="ValidationMode.PASSIVE"
        @update:model-value="inputChanged"
        @down-key-pressed="selectNextProposal($event)"
        @up-key-pressed="selectNextProposal($event, true)"
        @escape-key-pressed="closePopoverOrEraseInput"
        @enter-key-pressed="acceptProposal"
        @input-focused="inputFocused"
        @input-blurred="inputBlurred"
      />

      <NckPopover
        v-if="!flat"
        :id="popoverId"
        :headerVisible="false"
        :displayed="resultContainerDisplayed"
        :size="PopoverSize.FULL_WIDTH"
        :triggerToSyncPositionWith="ignoreParentOverflow && popoverTrigger ? popoverTrigger : null"
        class="result-container"
        :maxHeight="maxHeight"
      >
        <template #popover-body>
          <AutocompleteResultContainer
            ref="autocompleteResultContainer"
            :errorRetrievingProposalsText="errorRetrievingProposalsText"
            :isLoading="isLoading"
            :loadingText="loadingText"
            :matchingResults="allMatchingResults"
            :noMatchesFoundText="noMatchesFoundText"
            :numberOfMatchingResultsWording="numberOfMatchingResultsWording"
            :proposalsRetrievalFailed="proposalsRetrievalFailed"
            :resultContainerDisplayed="resultContainerDisplayed"
            :selectedValue="internalValue ? internalValue.value : null"
            :autoSelect="autoSelect"
            @active-descendant-id-updated="activeDescendantId = $event"
            @element-selected="syncSelectedValue"
            @menu-dismissed="hidePopoverAndFocusInput"
            @active-proposal-value-changed="
              activeProposalValue = $event as Data | null /* a wrong inference of string comes in the way*/
            "
            :maxHeight="maxHeight"
          />
        </template>
      </NckPopover>
    </div>

    <div
      v-if="flat"
      v-show="resultContainerDisplayed"
      class="result-container"
      :class="{ 'sticky-input': stickyInput }"
    >
      <AutocompleteResultContainer
        ref="autocompleteResultContainer"
        :errorRetrievingProposalsText="errorRetrievingProposalsText"
        :isLoading="isLoading"
        :loadingText="loadingText"
        :matchingResults="allMatchingResults"
        :noMatchesFoundText="noMatchesFoundText"
        :numberOfMatchingResultsWording="numberOfMatchingResultsWording"
        :proposalsRetrievalFailed="proposalsRetrievalFailed"
        :resultContainerDisplayed="resultContainerDisplayed"
        flat
        :selectedValue="internalValue ? internalValue.value : null"
        :autoSelect="autoSelect"
        :maxHeight="maxHeight"
        :fullHeight="stickyInput"
        @active-descendant-id-updated="activeDescendantId = $event"
        @element-selected="syncSelectedValue"
        @menu-dismissed="hidePopoverAndFocusInput"
        @active-proposal-value-changed="
          activeProposalValue = $event as Data | null /* a wrong inference of string comes in the way*/
        "
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/sizeVariables.less";

.nck-style.nck-internal.nck-autocomplete {
  position: relative;
  &.sticky-input {
    height: 100%;
    display: flex;
    flex-direction: column;

    .result-container {
      overflow: hidden;
      height: 100%;
    }
  }
  .within-container {
    margin: 1rem;
  }

  .result-container.fixed {
    // needed to overlap code examples in docs and buttons in modal's footer
    z-index: 10;
  }

  .result-container:not(.fixed, .sticky-input) {
    top: calc(
      ~"(2 * @{thin-border}rem + @{input-with-inner-label-padding}rem)" + var(--line-height-text-l) +
        ~"@{input-padding}rem"
    );
  }
}
</style>

<script setup lang="ts" generic="Data">
import {
  computed,
  onBeforeMount,
  onMounted,
  nextTick,
  ref,
  watch,
  toRaw,
  Ref,
  useTemplateRef,
  ComponentPublicInstance,
} from "vue";
import NckTextInput from "./nckTextInput.vue";
import NckPopover from "./nckPopover.vue";
import { PopoverSize } from "../constants/popoverSize";
import { IAutocompleteItem } from "../models/iAutocompleteItem";
import { AccessibilityHelper } from "../helpers/accessibilityHelper";
import { Debouncer } from "../helpers/debouncer";
import { ValidationRule } from "../models/validationRule";
import { INckAutocompleteExposed } from "./interfaces/iNckAutocomplete";
import AutocompleteResultContainer from "@/components/internal/AutocompleteResultContainer.vue";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { ValidationMode } from "@/constants/validation/validationMode";
import { IAutocompleteProps } from "./interfaces/iAutocompleteProps";

/**
 * @component
 * @displayName nck-autocomplete
 * Autocomplete component with automatic selection of first matching result (if any).
 *
 * This component implements the `INckAutocomplete` interface.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *   - numberOfMatchingResultsWording : this sentence will be announced to assistive technology to tell the number
 *     of autocomplete results when any. This wording will be passed through the "translateAndFormat" function.
 *     The following property will be passed as the second argument:
 *        - number: the number of results displayed matching the current input.
 * - [Icons URL](#icons)
 */

const props = withDefaults(defineProps<IAutocompleteProps<Data>>(), {
  searchInput: "",
  minInputLength: 0,
  debounceInput: true,
  flat: false,
  autoSelect: true,
  ignoreParentOverflow: false,
  acceptArbitraryInput: false,
  stickyInput: false,
});

defineExpose<INckAutocompleteExposed>({
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
   * Validate the current autocomplete value.
   * @returns Promise resolving to true if the value is valid and to false otherwise
   */
  validate,
  /**
   * @public
   * Focus the input of the autocomplete
   */
  focus,
  /**
   * @public
   * Whether validation is enabled or not
   *
   * Returns: boolean
   */
  isValidationEnabled,
});

const emit = defineEmits<{
  /**
   * Emitted when the value changes.
   * This component supports v-model pattern.
   */
  (event: "update:modelValue", value: Data | string | undefined): void;
  /**
   * When user edits the textinput inside the text input,
   * update the value of searchInput
   */
  (event: "update:searchInput", value: string): void;
  /**
   * Emitted when input is focused
   */
  (event: "input-focused", value: Event): void;
  /**
   * Emitted when input is blurred
   */
  (event: "input-blurred", value: Event): void;
}>();

const textInputRef = ref<InstanceType<typeof NckTextInput> | null>(null);
const debounceDuration = 300;
const popoverId = AccessibilityHelper.generateId();

// type should be using Ref and not the internal of ref due to generic type, see https://github.com/vuejs/language-tools/discussions/3677
const activeDescendantId = ref<string | undefined>(undefined);
const resultContainerDisplayed = ref<boolean>(false);
const textInput = ref<string>("");
const isLoading = ref<boolean>(false);
const internalValue: Ref<IAutocompleteItem<Data | string> | null> = ref(null);
let debouncer = new Debouncer(debounceDuration);
const getMatchingProposalsOnFocus = ref<boolean>(true);
const matchingResults: Ref<IAutocompleteItem<Data | string>[]> = ref([]);
const proposalsRetrievalFailed = ref<boolean>(false);
const clearable = ref<boolean>(false);
const activeProposalValue: Ref<Data | null> = ref(null);
const popoverTrigger = ref<HTMLInputElement | null>(null);
const inputChangedSinceSelectedValueSync = ref<boolean>(false);
const arbitraryInputMatchingResult: Ref<IAutocompleteItem<Data | string> | null> = ref(null);
const validationRules: ValidationRule[] = [
  new ValidationRule(
    () => props.modelValue !== null && props.modelValue !== undefined,
    props.invalidSelectionErrorText,
  ),
].concat(props.rules ?? []);
const autocompleteResultContainer = useTemplateRef("autocompleteResultContainer");

const suggestedProposal = computed<string | undefined>(() => {
  return props.inlineAutocomplete && internalValue.value?.label?.startsWith(textInput.value)
    ? internalValue.value.label
    : undefined;
});

function isValid(): boolean {
  return textInputRef.value?.isValid() ?? false;
}

async function validate(): Promise<boolean> {
  return (await textInputRef.value?.validate()) ?? false;
}

function focus(): void {
  if (textInputRef.value) {
    textInputRef.value.focus();
  }
}

const allMatchingResults = computed<IAutocompleteItem<Data | string>[]>((): IAutocompleteItem<Data | string>[] => {
  if (arbitraryInputMatchingResult.value) {
    return [arbitraryInputMatchingResult.value, ...matchingResults.value];
  } else {
    return matchingResults.value;
  }
});

function isValidationEnabled() {
  return textInputRef.value?.isValidationEnabled() ?? false;
}

function emitInputEvent(): void {
  emit("update:modelValue", internalValue.value?.value);
}

function matchingResultsChanged(): void {
  if (allMatchingResults.value?.length && textInput.value) {
    if (props.autoSelect) {
      internalValue.value = allMatchingResults.value[0];
      void nextTick(async () => await validate());
    } else if (inputChangedSinceSelectedValueSync.value) {
      internalValue.value = null;
    } else {
      syncSelectedValue(props.modelValue);
    }
  } else {
    internalValue.value = null;
  }
}

function searchInputChanged(): void {
  setTextInput();
}

function textInputChanged(): void {
  clearable.value = textInput.value.length !== 0;
  emit("update:searchInput", textInput.value);
}

function setTextInput(): void {
  proposalsRetrievalFailed.value = false;
  textInput.value = props.searchInput;
}

function hidePopover(): void {
  resultContainerDisplayed.value = false;
}

function closePopoverOrEraseInput($event?: KeyboardEvent): void {
  $event?.preventDefault();
  $event?.stopPropagation();
  if (resultContainerDisplayed.value) {
    hidePopover();
  } else {
    textInput.value = "";
    clearCurrentSelection();
  }
}

function acceptProposal($event?: KeyboardEvent): void {
  $event?.preventDefault();
  const selectedMenuItemValue = props.autoSelect ? internalValue.value?.value : activeProposalValue.value;

  if (selectedMenuItemValue ?? (props.acceptArbitraryInput && !internalValue.value)) {
    syncSelectedValue(selectedMenuItemValue);
    hidePopoverAndFocusInput();
  } else if (textInput.value && !props.autoSelect && !props.acceptArbitraryInput) {
    hidePopoverAndFocusInput();
    void nextTick(async () => await validate());
  }
}

function hidePopoverAndFocusInput(): void {
  // Disable matching results retrieval when closing popover and focusing input programmatically...
  getMatchingProposalsOnFocus.value = false;
  hidePopover();
  focus();
  // ... and re-enable matching results on input focus afterwards.
  getMatchingProposalsOnFocus.value = true;
}

function inputFocused($event: Event): void {
  if (!props.readonly && getMatchingProposalsOnFocus.value) {
    getMatchingProposals();
  }
  emit("input-focused", $event);
}

function inputBlurred($event: Event): void {
  debouncer.cancelDelay();
  if (
    $event instanceof FocusEvent &&
    autocompleteResultContainer.value?.proposalsMenu &&
    /* the useTemplateRef doesn't to make it realize it is a component, I'm tired of searching 10000 counter measures, I force the type */
    $event.relatedTarget === (autocompleteResultContainer.value.proposalsMenu as unknown as ComponentPublicInstance).$el
  ) {
    // When input is blurred due to click selection in the menu,
    // let the click event handler perform the appropriate processing
  } else {
    if ((internalValue.value && !props.acceptArbitraryInput) ?? (!internalValue.value && props.acceptArbitraryInput)) {
      syncSelectedValue(internalValue.value?.value);
    }
    hidePopover();
    void nextTick(async () => await validate());
  }
  emit("input-blurred", $event);
}

function clearCurrentSelection() {
  internalValue.value = null;
  activeProposalValue.value = null;
  inputChangedSinceSelectedValueSync.value = false;
  arbitraryInputMatchingResult.value = null;
  // Even though we have a watch on internalValue, it will not be triggered if it is already null
  // For example when we have a prefilled autocomplete and the user choses to clear the input
  // Thus we need to call the function manually in those cases
  emitInputEvent();
}

function inputChanged() {
  inputChangedSinceSelectedValueSync.value = true;
  activeProposalValue.value = null;
  proposalsRetrievalFailed.value = false;

  if (textInput.value.length >= props.minInputLength) {
    getMatchingProposals();
    if (textInput.value.length === 0) {
      // user has cleared their selection by removing everything from the input
      clearCurrentSelection();
    }
  } else {
    hidePopover();
    clearCurrentSelection();
  }
}

function getMatchingProposals(): void {
  debouncer.delay(() => {
    if (textInput.value.length >= props.minInputLength) {
      resultContainerDisplayed.value = true;
      isLoading.value = true;
      proposalsRetrievalFailed.value = false;
      retrieveProposals(textInput.value);
    }
  });
}

function retrieveProposals(userInput: string): void {
  props
    .proposalsRetriever(userInput)
    .then((results) => {
      // Update matching results & stop loading only
      // if the current input value corresponds to the requested results search criteria
      // to avoid race condition displaying outdated results
      if (textInput.value === userInput) {
        isLoading.value = false;
        matchingResults.value = results;

        if (props.acceptArbitraryInput && textInput.value) {
          const exactMatchResultIndex = matchingResults.value.findIndex(
            (matchingResult) => matchingResult.label === textInput.value,
          );
          injectArbitraryInputIntoList();
          if (exactMatchResultIndex >= 0) {
            navigateToProposalAtIndex(exactMatchResultIndex + 1);
          }
        }
      }
    })
    .catch(() => {
      proposalsRetrievalFailed.value = true;
    });
}

function injectArbitraryInputIntoList(): void {
  const item: IAutocompleteItem<Data | string> = { value: textInput.value, label: textInput.value };

  if (props.arbitraryInputWrappingWording) {
    const translateAndFormat = GlobalOptionsProvider.getInstance().getOptions()?.utils?.translateAndFormat;

    if (translateAndFormat) {
      item.labelOverrideForMenu = translateAndFormat(props.arbitraryInputWrappingWording, {
        arbitraryInput: textInput.value,
      });
    }
  }

  if (props.arbitraryInputPrefixIcon) {
    item.leadingIcon = props.arbitraryInputPrefixIcon;
  }

  arbitraryInputMatchingResult.value = item;
  navigateToProposalAtIndex(0);
}

function navigateToProposalAtIndex(index: number) {
  void nextTick(() => {
    if (autocompleteResultContainer.value) {
      autocompleteResultContainer.value.navigateToProposalAtIndex(index);
    }
  });
}

function selectNextProposal(event?: KeyboardEvent, reverse = false): void {
  if (event instanceof KeyboardEvent) {
    autocompleteResultContainer.value?.selectNextProposal(event, reverse);
  }
}

function syncSelectedValue(selectedValue: unknown): void {
  const targetValue = props.acceptArbitraryInput && !selectedValue ? textInput.value : selectedValue;
  // By default, we try to match the selected value with the matching results on the value
  let currentProposal = allMatchingResults.value.find((element) => {
    return element ? toRaw(element.value) === toRaw(targetValue) : false;
  });
  // But if we fail to find a matching result and we accept arbitrary input and there is an arbitrary input proposal, we select the arbitrary input entry
  if (!currentProposal && props.acceptArbitraryInput && arbitraryInputMatchingResult.value) {
    currentProposal = arbitraryInputMatchingResult.value;
  }

  if (currentProposal) {
    textInput.value = currentProposal.label;
    internalValue.value = currentProposal;
  } else {
    textInput.value = "";
    internalValue.value = null;
  }
  inputChangedSinceSelectedValueSync.value = false;
  activeProposalValue.value = null;
  void nextTick(async () => await validate());
}

onBeforeMount(() => {
  const errorPrefix = "Error in NckAutocomplete";
  if (props.acceptArbitraryInput && props.autoSelect) {
    throw new Error(
      `${errorPrefix}: The Autocomplete can only accept arbitrary input as its value in manual mode (autoSelect = false).`,
    );
  }
  if (!props.autoSelect && props.inlineAutocomplete) {
    throw new Error(
      `${errorPrefix}: The Autocomplete cannot display a completion string in manual mode (autoSelect = false).`,
    );
  }
  if (props.acceptArbitraryInput && props.autoSelect) {
    throw new Error(
      `${errorPrefix}: The Autocomplete can only accept arbitrary input as its value in manual mode (autoSelect = false).`,
    );
  }
  if (!props.autoSelect && props.inlineAutocomplete) {
    throw new Error(
      `${errorPrefix}: The Autocomplete cannot display a completion string in manual mode (autoSelect = false).`,
    );
  }
  if (!props.flat && props.stickyInput) {
    throw new Error(`${errorPrefix}: a non-flat autocomplete cannot be used with stickyInput option enabled.`);
  }
  if (props.stickyInput && props.maxHeight) {
    throw new Error(`${errorPrefix}: maxHeight cannot be specified when stickyInput option is enabled.`);
  }
});

onMounted(() => {
  debouncer = new Debouncer(props.debounceInput ? debounceDuration : 0);
  setTextInput();

  if (textInputRef.value) {
    popoverTrigger.value = textInputRef.value.textInputControl;
  }
});

watch(internalValue, emitInputEvent);
watch(allMatchingResults, matchingResultsChanged);
watch(() => props.searchInput, searchInputChanged);
watch(textInput, textInputChanged);
</script>

<docs>
Required autocomplete with automatic selection and no inline autocomplete, 3 characters minimum.
Results are provided when inputing "Par...".

```vue
<template>
  <div>
    <nck-autocomplete
      v-model="selectedOption"
      label="Choose your destination"
      leadingIcon="location"
      clearButtonAltText="Clear destination"
      helpMessage="Enter at least 3 characters to get proposals"
      :required=true
      :disabled=false
      :readonly=false
      :minInputLength=3
      :inlineAutocomplete=false
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      noMatchesFoundText="No matching item found"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes."
      numberOfMatchingResultsWording="numberResultsAreAvailable" />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedOption: null,
        allAddresses: [
          { label: "Paris, France",
            value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
            leadingIcon: "company" },
          { label: "Gare de Lyon, Paris",
            value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
            leadingIcon: "location" },
          { label: "Aéroport Paris CDG",
            value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
            leadingIcon: "time" }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```

Non-required autocomplete with automatic selection and inline autocomplete, 1 character minimum and with preselected value.
Results are provided when inputing "Lon...".

```vue
<template>
  <div>
    <nck-autocomplete
      v-model="selectedOption"
      v-model:searchInput="searchInputValue"
      label="Choose your destination"
      leadingIcon="location"
      clearButtonAltText="Clear destination"
      helpMessage="Enter at least 1 character to get proposals"
      :required=false
      :disabled=false
      :readonly=false
      :minInputLength=1
      :inlineAutocomplete=true
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      noMatchesFoundText="No matching item found"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes."
      numberOfMatchingResultsWording="numberResultsAreAvailable" />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      const allAddresses = [
        { label: "London", subLabel: "United Kingdom",
          value: { displayAddress: "London", cityCode: "LON", lat: 3.145, lon: 2.34 },
          leadingIcon: "company" },
        { label: "London Gatwick international airport at 25km of London city center",
          value: { displayAddress: "London Gatwick international", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
          leadingIcon: "plane" },
        { label: "London Saint Pancras",
          value: { displayAddress: "London Saint Pancras", cityCode: "SPC", lat: -33.145, lon: 42.34 },
          leadingIcon: "train" }
      ];

      return {
        selectedOption: allAddresses[1],
        searchInputValue: allAddresses[1].label,
        allAddresses
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```

Non-required autocomplete with automatic selection and inline autocomplete, no minimum of characters.
When input is empty and gets focused, a default set of favorite & history results (not matching the empty input) get returned by the consuming application as suggestions.
Results are provided when inputing "Koh...".

```vue
<template>
  <div>
    <nck-autocomplete
      v-model="selectedOption"
      label="Choose your destination"
      leadingIcon="location"
      clearButtonAltText="Clear destination"
      helpMessage="No minimum of characters to get proposals"
      :required=false
      :disabled=false
      :readonly=false
      :minInputLength=0
      :inlineAutocomplete=true
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      noMatchesFoundText="No matching item found"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes."
      numberOfMatchingResultsWording="numberResultsAreAvailable" />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedOption: null,
        allAddresses: [
          { label: "Koh Lanta",
            value: { displayAddress: "Koh Lanta", cityCode: "KLT", lat: 3.145, lon: 2.34 }},
          { label: "Koh Tao",
          value: { displayAddress: "Koh Tao", cityCode: "KTA", lat: 34.145, lon: 12.34 } },
          { label: "Koh Samui",
            value: { displayAddress: "Koh Samui", cityCode: "KSA", lat: -33.145, lon: 42.34 }},
          { label: "Koh Rok",
          value: { displayAddress: "Koh Rok", cityCode: "KRO", lat: -33.145, lon: 42.34 }},
          { label: "Koh Rok Nuy",
            value: { displayAddress: "Koh Rok Nuy", cityCode: "KRN", lat: -33.145, lon: 42.34 }},
          { label: "Koh Phiphi",
            value: { displayAddress: "Koh Phiphi", cityCode: "KPP", lat: -33.145, lon: 42.34 }}
        ],
        favoritesAndHistory: [
          { label: "Home", subLabel: "1 rue de rivoli 75001 Paris", value: { displayAddress: "Home", cityCode: "PAR", lat: 3.145, lon: 2.34 }, leadingIcon: "home" },
          { label: "Office", subLabel: "11 chemin de Bretagne 92130 Issy-les-Moulineaux", value: { displayAddress: "Office", cityCode: "ISM", lat: 34.145, lon: 12.34 }
            , leadingIcon: "company" }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (input === "") {
              resolve(this.favoritesAndHistory);
            } else {
              const result = this.allAddresses.filter(
                (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
              resolve(result);
            }
          }, 1000);
        });
      }
    }
  }
</script>
```

A flat autocomplete within a popover
```vue
<template>
  <div>
    <button @click="popoverDisplayed = !popoverDisplayed">Toggle popover</button>
    <nck-popover :displayed="popoverDisplayed" title="Destination" header-visible size="large" @hide-popover="popoverDisplayed = false">
      <template v-slot:popover-body>
        <nck-autocomplete
          v-model="selectedOption"
          clear-button-alt-text="Clear"
          error-retrieving-proposals-text="Error"
          invalid-selection-error-text="Invalid"
          label="Choose your destination"
          leading-icon="location"
          loading-text="Loading..."
          no-matches-found-text="No matching item found"
          number-of-matching-results-wording="numberResultsAreAvailable"
          :proposals-retriever="getProposalsRetriever"
          flat
          :inline-autocomplete="true"
          required
          style="width: 100%;"
        />
      </template>
    </nck-popover>
    <div>Selected option: {{selectedOption}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        popoverDisplayed: false,
        selectedOption: null,
        allAddresses: [
          { label: "Paris, France",
            value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
            leadingIcon: "company" },
          { label: "Gare de Lyon, Paris",
            value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
            leadingIcon: "location" },
          { label: "Aéroport Paris CDG",
            value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
            leadingIcon: "time" }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```

An autocomplete with manual selection
```vue
<template>
  <div>
    <nck-autocomplete
      v-model="selectedOption"
      label="Choose your destination"
      leadingIcon="location"
      clearButtonAltText="Clear destination"
      helpMessage="Enter at least 3 characters to get proposals"
      :required=false
      :disabled=false
      :readonly=false
      :minInputLength=3
      :autoSelect=false
      :inlineAutocomplete=false
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      noMatchesFoundText="No matching item found"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes."
      numberOfMatchingResultsWording="numberResultsAreAvailable" />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedOption: null,
        allAddresses: [
          { label: "Paris, France",
            value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
            leadingIcon: "company" },
          { label: "Gare de Lyon, Paris",
            value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
            leadingIcon: "location" },
          { label: "Aéroport Paris CDG",
            value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
            leadingIcon: "time" }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```

An autocomplete with manual selection that also accepts arbitrary input as it's value
```vue
<template>
  <div>
    <nck-autocomplete
      v-model="selectedOption"
      label="Choose your destination"
      leadingIcon="location"
      clearButtonAltText="Clear destination"
      helpMessage="Enter at least 3 characters to get proposals"
      :required=false
      :disabled=false
      :readonly=false
      :minInputLength=3
      :autoSelect=false
      :inlineAutocomplete=false
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes"
      noMatchesFoundText="No matching item was found, but you can still press the enter key to confirm your input"
      numberOfMatchingResultsWording="numberResultsAreAvailable"
      :acceptArbitraryInput="true"
      arbitraryInputWrappingWording="searchForArbitraryInput"
      arbitraryInputPrefixIcon="search" />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedOption: null,
        allAddresses: [
          {
            label: "Paris, France",
            value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
            leadingIcon: "company"
          }, {
            label: "Gare de Lyon, Paris",
            value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
            leadingIcon: "location"
          }, {
            label: "Aéroport Paris CDG",
            value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
            leadingIcon: "time"
          }, {
            label: "Koh Rok",
            value: { displayAddress: "Koh Rok", cityCode: "KRO", lat: -33.145, lon: 42.34 }
          }, {
            label: "Koh Rok Nuy",
            value: { displayAddress: "Koh Rok Nuy", cityCode: "KRN", lat: -33.145, lon: 42.34 }
          }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```

An autocomplete with a customized max height of 48rem for the results container.
Results are provided when inputing "P".

```vue
<template>
  <div>
    <nck-autocomplete
      v-model="selectedOption"
      label="Choose your destination"
      leadingIcon="location"
      clearButtonAltText="Clear destination"
      helpMessage="Enter at least 1 characters to get proposals"
      :minInputLength=1
      :inlineAutocomplete=false
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      noMatchesFoundText="No matching item found"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes."
      numberOfMatchingResultsWording="numberResultsAreAvailable"
      :maxHeight=48 />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedOption: null,
        allAddresses: [
          { label: "Paris, France",
            value: { code: 1 }
          },
          { label: "Gare de Lyon, Paris",
            value: { code: 2 }
          },
          { label: "Mairie de Paris",
            value: { code: 3 }
          },
          { label: "Les champs elysées,  Paris",
            value: { code: 4 }
          },
          { label: "Arc de triomphe, Paris",
            value: { code: 5 }
          },
          { label: "KDS, Paris",
            value: { code: 6 }
          },
          { label: "GBT, Paris",
            value: { code: 7 }
          },
          { label: "Brasserie Lip, Paris",
            value: { code: 8 }
          },
          { label: "45 bd Saint Germain, Paris, France",
            value: { code: 9 }
          },
          { label: "Gare du Nord, Paris",
            value: { code: 10 }
          },
          { label: "Aéroport d'orly ORY",
            value: { code: 11 }
            },
          { label: "Gare Montparnasse, Paris",
            value: { code: 12 }
          },
          { label: "Chez Gaston, Paris",
            value: { code: 13 }
          }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```

A flat autocomplete with a sticky input, expanding to the full height of its container, and allowing to scroll results without losing sight of the input.
Results are provided immediately upon focus.

```vue
<template>
  <div style="height: 25rem; border: 0.3rem solid grey;">
    <nck-autocomplete
      v-model="selectedOption"
      label="Choose your destination"
      clearButtonAltText="Clear destination"
      :proposalsRetriever="getProposalsRetriever"
      loadingText="Loading the matching locations"
      noMatchesFoundText="No matching item found"
      invalidSelectionErrorText="Select a valid location"
      errorRetrievingProposalsText="Unable to find results at the moment. Please try again after few minutes."
      numberOfMatchingResultsWording="numberResultsAreAvailable"
      :flat=true
      :stickyInput=true />
      <div>Selected option: {{selectedOption}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedOption: null,
        allAddresses: [
          { label: "Paris, France",
            value: { code: 1 }
          },
          { label: "Gare de Lyon, Paris",
            value: { code: 2 }
          },
          { label: "Mairie de Paris",
            value: { code: 3 }
          },
          { label: "Les champs elysées,  Paris",
            value: { code: 4 }
          },
          { label: "Arc de triomphe, Paris",
            value: { code: 5 }
          },
          { label: "KDS, Paris",
            value: { code: 6 }
          },
          { label: "GBT, Paris",
            value: { code: 7 }
          },
          { label: "Brasserie Lip, Paris",
            value: { code: 8 }
          },
          { label: "45 bd Saint Germain, Paris, France",
            value: { code: 9 }
          },
          { label: "Gare du Nord, Paris",
            value: { code: 10 }
          },
          { label: "Aéroport d'orly ORY",
            value: { code: 11 }
            },
          { label: "Gare Montparnasse, Paris",
            value: { code: 12 }
          },
          { label: "Chez Gaston, Paris",
            value: { code: 13 }
          }
        ]
      }
    },
    methods: {
      getProposalsRetriever(input) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = this.allAddresses.filter(
              (address) => address.label.toLowerCase().indexOf(input.toLowerCase()) > -1);
            resolve(result);
          }, 1000);
        });
      }
    }
  }
</script>
```
</docs>

<template>
  <main>
    <PreloadIconComponent :iconsToPreload="[
      'company',
      'location',
      'time',
      'plane',
      'train',
      'glyphs-warning-filled'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <h1>Autocomplete</h1>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/autocomplete-errors">another page right here</router-link>
    </div>

    <div v-for="(testCase, idx) in testCases.slice(0, 13)" :key="idx" :data-test-case="idx">
      <div>
        <h2>Test case  {{ idx }}</h2>
        <div>
          <ul style="text-align: left">
            <li><strong>helpMessage:</strong> {{testCase.helpMessage}}</li>
            <li><strong>debounceInput:</strong> {{testCase.debounceInput}}</li>
            <li><strong>inlineAutocomplete:</strong> {{testCase.inlineCompletion}}</li>
            <li><strong>leadingIcon:</strong> {{testCase.leadingIcon}}</li>
            <li><strong>required:</strong> {{testCase.required}}</li>
            <li><strong>disabled:</strong> {{testCase.disabled}}</li>
            <li><strong>minInputLength:</strong> {{testCase.minInputLength}}</li>
            <li><strong>readonly:</strong> {{testCase.readonly}}</li>
            <li><strong>Prefilled with:</strong>{{initalTestCases[idx].searchInputValue}}</li>
            <li><strong>Simulates long retrieval:</strong> {{testCase.simulateLongRetrieval}}</li>
            <li><strong>Flat:</strong> {{testCase.flat}}</li>
          </ul>
        </div>
      </div>
      <nck-autocomplete
        :ref="'autocomplete_' + idx"
        v-model="testCase.model"
        v-model:searchInput="testCase.searchInputValue"
        label="Choose your destination"
        :leadingIcon="testCase.leadingIcon"
        clearButtonAltText="Clear destination"
        :helpMessage="testCase.helpMessage"
        :required="testCase.required"
        :disabled="testCase.disabled"
        :readonly="testCase.readonly"
        :minInputLength="testCase.minInputLength"
        :inlineAutocomplete="testCase.inlineCompletion"
        :proposalsRetriever="getMatchingProposalsRetriever(testCase)"
        :debounceInput="testCase.debounceInput"
        :flat="testCase.flat"
        loadingText="Loading the matching destinations"
        invalidSelectionErrorText="Select a valid destination"
        noMatchesFoundText="No matching destination found"
        errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
        numberOfMatchingResultsWording="numberResultsAreAvailable"
        :rules="testCase.rules" />
      <div style="padding-top: 15rem">
        <div>
          <label style="padding: 1rem">
            <input type="checkbox" v-model="testCase.failResultsRetrieval" data-force-retrieval-error/>
            Fail results retrieval
          </label>
        </div>
        <div>
          <button data-prefill-action @click="prefill(idx)">Prefill</button>
          <button data-validate-action @click="validate(idx)">Validate</button>
          <button data-check-validity-action @click="checkValidity(idx)">Is autocomplete valid?</button>{{inputIsValid[idx]}}
          <button v-if="idx === 1 || idx === 2" data-focus-input @click="focusAutocomplete(idx)">focus</button>
        </div>
        <div style="text-align: left">
          <div><strong>Search input value:</strong> {{testCase.searchInputValue}}</div>
          <div><strong>Selected value:</strong> {{testCase.model}}</div>
        </div>
      </div>
    </div>

    <div :data-test-case="13">
      <div>
        <h2>Test case 13</h2>
        <div>
          Hitting keyboard enter key on autocomplete proposal should not post parent form
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <nck-autocomplete
          v-model="testCases[0].model"
          v-model:searchInput="testCases[0].searchInputValue"
          label="Choose your destination"
          clearButtonAltText="Clear destination"
          :proposalsRetriever="getMatchingProposalsRetriever(testCases[0])"
          loadingText="Loading the matching destinations"
          invalidSelectionErrorText="Select a valid destination"
          noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
          <button style="margin-top: 1rem" type="submit">Submit</button>
      </form>
      <div style="padding-top: 15rem">
        Form was submitted: {{formWasSubmitted}}
      </div>
    </div>

    <div v-for="(testCase, idx) in testCases.slice(13)" :key="idx + 14" :data-test-case="idx + 14">
      <div>
        <h2>Test case  {{ idx + 14 }}</h2> {{testCase.testDescription}}
        <div>
          <ul style="text-align: left">
            <li><strong>helpMessage:</strong> {{testCase.helpMessage}}</li>
            <li><strong>debounceInput:</strong> {{testCase.debounceInput}}</li>
            <li><strong>inlineAutocomplete:</strong> {{testCase.inlineCompletion}}</li>
            <li><strong>leadingIcon:</strong> {{testCase.leadingIcon}}</li>
            <li><strong>required:</strong> {{testCase.required}}</li>
            <li><strong>disabled:</strong> {{testCase.disabled}}</li>
            <li><strong>minInputLength:</strong> {{testCase.minInputLength}}</li>
            <li><strong>readonly:</strong> {{testCase.readonly}}</li>
            <li v-once><strong>Prefilled with:</strong>{{testCase.searchInputValue}}</li>
            <li><strong>Simulates long retrieval:</strong> {{testCase.simulateLongRetrieval}}</li>
            <li><strong>Flat:</strong> {{testCase.flat}}</li>
            <li><strong>autoSelect:</strong> {{testCase.autoSelect}}</li>
            <li><strong>acceptArbitraryInput:</strong> {{testCase.acceptArbitraryInput}}</li>
            <li v-if="testCase.maxHeight"><strong>maxHeight:</strong> {{testCase.maxHeight}}</li>
            <li v-if="testCase.stickyInput"><strong>stickyInput:</strong> {{testCase.stickyInput}}</li>
            <li v-if="testCase.rules"><strong>validation rules:</strong> {{testCase.rules ? "yes" : "no"}}</li>
          </ul>
        </div>
      </div>
      <div :style="{ height: testCase.containerHeight }">
        <nck-autocomplete
          :ref="'autocomplete_' + (idx + 14)"
          v-model="testCase.model"
          v-model:searchInput="testCase.searchInputValue"
          :leadingIcon="testCase.leadingIcon"
          :helpMessage="testCase.helpMessage"
          :required="testCase.required"
          :disabled="testCase.disabled"
          :readonly="testCase.readonly"
          :minInputLength="testCase.minInputLength"
          :inlineAutocomplete="testCase.inlineCompletion"
          :debounceInput="testCase.debounceInput"
          :proposalsRetriever="getMatchingProposalsRetriever(testCase)"
          :flat="testCase.flat"
          :autoSelect="testCase.autoSelect"
          :acceptArbitraryInput="testCase.acceptArbitraryInput"
          arbitraryInputPrefixIcon="search"
          arbitraryInputWrappingWording="searchForArbitraryInput"
          label="Choose your destination"
          clearButtonAltText="Clear destination"
          loadingText="Loading the matching destinations"
          noMatchesFoundText="No matching destination found"
          invalidSelectionErrorText="Select a valid destination"
          numberOfMatchingResultsWording="numberResultsAreAvailable"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          :maxHeight="testCase.maxHeight"
          :stickyInput="testCase.stickyInput"
          :rules="testCase.rules"
          @input-focused="() => { testCase.inputFocused ? testCase.inputFocused(idx + 14) : null }"
          @input-blurred="() => { testCase.inputBlurred ? testCase.inputBlurred(idx + 14) : null }"
        />
      </div>
      <div style="padding-top: 15rem">
        <div>
          <label style="padding: 1rem">
            <input type="checkbox" v-model="testCase.failResultsRetrieval" data-force-retrieval-error/>
            Fail results retrieval
          </label>
        </div>
        <div>
          <button data-prefill-action @click="prefill(idx + 13)">Prefill</button>
          <button data-validate-action @click="validate(idx + 14)">Validate</button>
          <button data-check-validity-action @click="checkValidity(idx + 14)">Is autocomplete valid?</button>{{inputIsValid[idx + 14]}}
          <button data-focus-input @click="focusAutocomplete(idx + 14)">focus</button>
        </div>
        <div style="text-align: left">
          <div><strong>Search input value:</strong> {{testCase.searchInputValue}}</div>
          <div><strong>Selected value:</strong> {{testCase.model}}</div>
          <div v-if="testCase.inputFocused"><strong>Input was focused once:</strong> {{ inputWasFocused[idx + 14] }}</div>
          <div v-if="testCase.inputBlurred"><strong>Input was blurred once:</strong> {{ inputWasBlurred[idx + 14] }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
  [data-test-case] {
    padding: .5rem;
  }
</style>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { NckAutocomplete, INckAutocomplete, IAutocompleteItem, ValidationRule } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "@/components/PreloadIconComponent.vue";

interface AutocompleteTestDescription {
  addresses: IAutocompleteItem[];
  helpMessage: string | null;
  debounceInput: boolean;
  inlineCompletion: boolean;
  leadingIcon: string | null;
  required: boolean;
  disabled: boolean;
  minInputLength: number;
  readonly: boolean;
  model: unknown | null;
  searchInputValue: string;
  failResultsRetrieval: boolean;
  simulateLongRetrieval: boolean;
  flat: boolean;
  autoSelect?: boolean;
  acceptArbitraryInput?: boolean;
  testDescription?: string;
  maxHeight: number | undefined;
  stickyInput: boolean | undefined;
  containerHeight: string | undefined;
  rules: ValidationRule[] | undefined;
  inputFocused: (($event: Event) => void) | null;
  inputBlurred: (($event: Event) => void) | null;
}

const allAddresses = ref<IAutocompleteItem[]>([
  {
    label: "Paris, France",
    subLabel: "The city of lights",
    value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "Gare de Lyon, Paris",
    value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "location"
  },
  {
    label: "Aéroport Paris CDG",
    value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
    leadingIcon: "time"
  },
  {
    label: "London",
    subLabel: "United Kingdom",
    value: { displayAddress: "London", cityCode: "LON", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "London Gatwick international airport at 25km of London city center",
    value: { displayAddress: "London Gatwick international", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "plane"
  },
  {
    label: "London Saint Pancras",
    value: { displayAddress: "London Saint Pancras", cityCode: "SPC", lat: -33.145, lon: 42.34 },
    leadingIcon: "train"
  },
  {
    label: "Koh Lanta",
    value: { displayAddress: "Koh Lanta", cityCode: "KLT", lat: 3.145, lon: 2.34 }
  },
  {
    label: "Koh Tao",
    value: { displayAddress: "Koh Tao", cityCode: "KTA", lat: 34.145, lon: 12.34 }
  },
  {
    label: "Koh Samui",
    value: { displayAddress: "Koh Samui", cityCode: "KSA", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Rok",
    value: { displayAddress: "Koh Rok", cityCode: "KRO", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Rok Nuy",
    value: { displayAddress: "Koh Rok Nuy", cityCode: "KRN", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Phiphi",
    value: { displayAddress: "Koh Phiphi", cityCode: "KPP", lat: -33.145, lon: 42.34 }
  }
]);
const helpMessage = ref<string | null>("Please enter the right number of characters to get results");
const rules: ValidationRule[] = [
  new ValidationRule((value: string) => value.includes("Koh"), "The selected value must contain 'Koh'")
];

const testCases = ref<AutocompleteTestDescription[]>([
  {
    helpMessage: helpMessage.value,
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "location",
    required: true,
    model: allAddresses.value[4].value,
    disabled: true,
    minInputLength: 0,
    readonly: true,
    addresses: allAddresses.value,
    searchInputValue: allAddresses.value[4].label,
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "",
    required: false,
    model: null,
    disabled: false,
    minInputLength: 3,
    readonly: true,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: false,
    leadingIcon: "location",
    required: false,
    model: allAddresses.value[4].value,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: allAddresses.value[4].label,
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: helpMessage.value,
    debounceInput: false,
    inlineCompletion: true,
    leadingIcon: "",
    required: true,
    model: null,
    disabled: true,
    minInputLength: 3,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: helpMessage.value,
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "location",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "",
    required: false,
    model: allAddresses.value[4].value,
    disabled: true,
    minInputLength: 3,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: allAddresses.value[4].label,
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: helpMessage.value,
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "location",
    required: false,
    model: allAddresses.value[4].value,
    disabled: true,
    minInputLength: 3,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: allAddresses.value[4].label,
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "",
    required: false,
    model: null,
    disabled: false,
    minInputLength: 3,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: true,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 3,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: true,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: true,
    flat: true,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: true,
    leadingIcon: "",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: true,
    simulateLongRetrieval: false,
    flat: true,
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    // Test case 14 :
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: false,
    leadingIcon: "",
    required: false,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    autoSelect: false,
    acceptArbitraryInput: false,
    testDescription: "Autocomplete with Manual selection",
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    // Test case 15 :
    helpMessage: "",
    debounceInput: true,
    inlineCompletion: false,
    leadingIcon: "",
    required: false,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: false,
    autoSelect: false,
    acceptArbitraryInput: true,
    testDescription: "Autocomplete with popover with short maxHeight",
    maxHeight: 8,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    // Test case 16 :
    helpMessage: "",
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "",
    required: false,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: false,
    flat: true,
    autoSelect: false,
    acceptArbitraryInput: true,
    testDescription: "Autocomplete flat with long maxHeight",
    maxHeight: 25,
    stickyInput: undefined,
    containerHeight: undefined,
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    // Test case 17 :
    helpMessage: "Test help message",
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "plus",
    required: true,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: true,
    flat: true,
    autoSelect: false,
    acceptArbitraryInput: true,
    testDescription: "Autocomplete flat with sticky input",
    maxHeight: undefined,
    stickyInput: true,
    containerHeight: "20rem",
    rules: undefined,
    inputFocused: null,
    inputBlurred: null
  }, {
    // Test case 18 :
    helpMessage: "",
    debounceInput: false,
    inlineCompletion: false,
    leadingIcon: "",
    required: false,
    model: null,
    disabled: false,
    minInputLength: 0,
    readonly: false,
    addresses: allAddresses.value,
    searchInputValue: "",
    failResultsRetrieval: false,
    simulateLongRetrieval: true,
    flat: false,
    autoSelect: false,
    acceptArbitraryInput: false,
    testDescription: "Autocomplete with attached focus and blur events + custom rules only accepting selections containing 'Koh'",
    maxHeight: undefined,
    stickyInput: undefined,
    containerHeight: undefined,
    rules,
    inputFocused,
    inputBlurred
  }
]);
const inputIsValid = ref<boolean[]>(new Array(testCases.value.length + 1).fill(true));
const inputWasFocused = ref<boolean[]>(new Array(testCases.value.length + 1).fill(false));
const inputWasBlurred = ref<boolean[]>(new Array(testCases.value.length + 1).fill(false));
const formWasSubmitted = ref<boolean>(false);

const currentInstance = getCurrentInstance()?.proxy;

function checkValidity(index: number) {
  const autocomplete = currentInstance?.$refs[`autocomplete_${index}`];
  if (Array.isArray(autocomplete) && autocomplete[0]) {
    inputIsValid.value[index] = (autocomplete[0] as INckAutocomplete).isValid();
  }
}

function validate(index: number) {
  const autocomplete = currentInstance?.$refs[`autocomplete_${index}`];
  if (Array.isArray(autocomplete) && autocomplete[0]) {
    void (autocomplete[0] as INckAutocomplete).validate();
  }
}

function prefill(index: number) {
  // Because there are 2 disctinct props (v-mode & searchInput)
  // for prefilling the value & the text input value, there is a risk of desynchro
  // but this is up to the consuming app to make sure it does not happen!
  testCases.value[index].model = allAddresses.value[0].value;
  testCases.value[index].searchInputValue = allAddresses.value[0].label;
}

function getMatchingProposalsRetriever(testCase: Partial<AutocompleteTestDescription>) {
  return testCase.failResultsRetrieval
    ? getFailingProposalsRetriever
    : testCase.simulateLongRetrieval
      ? getDelayedProposalsRetriever
      : getProposalsRetriever;
}

async function getProposalsRetriever(input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((resolve, _reject) => {
    const lowerCasedInput = input.toLowerCase();
    const result = allAddresses.value.filter(
      (address) => address.label.toLowerCase().includes(lowerCasedInput));
    resolve(result);
  });
}

async function getDelayedProposalsRetriever(input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((resolve, _reject) => {
    setTimeout(() => {
      const result = allAddresses.value.filter(
        (address) => address.label.toLowerCase().includes(input.toLowerCase()));
      resolve(result);
    }, 800);
  });
}

async function getFailingProposalsRetriever(_input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((_resolve, reject) => {
    setTimeout(() => { reject(new Error("Failed to retrieve proposals")); }, 0);
  });
}

function submitForm() {
  formWasSubmitted.value = true;
  return false;
}

function focusAutocomplete(idx: number) {
  const input = currentInstance?.$refs[`autocomplete_${idx}`];
  if (Array.isArray(input)) { // it's an array because it is in a v-for
    if (input[0]) {
      (input[0] as INckAutocomplete).focus();
    }
  }
}

function inputFocused(testCase: number): void {
  inputWasFocused.value[testCase] = true;
}

function inputBlurred(testCase: number): void {
  inputWasBlurred.value[testCase] = true;
}

const initalTestCases = JSON.parse(JSON.stringify(testCases.value));
</script>

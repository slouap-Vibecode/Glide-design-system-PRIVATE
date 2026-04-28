<template>
  <div>
    <PreloadIconComponent :iconsToPreload="[
      'glyphs-warning-filled'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <b id="tc0FormId">Test case 0</b>
      <p class="test-app-style">
        A simple form with a required text input
      </p>
      <p class="test-app-style">
        <nck-form ref="tc0Form" labelId="tc0FormId" id="form0" @submit="validateForm(0)">
          <nck-text-input label="Required input" name="tc0.1" required v-model="data[0].value1" />
        </nck-form>
      </p>
      <p class="test-app-style">
        <nck-button label="Validate" form="form0" controlType="submit" />
      </p>
      <p class="test-app-style">The form is : {{ data[0].valid }}</p>
    </div>

    <div data-test-case="1">
      <b id="tc1FormId">Test case 1</b>
      <p class="test-app-style">
        A form with text input and text area, both with custom rules
      </p>
      <p class="test-app-style">
        <nck-form ref="tc1Form" labelId="tc1FormId" id="form1" @submit="validateForm(1)">
          <template #error-container>
            <p v-for="error in errorsForForm1" :key="error">{{ error }}</p>
          </template>
          <template #default>
            <nck-text-input label="Only two chars please" name="tc1.1" :rules="[rules.max2Chars]"
              v-model="data[1].value1" />
            <nck-text-area label="Only letters please" name="tc1.2" :rules="[rules.lettersOnly]"
              v-model="data[1].value2" />
          </template>
        </nck-form>
      </p>
      <p class="test-app-style">
        <nck-button label="Validate" form="form1" controlType="submit" />
      </p>
      <p class="test-app-style">The form is : {{ data[1].valid }}</p>
      <p class="test-app-style">
        <button data-add-general-error @click="addErrorForForm1">Add general error on form</button>
        <button data-focus-form-beginning @click="focusBegginningOfForm1">Focus beginning of form</button>
      </p>
    </div>

    <div data-test-case="2">
      <b id="tc2FormId">Test case 2</b>
      <p class="test-app-style">
        A more complex form with a text input, a required dropdown, a text area,
        radio buttons, and toggle chip group, phone number input nested in divs, and a text input which is required and readonly.
        For the autocomplete, the expected value to type is "Koh", to have some
        results.
      </p>
      <p class="test-app-style">
        <nck-form ref="tc2Form" labelId="tc2FormId" id="form2" @submit="validateForm(2)">
          <div>
            <nck-text-input label="Required input" name="tc2.1" required v-model="data[2].value1" />
          </div>
          <div>
            <nck-dropdown label="Required dropdown" :options="dropdownOptions" name="tc2.2" required
              v-model="data[2].value2" />
          </div>
          <div class="twocolumns">
            <div>
              <nck-text-area label="Required text area" name="tc2.3" required v-model="data[2].value3" />
            </div>
            <div>
              <nck-radio-buttons groupLabel="Choose wisely" :options="radioButtonsOptions"
                :direction="GroupDirection.VERTICAL" name="tc2.4" required v-model="data[2].value4" />
            </div>
          </div>
          <div>
            <nck-autocomplete ref="autocomplete" v-model="autocompleteSelection" label="Required autocomplete"
              clearButtonAltText="Clear autocomplete" :required="true" :debounceInput="false" :minInputLength=3
              :proposalsRetriever="getProposalsRetriever" loadingText="Loading the matching proposals"
              loadingFinishedText="Matching proposals loaded"
              invalidSelectionErrorText="Select a valid proposalsproposals"
              noMatchesFoundText="No matching proposals found"
              errorRetrievingProposalsText="Unable to find proposals at the moment. Please try again after few minutes."
              numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
          </div>
          <div>
            <nck-datepicker-range v-model="datepickerDates" required startRangeName="startInput" endRangeName="endInput"
              startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today" />
          </div>
          <div>
            <nck-toggle-chip-group label="Required group" name="tc2.8" required v-model="data[2].value5"
              :options="toogleChipGroupOptions" />
          </div>

          <div>
            <nck-phone-number-input
              v-model="data[2].value6"
              :countries="countries"
              countryDropdownLabel="Country"
              label="Required phone number input"
              required
              name="tc2.9"
            />
          </div>
          <div>
             <nck-text-input label="Required readonly input" v-model="data[2].value7" name="tc2.10" readonly required/>
          </div>
        </nck-form>
      </p>
      <p class="test-app-style">
        <nck-button class="button-validate" data-validate label="Validate" form="form2" controlType="submit" />
        <nck-button label="Reset errors" data-reset @click="resetFormValidation(2)" />
      </p>
      <p class="test-app-style">The form is : {{ data[2].valid }}</p>
    </div>

    <div data-test-case="3">
      <b id="tc3FormId">Test case 3</b>
      <p class="test-app-style">
        An NCK Form of which the list of fields can change between its initial display and its final display before submission.
      </p>
      <p class="test-app-style">
        <nck-form ref="tc3Form" labelId="tc3FormId">
          <template v-if="!alternativeFormIsDisplayed">
            <div>
              <nck-text-input label="Required input" name="tc31" required v-model="data[3].value1" />
            </div>
            <div>
              <nck-dropdown label="Required dropdown" :options="dropdownOptions" name="tc32" required
                v-model="data[3].value2" />
            </div>
          </template>
          <div>
            <div>
              <nck-text-input label="Required input always displayed" name="tc33" required v-model="data[3].value3" />
            </div>
          </div>
          <template v-if="alternativeFormIsDisplayed">
            <div>
              <nck-text-input label="Other required input not shown initially" name="tc34" required v-model="data[3].value4" />
            </div>
          </template>
        </nck-form>
      </p>
      <p class="test-app-style">
        <nck-button class="button-validate" data-validate label="Validate" @click="validateForm(3)" />
        <nck-button data-switch-fields label="Switch fields" @click="alternativeFormIsDisplayed = !alternativeFormIsDisplayed" />
        <nck-button label="Reset errors" data-reset @click="resetFormValidation(3)" />
      </p>
      <p class="test-app-style">The form is : {{ data[3].valid }}</p>
    </div>

    <div data-test-case="4">
      <b id="tc4FormId">Test case 4</b>
      <p class="test-app-style">
        An NCK Form allowing to test cross-field validation : the 1st field has a rule checking if its value is equal to the 2nd field one.
      </p>
      <p class="test-app-style">
        <nck-form ref="tc4Form" labelId="tc4FormId">
          <div>
            <nck-text-input label="Required input that must also be equal to one below" name="tc41" required v-model="data[4].value1" :rules="[rules['crossField']]" />
          </div>
          <div>
            <nck-text-input label="Required input" name="tc42" required v-model="data[4].value2" />
          </div>
        </nck-form>
      </p>
      <p class="test-app-style">
        <nck-button class="button-validate" data-validate label="Validate" @click="validateForm(4, 'tc4Form')" />
      </p>
      <p class="test-app-style">The form is : {{ data[4].valid }}</p>
    </div>

  </div>
</template>

<style lang="less" scoped>
[data-test-case="2"], [data-test-case="3"], [data-test-case="4"] {
  form > div {
    margin: 5px;
  }

  [data-reset], [data-switch-fields] {
    margin-left: 5px;
  }
}

.twocolumns {
  display: block;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import {
  NckForm,
  NckTextInput,
  NckTextArea,
  NckDropdown,
  NckRadioButtons,
  NckButton,
  NckAutocomplete,
  NckDatepickerRange,
  IDropdownOption,
  IRadioButtonOption,
  GroupDirection,
  ValidationRule,
  INckForm,
  IAutocompleteItem,
  NckToggleChipGroup,
  NckPhoneNumberInput
} from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";

interface IData {
  value1: string;
  value2?: string;
  value3?: string;
  value4?: string;
  value5?: unknown[];
  value6?: string;
  value7?: string;
  valid: string;
}

const rules = ref<Record<string, ValidationRule>>({
  lettersOnly: new ValidationRule((value: string) => /^[a-zA-Z]+$/.test(value), "This field should contain only letters"),
  max2Chars: new ValidationRule((value: string) => !value || value.length <= 2, "This field cannot contain more than 2 characters"),
  crossField: new ValidationRule((value: string, otherFields?: Record<string, any>) => !!otherFields && value === otherFields["tc42"], "This field must be equal to the one below", "tc42")
});

const data = ref<IData[]>([
  { value1: "", valid: "" },
  { value1: "abc", value2: "123", valid: "" },
  {
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: [],
    value6: "",
    value7: "",
    valid: ""
  },
  {
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    valid: ""
  },
  {
    value1: "",
    value2: "",
    valid: ""
  }
]);
const dropdownOptions = ref<IDropdownOption[]>([
  { label: "a string", value: "string value" },
  { label: "a number value", value: 1 },
  { label: "a boolean", value: true }
]);
const radioButtonsOptions = ref<IRadioButtonOption[]>([
  { value: "1", text: "Pain au chocolat" },
  { value: "2", text: "Chocolatine" }
]);
const toogleChipGroupOptions = ref<Array<{ label: string; value: string }>>([
  { value: "1", label: "Pain au chocolat" },
  { value: "2", label: "Chocolatine" }
]);
const autocompleteProposals = ref<IAutocompleteItem[]>([
  { label: "Koh Lanta", value: { displayAddress: "Koh Lanta", CityCode: "KOL", Lat: 3.145, Lon: 2.34 } },
  { label: "Koh Tao", value: { displayAddress: "Koh Tao", CityCode: "KOT", Lat: 34.145, Lon: 12.34 } },
  { label: "Koh Samui", value: { displayAddress: "Koh Samui", CityCode: "KOS", Lat: -33.145, Lon: 42.7 } },
  { label: "Koh Rok", value: { displayAddress: "Koh Rok", CityCode: "KOR", Lat: -33.78, Lon: 42.98 } },
  { label: "Koh Rok Nuy", value: { displayAddress: "Koh Rok Nuy", CityCode: "KON", Lat: -33.98, Lon: 42.65 } },
  { label: "Koh Phiphi", value: { displayAddress: "Koh Phiphi", CityCode: "KOP", Lat: -33.12, Lon: 42.78 } }
]);

const countries = [
  { label: "France (+33)", value: "FR" },
  { label: "United Kingdom (+44)", value: "GB" },
  { label: "United States (+1)", value: "US" }
];

const autocompleteSelection = ref<IAutocompleteItem | null>();
const errorsForForm1 = ref<string[]>([]);
const datepickerDates = ref<Array<Date | null>>([ null, null ]);
const today = ref<Date>(new Date(2022, 8, 1));
const tc0Form = ref<INckForm | null>(null);
const tc1Form = ref<INckForm | null>(null);
const tc2Form = ref<INckForm | null>(null);
const tc3Form = ref<INckForm | null>(null);
const tc4Form = ref<INckForm | null>(null);
const alternativeFormIsDisplayed = ref<Boolean>(false);

function addErrorForForm1() {
  const errorIndex = errorsForForm1.value.length + 1;
  errorsForForm1.value.push(`This is error n°${errorIndex}`);
}

function focusBegginningOfForm1() {
  if (tc1Form.value) {
    tc1Form.value.focusBeginningOfForm();
  }
}

function getFormRef(tcIndex: number) {
  switch (tcIndex) {
    case 0:
      return tc0Form;
    case 1:
      return tc1Form;
    case 2:
      return tc2Form;
    case 3:
      return tc3Form;
    case 4:
      return tc4Form;
  }
}

function validateForm(tcIndex: number) {
  const form = getFormRef(tcIndex);
  if (form?.value) {
    void form.value.validate().then((result: boolean) => {
      data.value[tcIndex].valid = result ? "valid" : "invalid";
      if (form?.value && !result) {
        form.value.focusFirstInvalidField();
      }
    });
  }
}

function resetFormValidation(tcIndex: number) {
  const form = getFormRef(tcIndex);
  if (form?.value) {
    form.value.resetValidation();
  }
}

async function getProposalsRetriever(input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const result = autocompleteProposals.value.filter(
        (proposal) => proposal.label.toLowerCase().includes(input.toLowerCase()));
      resolve(result);
    }, 0);
  });
}
</script>

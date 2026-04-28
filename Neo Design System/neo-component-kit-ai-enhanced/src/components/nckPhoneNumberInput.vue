<template>
  <nck-text-input
    v-if="selectableItems.length"
    ref="phoneNumberInput"
    :modelValue="modelValue"
    :name="name"
    :label="label"
    autocompleteType="tel"
    inputMode="tel"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :rules="rules"
    :helpMessage="helpMessage"
    class="nck-style nck-internal nck-phone-number-input"
    @update:model-value="updateValue"
  >
    <template v-if="!readonly" #leading-content>
      <NckDropdown
        :modelValue="internalSelectedCountry"
        :label="countryDropdownLabel"
        hideLabel
        :options="countries"
        :disabled="disabled"
        :invalid="!isValid"
        :triggerToSyncPositionWith="inputControlContainer"
        class="country-dropdown"
        @update:model-value="updateSelectedCountry"
      >
        <template #custom-displayed-value>
          <!-- TODO: Replace by country flag -->
          <span v-text="internalSelectedCountry" />
        </template>
      </NckDropdown>
    </template>
  </nck-text-input>
</template>

<style lang="less" scoped>
.nck-style.nck-internal.nck-phone-number-input {
  .country-dropdown:has(button:focus) {
    position: relative;
    z-index: 2;
  }
}
</style>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";

import NckTextInput from "@/components/nckTextInput.vue";
import NckDropdown from "@/components/nckDropdown.vue";

import { DividerToken, DIVIDER_TOKEN } from "@/constants/dividerToken";

import { IDropdownOption } from "@/models/iDropdownOption";

import { IFormFieldWithValidationAndCustomRulesProps } from "./interfaces/internal/iFormFieldWithValidationAndCustomRulesProps";
import { INameFormFieldProps } from "./interfaces/internal/iNameFormFieldProps";

/**
 * @component
 * @displayName nck-phone-number-input
 *
 * An input field for phone number.
 *
 * Disclaimer: This component doesn't do any phone number validation (at least not until now). You can still implement it using a third-party library (e.g. [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)) and the `rules` property (see example below).
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
    - error: Error
    - requiredField: Error message when the field is required
    */

interface PhoneNumberInputProps extends INameFormFieldProps, IFormFieldWithValidationAndCustomRulesProps {
  /**
   * List of countries to display in the menu. It is an array of objects as follow:
   *
   *  - label (string, mandatory): Internationalized name of the country and its calling code (which can be got by using metadata from third-party library, e.g. [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js#getcountrycallingcodecountry-string-string))
   *  - value (string, mandatory): Alpha-2 country code
   *
   * If you want to insert a divider in the menu, you can use a DividerToken in place of an IDropdownOption object. But it should have at least on IDropdownOption object.
   */
  countries: Array<IDropdownOption<string> | DividerToken>;

  /**
   * Accessible label for the country selection dropdown
   */
  countryDropdownLabel: string;

  /**
   * Label of the field.
   */
  label: string;

  /**
   * Value of the field. This component supports `v-model` pattern.
   */
  modelValue: string;

  /**
   * Selected country (alpha-2) code.
   * Useful for pre-selecting a country.
   * Can be used with v-model arguments to update parent component with further updates to its value.
   * If the code doesn't exist in `countries` list, the first country in the list will be selected.
   */
  selectedCountry?: string;
}

const phoneNumberInputProps = defineProps<PhoneNumberInputProps>();

const emits = defineEmits<{
  /**
   * Emits when the phone number has been changed.
   * This component supports "v-model" pattern.
   */
  (event: "update:modelValue", newValue: string): void;

  /**
   * Emits when the selected country has been changed
   */
  (event: "update:selectedCountry", newValue: string): void;
}>();

const phoneNumberInput = ref<InstanceType<typeof NckTextInput> | null>(null);
const inputControlContainer = computed<HTMLDivElement | null>((): HTMLDivElement | null =>
  phoneNumberInput.value?.textInputContainer ? phoneNumberInput.value.textInputContainer.inputControlContainer : null,
);

const isValid = computed<boolean>(
  (): boolean => !phoneNumberInput.value?.hasBeenValidated() || phoneNumberInput.value.isValid(),
);

function updateValue(newValue: string): void {
  emits("update:modelValue", newValue);
}

const selectableItems = computed<Array<IDropdownOption<string>>>(() =>
  phoneNumberInputProps.countries.filter((item) => item !== DIVIDER_TOKEN),
);

const internalSelectedCountry = ref<string>();

watch(() => phoneNumberInputProps.selectedCountry, updateSelectedCountry, {
  immediate: true,
});

function updateSelectedCountry(selectedCountryCode: string | undefined): void {
  if (selectableItems.value.length) {
    const selectedItem = selectableItems.value.find((item: IDropdownOption) => item.value === selectedCountryCode);

    internalSelectedCountry.value = selectedItem?.value ?? selectableItems.value[0].value;

    // Validate the input when the country has been changed, unless it's empty
    if (phoneNumberInputProps.modelValue) {
      phoneNumberInput.value?.validate();
    }

    emits("update:selectedCountry", internalSelectedCountry.value);
  }
}

onBeforeMount((): void => {
  if (!selectableItems.value.length) {
    throw new Error("Fatal error in NckPhoneNumberInput: 'countries' should have at least one selectable option.");
  }
});
</script>

<docs>
  Here is the phone number input in its simplest form
  ```jsx
    let value = "";
    let selectedCountryCode = "";
    const countries = [
      { label: "France (+33)", value: "FR" },
      { label: "United Kingdom (+44)", value: "GB" },
      { label: "United States (+1)", value: "US" },
    ];

    <nck-phone-number-input
      v-model="value"
      :countries="countries"
      countryDropdownLabel="Country"
      label="Phone number"
      v-model:selectedCountry="selectedCountryCode"
    />

    <div v-text="`Country: ${selectedCountryCode}`" />
    <div v-text="`Phone number: ${value}`" />
  ```

  Mandatory field and help message
  ```jsx
    let value = "";
    let selectedCountryCode = "";
    const countries = [
      { label: "France (+33)", value: "FR" },
      { label: "United Kingdom (+44)", value: "GB" },
      { label: "United States (+1)", value: "US" },
    ];

    <nck-phone-number-input
      v-model="value"
      :countries="countries"
      countryDropdownLabel="Country"
      label="Phone number"
      helpMessage="Select a country and enter a phone number"
      required
      v-model:selectedCountry="selectedCountryCode"
    />

    <div v-text="`Country: ${selectedCountryCode}`" />
    <div v-text="`Phone number: ${value}`" />
  ```

  With a seperator in the country list
  ```jsx
    let value = "";
    let selectedCountryCode = "";
    const countries = [
      { label: "France (+33)", value: "FR" },
      { label: "United Kingdom (+44)", value: "GB" },
      { label: "United States (+1)", value: "US" },
      "nckDividerToken",
      { label: "Brazil (+55)", value: "BR" },
      { label: "Japan (+81)", value: "JP" },
      { label: "Vietnam (+84)", value: "VN" },
    ];

    <nck-phone-number-input
      v-model="value"
      :countries="countries"
      countryDropdownLabel="Country"
      label="Phone number"
      v-model:selectedCountry="selectedCountryCode"
    />

    <div v-text="`Country: ${selectedCountryCode}`" />
    <div v-text="`Phone number: ${value}`" />
  ```

  With country selected by default
  ```jsx
    let value = "";
    let selectedCountryCode = "US";
    const countries = [
      { label: "France (+33)", value: "FR" },
      { label: "United Kingdom (+44)", value: "GB" },
      { label: "United States (+1)", value: "US" },
    ];

    <nck-phone-number-input
      v-model="value"
      :countries="countries"
      countryDropdownLabel="Country"
      label="Phone number"
      v-model:selectedCountry="selectedCountryCode"
    />

    <div v-text="`Country: ${selectedCountryCode}`" />
    <div v-text="`Phone number: ${value}`" />
  ```

  Readonly and disabled
  ```jsx
    let value = "+1 213 373 4253 ext. 1234";
    let selectedCountryCode = "US";
    const countries = [
      { label: "France (+33)", value: "FR" },
      { label: "United Kingdom (+44)", value: "GB" },
      { label: "United States (+1)", value: "US" },
    ];
    let readonly = false;
    let disabled = false;

    <nck-phone-number-input
      v-model="value"
      :countries="countries"
      countryDropdownLabel="Country"
      label="Phone number"
      v-model:selectedCountry="selectedCountryCode"
      :readonly="readonly"
      :disabled="disabled"
    />

    <nck-switch v-model="readonly" label="Readonly" />
    <nck-switch v-model="disabled" label="Disabled" />

    <div v-text="`Country: ${selectedCountryCode}`" />
    <div v-text="`Phone number: ${value}`" />
  ```

  You can (and should) add custom validation to your field. This is the validation that controls the error state display, along with the messages. Only one error message is displayed at a time.

  You can use the "ValidationRule" class exported by the Neo Component Kit.

  This example below uses just simple and naive regex tests but in reality you should use a third-party library to get better metadata for phone validation.

  ```vue
    <template>
      <div>
        <nck-phone-number-input
          v-model="value"
          :countries="countryItems"
          countryDropdownLabel="Country"
          label="Phone number"
          v-model:selectedCountry="selectedCountryCode"
          required
          :rules="validationRules"
        />

        <div v-text="`Country: ${selectedCountryCode}`" />
        <div v-text="`Phone number: ${value}`" />
      </div>
    </template>

    <script>
    const countries = {
      FR: { name: "France", callingCode: "+33" },
      GB: { name: "United Kingdom", callingCode: "+44" },
      US: { name: "United States", callingCode: "+1" },
    };

    const phoneNumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const internationalPhoneNumberRegex =
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

    export default {
      data() {
        return {
          value: "",
          selectedCountryCode: "",
        };
      },

      computed: {
        countryItems: function () {
          const countryItems = [];

          for (const countryCode in countries) {
            if (Object.prototype.hasOwnProperty.call(countries, countryCode)) {
              countryItems.push({
                label: `${countries[countryCode].name} (${countries[countryCode].callingCode})`,
                value: countryCode,
              });
            }
          }

          return countryItems;
        },

        validationRules: function () {
          return [
            new ValidationRule(
              (value) =>
                phoneNumberRegex.test(value) ||
                internationalPhoneNumberRegex.test(value),
              "Please enter a valid phone number"
            ),
            new ValidationRule(
              (value) =>
                !internationalPhoneNumberRegex.test(value) ||
                value.startsWith(countries[this.selectedCountryCode].callingCode),
              "The calling code doesn't match the selected country"
            ),
          ]
        },
      },
    };
    </script>
```
</docs>

<template>
  <div>
    <preload-icon-component :iconsToPreload="['glyphs-warning-filled']" />

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/phone-number-input-errors"
        >another page right here</router-link
      >
    </div>

    <div data-test-case="0">
      <div>
        <b>Test case 0:</b>
        Required, with help message, country is pre-filled within the list.
      </div>

      <nck-phone-number-input
        ref="phoneNumberInput0"
        v-model="valueSet[0].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        :helpMessage="helpMessage"
        required
        v-model:selectedCountry="valueSet[0].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[0].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[0].value}`" />
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1:</b>
        Pre-filled input, with help message, country is pre-filled within the
        list.
      </div>

      <nck-phone-number-input
        v-model="valueSet[1].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        :helpMessage="helpMessage"
        v-model:selectedCountry="valueSet[1].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[1].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[1].value}`" />
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2:</b>
        Disabled.
      </div>

      <nck-phone-number-input
        v-model="valueSet[2].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        disabled
        v-model:selectedCountry="valueSet[2].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[2].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[2].value}`" />
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3:</b>
        Pre-filled input, disabled, country is pre-filled within the list.
      </div>

      <nck-phone-number-input
        v-model="valueSet[3].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        disabled
        v-model:selectedCountry="valueSet[3].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[3].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[3].value}`" />
    </div>

    <div data-test-case="4" style="background-color: lightgray">
      <div>
        <b>Test case 4:</b>
        Pre-filled input, <strong>readonly</strong>, country is pre-filled within the list.
      </div>

      <nck-phone-number-input
        v-model="valueSet[4].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        readonly
        v-model:selectedCountry="valueSet[4].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[4].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[4].value}`" />
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5:</b>
        With a seperator in the list of countries
      </div>

      <nck-phone-number-input
        v-model="valueSet[5].value"
        :countries="countryItemsWithDividerToken"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        v-model:selectedCountry="valueSet[5].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[5].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[5].value}`" />
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6:</b>
        With rules: digit only
      </div>

      <nck-phone-number-input
        v-model="valueSet[6].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        :rules="digitOnly"
        v-model:selectedCountry="valueSet[6].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[6].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[6].value}`" />
    </div>

    <div data-test-case="7">
      <div>
        <b>Test case 7:</b>
        With rules: should starts with matched calling code
      </div>

      <nck-phone-number-input
        v-model="valueSet[7].value"
        :countries="countryItems"
        :countryDropdownLabel="countryDropdownLabel"
        :label="label"
        :rules="shouldMatchCallingCodeRule"
        v-model:selectedCountry="valueSet[7].selectedCountry"
      />

      <div v-text="`Country: ${valueSet[7].selectedCountry}`" />
      <div v-text="`Phone number: ${valueSet[7].value}`" />
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  margin-top: 1.5rem;
  padding: 0 0.5rem;
}
</style>

<script setup lang="ts">
import { computed, type ComputedRef, ref, type Ref } from "vue";

import {
  NckPhoneNumberInput,
  DIVIDER_TOKEN,
  IDropdownOption,
  ValidationRule
} from "@neotechnologygroup/neo-component-kit";

import PreloadIconComponent from "@/components/PreloadIconComponent.vue";

const countryDropdownLabel = "Country";
const label = "Phone number";
const helpMessage = "Select a country and enter a phone number";

const countries: Record<string, { name: string; callingCode: string }> = {
  FR: { name: "France", callingCode: "+33" },
  GB: { name: "United Kingdom", callingCode: "+44" },
  US: { name: "United States", callingCode: "+1" }
};

const countryItems: ComputedRef<IDropdownOption[]> = computed<
IDropdownOption[]
>((): IDropdownOption[] => {
  const countryItems = [];

  for (const countryCode in countries) {
    if (Object.prototype.hasOwnProperty.call(countries, countryCode)) {
      countryItems.push({
        label: `${countries[countryCode].name} (${countries[countryCode].callingCode})`,
        value: countryCode
      });
    }
  }

  return countryItems;
});

const countryItemsWithDividerToken = [
  { label: "France (+33)", value: "FR" },
  { label: "United Kingdom (+44)", value: "GB" },
  { label: "United States (+1)", value: "US" },
  DIVIDER_TOKEN,
  { label: "Brazil (+55)", value: "BR" },
  { label: "Japan (+81)", value: "JP" },
  { label: "Vietnam (+84)", value: "VN" }
];

const valueSet: Ref<Array<{ value: string; selectedCountry?: string }>> = ref<
Array<{ value: string; selectedCountry?: string }>
>([
  { value: "", selectedCountry: "US" },
  { value: "+442071234567", selectedCountry: "GB" },
  { value: "" },
  { value: "+1 213 373 4253 ext. 1234", selectedCountry: "US" },
  { value: "+33660606060", selectedCountry: "FR" },
  { value: "" },
  { value: "" },
  { value: "+33660606060", selectedCountry: "FR" }
]);

const digitOnly: ValidationRule[] = [
  new ValidationRule(
    (value: string): boolean => /^[0-9]*$/.test(value),
    "Digits only"
  )
];

const shouldMatchCallingCodeRule: ComputedRef<ValidationRule[]> = computed<
ValidationRule[]
>((): ValidationRule[] => [
  new ValidationRule((value: string): boolean => {
    const selectedCountryCode = valueSet.value[7].selectedCountry;

    return (
      !selectedCountryCode ||
      value.startsWith(countries[selectedCountryCode].callingCode)
    );
  }, "The calling code doesn't match the selected country")
]);
</script>

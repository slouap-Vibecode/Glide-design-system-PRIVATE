<template>
  <div>
    <PreloadIconComponent :iconsToPreload="[
      'glyphs-warning-filled'
    ]" />
    <PreloadFontComponent />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      On this page, the date is forced to {{ today.toLocaleDateString("fr-FR") }} so that tests are consistent over time.
    </div>

    <div :data-test-case="0">
      <div>
        <b>Test case 0</b>
        A single datepicker on two months, required, with a valid date, left-aligned
        <nck-datepicker-single ref="datepicker0" v-model="values[0]" required name="TC0" label="Date"
          :todayDate="today" />
      </div>
      <div>
        Value : {{ displayValue(values[0]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(0)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(0)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(0)">isValid ?</button>
      </div>
      <p>{{ validated[0] }}</p>
      <p>{{ validity[0] }}</p>
    </div>

    <div :data-test-case="1">
      <div>
        <b>Test case 1</b>
        A single datepicker on two months, not required, with empty date, left-aligned
        <nck-datepicker-single ref="datepicker1" v-model="values[1]" name="TC1" label="Date" :todayDate="today" />
      </div>
      <div>
        Value : {{ displayValue(values[1]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(1)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(1)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(1)">isValid ?</button>
      </div>
      <p>{{ validated[1] }}</p>
      <p>{{ validity[1] }}</p>
    </div>

    <div :data-test-case="2">
      <div>
        <b>Test case 2</b>
        A single datepicker on two months, not required, with prefilled valid date, right-aligned, with a help message,
        with a max valid date
        <nck-datepicker-single ref="datepicker2" v-model="values[2]" name="TC2" label="Date" :todayDate="today"
          :popoverPosition="DatepickerPopoverPosition.RIGHT" helpMessage="Click to open the calendar"
          :maxDateAllowed="semiOpenRangeEndDate" afterMaxDateErrorMessage="Date should be before 10/02/2024" />
      </div>
      <div>
        Value : {{ displayValue(values[2]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(2)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(2)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(2)">isValid ?</button>
      </div>
      <p>{{ validated[2] }}</p>
      <p>{{ validity[2] }}</p>
    </div>

    <div :data-test-case="3">
      <div>
        <b>Test case 3</b>
        A single datepicker on two months, required, with empty date, right-aligned
        <nck-datepicker-single ref="datepicker3" v-model="values[3]" required name="TC3" label="Date" :todayDate="today"
          :popoverPosition="DatepickerPopoverPosition.RIGHT" />
      </div>
      <div>
        Value : {{ displayValue(values[3]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(3)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(3)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(3)">isValid ?</button>
      </div>
      <p>{{ validated[3] }}</p>
      <p>{{ validity[3] }}</p>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4</b>
        A single datepicker on two months, required, with empty date, left-aligned, wrapped in an NckForm.
        With rules to validate is not one year ahead.
        <nck-form ref="form4" labelId="formTitle4" id="form4">
          <h1 id="formTitle4">This is a single datepicker in a form</h1>
          <nck-datepicker-single ref="datepicker4" v-model="values[4]" required name="TC4" label="Date" :todayDate="today"
            :rules="rulesLessThanOneYearAhead" />
        </nck-form>
      </div>
      <div>
        Value : {{ displayValue(values[4]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(4)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateForm(4)">Validate form</button>
      </div>
      <p>{{ validated[4] }}</p>
    </div>

    <div :data-test-case="5">
      <div>
        <b>Test case 5</b>
        A single datepicker with a short valid period prefilled with invalid date wrapped in an NckForm.
        <nck-form ref="form5" labelId="formTitle5" id="form5">
          <h1 id="formTitle5">This is another single datepicker in a form</h1>
          <nck-datepicker-single ref="datepicker5" v-model="values[5]" name="TC5" label="Date" :todayDate="today"
            :minDateAllowed="closedRangeStartDate" :maxDateAllowed="closedRangeEndDate"
            beforeMinDateErrorMessage="This is too early" afterMaxDateErrorMessage="This is too late" />
        </nck-form>
      </div>
      <div>
        Value : {{ displayValue(values[5]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(5)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateForm(5)">Validate form</button>
      </div>
      <p>{{ validated[5] }}</p>
    </div>

    <div :data-test-case="6">
      <div>
        <b>Test case 6</b>
        A single datepicker on two months, required, disabled, with empty value, left-aligned
        <nck-datepicker-single ref="datepicker6" v-model="values[6]" required disabled name="TC6" label="Date"
          :todayDate="today" />
      </div>
      <div>
        Value : {{ displayValue(values[6]) }}
      </div>
      <div>
        <button class="test-app-style button-validate" @click="validateDatepicker(6)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(6)">isValid ?</button>
      </div>
      <p>{{ validated[6] }}</p>
      <p>{{ validity[6] }}</p>
    </div>

    <div :data-test-case="7" style="background-color: lightgray">
      <div>
        <b>Test case 7</b>
        A single datepicker on two months, not required, <strong>readonly</strong>
        <nck-datepicker-single ref="datepicker7" v-model="values[7]" readonly name="TC7" label="Date"
          :todayDate="today" />
      </div>
      <div>
        Value : {{ displayValue(values[7]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(7)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(7)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(7)">isValid ?</button>
      </div>
      <p>{{ validated[7] }}</p>
      <p>{{ validity[7] }}</p>
    </div>

    <div :data-test-case="8">
      <div>
        <b>Test case 8</b>
        A single datepicker on two months, required, with a valid date, left-aligned and leading icon
        <nck-datepicker-single ref="datepicker8" v-model="values[8]" required name="TC8" label="Date" :todayDate="today"
          hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[8]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(8)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(8)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(8)">isValid ?</button>
      </div>
      <p>{{ validated[8] }}</p>
      <p>{{ validity[8] }}</p>
    </div>

    <div :data-test-case="9">
      <div>
        <b>Test case 9</b>
        A single datepicker on two months, required, with no date, left-aligned and leading icon
        <nck-datepicker-single ref="datepicker9" v-model="values[9]" required name="TC9" label="Date" :todayDate="today"
          hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[9]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(9)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(9)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(9)">isValid ?</button>
      </div>
      <p>{{ validated[9] }}</p>
      <p>{{ validity[9] }}</p>
    </div>

    <div :data-test-case="10">
      <div>
        <b>Test case 10</b>
        A single datepicker on two months, required, disabled, with empty value, left-aligned, with leading icon
        <nck-datepicker-single ref="datepicker10" v-model="values[10]" required disabled name="TC10" label="Date"
          :todayDate="today" hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[10]) }}
      </div>
      <div>
        <button class="test-app-style button-validate" @click="validateDatepicker(10)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(10)">isValid ?</button>
      </div>
      <p>{{ validated[10] }}</p>
      <p>{{ validity[10] }}</p>
    </div>

    <div :data-test-case="11">
      <div>
        <b>Test case 11</b>
        A single datepicker on two months, required, readonly, with empty value, left-aligned, with leading icon
        <nck-datepicker-single ref="datepicker11" v-model="values[11]" required readonly name="TC11" label="Date"
          :todayDate="today" hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[11]) }}
      </div>
      <div>
        <button class="test-app-style button-validate" @click="validateDatepicker(11)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(11)">isValid ?</button>
      </div>
      <p>{{ validated[11] }}</p>
      <p>{{ validity[11] }}</p>
    </div>
  </div>
</template>

<style scoped lang="less">
[data-test-case] {
  padding: 0.5rem 1.5rem 25rem;

  p {
    margin: 0;
    height: 1.5rem;
  }
}

[data-test-case="6"],
[data-test-case="7"] {
  padding-bottom: 0;
}
</style>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { NckDatepickerSingle, INckDatepicker, DatepickerPopoverPosition, NckForm, INckForm, ValidationRule } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";
import PreloadFontComponent from "../components/PreloadFontComponent.vue";

const values = ref<Array<Date | null>>([
  new Date("2022-06-15T00:00:00"),
  null,
  new Date("2024-01-01T00:00:00"),
  null,
  null,
  new Date("1055-02-12T00:00:00"),
  null,
  new Date("2022-06-15T00:00:00"),
  new Date("2022-06-15T00:00:00"),
  null,
  null,
  null
]);
const validated = ref<string[]>(new Array(values.value.length).fill(""));
const validity = ref<string[]>(new Array(values.value.length).fill(""));
const today = ref<Date>(new Date("2022-05-19T00:00:00"));
const rulesLessThanOneYearAhead = ref<ValidationRule[]>([ getRulesLessThanOneYearAhead() ]);

const semiOpenRangeEndDate = new Date("2024-02-10T00:00:00");
const closedRangeStartDate = new Date("1055-02-15T00:00:00");
const closedRangeEndDate = new Date("1055-02-20T00:00:00");

const currentInstance = getCurrentInstance()?.proxy;

function getRulesLessThanOneYearAhead() {
  return new ValidationRule((date: Date) => {
    return !date || date < getDateInOneYear(today.value);
  }, "Date cannot be more than one year in the future");
}

function getDateInOneYear(date: Date) {
  const datePlusOneYear = new Date(date);
  datePlusOneYear.setFullYear(date.getFullYear() + 1);
  return datePlusOneYear;
}

function displayValue(value: Date | null) {
  return value === null ? "null" : value.toLocaleDateString("fr-FR");
}

function focusDatepicker(index: number) {
  const picker = currentInstance?.$refs[`datepicker${index}`];
  if (picker) {
    (picker as INckDatepicker).focus();
  }
}

function validateDatepicker(index: number) {
  const picker = currentInstance?.$refs[`datepicker${index}`];
  if (picker) {
    void (picker as INckDatepicker).validate().then(result => {
      validated.value[index] = result ? "Validated" : "Validated with errors";
    });
  }
}

function checkDatepickerValidity(index: number) {
  const picker = currentInstance?.$refs[`datepicker${index}`];
  if (picker) {
    const isValid = (picker as INckDatepicker).isValid();
    validity.value[index] = isValid ? "This date is valid" : "This date is invalid";
  }
}

function validateForm(index: number) {
  const form = currentInstance?.$refs[`form${index}`];
  if (form) {
    void (form as INckForm).validate().then(result => {
      validated.value[index] = result ? "Validated" : "Validated with errors";
    });
  }
}
</script>

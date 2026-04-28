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
      On this page, the date is forced to {{ today.toLocaleDateString("fr-FR") }} so that tests are consistent over
      time.
    </div>
    <!--div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/datepicker-range-errors">another page right here</router-link>
    </div-->

    <div :data-test-case="0">
      <div>
        <b>Test case 0</b>
        A range datepicker on two months, required, with valid dates, left-aligned
        <nck-datepicker-range ref="datepicker0" v-model="values[0]" required startRangeName="TC0_start"
          endRangeName="TC0_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today" />
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
        A range datepicker on two months, required, with invalid date order, left-aligned
        <nck-datepicker-range ref="datepicker1" v-model="values[1]" required startRangeName="TC1_start"
          endRangeName="TC1_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today" />
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
        A range datepicker on two months, not required, with empty dates, left-aligned
        <nck-datepicker-range ref="datepicker2" v-model="values[2]" startRangeName="TC2_start" endRangeName="TC2_end"
          startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today" />
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
        A range datepicker on two months, not required, with prefilled valid dates, right-aligned, with a help message,
        with a max valid date
        <nck-datepicker-range ref="datepicker3" v-model="values[3]" startRangeName="TC3_start" endRangeName="TC3_end"
          startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          :popoverPosition="DatepickerPopoverPosition.RIGHT" helpMessage="Click to open the calendar"
          :maxDateAllowed="semiOpenRangeEndDate" afterMaxDateErrorMessage="Date should be before 10/02/2024" />
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

    <div :data-test-case="4">
      <div>
        <b>Test case 4</b>
        A range datepicker on two months, required, with empty dates, right-aligned
        <nck-datepicker-range ref="datepicker4" v-model="values[4]" required startRangeName="TC4_start"
          endRangeName="TC4_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          :popoverPosition="DatepickerPopoverPosition.RIGHT" />
      </div>
      <div>
        Value : {{ displayValue(values[4]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(4)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(4)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(4)">isValid ?</button>
      </div>
      <p>{{ validated[4] }}</p>
      <p>{{ validity[4] }}</p>
    </div>

    <div :data-test-case="5">
      <div>
        <b>Test case 5</b>
        A range datepicker on two months, not required, with invalid date order, left-aligned, with a help message
        <nck-datepicker-range ref="datepicker5" v-model="values[5]" startRangeName="TC5_start" endRangeName="TC5_end"
          startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          helpMessage="Click to open the calendar" />
      </div>
      <div>
        Value : {{ displayValue(values[5]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(5)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(5)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(5)">isValid ?</button>
      </div>
      <p>{{ validated[5] }}</p>
      <p>{{ validity[5] }}</p>
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6</b>
        A range datepicker on two months, required, with empty dates, left-aligned, wrapped in an NckForm.
        With rules to validate is not one year ahead.
        <nck-form ref="form6" labelId="formTitle6" id="form6">
          <h1 id="formTitle6">This is a datepicker in a form</h1>
          <nck-datepicker-range ref="datepicker6" v-model="values[6]" required startRangeName="TC6_start"
            endRangeName="TC6_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
            :startRangeRules="startRangeRulesLessThanOneYearAhead" :endRangeRules="endRangeRulesLessThanOneYearAhead" />
        </nck-form>
      </div>
      <div>
        Value : {{ displayValue(values[6]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(6)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateForm(6)">Validate form</button>
      </div>
      <p>{{ validated[6] }}</p>
    </div>

    <div :data-test-case="7">
      <div>
        <b>Test case 7</b>
        A range datepicker on two months, required, disabled, with empty values, left-aligned
        <nck-datepicker-range ref="datepicker7" v-model="values[7]" required disabled startRangeName="TC7_start"
          endRangeName="TC7_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today" />
      </div>
      <div>
        Value : {{ displayValue(values[7]) }}
      </div>
      <div>
        <button class="test-app-style button-validate" @click="validateDatepicker(7)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(7)">isValid ?</button>
      </div>
      <p>{{ validated[7] }}</p>
      <p>{{ validity[7] }}</p>
    </div>

    <div :data-test-case="8">
      <div>
        <b>Test case 8</b>
        A range datepicker on two months, not required, readonly, with invalid date order
        <nck-datepicker-range ref="datepicker8" v-model="values[8]" readonly startRangeName="TC8_start"
          endRangeName="TC8_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today" />
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
        A range datepicker with a short valid period prefilled with invalid dates wrapped in an NckForm.
        <nck-form ref="form9" labelId="formTitle9" id="form9">
          <h1 id="formTitle9">This is another datepicker in a form</h1>
          <nck-datepicker-range ref="datepicker9" v-model="values[9]" startRangeName="TC9_start" endRangeName="TC9_end"
            startRangeLabel="The beginning" endRangeLabel="The end" :todayDate="today"
            :minDateAllowed="closedRangeStartDate" :maxDateAllowed="closedRangeEndDate"
            beforeMinDateErrorMessage="This is too early" afterMaxDateErrorMessage="This is too late" />
        </nck-form>
      </div>
      <div>
        Value : {{ displayValue(values[9]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(9)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateForm(9)">Validate form</button>
      </div>
      <p>{{ validated[9] }}</p>
    </div>

    <div :data-test-case="10">
      <div>
        <b>Test case 10</b>
        A range datepicker with a custom validation rule requiring dates to be less than 1 year appart
        <nck-form ref="form10" labelId="formTitle10" id="form10">
          <h1 id="formTitle10">This is yet another datepicker in a form</h1>
          <nck-datepicker-range ref="datepicker10" v-model="values[10]" startRangeName="TC10_start"
            endRangeName="TC10_end" startRangeLabel="The beginning" endRangeLabel="The end" :todayDate="today"
            :startRangeRules="startRangeRulesLessThanOneYearApart" :endRangeRules="endRangeRulesLessThanOneYearApart" />
        </nck-form>
      </div>
      <div>
        Value : {{ displayValue(values[10]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(10)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateForm(10)">Validate form</button>
      </div>
      <p>{{ validated[10] }}</p>
    </div>

    <div :data-test-case="11">
      <div>
        <b>Test case 11</b>
        A range datepicker on two months, required, with valid dates, left-aligned and leading icon
        <nck-datepicker-range ref="datepicker11" v-model="values[11]" required startRangeName="TC11_start"
          endRangeName="TC11_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[11]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(11)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(11)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(11)">isValid ?</button>
      </div>
      <p>{{ validated[11] }}</p>
      <p>{{ validity[11] }}</p>
    </div>

    <div :data-test-case="12">
      <div>
        <b>Test case 12</b>
        A range datepicker on two months, required, with no valid dates, left-aligned, leading icon
        <nck-datepicker-range ref="datepicker12" v-model="values[12]" required startRangeName="TC12_start"
          endRangeName="TC12_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[12]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(12)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(12)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(12)">isValid ?</button>
      </div>
      <p>{{ validated[12] }}</p>
      <p>{{ validity[12] }}</p>
    </div>

    <div :data-test-case="13">
      <div>
        <b>Test case 13</b>
        A range datepicker on two months, required, disabled, with empty values, left-aligned, with leading icon
        <nck-datepicker-range ref="datepicker13" v-model="values[13]" required disabled startRangeName="TC13_start"
          endRangeName="TC13_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[13]) }}
      </div>
      <div>
        <button class="test-app-style button-validate" @click="validateDatepicker(13)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(13)">isValid ?</button>
      </div>
      <p>{{ validated[13] }}</p>
      <p>{{ validity[13] }}</p>
    </div>

    <div :data-test-case="14" style="background-color: lightgray">
      <div>
        <b>Test case 14</b>
        A range datepicker on two months, required, <strong>readonly</strong>, with empty values, left-aligned, with leading icon
        <nck-datepicker-range ref="datepicker14" v-model="values[14]" required readonly startRangeName="TC14_start"
          endRangeName="TC14_end" startRangeLabel="Start date" endRangeLabel="End date" :todayDate="today"
          hasLeadingIcon />
      </div>
      <div>
        Value : {{ displayValue(values[14]) }}
      </div>
      <div>
        <button class="test-app-style button-validate" @click="validateDatepicker(14)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(14)">isValid ?</button>
      </div>
      <p>{{ validated[14] }}</p>
      <p>{{ validity[14] }}</p>
    </div>
  </div>
</template>

<style scoped lang="less">
[data-test-case] {
  padding: 0.5rem 1.5rem;

  p {
    margin: 0;
    height: 1.5rem;
  }
}
</style>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { NckDatepickerRange, INckDatepicker, DatepickerPopoverPosition, NckForm, INckForm, ValidationRule } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";
import PreloadFontComponent from "../components/PreloadFontComponent.vue";

const values = ref<Array<Array<Date | null>>>([
  [ new Date("2022-06-15T00:00:00"), new Date("2022-06-24T00:00:00") ],
  [ new Date("2022-06-15T00:00:00"), new Date("2022-06-14T00:00:00") ],
  [ null, null ],
  [ new Date("2024-01-01T00:00:00"), new Date("2024-01-15T00:00:00") ],
  [ null, null ],
  [ new Date("2022-06-15T00:00:00"), new Date("2022-06-14T00:00:00") ],
  [ null, null ],
  [ null, null ],
  [ new Date("2022-06-15T00:00:00"), new Date("2022-06-14T00:00:00") ],
  [ new Date("1055-02-12T00:00:00"), new Date("1055-02-23T00:00:00") ],
  [ new Date("1922-02-12T00:00:00"), new Date("1923-02-23T00:00:00") ],
  [ new Date("2022-06-15T00:00:00"), new Date("2022-06-24T00:00:00") ],
  [ null, null ],
  [ null, null ],
  [ null, null ]
]);
const validated = ref<string[]>(new Array(values.value.length).fill(""));
const validity = ref<string[]>(new Array(values.value.length).fill(""));
const today = ref<Date>(new Date("2022-05-19T00:00:00"));
const startRangeRulesLessThanOneYearAhead = ref<ValidationRule[]>([ getStartRangeRulesLessThanOneYearAhead() ]);
const endRangeRulesLessThanOneYearAhead = ref<ValidationRule[]>([ getEndRangeRulesLessThanOneYearAhead() ]);
const startRangeRulesLessThanOneYearApart = ref<ValidationRule[]>([ getLessThanOneYearApartValidationRule() ]);
const endRangeRulesLessThanOneYearApart = ref<ValidationRule[]>([ getLessThanOneYearApartValidationRule() ]);

const semiOpenRangeEndDate = new Date("2024-02-10T00:00:00");
const closedRangeStartDate = new Date("1055-02-15T00:00:00");
const closedRangeEndDate = new Date("1055-02-20T00:00:00");
const currentInstance = getCurrentInstance()?.proxy;

function getLessThanOneYearApartValidationRule() {
  return new ValidationRule((dates: Date[]) => {
    return !dates[0] || !dates[1] || getDateInOneYear(dates[0]) > dates[1];
  }, "Start & end date should be less than 1 year apart");
}

function getStartRangeRulesLessThanOneYearAhead() {
  return new ValidationRule((dates: Date[]) => {
    return !dates[0] || dates[0] < getDateInOneYear(today.value);
  }, "Start date cannot be more than one year in the future");
}

function getEndRangeRulesLessThanOneYearAhead() {
  return new ValidationRule((dates: Date[]) => {
    return !dates[1] || dates[1] < getDateInOneYear(today.value);
  }, "End date cannot be more than one year in the future");
}

function getDateInOneYear(date: Date) {
  const datePlusOneYear = new Date(date);
  datePlusOneYear.setFullYear(date.getFullYear() + 1);
  return datePlusOneYear;
}

function displayValue(value: Array<Date | null>) {
  return value.map((date) => date === null ? "null" : date.toLocaleDateString("fr-FR")).join(", ");
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
    validity.value[index] = isValid ? "These dates are valid" : "These dates are invalid";
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

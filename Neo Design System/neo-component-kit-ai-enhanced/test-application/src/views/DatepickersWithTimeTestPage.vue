<script setup lang="ts">
import { ref, reactive } from "vue";
import { NckDatepickerRange, NckDatepickerSingle, TimeInterval, INckDatepicker, DatepickerPopoverPosition, ValidationRule, IDropdownOption, DividerToken, NckDropdown } from "@neotechnologygroup/neo-component-kit";
import PreloadFontComponent from "@/components/PreloadFontComponent.vue";

const dropdownValues = ref(
  ["Arriving before", "Departing after"]
)

const dropdownOptions: Array<IDropdownOption | DividerToken> = [
  { label: "Arriving before", value: "Arriving before" },
  { label: "Departing after", value: "Departing after" }
];

const today: Date = reactive(new Date("2022-01-25T00:00:00"));
const values = ref<Array<[ { date: Date; range: number } | null, { date: Date; range: number } | null ] | { date: Date; range: number } | null>>([
  { date: new Date("2022-01-27T09:00:00"), range: 3 }, // TC0
  null, // TC1
  [ { date: new Date("2022-01-25T12:00:00"), range: 0 }, { date: new Date("2022-01-25T09:00:00"), range: 0 } ], // TC2
  [ { date: new Date("2022-01-27T12:00:00"), range: 12 }, { date: new Date("2022-01-27T09:00:00"), range: 0 } ], // TC3
  null, // TC4
  [ null, null ], // TC5
  [ null, null ], // TC6
  [ null, null ], // TC7
  null, // TC8
  null, // TC 9
  [ null, null ], // TC 10
  { date: new Date("2022-01-27T09:00:00"), range: 3 }, // TC11,
  null, // TC 12
  null, // TC 13
  null, // TC 14
  null, // TC 15
  [ null, null ], // TC 16
  [ { date: new Date("2025-01-25T08:00:00"), range: 0 }, { date: new Date("2025-01-25T09:00:00"), range: 0 } ] // TC 17
]);

const validated = ref<string[]>(new Array(18).fill("", 0, 19));
const validity = ref<string[]>(new Array(18).fill("", 0, 19));
const datepicker0 = ref<INckDatepicker | null>(null);
const datepicker1 = ref<INckDatepicker | null>(null);
const datepicker2 = ref<INckDatepicker | null>(null);
const datepicker3 = ref<INckDatepicker | null>(null);
const datepicker4 = ref<INckDatepicker | null>(null);
const datepicker5 = ref<INckDatepicker | null>(null);
const datepicker6 = ref<INckDatepicker | null>(null);
const datepicker7 = ref<INckDatepicker | null>(null);
const datepicker8 = ref<INckDatepicker | null>(null);
const datepicker9 = ref<INckDatepicker | null>(null);
const datepicker10 = ref<INckDatepicker | null>(null);
const datepicker11 = ref<INckDatepicker | null>(null);
const datepicker12 = ref<INckDatepicker | null>(null);
const datepicker13 = ref<INckDatepicker | null>(null);
const datepicker14 = ref<INckDatepicker | null>(null);
const datepicker15 = ref<INckDatepicker | null>(null);
const datepicker16 = ref<INckDatepicker | null>(null);
const datepicker17 = ref<INckDatepicker | null>(null);

const startDateShouldNotBeAMonday = new ValidationRule((dates: Array<{ date: Date; range: number }> | { date: Date; range: number }) => {
  if (Array.isArray(dates)) { // range
    return !dates[0]?.date || dates[0].date.getDay() !== 1;
  } else {
    return !dates?.date || dates.date.getDay() !== 1;
  }
}, "Start date should not be a monday");

const startDateShouldNotBeAMondayBefore6AM = new ValidationRule((dates: Array<{ date: Date; range: number }>) => {
  return dates[0]?.date.getDay() !== 1 || dates[0]?.date.getHours() >= 6;
}, "Start date should not be before 6AM on Mondays");

const startDateShouldNotBeFirstDayOfMonth = new ValidationRule((dates: Array<{ date: Date; range: number }> | { date: Date; range: number }) => {
  if (Array.isArray(dates)) {
    return !dates[0]?.date || dates[0].date.getDate() !== 1;
  } else {
    return !dates?.date || dates.date.getDate() !== 1;
  }
}, "Start date should not be the first day of month");

const endDateShouldNotBeOnWeekend = new ValidationRule((dates: Array<{ date: Date; range: number }>) => {
  return !dates[1]?.date || (dates[1].date.getDay() !== 0 && dates[1].date.getDay() !== 6);
}, "End date should not be on a week-end");

const ifEndDateIsOnWeekednItCannotBeAllDay = new ValidationRule((dates: Array<{ date: Date; range: number }>) => {
  if (dates[1].date.getDay() === 0 || dates[1].date.getDay() === 6) {
    return dates[1].date.getHours() !== 12 && dates[1].range !== 12;
  } else {
    return true;
  }
}, "End date cannot be 'All day' if it's on weekend");

const startValidationRules = ref<ValidationRule[]>([ startDateShouldNotBeAMonday, startDateShouldNotBeFirstDayOfMonth ]);
const startValidationRulesWithTimeConstraint = ref<ValidationRule[]>([ startDateShouldNotBeAMondayBefore6AM ]);
const endValidationRules = ref<ValidationRule[]>([ endDateShouldNotBeOnWeekend ]);
const endValidationRulesWithTimeConstraint = ref<ValidationRule[]>([ ifEndDateIsOnWeekednItCannotBeAllDay ]);

// eslint-disable-next-line complexity
function getDatepickerBasedOnIndex(index: number) {
  switch (index) {
    case 0:
      return datepicker0;
    case 1:
      return datepicker1;
    case 2:
      return datepicker2;
    case 3:
      return datepicker3;
    case 4:
      return datepicker4;
    case 5:
      return datepicker5;
    case 6:
      return datepicker6;
    case 7:
      return datepicker7;
    case 8:
      return datepicker8;
    case 9:
      return datepicker9;
    case 10:
      return datepicker10;
    case 11:
      return datepicker11;
    case 12:
      return datepicker12;
    case 13:
      return datepicker13;
    case 14:
      return datepicker14;
    case 15:
      return datepicker15;
    case 16:
      return datepicker16;
    case 17:
      return datepicker17;
  }
}

function focusDatepicker(index: number) {
  if (getDatepickerBasedOnIndex(index)?.value) {
    getDatepickerBasedOnIndex(index)?.value?.focus();
  }
}

function validateDatepicker(index: number) {
  if (getDatepickerBasedOnIndex(index)?.value) {
    void getDatepickerBasedOnIndex(index)?.value?.validate()
      .then((result) => {
        validated.value[index] = result ? "Datepicker has been validated with success" : "Datepicker has been validated with error"; // don't know why, the classical "value" access of compo API doesn't work, I though it was OK in Vue2 with compo API
      });
  }
}

function checkDatepickerValidity(index: number) {
  if (getDatepickerBasedOnIndex(index)?.value) {
    validity.value[index] = getDatepickerBasedOnIndex(index)?.value?.isValid() ? "Datepicker is valid" : "Datepicker is not valid";
  }
}

function getNicelyDisplayedValue(value: Array<{ date: Date | null; range: number } | null> | { date: Date | null; range: number } | null) {
  if (Array.isArray(value)) {
    return value.map((entry) => {
      return {
        date: entry?.date ? entry.date.toLocaleString("ro-RO") : null,
        range: entry?.range
      };
    });
  } else if (value) {
    return {
      date: value?.date ? value.date.toLocaleString("ro-RO") : null,
      range: value?.range
    };
  } else {
    return value;
  }
}
</script>

<template>
  <div>
    <PreloadFontComponent />

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <h1>Datepickers with time selection</h1>

    <div>
      On this page, the date is forced to {{today.toLocaleDateString("fr-FR")}} so that tests are consistent over time.
    </div>

    <p class="list-area">
      For the rules:
    <ul>
      <li>
        On start date (or on a single date picker):
        <ul>
          <li>If the start date is the first day of the month, it will trigger an error</li>
          <li>If the start date is a monday, it will trigger an error</li>
        </ul>
      </li>
      <li>
        On the end date:
        <ul>
          <li>If the end date is on a weekend it will trigger an error.</li>
        </ul>
      </li>
    </ul>
    </p>

    <div data-test-case="0">
      <h2>Test case 0</h2>
      <p class="test-app-style">
        A single datepicker with 30m time increment, with time range, and with an help message and required; positioned on
        left.
      </p>
      <NckDatepickerSingle ref="datepicker0" withTime name="datepicker0" label="date" timeLabel="time" timeName="timepicker0"
        :timeInterval="TimeInterval.THIRTY_MINUTES" withTimeRange helpMessage="hello message" required
        v-model="values[0]" :todayDate="today"
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[0]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(0)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(0)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(0)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[0] }}</p>
      <p>Validity: {{ validity[0] }}</p>
    </div>

    <div data-test-case="1">
      <h2>Test case 1</h2>
      <p class="test-app-style">
        A single datepicker with 15m time increment, with time range, with flexible time, with an help message, which is
        required, and a start range rule; positioned on the left
      </p>
      <NckDatepickerSingle ref="datepicker1" withTime name="datepicker1" label="date" timeLabel="time" timeName="timepicker1"
        :timeInterval="TimeInterval.FIFTEEN_MINUTES" withTimeRange withFlexibleTime helpMessage="hello message"
        :rules="startValidationRules" required v-model="values[1]" :todayDate="today"
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[1]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(1)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(1)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(1)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[1] }}</p>
      <p>Validity: {{ validity[1] }}</p>
    </div>

    <div data-test-case="2">
      <h2>Test case 2</h2>
      <p class="test-app-style">
        A range datepicker with 15m time increment; positioned on the left.
      </p>
      <NckDatepickerRange ref="datepicker2" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker2start" startTimeName="timepicker2start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker2end" endTimeName="timepicker2end"
        :timeInterval="TimeInterval.FIFTEEN_MINUTES" v-model="values[2]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[2]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(2)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(2)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(2)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[2] }}</p>
      <p>Validity: {{ validity[2] }}</p>
    </div>

    <div data-test-case="3">
      <h2>Test case 3</h2>
      <p class="test-app-style">
        A range datepicker with 1h time increment, with flexible time, with start range rules and end range rule with time constraints, positioned on the left.
        Start date should not be before 6AM on mondays. And end date cannot be "all day" if on weekend.
      </p>
      <NckDatepickerRange ref="datepicker3" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker3start" startTimeName="timepicker3start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker3end" endTimeName="timepicker3end"
        withFlexibleTime :startRangeRules="startValidationRulesWithTimeConstraint" :endRangeRules="endValidationRulesWithTimeConstraint" :timeInterval="TimeInterval.ONE_HOUR"
        v-model="values[3]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[3]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(3)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(3)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(3)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[3] }}</p>
      <p>Validity: {{ validity[3] }}</p>
    </div>

    <div data-test-case="4">
      <h2>Test case 4</h2>
      <p class="test-app-style">
        A single datepicker with 1h time increment, with time range, with help message, which is required, positioned on
        the right.
      </p>
      <NckDatepickerSingle ref="datepicker4" withTime label="start date" timeLabel="start time" name="datepicker4" timeName="timepicker4"
        withTimeRange helpMessage="hello help!" required :timeInterval="TimeInterval.ONE_HOUR"
        :popoverPosition="DatepickerPopoverPosition.RIGHT" v-model="values[4]" :todayDate="today"
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[4]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(4)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(4)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(4)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[4] }}</p>
      <p>Validity: {{ validity[4] }}</p>
    </div>

    <div data-test-case="5">
      <h2>Test case 5</h2>
      <p class="test-app-style">
        A range datepicker with 30m time increment, with time range, with flexible time, with help message, with start
        and end range rules, required, positioned on the right.
      </p>
      <NckDatepickerRange ref="datepicker5" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker5start" startTimeName="timepicker5start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker5end" endTimeName="timepicker5end"
        withTimeRange withFlexibleTime helpMessage="hello help!" required :startRangeRules="startValidationRules" :endRangeRules="endValidationRules"
        :timeInterval="TimeInterval.THIRTY_MINUTES" :popoverPosition="DatepickerPopoverPosition.RIGHT"
        v-model="values[5]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[5]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(5)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(5)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(5)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[5] }}</p>
      <p>Validity: {{ validity[5] }}</p>
    </div>

    <div data-test-case="6">
      <h2>Test case 6</h2>
      <p class="test-app-style">
        A range datepicker with 30m time increment; positioned on right.
      </p>
      <NckDatepickerRange ref="datepicker6" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker6start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker6end"
        :timeInterval="TimeInterval.THIRTY_MINUTES" :popoverPosition="DatepickerPopoverPosition.RIGHT"
        v-model="values[6]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[6]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(6)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(6)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(6)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[6] }}</p>
      <p>Validity: {{ validity[6] }}</p>
    </div>

    <div data-test-case="7">
      <h2>Test case 7</h2>
      <p class="test-app-style">
        A range datepicker with 15m time increment, with flexible time, with start and end range rules, positioned on right.
      </p>
      <NckDatepickerRange ref="datepicker7" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker7start" startTimeName="timepicker7start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker7end" endTimeName="timepicker7end"
        withFlexibleTime :startRangeRules="startValidationRules" :endRangeRules="endValidationRules"
        :timeInterval="TimeInterval.FIFTEEN_MINUTES" :popoverPosition="DatepickerPopoverPosition.RIGHT"
        v-model="values[7]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[7]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(7)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(7)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(7)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[7] }}</p>
      <p>Validity: {{ validity[7] }}</p>
    </div>

    <div data-test-case="8">
      <h2>Test case 8</h2>
      <p class="test-app-style">
        A single datepicker with 15m time increment, with time range, with help message, required, positionned on right.
      </p>
      <NckDatepickerSingle ref="datepicker8" withTime label="start date" timeLabel="start time" name="datepicker8" timeName="timepicker8"
        withTimeRange helpMessage="Hello help!" required :timeInterval="TimeInterval.FIFTEEN_MINUTES"
        :popoverPosition="DatepickerPopoverPosition.RIGHT" v-model="values[8]" :todayDate="today"
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[8]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(8)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(8)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(8)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[8] }}</p>
      <p>Validity: {{ validity[8] }}</p>
    </div>

    <div data-test-case="9">
      <h2>Test case 9</h2>
      <p class="test-app-style">
        A single datepicker, with 15m time increment, with time range, which is disabled, with help message, is required,
        positioned on left.
      </p>
      <NckDatepickerSingle ref="datepicker9" withTime label="start date" timeLabel="start time" name="datepicker9" timeName="timepicker9"
        withTimeRange helpMessage="Hello help!" required disabled :timeInterval="TimeInterval.FIFTEEN_MINUTES"
        :popoverPosition="DatepickerPopoverPosition.LEFT" v-model="values[9]" :todayDate="today"
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[9]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(9)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(9)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(9)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[9] }}</p>
      <p>Validity: {{ validity[9] }}</p>
    </div>

    <div data-test-case="10" style="background-color: lightgray">
      <h2>Test case 10</h2>
      <p class="test-app-style">
        A range datepicker, with 15m time increment, with time range, which is <strong>readonly</strong>, with help message, is required,
        positioned on right.
      </p>
      <NckDatepickerRange ref="datepicker10" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker10start" startTimeRange="timepicker10start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker10end" endTimeName="timepicker10end"
        withTimeRange helpMessage="Hello help!" readonly required :timeInterval="TimeInterval.FIFTEEN_MINUTES"
        :popoverPosition="DatepickerPopoverPosition.RIGHT" v-model="values[10]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[10]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(10)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(10)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(10)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[10] }}</p>
      <p>Validity: {{ validity[10] }}</p>
    </div>

    <div data-test-case="11">
      <h2>Test case 11</h2>
      <p class="test-app-style">
        A single datepicker with 30m time increment, with time range, and with an help message and required; positioned on
        left, with leading icon.
      </p>
      <NckDatepickerSingle ref="datepicker11" withTime name="datepicker11" label="date" timeLabel="time" timeName="timepicker11"
        :timeInterval="TimeInterval.THIRTY_MINUTES" withTimeRange helpMessage="hello message" required
        v-model="values[11]" :todayDate="today" hasLeadingIcon
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[11]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(11)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(11)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(11)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[11] }}</p>
      <p>Validity: {{ validity[11] }}</p>
    </div>

    <div data-test-case="12">
      <h2>Test case 12</h2>
      <p class="test-app-style">
        A single datepicker with 15m time increment, with time range, with flexible time, with an help message, which is
        required, and a start range rule; positioned on the left; with leading icon
      </p>
      <NckDatepickerSingle ref="datepicker12" withTime name="datepicker12" label="date" timeLabel="time" timeName="timepicker12"
        :timeInterval="TimeInterval.FIFTEEN_MINUTES" withTimeRange withFlexibleTime helpMessage="hello message"
        :rules="startValidationRules" required v-model="values[12]" :todayDate="today" hasLeadingIcon
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[12]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(12)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(12)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(12)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[12] }}</p>
      <p>Validity: {{ validity[12] }}</p>
    </div>

    <div data-test-case="13">
      <h2>Test case 13</h2>
      <p class="test-app-style">
        A single datepicker, with 15m time increment, with time range, which is disabled, with help message, is required,
        positioned on left, with leading icon.
      </p>
      <NckDatepickerSingle ref="datepicker13" withTime label="start date" timeLabel="start time" name="datepicker13" timeName="timepicker13"
        withTimeRange helpMessage="Hello help!" required disabled :timeInterval="TimeInterval.FIFTEEN_MINUTES"
        :popoverPosition="DatepickerPopoverPosition.LEFT" v-model="values[13]" :todayDate="today" hasLeadingIcon
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[13]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(13)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(13)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(13)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[13] }}</p>
      <p>Validity: {{ validity[13] }}</p>
    </div>

    <div data-test-case="14">
      <h2>Test case 14</h2>
      <p class="test-app-style">
        A single datepicker, with 15m time increment, with time range, which is readonly, with help message, is required,
        positioned on left, with leading icon.
      </p>
      <NckDatepickerSingle ref="datepicker14" withTime label="start date" timeLabel="start time" name="datepicker14" timeName="timepicker14"
        withTimeRange helpMessage="Hello help!" required readonly :timeInterval="TimeInterval.FIFTEEN_MINUTES"
        :popoverPosition="DatepickerPopoverPosition.LEFT" v-model="values[14]" :todayDate="today" hasLeadingIcon
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[14]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(14)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(14)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(14)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[14] }}</p>
      <p>Validity: {{ validity[14] }}</p>
    </div>

    <div data-test-case="15">
      <h2>Test case 15</h2>
      <p class="test-app-style">
        A single datepicker with time range and minDate allowed set to 2022-01-20T08:00:00 & maxDate allowed set to 2022-01-30T17:30:00
      </p>
      <NckDatepickerSingle ref="datepicker15" withTime label="start date" timeLabel="start time" name="datepicker15" timeName="timepicker15"
        withTimeRange required v-model="values[15]" :todayDate="today" :minDateAllowed="new Date('2022-01-20T08:00:00')" :maxDateAllowed="new Date('2022-01-30T17:30:00')"
        beforeMinDateErrorMessage="The selected date is before the minimal date"
        afterMaxDateErrorMessage="The selected date is after the maximum date"
        timeClearButtonAltText="Clear time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[15]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(15)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(15)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(15)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[15] }}</p>
      <p>Validity: {{ validity[15] }}</p>
    </div>

    <div data-test-case="16">
      <h2>Test case 16</h2>
      <p class="test-app-style">
        A range datepicker with time range and flexible time and minDate allowed set to 2022-01-20T08:00:00 & maxDate allowed set to 2022-01-30T17:30:00
      </p>
      <NckDatepickerRange ref="datepicker16" withTime
        startRangeLabel="start date" startTimeLabel="start time" startRangeName="datepicker16start" startTimeName="timepicker16start"
        endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker16end" endTimeName="timepicker16end"
        withTimeRange withFlexibleTime required v-model="values[16]" :todayDate="today" :minDateAllowed="new Date('2022-01-20T08:00:00')" :maxDateAllowed="new Date('2022-01-30T17:30:00')"
        beforeMinDateErrorMessage="The selected date is before the minimal date"
        afterMaxDateErrorMessage="The selected date is after the maximum date"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field"/>
      <div>
        Value : {{ getNicelyDisplayedValue(values[16]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(16)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(16)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(16)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[16] }}</p>
      <p>Validity: {{ validity[16] }}</p>
    </div>

    <div data-test-case="17">
      <h2>Test case 17</h2>
      <p class="test-app-style">
        A range datepicker with dropdowns replacing slots.
      </p>
      <NckDatepickerRange class="date-selector" ref="datepicker17" withTime startRangeLabel="start date" startTimeLabel="start time"
        startRangeName="datepicker17start" startTimeName="timepicker17start" endRangeLabel="end date" endTimeLabel="end time" endRangeName="datepicker17end" endTimeName="timepicker17end"
        :timeInterval="TimeInterval.FIFTEEN_MINUTES" v-model="values[17]" :todayDate="today"
        startTimeClearButtonAltText="Clear start time field" endTimeClearButtonAltText="Clear end time field">
          <template #start-date-leading-content>
            <NckDropdown class="dropdown-style" v-model="dropdownValues[0]" label="Departure preference" :options="dropdownOptions" :maxMenuHeight="5" />
          </template>
          <template #end-date-leading-content>
            <NckDropdown class="dropdown-style" v-model="dropdownValues[1]" label="Return preference" :options="dropdownOptions" :maxMenuHeight="5" />
          </template>
      </NckDatepickerRange>
      <div>
        Value : {{ getNicelyDisplayedValue(values[17]) }}
      </div>
      <div>
        <button class="test-app-style button-focus" @click="focusDatepicker(17)">Focus</button>&nbsp;
        <button class="test-app-style button-validate" @click="validateDatepicker(17)">Validate</button>&nbsp;
        <button class="test-app-style button-isvalid" @click="checkDatepickerValidity(17)">isValid ?</button>
      </div>
      <p>Validated: {{ validated[17] }}</p>
      <p>Validity: {{ validity[17] }}</p>
    </div>

  </div>
</template>

<style scoped>

[data-test-case] {
  padding: 0.5rem 1.5rem 25rem;
}

.list-area {
  text-align: left;
}

.dropdown-style {
  margin-right: 1rem;
  flex: 1;
}
</style>

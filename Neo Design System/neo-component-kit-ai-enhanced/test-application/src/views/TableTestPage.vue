<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <p class="test-app-style">
      Note: there is a bug caused by how the Test Application import the Neo Component Kit library.
      It forces to click twice on clickable element, after the first time, in order for them to work.
      See <a href="https://kdsjira.atlassian.net/browse/TRV3-1411">TRV3-1411</a>
      For now no solution have been found, but the bug is not critical as it is only links to test application
      and works currently in a standard import context.
    </p>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/table-errors">another page right here</router-link>
    </div>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>
          A table with both text and custom content for rows
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[0]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[0]" :data="dataArrays[0]"
        aria-label="an example table">
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>
          A table with text only, and clickable rows (role: button, should be actionnable by space and enter)
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[1]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[1]" :data="dataArrays[1]"
                @row-clicked="selectRow" rowAriaRole="button" aria-label="an example table">
      </nck-table>
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>
          A table with text only, and clickable rows (role: link, should be actionnable by enter)
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[1]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[1]" :data="dataArrays[2]"
                @row-clicked="selectRow" rowAriaRole="link" aria-label="an example table">
      </nck-table>
    </div>
    <div v-for="i in [3, 4, 5, 6]" :key="i" :data-test-case="i">
      <b>Test case {{i}}</b>
      <p class="test-app-style">
        <i>
          A table with text only, and various alignment for headers and cells (see test data description)
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[i - 1]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[i - 1]" :data="dataArrays[i]" aria-label="an example table">
      </nck-table>
    </div>
    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        <i>
          A table with text only, that is scrollable because container is too small to contain it
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[8]" />
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" scrollableContent :columnsDescription="tablesDescription[8]" :data="dataLong" aria-label="an example table">
        </nck-table>
      </div>
    </div>
    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        <i>
          A table with both text and custom content for rows
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[0]" />
      </div>
      <h1 class="test-app-style" id="someTitle">A title for example</h1>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[0]" :data="dataArrays[7]"
        labeledByTitleId="someTitle">
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        <i>
          A table with both text and custom content for rows, and no side borders
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[0]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[0]" :data="dataArrays[8]"
        aria-label="an example table" hideSideBorders>
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="10">
      <b>Test case 10</b>
      <p class="test-app-style">
        <i>
          A table with both text and custom content for rows and first row (header) border hidden
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[0]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[0]" :data="dataArrays[9]"
        aria-label="an example table" hideFirstTopBorder>
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="11">
      <b>Test case 11</b>
      <p class="test-app-style">
        <i>
          A table with both text and custom content for rows and last border of table hidden
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[0]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[0]" :data="dataArrays[10]"
        aria-label="an example table" hideLastBottomBorder>
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="12">
      <b>Test case 12</b>
      <p class="test-app-style">
        <i>
          A table that follows test case in story
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[6]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[6]" :data="dataArrays[11]"
        aria-label="an example table">
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="13">
      <b>Test case 13</b>
      <p class="test-app-style">
        <i>
          A table that has one of its column containing some empty values
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[7]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[7]" :data="dataArrays[12]"
        aria-label="an example table">
        <template v-slot:slot-test="$row">
          <b>{{$row.someOther}}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="14">
      <b>Test case 14</b>
      <p class="test-app-style">
        <i>
          A table, which is not displayed at first, with text only, that is scrollable because container is too small to contain it
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[8]" />
      </div>
      <div>
        <button @click="tableDisplayed = true" class="test-app-style display-table">Display table</button>
      </div>
      <div class="table-container" v-show="tableDisplayed">
        <nck-table rowUniqueKey="id" scrollableContent :columnsDescription="tablesDescription[8]" :data="dataLong" aria-label="an example table">
        </nck-table>
      </div>
    </div>

    <div data-test-case="15">
      <b>Test case 15</b>
      <p class="test-app-style">
        <i>
          A table with multi select
        </i>
      </p>
      <div>
        Last selected index: {{lastSelectedIndex}}
      </div>
      <div>
        <table-options-display :columnsDescription="tablesDescription[6]" />
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" multiSelect :columnsDescription="tablesDescription[6]" :data="dataArrays[13]" aria-label="an example table"
          @selection-changed="updateCurrentSelection" selectAllLabel="select all in the table"
          unselectAllLabel="unselect all rows" :getLabelForRowSelection="(row, selected) => { return (selected ? 'Unselect ' : 'Select ') + row.test }"
          @row-clicked="selectRowWithCheckbox" rowAriaRole="button">
          <template v-slot:action-bar>
            Hello I'm the action bar I appear when a data is selected.
          </template>
        </nck-table>
      </div>
      <div>
        Selected data: {{tableSelection}}
      </div>
    </div>

    <div data-test-case="16">
      <b>Test case 16</b>
      <p class="test-app-style">
        <i>
          A table with multi select, which is scrollable
        </i>
      </p>
      <div>
        Last selected index: {{lastSelectedIndex2}}
      </div>
      <div>
        <table-options-display :columnsDescription="tablesDescription[6]" />
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" multiSelect :columnsDescription="tablesDescription[6]"
          :data="dataLong2" aria-label="an example table"
          @selection-changed="updateCurrentSelection2" selectAllLabel="select all in the table"
          unselectAllLabel="unselect all rows" :getLabelForRowSelection="(row, selected) => { return (selected ? 'Unselect ' : 'Select ') + row.test }"
          @row-clicked="selectRowWithCheckbox2" rowAriaRole="button" scrollableContent>
          <template v-slot:action-bar>
            Hello I'm the action bar I appear when a data is selected.
          </template>
        </nck-table>
      </div>
      <div>
        Selected data: {{tableSelection2}}
      </div>
    </div>

    <div data-test-case="17">
      <b>Test case 17</b>
      <p class="test-app-style">
        <i>
          A table with multi select, scrollable, "sortable" & with a "clear selection" in the action bar slot
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[9]" />
      </div>
      <div class="table-container">
        <nck-table ref="clearableTable" rowUniqueKey="id" multiSelect :columnsDescription="tablesDescription[9]"
          :data="dataLong3" aria-label="an example table"
          selectAllLabel="select all in the table"
          unselectAllLabel="unselect all rows" :getLabelForRowSelection="(row, selected) => { return (selected ? 'Unselect ' : 'Select ') + row.test }"
          @row-clicked="selectRowWithCheckbox2" rowAriaRole="button" scrollableContent>
          <template v-slot:action-bar>
            <button @click="clearSelection">Clear current selection</button>
          </template>
        </nck-table>
      </div>
    </div>

    <div data-test-case="18">
      <b>Test case 18</b>
      <p class="test-app-style">
        <i>
          A table of 2 columns where the first column is "sortable" and initially sorted in descending order.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[10]" />
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[10]"
          :data="dataArrays[14]" aria-label="an example table"
          :initiallySortedColumnIndex=0 :initiallySortedColumnSortOrder="SortOrder.DESCENDING">
        </nck-table>
      </div>
    </div>

    <div data-test-case="19">
      <b>Test case 19</b>
      <p class="test-app-style">
        <i>
          A table of 2 columns where the 2nd column is sortable and is sorted using a promise taking 300ms to execute.
          If the "Fail sort operation" checkbox is checked, the sorting operation will fail &
          the table won't change of aspect.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[11]" />
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="failSortOperation" id="failSortOperationCheckbox"/>
          Fail sort operation
        </label>
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[11]"
          :data="dataArrays[15]" aria-label="an example table">
        </nck-table>
      </div>
    </div>
    <div data-test-case="20">
      <b>Test case 20</b>
      <p class="test-app-style">
        <i>
          A table with multi select where the third line is not selectable (where notSelectableSource is a function)
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[12]" />
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" multiSelect :notSelectableSource="notSelectable" :columnsDescription="tablesDescription[12]" :data="dataArrays[16]"
          aria-label="an example table" selectAllLabel="select all in the table" unselectAllLabel="unselect all rows"
          :getLabelForRowSelection="(row, selected) => { return (selected ? 'Unselect ' : 'Select ') + row.test }"
          @row-clicked="selectRowWithCheckbox2" rowAriaRole="button">
          <template v-slot:action-bar>
            Hello I'm the action bar I appear when a data is selected.
          </template>
        </nck-table>
      </div>
    </div>
    <div data-test-case="21">
      <b>Test case 21</b>
      <p class="test-app-style">
        <i>
          A table with multi select where the second line is not selectable (where notSelectableSource is a string)
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[13]" />
      </div>
      <div class="table-container">
        <nck-table rowUniqueKey="id" multiSelect notSelectableSource="isDraft" :columnsDescription="tablesDescription[13]" :data="dataArrays[17]"
          aria-label="an example table" selectAllLabel="select all in the table" unselectAllLabel="unselect all rows"
          :getLabelForRowSelection="(row, selected) => { return (selected ? 'Unselect ' : 'Select ') + row.test }"
          @row-clicked="selectRowWithCheckbox2" rowAriaRole="button">
          <template v-slot:action-bar>
            Hello I'm the action bar I appear when a data is selected.
          </template>
        </nck-table>
      </div>
    </div>
    <div data-test-case="22">
      <b>Test case 22</b>
      <p class="test-app-style">
        <i>
          A table with pagination as footer
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[14]" />
      </div>
      <nck-table rowUniqueKey="id" :columnsDescription="tablesDescription[14]" :data="dataArrays[18]"
                @row-clicked="selectRow" rowAriaRole="button" aria-label="an example table">
          <template v-slot:footer>
            <nck-pagination
              class="footer"
              :totalNumberOfItems="5000"
              v-model:numberOfItemsPerPage="paginationPageLength"
              :currentPage="currentPage"
              footerWording="paginationFooterTrips"
              pageNumberWording="paginationPageNumber"
              :withItemsPerPageDropdown="[5, 10, 20, 30]"
              withItemsPerPageLabel="trips per page"
              :withItemsMenuPosition="MenuPosition.TOP_LEFT"
              @page-changed="updateComponent($event)"/>
          </template>
      </nck-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckPagination, NckTable, ITableColumnOptions, TextAlignment, SortOrder, MenuPosition } from "@neotechnologygroup/neo-component-kit";
import TableOptionsDisplay from "../components/TableOptionsDisplay.vue";

interface TestData {
  id: number;
  test: string;
  testAlt: { subProp: number | string; another: number };
  someOther: string;
  notSelectable?: boolean;
  isDraft?: boolean;
}

const tableSelection = ref<TestData[]>([]);
const lastSelectedIndex = ref<number | null>(null);
const tableSelection2 = ref<TestData[]>([]);
const lastSelectedIndex2 = ref<number | null>(null);
const tableDisplayed = ref<boolean>(false);
const failSortOperation = ref<boolean>(false);
const dataArrays = ref<TestData[][]>([]);
const tablesDescription = ref<ITableColumnOptions[][]>([]);
const clearableTable = ref<InstanceType<typeof NckTable> | null>(null);

const paginationPageLength = ref(5);
const currentPage = ref(1);

const dataLong = ref<TestData[]>([
  { id: 1, test: "hello test", testAlt: { subProp: 42, another: 25 }, someOther: "yellow!" },
  {
    id: 2,
    test: "abcde should be very very long with a lot of characters. So that we see if it offset everything. Because maybe the header will take take 1/3 of the space." +
    "but the content will take more. That way we will see clearly the offset. Then we will have to find a solution so this offset doesn't appear. Otherwise it look very ugly and buggy." +
    "And we don't want that. Oh no we don't want that!",
    testAlt: { subProp: "atchoum", another: 25 },
    someOther: "purple!"
  },
  { id: 3, test: "Poney!!!", testAlt: { subProp: "whatever", another: 25 }, someOther: "blue!" },
  { id: 4, test: "Purple", testAlt: { subProp: "something", another: 125 }, someOther: "green!" },
  { id: 5, test: "Youplouplou", testAlt: { subProp: "anything", another: 2 }, someOther: "red!" },
  { id: 6, test: "Red!!!", testAlt: { subProp: "dunno", another: 25 }, someOther: "cyan!" }
]);

const dataLong2 = ref<TestData[]>([
  { id: 1, test: "hello test", testAlt: { subProp: 42, another: 25 }, someOther: "yellow!" },
  {
    id: 2,
    test: "abcde should be very very long with a lot of characters. So that we see if it offset everything. Because maybe the header will take take 1/3 of the space." +
    "but the content will take more. That way we will see clearly the offset. Then we will have to find a solution so this offset doesn't appear. Otherwise it look very ugly and buggy." +
    "And we don't want that. Oh no we don't want that!",
    testAlt: { subProp: "atchoum", another: 25 },
    someOther: "purple!"
  },
  { id: 3, test: "Poney!!!", testAlt: { subProp: "whatever", another: 25 }, someOther: "blue!" },
  { id: 4, test: "Purple", testAlt: { subProp: "something", another: 125 }, someOther: "green!" },
  { id: 5, test: "Youplouplou", testAlt: { subProp: "anything", another: 2 }, someOther: "red!" },
  { id: 6, test: "Red!!!", testAlt: { subProp: "dunno", another: 25 }, someOther: "cyan!" }
]);

const dataLong3 = ref<TestData[]>([
  { id: 1, test: "hello test", testAlt: { subProp: "truc", another: 25 }, someOther: "yellow!" },
  {
    id: 2,
    test: "abcde should be very very long with a lot of characters. So that we see if it offset everything. Because maybe the header will take take 1/3 of the space." +
    "but the content will take more. That way we will see clearly the offset. Then we will have to find a solution so this offset doesn't appear. Otherwise it look very ugly and buggy." +
    "And we don't want that. Oh no we don't want that!",
    testAlt: { subProp: "atchoum", another: 25 },
    someOther: "purple!"
  },
  { id: 3, test: "Poney!!!", testAlt: { subProp: "whatever", another: 25 }, someOther: "blue!" },
  { id: 4, test: "Purple", testAlt: { subProp: "something", another: 125 }, someOther: "green!" },
  { id: 5, test: "Youplouplou", testAlt: { subProp: "anything", another: 2 }, someOther: "red!" },
  { id: 6, test: "Red!!!", testAlt: { subProp: "dunno", another: 25 }, someOther: "cyan!" }
]);

for (let i = 0; i < 18; i++) {
  dataArrays.value.push([
    { id: 1, test: "hello test", testAlt: { subProp: 42, another: 25 }, someOther: "yellow!" },
    {
      id: 2,
      test: "abcde should be very very long with a lot of characters. So that we see if it offset everything. Because maybe the header will take take 1/3 of the space." +
      "but the content will take more. That way we will see clearly the offset. Then we will have to find a solution so this offset doesn't appear. Otherwise it look very ugly and buggy." +
      "And we don't want that. Oh no we don't want that!",
      testAlt: { subProp: "atchoum", another: 25 },
      someOther: "purple!"
    },
    { id: 3, test: "Poney!!!", testAlt: { subProp: "whatever", another: 25 }, someOther: "blue!" }
  ]);
}

dataArrays.value.push([
  { id: 1, test: "hello test", testAlt: {subProp: 42, another: 25}, someOther: "yellow!" },
  { id: 2, test: "test", testAlt: {subProp: "atchoum", another: 25}, someOther: "purple!" },
  { id: 3, test: "Poney!!!", testAlt: {subProp: "whatever", another: 25}, someOther: "blue!" }
]);

dataArrays.value[16].map((line) => {
  if (line.id === 3) {
    line.notSelectable = true;
  }
  return line;
});

dataArrays.value[17].map((line) => {
  if (line.id === 2) {
    line.isDraft = true;
  }
  return line;
});

tablesDescription.value.push([
  { headerLabel: "This is with data path, at first level", dataPath: "test" },
  { headerLabel: "This is with data path, at second level", dataPath: "testAlt.subProp" },
  { headerLabel: "This is with slot", slotName: "slot-test" }
]);

tablesDescription.value.push([
  { headerLabel: "This is with data path, at first level", dataPath: "test", width: "50%" },
  { headerLabel: "This is with data path, at second level", dataPath: "testAlt.subProp", width: "10%" },
  { headerLabel: "This is with data path also", dataPath: "someOther" }
]);

tablesDescription.value.push([
  { headerLabel: "Header on left, row default", dataPath: "someOther", headerAlignment: TextAlignment.LEFT },
  { headerLabel: "Header on right, row default", dataPath: "someOther", headerAlignment: TextAlignment.RIGHT },
  { headerLabel: "Header on center, row default", dataPath: "someOther", headerAlignment: TextAlignment.CENTER },
  { headerLabel: "Header default, row default", dataPath: "someOther" }
]);

for (const key of Object.keys(TextAlignment) as Array<(keyof typeof TextAlignment)>) {
  const alignment = TextAlignment[key];
  tablesDescription.value.push([
    {
      headerLabel: `Header on left, row ${alignment}`,
      dataPath: "someOther",
      headerAlignment: TextAlignment.LEFT,
      rowAlignment: alignment
    },
    {
      headerLabel: `Header on right, row ${alignment}`,
      dataPath: "someOther",
      headerAlignment: TextAlignment.RIGHT,
      rowAlignment: alignment
    },
    {
      headerLabel: `Header on center, row ${alignment}`,
      dataPath: "someOther",
      headerAlignment: TextAlignment.CENTER,
      rowAlignment: alignment
    },
    { headerLabel: `Header default, row ${alignment}`, dataPath: "someOther", rowAlignment: alignment }
  ]);
}

tablesDescription.value.push([
  {
    headerLabel: "40% - header title center",
    width: "40%",
    headerAlignment: TextAlignment.CENTER,
    rowAlignment: TextAlignment.LEFT,
    dataPath: "id"
  },
  {
    headerLabel: "20% - header title left",
    width: "20%",
    headerAlignment: TextAlignment.LEFT,
    rowAlignment: TextAlignment.LEFT,
    dataPath: "testAlt.subProp"
  },
  {
    headerLabel: "20% - header title left",
    width: "20%",
    headerAlignment: TextAlignment.LEFT,
    rowAlignment: TextAlignment.LEFT,
    slotName: "slot-test"
  },
  {
    headerLabel: "20% - header title right",
    width: "20%",
    headerAlignment: TextAlignment.RIGHT,
    rowAlignment: TextAlignment.LEFT,
    dataPath: "test"
  }
]);

tablesDescription.value.push([
  { headerLabel: "This is with data path, at first level", dataPath: "test" },
  { headerLabel: "This column will contain empty values", dataPath: "someField" },
  { headerLabel: "This is with slot", slotName: "slot-test" }
]);

tablesDescription.value.push([
  { headerLabel: "This is with data path, at first level", dataPath: "test", width: "50%" },
  { headerLabel: "This is with data path, at second level", dataPath: "testAlt.subProp", width: "10%" },
  {
    headerLabel: "This is with data path also",
    dataPath: "someOther",
    headerAlignment: TextAlignment.RIGHT,
    rowAlignment: TextAlignment.RIGHT
  }
]);

tablesDescription.value.push([
  {
    headerLabel: "40% - header title center",
    width: "40%",
    headerAlignment: TextAlignment.CENTER,
    rowAlignment: TextAlignment.LEFT,
    dataPath: "id",
    onSort: sortCenteredColumn
  },
  {
    headerLabel: "20% - header title left",
    width: "20%",
    headerAlignment: TextAlignment.LEFT,
    rowAlignment: TextAlignment.LEFT,
    dataPath: "testAlt.subProp",
    onSort: sortLeftAlignedColumn
  },
  {
    headerLabel: "20% - header title left",
    width: "20%",
    headerAlignment: TextAlignment.LEFT,
    rowAlignment: TextAlignment.LEFT,
    slotName: "slot-test"
  },
  {
    headerLabel: "20% - header title right very long text so it wraps also on desktop resolution",
    width: "20%",
    headerAlignment: TextAlignment.RIGHT,
    rowAlignment: TextAlignment.LEFT,
    dataPath: "test",
    onSort: sortRightAlignedColumn
  }
]);

tablesDescription.value.push([
  {
    headerLabel: "Sortable and initially sorted descending",
    dataPath: "id",
    headerAlignment: TextAlignment.CENTER,
    onSort: sortInitiallySortedColumn
  },
  { headerLabel: "Non sortable column", headerAlignment: TextAlignment.CENTER, dataPath: "testAlt.subProp" }
]);

tablesDescription.value.push([
  {
    headerLabel: "Non sortable column",
    dataPath: "id",
    headerAlignment: TextAlignment.CENTER
  },
  {
    headerLabel: "Sortable columns with a promise",
    headerAlignment: TextAlignment.CENTER,
    dataPath: "testAlt.subProp",
    onSort: sortingPromise
  }
]);

tablesDescription.value.push([
  {
    headerLabel: "Non sortable column",
    dataPath: "id",
    headerAlignment: TextAlignment.CENTER
  },
  {
    headerLabel: "Non sortable column",
    headerAlignment: TextAlignment.CENTER,
    dataPath: "testAlt.subProp"
  }
]);

tablesDescription.value.push([
  {
    headerLabel: "Non sortable column",
    dataPath: "id",
    headerAlignment: TextAlignment.CENTER
  },
  {
    headerLabel: "Non sortable column",
    headerAlignment: TextAlignment.CENTER,
    dataPath: "testAlt.subProp"
  }
]);

tablesDescription.value.push([
  { headerLabel: "Column 1", dataPath: "test" },
  { headerLabel: "Column 2", dataPath: "testAlt.subProp" },
  { headerLabel: "Column 3", slotName: "slot-test" }
]);

function selectRowWithCheckbox(entry: TestData, index: number) {
  lastSelectedIndex.value = index;
}

function selectRowWithCheckbox2(entry: TestData, index: number) {
  lastSelectedIndex2.value = index;
}

function updateCurrentSelection(selection: TestData[]) {
  tableSelection.value = selection;
}

function updateCurrentSelection2(selection: TestData[]) {
  tableSelection2.value = selection;
}

function sortCenteredColumn(newSortOrder: SortOrder) {
  if (newSortOrder === "ascending") {
    dataLong3.value.sort((dataItem1, dataItem2) => dataItem1.id - dataItem2.id);
  } else if (newSortOrder === "descending") {
    dataLong3.value.sort((dataItem1, dataItem2) => dataItem2.id - dataItem1.id);
  }
}

function sortLeftAlignedColumn(newSortOrder: SortOrder) {
  if (newSortOrder === "ascending") {
    dataLong3.value.sort((dataItem1, dataItem2) => dataItem1.testAlt.subProp.toString().localeCompare(dataItem2.testAlt.subProp.toString()));
  } else if (newSortOrder === "descending") {
    dataLong3.value.sort((dataItem1, dataItem2) => dataItem2.testAlt.subProp.toString().localeCompare(dataItem1.testAlt.subProp.toString()));
  }
}

function sortRightAlignedColumn(newSortOrder: SortOrder) {
  if (newSortOrder === "ascending") {
    dataLong3.value.sort((dataItem1, dataItem2) => dataItem1.test.localeCompare(dataItem2.test));
  } else if (newSortOrder === "descending") {
    dataLong3.value.sort((dataItem1, dataItem2) => dataItem2.test.localeCompare(dataItem1.test));
  }
}

function notSelectable(entry: TestData) {
  return entry?.notSelectable;
}

function selectRow(entry: TestData) {
  if (!entry.test.includes(" has been clicked!")) {
    entry.test += " has been clicked!";
  }
}

function sortInitiallySortedColumn(newSortOrder: SortOrder) {
  if (newSortOrder === "ascending") {
    dataArrays.value[14].sort((dataItem1, dataItem2) => dataItem1.id - dataItem2.id);
  } else if (newSortOrder === "descending") {
    dataArrays.value[14].sort((dataItem1, dataItem2) => dataItem2.id - dataItem1.id);
  }
}

function sortingPromise(newSortOrder: SortOrder): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failSortOperation.value) {
        reject(new Error("Sorting failed"));
      } else {
        if (newSortOrder === "ascending") {
          dataArrays.value[15].sort(
            (dataItem1, dataItem2) =>
              dataItem1.testAlt.subProp.toString().localeCompare(dataItem2.testAlt.subProp.toString()));
        } else if (newSortOrder === "descending") {
          dataArrays.value[15].sort(
            (dataItem1, dataItem2) =>
              dataItem2.testAlt.subProp.toString().localeCompare(dataItem1.testAlt.subProp.toString()));
        }
        resolve();
      }
    }, 300);
  });
}

function clearSelection() {
  if (clearableTable.value) {
    clearableTable.value.clearSelection();
  }
}

function updateComponent(entry: unknown) {
  currentPage.value = entry as number;
}
</script>

<style scoped>
[data-test-case] {
  margin-bottom: 55px;
  padding-right: 1rem;
  padding-left: 1rem;
}

[data-test-case="7"] .table-container,
[data-test-case="14"] .table-container,
[data-test-case="16"] .table-container,
[data-test-case="17"] .table-container {
  height: 13rem;
}

.footer {
  padding: 0.5rem 1rem;
}

.separator {
  border: 1px solid black;
}
</style>

<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i> A table with no column description. It should trigger an error. </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[0]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[0] = !displayedTestCases[0]"
      >
        Toggle test case 0 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[0]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[0]"
        :data="data[0]"
        aria-label="error table"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>
          A table with column description with one that contains no label. It
          should trigger an error.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[1]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[1] = !displayedTestCases[1]"
      >
        Toggle test case 1 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[1]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[1]"
        :data="data[0]"
        aria-label="error table"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>
          A table that is clickable but not aria role provided. It should
          trigger an error.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[2]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[2] = !displayedTestCases[2]"
      >
        Toggle test case 2 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[2]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[2]"
        :data="data[0]"
        @row-clicked="selectRow"
        aria-label="error table"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        <i>
          A table that is clickable but aria role provided ("poney") is not
          correct. It should trigger an error.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[2]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[3] = !displayedTestCases[3]"
      >
        Toggle test case 3 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[3]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[2]"
        :data="data[0]"
        @row-clicked="selectRow"
        rowAriaRole="poney"
        aria-label="error table"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        <i>
          A column width should always be in percentage. It should trigger an
          error otherwise.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[3]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[4] = !displayedTestCases[4]"
      >
        Toggle test case 4 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[4]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[3]"
        :data="data[0]"
        aria-label="error table"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        <i>
          A table that is clickable but neither ariaLabel or labeledByTitileId
          is provided. It should trigger an error.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[2]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[5] = !displayedTestCases[5]"
      >
        Toggle test case 5 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[5]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[2]"
        :data="data[0]"
        @row-clicked="selectRow"
        rowAriaRole="link"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        <i>
          A table where the sum of its column defined width is more than 100%
          should trigger an error.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[4]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[6] = !displayedTestCases[6]"
      >
        Toggle test case 6 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[6]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[4]"
        :data="data[0]"
        ariaLabel="bug!"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        <i> A table where initial sort is set on a non sortable column. </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[5]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[7] = !displayedTestCases[7]"
      >
        Toggle test case 7 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[7]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[5]"
        :data="data[1]"
        ariaLabel="bug!"
        :initiallySortedColumnIndex="0"
        :initiallySortedColumnSortOrder="SortOrder.DESCENDING"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        <i>
          A table where initial sort is set on a sortable column but sort order
          is not precised.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[5]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[8] = !displayedTestCases[8]"
      >
        Toggle test case 8 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[8]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[5]"
        :data="data[2]"
        ariaLabel="bug!"
        :initiallySortedColumnIndex="1"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        <i>
          A table where initial sort order is specified but not the column to
          sort initially.
        </i>
      </p>
      <div>
        <table-options-display :columnsDescription="tablesDescription[5]" />
      </div>
      <button
        class="test-app-style"
        @click="displayedTestCases[9] = !displayedTestCases[9]"
      >
        Toggle test case 9 to display error
      </button>
      <nck-table
        v-if="displayedTestCases[9]"
        rowUniqueKey="id"
        :columnsDescription="tablesDescription[5]"
        :data="data[3]"
        ariaLabel="bug!"
        :initiallySortedColumnSortOrder="SortOrder.DESCENDING"
      >
        <template v-slot:slot-test="$row">
          <b>{{ $row.someOther }}</b>
        </template>
      </nck-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NckTable,
  ITableColumnOptions,
  SortOrder
} from "@neotechnologygroup/neo-component-kit";
import TableOptionsDisplay from "../components/TableOptionsDisplay.vue";

const displayedTestCases = ref<boolean[]>([]);

const tablesDescription = ref<ITableColumnOptions[][]>([
  [],
  [
    { headerLabel: "The next column have an empty label", dataPath: "test" },
    { headerLabel: "", dataPath: "testAlt.subProp" },
    { headerLabel: "This is with slot", slotName: "slot-test" }
  ],
  [
    { headerLabel: "Test1", dataPath: "test" },
    { headerLabel: "test2", dataPath: "testAlt.subProp" },
    { headerLabel: "TEST3", slotName: "slot-test" }
  ],
  [
    { headerLabel: "Test1", dataPath: "test" },
    {
      headerLabel: "invalid width",
      width: "2rem",
      dataPath: "testAlt.subProp"
    },
    { headerLabel: "TEST3", slotName: "slot-test" }
  ],
  [
    { headerLabel: "Test1", width: "60%", dataPath: "test" },
    { headerLabel: "invalid width", width: "40%", dataPath: "testAlt.subProp" },
    { headerLabel: "TEST3", width: "20%", slotName: "slot-test" }
  ],
  [
    { headerLabel: "Test1", dataPath: "id" },
    {
      headerLabel: "invalid width",
      dataPath: "value",
      onSort: sortValueColumn
    }
  ]
]);

const data = ref<object[][]>([
  [
    {
      id: 1,
      test: "hello test",
      testAlt: { subProp: 42, another: 25 },
      someOther: "yellow!"
    },
    {
      id: 2,
      test:
        "abcde should be very very long with a lot of characters. So that we see if it offset everything. Because maybe the header will take take 1/3 of the space." +
        "but the content will take more. That way we will see clearly the offset. Then we will have to find a solution so this offset doesn't appear. Otherwise it look very ugly and buggy." +
        "And we don't want that. Oh no we don't want that!",
      testAlt: { subProp: "atchoum", another: 25 },
      someOther: "purple!"
    },
    {
      id: 3,
      test: "Poney!!!",
      testAlt: { subProp: "whatever", another: 25 },
      someOther: "blue!"
    }
  ],
  [
    { id: 1, value: "truc" },
    { id: 2, value: "atchoum" },
    { id: 3, value: "whatever" },
    { id: 4, value: "something" },
    { id: 5, value: "anything" },
    { id: 6, value: "dunno" }
  ],
  [
    { id: 1, value: "truc" },
    { id: 2, value: "atchoum" },
    { id: 3, value: "whatever" },
    { id: 4, value: "something" },
    { id: 5, value: "anything" },
    { id: 6, value: "dunno" }
  ],
  [
    { id: 1, value: "truc" },
    { id: 2, value: "atchoum" },
    { id: 3, value: "whatever" },
    { id: 4, value: "something" },
    { id: 5, value: "anything" },
    { id: 6, value: "dunno" }
  ]
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function selectRow(entry: any) {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  entry.test += " has been clicked!";
}

function sortValueColumn(newSortOrder: SortOrder) {
  if (newSortOrder === "ascending") {
    data.value[1].sort((dataItem1, dataItem2) => dataItem1.value.localeCompare(dataItem2.value));
  } else if (newSortOrder === "descending") {
    data.value[1].sort((dataItem1, dataItem2) => dataItem2.value.localeCompare(dataItem1.value));
  }
}
</script>

<style scoped>
[data-test-case] {
  margin-bottom: 55px;
}

.separator {
  border: 1px solid black;
}
</style>

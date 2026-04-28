<template>
  <table class="test-app-style description-table">
    <tr>
      <th>Column</th>
      <th>Header label</th>
      <th>Displays text or complex content?</th>
      <th>Width</th>
      <th>Header text alignment</th>
      <th>Row cell test alignment</th>
      <th v-if="isAnyColumnSortable">Can be sorted</th>
    </tr>
    <tr v-for="(colDesc, index) in columnsDescription" :key="index">
      <td>{{ index }}</td>
      <td>{{ colDesc.headerLabel }}</td>
      <td>{{ colDesc.slotName ? "complex content" : "text only" }}</td>
      <td>{{ colDesc.width || "default" }}</td>
      <td>{{ colDesc.headerAlignment || "default" }}</td>
      <td>{{ colDesc.rowAlignment || "default" }}</td>
      <td v-if="isAnyColumnSortable">{{ typeof colDesc.onSort === 'function' || "false" }}</td>
    </tr>
  </table>
</template>

<style lang="less" scoped>
.description-table {

  td,
  th {
    padding: 0.5rem;
    border: 0.0625rem solid rgba(0, 0, 0, 0.33);
  }

  margin-bottom: 1rem;
}

@media screen and (max-width: 45rem) {
  .description-table {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { ITableColumnOptions } from "@neotechnologygroup/neo-component-kit";

const props = defineProps<{
  columnsDescription: ITableColumnOptions[];
}>();

const isAnyColumnSortable = computed(() => {
  return props.columnsDescription.some((colDesc) => typeof colDesc.onSort === "function");
});
</script>

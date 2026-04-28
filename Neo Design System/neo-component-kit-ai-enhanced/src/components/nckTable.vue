<template>
  <div class="nck-style nck-internal nck-table-container" :class="{ 'scrollable-content': scrollableContent }">
    <div v-if="displaySelectionActionBar" class="action-bar-area">
      <!-- @slot Content displayed on top of the table when there is at least selected row (requires the 'multiselect' option). -->
      <slot name="action-bar"></slot>
    </div>
    <table
      role="table"
      class="nck-table"
      :aria-labelledby="labeledByTitleId"
      :aria-label="displayedAriaLabel"
      :class="{ 'scrollable-content': scrollableContent, 'with-action-bar': displaySelectionActionBar }"
      ref="table"
    >
      <thead ref="header">
        <tr class="heading-row">
          <th class="selection-cell text-s-600" v-if="multiSelect" aria-label="">
            <nck-checkbox
              :label="multiSelectLabel"
              :indeterminate="hasSomeButNotAllSelected"
              hideLabel
              :modelValue="allSelected"
              @checkbox-clicked="updateFullSelection"
            />
          </th>
          <th
            role="columnheader"
            v-for="(colDesc, index) in columnsDescription"
            :key="index"
            :style="{
              'flex-basis': colDesc.width || '0',
              'max-width': colDesc.width || undefined,
              'justify-content': getColumnHeaderAlignment(colDesc),
            }"
            class="header text-s-600"
            :aria-sort="
              columnCanBeSorted(colDesc) ? (columnIsSorted(index) ? currentSortOrder : SortOrder.NONE) : undefined
            "
          >
            <template v-if="columnCanBeSorted(colDesc)">
              <button
                class="sort-button inside-focus"
                :class="getColumnHeaderButtonAlignmentClass(colDesc)"
                @click="executeSortHandler(index, colDesc)"
              >
                <div
                  class="header-label sortable"
                  :class="columnIsSorted(index) ? 'font-color-ink-100 current-sort' : 'font-color-ink-70'"
                >
                  {{ colDesc.headerLabel }}
                </div>
                <div class="sort-icon-container">
                  <nck-icon
                    class="sort-icon"
                    :class="
                      columnIsSorted(index) && currentSortOrder === SortOrder.ASCENDING ? 'sort-icon-visible' : ''
                    "
                    iconAltText=""
                    :iconSize="IconSize.XS"
                    iconName="caret-up"
                    :primaryColor="IconColors.BRIGHT_BLUE_300"
                  ></nck-icon>
                  <nck-icon
                    class="sort-icon sort-icon-down"
                    :class="
                      columnIsSorted(index) && currentSortOrder === SortOrder.DESCENDING ? 'sort-icon-visible' : ''
                    "
                    iconAltText=""
                    :iconSize="IconSize.XS"
                    iconName="caret-down"
                    :primaryColor="IconColors.BRIGHT_BLUE_300"
                  ></nck-icon>
                </div>
              </button>
            </template>
            <template v-else>
              <div class="header-label font-color-ink-70" :style="{ 'text-align': colDesc.headerAlignment ?? 'left' }">
                {{ colDesc.headerLabel }}
              </div>
            </template>
          </th>
        </tr>
      </thead>
      <tbody ref="body">
        <tr
          v-for="(entry, index) in data"
          :key="castEntryRowUniqueValue(entry)"
          class="table-row inside-focus text-m"
          :role="ariaRole"
          :tabindex="hasRowClickedListener ? '0' : undefined"
          @[clickEvent]="
            // @ts-expect-error vue is not able to infer the type of $event
            clickRow(entry, index, $event)
          "
          @[keyDownEvent]="
            // @ts-expect-error vue is not able to infer the type of $event
            clickRowWithKeydownEvent(entry, index, $event)
          "
          @[mouseDownEvent]="setCurrentPressedRow(index)"
          @[touchStartEvent]="setCurrentPressedRow(index)"
          @[mouseUpEvent]="setCurrentPressedRow(-1)"
          @[touchEndEvent]="setCurrentPressedRow(-1)"
          @[mouseLeaveEvent]="setCurrentPressedRow(-1)"
          :class="{
            clickable: hasRowClickedListener,
            pressed: hasRowClickedListener && pressedRowIndex === index,
            'selected-row': selectedIndexes[index],
            'not-selectable': isNotSelectable(entry),
          }"
        >
          <td v-if="multiSelect && getLabelForRowSelection" class="selection-cell">
            <nck-checkbox
              :label="getLabelForRowSelection(entry, selectedIndexes[index])"
              hideLabel
              :modelValue="selectedIndexes[index]"
              @checkbox-clicked="updateSingleSelection(index)"
              @click.stop
            />
          </td>
          <td
            v-for="(colDesc, index) in columnsDescription"
            :key="index"
            :style="{
              'flex-basis': colDesc.width || '0',
              'max-width': colDesc.width || undefined,
              'text-align': getColumnRowAlignment(colDesc),
            }"
          >
            <template v-if="colDesc.slotName">
              <!-- @slot Slot named after the 'slotName' you define in one or several columns. Used to display advanced content. The current row data is bound to the slot. -->
              <slot :name="colDesc.slotName" v-bind="entry"></slot>
            </template>
            <template v-else-if="colDesc.dataPath">
              {{ getFieldFromDataPath(entry, colDesc.dataPath) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="$slots.footer" class="footer-area">
      <!-- @slot Content displayed on the bottom of the table. -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="Data extends Object">
import { ref, computed, watch, onMounted, toRef } from "vue";
import { ITableColumnOptions } from "../models/iTableColumnOption";
import { TextAlignment } from "../constants/textAlignment";
import { IconSize } from "../constants/iconSize";
import { IconColors } from "../constants/iconColors";
import { SortOrder } from "../constants/sortOrder";
import NckCheckbox from "./nckCheckbox.vue";
import NckIcon from "./nckIcon.vue";
import { useAbstractList } from "../composables/useAbstractList";

/**
 * @component
 * @displayName nck-table
 *
 * Display structured data.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 * - [Icons URL](#icons)
 */

const props = defineProps<{
  /**
   * Description of each column. Expects an array of objects
   * describing each column with the following properties:
   *
   *  - `headerLabel` (string): the label of the column's header
   *  - `slotName` (string, optional): the identifier of the Vue slot element for advanced content.
   * It wins over `dataPath` property.
   *  - `dataPath` (string, optional): json path (i.e. 'path.to.my.prop') to the property to display
   *  - `width` (string, optional): the width of the column. It should be in percentage (i.e.: '22%').
   * If not here width is computed automatically based on remaining width.
   *  - `headerAlignment` (string, optional): text alignment of the header. Takes a [TextAlignment](#textalignment)
   *  - `rowAlignment` (string, optional): text alignment of the column's cell. Takes a [TextAlignment](#textalignment)
   *  - `onSort`
   *   - `(function, ((newSortOrder: `[SortOrder](#sortorder))` => undefined, optional)`
   *   - or `(Promise, ((newSortOrder: `[SortOrder](#sortorder))` => undefined, optional)`
   *
   *   called if user sorts by this column. If not provided, the column cannot be sorted.
   *
   *   The `onSort` function:
   *    - must implement the full sorting logic to impact the data order
   *    - is allowed to modify the data array content partially or completely (in case table is paginated)
   *    - is responsible for respecting the requested sort order
   *    - can take other columns data into account for sorting
   *    - is responsible for bringing user back to Page 1 if table is paginated
   */
  columnsDescription: ITableColumnOptions[];

  /**
   * Data to be displayed
   */
  data: Data[];

  /**
   * The key of property given to v-bind:key, allow to have correct performance with v-for
   * it must be a key of a property which is unique among every element
   */
  rowUniqueKey: keyof Data;

  /**
   * The aria role of the row when it is clickable.
   * Note: this is only required when the row is clickable, it is ignored otherwise
   *
   * @values "button", "link"
   */
  rowAriaRole?: "button" | "link";

  /**
   * To determine which row is not selectable in a multiSelect table
   *
   * It can be:
   *
   *  - a string: the name of the property checkbox presence will be checked
   *  - a function: that will take in parameter the current row data. Checkbox will
   * not be added if function returns a truthy value.
   */
  notSelectableSource?: keyof Data | ((entry: Data) => boolean);

  /**
   * Allows the table content to be scrollable
   */
  scrollableContent?: boolean;

  /**
   * ID of title element for the table. It is required
   * if no ariaLabel is provided. It wins over
   * ariaLabel.
   */
  labeledByTitleId?: string;

  /**
   * Aria label for the table. It is required if
   * no labeledByTitleId is provided.
   */
  ariaLabel?: string;

  /**
   * Enable row selection in the table
   */
  multiSelect?: boolean;

  /**
   * The label for accessibility of the checkbox in the header when not all rows are selected.
   * Required if you enable "multiSelect" prop, useless otherwise.
   */
  selectAllLabel?: string;

  /**
   * The label for accessibility of the checkbox in the header when all rows are selected.
   * Required if you enable "multiSelect" prop, useless otherwise.
   */
  unselectAllLabel?: string;

  /**
   * A function to compute the label for accessibility of the checkbox of a row.
   * Required if you enable "multiSelect" prop, useless otherwise.
   * First argument is the current row data, the second is whether the row is selected or not.
   * It should return a string which will be used as the checkbox label.
   */
  getLabelForRowSelection?: (entry: Data, selected: boolean) => string;

  /**
   * Index (in the columnsDescription array)
   * of a "sortable" column to be flagged as sorted at initial Table display.
   *
   * Initial dataset sorting responsibility by the designated data column is left to the Table data provider.
   * Providing this optional parameter does not trigger any sorting operation before initial Table display.
   * Will have no effect if the designated column cannot be sorted.
   *
   * The corresponding [SortOrder](#sortorder) should be set using `initiallySortedColumnSortOrder` prop.
   * If not set, nothing will be displayed.
   */
  initiallySortedColumnIndex?: number;

  /**
   * [SortOrder](#sortorder) to be shown on the initially sorted column (if any)
   * designated by the `initiallySortedColumnIndex` prop.
   *
   * Initial dataset sorting order insurance is not ensured by this component.
   * Providing this optional parameter does not trigger any sorting operation before initial Table display.
   * Will have no effect if the designated column cannot be sorted.
   */
  initiallySortedColumnSortOrder?: SortOrder;
}>();

const emits = defineEmits<{
  /**
   * Event emitted when a row is clicked. Setting a listener will make the row clickable,
   * and if not present the row won't be clickable nor focusable.
   * You MUST provide a rowAriaRole if you have a listener.
   * @event row-clicked
   * @param entry the data of the clicked row
   * @param index the index of the row in the table
   */
  (e: "row-clicked", entry: Data, index: number): void;

  /**
   * When multiselect option is enabled, emitted everytime the selection changes
   * @param selectedElements the selected rows of your table (it gives the full row data)
   */
  (e: "selection-changed", selectedElements: Data[]): void;
}>();

const {
  pressedRowIndex,
  ROW_CLICKED_EVENT,
  clickEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
  mouseLeaveEvent,
  touchStartEvent,
  touchEndEvent,
  hasRowClickedListener,
  ariaRole,
  setCurrentPressedRow,
} = useAbstractList(toRef(props, "rowAriaRole"));

const ERROR_PREFIX = "Error in NckTable:";
const selectedIndexes = ref<boolean[]>([]);
const allSelected = ref<boolean>(false);
const currentSortedColumnIndex = ref<number>(-1);
const currentSortOrder = ref<SortOrder>(SortOrder.NONE);

const multiSelectLabel = computed(() => {
  if (props.multiSelect) {
    return allSelected.value
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        props.unselectAllLabel!
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        props.selectAllLabel!;
  }

  return undefined as never;
});

const displayedAriaLabel = computed(() => {
  return !props.labeledByTitleId ? props.ariaLabel : undefined;
});

const displaySelectionActionBar = computed(() => {
  return allSelected.value || selectedIndexes.value.filter((value) => value).length > 0;
});

const hasSomeButNotAllSelected = computed(() => {
  return !allSelected.value && selectedIndexes.value.filter((value) => value).length > 0;
});

function applyNewSortOrder(sortOrder: SortOrder, sortedColumnIndex: number) {
  currentSortOrder.value = sortOrder;
  currentSortedColumnIndex.value = sortedColumnIndex;
}

function applyInitialSort() {
  if (
    typeof props.initiallySortedColumnIndex === "number" &&
    !isNaN(props.initiallySortedColumnIndex) &&
    props.initiallySortedColumnIndex >= 0 &&
    props.initiallySortedColumnIndex < props.columnsDescription.length &&
    columnCanBeSorted(props.columnsDescription[props.initiallySortedColumnIndex]) &&
    props.initiallySortedColumnSortOrder
  ) {
    applyNewSortOrder(props.initiallySortedColumnSortOrder, props.initiallySortedColumnIndex);
  }
}

/* what about perf, this method is called often
if we pass a method that is expensive what happen? */
function isNotSelectable(entry: Data) {
  switch (typeof props.notSelectableSource) {
    case "string":
      return entry[props.notSelectableSource];
    case "function":
      return props.notSelectableSource(entry);
    default:
      return false;
  }
}

function checkColumnsWidthIntegrity() {
  const invalidWidthColumns = props.columnsDescription.filter((colDesc) => {
    return colDesc.width && !(/^\d{1,2}%$/.test(colDesc.width) || colDesc.width === "100%");
  });
  if (invalidWidthColumns.length > 0) {
    throw new Error(
      `${ERROR_PREFIX} when columns have a width, it shoud be a percentage between 1% and 99%. Example: '22%'.`,
    );
  }
  const totalWidth = props.columnsDescription
    .map((colDesc) => {
      return colDesc.width ? parseInt(colDesc.width.substring(0, colDesc.width.length - 1), 10) : 0;
    })
    .reduce((accumulator, currentWidth) => {
      accumulator += currentWidth;
      return accumulator;
    });
  if (totalWidth > 100) {
    throw new Error(`${ERROR_PREFIX} the total of columns' provided width is greater than 100%.`);
  }
}

function checkSortIntegrity() {
  if (
    props.initiallySortedColumnIndex !== null &&
    props.initiallySortedColumnIndex !== undefined &&
    !props.initiallySortedColumnSortOrder
  ) {
    throw new Error(
      `${ERROR_PREFIX} 'initiallySortedColumnSortOrder' prop is required when you specify 'initiallySortedColumnIndex'`,
    );
  }

  if (
    (props.initiallySortedColumnIndex === null || props.initiallySortedColumnIndex === undefined) &&
    props.initiallySortedColumnSortOrder
  ) {
    throw new Error(
      `${ERROR_PREFIX} 'initiallySortedColumnIndex' prop is required when you specify 'initiallySortedColumnSortOrder'`,
    );
  }

  if (
    typeof props.initiallySortedColumnIndex === "number" &&
    (props.initiallySortedColumnIndex < 0 || props.initiallySortedColumnIndex >= props.columnsDescription.length)
  ) {
    throw new Error(
      `${ERROR_PREFIX} 'initiallySortedColumnIndex' prop value must be between 0 & the number of table columns`,
    );
  }

  if (
    typeof props.initiallySortedColumnIndex === "number" &&
    props.initiallySortedColumnIndex >= 0 &&
    props.initiallySortedColumnIndex < props.columnsDescription.length &&
    !columnCanBeSorted(props.columnsDescription[props.initiallySortedColumnIndex])
  ) {
    throw new Error(`${ERROR_PREFIX} 'initiallySortedColumnIndex' prop value designates a non sortable column`);
  }
}

function checkAriaIntegrity() {
  if (hasRowClickedListener.value && typeof props.rowAriaRole !== "string") {
    throw new Error(
      `${ERROR_PREFIX} your row items are clickable but you did not provide a role to your list items using rowAriaRole.`,
    );
  }
  if (hasRowClickedListener.value && props.rowAriaRole !== "button" && props.rowAriaRole !== "link") {
    throw new Error(
      `${ERROR_PREFIX} invalid role provided in rowAriaRole for a clickable row. Valid values are 'link' or 'button'.`,
    );
  }
  if (!props.ariaLabel && !props.labeledByTitleId) {
    throw new Error(`${ERROR_PREFIX} ariaLabel or labeledByTitleId should be provided.`);
  }
}

function checkMultiSelectIntegrity() {
  if (props.multiSelect) {
    if (!props.selectAllLabel) {
      throw new Error(`${ERROR_PREFIX} 'selectAllLabel' prop is required when you use 'multiSelect'`);
    }

    if (!props.unselectAllLabel) {
      throw new Error(`${ERROR_PREFIX} 'unselectAllLabel' prop is required when you use 'multiSelect'`);
    }

    if (typeof props.getLabelForRowSelection !== "function") {
      throw new Error(`${ERROR_PREFIX} 'getLabelForRowSelection' prop is required when you use 'multiSelect'`);
    }
  }
}

function checkNotSelectableSourceIntegrity() {
  if (props.notSelectableSource && !props.multiSelect) {
    throw new Error(`${ERROR_PREFIX} 'multiSelect' prop is required when you use 'notSelectableSource'`);
  }
}

function clickRow(entry: Data, index: number, $event: MouseEvent) {
  emits(ROW_CLICKED_EVENT, entry, index);
  if ($event && $event.currentTarget instanceof HTMLElement) {
    $event.currentTarget.focus(); // TRV3-1429: force focus to row because it seems it focuses cell
  }
}

function clickRowWithKeydownEvent(entry: Data, index: number, $event: KeyboardEvent) {
  // Keep native keyboard events for some interactive elements when they are focused
  const eventTarget = $event.target;
  if (
    eventTarget instanceof HTMLInputElement ||
    eventTarget instanceof HTMLButtonElement ||
    eventTarget instanceof HTMLTextAreaElement
  ) {
    return;
  }

  if ($event.key === "Enter" || (ariaRole.value === "button" && $event.key === " ")) {
    emits(ROW_CLICKED_EVENT, entry, index);
    $event.preventDefault();
    $event.stopPropagation();
  }
}

function emitCurrentlySelected() {
  const selectedElements = props.data.filter((value, index) => {
    return selectedIndexes.value[index];
  });

  emits("selection-changed", selectedElements);
}

function getColumnHeaderAlignment(columnOptions: ITableColumnOptions) {
  switch (columnOptions.headerAlignment) {
    case TextAlignment.CENTER:
      return "center";
    case TextAlignment.RIGHT:
      return "flex-end";
    case TextAlignment.LEFT:
    default:
      return "flex-start";
  }
}

function getColumnHeaderButtonAlignmentClass(columnOptions: ITableColumnOptions) {
  switch (columnOptions.headerAlignment) {
    case TextAlignment.CENTER:
      return "center-aligned";
    case TextAlignment.RIGHT:
      return "right-aligned";
    case TextAlignment.LEFT:
    default:
      return "left-aligned";
  }
}

function getColumnRowAlignment(columnOptions: ITableColumnOptions): TextAlignment {
  return columnOptions.rowAlignment ?? TextAlignment.CENTER;
}

function getFieldFromDataPath(entry: Data, dataPath: string): unknown {
  let currentData: unknown = entry;
  dataPath.split(".").forEach((propName) => {
    currentData = currentData && typeof currentData === "object" ? currentData[propName as keyof object] : null;
  });
  return currentData;
}

function updateSingleSelection(index: number) {
  selectedIndexes.value[index] = !selectedIndexes.value[index];
  const numbersOfSelectedRows = selectedIndexes.value.filter((selected) => selected).length;
  allSelected.value = numbersOfSelectedRows === props.data.filter((line) => !isNotSelectable(line)).length;
  emitCurrentlySelected();
}

function updateFullSelection() {
  allSelected.value = !allSelected.value;
  props.data.forEach((value, idx) => {
    if (!isNotSelectable(value)) {
      selectedIndexes.value[idx] = allSelected.value;
    }
  });
  emitCurrentlySelected();
}

function clearSelection() {
  allSelected.value = false;
  props.data.forEach((value, idx) => {
    selectedIndexes.value[idx] = false;
  });
  emitCurrentlySelected();
}

function executeSortHandler(columnIndex: number, columnDescription: ITableColumnOptions) {
  if (typeof columnDescription.onSort === "function") {
    const currentColumnSortOrder = columnIsSorted(columnIndex) ? currentSortOrder.value : SortOrder.NONE;
    const newSortOrder = getNextSortOrder(currentColumnSortOrder);
    clearSelection();
    const result = columnDescription.onSort(newSortOrder);
    if (result instanceof Promise) {
      result
        .then(() => {
          applyNewSortOrder(newSortOrder, columnIndex);
        })
        .catch(() => {
          // sorting operation failed, do not update current sort order
        });
    } else {
      applyNewSortOrder(newSortOrder, columnIndex);
    }
  }
}

function getNextSortOrder(currentSort: SortOrder) {
  switch (currentSort) {
    case SortOrder.NONE:
    case SortOrder.DESCENDING:
      return SortOrder.ASCENDING;
    case SortOrder.ASCENDING:
      return SortOrder.DESCENDING;
  }
}

function columnCanBeSorted(columnDescription: ITableColumnOptions) {
  return typeof columnDescription.onSort === "function";
}

function columnIsSorted(columnIndex: number) {
  return columnIndex === currentSortedColumnIndex.value;
}

function updateSelection() {
  props.data.forEach((value, idx) => {
    selectedIndexes.value[idx] ??= allSelected.value;
  });
}

// types are invalid because defineProps is not used as type-only
function castEntryRowUniqueValue(entry: Data): string {
  return String(entry[props.rowUniqueKey]);
}

onMounted(() => {
  if (!props.columnsDescription?.length) {
    throw new Error(`${ERROR_PREFIX} you need to define at least one column.`);
  }
  const emptyHeaderColumns = props.columnsDescription.filter((colDesc) => {
    return !colDesc.headerLabel;
  });
  if (emptyHeaderColumns.length > 0) {
    throw new Error(`${ERROR_PREFIX} all your columns should have a header label.`);
  }
  checkAriaIntegrity();
  checkMultiSelectIntegrity();
  checkNotSelectableSourceIntegrity();
  updateSelection();
  checkColumnsWidthIntegrity();
  checkSortIntegrity();
  applyInitialSort();
});

watch(() => props.data, updateSelection);

defineExpose({
  /**
   * @public
   * Clears any currently selected lines.
   */
  clearSelection,
});
</script>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";

.nck-style.nck-table-container {
  border-radius: var(--nck-radius-m);
  box-shadow: 0 0.0625rem 0.25rem 0.0625rem fade(@blue-grey-700, 15);
  height: 100%;

  &.scrollable-content {
    display: flex;
    flex-direction: column;
    .nck-table {
      flex: 1;
    }
    .action-bar-area {
      flex: 0 0 auto;
    }
  }

  .footer-area {
    border-top: var(--nck-border-width-s) var(--nck-border-neutral) solid;
  }

  .nck-table {
    position: relative;
    display: block;
    width: 100%;
    border-radius: var(--nck-radius-m);
    border-collapse: collapse;
    border-spacing: 0;

    &.scrollable-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      overflow: auto;
      thead {
        position: sticky;
        top: 0;
        z-index: 5; // rows contains checkbox which has a clickable area with z-index 1 so we need more
      }
      tbody {
        flex: 1;
      }
    }
    &.with-action-bar {
      &,
      .heading-row {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
      .heading-row {
        border-top: var(--nck-border-width-s) var(--nck-border-neutral) solid;
      }
    }
    tbody,
    thead {
      display: block;
    }

    @default-header-label-horizontal-padding: 0.5rem;
    @header-label-to-sort-icon-spacing: 0.25rem;
    @default-sort-icon-right-margin: 0.5rem;
    @first-and-last-cell-external-horizontal-padding: 1rem;
    @sort-icon-width: 1rem;

    .left-shift-sort-icon(@right-header-label-padding) {
      left: calc(@header-label-to-sort-icon-spacing - @right-header-label-padding);
    }

    .margin-right-sort-icon(@right-header-label-padding, @sort-icon-right-margin) {
      margin-right: calc(@sort-icon-right-margin - (@right-header-label-padding - @header-label-to-sort-icon-spacing));
    }

    .heading-row {
      display: flex;
      background: var(
        --white
      ); /* enforce background because scrollable table can have a header on top of rows, hence transport is displaying rows below */
      border-top-left-radius: var(--nck-radius-m);
      border-top-right-radius: var(--nck-radius-m);
      border-top: none;
      .header {
        flex: 1;
        display: flex;
        align-items: stretch;
        overflow: hidden;

        .header-label {
          transition: color var(--nck-duration-400) var(--nck-easing-out);
          hyphens: auto;
          overflow: hidden;
          overflow-wrap: break-word;

          &:not(.sortable) {
            align-self: center;
          }
        }

        .sort-button {
          background: none;
          border: none;
          width: ~"calc(100% - @{sort-icon-width})";
          flex-basis: 100%;
          padding: 0;
          display: flex;
          align-items: center;
          transition: background var(--nck-duration-200) var(--nck-easing-out);

          .sort-icon-container {
            display: flex;
            position: relative;
            width: @sort-icon-width;
            flex-shrink: 0;
            .left-shift-sort-icon(@default-header-label-horizontal-padding);
            .margin-right-sort-icon(@default-header-label-horizontal-padding, @default-sort-icon-right-margin);

            .sort-icon {
              transition: all var(--nck-duration-200) var(--nck-easing-out);
              padding-top: 0.25rem;
              opacity: 0;
              width: 0;

              &.sort-icon-visible {
                position: absolute;
                padding-top: 0;
                opacity: 1;
                width: @sort-icon-width;
              }
            }
          }

          &:hover {
            background: var(--blue-grey-100);
          }

          &:focus,
          &:active {
            background: none;
          }

          &.left-aligned {
            justify-content: flex-start;
            text-align: left;
          }

          &.center-aligned {
            justify-content: center;
            text-align: center;
            padding-left: @sort-icon-width; // ensures text label centering and stability whether care is visible or not
          }

          &.right-aligned {
            justify-content: flex-end;
            text-align: right;
          }
        }
      }

      th:last-child .sort-button .sort-icon-container {
        .left-shift-sort-icon(@first-and-last-cell-external-horizontal-padding);
        .margin-right-sort-icon(@first-and-last-cell-external-horizontal-padding, @first-and-last-cell-external-horizontal-padding);
      }
    }
    tr {
      border: var(--nck-border-width-s) var(--nck-border-neutral) solid;
      border-left: none;
      border-right: none;
      & + tr {
        border-top: none;
      }
      &.not-selectable {
        .selection-cell {
          visibility: hidden;
        }
      }

      th:first-child .header-label,
      td:first-child {
        padding-left: @first-and-last-cell-external-horizontal-padding;
      }
      th:last-child .header-label,
      td:last-child {
        padding-right: @first-and-last-cell-external-horizontal-padding;
      }
      th {
        padding: 0;

        .header-label,
        &.selection-cell {
          @paddingTopBottomHeader: 0.6875rem;
          padding-top: @paddingTopBottomHeader;
          padding-bottom: @paddingTopBottomHeader;
        }

        .header-label {
          padding-left: @default-header-label-horizontal-padding;
          padding-right: @default-header-label-horizontal-padding;
        }
      }
      td {
        padding: 1rem 0.5rem;
      }

      .selection-cell {
        padding-left: @first-and-last-cell-external-horizontal-padding;
        padding-right: 1rem;
        flex: 0 0 auto;
        line-height: 0;
        text-align: left;
        display: flex;
        align-items: center;
      }
    }
    tbody {
      border-bottom-left-radius: var(--nck-radius-m);
      border-bottom-right-radius: var(--nck-radius-m);
    }
    tbody tr:first-child {
      border-top: none;
    }
    tbody tr:last-child {
      border-bottom-left-radius: var(--nck-radius-m);
      border-bottom-right-radius: var(--nck-radius-m);
    }
    .table-row {
      display: flex;
      background-color: var(--nck-surface-primary);
      &:last-child {
        border-bottom: none;
      }
      td {
        flex: 1;
        display: block;
        hyphens: auto;
        /* Not compatible with older versions of Safari and iOS Safari < 15.4 */
        overflow-wrap: anywhere;

        &.selection-cell {
          padding-left: @first-and-last-cell-external-horizontal-padding;
          padding-right: 1rem;
          flex: 0 0 auto;
          text-align: left;
          display: flex;
          align-items: center;
        }
      }
      &.clickable {
        cursor: pointer;
      }
      &.clickable:hover {
        background-color: var(--nck-surface-info-subtle);
      }
      &.pressed.clickable {
        background-color: var(--nck-surface-primary);
      }
      &.selected-row {
        background-color: var(--nck-surface-info-subtle);
        box-shadow: inset 0.1875rem 0 var(--nck-border-active);
        &:focus {
          box-shadow:
            inset 0 0 0 var(--nck-focus-width-m) var(--nck-effect-focus-primary),
            inset 0.1875rem 0 var(--nck-border-active);
        }
      }
    }
  }
}
</style>

<docs>
A table is here to display data in a structured way.
You need to provide an object to describe the structure of your table.
```jsx
const data = [
  {reportName: "Q1", vegetablesSold:12, fruitsSold: 10, juicesSold: 5},
  {reportName: "Q2", vegetablesSold:20, fruitsSold: 25, juicesSold: 25},
  {reportName: "Q3", vegetablesSold:75, fruitsSold: 65, juicesSold: 186},
  {reportName: "Q4", vegetablesSold:47, fruitsSold: 120, juicesSold: 143}
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Vegetables sold", dataPath: "vegetablesSold" },
  { headerLabel: "Fruits sold", dataPath: "fruitsSold" },
  { headerLabel: "Juices sold", dataPath: "juicesSold" }
];

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label" rowUniqueKey="reportName"/>
```

To display a text field from a value in your data, you use dataPath property.
It describes a JSON path so it can access nested properties such as below
```jsx
const data = [
  {reportName: "Q1", juicesSold: { apple:2, orange:3 } },
  {reportName: "Q2", juicesSold: { apple: 7, orange: 18 } },
  {reportName: "Q3", juicesSold: { apple: 80, orange: 106} },
  {reportName: "Q4", juicesSold: {apple: 108, orange: 35} }
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Orange juice sold", dataPath: "juicesSold.orange" },
  { headerLabel: "Apple juice sold", dataPath: "juicesSold.apple" }
];

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label" rowUniqueKey="reportName"/>
```

You can display more advanced content with slots.
```jsx
const data = [
  {reportName: "Q1", juicesSold: { apple:2, orange:3 } },
  {reportName: "Q2", juicesSold: { apple: 7, orange: 18 } },
  {reportName: "Q3", juicesSold: { apple: 80, orange: 106} },
  {reportName: "Q4", juicesSold: { apple: 108, orange: 35} }
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Orange juice sold", slotName: "orangeSlot" },
  { headerLabel: "Apple juice sold", slotName: "appleSlot" }
];

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label" rowUniqueKey="reportName">
  <template v-slot:orangeSlot="$row">
    <strong>Orange juice</strong>: {{$row.juicesSold.orange}}
  </template>
  <template v-slot:appleSlot="$row">
    <strong>Apple juice</strong>: {{$row.juicesSold.apple}}
  </template>
</nck-table>
```

You can set the text alignment of your cells and headers.
```jsx
const data = [
  {reportName: "Q1", vegetablesSold:12, fruitsSold: 10, juicesSold: 5},
  {reportName: "Q2", vegetablesSold:20, fruitsSold: 25, juicesSold: 25},
  {reportName: "Q3", vegetablesSold:75, fruitsSold: 65, juicesSold: 186},
  {reportName: "Q4", vegetablesSold:47, fruitsSold: 120, juicesSold: 143}
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName", headerAlignment: 'left', rowAlignment: 'right' },
  { headerLabel: "Vegetables sold", dataPath: "vegetablesSold", headerAlignment: 'center', rowAlignment: 'center' },
  { headerLabel: "Fruits sold", dataPath: "fruitsSold", headerAlignment: 'right', rowAlignment: 'left' },
  { headerLabel: "Juices sold", dataPath: "juicesSold" }
];

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label" rowUniqueKey="reportName"/>
```

You can make your row clickable. You need to provide a rowAriaRole.
```jsx
const data = [
  {reportName: "Q1", juicesSold: { apple:2, orange:3 } },
  {reportName: "Q2", juicesSold: { apple: 7, orange: 18 } },
  {reportName: "Q3", juicesSold: { apple: 80, orange: 106 } },
  {reportName: "Q4", juicesSold: { apple: 108, orange: 35 } }
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Orange juice sold", dataPath: "juicesSold.orange" },
  { headerLabel: "Apple juice sold", dataPath: "juicesSold.apple" }
];

function clickRow(entry) {
  alert(JSON.stringify(entry) + " is clicked");
}

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label"
  rowAriaRole="button" @row-clicked="clickRow" rowUniqueKey="reportName"/>
```

Careful, if you have clickable row, and advanced content that contains clickable elements,
prevent the propagation of the event, otherwise both your element and the row will trigger an event.
See example below:
```jsx
const data = [
  {reportName: "Q1", juicesSold: { apple:2, orange:3 } },
  {reportName: "Q2", juicesSold: { apple: 7, orange: 18 } },
  {reportName: "Q3", juicesSold: { apple: 80, orange: 106} },
  {reportName: "Q4", juicesSold: { apple: 108, orange: 35} }
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Orange juice sold", slotName: "orangeSlot" },
  { headerLabel: "Apple juice sold", slotName: "appleSlot" }
];

function displayDetails(entry) {
  alert("Display details for " + JSON.stringify(entry));
}

function orderJuice(juiceName, $event) {
  alert("Ordering juice: " + juiceName);
  $event.stopPropagation();
}

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label"
  @row-clicked="displayDetails" rowAriaRole="button" rowUniqueKey="reportName">
  <template v-slot:orangeSlot="$row">
    <p><strong>Orange juice</strong>: {{$row.juicesSold.orange}}</p>
    <nck-button color="primary" @click="orderJuice('orange', $event)" label="Order now!" />
  </template>
  <template v-slot:appleSlot="$row">
    <p><strong>Apple juice</strong>: {{$row.juicesSold.apple}}</p>
    <nck-button color="primary" @click="orderJuice('apple', $event)" label="Order more!" />
  </template>
</nck-table>
```

Your table can have the "multiSelect" option that allows the user to select rows in the table.
An event is emitted every time the selection changes.

When using "multiSelect" you need to provide alternative text, through additionnal props, for the checkboxes allowing selection:

  - "selectAllLabel" prop for the checkbox in the header when it is unchecked.
  - "unselectAllLabel" prop for the checkbox in the header when it is checked.
  - "getLabelForRowSelection" prop is for the checkbox in each row. You need to provide a function. This function takes as arguments:

    - rowData: the row data. You should use it to identify uniquely the row so that user can identify it with screendreader.
    - selected: the selection state of the row.

There is also a slot ("action-bar") that appears on top of the table as soon as at least one element is
selected by user.
```jsx
const testData = {
  data: [
    {reportName: "Q1", juicesSold: { apple:2, orange:3 } },
    {reportName: "Q2", juicesSold: { apple: 7, orange: 18 } },
    {reportName: "Q3", juicesSold: { apple: 80, orange: 106} },
    {reportName: "Q4", juicesSold: { apple: 108, orange: 35} }
  ],
  columnsDescription: [
    { headerLabel: "Report", dataPath: "reportName" },
    { headerLabel: "Orange juice sold", slotName: "orangeSlot" },
    { headerLabel: "Apple juice sold", slotName: "appleSlot" }
  ],
  currentSelection: []
}

function updateSelectionArray(selection) {
  testData.currentSelection = selection;
}

function getLabelForRowSelection(row, selected) {
  return (selected ? "Unselect " : "Select ") + row.reportName;
}

function orderJuice(juiceName, $event) {
  alert("Ordering juice: " + juiceName);
  $event.stopPropagation();
}

<nck-table :columnsDescription="testData.columnsDescription" :data="testData.data" multiSelect aria-label="My aria label"
  selectAllLabel="Select all rows" unselectAllLabel="Unselected all rows" :getLabelForRowSelection="getLabelForRowSelection"
  @selection-changed="updateSelectionArray" rowAriaRole="button" rowUniqueKey="reportName">
  <template v-slot:action-bar>
    This content will be displayed as soon as user select one value or more.
  </template>
  <template v-slot:orangeSlot="$row">
    <p><strong>Orange juice</strong>: {{$row.juicesSold.orange}}</p>
    <nck-button color="primary" @click="orderJuice('orange', $event)" label="Order now!" />
  </template>
  <template v-slot:appleSlot="$row">
    <p><strong>Apple juice</strong>: {{$row.juicesSold.apple}}</p>
    <nck-button color="primary" @click="orderJuice('apple', $event)" label="Order more!" />
  </template>
</nck-table>

Current selection: {{testData.currentSelection}}
```

Sorting can be enabled on any number of columns.
Sorting is enabled for a column if an onSort function is provided.

It's up to the consuming application to implement the sorting logic. The component does not ensure the performed sort is correct.
When the user clicks a "sortable" column header, the Table calls the corresponding
onSort function providing the requested [SortOrder](#sortorder) as a parameter.
It's up to this function to respect the requested SortOrder and perform the appropriate data sorting by re-arranging the data array.

The table will only show a sorting indicator on one single column (the last clicked one). This does not
prevent the sort function from sorting by any number of secondary columns of data.
Refer to the "sortByFruitsSold" sort function in the below example.

The sorting operation should modify the table dataset order.
It can also add and/or remove items to/from it.
This is appropriate when the Table has several pages
of data since sorting the data may result is showing a completely different dataset on the current page.

Pagination is not handled by the Table but by the consuming application.
Consequently, it's up to the consuming application to bring the user back to Page 1 of results after sorting.
This is strongly recommended to ensure the expected user experience.

On sort, any selected row gets unselected.

```jsx
const data = [
  {reportName: "Q1", vegetablesSold:12, fruitsSold: 10, juicesSold: 5},
  {reportName: "Q2", vegetablesSold:20, fruitsSold: 25, juicesSold: 25},
  {reportName: "Q3", vegetablesSold:75, fruitsSold: 65, juicesSold: 186},
  {reportName: "Q4", vegetablesSold:47, fruitsSold: 120, juicesSold: 143},
  {reportName: "Q5", vegetablesSold:300, fruitsSold: 10, juicesSold: 5},
  {reportName: "Q6", vegetablesSold:1, fruitsSold: 25, juicesSold: 25},
  {reportName: "Q7", vegetablesSold:12, fruitsSold: 65, juicesSold: 186},
  {reportName: "Q8", vegetablesSold:45, fruitsSold: 120, juicesSold: 143}
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Vegetables sold", dataPath: "vegetablesSold", onSort: sortByVegetablesSold, headerAlignment: 'left' },
  { headerLabel: "Fruits sold", dataPath: "fruitsSold", onSort: sortByFruitsSold, headerAlignment: 'center' },
  { headerLabel: "Juices sold", dataPath: "juicesSold", onSort: sortByJuicesSold, headerAlignment: 'right' }
];

function getLabelForRowSelection(row, selected) {
  return (selected ? "Unselect " : "Select ") + row.reportName;
}

function sortByVegetablesSold(newSortOrder) {
  if (newSortOrder === "ascending") {
    data.sort((dataItem1, dataItem2) => { return dataItem1.vegetablesSold - dataItem2.vegetablesSold; });
  } else if (newSortOrder === "descending") {
    data.sort((dataItem1, dataItem2) => { return dataItem2.vegetablesSold - dataItem1.vegetablesSold; });
  }
}

function sortByFruitsSold(newSortOrder) {
  if (newSortOrder === "ascending") {
    data.sort((dataItem1, dataItem2) => {
      const fruitsSoldComparison = dataItem1.fruitsSold - dataItem2.fruitsSold;
      return fruitsSoldComparison === 0 ? dataItem1.vegetablesSold - dataItem2.vegetablesSold : fruitsSoldComparison;
    });
  } else if (newSortOrder === "descending") {
    data.sort((dataItem1, dataItem2) => {
      const fruitsSoldComparison = dataItem2.fruitsSold - dataItem1.fruitsSold;
      return fruitsSoldComparison === 0 ? dataItem2.vegetablesSold - dataItem1.vegetablesSold : fruitsSoldComparison;
    });
  }
}

function sortByJuicesSold(newSortOrder) {
  if (newSortOrder === "ascending") {
    data.sort((dataItem1, dataItem2) => { return dataItem1.juicesSold - dataItem2.juicesSold; });
  } else if (newSortOrder === "descending") {
    data.sort((dataItem1, dataItem2) => { return dataItem2.juicesSold - dataItem1.juicesSold; });
  }
}

<nck-table :columnsDescription="columnsDescription" :data="data" multiSelect aria-label="My aria label"
  selectAllLabel="Select all rows" unselectAllLabel="Unselected all rows" :getLabelForRowSelection="getLabelForRowSelection" rowAriaRole="button" rowUniqueKey="reportName">
</nck-table>
```

On a multiSelect table, it is possible to make some lines not selectable by using the notSelectableSource prop.
In this example we are using a string for the notSelectableSource prop, when this string is a name of a truthy property of a line, the line is not selectable.
As mentionned before, notSelectableSource can also be a function for more advanced behavior.

```jsx
const data = [
  {reportName: "Q1", vegetablesSold:12, fruitsSold: 10, juicesSold: 5, notSelectable: true},
  {reportName: "Q2", vegetablesSold:20, fruitsSold: 25, juicesSold: 25},
  {reportName: "Q3", vegetablesSold:75, fruitsSold: 65, juicesSold: 186},
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Vegetables sold", dataPath: "vegetablesSold", headerAlignment: 'left' },
  { headerLabel: "Fruits sold", dataPath: "fruitsSold", headerAlignment: 'center' },
  { headerLabel: "Juices sold", dataPath: "juicesSold", headerAlignment: 'right' }
];

function getLabelForRowSelection(row, selected) {
  return (selected ? "Unselect " : "Select ") + row.reportName;
}

<nck-table :columnsDescription="columnsDescription" :data="data" multiSelect aria-label="My aria label" notSelectableSource="notSelectable"
  selectAllLabel="Select all rows" unselectAllLabel="Unselected all rows" :getLabelForRowSelection="getLabelForRowSelection" rowAriaRole="button" rowUniqueKey="reportName">
</nck-table>
```

It's possible to specify an initial sort for any of the "sortable" columns.
This sort order will be shown by the sorting symbol at initial Table display.

This sort order is declarative and will not be validated by the Table component.
The sort handling function won't be initially called to perform this sort.
It's up to the user to check the provided dataset is properly sorted by the declared column.

Any further manual sorts will call the sort handling function.

Example: the below Table is declared as initially sorted by descending order of "Vegetables sold".
Please note the dataset sorting mistake (200 before 225).

```jsx
const data = [
  {reportName: "Q1", vegetablesSold:300},
  {reportName: "Q2", vegetablesSold:200},
  {reportName: "Q3", vegetablesSold:225},
  {reportName: "Q4", vegetablesSold:112},
  {reportName: "Q5", vegetablesSold:100},
  {reportName: "Q6", vegetablesSold:99},
  {reportName: "Q7", vegetablesSold:45},
  {reportName: "Q8", vegetablesSold:12}
];
const columnsDescription = [
  { headerLabel: "Report", dataPath: "reportName" },
  { headerLabel: "Vegetables sold", dataPath: "vegetablesSold", onSort: sortByVegetablesSold, headerAlignment: 'left' }
];

function getLabelForRowSelection(row, selected) {
  return (selected ? "Unselect " : "Select ") + row.reportName;
}

function sortByVegetablesSold(newSortOrder) {
  if (newSortOrder === "ascending") {
    data.sort((dataItem1, dataItem2) => { return dataItem1.vegetablesSold - dataItem2.vegetablesSold; });
  } else if (newSortOrder === "descending") {
    data.sort((dataItem1, dataItem2) => { return dataItem2.vegetablesSold - dataItem1.vegetablesSold; });
  }
}

<nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label"
  selectAllLabel="Select all rows" unselectAllLabel="Unselected all rows" :getLabelForRowSelection="getLabelForRowSelection" rowAriaRole="button" rowUniqueKey="reportName"
  :initiallySortedColumnIndex=1 initiallySortedColumnSortOrder="descending">
</nck-table>
```

A function is exposed publicly to allow clearing the current table selection.

```vue
<template>
  <div>
    <nck-table ref="table" :columnsDescription="columnsDescription" :data="data" multiSelect aria-label="My aria label"
      selectAllLabel="Select all rows" unselectAllLabel="Unselected all rows" :getLabelForRowSelection="getLabelForRowSelection" rowAriaRole="button" rowUniqueKey="reportName">
    </nck-table>
    <div>
      <button @click="clearSelection">Clear selection</button>
    </div>
  </div>
</template>
<script>
 export default {
    data() {
      return {
        data: [
          {reportName: "Q1", vegetablesSold:12, fruitsSold: 10, juicesSold: 5},
          {reportName: "Q2", vegetablesSold:20, fruitsSold: 25, juicesSold: 25},
          {reportName: "Q3", vegetablesSold:75, fruitsSold: 65, juicesSold: 186}
        ],
        columnsDescription: [
          { headerLabel: "Report", dataPath: "reportName" },
          { headerLabel: "Vegetables sold", dataPath: "vegetablesSold" },
          { headerLabel: "Fruits sold", dataPath: "fruitsSold" },
          { headerLabel: "Juices sold", dataPath: "juicesSold" }
        ]
      }
    },
    methods: {
      getLabelForRowSelection(row, selected) {
        return (selected ? "Unselect " : "Select ") + row.reportName;
      },
      clearSelection() {
        this.$refs.table.clearSelection();
      }
    }
  }
</script>
```

There is a slot ("footer") that appears on the bottom of the table.

```jsx
  const data = [
    {reportName: "Q1", vegetablesSold:12, fruitsSold: 10, juicesSold: 5},
    {reportName: "Q2", vegetablesSold:20, fruitsSold: 25, juicesSold: 25},
    {reportName: "Q3", vegetablesSold:75, fruitsSold: 65, juicesSold: 186},
    {reportName: "Q4", vegetablesSold:47, fruitsSold: 120, juicesSold: 143}
  ];

  const columnsDescription = [
    { headerLabel: "Report", dataPath: "reportName" },
    { headerLabel: "Vegetables sold", dataPath: "vegetablesSold" },
    { headerLabel: "Fruits sold", dataPath: "fruitsSold" },
    { headerLabel: "Juices sold", dataPath: "juicesSold" }
  ];

  <nck-table :columnsDescription="columnsDescription" :data="data" aria-label="My aria label" rowUniqueKey="reportName">
    <template v-slot:footer>
      <p> This is the footer </p>
    </template>
  </nck-table>
```
</docs>

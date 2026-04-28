<template>
  <div
    class="nck-style nck-internal nck-dropdown"
    :class="{
      'nck-dropdown-label-outside': labelOutside,
    }"
  >
    <span>
      <NckInputContainer
        :label="label"
        parentComponent="NckDropdown"
        :inputId="dropdownId"
        :errorMessage="errors[0]"
        :errorMessageId="errorMessageId"
        :helpMessage="helpMessage"
        :helpMessageId="helpMessageId"
        :isMiniLabel="isMiniLabel"
        :readonly="readonly"
        :inputFocused="inputFocused || menuExpanded"
        :disabled="disabled"
        :required="required"
        trailingContentInactive
        :labelStyleVariant="withCustomDisplayedValue ? 'hidden' : labelOutside ? 'outside' : 'floating'"
      >
        <div class="dropdown-container">
          <div
            v-if="readonly"
            ref="readonlyContentRef"
            tabindex="0"
            :id="dropdownId"
            :aria-describedby="errorMessageId + ' ' + helpMessageId"
            :aria-invalid="errors.length > 0"
            class="nck-style nck-input-field readonly outside-focus"
            :class="{
              'font-color-ink-100': !disabled,
              'font-color-ink-40': disabled,
              'label-outside': labelOutside,
            }"
          >
            <template v-if="displayedValue">
              {{ displayedValue }}
            </template>
            <template v-else> &nbsp; </template>
          </div>

          <button
            v-else
            :id="dropdownId"
            ref="triggerRef"
            type="button"
            role="combobox"
            :aria-describedby="errorMessageId + ' ' + helpMessageId"
            aria-haspopup="listbox"
            :aria-expanded="menuExpanded ? 'true' : 'false'"
            :aria-invalid="errors.length > 0 || invalid"
            :aria-readonly="readonly"
            :disabled="disabled"
            @click="toggleMenu"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            :class="{
              'background-color-blue-grey-100': !inputFocused && !menuExpanded,
              'background-color-white': inputFocused || menuExpanded,
              'font-color-ink-100': !disabled,
              'font-color-ink-40': disabled,
              'label-outside': labelOutside,
              'with-custom-displayed-value': withCustomDisplayedValue,
            }"
            class="nck-style nck-input-field outside-focus right-spacing"
          >
            <template v-if="displayedValue">
              <div v-if="withCustomDisplayedValue" class="custom-displayed-value-container">
                <!-- @slot To display a custom content other than the selected option's label -->
                <slot name="custom-displayed-value" />
              </div>

              <span v-else v-text="displayedValue" />
            </template>
            <template v-else> &nbsp; </template>
          </button>

          <NckPopover
            v-if="!readonly"
            :displayed="menuExpanded"
            class="nck-menu-wrapper"
            :triggerToSyncPositionWith="
              ignoreParentOverflow ? triggerRef : triggerToSyncPositionWith ? triggerToSyncPositionWith : null
            "
            :placement="positionMapping[menuPosition]"
            :class="{
              'top-right': menuPosition === MenuPosition.TOP_RIGHT,
              'bottom-right': menuPosition === MenuPosition.BOTTOM_RIGHT,
              'top-left': menuPosition === MenuPosition.TOP_LEFT,
            }"
          >
            <template v-slot:popover-body>
              <NckMenu
                ref="menuRef"
                :items="options"
                :selectedValue="modelValue"
                :autoSelect="autoSelect"
                :maxHeight="maxMenuHeight"
                forceFocusAspectOnNavigatedMenuItem
                @element-selected="updateCurrentValue"
                @menu-blurred="hideMenu()"
                @menu-dismissed="hideMenuAndFocusTrigger()"
                class="nck-dropdown-menu"
              />
            </template>
          </NckPopover>
        </div>

        <template v-slot:trailing-content v-if="!readonly">
          <NckIcon
            v-show="menuExpanded"
            iconName="caret-up"
            :iconSize="IconSize.S"
            iconAltText=""
            :primaryColor="rightIconColor"
          />
          <NckIcon
            v-show="!menuExpanded"
            iconName="caret-down"
            :iconSize="IconSize.S"
            iconAltText=""
            :primaryColor="rightIconColor"
          />
        </template>
      </NckInputContainer>
    </span>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/popoverVariables.less";

// + 0.125rem for borders
@popover-absolute-offset: @popover-trigger-size + @popover-margin + 0.125rem;
.nck-style.nck-dropdown {
  .dropdown-container {
    position: relative;

    .with-custom-displayed-value {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;

      .custom-displayed-value-container {
        width: 1.25rem;
      }
    }

    .nck-input-field.readonly {
      padding-left: 0;
    }
  }

  .nck-menu-wrapper {
    width: 100%;
    z-index: 10;
    min-width: 10rem;
    &.fixed /deep/ .nck-popover {
      margin: @popover-margin 0 (@popover-absolute-offset - @popover-trigger-size) 0;
    }

    &:not(.fixed) {
      &.bottom-right {
        right: 0;
      }
      &.top-left {
        bottom: @popover-absolute-offset;
      }
      &.top-right {
        bottom: @popover-absolute-offset;
        right: 0;
      }
    }
  }

  &.nck-dropdown-label-outside {
    .nck-menu-wrapper:not(.fixed) {
      @popover-trigger-size-smaller: 2.375rem;
      // + 0.125rem for borders
      @popover-absolute-offset-smaller: @popover-trigger-size-smaller + @popover-margin + 0.125rem;

      &.top-left {
        bottom: @popover-absolute-offset-smaller;
      }
      &.top-right {
        bottom: @popover-absolute-offset-smaller;
      }
    }
  }
}
</style>

<script setup lang="ts" generic="Item">
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, toRefs, useSlots, watch } from "vue";
import type { Placement } from "@floating-ui/dom";
import NckInputContainer from "./internal/nckInputContainer.vue";
import NckMenu from "./nckMenu.vue";
import NckIcon from "./nckIcon.vue";
import NckPopover from "./nckPopover.vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { IconSize } from "../constants/iconSize";
import { IDropdownOption } from "../models/iDropdownOption";
import { MenuPosition } from "../constants/menuPosition";
import { IconColors } from "../constants/iconColors";
import { ElementSelectionController } from "@/controllers/elementSelectionController";
import { IDropdownExposed } from "./interfaces/iNckDropdown";
import { DividerToken, DIVIDER_TOKEN } from "@/constants/dividerToken";
import { ValidationMode } from "@/constants/validation/validationMode";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";
import { INckMenu } from "./interfaces/iNckMenu";

/**
 * external types to avoid some weird vue + ts issue:
 * https://github.com/vuejs/language-tools/issues/1232#issuecomment-1108042567
 *
 * but this solution does not work with generic components since they only work with script setup
 * https://vuejs.org/guide/typescript/overview#generic-components
 *
 * So we created a file for the props.
 */
import { IDropdownProps } from "./internal/dropdown/dropdownProps";

/**
 * @component
 * @displayName nck-dropdown
 * Dropdown component presents an expandable/collapsable
 * list of choices to the user where they can select one.
 *
 * This component implements the interface "INckDropdown".
 * You can import this interface and use it to cast for using validation related
 * function.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - requiredField
 * - [Icons URL](#icons)
 */

const props = withDefaults(defineProps<IDropdownProps<Item>>(), {
  labelOutside: false,
  autoSelect: true,
  maxMenuHeight: 14.25,
  ignoreParentOverflow: false,
  menuPosition: MenuPosition.BOTTOM_LEFT,
  invalid: false,
  triggerToSyncPositionWith: null,
  rules: () => [],
  name: () => AccessibilityHelper.generateId(),
});

const emit = defineEmits<{
  /**
   * Emitted when the value changes.
   * This component supports v-model pattern.
   * @param {Item} value the value of the dropdown
   */
  (event: "update:modelValue", payload: Item): void;
}>();

const readonlyContentRef = ref<HTMLDivElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const menuRef = ref<INckMenu | null>(null);

const { isValid, validate, isValidationEnabled, errors } = useCompositionFormFieldWithValidation(
  toRefs(props),
  focus,
  toRef(props, "rules"),
  toRef(props, "validationMode"),
);

const menuExpanded = ref<boolean>(false);
const dropdownId = AccessibilityHelper.generateId();
const helpMessageId = AccessibilityHelper.generateId();
const errorMessageId = AccessibilityHelper.generateId();
const inputFocused = ref<boolean>(false);
const displayedValue = ref<string>("");

// Add missing methods for IDropdownExposed interface
const open = () => {
  menuExpanded.value = true;
};

const close = () => {
  menuExpanded.value = false;
};

const clearSelection = () => {
  displayedValue.value = "";
  emit("update:modelValue", null as Item);
};

const filterOptions = (query: string) => {
  // Placeholder implementation for filtering options
  // Filter logic would be implemented here
  if (query) {
    // Future implementation: filter selectableOptions based on query
  }
};

const getFilteredOptions = (): Array<{ value: string | number; label: string }> => {
  // Return all selectable options for now
  return selectableOptions.value.map((option) => ({
    value: option.value as string | number,
    label: option.label,
  }));
};

defineExpose<IDropdownExposed>({
  /**
   * @public
   * Focus the radio button, either the selected if any, or the first non-disabled one otherwise
   */
  focus,
  /**
   * @public
   * Return validity of the group. Be careful you need to validate first. Use 'validate' method
   *
   * Returns: true if valid, false otherwise
   */
  isValid,
  /**
   * @public
   * Validate that at least one checkbox is checked. Disabled checkboxes are ignored.
   *
   * Returns: Promise<boolean> — Promise resolving to true if the group is valid and to false otherwise
   */
  validate,
  /**
   * @public
   * Whether validation is enabled or not
   *
   * Returns: boolean
   */
  isValidationEnabled,
  /**
   * @public
   * Opens the dropdown options list
   */
  open,
  /**
   * @public
   * Closes the dropdown options list
   */
  close,
  /**
   * @public
   * Clears the current selection
   */
  clearSelection,
  /**
   * @public
   * Filters options based on search query
   */
  filterOptions,
  /**
   * @public
   * Gets currently filtered options
   */
  getFilteredOptions,
});

const clickCancelListener = ref<((event: MouseEvent) => void) | null>(null);
const slots = useSlots();

const positionMapping: Record<MenuPosition, Placement> = {
  [MenuPosition.BOTTOM_LEFT]: "bottom-start",
  [MenuPosition.BOTTOM_RIGHT]: "bottom-end",
  [MenuPosition.TOP_LEFT]: "top-start",
  [MenuPosition.TOP_RIGHT]: "top-end",
};

/**
 * Returns selectable options only (excluding dividers).
 */
const selectableOptions = computed<Array<IDropdownOption<Item>>>(() => {
  return props.options.filter(isSelectableOption);
});

const rightIconColor = computed(() => {
  return props.disabled ? IconColors.BLUE_GREY_400 : IconColors.BLUE_GREY_500;
});

const isMiniLabel = computed(() => {
  return displayedValue.value !== "" || (inputFocused.value && !props.readonly);
});

const withCustomDisplayedValue = computed(() => {
  return Boolean(slots["custom-displayed-value"]?.());
});

function focus() {
  const element = props.readonly ? readonlyContentRef.value : triggerRef.value;
  if (element instanceof HTMLElement) {
    element.focus();
  }
}

function changeDisplayedValue() {
  const foundValue = selectableOptions.value.find((entry) => entry.value === props.modelValue);
  displayedValue.value = foundValue ? foundValue.label : "";
}

async function syncValueWithValidatorAndValidate() {
  if (props.validationMode !== ValidationMode.PASSIVE) {
    await validate();
  }
}

/**
 * Checks whether the provided dropdown option is selectable or not.
 */
function isSelectableOption(item: IDropdownOption<Item> | DividerToken): item is IDropdownOption<Item> {
  return item !== DIVIDER_TOKEN;
}

function hideMenu() {
  menuExpanded.value = false;
}

function hideMenuAndFocusTrigger() {
  hideMenu();
  focus();
}

function removeGlobalClickListener() {
  if (clickCancelListener.value) {
    document.removeEventListener("mousedown", clickCancelListener.value, true);
  }
}

function selectFirstElementIfNoneSelected() {
  let currentIdx = selectableOptions.value.findIndex((entry) => entry.value === props.modelValue);
  if (currentIdx === -1) {
    currentIdx = ElementSelectionController.getNextNonDisabledElementIndex(selectableOptions.value, -1);
    if (currentIdx >= 0 && selectableOptions.value[currentIdx]) {
      updateCurrentValue(selectableOptions.value[currentIdx].value);
    }
  }
}

function toggleMenu() {
  if (!props.readonly && !props.disabled) {
    menuExpanded.value = !menuExpanded.value;
    if (menuExpanded.value) {
      if (clickCancelListener.value) {
        document.addEventListener("mousedown", clickCancelListener.value, true);
      }

      if (props.autoSelect) {
        selectFirstElementIfNoneSelected();
      }
      if (menuRef.value) {
        menuRef.value.setNavigatedWithSelectedOrFirstEnabled();
        menuRef.value.focusMenu();
      }
    }
  }
}

// set selectedValue as unknown because nck-menu emits unknown
function updateCurrentValue(selectedValue: unknown) {
  const currentItem = selectableOptions.value.find((element) => element.value === selectedValue);
  if (currentItem) {
    displayedValue.value = currentItem.label;
  }
  // eslint and typescript disagree on the type of selectedValue
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  emit("update:modelValue", selectedValue as Item);
}

onBeforeUnmount(removeGlobalClickListener);

onBeforeMount(() => {
  changeDisplayedValue();
  if (!selectableOptions.value.length) {
    throw new Error("Fatal error in NckDropdown: you need at least one option");
  }
});

onMounted(() => {
  clickCancelListener.value = (event: MouseEvent) => {
    const eventTargets = event.composedPath();
    const triggerElement = triggerRef.value;
    if (triggerElement instanceof HTMLElement && eventTargets.includes(triggerElement)) {
      event.stopPropagation();
      event.preventDefault();
    }
    removeGlobalClickListener();
  };
});

watch(
  () => props.modelValue,
  () => {
    changeDisplayedValue();
    void syncValueWithValidatorAndValidate();
  },
);
watch(() => props.options, changeDisplayedValue, { deep: true });
</script>

<docs>
Here is a dropdown in its simplest form. By default, if the value passed to
the components (whether by "value" or by "v-model") doesn't match any of
the possible values then nothing will be selected (Note: that the value that
you pass will not be affected unless the user interacts with the dropdown).

Also the value of your dropdown fields can be of any type.

```jsx
const value = "";

const dropdownOptions = [
  { label: "I'm a boolean value", subLabel: "with a sublabel", value: true },
  { label: "I'm a string value", value: "string value" },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :ignoreParentOverflow="true" :options="dropdownOptions" label="Hello dropdown" v-model="value" />

  {{value}}
</div>

```

You can have a dropdown with a prefilled value, if the data passed to the
v-model/value matches one of the value in the options.

```jsx
const value = "string value";

const dropdownOptions = [
  { label: "I'm a boolean value", value: true },
  { label: "I'm a string value", value: "string value" },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value" />

  {{value}}
</div>
```

A dropdown can have disabled options.
```jsx
const value = "";

const dropdownOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "disabled", value: "disabled", disabled: true },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value" />

  {{value}}
</div>

```

You can change the position the of the menu of the dropdown.
Top/Bottom precision wil always impact the position while Left/Right precision only affects the position when the trigger is smaller than the popover control (because in that case, the popover width equals the trigger width).
```jsx
const value = "string value";

const dropdownOptions = [
  { label: "I'm a boolean value", value: true },
  { label: "I'm a string value", value: "string value" },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value"
    :menuPosition="MenuPosition.BOTTOM_LEFT" style="width: 8rem;"/>
  <br/>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value"
    :menuPosition="MenuPosition.TOP_RIGHT" style="width: 8rem;"/>
  <br/>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value"
    :menuPosition="MenuPosition.BOTTOM_LEFT" style="width: 12rem;"/>
  <br/>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value"
    :menuPosition="MenuPosition.TOP_RIGHT" style="width: 12rem;"/>
  <br/>
  {{value}}
</div>
```

And you can change the height of the menu, with a value (it will be in 'rem').
Note that the menu will have a scrollbar if the content doesn't fit.
```jsx
const value = "";

const dropdownOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "holà", value: "holà" },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" v-model="value" :maxMenuHeight="5" />

  {{value}}
</div>
```

By default, navigating the dropdown menu with the arrow keys auto-selects the navigated value.
It is possible to disable the auto-selection behavior of the menu.
```jsx
const value = "";

const dropdownOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "holà", value: "holà" },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" :autoSelect="false" v-model="value" :maxMenuHeight="5" />

  {{value}}
</div>
```

Alternatively, you can have the dropdown's label outside of the input container
```jsx
const value = "";

const dropdownOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "holà", value: "holà" },
  { label: "I'm a number", value: 42 }
];

<div>
  <nck-dropdown :options="dropdownOptions" label="Hello dropdown" :autoSelect="false" v-model="value" :maxMenuHeight="5" labelOutside/>
  {{value}}
</div>
```
</docs>

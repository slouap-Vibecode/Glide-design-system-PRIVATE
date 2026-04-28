<template>
  <div
    class="nck-style nck-internal nck-toggle-chip-group"
    :class="{
      'hidden-label': Boolean(ariaLabelledby),
    }"
  >
    <span>
      <fieldset :aria-labelledby="ariaLabelledby || labelAccessibleId">
        <NckInputContainer
          :label="
            /* label is ignored when ariaLabelledby is set but typescript needs a string */ label || labelAccessibleId
          "
          labelStyleVariant="above"
          :disabled="allDisabled"
          :isMiniLabel="false"
          parentComponent="NckToggleChipGroup"
          :inputId="inputAccessibleId"
          :required="required"
          :errorMessageId="errorAccessibleId"
          :errorMessage="errorMessage"
          :helpMessageId="helpMessageAccessibleId"
          :helpMessage="helpMessage"
          :labelId="labelAccessibleId"
          :ariaLabelledby="ariaLabelledby"
        >
          <!--
              veeValidate does not find our custom checkboxes since they are in a v-for
              https://vee-validate.logaretm.com/v2/concepts/components.html#how-it-works:~:text=For%20instance%20it%20cannot%20watch%20a%20v%2Dfor%20iterator%20value%20since%20it%20does%20not%20exist%20on%20the%20Vue%20instance%20per%20say%2C%20it%20only%20exists%20in%20the%20v%2Dfor%20loop%20context.
            -->
          <input
            type="hidden"
            :value="modelValue"
            :name="name"
            ref="hiddenInput"
            :id="inputAccessibleId"
            v-on="handlers"
            :aria-labelledby="ariaLabelledby"
          />

          <ul
            class="list"
            :class="{
              vertical: direction === GroupDirection.VERTICAL,
              horizontal: direction === GroupDirection.HORIZONTAL,
            }"
          >
            <li v-for="(checkbox, index) in options" class="item" :key="`${inputAccessibleId}-checkbox-${index}`">
              <NckToggleChip
                iconMode="checkbox"
                class="chip"
                :name="name"
                :invalid="Boolean(errorMessage) && !checkbox.disabled"
                ref="checkboxesRef"
                :label="checkbox.label"
                :leftIconName="modelValue.includes(checkbox.value.toString()) ? 'check' : checkbox.iconName"
                :disabled="checkbox.disabled"
                :modelValue="!checkbox.disabled && modelValue.includes(checkbox.value.toString())"
                @update:model-value="(v) => handleOnChecked(checkbox.value, v)"
              />
            </li>
          </ul>
        </NckInputContainer>
      </fieldset>
    </span>
  </div>
</template>

<style lang="less" scoped>
@chip-margin: 0.5rem;

.nck-style.nck-internal.nck-toggle-chip-group {
  text-align: left;

  fieldset {
    margin: 0;
    padding: 0;
    word-break: break-all;
    border: none;
  }

  .list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: flex-start;
  }

  &.hidden-label .list {
    margin-top: -@chip-margin;
  }

  .item {
    margin-top: @chip-margin;
  }

  .list.vertical {
    flex-direction: column;
  }

  .list.horizontal {
    flex-direction: row;
    flex-wrap: wrap;

    .item {
      margin-right: @chip-margin;
    }

    .item:last-child {
      margin-right: 0;
    }
  }
}
</style>

<script setup lang="ts">
import { ICheckboxOption } from "@/models/iCheckboxOption";
import NckToggleChip from "@/components/nckToggleChip.vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { computed, nextTick, PropType, ref, toRef } from "vue";
import { GroupDirection } from "@/constants/groupDirection";
import NckInputContainer from "./internal/nckInputContainer.vue";
import { useCompositionFormFieldWithValidation } from "@/composables/useCompositionFormFieldWithValidations";

/**
 * @component
 * @displayName nck-toggle-chip-group
 *
 * A group of toggle chip to get user input on multiple choices among many.
 *
 * REQUIRED TRANSLATIONS: none.
 */

const props = defineProps({
  /**
   * An array of objects describing each checkbox options.
   * The following properties are available:
   *
   * - label (string, mandatory): label of the checkbox
   * - value (string or number, mandatory): the functionnal value of the checkbox
   * - disabled (boolean, optional): whether the checkbox is disabled or not
   * - iconName (string, optional): icon to show when unchecked
   */
  options: {
    type: Array as PropType<ICheckboxOption[]>,
    required: true,
  },

  /**
   * Value of the checkbox groups. This component supports "v-model" pattern.
   *
   */
  modelValue: {
    type: Array as PropType<string[]>,
    required: true,
  },

  /**
   * Direction in which the checkbox group will be laid out.
   *
   * Accepts one of the [GroupDirection](#groupdirection) value.
   */
  direction: {
    type: String as PropType<GroupDirection>,
    default: GroupDirection.HORIZONTAL,
    validator: (val: GroupDirection) => Object.values(GroupDirection).includes(val),
  },

  /**
   * Name of the field.
   */
  name: {
    type: String,
    required: true,
    validator: (value) => value !== "",
  },

  /**
   * Label of the field. optional if `ariaLabelledby` is set
   */
  label: {
    type: String,
    validator: (value) => value !== "",
  },

  /**
   * Hide the label (visually) with the ID from another HTML element.
   */
  ariaLabelledby: {
    type: String,
    validator: (value) => typeof value === "string" && value.trim() !== "",
  },

  /**
   * A message to help user in their use of the fields. It is displayed below the fields.
   */
  helpMessage: String,

  /**
   * Whether the group is required or not (at least one checkbox).
   * It provides style, accessibility and field validation.
   */
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  /**
   * Emitted when value is changed.
   * This component supports "v-model" pattern.
   *
   * @param {string[]} value - the values of the checkbox group.
   */
  (event: "update:modelValue", value: typeof props.modelValue): void;
}>();

const labelAccessibleId = AccessibilityHelper.generateId();
const inputAccessibleId = AccessibilityHelper.generateId();
const helpMessageAccessibleId = AccessibilityHelper.generateId();
const errorAccessibleId = AccessibilityHelper.generateId();

if (!props.ariaLabelledby && !props.label) {
  throw new Error(
    `Error in NckToogleChipGroup: you must provide either label or ariaLabelledby value in your props (input#${inputAccessibleId})`,
  );
}

const ruleNames = computed(() => {
  const onlyHaveDisabledCheckboxes = props.options.every((checkboxOptions) => checkboxOptions.disabled === true);

  if (props.required && !onlyHaveDisabledCheckboxes) {
    return "required";
  }

  return "";
});

const { validate, isValid, errors, handlers } = useCompositionFormFieldWithValidation(
  {
    required: toRef(props, "required"),
    name: toRef(props, "name"),
    modelValue: toRef(props, "modelValue"),
  },
  focus,
  ruleNames,
);

// flatten array of errors to have one error string
const errorMessage = computed(() => errors.value[0]);

const allDisabled = computed(() => {
  return props.options.filter((option) => !option.disabled).length === 0;
});

const hiddenInput = ref<HTMLInputElement | null>(null);
async function handleOnChecked(checkboxValue: ICheckboxOption["value"], checked: boolean) {
  const stringifiedValue = checkboxValue.toString();
  const nextValue = new Set([...props.modelValue, stringifiedValue]);

  if (!checked) {
    nextValue.delete(stringifiedValue);
  }

  emit("update:modelValue", Array.from(nextValue));

  await nextTick();
  await validate();
}

const checkboxesRef = ref<Array<InstanceType<typeof NckToggleChip>>>();
function focus() {
  const focusIndex = props.options.findIndex((checkbox) => !checkbox.disabled);

  if (focusIndex > -1) {
    checkboxesRef.value?.[focusIndex].focus();
  }
}

defineExpose({
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
});
</script>

<docs>
```jsx
let options = [
  { label: "tata", disabled: true, value: "value3" },
  { label: "yo", value: "value1" },
  { label: "toto", value: "value2" }
];

let model = ["value1"];

<div>
  <nck-toggle-chip-group label="My label" name="filters" :options="options" v-model="model" required />
  <pre>{{model}}</pre>
</div>
```
</docs>

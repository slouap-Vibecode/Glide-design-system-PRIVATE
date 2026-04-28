import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { Ref, ref, watch } from "vue";

export function useCheckboxCore(value: Ref<boolean>, input: Ref<HTMLInputElement | null>) {
  const internalValue = ref<boolean>(false);
  const internalId = ref<string>(AccessibilityHelper.generateId());

  function updateInternalValue() {
    internalValue.value = value.value;
  }

  function focus() {
    if (input.value instanceof HTMLInputElement) {
      input.value.focus();
    }
  }

  watch(() => value.value, updateInternalValue, { immediate: true });

  return {
    internalValue,
    internalId,
    focus,
  };
}

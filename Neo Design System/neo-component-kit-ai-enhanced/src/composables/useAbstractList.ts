import { useReactiveAttrs } from "@/composables/useReactiveAttrs";
import { ref, computed, Ref, watch, toHandlerKey, camelize } from "vue";

// this eslint disabling is justified since this is a composable
// eslint-disable-next-line max-lines-per-function
export function useAbstractList(rowAriaRole: Ref<string | undefined>) {
  const pressedRowIndex = ref<number>(-1);

  const ROW_CLICKED_EVENT = "row-clicked" as const;
  const attributes = useReactiveAttrs();
  const hasRowClickedListener = ref(false);
  const rowClickedPropName = toHandlerKey(camelize(ROW_CLICKED_EVENT));

  const clickEvent = computed(() => {
    return hasRowClickedListener.value ? "click" : null;
  });

  const keyDownEvent = computed(() => {
    return hasRowClickedListener.value ? "keydown" : null;
  });

  const mouseDownEvent = computed(() => {
    return hasRowClickedListener.value ? "mousedown" : null;
  });

  const mouseUpEvent = computed(() => {
    return hasRowClickedListener.value ? "mouseup" : null;
  });

  const mouseLeaveEvent = computed(() => {
    return hasRowClickedListener.value ? "mouseleave" : null;
  });

  const touchStartEvent = computed(() => {
    return hasRowClickedListener.value ? "touchstart" : null;
  });

  const touchEndEvent = computed(() => {
    return hasRowClickedListener.value ? "touchend" : null;
  });

  const ariaRole = computed(() => {
    if (hasRowClickedListener.value) {
      switch (rowAriaRole.value) {
        case "link":
        case "button":
          return rowAriaRole.value;
      }
    }
    return undefined;
  });

  function setCurrentPressedRow(index: number) {
    pressedRowIndex.value = index;
  }

  watch(
    () => attributes,
    () => {
      hasRowClickedListener.value = !!attributes.value[rowClickedPropName];
    },
    { immediate: true, deep: true },
  );

  return {
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
  };
}

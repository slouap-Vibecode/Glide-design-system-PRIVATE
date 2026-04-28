<template>
  <a
    v-if="isDefined"
    href="javascript:void(0)"
    class="nck-link"
    :role="ariaRole"
    @click="emitClick"
    @keypress.stop.prevent="checkKeypress"
  >
    {{ label }}
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Key } from "../../constants/key";

const LINK_TRIGGERING_KEYS = [Key.ENTER.toString()];
const BUTTON_TRIGGERING_KEYS = [Key.SPACE.toString(), Key.ENTER.toString()];

/**
 * @component
 * @displayName nck-clickable-label
 * An internal component representing a clickable label.
 * The component :
 * - either just displays some text through the 'text' property,
 * - or it also displays a link, through additional properties 'linkLabel', 'linkAriaRole' and event 'link-clicked'
 * The link can be selected with the class .nck-link but it's up to the parent component to define styles (use /deep/).
 */

const props = defineProps({
  /**
   * The caller context, generally the parent component name.
   * Used for feedback purpose (error messages).
   */
  context: {
    type: String,
    required: true,
  },

  /**
   * The label.
   */
  label: {
    type: String,
  },

  /**
   * The aria-role, link or button.
   */
  ariaRole: {
    type: String,
    validator: (val: string) => ["link", "button"].includes(val),
  },
});

const emits = defineEmits<{
  /**
   * Emitted when the link is clicked.
   * @param $event the DOM click event
   */
  (e: "click", event: Event): void;
}>();

const isDefined = ref<boolean>(false);

onMounted(() => {
  isDefined.value = !!props.label && !!props.ariaRole;

  if (!isDefined.value && (props.label ?? props.ariaRole)) {
    throw new Error(
      `Error in ${props.context} : you must provide both properties label and aria role, or none (label=${props.label}, ariaRole=${props.ariaRole}).`,
    );
  }
});

function emitClick($event: Event) {
  emits("click", $event);
}

function checkKeypress($event: KeyboardEvent) {
  const triggeringKeys = props.ariaRole === "link" ? LINK_TRIGGERING_KEYS : BUTTON_TRIGGERING_KEYS;
  if (triggeringKeys.includes($event.key)) {
    emitClick($event);
  }
}

defineExpose({
  /**
   * @public
   * Checks if the link has label and ariaRole defined
   */
  isDefined,
});
</script>

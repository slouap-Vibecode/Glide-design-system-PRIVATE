<template>
  <li class="text-s">
    {{ text }}
    <nck-clickable-label
      context="NckBannerItem"
      ref="link"
      :label="linkLabel"
      :ariaRole="linkAriaRole"
      @click="emitClick"
    />
  </li>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import NckClickableLabel from "./internal/nckClickableLabel.vue";
import { useReactiveAttrs } from "@/composables/useReactiveAttrs";

/**
 * @component
 * @displayName nck-banner-item
 * This component displays a line of text, along with an optional clickable link.
 * It is meant to be used as a sub-component of <a href="#nckbanneritemgroup">NckBannerItemGroup</a>.
 */

const props = defineProps({
  /**
   * The text of the banner item.
   */
  text: {
    type: String,
    required: true,
  },

  /**
   * The label for the optional link provided in the heading.
   * When provided, you must also provide linkAriaRole, and handle the linkClicked event.
   */
  linkLabel: String,

  /**
   * The aria-role (link|button) for the optional link provided in the heading.
   * When provided, you must also provide linkLabel, and handle the linkClicked event.
   * @values "button", "link"
   */
  linkAriaRole: {
    type: String,
    validator: (val: string) => ["link", "button"].includes(val),
  },
});

const emits = defineEmits<{
  /**
   * Emitted when the heading link is clicked.
   * @param {Event} $event the DOM click event
   */
  (e: "link-clicked", event: Event): void;
}>();

const link = ref<InstanceType<typeof NckClickableLabel> | null>(null);
const attrs = useReactiveAttrs();

onMounted(() => {
  if (link.value?.isDefined && !attrs.value.onLinkClicked) {
    throw new Error(
      `Error in NckBannerItem: you provided a link (linkLabel=${props.linkLabel}, linkAriaRole=${props.linkAriaRole}) but no 'link-clicked' event is handled.`,
    );
  }
});

function emitClick($event: Event) {
  emits("link-clicked", $event);
}
</script>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";

li {
  display: block;
  width: 100%;
  padding-left: 0.75rem;
  color: var(--nck-text-default);
  text-align: left;
  &:before {
    position: absolute;
    display: block;
    margin: 0.5rem 0 0.5rem -0.75rem;
    content: "";
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 0.125rem;
    background: var(--blue-grey-700);
  }
}
</style>

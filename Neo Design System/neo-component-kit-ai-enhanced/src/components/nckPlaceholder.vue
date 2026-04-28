<template>
  <div class="nck-style nck-internal nck-placeholder">
    <div v-if="imagePlaceholder" class="image-container">
      <!-- @slot content to put in place of the image. Use for animated SVG or alike. -->
      <slot name="image-placeholder" />
    </div>
    <p class="header-2 font-color-ink-100 title">{{ title }}</p>
    <p class="text-m font-color-ink-70 subtitle" v-if="subtitle">{{ subtitle }}</p>
    <div class="nck-placeholder-buttons-wrapper">
      <!-- @slot A container for a button. Only accepts nck-button components. Click handling is up to the creator of the button, ancestor of this component. -->
      <slot name="first-button-container"></slot>
      <!-- @slot A container for another button. Only accepts nck-button components. Click handling is up to the creator of the button, ancestor of this component. -->
      <slot name="second-button-container"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nck-style.nck-placeholder {
  text-align: center;

  .image-container {
    margin: 0 0 1.5rem 0;
  }

  .subtitle {
    margin: 0.5rem 0 0 0;
  }

  .title {
    margin: 0;
  }

  .nck-placeholder-buttons-wrapper {
    font-size: 0;
    margin: 1rem 0 0 0;

    & /deep/ &:empty {
      margin: 0;
    }

    /* using internal class of button component */
    & /deep/ .nck-button {
      margin-top: 0.5rem;
    }

    & /deep/ .nck-button + .nck-button {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, useSlots } from "vue";

/**
 * @component
 * @displayName nck-placeholder
 * Placeholder is a structured display for user when there is no content (loading, welcome screen,
 * empty list result, etc).
 *
 * REQUIRED TRANSLATIONS: none.
 */

defineProps({
  /**
   * A title, to explain the purpose of the placeholder, help users feel
   * comfortable to engage with the content, or begin a feature flow.
   * Title should sound welcoming, human, and convey the intention of the feature.
   */
  title: { required: true, type: String },

  /**
   * A description, used to inform the user about the feature in more detail.
   * Secondary text should be brief and non-redundant if possible.
   * From the text, users should be able to understand the general purpose
   * of the feature and how it may help them accomplish a goal.
   */
  subtitle: { type: String },
});

const slots = useSlots();

const imagePlaceholder = computed(() => {
  return !!slots["image-placeholder"];
});
</script>
<docs>
  Basic version of the Placeholder component with title only

  ```js
  <nck-placeholder
    title="Sorry, an error has occured">
  </nck-placeholder>
  ```

  Full options version of the Placeholder component, using an animated SVG in
  the image placeholder.

  ```js
  <nck-placeholder
    title="Your content is on its way"
    subtitle="You can try again now or cancel your operation and come back later.">
    <template v-slot:first-button-container>
      <nck-button label="Leave" color="primary"></nck-button>
    </template>
    <template v-slot:second-button-container>
      <nck-button label="Cancel"></nck-button>
    </template>
    <template v-slot:image-placeholder>
      <svg focusable="false" class="dummy-animation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle class="moving-circle" cx="12" cy="12" r="10.5" />
      </svg>
    </template>
  </nck-placeholder>
  ```
</docs>
